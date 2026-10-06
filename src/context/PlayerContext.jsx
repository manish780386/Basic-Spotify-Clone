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

  const [queue, setQueue] = useState(songs);
  const [index, setIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState("none");
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useStored("dhunly-volume", 0.8);
  const [liked, setLiked] = useStored("dhunly-liked", []);
  const [playlists, setPlaylists] = useStored("dhunly-playlists", []);
  const current = queue[index] || null;

  useEffect(() => {
    if (!current) return;
    audio.current.src = current.audio;
    if (isPlaying) audio.current.play().catch(() => setIsPlaying(false));
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
    if (current?.id === song.id && list === queue) { setIsPlaying((p) => !p); return; }
    setQueue(list);
    setIndex(list.findIndex((s) => s.id === song.id));
    setIsPlaying(true);
  };
  const togglePlay = () => current && setIsPlaying((p) => !p);
  const seek = (t) => { audio.current.currentTime = t; setTime(t); };
  const prev = () => {
    if (time > 3) return seek(0);
    setIndex((i) => (i - 1 < 0 ? queue.length - 1 : i - 1)); setIsPlaying(true);
  };
  const toggleRepeat = () => setRepeat((r) => (r === "none" ? "all" : r === "all" ? "one" : "none"));

  const addToQueue = (song) => setQueue((q) => [...q, song]);
  const removeFromQueue = (i) => { if (i > index) setQueue((q) => q.filter((_, x) => x !== i)); };

  const isLiked = (id) => liked.some((s) => s.id === id);
  const toggleLike = (song) =>
    setLiked((l) => (l.some((s) => s.id === song.id) ? l.filter((s) => s.id !== song.id) : [song, ...l]));

  const createPlaylist = (name) => setPlaylists((p) => [...p, { id: Date.now(), name: name.trim(), songs: [] }]);
  const deletePlaylist = (id) => setPlaylists((p) => p.filter((x) => x.id !== id));
  const addToPlaylist = (pid, song) =>
    setPlaylists((p) => p.map((pl) =>
      pl.id === pid && !pl.songs.some((s) => s.id === song.id) ? { ...pl, songs: [...pl.songs, song] } : pl));

  return (
    <Ctx.Provider value={{
      current, queue, index, isPlaying, shuffle, repeat, time, duration, volume,
      liked, playlists, playSong, togglePlay, next: () => next(false), prev, seek, setVolume,
      toggleShuffle: () => setShuffle((s) => !s), toggleRepeat,
      addToQueue, removeFromQueue, isLiked, toggleLike, createPlaylist, deletePlaylist, addToPlaylist,
    }}>
      {children}
    </Ctx.Provider>
  );
}
export const usePlayer = () => useContext(Ctx);