import { useEffect } from "react";
import { usePlayer } from "../context/PlayerContext";

export default function useKeyboardControls() {
  const { togglePlay, nextSong, prevSong } = usePlayer();

  useEffect(() => {
    const handleKeyDown = (e) => {
      // form input me focus ho to skip
      if (e.target.tagName === "INPUT") return;

      if (e.code === "Space") {
        e.preventDefault();
        togglePlay();
      }

      if (e.code === "ArrowRight") {
        nextSong();
      }

      if (e.code === "ArrowLeft") {
        prevSong();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
}
