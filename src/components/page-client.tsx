'use client';

import { useMemo, useState } from "react";

import type {
  DeezerAlbum,
  DeezerArtist,
  DeezerPlaylist,
  DeezerTrack,
} from "@/types/deezer";
import { Sidebar } from "@/components/sidebar";
import { TopBar } from "@/components/top-bar";
import { HeroBanner } from "@/components/hero-banner";
import { TrackCard } from "@/components/track-card";
import { PlaylistCard } from "@/components/playlist-card";
import { AlbumCard } from "@/components/album-card";
import { ArtistCard } from "@/components/artist-card";
import { SearchPanel } from "@/components/search-panel";
import { PlayerBar } from "@/components/player-bar";

type PageClientProps = {
  tracks: DeezerTrack[];
  albums: DeezerAlbum[];
  playlists: DeezerPlaylist[];
  artists: DeezerArtist[];
};

export function PageClient({
  tracks,
  albums,
  playlists,
  artists,
}: PageClientProps) {
  const [queue, setQueue] = useState<DeezerTrack[]>(tracks);
  const [activeTrack, setActiveTrack] = useState<DeezerTrack | null>(
    tracks[0] ?? null,
  );

  const handlePlayTrack = (track: DeezerTrack) => {
    setActiveTrack(track);
    setQueue((previous) => {
      const filtered = previous.filter((entry) => entry.id !== track.id);
      return [track, ...filtered];
    });
  };

  const handlePlayNext = () => {
    if (!activeTrack) return;
    const currentIndex = queue.findIndex((track) => track.id === activeTrack.id);
    const nextTrack = queue[currentIndex + 1] ?? queue[0];
    if (nextTrack) {
      setActiveTrack(nextTrack);
    }
  };

  const handlePlayPrev = () => {
    if (!activeTrack) return;
    const currentIndex = queue.findIndex((track) => track.id === activeTrack.id);
    const previousTrack =
      currentIndex > 0 ? queue[currentIndex - 1] : queue[queue.length - 1];
    if (previousTrack) {
      setActiveTrack(previousTrack);
    }
  };

  const recommendedTracks = useMemo(
    () => queue.slice(0, 6),
    [queue],
  );

  return (
    <div className="mx-auto flex min-h-screen max-w-[1400px] gap-6 p-4 pb-28 lg:p-8">
      <Sidebar />

      <div className="flex flex-1 flex-col gap-6">
        <TopBar onSearchClick={() => document.getElementById("search")?.scrollIntoView({ behavior: "smooth" })} />

        <main className="flex flex-col gap-6">
          {tracks[0] && <HeroBanner track={tracks[0]} onPlay={handlePlayTrack} />}

          <section
            aria-labelledby="trending-heading"
            className="rounded-3xl border border-white/5 bg-zinc-950/60 p-6 md:p-8"
          >
            <SectionHeader
              id="trending-heading"
              title="Trending on Ripplefy"
              subtitle="Hand-picked songs taking over the charts right now."
            />
            <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {tracks.slice(0, 6).map((track) => (
                <TrackCard
                  key={track.id}
                  track={track}
                  onPlay={handlePlayTrack}
                  isActive={activeTrack?.id === track.id}
                />
              ))}
            </div>
          </section>

          <section
            id="playlists"
            className="rounded-3xl border border-white/5 bg-zinc-950/60 p-6 md:p-8"
            aria-labelledby="playlists-heading"
          >
            <SectionHeader
              id="playlists-heading"
              title="Editor's picks"
              subtitle="Curated vibes for every mood, powered by Deezer charts."
            />
            <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {playlists.slice(0, 8).map((playlist) => (
                <PlaylistCard key={playlist.id} playlist={playlist} />
              ))}
            </div>
          </section>

          <section
            id="radio"
            className="rounded-3xl border border-white/5 bg-zinc-950/60 p-6 md:p-8"
            aria-labelledby="albums-heading"
          >
            <SectionHeader
              id="albums-heading"
              title="New releases"
              subtitle="Fresh albums and EPs gracing the global charts."
            />
            <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {albums.slice(0, 8).map((album) => (
                <AlbumCard key={album.id} album={album} />
              ))}
            </div>
          </section>

          <section
            id="artists"
            className="rounded-3xl border border-white/5 bg-zinc-950/60 p-6 md:p-8"
            aria-labelledby="artists-heading"
          >
            <SectionHeader
              id="artists-heading"
              title="Rising artists"
              subtitle="Artists dominating the global charts right now."
            />
            <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {artists.slice(0, 8).map((artist) => (
                <ArtistCard key={artist.id} artist={artist} />
              ))}
            </div>
          </section>

          <section
            className="rounded-3xl border border-white/5 bg-zinc-950/60 p-6 md:p-8"
            aria-labelledby="for-you-heading"
          >
            <SectionHeader
              id="for-you-heading"
              title="Because you played"
              subtitle="We queue up the tracks you love. Tap to jump right back in."
            />
            <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {recommendedTracks.map((track) => (
                <TrackCard
                  key={track.id}
                  track={track}
                  onPlay={handlePlayTrack}
                  isActive={activeTrack?.id === track.id}
                />
              ))}
            </div>
          </section>

          <SearchPanel
            onPlayTrack={handlePlayTrack}
            activeTrackId={activeTrack?.id ?? null}
          />
        </main>

        <PlayerBar
          queue={queue}
          activeTrack={activeTrack}
          onPlayNext={handlePlayNext}
          onPlayPrev={handlePlayPrev}
          onTrackEnd={handlePlayNext}
        />
      </div>
    </div>
  );
}

type SectionHeaderProps = {
  id: string;
  title: string;
  subtitle: string;
};

function SectionHeader({ id, title, subtitle }: SectionHeaderProps) {
  return (
    <header>
      <h2 id={id} className="text-2xl font-semibold text-white">
        {title}
      </h2>
      <p className="text-sm text-zinc-400">{subtitle}</p>
    </header>
  );
}
