import { motion } from "framer-motion";
import { usePlayer } from "../../context/PlayerContext";
import useAudio from "../../hooks/useAudio";
import VolumeControl from "./VolumeControl";
import useKeyboardControls from "../../hooks/useKeyboardControls";

export default function DesktopPlayer() {
  useKeyboardControls();

  const {
    currentSong,
    isPlaying,
    togglePlay,
    nextSong,
    prevSong,
    shuffle,
    repeat,
    toggleShuffle,
    toggleRepeat,
  } = usePlayer();

  const { currentTime, duration, seek, audioRef } = useAudio();

  if (!currentSong) return null;

  const formatTime = (time) => {
    if (!time) return "0:00";
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60).toString().padStart(2, "0");
    return `${min}:${sec}`;
  };

  return (
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 px-6 py-4 hidden md:flex items-center justify-between"
    >
      {/* LEFT */}
      <div className="flex items-center gap-4 w-1/3">
        <img src={currentSong.cover} className="w-14 h-14 rounded-md" />
        <div>
          <p className="text-sm font-semibold">{currentSong.title}</p>
          <p className="text-xs text-gray-400">{currentSong.artist}</p>
        </div>
      </div>

      {/* CENTER */}
      <div className="flex flex-col items-center w-1/3">
        <div className="flex gap-4 mb-1">
          <button
            onClick={toggleShuffle}
            className={shuffle ? "text-green-400" : "text-gray-400"}
          >
            🔀
          </button>
          <button
            onClick={toggleRepeat}
            className={repeat !== "none" ? "text-green-400" : "text-gray-400"}
          >
            🔁 {repeat === "one" && "1"}
          </button>
        </div>

        <div className="flex gap-6 mb-2">
          <button onClick={prevSong}>⏮</button>
          <button
            onClick={togglePlay}
            className="bg-white text-black w-10 h-10 rounded-full"
          >
            {isPlaying ? "❚❚" : "▶"}
          </button>
          <button onClick={nextSong}>⏭</button>
        </div>

        <div className="flex items-center gap-2 w-full">
          <span className="text-xs">{formatTime(currentTime)}</span>
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={(e) => seek(Number(e.target.value))}
            className="w-full"
          />
          <span className="text-xs">{formatTime(duration)}</span>
        </div>
      </div>

      {/* RIGHT */}
      <div className="w-1/3 flex justify-end">
        <VolumeControl audioRef={audioRef} />
      </div>
    </motion.div>
  );
}
