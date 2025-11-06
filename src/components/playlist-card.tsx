'use client';

import Image from "next/image";
import { Play } from "lucide-react";

import type { DeezerPlaylist } from "@/types/deezer";

type PlaylistCardProps = {
  playlist: DeezerPlaylist;
};

export function PlaylistCard({ playlist }: PlaylistCardProps) {
  return (
    <a
      href={playlist.tracklist}
      target="_blank"
      rel="noreferrer"
      className="group relative overflow-hidden rounded-3xl border border-white/5 bg-zinc-950/60 p-4 transition hover:-translate-y-1 hover:border-emerald-400/50 hover:bg-zinc-900/90"
    >
      <div className="relative mb-4 aspect-square overflow-hidden rounded-2xl">
        <Image
          src={playlist.picture_medium}
          alt={playlist.title}
          fill
          sizes="150px"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 backdrop-blur-sm transition group-hover:opacity-100">
          <Play className="h-8 w-8 text-white" />
        </div>
      </div>
      <div className="space-y-2">
        <p className="line-clamp-2 text-sm font-semibold leading-tight text-white">
          {playlist.title}
        </p>
        <p className="text-xs text-zinc-400">
          {playlist.nb_tracks} tracks · Curated by {playlist.user.name}
        </p>
      </div>
    </a>
  );
}
