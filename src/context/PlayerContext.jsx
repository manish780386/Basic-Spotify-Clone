import { createContext, useContext, useState } from "react";

import songs from "../data/songs";

const PlayerContext = createContext();

export function PlayerProvider({ children }) {
  const [playlists, setPlaylists] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState("none"); // none | all | one

  const [likedSongs, setLikedSongs] = useState(
    JSON.parse(localStorage.getItem("likedSongs")) || []
  );

  const createPlaylist = (name) => {
  setPlaylists((prev) => [
    ...prev,
    { id: Date.now(), name, songs: [] },
  ]);
};

const addToPlaylist = (playlistId, song) => {
  setPlaylists((prev) =>
    prev.map((pl) =>
      pl.id === playlistId && !pl.songs.some(s => s.id === song.id)
        ? { ...pl, songs: [...pl.songs, song] }
        : pl
    )
  );
};
  const playSong = (song) => {
    const index = songs.findIndex((s) => s.id === song.id);
    setCurrentIndex(index);
    setCurrentSong(song);
    setIsPlaying(true);
  };

  const togglePlay = () => setIsPlaying((p) => !p);

  const toggleShuffle = () => setShuffle((s) => !s);

  const toggleRepeat = () => {
    setRepeat((prev) =>
      prev === "none" ? "all" : prev === "all" ? "one" : "none"
    );
  };

  const nextSong = () => {
    if (repeat === "one") return;

    let nextIndex;

    if (shuffle) {
      nextIndex = Math.floor(Math.random() * songs.length);
    } else {
      nextIndex = currentIndex + 1;
      if (nextIndex >= songs.length) {
        if (repeat === "all") nextIndex = 0;
        else return;
      }
    }

    setCurrentIndex(nextIndex);
    setCurrentSong(songs[nextIndex]);
    setIsPlaying(true);
  };

  const prevSong = () => {
    let prevIndex = currentIndex - 1;
    if (prevIndex < 0) prevIndex = songs.length - 1;

    setCurrentIndex(prevIndex);
    setCurrentSong(songs[prevIndex]);
    setIsPlaying(true);
  };

  const toggleLike = (song) => {
    const exists = likedSongs.find((s) => s.id === song.id);

    let updated;
    if (exists) {
      updated = likedSongs.filter((s) => s.id !== song.id);
    } else {
      updated = [...likedSongs, song];
    }

    setLikedSongs(updated);
    localStorage.setItem("likedSongs", JSON.stringify(updated));
  };

  return (
    <PlayerContext.Provider
      value={{
        currentSong,
        isPlaying,
        playSong,
        togglePlay,
        nextSong,
        prevSong,
        shuffle,
        repeat,
        toggleShuffle,
        toggleRepeat,
        likedSongs,
        toggleLike,
        addToPlaylist,
        createPlaylist,
        playlists,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export const usePlayer = () => useContext(PlayerContext);
