'use client';

import { useEffect, useMemo, useState } from 'react';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Locale = 'en' | 'de' | 'es' | 'fr';

export const LOCALES: { value: Locale; label: string; short: string }[] = [
  { value: 'en', label: 'English', short: 'EN' },
  { value: 'de', label: 'Deutsch', short: 'DE' },
  { value: 'es', label: 'Español', short: 'ES' },
  { value: 'fr', label: 'Français', short: 'FR' }
];

function applyLang(locale: Locale) {
  if (typeof document === 'undefined') return;
  document.documentElement.lang = locale;
}

interface LocaleStore {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

export const useLocaleStore = create<LocaleStore>()(
  persist(
    (set) => ({
      locale: 'en',
      setLocale: (locale) => {
        applyLang(locale);
        set({ locale });
      }
    }),
    {
      name: 'printmymusic-locale',
      onRehydrateStorage: () => (state) => {
        if (state) applyLang(state.locale);
      }
    }
  )
);

type Dict = Record<string, string>;

const en: Dict = {
  'nav.signIn': 'Sign in',
  'header.openEditor': 'Open the editor',
  'credits.one': 'credit',
  'credits.other': 'credits',
  'credits.suffix': 'left today · refills every 24 h',

  'landing.heroTitle1': 'Your favorite album,',
  'landing.heroTitle2': 'printed on your wall.',
  'landing.heroSub':
    'Search any album, pick a layout, and export a print-ready poster in minutes. No design skills required.',
  'landing.ctaStart': 'Start designing',
  'landing.showcaseTitle': 'Five layouts, light or dark',
  'landing.showcaseSub':
    'Every layout pulls from the same album data and switches between a white or dark color mode — pick whichever fits your wall.',
  'footer.disclaimer':
    'PrintMyMusic is an independent product and is not affiliated with or endorsed by Deezer or Spotify. Album artwork and metadata belong to their respective owners.',

  'section.music': 'Music',
  'section.layout': 'Layout',
  'section.colors': 'Colors',
  'section.typography': 'Typography',
  'section.content': 'Content',
  'section.size': 'Size',
  'section.personalize': 'Personalize',
  'section.export': 'Export',
  'personalize.details': 'Details',
  'personalize.templateLabels': 'Template labels',
  'personalize.cover': 'Cover',
  'personalize.tracks': 'Tracks',

  'search.placeholder': 'Search for an album, artist or song…',
  'search.noResults': 'No results found.',
  'search.failed': 'Search failed.',
  'search.albumFailed': 'Could not load album.',

  'template.colorMode': 'Color mode',
  'template.colorModeHint': 'Applies to whichever layout is selected above.',
  'template.white': 'White',
  'template.dark': 'Dark',

  'colors.background': 'Background',
  'colors.text': 'Text',
  'colors.accent': 'Accent',
  'colors.useAlbum': 'Use colors from album cover',
  'colors.extract': 'Extract',
  'colors.extractFailed': 'Could not extract colors.',

  'type.font': 'Font',
  'type.titleSize': 'Album title size',
  'type.artistSize': 'Artist size',
  'type.trackSize': 'Track size',
  'type.alignment': 'Alignment',

  'content.albumYear': 'Album year',
  'content.trackNumbers': 'Track numbers',
  'content.trackDuration': 'Track duration',
  'content.columns': 'Columns',
  'content.coverSize': 'Cover size',
  'content.spacing': 'Spacing',

  'size.posterSize': 'Poster size',
  'size.widthMm': 'Width (mm)',
  'size.heightMm': 'Height (mm)',
  'size.orientation': 'Orientation',
  'size.portrait': 'Portrait',
  'size.landscape': 'Landscape',

  'details.albumName': 'Album name',
  'details.artistName': 'Artist name',
  'details.releaseYear': 'Release year',
  'details.releaseDate': 'Release date',
  'details.recordLabel': 'Record label',
  'details.recordLabelPlaceholder': 'e.g. Independent',
  'details.hint':
    'Release date and record label show on the Photo template. Editing the date keeps the year in sync.',

  'labels.none': 'This template has no editable labels. Switch to Photo or Player to edit theirs.',
  'labels.reset': 'Reset labels to default',
  'labels.photoAlbumBy': '“An album by” prefix',
  'labels.photoReleaseDate': 'Release date heading',
  'labels.photoRecordLabel': 'Record label heading',
  'labels.photoAlbumLength': 'Album length heading',
  'labels.playerCurrentTime': 'Playback timestamp',

  'tracks.loadFirst': 'Load an album first to edit its tracks.',
  'tracks.one': 'track',
  'tracks.other': 'tracks',
  'tracks.minSec': 'minutes : seconds',
  'tracks.removeAria': 'Remove track',

  'cover.signInPrompt': 'Sign in to upload your own cover art.',
  'cover.invalidType': 'Only JPG, PNG or WebP are allowed.',
  'cover.tooLargeNoShrink': 'Image is too large (max 4 MB) and could not be shrunk automatically.',
  'cover.optimizing': 'Optimizing image…',
  'cover.uploading': 'Uploading…',
  'cover.replace': 'Replace cover',
  'cover.upload': 'Upload your own cover',
  'cover.hint': 'JPG, PNG or WebP. Large photos are shrunk automatically before upload.',
  'cover.active': 'Custom cover active · costs 2 credits to export',
  'cover.uploadFailed': 'Upload failed.',

  'export.format': 'Format',
  'export.quality': 'Quality',
  'export.qWeb': 'Web',
  'export.qPrint': 'Print',
  'export.qPrintHq': 'Print HQ',
  'export.button': 'Export poster',
  'export.signInToExport': 'Sign in to export',
  'export.generating': 'Generating print file…',
  'export.errInsufficient': 'Your daily allowance is used up. Fresh credits arrive in 24 hours.',
  'export.errSignIn': 'Please sign in to export.',
  'export.errGeneric': 'Export failed.',

  'preview.portrait': 'Portrait',
  'preview.landscape': 'Landscape'
};

const de: Dict = {
  'nav.signIn': 'Anmelden',
  'header.openEditor': 'Editor öffnen',
  'credits.one': 'Credit',
  'credits.other': 'Credits',
  'credits.suffix': 'heute übrig · füllt sich alle 24 h auf',

  'landing.heroTitle1': 'Dein Lieblingsalbum,',
  'landing.heroTitle2': 'als Poster an der Wand.',
  'landing.heroSub':
    'Album suchen, Layout wählen und in Minuten ein druckfertiges Poster exportieren. Ganz ohne Design-Kenntnisse.',
  'landing.ctaStart': 'Jetzt gestalten',
  'landing.showcaseTitle': 'Fünf Layouts, hell oder dunkel',
  'landing.showcaseSub':
    'Jedes Layout nutzt dieselben Albumdaten und lässt sich zwischen hellem und dunklem Farbmodus umschalten – nimm, was an deine Wand passt.',
  'footer.disclaimer':
    'PrintMyMusic ist ein eigenständiges Produkt und steht in keiner Verbindung zu Deezer oder Spotify. Albumcover und Metadaten gehören den jeweiligen Rechteinhabern.',

  'section.music': 'Musik',
  'section.layout': 'Layout',
  'section.colors': 'Farben',
  'section.typography': 'Typografie',
  'section.content': 'Inhalt',
  'section.size': 'Format',
  'section.personalize': 'Personalisieren',
  'section.export': 'Export',
  'personalize.details': 'Details',
  'personalize.templateLabels': 'Template-Beschriftungen',
  'personalize.cover': 'Cover',
  'personalize.tracks': 'Titel',

  'search.placeholder': 'Album, Künstler oder Song suchen…',
  'search.noResults': 'Keine Ergebnisse gefunden.',
  'search.failed': 'Suche fehlgeschlagen.',
  'search.albumFailed': 'Album konnte nicht geladen werden.',

  'template.colorMode': 'Farbmodus',
  'template.colorModeHint': 'Gilt für das oben gewählte Layout.',
  'template.white': 'Hell',
  'template.dark': 'Dunkel',

  'colors.background': 'Hintergrund',
  'colors.text': 'Text',
  'colors.accent': 'Akzent',
  'colors.useAlbum': 'Farben aus dem Albumcover übernehmen',
  'colors.extract': 'Auslesen',
  'colors.extractFailed': 'Farben konnten nicht ausgelesen werden.',

  'type.font': 'Schriftart',
  'type.titleSize': 'Albumtitel-Größe',
  'type.artistSize': 'Künstler-Größe',
  'type.trackSize': 'Titel-Größe',
  'type.alignment': 'Ausrichtung',

  'content.albumYear': 'Erscheinungsjahr',
  'content.trackNumbers': 'Titelnummern',
  'content.trackDuration': 'Titellänge',
  'content.columns': 'Spalten',
  'content.coverSize': 'Cover-Größe',
  'content.spacing': 'Abstände',

  'size.posterSize': 'Postergröße',
  'size.widthMm': 'Breite (mm)',
  'size.heightMm': 'Höhe (mm)',
  'size.orientation': 'Ausrichtung',
  'size.portrait': 'Hochformat',
  'size.landscape': 'Querformat',

  'details.albumName': 'Albumname',
  'details.artistName': 'Künstlername',
  'details.releaseYear': 'Erscheinungsjahr',
  'details.releaseDate': 'Erscheinungsdatum',
  'details.recordLabel': 'Label',
  'details.recordLabelPlaceholder': 'z. B. Independent',
  'details.hint':
    'Erscheinungsdatum und Label erscheinen im Photo-Template. Beim Ändern des Datums wird das Jahr mitgezogen.',

  'labels.none':
    'Dieses Template hat keine editierbaren Beschriftungen. Wechsle zu Photo oder Player.',
  'labels.reset': 'Beschriftungen zurücksetzen',
  'labels.photoAlbumBy': '„An album by“-Präfix',
  'labels.photoReleaseDate': 'Überschrift Erscheinungsdatum',
  'labels.photoRecordLabel': 'Überschrift Label',
  'labels.photoAlbumLength': 'Überschrift Gesamtlänge',
  'labels.playerCurrentTime': 'Wiedergabe-Zeitstempel',

  'tracks.loadFirst': 'Lade zuerst ein Album, um die Titel zu bearbeiten.',
  'tracks.one': 'Titel',
  'tracks.other': 'Titel',
  'tracks.minSec': 'Minuten : Sekunden',
  'tracks.removeAria': 'Titel entfernen',

  'cover.signInPrompt': 'Melde dich an, um ein eigenes Cover hochzuladen.',
  'cover.invalidType': 'Nur JPG, PNG oder WebP sind erlaubt.',
  'cover.tooLargeNoShrink':
    'Bild ist zu groß (max. 4 MB) und ließ sich nicht automatisch verkleinern.',
  'cover.optimizing': 'Bild wird optimiert…',
  'cover.uploading': 'Wird hochgeladen…',
  'cover.replace': 'Cover ersetzen',
  'cover.upload': 'Eigenes Cover hochladen',
  'cover.hint': 'JPG, PNG oder WebP. Große Fotos werden vor dem Upload automatisch verkleinert.',
  'cover.active': 'Eigenes Cover aktiv · Export kostet 2 Credits',
  'cover.uploadFailed': 'Upload fehlgeschlagen.',

  'export.format': 'Format',
  'export.quality': 'Qualität',
  'export.qWeb': 'Web',
  'export.qPrint': 'Druck',
  'export.qPrintHq': 'Druck HQ',
  'export.button': 'Poster exportieren',
  'export.signInToExport': 'Zum Export anmelden',
  'export.generating': 'Druckdatei wird erstellt…',
  'export.errInsufficient': 'Dein Tageskontingent ist aufgebraucht. In 24 Stunden gibt es wieder frische Credits.',
  'export.errSignIn': 'Bitte melde dich an, um zu exportieren.',
  'export.errGeneric': 'Export fehlgeschlagen.',

  'preview.portrait': 'Hochformat',
  'preview.landscape': 'Querformat'
};

const es: Dict = {
  'nav.signIn': 'Iniciar sesión',
  'header.openEditor': 'Abrir el editor',
  'credits.one': 'crédito',
  'credits.other': 'créditos',
  'credits.suffix': 'hoy · se recargan cada 24 h',

  'landing.heroTitle1': 'Tu álbum favorito,',
  'landing.heroTitle2': 'impreso en tu pared.',
  'landing.heroSub':
    'Busca cualquier álbum, elige un diseño y exporta un póster listo para imprimir en minutos. Sin conocimientos de diseño.',
  'landing.ctaStart': 'Empezar a diseñar',
  'landing.showcaseTitle': 'Cinco diseños, claro u oscuro',
  'landing.showcaseSub':
    'Cada diseño usa los mismos datos del álbum y cambia entre modo de color claro u oscuro: elige el que combine con tu pared.',
  'footer.disclaimer':
    'PrintMyMusic es un producto independiente y no está afiliado ni respaldado por Deezer o Spotify. Las portadas y los metadatos pertenecen a sus respectivos propietarios.',

  'section.music': 'Música',
  'section.layout': 'Diseño',
  'section.colors': 'Colores',
  'section.typography': 'Tipografía',
  'section.content': 'Contenido',
  'section.size': 'Tamaño',
  'section.personalize': 'Personalizar',
  'section.export': 'Exportar',
  'personalize.details': 'Detalles',
  'personalize.templateLabels': 'Etiquetas de la plantilla',
  'personalize.cover': 'Portada',
  'personalize.tracks': 'Canciones',

  'search.placeholder': 'Busca un álbum, artista o canción…',
  'search.noResults': 'No se encontraron resultados.',
  'search.failed': 'La búsqueda falló.',
  'search.albumFailed': 'No se pudo cargar el álbum.',

  'template.colorMode': 'Modo de color',
  'template.colorModeHint': 'Se aplica al diseño seleccionado arriba.',
  'template.white': 'Claro',
  'template.dark': 'Oscuro',

  'colors.background': 'Fondo',
  'colors.text': 'Texto',
  'colors.accent': 'Acento',
  'colors.useAlbum': 'Usar los colores de la portada',
  'colors.extract': 'Extraer',
  'colors.extractFailed': 'No se pudieron extraer los colores.',

  'type.font': 'Fuente',
  'type.titleSize': 'Tamaño del título',
  'type.artistSize': 'Tamaño del artista',
  'type.trackSize': 'Tamaño de las canciones',
  'type.alignment': 'Alineación',

  'content.albumYear': 'Año del álbum',
  'content.trackNumbers': 'Números de pista',
  'content.trackDuration': 'Duración',
  'content.columns': 'Columnas',
  'content.coverSize': 'Tamaño de la portada',
  'content.spacing': 'Espaciado',

  'size.posterSize': 'Tamaño del póster',
  'size.widthMm': 'Ancho (mm)',
  'size.heightMm': 'Alto (mm)',
  'size.orientation': 'Orientación',
  'size.portrait': 'Vertical',
  'size.landscape': 'Horizontal',

  'details.albumName': 'Nombre del álbum',
  'details.artistName': 'Nombre del artista',
  'details.releaseYear': 'Año de lanzamiento',
  'details.releaseDate': 'Fecha de lanzamiento',
  'details.recordLabel': 'Discográfica',
  'details.recordLabelPlaceholder': 'p. ej. Independent',
  'details.hint':
    'La fecha de lanzamiento y la discográfica aparecen en la plantilla Photo. Al editar la fecha se actualiza el año.',

  'labels.none':
    'Esta plantilla no tiene etiquetas editables. Cambia a Photo o Player para editarlas.',
  'labels.reset': 'Restablecer etiquetas',
  'labels.photoAlbumBy': 'Prefijo “An album by”',
  'labels.photoReleaseDate': 'Título de la fecha de lanzamiento',
  'labels.photoRecordLabel': 'Título de la discográfica',
  'labels.photoAlbumLength': 'Título de la duración total',
  'labels.playerCurrentTime': 'Marca de tiempo de reproducción',

  'tracks.loadFirst': 'Carga primero un álbum para editar sus canciones.',
  'tracks.one': 'canción',
  'tracks.other': 'canciones',
  'tracks.minSec': 'minutos : segundos',
  'tracks.removeAria': 'Quitar canción',

  'cover.signInPrompt': 'Inicia sesión para subir tu propia portada.',
  'cover.invalidType': 'Solo se permiten JPG, PNG o WebP.',
  'cover.tooLargeNoShrink':
    'La imagen es demasiado grande (máx. 4 MB) y no se pudo reducir automáticamente.',
  'cover.optimizing': 'Optimizando la imagen…',
  'cover.uploading': 'Subiendo…',
  'cover.replace': 'Cambiar portada',
  'cover.upload': 'Subir tu propia portada',
  'cover.hint': 'JPG, PNG o WebP. Las fotos grandes se reducen automáticamente antes de subirlas.',
  'cover.active': 'Portada personalizada activa · exportar cuesta 2 créditos',
  'cover.uploadFailed': 'La subida falló.',

  'export.format': 'Formato',
  'export.quality': 'Calidad',
  'export.qWeb': 'Web',
  'export.qPrint': 'Impresión',
  'export.qPrintHq': 'Impresión HQ',
  'export.button': 'Exportar póster',
  'export.signInToExport': 'Inicia sesión para exportar',
  'export.generating': 'Generando el archivo de impresión…',
  'export.errInsufficient': 'Tu cupo diario se ha agotado. Habrá créditos nuevos en 24 horas.',
  'export.errSignIn': 'Inicia sesión para exportar.',
  'export.errGeneric': 'La exportación falló.',

  'preview.portrait': 'Vertical',
  'preview.landscape': 'Horizontal'
};

const fr: Dict = {
  'nav.signIn': 'Se connecter',
  'header.openEditor': 'Ouvrir l’éditeur',
  'credits.one': 'crédit',
  'credits.other': 'crédits',
  'credits.suffix': 'aujourd’hui · rechargé toutes les 24 h',

  'landing.heroTitle1': 'Votre album préféré,',
  'landing.heroTitle2': 'affiché sur votre mur.',
  'landing.heroSub':
    'Cherchez un album, choisissez une mise en page et exportez un poster prêt à imprimer en quelques minutes. Aucune compétence en design requise.',
  'landing.ctaStart': 'Commencer',
  'landing.showcaseTitle': 'Cinq mises en page, claires ou sombres',
  'landing.showcaseSub':
    'Chaque mise en page utilise les mêmes données d’album et bascule entre un mode clair et un mode sombre — choisissez celui qui convient à votre mur.',
  'footer.disclaimer':
    'PrintMyMusic est un produit indépendant, sans lien ni approbation de Deezer ou Spotify. Les pochettes et métadonnées appartiennent à leurs propriétaires respectifs.',

  'section.music': 'Musique',
  'section.layout': 'Mise en page',
  'section.colors': 'Couleurs',
  'section.typography': 'Typographie',
  'section.content': 'Contenu',
  'section.size': 'Format',
  'section.personalize': 'Personnaliser',
  'section.export': 'Export',
  'personalize.details': 'Détails',
  'personalize.templateLabels': 'Libellés du modèle',
  'personalize.cover': 'Pochette',
  'personalize.tracks': 'Titres',

  'search.placeholder': 'Rechercher un album, un artiste ou un titre…',
  'search.noResults': 'Aucun résultat trouvé.',
  'search.failed': 'Échec de la recherche.',
  'search.albumFailed': 'Impossible de charger l’album.',

  'template.colorMode': 'Mode couleur',
  'template.colorModeHint': 'S’applique à la mise en page sélectionnée ci-dessus.',
  'template.white': 'Clair',
  'template.dark': 'Sombre',

  'colors.background': 'Arrière-plan',
  'colors.text': 'Texte',
  'colors.accent': 'Accent',
  'colors.useAlbum': 'Utiliser les couleurs de la pochette',
  'colors.extract': 'Extraire',
  'colors.extractFailed': 'Impossible d’extraire les couleurs.',

  'type.font': 'Police',
  'type.titleSize': 'Taille du titre de l’album',
  'type.artistSize': 'Taille de l’artiste',
  'type.trackSize': 'Taille des titres',
  'type.alignment': 'Alignement',

  'content.albumYear': 'Année de l’album',
  'content.trackNumbers': 'Numéros de piste',
  'content.trackDuration': 'Durée',
  'content.columns': 'Colonnes',
  'content.coverSize': 'Taille de la pochette',
  'content.spacing': 'Espacement',

  'size.posterSize': 'Taille du poster',
  'size.widthMm': 'Largeur (mm)',
  'size.heightMm': 'Hauteur (mm)',
  'size.orientation': 'Orientation',
  'size.portrait': 'Portrait',
  'size.landscape': 'Paysage',

  'details.albumName': 'Nom de l’album',
  'details.artistName': 'Nom de l’artiste',
  'details.releaseYear': 'Année de sortie',
  'details.releaseDate': 'Date de sortie',
  'details.recordLabel': 'Label',
  'details.recordLabelPlaceholder': 'p. ex. Independent',
  'details.hint':
    'La date de sortie et le label apparaissent sur le modèle Photo. Modifier la date met l’année à jour.',

  'labels.none':
    'Ce modèle n’a pas de libellés modifiables. Passez à Photo ou Player pour les modifier.',
  'labels.reset': 'Réinitialiser les libellés',
  'labels.photoAlbumBy': 'Préfixe « An album by »',
  'labels.photoReleaseDate': 'Titre de la date de sortie',
  'labels.photoRecordLabel': 'Titre du label',
  'labels.photoAlbumLength': 'Titre de la durée totale',
  'labels.playerCurrentTime': 'Horodatage de lecture',

  'tracks.loadFirst': 'Chargez d’abord un album pour modifier ses titres.',
  'tracks.one': 'titre',
  'tracks.other': 'titres',
  'tracks.minSec': 'minutes : secondes',
  'tracks.removeAria': 'Supprimer le titre',

  'cover.signInPrompt': 'Connectez-vous pour importer votre propre pochette.',
  'cover.invalidType': 'Seuls les formats JPG, PNG ou WebP sont autorisés.',
  'cover.tooLargeNoShrink':
    'L’image est trop grande (max. 4 Mo) et n’a pas pu être réduite automatiquement.',
  'cover.optimizing': 'Optimisation de l’image…',
  'cover.uploading': 'Envoi…',
  'cover.replace': 'Remplacer la pochette',
  'cover.upload': 'Importer votre pochette',
  'cover.hint': 'JPG, PNG ou WebP. Les grandes photos sont réduites automatiquement avant l’envoi.',
  'cover.active': 'Pochette personnalisée active · l’export coûte 2 crédits',
  'cover.uploadFailed': 'Échec de l’envoi.',

  'export.format': 'Format',
  'export.quality': 'Qualité',
  'export.qWeb': 'Web',
  'export.qPrint': 'Impression',
  'export.qPrintHq': 'Impression HQ',
  'export.button': 'Exporter le poster',
  'export.signInToExport': 'Connectez-vous pour exporter',
  'export.generating': 'Génération du fichier d’impression…',
  'export.errInsufficient': 'Votre quota du jour est épuisé. De nouveaux crédits arrivent dans 24 heures.',
  'export.errSignIn': 'Connectez-vous pour exporter.',
  'export.errGeneric': 'Échec de l’export.',

  'preview.portrait': 'Portrait',
  'preview.landscape': 'Paysage'
};

const messages: Record<Locale, Dict> = { en, de, es, fr };

export type TFunc = (key: string) => string;

export function useT(): TFunc {
  const locale = useLocaleStore((s) => s.locale);

  // Server und erster Client-Render nutzen immer 'en', damit die Hydration
  // nicht auf einer abweichenden persistierten Sprache aufsetzt. Nach dem
  // Mount wird auf die tatsächlich gewählte Sprache umgestellt.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const active: Locale = mounted ? locale : 'en';

  return useMemo<TFunc>(() => {
    const dict = messages[active] ?? en;
    return (key: string) => dict[key] ?? en[key] ?? key;
  }, [active]);
}
