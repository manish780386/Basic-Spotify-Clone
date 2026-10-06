import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Trash2 } from "lucide-react";
import { usePlayer } from "../context/PlayerContext";
import SongRow from "../components/song/SongRow";

export default function Library() {
  const { liked, playlists, createPlaylist, deletePlaylist } = usePlayer();
  const [name, setName] = useState("");
  const add = () => { if (name.trim()) { createPlaylist(name); setName(""); } };
  return (
    <div className="p-4 md:p-6">
      <h1 className="text-3xl font-extrabold tracking-tight mb-5">Your Library</h1>
      <div className="flex gap-2 max-w-md mb-6">
        <input value={name} onChange={(e) => setName(e.target.value)} onKeyDown={(e) => e.key === "Enter" && add()}
          placeholder="Name a new playlist" className="flex-1 min-w-0 rounded-full bg-(--hover) px-4 py-2 outline-none focus:ring-2 ring-(--accent)" />
        <button onClick={add} className="rounded-full bg-(--accent) text-black font-bold px-5">Create playlist</button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {playlists.map((p) => (
          <div key={p.id} className="group relative p-3 rounded-xl bg-(--hover)">
            <Link to={`/playlist/${p.id}`}>
              <div className="aspect-square rounded-lg bg-gradient-to-br from-violet-500/40 to-(--line) grid place-items-center text-4xl">♫</div>
              <p className="mt-2 font-semibold truncate">{p.name}</p>
              <p className="text-sm text-(--muted)">{p.songs.length} songs</p>
            </Link>
            <button onClick={() => deletePlaylist(p.id)} aria-label="Delete playlist" className="absolute top-5 right-5 p-1.5 rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100"><Trash2 size={14} /></button>
          </div>
        ))}
        {!playlists.length && <p className="col-span-full text-(--muted)">No playlists yet. Name one above to start collecting songs.</p>}
      </div>
      <h2 className="flex items-center gap-2 text-xl font-bold mb-2"><Heart size={20} className="text-(--accent)" fill="currentColor" />Liked Songs</h2>
      {!liked.length && <p className="text-(--muted)">Tap the heart on any song to keep it here.</p>}
      {liked.map((s, i) => <SongRow key={s.id} song={s} list={liked} n={i + 1} />)}
    </div>
  );
}