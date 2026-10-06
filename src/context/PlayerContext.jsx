import { createContext, useContext, useEffect, useRef, useState } from "react";
import songs from "../data/songs";

const Ctx = createContext();

const useStored = (key, init) => {
  const [v, set] = useState(() => {
    try { return JSON.parse(localStorage.getItem(key)) ?? init; } catch { return init; }
  });
  useEffect(() => { try { localStorage.setItem(key, JSON.stringify(v)); } catch {} }, [key, v]);
  return [v, set];
};

export function PlayerProvider({ children }) {
  const audio = useRef(null);
  if (!audio.current) audio.current = new Audio();
  const actx = useRef(null);
  const analyser = useRef(null);

  const [queue, setQueue] = useState(songs);
  const [index, setIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState("none");
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [npOpen, setNpOpen] = useState(false);
  const [toast, setToast] = useState({ msg: "", show: false });
  const [volume, setVolume] = useStored("dhunly-volume", 0.8);
  const [liked, setLiked] = useStored("dhunly-liked", []);
  const [playlists, setPlaylists] = useStored("dhunly-playlists", []);
  const [recent, setRecent] = useStored("dhunly-recent", []);
  const current = queue[index] || null;

  const tRef = useRef();
  const notify = (msg) => {
    setToast({ msg, show: true });
    clearTimeout(tRef.current);
    tRef.current = setTimeout(() => setToast((t) => ({ ...t, show: false })), 2000);
  };

  // visualizer: only for same-origin audio (remote audio without CORS would go silent)
  const initAudio = (song) => {
    if (actx.current) { actx.current.resume(); return; }
    if (!song || !song.audio.startsWith("/")) return;
    try {
      const C = window.AudioContext || window.webkitAudioContext;
      const ctx = new C();
      const src = ctx.createMediaElementSource(audio.current);
      const an = ctx.createAnalyser();
      an.fftSize = 128;
      src.connect(an); an.connect(ctx.destination);
      actx.current = ctx; analyser.current = an;
    } catch {}
  };
  const getAnalyser = () => analyser.current;

  useEffect(() => {
    if (!current) return;
    audio.current.src = current.audio;
    if (isPlaying) audio.current.play().catch(() => setIsPlaying(false));
    setRecent((r) => [current, ...r.filter((s) => s.id !== current.id)].slice(0, 8));
  }, [current?.id]);

  useEffect(() => {
    if (!current) return;
    if (isPlaying) audio.current.play().catch(() => setIsPlaying(false));
    else audio.current.pause();
  }, [isPlaying]);

  useEffect(() => { audio.current.volume = volume; }, [volume]);

  const next = (auto = false) => {
    if (!queue.length) return;
    if (auto && repeat === "one") { audio.current.currentTime = 0; audio.current.play(); return; }
    let i = shuffle ? Math.floor(Math.random() * queue.length) : index + 1;
    if (i >= queue.length) {
      if (repeat === "all" || !auto) i = 0;
      else { setIsPlaying(false); return; }
    }
    setIndex(i); setIsPlaying(true);
  };
  const nextRef = useRef(next); nextRef.current = next;

  useEffect(() => {
    const a = audio.current;
    const t = () => setTime(a.currentTime);
    const d = () => setDuration(a.duration || 0);
    const e = () => nextRef.current(true);
    a.addEventListener("timeupdate", t);
    a.addEventListener("loadedmetadata", d);
    a.addEventListener("ended", e);
    return () => { a.removeEventListener("timeupdate", t); a.removeEventListener("loadedmetadata", d); a.removeEventListener("ended", e); };
  }, []);

  const playSong = (song, list = songs) => {
    initAudio(song);
    if (current?.id === song.id && list === queue) { setIsPlaying((p) => !p); return; }
    setQueue(list);
    setIndex(list.findIndex((s) => s.id === song.id));
    setIsPlaying(true);
  };
  const togglePlay = () => { if (!current) return; initAudio(current); setIsPlaying((p) => !p); };
  const seek = (t) => { audio.current.currentTime = t; setTime(t); };
  const prev = () => {
    if (time > 3) return seek(0);
    setIndex((i) => (i - 1 < 0 ? queue.length - 1 : i - 1)); setIsPlaying(true);
  };
  const toggleRepeat = () => setRepeat((r) => (r === "none" ? "all" : r === "all" ? "one" : "none"));

  const addToQueue = (song) => { setQueue((q) => [...q, song]); notify("Added to queue"); };
  const removeFromQueue = (i) => { if (i > index) setQueue((q) => q.filter((_, x) => x !== i)); };

  const isLiked = (id) => liked.some((s) => s.id === id);
  const toggleLike = (song) => {
    const has = isLiked(song.id);
    setLiked((l) => (has ? l.filter((s) => s.id !== song.id) : [song, ...l]));
    notify(has ? "Removed from Liked Songs" : "Added to Liked Songs");
  };

  const createPlaylist = (name) => {
    setPlaylists((p) => [...p, { id: Date.now(), name: name.trim(), songs: [] }]);
    notify(`Created “${name.trim()}”`);
  };
  const deletePlaylist = (id) => { setPlaylists((p) => p.filter((x) => x.id !== id)); notify("Playlist deleted"); };
  const addToPlaylist = (pid, song) => {
    const pl = playlists.find((x) => x.id === pid);
    if (!pl) return;
    if (pl.songs.some((s) => s.id === song.id)) { notify(`Already in ${pl.name}`); return; }
    setPlaylists((p) => p.map((x) => (x.id === pid ? { ...x, songs: [...x.songs, song] } : x)));
    notify(`Added to ${pl.name}`);
  };

  return (
    <Ctx.Provider value={{
      current, queue, index, isPlaying, shuffle, repeat, time, duration, volume,
      liked, playlists, recent, npOpen, setNpOpen, toast, getAnalyser,
      playSong, togglePlay, next: () => next(false), prev, seek, setVolume,
      toggleShuffle: () => setShuffle((s) => !s), toggleRepeat,
      addToQueue, removeFromQueue, isLiked, toggleLike, createPlaylist, deletePlaylist, addToPlaylist,
    }}>
      {children}
    </Ctx.Provider>
  );
}
export const usePlayer = () => useContext(Ctx);