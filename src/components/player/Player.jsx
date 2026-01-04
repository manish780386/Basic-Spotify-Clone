import { motion } from "framer-motion";
import { usePlayer } from "../../context/PlayerContext";
import useAudio from "../../hooks/useAudio";
import VolumeControl from "./VolumeControl";
import useKeyboardControls from "../../hooks/useKeyboardControls";
import useScreen from "../../hooks/useScreen";
import DesktopPlayer from "./DesktopPlayer";
import MobilePlayer from "./MobilePlayer";

export default function Player() {
  // Detect screen size
  const isMobile = useScreen();

  // Setup keyboard controls
  useKeyboardControls();

  // Player context
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

  // Audio hook
  const { currentTime, duration, seek, audioRef } = useAudio();

  // Format time function
  const formatTime = (time) => {
    if (!time && time !== 0) return "0:00";
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${min}:${sec}`;
  };

  if (!currentSong) return null;

  // Return mobile or desktop player
  if (isMobile) return <MobilePlayer />;

  return (
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-700 px-4 py-3 flex items-center justify-between text-white z-50"
    >
      {/* LEFT */}
      <motion.div
        key={currentSong.id}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-3 w-1/3 min-w-0"
      >
        <img
          src={currentSong.cover}
          alt={currentSong.title}
          className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
        />
        <div className="truncate">
          <p className="text-sm font-semibold truncate">{currentSong.title}</p>
          <p className="text-xs text-gray-400 truncate">{currentSong.artist}</p>
        </div>
      </motion.div>

      {/* CENTER */}
      <div className="flex flex-col items-center w-1/3">
        {/* Shuffle / Repeat */}
        <div className="flex gap-5 mb-1 text-xl">
          <motion.button
            whileTap={{ scale: 0.8 }}
            onClick={toggleShuffle}
            className={shuffle ? "text-green-400" : "text-gray-500"}
          >
            🔀
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.8 }}
            onClick={toggleRepeat}
            className={repeat !== "none" ? "text-green-400" : "text-gray-500"}
          >
            🔁 {repeat === "one" && "1"}
          </motion.button>
        </div>

        {/* Controls */}
        <div className="flex gap-6 mb-2">
          <motion.button whileTap={{ scale: 0.8 }} onClick={prevSong} className="text-2xl">
            ⏮
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.85 }}
            animate={{ scale: isPlaying ? 1.1 : 1 }}
            onClick={togglePlay}
            className="bg-white text-black w-12 h-12 rounded-full font-bold flex items-center justify-center shadow-lg"
          >
            {isPlaying ? "❚❚" : "▶"}
          </motion.button>

          <motion.button whileTap={{ scale: 0.8 }} onClick={nextSong} className="text-2xl">
            ⏭
          </motion.button>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-2 w-full">
          <span className="text-xs w-8 text-right">{formatTime(currentTime)}</span>
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={(e) => seek(Number(e.target.value))}
            className="w-full h-1 bg-gray-700 rounded-lg accent-green-400 cursor-pointer"
          />
          <span className="text-xs w-8 text-left">{formatTime(duration)}</span>
        </div>
      </div>

      {/* RIGHT */}
      <div className="w-1/3 flex justify-end">
        <VolumeControl audioRef={audioRef} />
      </div>
    </motion.div>
  );
}
