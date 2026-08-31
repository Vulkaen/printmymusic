import { sql } from '@vercel/postgres';

const FREE_STARTER_CREDITS = 3;

let tableEnsured = false;

/**
 * Legt die Tabelle an, falls sie noch nicht existiert. Wird bei jedem
 * Prozessstart einmal ausgeführt (idempotent - CREATE TABLE IF NOT EXISTS),
 * danach übersprungen, um unnötige Round-Trips zu vermeiden.
 */
async function ensureTable() {
  if (tableEnsured) return;
  await sql`
    CREATE TABLE IF NOT EXISTS user_credits (
      user_id TEXT PRIMARY KEY,
      credits INTEGER NOT NULL DEFAULT 0,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
  tableEnsured = true;
}

/**
 * Stellt sicher, dass für den Nutzer ein Datensatz existiert. Neue Nutzer
 * bekommen die Start-Credits gutgeschrieben. Gibt den aktuellen Stand zurück.
 */
async function ensureUserRow(userId: string): Promise<number> {
  await ensureTable();
  await sql`
    INSERT INTO user_credits (user_id, credits)
    VALUES (${userId}, ${FREE_STARTER_CREDITS})
    ON CONFLICT (user_id) DO NOTHING
  `;
  const { rows } = await sql<{ credits: number }>`
    SELECT credits FROM user_credits WHERE user_id = ${userId}
  `;
  return rows[0]?.credits ?? 0;
}

export async function getBalance(userId: string): Promise<number> {
  return ensureUserRow(userId);
}

/** Schreibt Credits gut (nach erfolgreichem Kauf über Stripe). */
export async function addCredits(userId: string, amount: number): Promise<number> {
  await ensureUserRow(userId);
  const { rows } = await sql<{ credits: number }>`
    UPDATE user_credits
    SET credits = credits + ${amount}, updated_at = NOW()
    WHERE user_id = ${userId}
    RETURNING credits
  `;
  return rows[0]?.credits ?? 0;
}

/**
 * Bucht Credits atomar ab (eine einzelne UPDATE-Anweisung mit Bedingung
 * "genug Guthaben vorhanden" verhindert Race Conditions und negative
 * Guthaben, unabhängig davon wie viele Anfragen gleichzeitig eintreffen).
 */
export async function consumeCredits(
  userId: string,
  cost: number
): Promise<{ ok: boolean; credits: number }> {
  await ensureUserRow(userId);

  const { rows } = await sql<{ credits: number }>`
    UPDATE user_credits
    SET credits = credits - ${cost}, updated_at = NOW()
    WHERE user_id = ${userId} AND credits >= ${cost}
    RETURNING credits
  `;

  if (rows.length === 0) {
    const current = await getBalance(userId);
    return { ok: false, credits: current };
  }

  return { ok: true, credits: rows[0]!.credits };
}
