'use client';

import Image from "next/image";
import { Users } from "lucide-react";

import type { DeezerArtist } from "@/types/deezer";

type ArtistCardProps = {
  artist: DeezerArtist;
};

export function ArtistCard({ artist }: ArtistCardProps) {
  return (
    <a
      href={`https://www.deezer.com/artist/${artist.id}`}
      target="_blank"
      rel="noreferrer"
      className="group flex flex-col items-center gap-3 rounded-3xl border border-white/5 bg-zinc-950/60 p-6 transition hover:-translate-y-1 hover:border-emerald-400/60 hover:bg-zinc-900/90"
    >
      <div className="relative h-28 w-28 overflow-hidden rounded-full border border-white/10">
        <Image
          src={artist.picture_big || artist.picture_medium}
          alt={artist.name}
          fill
          sizes="120px"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="text-center">
        <p className="text-sm font-semibold text-white">{artist.name}</p>
        <p className="flex items-center justify-center gap-1 text-xs text-zinc-400">
          <Users className="h-4 w-4" />
          Follow on Deezer
        </p>
      </div>
    </a>
  );
}
