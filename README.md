<div align="center">

# 🎧 Ripplefy – Spotify-Style Music Streaming Experience

Spotify-inspired web player that lets you browse trending music, discover new releases, explore curated playlists, and play 30-second previews powered by the free [Deezer public API](https://developers.deezer.com/api).

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import)

</div>

## ✨ Features

- **Spotify-grade UI** built with Next.js App Router, Tailwind CSS 4, and modern glassmorphism styling.
- **Trending hub** highlighting top global tracks, editor playlists, fresh releases, and rising artists from Deezer charts.
- **Search anything** – instantly query tracks, albums, or artists via the Deezer search endpoint with client-side caching.
- **Preview player** – interactive playback controls for Deezer’s 30-second previews, queue management, and volume control.
- **Responsive layout** – adaptive sidebar + mobile top bar for a crisp experience on any device.

## 🛠️ Tech Stack

- [Next.js 16 App Router](https://nextjs.org/)
- [React 19](https://react.dev/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [SWR](https://swr.vercel.app/) for data fetching & caching
- [Lucide Icons](https://lucide.dev/) for crisp interface icons
- Deezer REST API (no auth keys required)

## 🚀 Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000` to explore Ripplefy locally. Tailwind + hot reloading means edits appear instantly.

## 🧪 Production Build

```bash
npm run build
npm start
```

## 📦 Project Structure

```
src/
  app/             # App Router pages, API routes, global styles
  components/      # Reusable UI components (player, cards, layout)
  hooks/           # Custom React hooks
  lib/             # Deezer API helpers
  types/           # Shared TypeScript models
  utils/           # Formatting utilities
```

## 🔌 Deezer API Usage

No tokens required. Requests are proxied through Next.js API routes for server-side fetching:

- `GET /api/deezer/chart?type=tracks` – charts (tracks/albums/artists/playlists)
- `GET /api/deezer/search?q=drake&type=track` – universal search

## 📄 License

MIT — feel free to remix and deploy your own flavor of Ripplefy.
