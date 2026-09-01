import { sql } from '@vercel/postgres';

const FREE_DAILY_CREDITS = 3;

let tableEnsured = false;

/**
 * Legt die Tabelle an bzw. ergänzt fehlende Spalten. Wird bei jedem
 * Prozessstart einmal ausgeführt (idempotent), danach übersprungen.
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
  // Zeitpunkt der letzten Tagesauffüllung - nachträglich ergänzt.
  await sql`
    ALTER TABLE user_credits
    ADD COLUMN IF NOT EXISTS last_refill_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  `;
  // Ein Datensatz pro erfolgreichem Export (Credits wurden abgebucht).
  // Dient der Auswertung, welche Formate/Qualitäten wie oft genutzt werden.
  await sql`
    CREATE TABLE IF NOT EXISTS export_events (
      id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      user_id TEXT NOT NULL,
      format TEXT,
      quality TEXT,
      cost INTEGER NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
  tableEnsured = true;
}

/**
 * Füllt das Guthaben alle 24 Stunden wieder auf das Tageskontingent auf.
 * GREATEST(...) sorgt dafür, dass ein höheres Guthaben (falls später doch
 * einmal manuell vergeben) nicht nach unten korrigiert wird.
 */
async function refillIfDue(userId: string): Promise<void> {
  await sql`
    UPDATE user_credits
    SET credits = GREATEST(credits, ${FREE_DAILY_CREDITS}),
        last_refill_at = NOW(),
        updated_at = NOW()
    WHERE user_id = ${userId}
      AND last_refill_at <= NOW() - INTERVAL '24 hours'
  `;
}

/**
 * Stellt sicher, dass für den Nutzer ein Datensatz existiert. Neue Nutzer
 * bekommen das Tageskontingent gutgeschrieben. Führt anschließend die
 * fällige Tagesauffüllung durch und gibt den aktuellen Stand zurück.
 */
async function ensureUserRow(userId: string): Promise<number> {
  await ensureTable();
  await sql`
    INSERT INTO user_credits (user_id, credits)
    VALUES (${userId}, ${FREE_DAILY_CREDITS})
    ON CONFLICT (user_id) DO NOTHING
  `;
  await refillIfDue(userId);
  const { rows } = await sql<{ credits: number }>`
    SELECT credits FROM user_credits WHERE user_id = ${userId}
  `;
  return rows[0]?.credits ?? 0;
}

export async function getBalance(userId: string): Promise<number> {
  return ensureUserRow(userId);
}

/**
 * Schreibt Credits gut. Aktuell ungenutzt (keine Käufe im kostenlosen
 * Modell) - bleibt für eine spätere Wiedereinführung des Kaufmodells.
 */
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

/**
 * Protokolliert einen erfolgreichen Export. Wird nach erfolgreicher
 * Credit-Abbuchung aufgerufen. Fehler hier dürfen den Export nicht
 * verhindern - der Aufrufer fängt sie ab.
 */
export async function recordExport(
  userId: string,
  format: string | null,
  quality: string | null,
  cost: number
): Promise<void> {
  await ensureTable();
  await sql`
    INSERT INTO export_events (user_id, format, quality, cost)
    VALUES (${userId}, ${format}, ${quality}, ${cost})
  `;
}
