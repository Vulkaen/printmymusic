# PrintMyMusic

Erstelle personalisierte, hochauflösende Album-Poster — mit sechs eigenständigen Layouts, freier Farb-/Typografie-Anpassung und Print-Export in 300 DPI.

> PrintMyMusic ist ein unabhängiges Produkt und steht in keiner Verbindung zu Deezer oder Spotify. Es wird kein fremdes Branding verwendet.

## Features

- Musiksuche über die öffentliche **Deezer API** (Album, Künstler) — **kein Account, kein API-Key, keine Anmeldung nötig**
- 6 Poster-Templates: Minimal, Editorial, Typography, Split, Dark, Grid
- Freie Anpassung von Hintergrund-, Text- und Akzentfarbe, inkl. automatischer Farbextraktion aus dem Albumcover
- 5 Schriftarten (Inter, Helvetica, Playfair Display, DM Sans, Space Grotesk)
- 8 Standard-Posterformate (A4 – A2, 30×40, 40×50, 50×70, US Letter, Square) plus Custom Size
- Portrait/Landscape, bis zu 3 Tracklisten-Spalten
- Export als PNG, JPG oder PDF in Web/150 DPI/300 DPI — als eigenständiges Offscreen-Rendering in exakter Zielauflösung, kein Preview-Screenshot
- Lokale Persistenz des Entwurfs (localStorage) + optionale Shareable-URL (`/create?album=...&template=...`)
- Vollständig responsive (Desktop: Editor + Preview nebeneinander, Mobile: Preview oben, Editor darunter)

## Tech-Stack

- Next.js 14 (App Router) + TypeScript + React 18
- Tailwind CSS, Radix UI Primitives, Lucide Icons
- Zustand für globalen State
- **Deezer Public API** (unauthentifiziert, server-seitig via Next.js API-Routen abgefragt)
- `html-to-image` für Offscreen-Canvas-Rendering, `jsPDF` für PDF-Export

## Warum Deezer statt Spotify?

Die Spotify Web API erfordert eine im Spotify Developer Dashboard registrierte App (Client ID/Secret). Dieses Dashboard hat die Neuanlage von Apps zeitweise eingeschränkt bzw. deaktiviert. Deezers Katalog-Endpunkte (`/search`, `/album`, `/track`) sind dagegen vollständig öffentlich und benötigen weder Account noch API-Key — dadurch funktioniert die App sofort, ohne Setup-Hürde und ohne Abhängigkeit von einem Drittanbieter-Dashboard.

## 1. Voraussetzungen

- Node.js ≥ 18.18
- npm ≥ 9

Keine weiteren Accounts oder Zugangsdaten notwendig.

## 2. Installation

```bash
npm install
```

## 3. Development Server starten

```bash
npm run dev
```

Die Anwendung ist anschließend unter [http://localhost:3000](http://localhost:3000) erreichbar.

## 4. Production Build

```bash
npm run build
npm run start
```

## 5. Deployment auf Vercel

1. Repository zu GitHub pushen (oder Dateien direkt über die GitHub-Weboberfläche hochladen).
2. In [Vercel](https://vercel.com/new) das Repository importieren.
3. Auf "Deploy" klicken — es müssen keine Umgebungsvariablen gesetzt werden.

## Projektstruktur

```
app/
  page.tsx                  Landing Page
  create/page.tsx            Poster-Editor (Desktop + Mobile Layout)
  layout.tsx                 Root Layout, Font-Ladelogik
  globals.css
  api/
    spotify/search/route.ts
    spotify/albums/[id]/route.ts
    image-proxy/route.ts

components/
  editor/                    Sidebar-Controls (Layout, Farben, Typografie, Inhalt, Größe, Export)
  poster/                    Preview, Renderer, TrackList, CoverImage, 6 Templates
  spotify/                   AlbumSearch, AlbumSearchResult
  ui/                        Wiederverwendbare UI-Primitives

lib/
  spotify.ts                 Musik-API-Client (intern: Deezer Public API, keine Zugangsdaten nötig)
  poster.ts                  Mapping Musikdaten → PosterData, Demo-Daten
  dimensions.ts               mmToPixels, Postergrößen, Orientierung
  colors.ts                  Cover-Farbextraktion
  export.ts                  Offscreen-Rendering + PNG/JPG/PDF-Export
  store.ts                   Zustand-Store inkl. localStorage-Persistenz
  fonts.ts                   Font-Mapping

types/
  spotify.ts                 Datentypen (anbieterunabhängig benannt, aktuell durch Deezer befüllt)
  poster.ts
```

## Rechtliche Hinweise

- Albumcover, Künstlernamen und Metadaten stammen aus der Deezer Public API und unterliegen den jeweiligen Rechten der Rechteinhaber.
- Für kommerzielle Druckprodukte sind Deezers Nutzungsbedingungen sowie geltendes Urheberrecht zu beachten.
- Diese Anwendung ist nicht offiziell mit Deezer oder Spotify verbunden oder von diesen autorisiert.
