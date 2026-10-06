import { Play } from "lucide-react";
import { usePlayer } from "../../context/PlayerContext";
import songs from "../../data/songs";

export default function SongCard({ song }) {
  const { playSong } = usePlayer();
  return (
    <button onClick={() => playSong(song, songs)} className="group text-left p-3 rounded-xl hover:bg-(--hover) transition-colors">
      <div className="relative">
        <img src={song.cover} alt="" className="aspect-square w-full rounded-lg object-cover shadow-lg" />
        <span className="absolute right-2 bottom-2 grid place-items-center size-11 rounded-full bg-(--accent) text-black opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition">
          <Play size={20} fill="currentColor" />
        </span>
      </div>
      <p className="mt-3 font-semibold truncate">{song.title}</p>
      <p className="text-sm text-(--muted) truncate">{song.artist}</p>
    </button>
  );
}