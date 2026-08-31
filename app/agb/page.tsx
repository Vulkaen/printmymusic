import type { Metadata } from 'next';
import { LegalPage } from '@/components/legal/LegalPage';
import { OPERATOR, SITE_NAME, TAX } from '@/lib/legal';

export const metadata: Metadata = {
  title: 'AGB — PrintMyMusic',
  robots: { index: false }
};

export default function AgbPage() {
  return (
    <LegalPage title="Allgemeine Geschäftsbedingungen">
      <h2>§ 1 Geltungsbereich und Anbieter</h2>
      <p>
        Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für die Nutzung des unter{' '}
        {OPERATOR.domain} erreichbaren Dienstes {SITE_NAME} sowie für alle darüber geschlossenen
        Verträge über den Erwerb von Guthaben (&bdquo;Credits&ldquo;). Anbieter und Vertragspartner
        ist {OPERATOR.name}, {OPERATOR.street}, {OPERATOR.zipCity} (nachfolgend &bdquo;wir&ldquo;).
      </p>
      <p>
        Der Dienst richtet sich an Verbraucher und Unternehmer. Verbraucher ist jede natürliche
        Person, die ein Rechtsgeschäft zu Zwecken abschließt, die überwiegend weder ihrer
        gewerblichen noch ihrer selbständigen beruflichen Tätigkeit zugerechnet werden können.
      </p>

      <h2>§ 2 Leistungsbeschreibung</h2>
      <p>
        {SITE_NAME} ist ein Online-Editor, mit dem Nutzer aus Albumdaten gestaltete, druckfertige
        Poster erstellen und als Bild- oder PDF-Datei herunterladen können. Die Suche und die
        Anzeige von Albumcovern, Titellisten und Metadaten erfolgt über die öffentliche Deezer-API.
        Das Erstellen und Anpassen von Postern in der Vorschau ist kostenlos. Für den Export einer
        Datei wird Guthaben benötigt.
      </p>

      <h2>§ 3 Registrierung und Vertragsschluss</h2>
      <p>
        Für den Export und den Erwerb von Credits ist ein Nutzerkonto erforderlich, das über den
        Anmeldedienst Clerk (u. a. per Google-Login) erstellt wird. Mit der Registrierung kommt ein
        unentgeltlicher Nutzungsvertrag über den Zugang zum Editor zustande.
      </p>
      <p>
        Durch Auswahl eines Credit-Pakets und Abschluss des Bezahlvorgangs über unseren
        Zahlungsdienstleister Stripe geben Sie ein verbindliches Angebot zum Kauf des jeweiligen
        Pakets ab. Der Vertrag kommt mit der Bestätigung des Zahlungseingangs bzw. der Gutschrift der
        Credits zustande.
      </p>

      <h2>§ 4 Preise und Zahlung</h2>
      <p>
        Es gelten die zum Zeitpunkt der Bestellung im Bezahlvorgang angezeigten Preise.
        {TAX.kleinunternehmer
          ? ' Wir sind Kleinunternehmer im Sinne von § 19 UStG; Umsatzsteuer wird nicht ausgewiesen.'
          : ` Alle Preise verstehen sich inklusive der gesetzlichen Umsatzsteuer von ${TAX.vatRate} %.`}
      </p>
      <p>
        Die Zahlung erfolgt über die von Stripe angebotenen Zahlungsarten. Die Credits werden
        unmittelbar nach erfolgreicher Zahlung dem Nutzerkonto gutgeschrieben.
      </p>

      <h2>§ 5 Credits</h2>
      <ul>
        <li>Neu registrierte Nutzer erhalten einmalig ein kostenloses Startguthaben.</li>
        <li>
          Der Export eines Posters kostet 1 Credit; wird ein selbst hochgeladenes Cover verwendet,
          kostet der Export 2 Credits.
        </li>
        <li>
          Credits sind an das jeweilige Nutzerkonto gebunden, nicht übertragbar und nicht in bar
          auszahlbar.
        </li>
        <li>
          Erworbene Credits verfallen nicht. Das Startguthaben sowie im Rahmen von Aktionen
          gutgeschriebene Credits können mit einer angemessenen Frist entwertet werden.
        </li>
        <li>
          Wird ein Nutzerkonto gelöscht, verfällt vorhandenes Guthaben ersatzlos, soweit kein
          gesetzlicher Erstattungsanspruch besteht.
        </li>
      </ul>

      <h2>§ 6 Widerrufsrecht bei digitalen Inhalten</h2>
      <p>
        Verbrauchern steht ein gesetzliches Widerrufsrecht zu. Einzelheiten ergeben sich aus unserer{' '}
        <a href="/widerruf">Widerrufsbelehrung</a>.
      </p>
      <p>
        Da die Credits sofort nutzbar sind, holen wir im Bezahlvorgang Ihre ausdrückliche Zustimmung
        dazu ein, dass wir mit der Ausführung des Vertrags vor Ablauf der Widerrufsfrist beginnen.
        Mit dieser Zustimmung und der Kenntnisnahme, dass Sie dadurch Ihr Widerrufsrecht verlieren,
        erlischt das Widerrufsrecht mit vollständiger Vertragserfüllung (Gutschrift der Credits)
        gemäß § 356 Abs. 5 BGB.
      </p>

      <h2>§ 7 Nutzerinhalte und Rechte Dritter</h2>
      <p>
        Für Bilder, die Sie hochladen, sind Sie allein verantwortlich. Sie sichern zu, dass Sie über
        die erforderlichen Rechte verfügen und keine Rechte Dritter (insbesondere Urheber-,
        Marken- oder Persönlichkeitsrechte) verletzen. Sie stellen uns von Ansprüchen Dritter frei,
        die auf einer rechtswidrigen Nutzung durch Sie beruhen.
      </p>
      <p>
        Albumcover und Metadaten stammen von Deezer und sind urheberrechtlich geschützt. Die mit dem
        Dienst erstellten Poster sind ausschließlich für den privaten Gebrauch bestimmt. Eine
        gewerbliche Weiterverwertung ist ohne Zustimmung der jeweiligen Rechteinhaber unzulässig.
      </p>

      <h2>§ 8 Verfügbarkeit</h2>
      <p>
        Wir bemühen uns um einen möglichst unterbrechungsfreien Betrieb, schulden diesen aber nicht.
        Wartungsarbeiten, Störungen bei Drittanbietern (Hosting, Anmeldedienst, Zahlungsdienst,
        Deezer-API) oder Änderungen der Deezer-API können die Nutzbarkeit vorübergehend
        einschränken.
      </p>

      <h2>§ 9 Haftung</h2>
      <p>
        Wir haften unbeschränkt bei Vorsatz und grober Fahrlässigkeit sowie nach dem
        Produkthaftungsgesetz und bei Verletzung von Leben, Körper oder Gesundheit. Bei einfacher
        Fahrlässigkeit haften wir nur bei Verletzung einer wesentlichen Vertragspflicht
        (Kardinalpflicht) und der Höhe nach begrenzt auf den vertragstypischen, vorhersehbaren
        Schaden. Im Übrigen ist die Haftung ausgeschlossen.
      </p>

      <h2>§ 10 Änderung dieser AGB</h2>
      <p>
        Wir können diese AGB mit Wirkung für die Zukunft ändern, wenn dies aus triftigem Grund
        (z. B. Änderung der Rechtslage, Erweiterung des Leistungsangebots) erforderlich ist. Über
        Änderungen informieren wir angemeldete Nutzer rechtzeitig per E-Mail oder Hinweis im Dienst.
        Widersprechen Sie nicht innerhalb von sechs Wochen, gelten die geänderten AGB als
        angenommen; hierauf weisen wir gesondert hin.
      </p>

      <h2>§ 11 Schlussbestimmungen</h2>
      <p>
        Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts. Ist der
        Kunde Kaufmann, juristische Person des öffentlichen Rechts oder öffentlich-rechtliches
        Sondervermögen, ist Gerichtsstand unser Geschäftssitz. Zwingende verbraucherschützende
        Vorschriften des Staates, in dem der Verbraucher seinen gewöhnlichen Aufenthalt hat, bleiben
        unberührt.
      </p>
      <p>
        Sollten einzelne Bestimmungen dieser AGB unwirksam sein, bleibt die Wirksamkeit der übrigen
        Bestimmungen unberührt.
      </p>
    </LegalPage>
  );
}
