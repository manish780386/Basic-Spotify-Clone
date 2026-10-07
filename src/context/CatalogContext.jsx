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
      try {
        const [trending, ...rest] = await Promise.all([
          fetchTracks({ order: "popularity_week", limit: 30 }),
          ...moods.map((m) => fetchTracks({ tags: m.tags, order: "popularity_month", limit: 15 })),
        ]);
        if (dead) return;
        setSongs(trending);
        setByMood(Object.fromEntries(moods.map((m, i) => [m.name, rest[i]])));
      } catch (e) {
        if (!dead) setError(e.message);
      } finally {
        if (!dead) setLoading(false);
      }
    })();
    return () => { dead = true; };
  }, []);

  return <Ctx.Provider value={{ songs, byMood, loading, error }}>{children}</Ctx.Provider>;
}
export const useCatalog = () => useContext(Ctx);