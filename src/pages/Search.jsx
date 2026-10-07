import { useEffect, useState } from "react";
import { Search as Icon, X, Clock } from "lucide-react";
import { fetchTracks } from "../api/jamendo";
import useDebounce from "../hooks/useDebounce";
import SongRow from "../components/song/SongRow";
import { RowSkeleton } from "../components/ui/Skeleton";

const KEY = "dhunly-searches";

export default function Search() {
  const [q, setQ] = useState("");
  const dq = useDebounce(q).trim();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [past, setPast] = useState(() => {
    try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch { return []; }
  });

  useEffect(() => { try { localStorage.setItem(KEY, JSON.stringify(past)); } catch {} }, [past]);

  useEffect(() => {
    if (!dq) { setResults([]); setError(""); return; }
    let dead = false;
    setLoading(true); setError("");
    fetchTracks({ search: dq, limit: 25 })
      .then((r) => {
        if (dead) return;
        setResults(r);
        if (r.length) setPast((p) => [dq, ...p.filter((x) => x !== dq)].slice(0, 6));
      })
      .catch((e) => !dead && setError(e.message))
      .finally(() => !dead && setLoading(false));
    return () => { dead = true; };
  }, [dq]);

  return (
    <div className="page p-4 md:p-6">
      <div className="relative max-w-md mb-6">
        <Icon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-(--muted)" />
        <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Songs or artists"
          className="w-full rounded-full bg-(--hover) pl-11 pr-10 py-3 outline-none focus:ring-2 ring-(--accent)" />
        {q && (
          <button onClick={() => setQ("")} aria-label="Clear search" className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-(--muted) hover:text-(--text)"><X size={16} /></button>
        )}
      </div>

      {!dq && (
        past.length > 0 ? (
          <div>
            <div className="flex items-center justify-between max-w-md mb-2">
              <h2 className="font-bold">Recent searches</h2>
              <button onClick={() => setPast([])} className="text-sm text-(--muted) hover:text-(--text)">Clear all</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {past.map((t) => (
                <button key={t} onClick={() => setQ(t)} className="flex items-center gap-1.5 rounded-full bg-(--hover) px-3 py-1.5 text-sm hover:brightness-125">
                  <Clock size={13} className="text-(--muted)" />{t}
                </button>
              ))}
            </div>
          </div>
        ) : <p className="text-(--muted)">Search thousands of free tracks by title or artist.</p>
      )}

      {loading && <RowSkeleton n={5} />}
      {error && <p className="text-red-400">Search failed: {error}. Check your connection and try again.</p>}
      {dq && !loading && !error && !results.length && <p className="text-(--muted)">No matches for “{dq}”. Try another spelling or an artist name.</p>}
      {!loading && results.map((s, i) => <SongRow key={s.id} song={s} list={results} n={i + 1} />)}
    </div>
  );
}