import { Link } from "react-router-dom";
import { Play } from "lucide-react";
import { moods } from "../data/moods";
import SongCard from "../components/song/SongCard";
import SongRow from "../components/song/SongRow";
import { usePlayer } from "../context/PlayerContext";
import { useCatalog } from "../context/CatalogContext";
import useCoverColor from "../hooks/useCoverColor";

export default function Home() {
  const { playSong, current, recent } = usePlayer();
  const { songs, loading, error } = useCatalog();
  const rgb = useCoverColor(current?.cover).join(",");
  const h = new Date().getHours();
  const greet = h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening";

  return (
    <div className="p-4 md:p-6" style={{ background: `linear-gradient(180deg, rgba(${rgb},.5) 0%, transparent 380px)` }}>
      <h1 className="text-3xl font-extrabold tracking-tight mb-5">{greet}</h1>

      {error && <p className="mb-6 rounded-lg bg-red-500/15 text-red-400 p-3 text-sm">Could not load songs: {error}</p>}

      {loading ? (
        <div className="grid grid-cols-2 xl:grid-cols-3 gap-3 mb-8">
          {Array.from({ length: 6 }).map((_, i) => <div key={i} className="h-16 rounded-lg bg-(--hover) animate-pulse" />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 mb-8">
          {songs.slice(0, 6).map((s) => (
            <button key={s.id} onClick={() => playSong(s, songs)} className="group flex items-center gap-3 rounded-lg bg-(--hover) hover:brightness-125 overflow-hidden pr-3">
              <img src={s.cover} alt="" className="size-16 object-cover" />
              <span className="font-semibold truncate flex-1 text-left">{s.title}</span>
              <span className="grid place-items-center size-9 rounded-full bg-(--accent) text-black opacity-0 group-hover:opacity-100"><Play size={16} fill="currentColor" /></span>
            </button>
          ))}
        </div>
      )}

      {recent.length > 0 && (
        <>
          <h2 className="text-xl font-bold mb-2">Jump back in</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-1 mb-8">
            {recent.slice(0, 4).map((s) => <SongCard key={s.id} song={s} list={recent} />)}
          </div>
        </>
      )}

      <h2 className="text-xl font-bold mb-3">Browse by mood</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {moods.map((m) => (
          <Link key={m.name} to={`/mood/${m.name}`}
            className="relative overflow-hidden rounded-xl p-4 h-28 md:h-32 text-xl font-extrabold text-white transition-transform hover:scale-[1.03]"
            style={{ background: `linear-gradient(135deg,${m.from},${m.to})` }}>
            {m.name}
            <span className="block text-xs font-medium opacity-90 mt-1">{m.tag}</span>
            <span className="absolute -right-2 -bottom-3 text-6xl opacity-30 rotate-12" aria-hidden="true">{m.emoji}</span>
          </Link>
        ))}
      </div>

      <h2 className="text-xl font-bold mb-2">Trending this week</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-1 mb-8">
        {songs.slice(0, 12).map((s) => <SongCard key={s.id} song={s} list={songs} />)}
      </div>

      <h2 className="text-xl font-bold mb-2">All tracks</h2>
      {songs.map((s, i) => <SongRow key={s.id} song={s} list={songs} n={i + 1} />)}
    </div>
  );
}