'use client';

import Image from "next/image";
import { Play, Waves } from "lucide-react";
import clsx from "clsx";

import type { DeezerTrack } from "@/types/deezer";
import { formatDuration } from "@/utils/format-duration";

type TrackCardProps = {
  track: DeezerTrack;
  onPlay: (track: DeezerTrack) => void;
  isActive?: boolean;
};

export function TrackCard({ track, onPlay, isActive = false }: TrackCardProps) {
  return (
    <button
      onClick={() => onPlay(track)}
      className={clsx(
        "group relative overflow-hidden rounded-3xl border border-white/5 bg-zinc-950/60 p-4 text-left transition hover:-translate-y-1 hover:border-emerald-400/50 hover:bg-zinc-900/90",
        isActive && "border-emerald-500/80 bg-zinc-900/90",
      )}
    >
      <div className="relative mb-4 aspect-square overflow-hidden rounded-2xl">
        <Image
          src={track.album.cover_medium}
          alt={track.title}
          fill
          sizes="150px"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 backdrop-blur-sm transition group-hover:opacity-100">
          <Play className="h-8 w-8 text-white" />
        </div>
      </div>

      <div className="space-y-1">
        <div className="flex items-start justify-between">
          <p className="line-clamp-2 text-sm font-semibold leading-tight text-white">
            {track.title}
          </p>
          {isActive && <Waves className="h-5 w-5 text-emerald-400" />}
        </div>
        <p className="text-xs text-zinc-400">{track.artist.name}</p>
        <p className="text-[11px] uppercase tracking-widest text-zinc-500">
          {formatDuration(track.duration)} · Rank #{track.rank}
        </p>
      </div>
    </button>
  );
}
