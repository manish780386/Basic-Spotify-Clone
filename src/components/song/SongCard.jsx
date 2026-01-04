import { usePlayer } from "../../context/PlayerContext";

export default function SongCard({ song }) {
  const { playSong } = usePlayer();

  return (
    <div
      onClick={() => playSong(song)}
      className="flex items-center gap-4 p-3 rounded-lg hover:bg-[#1e1e1e] cursor-pointer"
    >
      <img src={song.cover} className="w-14 h-14 rounded-md" />
      <div>
        <p className="font-semibold">{song.title}</p>
        <p className="text-sm text-gray-400">{song.artist}</p>
      </div>
    </div>
  );
}
