import type { Metadata } from 'next';
import { LegalPage } from '@/components/legal/LegalPage';
import { OPERATOR } from '@/lib/legal';

export const metadata: Metadata = {
  title: 'Datenschutzerklärung — PrintMyMusic',
  robots: { index: false }
};

export default function DatenschutzPage() {
  return (
    <LegalPage title="Datenschutzerklärung">
      <h2>1. Verantwortlicher</h2>
      <p>
        Verantwortlich für die Datenverarbeitung auf dieser Website ist:
        <br />
        {OPERATOR.name}
        <br />
        {OPERATOR.street}, {OPERATOR.zipCity}, {OPERATOR.country}
        <br />
        E-Mail: <a href={`mailto:${OPERATOR.email}`}>{OPERATOR.email}</a>
      </p>
      <p>
        Ein Datenschutzbeauftragter ist gesetzlich nicht vorgeschrieben und wurde nicht bestellt.
      </p>

      <h2>2. Ihre Rechte als betroffene Person</h2>
      <p>Sie haben jederzeit das Recht auf:</p>
      <ul>
        <li>Auskunft über die zu Ihrer Person gespeicherten Daten (Art. 15 DSGVO),</li>
        <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO),</li>
        <li>Löschung (Art. 17 DSGVO) und Einschränkung der Verarbeitung (Art. 18 DSGVO),</li>
        <li>Datenübertragbarkeit (Art. 20 DSGVO),</li>
        <li>
          Widerspruch gegen Verarbeitungen, die auf einem berechtigten Interesse beruhen (Art. 21
          DSGVO),
        </li>
        <li>Widerruf erteilter Einwilligungen mit Wirkung für die Zukunft (Art. 7 Abs. 3 DSGVO).</li>
      </ul>
      <p>
        Ferner haben Sie das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren (Art.
        77 DSGVO). Zuständig ist die Aufsichtsbehörde des Bundeslandes {OPERATOR.state} bzw. die
        Behörde Ihres gewöhnlichen Aufenthaltsorts.
      </p>

      <h2>3. Hosting und Bereitstellung der Website</h2>
      <p>
        Die Website wird bei der Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA, gehostet.
        Beim Aufruf der Seiten verarbeitet Vercel in Server-Logfiles technisch notwendige Daten
        (u. a. IP-Adresse, Datum und Uhrzeit des Zugriffs, aufgerufene URL, Referrer, User-Agent).
        Rechtsgrundlage ist unser berechtigtes Interesse an einem sicheren und stabilen Betrieb
        (Art. 6 Abs. 1 lit. f DSGVO). Mit Vercel besteht ein Vertrag zur Auftragsverarbeitung; die
        Übermittlung in die USA ist durch Standardvertragsklauseln der EU-Kommission abgesichert.
      </p>
      <p>
        Die Datenbank für Guthabenstände (Vercel Postgres) sowie der Speicher für hochgeladene
        Bilder (Vercel Blob) werden ebenfalls über Vercel betrieben; der Blob-Speicher ist in der
        Region Frankfurt (EU) angesiedelt.
      </p>

      <h2>4. Registrierung und Anmeldung (Clerk)</h2>
      <p>
        Für die Anmeldung nutzen wir den Dienst Clerk der Clerk, Inc., 660 King Street, Unit 345,
        San Francisco, CA 94107, USA. Bei der Registrierung werden je nach gewählter Methode
        E-Mail-Adresse, Name und ggf. Profilinformationen Ihres Google-Kontos verarbeitet. Clerk
        setzt hierfür technisch notwendige Session-Cookies. Rechtsgrundlage ist die Erfüllung des
        Nutzungsvertrags (Art. 6 Abs. 1 lit. b DSGVO). Die Übermittlung in die USA ist durch
        Standardvertragsklauseln abgesichert.
      </p>

      <h3>Google-Login (OAuth)</h3>
      <p>
        Wenn Sie sich über Google anmelden, erhalten wir von Google Ireland Ltd., Gordon House,
        Barrow Street, Dublin 4, Irland, die zur Kontoerstellung erforderlichen Profildaten
        (Name, E-Mail-Adresse, Google-Nutzerkennung). Es gelten zusätzlich die
        Datenschutzbestimmungen von Google.
      </p>

      <h2>5. Zahlungsabwicklung (Stripe)</h2>
      <p>
        Der Kauf von Credits wird über die Stripe Payments Europe Ltd., 1 Grand Canal Street Lower,
        Grand Canal Dock, Dublin, Irland (für Nutzer im EWR) bzw. die Stripe, Inc., USA, abgewickelt.
        Die Eingabe der Zahlungsdaten (z. B. Kreditkarte) erfolgt ausschließlich auf einer von Stripe
        gehosteten Seite; wir erhalten diese Daten nicht. Von Stripe erhalten wir eine
        Zahlungsbestätigung sowie eine Transaktions- und Kundenkennung. Rechtsgrundlage ist die
        Vertragserfüllung (Art. 6 Abs. 1 lit. b DSGVO) sowie unser berechtigtes Interesse an
        Betrugsprävention (Art. 6 Abs. 1 lit. f DSGVO). Es gilt zusätzlich die Datenschutzerklärung
        von Stripe.
      </p>

      <h2>6. Guthaben (Credits)</h2>
      <p>
        In unserer Datenbank speichern wir Ihre Nutzerkennung (von Clerk) zusammen mit Ihrem
        aktuellen Guthabenstand sowie Zeitpunkten von Gutschriften und Abbuchungen. Dies ist zur
        Vertragserfüllung erforderlich (Art. 6 Abs. 1 lit. b DSGVO).
      </p>

      <h2>7. Hochgeladene Cover-Bilder</h2>
      <p>
        Laden Sie ein eigenes Cover hoch, wird die Bilddatei in Vercel Blob (Region Frankfurt)
        gespeichert und über eine zufällige, nicht öffentlich verlinkte URL bereitgestellt. Die Datei
        wird serverseitig neu kodiert; dabei werden eingebettete Metadaten (z. B. EXIF-GPS-Daten)
        entfernt. Rechtsgrundlage ist die Vertragserfüllung (Art. 6 Abs. 1 lit. b DSGVO). Sie können
        das Bild jederzeit ersetzen; auf Wunsch löschen wir gespeicherte Uploads.
      </p>

      <h2>8. Musik-Metadaten (Deezer-API)</h2>
      <p>
        Suchbegriffe und Albumaufrufe werden von unserem Server an die öffentliche Deezer-API
        (Deezer S.A., Frankreich) weitergeleitet, um Cover, Titellisten und Albumdaten abzurufen.
        Dabei werden keine personenbezogenen Daten von Ihnen an Deezer übermittelt; die Anfrage
        erfolgt durch unseren Server.
      </p>

      <h2>9. Cookies und lokale Speicherung</h2>
      <p>
        Wir setzen nur technisch notwendige Cookies ein (insbesondere die Session-Cookies von Clerk
        für den Login und von Stripe während des Bezahlvorgangs). Ein Einwilligungsbanner ist hierfür
        nicht erforderlich (§ 25 Abs. 2 TDDDG).
      </p>
      <p>
        Zusätzlich speichern wir im lokalen Speicher (localStorage) Ihres Browsers Ihre
        Farbmodus-Einstellung sowie Ihren aktuellen Poster-Entwurf, damit dieser beim erneuten
        Aufruf erhalten bleibt. Diese Daten verlassen Ihren Browser nicht und werden nicht zu
        Analyse- oder Marketingzwecken verwendet.
      </p>
      <p>
        Wir verwenden keine Analyse-, Tracking- oder Marketing-Tools.
      </p>

      <h2>10. Speicherdauer</h2>
      <p>
        Kontodaten und Guthabenstände speichern wir für die Dauer Ihres Nutzerkontos. Nach Löschung
        des Kontos werden die zugehörigen Daten entfernt, soweit keine gesetzlichen
        Aufbewahrungspflichten (insbesondere handels- und steuerrechtliche Fristen von bis zu 10
        Jahren für Rechnungs- und Zahlungsdaten) entgegenstehen. Server-Logfiles werden nach kurzer
        Zeit automatisch gelöscht bzw. anonymisiert.
      </p>

      <h2>11. Datenübermittlung in Drittländer</h2>
      <p>
        Einzelne der genannten Dienstleister (Vercel, Clerk, Stripe Inc.) können Daten in den USA
        verarbeiten. Die Übermittlung erfolgt auf Grundlage von Standardvertragsklauseln der
        EU-Kommission gemäß Art. 46 DSGVO und – soweit die Anbieter zertifiziert sind – des EU-US
        Data Privacy Framework.
      </p>

      <h2>12. Änderungen dieser Datenschutzerklärung</h2>
      <p>
        Wir passen diese Datenschutzerklärung an, sobald Änderungen an unseren Diensten oder der
        Rechtslage dies erforderlich machen. Es gilt jeweils die auf dieser Seite veröffentlichte
        Fassung.
      </p>
    </LegalPage>
  );
}
