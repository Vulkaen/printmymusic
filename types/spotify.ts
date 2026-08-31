export interface SpotifyImage {
  url: string;
  width: number | null;
  height: number | null;
}

export interface SpotifyArtistRef {
  id: string;
  name: string;
}

export interface SpotifyAlbumSearchItem {
  id: string;
  name: string;
  artists: SpotifyArtistRef[];
  images: SpotifyImage[];
  releaseDate: string;
  releaseYear: string;
  albumType: string;
  totalTracks: number;
  spotifyUrl: string;
}

export interface SpotifySearchResponse {
  albums: SpotifyAlbumSearchItem[];
}

export interface SpotifyTrackItem {
  id: string;
  name: string;
  trackNumber: number;
  discNumber: number;
  durationMs: number;
}

export interface SpotifyAlbumDetail {
  id: string;
  name: string;
  artists: SpotifyArtistRef[];
  images: SpotifyImage[];
  releaseDate: string;
  releaseYear: string;
  totalTracks: number;
  spotifyUrl: string;
  tracks: SpotifyTrackItem[];
}

export interface SpotifyErrorResponse {
  error: string;
  message: string;
}
