const KEY = import.meta.env.VITE_JAMENDO_CLIENT_ID;

const mmss = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

const toSong = (t) => ({
  id: `j${t.id}`,
  title: t.name,
  artist: t.artist_name,
  audio: t.audio,
  cover: t.image || t.album_image,
  duration: mmss(Number(t.duration) || 0),
});

export async function fetchTracks(params = {}) {
  if (!KEY) throw new Error("VITE_JAMENDO_CLIENT_ID missing in .env");
  const q = new URLSearchParams({
    client_id: KEY, format: "json", limit: 20,
    imagesize: 300, audioformat: "mp32", ...params,
  });
  const r = await fetch(`https://api.jamendo.com/v3.0/tracks/?${q}`);
  if (!r.ok) throw new Error("Jamendo request failed");
  const j = await r.json();
  if (j.headers?.status === "failed") throw new Error(j.headers.error_message || "Jamendo error");
  return j.results.filter((t) => t.audio).map(toSong);
}