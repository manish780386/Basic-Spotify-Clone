import { useEffect, useRef, useState } from "react";
import { usePlayer } from "../context/PlayerContext";

export default function useAudio() {
  const audioRef = useRef(null);

  const { currentSong, isPlaying, nextSong } = usePlayer();

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Audio create / change when song changes
  useEffect(() => {
    if (!currentSong) return;

    if (audioRef.current) {
      audioRef.current.pause();
    }

    audioRef.current = new Audio(currentSong.audio);

    audioRef.current.onloadedmetadata = () => {
      setDuration(audioRef.current.duration);
    };

    audioRef.current.ontimeupdate = () => {
      setCurrentTime(audioRef.current.currentTime);
    };

    audioRef.current.onended = () => {
      nextSong(); // song end hone par next
    };

    if (isPlaying) {
      audioRef.current.play();
    }

    return () => {
      audioRef.current.pause();
    };
  }, [currentSong]);

  // Play / Pause control
  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  // Seek function (progress bar ke liye)
  const seek = (time) => {
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  return {
    currentTime,
    duration,
    seek,
    audioRef,
  };
}
