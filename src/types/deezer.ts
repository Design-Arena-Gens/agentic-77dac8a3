export type DeezerImage = {
  url: string;
  width?: number;
  height?: number;
};

export type DeezerArtist = {
  id: number;
  name: string;
  picture: string;
  picture_small: string;
  picture_medium: string;
  picture_big: string;
};

export type DeezerAlbum = {
  id: number;
  title: string;
  cover: string;
  cover_small: string;
  cover_medium: string;
  cover_big: string;
  release_date?: string;
  artist: DeezerArtist;
};

export type DeezerTrack = {
  id: number;
  readable: boolean;
  title: string;
  title_short: string;
  duration: number;
  preview: string;
  link: string;
  rank: number;
  explicit_lyrics: boolean;
  artist: DeezerArtist;
  album: DeezerAlbum;
};

export type DeezerPlaylist = {
  id: number;
  title: string;
  picture: string;
  picture_small: string;
  picture_medium: string;
  picture_big: string;
  creation_date?: string;
  tracklist: string;
  nb_tracks: number;
  user: {
    id: number;
    name: string;
  };
};

export type DeezerSearchResponse<T> = {
  data: T[];
};
