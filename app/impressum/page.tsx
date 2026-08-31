import type { Metadata } from 'next';
import { LegalPage } from '@/components/legal/LegalPage';
import { OPERATOR, TAX } from '@/lib/legal';

export const metadata: Metadata = {
  title: 'Impressum — PrintMyMusic',
  robots: { index: false }
};

export default function ImpressumPage() {
  return (
    <LegalPage title="Impressum">
      <h2>Angaben gemäß § 5 DDG</h2>
      <p>
        {OPERATOR.name}
        <br />
        {OPERATOR.street}
        <br />
        {OPERATOR.zipCity}
        <br />
        {OPERATOR.country}
      </p>

      <h2>Kontakt</h2>
      <p>
        E-Mail: <a href={`mailto:${OPERATOR.email}`}>{OPERATOR.email}</a>
        <br />
        Telefon: {OPERATOR.phone}
      </p>

      <h2>Umsatzsteuer</h2>
      {TAX.kleinunternehmer ? (
        <p>
          Als Kleinunternehmer im Sinne von § 19 Abs. 1 UStG wird keine Umsatzsteuer berechnet und
          folglich auch nicht ausgewiesen.
        </p>
      ) : (
        <p>
          Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz:
          <br />
          {TAX.vatId || '«USt-IdNr. eintragen»'}
        </p>
      )}

      <h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
      <p>
        {OPERATOR.name}
        <br />
        {OPERATOR.street}
        <br />
        {OPERATOR.zipCity}
      </p>

      <h2>Verbraucherstreitbeilegung / Universalschlichtungsstelle</h2>
      <p>
        Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer
        Verbraucherschlichtungsstelle teilzunehmen.
      </p>

      <h2>Haftung für Inhalte</h2>
      <p>
        Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene Inhalte auf diesen Seiten nach
        den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG sind wir als Diensteanbieter
        jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen
        oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
        Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den
        allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst
        ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von
        entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
      </p>

      <h2>Haftung für Links</h2>
      <p>
        Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen
        Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen.
        Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der
        Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche
        Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht
        erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne
        konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von
        Rechtsverletzungen werden wir derartige Links umgehend entfernen.
      </p>

      <h2>Urheberrecht</h2>
      <p>
        Die durch den Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem
        deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
        Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des
        jeweiligen Autors bzw. Erstellers.
      </p>
      <p>
        Albumcover, Bandfotos, Songtitel und weitere Metadaten werden über die öffentliche Deezer-API
        bezogen und bleiben Eigentum der jeweiligen Rechteinhaber. PrintMyMusic ist ein
        eigenständiges Produkt und steht in keiner Verbindung zu Deezer oder Spotify.
      </p>
    </LegalPage>
  );
}
