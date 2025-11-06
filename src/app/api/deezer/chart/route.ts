import { NextResponse } from "next/server";

import {
  getChartAlbums,
  getChartArtists,
  getChartPlaylists,
  getChartTracks,
} from "@/lib/deezer";

const handlers = {
  tracks: getChartTracks,
  albums: getChartAlbums,
  artists: getChartArtists,
  playlists: getChartPlaylists,
} as const;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = (searchParams.get("type") ?? "tracks") as keyof typeof handlers;
  const limit = Number(searchParams.get("limit") ?? "20");

  try {
    const fetcher = handlers[type] ?? handlers.tracks;
    const data = await fetcher(limit);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("[DEEZER_CHART]", error);
    return NextResponse.json(
      {
        message: "Unable to load charts from Deezer.",
        error:
          error instanceof Error ? error.message : "Unexpected error occurred.",
      },
      { status: 500 },
    );
  }
}
