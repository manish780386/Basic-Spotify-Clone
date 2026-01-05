import { usePlayer } from "../../context/PlayerContext";

export default function PlaylistList({ onSelect }) {
  const { playlists } = usePlayer();

  return (
    <div className="mt-6">
      <h3 className="font-bold mb-2">Your Playlists</h3>

      {playlists.map((pl) => (
        <div
          key={pl.id}
          onClick={() => onSelect(pl)}
          className="p-2 rounded hover:bg-[#1e1e1e] cursor-pointer"
        >
          🎵 {pl.name} ({pl.songs.length})
        </div>
      ))}
    </div>
  );
}
