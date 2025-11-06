import { PageClient } from "@/components/page-client";
import {
  getChartAlbums,
  getChartArtists,
  getChartPlaylists,
  getChartTracks,
} from "@/lib/deezer";

export default async function Home() {
  const [trackResponse, albumResponse, playlistResponse, artistResponse] =
    await Promise.all([
      getChartTracks(12),
      getChartAlbums(12),
      getChartPlaylists(8),
      getChartArtists(12),
    ]);

  return (
    <PageClient
      tracks={trackResponse.data}
      albums={albumResponse.data}
      playlists={playlistResponse.data}
      artists={artistResponse.data}
    />
  );
}
