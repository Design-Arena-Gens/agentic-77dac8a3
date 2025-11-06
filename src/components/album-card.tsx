'use client';

import Image from "next/image";
import { Disc3 } from "lucide-react";

import type { DeezerAlbum } from "@/types/deezer";

type AlbumCardProps = {
  album: DeezerAlbum;
};

export function AlbumCard({ album }: AlbumCardProps) {
  return (
    <a
      href={`https://www.deezer.com/album/${album.id}`}
      target="_blank"
      rel="noreferrer"
      className="group overflow-hidden rounded-3xl border border-white/5 bg-zinc-950/60 transition hover:-translate-y-1 hover:border-emerald-400/50 hover:bg-zinc-900/90"
    >
      <div className="relative aspect-square">
        <Image
          src={album.cover_medium}
          alt={album.title}
          fill
          sizes="150px"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 backdrop-blur-sm transition group-hover:opacity-100">
          <Disc3 className="h-7 w-7 text-white" />
        </div>
      </div>
      <div className="space-y-1 p-4">
        <p className="line-clamp-2 text-sm font-semibold leading-tight text-white">
          {album.title}
        </p>
        <p className="text-xs text-zinc-400">{album.artist.name}</p>
        {album.release_date && (
          <p className="text-[11px] uppercase tracking-widest text-zinc-500">
            Released {album.release_date}
          </p>
        )}
      </div>
    </a>
  );
}
