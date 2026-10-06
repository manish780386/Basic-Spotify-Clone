import { useParams, Link } from "react-router-dom";
import { Play } from "lucide-react";
import { usePlayer } from "../context/PlayerContext";
import SongRow from "../components/song/SongRow";

export default function Playlist() {
  const { id } = useParams();
  const { playlists, playSong } = usePlayer();
  const pl = playlists.find((p) => p.id === Number(id));
  if (!pl) return <p className="p-6 text-(--muted)">Playlist not found. <Link to="/library" className="text-(--accent)">Back to your library</Link></p>;
  return (
    <div className="p-4 md:p-6">
      <h1 className="text-4xl font-extrabold tracking-tight">{pl.name}</h1>
      <p className="text-(--muted) mb-4">{pl.songs.length} songs</p>
      {pl.songs.length > 0 && (
        <button onClick={() => playSong(pl.songs[0], pl.songs)} className="mb-4 grid place-items-center size-14 rounded-full bg-(--accent) text-black" aria-label="Play playlist">
          <Play fill="currentColor" />
        </button>
      )}
      {!pl.songs.length && <p className="text-(--muted)">Empty for now. Use “+ Playlist” on any song row to add it here.</p>}
      {pl.songs.map((s, i) => <SongRow key={s.id} song={s} list={pl.songs} n={i + 1} />)}
    </div>
  );
}