# Dhunly

A Spotify-style music player built with React, Vite and Tailwind CSS v4. It runs fully in the browser (frontend only). Liked songs, playlists and volume are saved in `localStorage`.

## Features

- Spotify-style layout: sidebar, main content, "Now playing" and queue panel, bottom player bar
- Pages: Home, Search, Your Library (liked songs and playlists), Playlist detail
- Player: play/pause, next/previous, seek bar, volume and mute, shuffle, repeat (off / all / one)
- Queue: add songs, remove upcoming songs, click to jump
- Likes and playlists: create, delete, add songs, saved after refresh
- Search with debounce (matches title and artist)
- Dark and light theme
- Mobile layout: bottom navigation and mini player
- Keyboard shortcuts: `Space` play/pause, `→` next, `←` previous

## Tech stack

React 19, Vite 7, Tailwind CSS v4, React Router 7, lucide-react (icons), framer-motion (installed, optional).

## Getting started

```bash
npm install
npm i lucide-react
npm run dev
```

Open `http://localhost:5173`.

Build for production:

```bash
npm run build
npm run preview
```

## Folder structure

```
src/
├── main.jsx                  entry, BrowserRouter
├── App.jsx                   ThemeProvider + layout
├── index.css                 Tailwind, theme colors, slider and equalizer styles
├── data/
│   └── songs.js              song list (edit this to add songs)
├── context/
│   ├── PlayerContext.jsx     audio engine, queue, likes, playlists, persistence
│   └── ThemeContext.jsx      dark / light theme
├── layout/
│   └── MainLayout.jsx        routes and page shell
├── pages/
│   ├── Home.jsx
│   ├── Search.jsx
│   ├── Library.jsx
│   └── Playlist.jsx
├── components/
│   ├── sidebar/              Sidebar.jsx, BottomNav.jsx
│   ├── player/               Player.jsx
│   ├── queue/                QueuePanel.jsx
│   ├── song/                 SongRow.jsx, SongCard.jsx
│   └── ui/                   ThemeToggle.jsx, Slider.jsx
└── hooks/
    ├── useDebounce.js
    └── useKeyboardControls.js
public/
└── music/                    your mp3 files go here
```

## How it works

`PlayerContext` owns a single `Audio` object for the whole app. Every component reads state and actions through `usePlayer()`. Main values:

| Name                                                      | What it does                               |
| --------------------------------------------------------- | ------------------------------------------ |
| `current`, `isPlaying`, `time`, `duration`        | Current track and playback state           |
| `playSong(song, list)`                                  | Plays a song and uses`list` as the queue |
| `next()`, `prev()`, `seek(t)`, `togglePlay()`     | Playback controls                          |
| `toggleShuffle()`, `toggleRepeat()`                   | Modes (repeat cycles none, all, one)       |
| `addToQueue(song)`, `removeFromQueue(i)`              | Queue editing                              |
| `toggleLike(song)`, `isLiked(id)`                     | Liked songs                                |
| `createPlaylist`, `deletePlaylist`, `addToPlaylist` | Playlists                                  |

Saved in `localStorage`: `dhunly-liked`, `dhunly-playlists`, `dhunly-volume`.

## Adding songs

1. Put the mp3 file in `public/music/`, for example `public/music/tum-hi-ho.mp3`.
2. Add an entry in `src/data/songs.js`:

```js
{
  id: 4,                                  // must be unique
  title: "Tum Hi Ho",
  artist: "Arijit Singh",
  audio: "/music/tum-hi-ho.mp3",          // path inside public/
  cover: "https://images.unsplash.com/photo-...",   // image URL or /covers/x.jpg
  duration: "4:22",                       // shown in the list only
},
```

Tips:

- File names: lowercase, no spaces (`song-name.mp3`).
- Local covers: put them in `public/covers/` and use `/covers/name.jpg`.
- Only use music you own or have the rights to use.

## Customizing

- **App name:** `APP_NAME` in `components/sidebar/Sidebar.jsx` and `<title>` in `index.html`.
- **Colors:** CSS variables at the top of `src/index.css` (`--accent`, `--panel`, `--bg`, and others). The `html.light` block holds the light theme.
- **Font:** the Google Fonts link in `index.html` and `font-family` in `index.css`.

## Troubleshooting

| Problem                                                  | Fix                                                                                                                                       |
| -------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `ERR_CONNECTION_REFUSED` on localhost                  | The dev server is not running. Run`npm run dev` and read the terminal error.                                                            |
| `Failed to resolve import "lucide-react"`              | Run`npm i lucide-react`.                                                                                                                |
| `Cannot read properties of undefined (reading 'some')` | An old component still uses`likedSongs`. Use `liked` / `isLiked()` from the new context.                                            |
| `manifest.webmanifest` syntax error in console         | Old PWA service worker in the browser. DevTools, Application, Service Workers, Unregister, then Clear site data.                          |
| Song does not play                                       | Check that the file exists in`public/music/` and the `audio` path matches exactly. Browsers may block autoplay until the first click. |

## Roadmap ideas

- Full-screen "Now playing" view with audio visualizer
- Mobile full-screen player with swipe down to close
- Genre and mood cards, "Recently played", "Jump back in"
- Drag-and-drop queue reordering and playlist reordering
- Lyrics panel, sleep timer, playback speed
- Search filters (songs, artists, playlists), artist and album pages
- Real song source through an API (for example Jamendo, Audius or iTunes previews)
- Sign-in and cloud-saved playlists (needs a backend)
- PWA support for installing on a phone
