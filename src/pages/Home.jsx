import { Play } from "lucide-react";
import songs from "../data/songs";
import SongCard from "../components/song/SongCard";
import SongRow from "../components/song/SongRow";
import { usePlayer } from "../context/PlayerContext";

export default function Home() {
  const { playSong } = usePlayer();
  const h = new Date().getHours();
  const greet = h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening";
  return (
    <div className="bg-gradient-to-b from-violet-500/25 to-transparent p-4 md:p-6">
      <h1 className="text-3xl font-extrabold tracking-tight mb-5">{greet}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 mb-8">
        {songs.slice(0, 6).map((s) => (
          <button key={s.id} onClick={() => playSong(s, songs)} className="group flex items-center gap-3 rounded-lg bg-(--hover) hover:brightness-125 overflow-hidden pr-3">
            <img src={s.cover} alt="" className="size-16 object-cover" />
            <span className="font-semibold truncate flex-1 text-left">{s.title}</span>
            <span className="grid place-items-center size-9 rounded-full bg-(--accent) text-black opacity-0 group-hover:opacity-100"><Play size={16} fill="currentColor" /></span>
          </button>
        ))}
      </div>
      <h2 className="text-xl font-bold mb-2">Made for you</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-1 mb-8">
        {songs.map((s) => <SongCard key={s.id} song={s} />)}
      </div>
      <h2 className="text-xl font-bold mb-2">All tracks</h2>
      {songs.map((s, i) => <SongRow key={s.id} song={s} list={songs} n={i + 1} />)}
    </div>
  );
}