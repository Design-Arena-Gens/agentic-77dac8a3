'use client';

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import {
  Pause,
  Play,
  Repeat,
  Shuffle,
  SkipBack,
  SkipForward,
  Volume2,
} from "lucide-react";

import type { DeezerTrack } from "@/types/deezer";
import { formatDuration } from "@/utils/format-duration";

type PlayerBarProps = {
  queue: DeezerTrack[];
  activeTrack: DeezerTrack | null;
  onPlayPrev: () => void;
  onPlayNext: () => void;
  onTrackEnd: () => void;
};

export function PlayerBar({
  queue,
  activeTrack,
  onPlayPrev,
  onPlayNext,
  onTrackEnd,
}: PlayerBarProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.8);

  const currentTrack = activeTrack ?? queue[0] ?? null;
  const previewUrl = currentTrack?.preview;

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
    }
    const audio = audioRef.current;
    audio.volume = volume;
  }, [volume]);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
    }
    const audio = audioRef.current;

    if (previewUrl) {
      audio.src = previewUrl;
      queueMicrotask(() => setProgress(0));
      audio.play().catch(() => {
        // Autoplay may fail; do nothing.
      });
    } else {
      audio.pause();
      queueMicrotask(() => setProgress(0));
    }

    const handleTimeUpdate = () => {
      setProgress(audio.currentTime);
    };

    const handleEnd = () => {
      onTrackEnd();
    };

    const handlePlayState = () => setIsPlaying(true);
    const handlePauseState = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnd);
    audio.addEventListener("play", handlePlayState);
    audio.addEventListener("pause", handlePauseState);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnd);
      audio.removeEventListener("play", handlePlayState);
      audio.removeEventListener("pause", handlePauseState);
    };
  }, [previewUrl, onTrackEnd]);

  const duration = currentTrack?.duration ?? 30;
  const progressPercent = useMemo(() => {
    if (!duration) return 0;
    return Math.min(100, (progress / duration) * 100);
  }, [progress, duration]);

  const togglePlayback = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => null);
    }
  };

  const handleSeek = (value: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = value;
    setProgress(value);
  };

  return (
    <div className="sticky bottom-0 left-0 right-0 z-40 mt-8 rounded-3xl border border-white/5 bg-zinc-950/80 p-4 backdrop-blur-xl">
      {currentTrack ? (
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-1 items-center gap-4">
            <div className="relative h-16 w-16 overflow-hidden rounded-2xl">
              <Image
                src={currentTrack.album.cover_medium}
                alt={currentTrack.title}
                fill
                sizes="64px"
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">
                {currentTrack.title}
              </p>
              <p className="text-xs text-zinc-400">{currentTrack.artist.name}</p>
            </div>
          </div>

          <div className="flex flex-1 flex-col items-center gap-3">
            <div className="flex items-center gap-6">
              <button className="rounded-full p-2 hover:bg-white/10">
                <Shuffle className="h-4 w-4 text-zinc-400" />
              </button>
              <button
                onClick={onPlayPrev}
                className="rounded-full p-2 hover:bg-white/10"
              >
                <SkipBack className="h-5 w-5 text-zinc-200" />
              </button>
              <button
                onClick={togglePlayback}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-black transition hover:bg-emerald-400"
              >
                {isPlaying ? (
                  <Pause className="h-6 w-6" />
                ) : (
                  <Play className="h-6 w-6" />
                )}
              </button>
              <button
                onClick={onPlayNext}
                className="rounded-full p-2 hover:bg-white/10"
              >
                <SkipForward className="h-5 w-5 text-zinc-200" />
              </button>
              <button className="rounded-full p-2 hover:bg-white/10">
                <Repeat className="h-4 w-4 text-zinc-400" />
              </button>
            </div>

            <div className="flex w-full items-center gap-3 text-xs text-zinc-400">
              <span>{formatDuration(Math.floor(progress))}</span>
              <input
                type="range"
                min={0}
                max={duration}
                step={0.5}
                value={progress}
                onChange={(event) => handleSeek(Number(event.target.value))}
                className="h-1 w-full cursor-pointer appearance-none rounded-full bg-zinc-700 accent-emerald-500"
              />
              <span>{formatDuration(duration)}</span>
            </div>
          </div>

          <div className="flex flex-1 items-center justify-end gap-3">
            <Volume2 className="h-5 w-5 text-zinc-400" />
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={volume}
              onChange={(event) => setVolume(Number(event.target.value))}
              className="h-1 w-32 cursor-pointer appearance-none rounded-full bg-zinc-700 accent-emerald-500 md:w-40"
            />
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between text-sm text-zinc-400">
          <p>Select a track to start listening.</p>
        </div>
      )}
      <div
        className="mt-4 h-1 rounded-full bg-zinc-800"
        style={{
          background: `linear-gradient(to right, #34d399 ${progressPercent}%, rgba(39,39,42,0.8) ${progressPercent}%)`,
        }}
      />
    </div>
  );
}
