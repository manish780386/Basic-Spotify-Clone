import { usePlayer } from "../../context/PlayerContext";

export default function QueuePanel() {
  const { queue, playSong, removeFromQueue } = usePlayer();

  // 🔒 SAFETY CHECK
  if (!queue || queue.length === 0) return null;

  return (
    <div className="fixed right-0 top-0 w-80 h-screen bg-[#181818] border-l border-gray-700 p-4 z-40">
      <h2 className="text-lg font-bold mb-4">Up Next</h2>

      <div className="space-y-3 overflow-y-auto h-full pb-20">
        {queue.map((song) => (
          <div
            key={song.id}
            className="flex items-center gap-3 p-2 rounded hover:bg-[#282828]"
          >
            <img
              src={song.cover}
              className="w-12 h-12 rounded cursor-pointer"
              onClick={() => playSong(song)}
            />

            <div className="flex-1">
              <p className="text-sm font-semibold truncate">{song.title}</p>
              <p className="text-xs text-gray-400 truncate">
                {song.artist}
              </p>
            </div>

            <button
              onClick={() => removeFromQueue(song.id)}
              className="text-red-400 text-sm"
            >
              ✖
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
