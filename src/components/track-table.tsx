'use client';

import clsx from "clsx";
import Image from "next/image";

import type { DeezerTrack } from "@/types/deezer";
import { formatDuration } from "@/utils/format-duration";

type TrackTableProps = {
  tracks: DeezerTrack[];
  activeId?: number | null;
  onPlay: (track: DeezerTrack) => void;
};

export function TrackTable({ tracks, activeId, onPlay }: TrackTableProps) {
  return (
    <div className="overflow-hidden rounded-3xl border border-white/5 bg-zinc-950/50">
      <table className="min-w-full divide-y divide-white/10 text-left text-sm">
        <thead className="text-xs uppercase tracking-widest text-zinc-500">
          <tr>
            <th className="px-6 py-4 font-medium">#</th>
            <th className="px-6 py-4 font-medium">Title</th>
            <th className="px-6 py-4 font-medium">Album</th>
            <th className="px-6 py-4 font-medium">Duration</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5 text-zinc-300">
          {tracks.map((track, index) => (
            <tr
              key={track.id}
              onClick={() => onPlay(track)}
              className={clsx(
                "cursor-pointer transition hover:bg-white/5",
                activeId === track.id && "bg-emerald-500/10 text-emerald-200",
              )}
            >
              <td className="px-6 py-4 align-middle text-xs text-zinc-500">
                {(index + 1).toString().padStart(2, "0")}
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-4">
                  <div className="relative h-12 w-12 overflow-hidden rounded-xl">
                    <Image
                      src={track.album.cover_small}
                      alt={track.title}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">
                      {track.title}
                    </p>
                    <p className="text-xs text-zinc-400">{track.artist.name}</p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 text-xs">{track.album.title}</td>
              <td className="px-6 py-4 text-xs">
                {formatDuration(track.duration)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
