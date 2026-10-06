import { useState } from "react";
import { Search as Icon } from "lucide-react";
import songs from "../data/songs";
import useDebounce from "../hooks/useDebounce";
import SongRow from "../components/song/SongRow";

export default function Search() {
  const [q, setQ] = useState("");
  const dq = useDebounce(q).trim().toLowerCase();
  const results = dq ? songs.filter((s) => (s.title + s.artist).toLowerCase().includes(dq)) : [];
  return (
    <div className="p-4 md:p-6">
      <div className="relative max-w-md mb-6">
        <Icon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-(--muted)" />
        <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Songs or artists"
          className="w-full rounded-full bg-(--hover) pl-11 pr-4 py-3 outline-none focus:ring-2 ring-(--accent)" />
      </div>
      {!dq && <p className="text-(--muted)">Type a song title or artist name to start.</p>}
      {dq && !results.length && <p className="text-(--muted)">No matches for “{q}”. Check the spelling or try an artist.</p>}
      {results.map((s, i) => <SongRow key={s.id} song={s} list={results} n={i + 1} />)}
    </div>
  );
}