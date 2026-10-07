import { useEffect, useState } from "react";
import { Search as Icon } from "lucide-react";
import { fetchTracks } from "../api/jamendo";
import useDebounce from "../hooks/useDebounce";
import SongRow from "../components/song/SongRow";

export default function Search() {
  const [q, setQ] = useState("");
  const dq = useDebounce(q).trim();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!dq) { setResults([]); setError(""); return; }
    let dead = false;
    setLoading(true); setError("");
    fetchTracks({ search: dq, limit: 25 })
      .then((r) => !dead && setResults(r))
      .catch((e) => !dead && setError(e.message))
      .finally(() => !dead && setLoading(false));
    return () => { dead = true; };
  }, [dq]);

  return (
    <div className="p-4 md:p-6">
      <div className="relative max-w-md mb-6">
        <Icon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-(--muted)" />
        <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Songs or artists"
          className="w-full rounded-full bg-(--hover) pl-11 pr-4 py-3 outline-none focus:ring-2 ring-(--accent)" />
      </div>
      {!dq && <p className="text-(--muted)">Search thousands of free tracks by title or artist.</p>}
      {loading && <p className="text-(--muted)">Searching…</p>}
      {error && <p className="text-red-400">Search failed: {error}</p>}
      {dq && !loading && !error && !results.length && <p className="text-(--muted)">No matches for “{dq}”. Try another spelling or an artist name.</p>}
      {results.map((s, i) => <SongRow key={s.id} song={s} list={results} n={i + 1} />)}
    </div>
  );
}