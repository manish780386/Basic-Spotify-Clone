import { createContext, useContext, useEffect, useState } from "react";
import { fetchTracks } from "../api/jamendo";
import { moods } from "../data/moods";

const Ctx = createContext();

export function CatalogProvider({ children }) {
  const [songs, setSongs] = useState([]);
  const [byMood, setByMood] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let dead = false;
    (async () => {
      // allSettled: ek mood fail ho to baaki sab phir bhi load hon
      const res = await Promise.allSettled([
        fetchTracks({ order: "popularity_week", limit: 30 }),
        ...moods.map((m) => fetchTracks({ fuzzytags: m.tags, boost: "popularity_month", limit: 20 })),
      ]);
      if (dead) return;
      const [trending, ...rest] = res;
      if (trending.status === "fulfilled") setSongs(trending.value);
      else setError(trending.reason?.message || "Could not load songs");
      setByMood(
        Object.fromEntries(
          moods.map((m, i) => [m.name, rest[i].status === "fulfilled" ? rest[i].value : []])
        )
      );
      setLoading(false);
    })();
    return () => { dead = true; };
  }, []);

  return <Ctx.Provider value={{ songs, byMood, loading, error }}>{children}</Ctx.Provider>;
}
export const useCatalog = () => useContext(Ctx);