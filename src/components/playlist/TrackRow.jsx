import { usePlayer } from "../../context/PlayerContext";

export default function TrackRow({ song }) {
  const { currentSong, isPlaying, playSong } = usePlayer();

  const isActive = currentSong?.id === song.id;

  return (
    <div
      onClick={() => playSong(song)}
      className={`flex items-center gap-4 p-3 rounded-lg cursor-pointer transition-colors duration-200
        ${isActive ? "bg-gray-800" : "hover:bg-gray-900"}`}
    >
      {/* 🎵 Cover */}
      <div className="w-14 h-14 flex-shrink-0">
        <img
        src={song.cover}
          
        alt={song.title}
        className="w-full h-full rounded-lg object-cover shadow-md bg-gray-700 "
        />
      </div>

      {/* 🎶 Info */}
      <div className="flex-1 min-w-0">
        <p
          className={`text-sm font-medium truncate transition-colors duration-200 ${
            isActive ? "text-green-400" : "text-white"
          }`}
        >
          {song.title}
        </p>
        <p className="text-xs text-gray-400 truncate">{song.artist}</p>
      </div>

      {/* ▶ Playing indicator */}
      <div className="text-xs text-gray-400 w-16 text-right">
        {isActive && isPlaying ? (
          <span className="text-green-400 font-semibold">Playing</span>
        ) : (
          song.duration
        )}
      </div>
    </div>
  );
}
