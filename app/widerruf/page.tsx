import type { Metadata } from 'next';
import { LegalPage } from '@/components/legal/LegalPage';
import { OPERATOR } from '@/lib/legal';

export const metadata: Metadata = {
  title: 'Widerrufsbelehrung — PrintMyMusic',
  robots: { index: false }
};

export default function WiderrufPage() {
  return (
    <LegalPage title="Widerrufsbelehrung">
      <h2>Widerrufsrecht</h2>
      <p>
        Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu
        widerrufen. Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag des Vertragsschlusses.
      </p>
      <p>
        Um Ihr Widerrufsrecht auszuüben, müssen Sie uns
      </p>
      <p>
        {OPERATOR.name}
        <br />
        {OPERATOR.street}
        <br />
        {OPERATOR.zipCity}
        <br />
        {OPERATOR.country}
        <br />
        E-Mail: <a href={`mailto:${OPERATOR.email}`}>{OPERATOR.email}</a>
        <br />
        Telefon: {OPERATOR.phone}
      </p>
      <p>
        mittels einer eindeutigen Erklärung (z. B. ein mit der Post versandter Brief oder eine
        E-Mail) über Ihren Entschluss, diesen Vertrag zu widerrufen, informieren. Sie können dafür
        das nachstehende Muster-Widerrufsformular verwenden, das jedoch nicht vorgeschrieben ist.
      </p>
      <p>
        Zur Wahrung der Widerrufsfrist reicht es aus, dass Sie die Mitteilung über die Ausübung des
        Widerrufsrechts vor Ablauf der Widerrufsfrist absenden.
      </p>

      <h2>Folgen des Widerrufs</h2>
      <p>
        Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen, die wir von Ihnen
        erhalten haben, unverzüglich und spätestens binnen vierzehn Tagen ab dem Tag zurückzuzahlen,
        an dem die Mitteilung über Ihren Widerruf dieses Vertrags bei uns eingegangen ist. Für diese
        Rückzahlung verwenden wir dasselbe Zahlungsmittel, das Sie bei der ursprünglichen
        Transaktion eingesetzt haben, es sei denn, mit Ihnen wurde ausdrücklich etwas anderes
        vereinbart; in keinem Fall werden Ihnen wegen dieser Rückzahlung Entgelte berechnet.
      </p>

      <h2>Vorzeitiges Erlöschen des Widerrufsrechts</h2>
      <p>
        Das Widerrufsrecht erlischt bei einem Vertrag zur Lieferung von nicht auf einem körperlichen
        Datenträger befindlichen digitalen Inhalten (Credits) vorzeitig, wenn wir mit der Ausführung
        des Vertrags begonnen haben, nachdem Sie
      </p>
      <ul>
        <li>
          ausdrücklich zugestimmt haben, dass wir mit der Ausführung des Vertrags vor Ablauf der
          Widerrufsfrist beginnen, und
        </li>
        <li>
          Ihre Kenntnis davon bestätigt haben, dass Sie durch Ihre Zustimmung mit Beginn der
          Ausführung des Vertrags Ihr Widerrufsrecht verlieren, und
        </li>
        <li>wir Ihnen eine Bestätigung des Vertrags zur Verfügung gestellt haben.</li>
      </ul>
      <p>
        Diese Zustimmung holen wir im Bezahlvorgang über eine gesonderte, aktiv anzuklickende
        Auswahl ein. Die Gutschrift der Credits gilt als Beginn und zugleich vollständige Erbringung
        der Leistung.
      </p>

      <h2>Muster-Widerrufsformular</h2>
      <p>
        (Wenn Sie den Vertrag widerrufen wollen, füllen Sie bitte dieses Formular aus und senden Sie
        es zurück.)
      </p>
      <p>
        &mdash; An {OPERATOR.name}, {OPERATOR.street}, {OPERATOR.zipCity}, {OPERATOR.country}, E-Mail:{' '}
        {OPERATOR.email}:
        <br />
        &mdash; Hiermit widerrufe(n) ich/wir (*) den von mir/uns (*) abgeschlossenen Vertrag über den
        Kauf der folgenden Credits (*)
        <br />
        &mdash; Bestellt am (*)/erhalten am (*)
        <br />
        &mdash; Name des/der Verbraucher(s)
        <br />
        &mdash; Anschrift des/der Verbraucher(s)
        <br />
        &mdash; Unterschrift des/der Verbraucher(s) (nur bei Mitteilung auf Papier)
        <br />
        &mdash; Datum
        <br />
        (*) Unzutreffendes streichen.
      </p>
    </LegalPage>
  );
}
