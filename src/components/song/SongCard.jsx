import { usePlayer } from "../../context/PlayerContext";

export default function SongCard({ song }) {
  const {
    playSong,
    toggleLike,
    likedSongs,
    addToQueue,
  } = usePlayer();

  const liked = likedSongs.some((s) => s.id === song.id);

  return (
    <div
      onClick={() => playSong(song)}
      className="flex items-center justify-between p-3 rounded-lg hover:bg-[#1e1e1e] cursor-pointer"
    >
      <div className="flex items-center gap-4">
        <img src={song.cover} className="w-14 h-14 rounded-md" />
        <div>
          <p className="font-semibold">{song.title}</p>
          <p className="text-sm text-gray-400">{song.artist}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleLike(song);
          }}
          className="text-xl"
        >
          {liked ? "❤️" : "🤍"}
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            addToQueue(song);
          }}
          className="text-lg"
        >
          ➕
        </button>
      </div>
    </div>
  );
}
