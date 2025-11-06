'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Library, ListMusic, Mic2, Music2, Radio, Search } from "lucide-react";
import clsx from "clsx";

const primaryNav = [
  { icon: Music2, label: "Home", href: "/" },
  { icon: Search, label: "Search", href: "#search" },
  { icon: Radio, label: "Radio", href: "#radio" },
];

const libraryNav = [
  { icon: Library, label: "Your Library", href: "#library" },
  { icon: ListMusic, label: "Playlists", href: "#playlists" },
  { icon: Mic2, label: "Artists", href: "#artists" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 flex-col gap-6 rounded-3xl bg-zinc-950/80 p-6 backdrop-blur lg:flex">
      <div className="flex items-center gap-2">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-lg font-semibold text-black">
          ♫
        </span>
        <span className="text-xl font-bold tracking-tight">Ripplefy</span>
      </div>

      <nav className="space-y-6 text-sm font-medium text-zinc-400">
        <div className="space-y-2">
          {primaryNav.map((item) => (
            <SidebarLink
              key={item.label}
              href={item.href}
              icon={item.icon}
              label={item.label}
              active={pathname === item.href}
            />
          ))}
        </div>
        <div className="space-y-2">
          <p className="px-3 text-xs uppercase tracking-widest text-zinc-500">
            Library
          </p>
          {libraryNav.map((item) => (
            <SidebarLink
              key={item.label}
              href={item.href}
              icon={item.icon}
              label={item.label}
            />
          ))}
        </div>
      </nav>

      <div className="mt-auto space-y-4 text-xs text-zinc-500">
        <p className="rounded-2xl border border-dashed border-emerald-500/30 p-4 text-sm text-zinc-300">
          Build playlists, save artists, and sync with your devices for the full
          Ripplefy experience.
        </p>
        <div className="flex flex-wrap gap-x-3 gap-y-1">
          <Link href="#" className="hover:text-zinc-300">
            Legal
          </Link>
          <Link href="#" className="hover:text-zinc-300">
            Privacy
          </Link>
          <Link href="mailto:support@ripplefy.app" className="hover:text-zinc-300">
            Support
          </Link>
        </div>
      </div>
    </aside>
  );
}

type SidebarLinkProps = {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  active?: boolean;
};

function SidebarLink({
  href,
  icon: Icon,
  label,
  active = false,
}: SidebarLinkProps) {
  return (
    <Link
      href={href}
      className={clsx(
        "flex items-center gap-3 rounded-2xl px-3 py-2 transition hover:bg-zinc-800/60 hover:text-zinc-100",
        active && "bg-zinc-800/80 text-zinc-100",
      )}
    >
      <Icon className="h-5 w-5" />
      <span>{label}</span>
    </Link>
  );
}
