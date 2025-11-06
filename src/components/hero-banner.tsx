'use client';

import Image from "next/image";
import { PlayCircle } from "lucide-react";

import type { DeezerTrack } from "@/types/deezer";
import { formatDuration } from "@/utils/format-duration";

type HeroBannerProps = {
  track: DeezerTrack;
  onPlay: (track: DeezerTrack) => void;
};

export function HeroBanner({ track, onPlay }: HeroBannerProps) {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-br from-emerald-500/20 via-zinc-900/90 to-zinc-950 p-6 sm:p-10">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
        <div className="relative h-48 w-full overflow-hidden rounded-3xl bg-zinc-900 shadow-2xl sm:h-56 sm:w-56">
          <Image
            src={track.album.cover_big || track.album.cover_medium}
            alt={track.title}
            fill
            sizes="(max-width: 768px) 100vw, 280px"
            className="object-cover"
          />
        </div>

        <div className="flex-1 space-y-5">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-zinc-200">
              Trending Now
            </span>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {track.title}
            </h1>
          </div>
          <p className="text-sm text-zinc-300">
            {track.artist.name} · {track.album.title} ·{" "}
            {formatDuration(track.duration)}
          </p>

          <div className="flex flex-wrap items-center gap-3 text-sm text-zinc-400">
            <span className="rounded-full border border-white/10 px-3 py-1">
              Rank #{track.rank}
            </span>
            <span className="rounded-full border border-white/10 px-3 py-1">
              Preview ready
            </span>
            {track.explicit_lyrics && (
              <span className="rounded-full border border-white/10 px-3 py-1">
                Explicit
              </span>
            )}
          </div>

          <button
            onClick={() => onPlay(track)}
            className="group inline-flex items-center gap-2 rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-black transition hover:bg-emerald-400"
          >
            <PlayCircle className="h-5 w-5 transition group-hover:scale-110" />
            Play Preview
          </button>
        </div>
      </div>
    </section>
  );
}
