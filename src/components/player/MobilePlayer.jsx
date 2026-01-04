import { motion } from "framer-motion";
import { usePlayer } from "../../context/PlayerContext";

export default function MobilePlayer() {
  const {
    currentSong,
    isPlaying,
    togglePlay,
    nextSong,
  } = usePlayer();

  if (!currentSong) return null;

  return (
    <motion.div
      initial={{ y: 60 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 px-4 py-3 flex items-center justify-between md:hidden"
    >
      <div className="flex items-center gap-3">
        <img src={currentSong.cover} className="w-10 h-10 rounded" />
        <div>
          <p className="text-sm font-semibold">{currentSong.title}</p>
          <p className="text-xs text-gray-400">{currentSong.artist}</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button onClick={togglePlay}>
          {isPlaying ? "❚❚" : "▶"}
        </button>
        <button onClick={nextSong}>⏭</button>
      </div>
    </motion.div>
  );
}
