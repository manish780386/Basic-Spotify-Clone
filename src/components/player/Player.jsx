import { motion } from "framer-motion";
import { usePlayer } from "../../context/PlayerContext";
import useAudio from "../../hooks/useAudio";
import VolumeControl from "./VolumeControl";
import useKeyboardControls from "../../hooks/useKeyboardControls";
import useScreen from "../../hooks/useScreen";
import MobilePlayer from "./MobilePlayer";
import AudioVisualizer from "../visualizer/AudioVisualizer";

export default function Player() {
  useKeyboardControls();
  const isMobile = useScreen();

  // 🎵 Player state
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

  // 🔊 Audio hook
  const { currentTime, duration, seek, audioRef } = useAudio();

  // ❌ no song → no player
  if (!currentSong) return null;

  // 📱 Mobile
  if (isMobile) return <MobilePlayer />;

  // ⏱ format time
  const formatTime = (time) => {
    if (time === undefined || time === null) return "0:00";
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60).toString().padStart(2, "0");
    return `${min}:${sec}`;
  };

  return (
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-700 px-4 py-3 flex items-center justify-between text-white z-50"
    >
      {/* LEFT */}
      <div className="flex items-center gap-3 w-1/3 min-w-0">
        <img
          src={currentSong.cover}
          alt={currentSong.title}
          className="w-14 h-14 rounded-lg object-cover"
        />
        <div className="truncate">
          <p className="text-sm font-semibold truncate">
            {currentSong.title}
          </p>
          <p className="text-xs text-gray-400 truncate">
            {currentSong.artist}
          </p>
        </div>
      </div>

      {/* CENTER */}
      <div className="flex flex-col items-center w-1/3">
        {/* Shuffle / Repeat */}
        <div className="flex gap-5 mb-1 text-xl">
          <button
            onClick={toggleShuffle}
            className={shuffle ? "text-green-400" : "text-gray-500"}
          >
            🔀
          </button>

          <button
            onClick={toggleRepeat}
            className={repeat !== "none" ? "text-green-400" : "text-gray-500"}
          >
            🔁 {repeat === "one" && "1"}
          </button>
        </div>

        {/* Controls */}
        <div className="flex gap-6 mb-2">
          <button onClick={prevSong} className="text-2xl">⏮</button>

          <button
            onClick={togglePlay}
            className="bg-white text-black w-12 h-12 rounded-full font-bold flex items-center justify-center"
          >
            {isPlaying ? "❚❚" : "▶"}
          </button>

          <button onClick={nextSong} className="text-2xl">⏭</button>
        </div>

        {/* 🎧 Audio Visualizer (ONLY ONCE) */}
        <AudioVisualizer audioRef={audioRef} />

        {/* Progress */}
        <div className="flex items-center gap-2 w-full mt-1">
          <span className="text-xs w-8 text-right">
            {formatTime(currentTime)}
          </span>

          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={(e) => seek(Number(e.target.value))}
            className="w-full h-1 accent-green-400 cursor-pointer"
          />

          <span className="text-xs w-8 text-left">
            {formatTime(duration)}
          </span>
        </div>
      </div>

      {/* RIGHT */}
      <div className="w-1/3 flex justify-end">
        <VolumeControl audioRef={audioRef} />
      </div>
    </motion.div>
  );
}
