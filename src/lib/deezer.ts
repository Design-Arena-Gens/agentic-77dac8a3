import type {
  DeezerAlbum,
  DeezerArtist,
  DeezerPlaylist,
  DeezerSearchResponse,
  DeezerTrack,
} from "@/types/deezer";

const DEEZER_API = "https://api.deezer.com";

type DeezerEndpoint =
  | `/chart/0/tracks`
  | `/chart/0/albums`
  | `/chart/0/artists`
  | `/chart/0/playlists`
  | `/search`;

const DEFAULT_OPTIONS: RequestInit = {
  cache: "no-store",
  headers: {
    Accept: "application/json",
  },
};

async function fetchFromDeezer<T>(
  endpoint: DeezerEndpoint,
  params: Record<string, string | number> = {},
): Promise<T> {
  const searchParams = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    searchParams.set(key, String(value));
  }

  const queryString = searchParams.toString();
  const url = `${DEEZER_API}${endpoint}${queryString ? `?${queryString}` : ""}`;

  const response = await fetch(url, DEFAULT_OPTIONS);

  if (!response.ok) {
    const body = await response.text();
    throw new Error(
      `Deezer request failed (${response.status} ${response.statusText}): ${body}`,
    );
  }

  return (await response.json()) as T;
}

export async function getChartTracks(limit = 20) {
  return fetchFromDeezer<DeezerSearchResponse<DeezerTrack>>(
    "/chart/0/tracks",
    { limit },
  );
}

export async function getChartAlbums(limit = 20) {
  return fetchFromDeezer<DeezerSearchResponse<DeezerAlbum>>(
    "/chart/0/albums",
    { limit },
  );
}

export async function getChartArtists(limit = 20) {
  return fetchFromDeezer<DeezerSearchResponse<DeezerArtist>>(
    "/chart/0/artists",
    { limit },
  );
}

export async function getChartPlaylists(limit = 20) {
  return fetchFromDeezer<DeezerSearchResponse<DeezerPlaylist>>(
    "/chart/0/playlists",
    { limit },
  );
}

export async function searchDeezer(
  query: string,
  options: Partial<{ limit: number; type: "track" | "album" | "artist" }> = {},
) {
  const { limit = 12, type = "track" } = options;
  return fetchFromDeezer<DeezerSearchResponse<
    DeezerTrack | DeezerAlbum | DeezerArtist
  >>("/search", {
    q: type === "track" ? query : `${type}:"${query}"`,
    limit,
  });
}
