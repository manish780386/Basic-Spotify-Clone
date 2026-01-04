import { createContext, useContext, useState } from "react";
import songs from "../data/songs";

const PlayerContext = createContext();

export function PlayerProvider({ children }) {
  const [currentSong, setCurrentSong] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState("none"); // none | all | one

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
    if (repeat === "one") {
      setIsPlaying(true);
      return;
    }

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
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export const usePlayer = () => useContext(PlayerContext);
