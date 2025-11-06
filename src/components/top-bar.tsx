'use client';

import { ListMusic, Search, Sparkles } from "lucide-react";

type TopBarProps = {
  onSearchClick: () => void;
};

export function TopBar({ onSearchClick }: TopBarProps) {
  return (
    <header className="flex items-center justify-between rounded-3xl bg-zinc-950/70 p-4 backdrop-blur lg:hidden">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-lg font-semibold text-black">
          ♫
        </span>
        <div>
          <p className="text-sm uppercase text-zinc-400">Ripplefy</p>
          <p className="text-base font-semibold text-zinc-100">
            Your daily soundtrack
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onSearchClick}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900 text-zinc-200 hover:bg-zinc-800"
        >
          <Search className="h-5 w-5" />
        </button>
        <button className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/90 text-black hover:bg-emerald-400">
          <Sparkles className="h-5 w-5" />
          <span className="sr-only">Discover</span>
        </button>
        <button className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900 text-zinc-200 hover:bg-zinc-800">
          <ListMusic className="h-5 w-5" />
          <span className="sr-only">Library</span>
        </button>
      </div>
    </header>
  );
}
