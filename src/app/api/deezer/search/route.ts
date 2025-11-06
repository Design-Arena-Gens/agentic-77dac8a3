import { NextResponse } from "next/server";

import { searchDeezer } from "@/lib/deezer";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q");
  const type = (searchParams.get("type") ?? "track") as
    | "track"
    | "album"
    | "artist";
  const limit = Number(searchParams.get("limit") ?? "12");

  if (!q) {
    return NextResponse.json(
      { message: "Missing search query." },
      { status: 400 },
    );
  }

  try {
    const data = await searchDeezer(q, { type, limit });
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("[DEEZER_SEARCH]", error);
    return NextResponse.json(
      {
        message: "Unable to search Deezer.",
        error:
          error instanceof Error ? error.message : "Unexpected error occurred.",
      },
      { status: 500 },
    );
  }
}
