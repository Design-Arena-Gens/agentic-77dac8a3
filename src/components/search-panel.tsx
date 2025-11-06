'use client';

import { useMemo, useState } from "react";
import useSWR from "swr";
import { Disc3, MicVocal, Music4 } from "lucide-react";

import type { DeezerAlbum, DeezerArtist, DeezerTrack } from "@/types/deezer";
import { useDebounce } from "@/hooks/use-debounce";
import { TrackTable } from "@/components/track-table";
import { AlbumCard } from "@/components/album-card";
import { ArtistCard } from "@/components/artist-card";

const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch search results");
  }
  return response.json();
};

type SearchPanelProps = {
  onPlayTrack: (track: DeezerTrack) => void;
  activeTrackId?: number | null;
};

export function SearchPanel({ onPlayTrack, activeTrackId }: SearchPanelProps) {
  const [query, setQuery] = useState("");
  const [type, setType] = useState<"track" | "album" | "artist">("track");
  const debouncedQuery = useDebounce(query);

  const endpoint = useMemo(() => {
    if (!debouncedQuery) return null;
    const params = new URLSearchParams({
      q: debouncedQuery,
      type,
      limit: type === "track" ? "25" : "18",
    });
    return `/api/deezer/search?${params.toString()}`;
  }, [debouncedQuery, type]);

  const { data, isLoading, error } = useSWR(endpoint, fetcher, {
    revalidateOnFocus: false,
  });

  const dataCount = data?.data?.length ?? 0;

  return (
    <section
      id="search"
      className="rounded-3xl border border-white/5 bg-zinc-950/60 p-6 md:p-8"
    >
      <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-widest text-emerald-400">
            Search the catalog
          </p>
          <h2 className="text-2xl font-semibold text-white">
            Find your next obsession
          </h2>
        </div>
        <div className="flex items-center gap-2 rounded-full bg-zinc-900 p-1 text-xs font-semibold uppercase tracking-widest text-zinc-400">
          <FilterPill
            active={type === "track"}
            label="Tracks"
            icon={<Music4 className="h-4 w-4" />}
            onClick={() => setType("track")}
          />
          <FilterPill
            active={type === "album"}
            label="Albums"
            icon={<Disc3 className="h-4 w-4" />}
            onClick={() => setType("album")}
          />
          <FilterPill
            active={type === "artist"}
            label="Artists"
            icon={<MicVocal className="h-4 w-4" />}
            onClick={() => setType("artist")}
          />
        </div>
      </header>

      <div className="mt-6">
        <div className="relative">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by song, artist, or album..."
            className="w-full rounded-2xl border border-white/10 bg-zinc-900/80 px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:border-emerald-500 focus:outline-none"
          />
          <span className="absolute right-4 top-1/2 hidden -translate-y-1/2 text-[11px] uppercase tracking-widest text-zinc-500 sm:block">
            enter ↵
          </span>
        </div>
      </div>

      <div className="mt-8 space-y-6">
        {error && (
          <p className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
            Could not load search results. Try again later.
          </p>
        )}
        {isLoading && query && (
          <p className="text-sm text-zinc-400">Searching Deezer...</p>
        )}
        {!query && (
          <p className="text-sm text-zinc-400">
            Start typing to explore 120M+ tracks powered by the free Deezer
            public API.
          </p>
        )}

        {query && !isLoading && !error && dataCount > 0 && type === "track" && (
          <TrackTable
            tracks={data.data as DeezerTrack[]}
            activeId={activeTrackId ?? null}
            onPlay={onPlayTrack}
          />
        )}

        {query && !isLoading && !error && dataCount > 0 && type === "album" && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {(data.data as DeezerAlbum[]).map((album) => (
              <AlbumCard key={album.id} album={album} />
            ))}
          </div>
        )}

        {query && !isLoading && !error && dataCount > 0 && type === "artist" && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {(data.data as DeezerArtist[]).map((artist) => (
              <ArtistCard key={artist.id} artist={artist} />
            ))}
          </div>
        )}

        {query && !isLoading && !error && dataCount === 0 && (
          <p className="text-sm text-zinc-400">
            No results found. Try broadening your search terms.
          </p>
        )}
      </div>
    </section>
  );
}

type FilterPillProps = {
  active: boolean;
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
};

function FilterPill({ active, label, icon, onClick }: FilterPillProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 rounded-full px-3 py-2 transition ${
        active
          ? "bg-emerald-500 text-black shadow-lg"
          : "text-zinc-500 hover:bg-zinc-800 hover:text-zinc-200"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}
