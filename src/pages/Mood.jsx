import { useParams, Link } from "react-router-dom";
import { Play } from "lucide-react";
import songs from "../data/songs";
import { moods } from "../data/moods";
import { usePlayer } from "../context/PlayerContext";
import SongRow from "../components/song/SongRow";

export default function Mood() {
  const { name } = useParams();
  const { playSong } = usePlayer();
  const m = moods.find((x) => x.name === name);
  if (!m) return <p className="p-6 text-(--muted)">Mood not found. <Link to="/" className="text-(--accent)">Back to Home</Link></p>;
  const list = songs.filter((s) => s.genre === m.name);
  return (
    <div>
      <div className="p-6 pt-10 text-white" style={{ background: `linear-gradient(135deg,${m.from},${m.to})` }}>
        <h1 className="text-5xl font-extrabold tracking-tight">{m.name}</h1>
        <p className="opacity-90 mt-1">{m.tag} · {list.length} songs</p>
      </div>
      <div className="p-4 md:p-6">
        {list.length > 0 && (
          <button onClick={() => playSong(list[0], list)} aria-label={`Play ${m.name}`} className="mb-4 grid place-items-center size-14 rounded-full bg-(--accent) text-black"><Play fill="currentColor" /></button>
        )}
        {!list.length && <p className="text-(--muted)">No songs here yet. Add <code>genre: "{m.name}"</code> to a song in songs.js.</p>}
        {list.map((s, i) => <SongRow key={s.id} song={s} list={list} n={i + 1} />)}
      </div>
    </div>
  );
}