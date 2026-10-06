import { Heart, ListPlus, Play } from "lucide-react";
import { usePlayer } from "../../context/PlayerContext";

export default function SongRow({ song, list, n }) {
  const { current, isPlaying, playSong, isLiked, toggleLike, addToQueue, playlists, addToPlaylist } = usePlayer();
  const active = current?.id === song.id;
  const liked = isLiked(song.id);
  return (
    <div onDoubleClick={() => playSong(song, list)}
      className={`group grid grid-cols-[2rem_1fr_auto] md:grid-cols-[2rem_1fr_auto_4rem] items-center gap-3 px-3 py-2 rounded-lg hover:bg-(--hover) ${active ? "bg-(--hover)" : ""}`}>
      <button onClick={() => playSong(song, list)} aria-label={`Play ${song.title}`} className="grid place-items-center text-(--muted)">
        {active && isPlaying ? <span className="eq h-4 flex items-end"><i /><i /><i /></span>
          : <><span className="group-hover:hidden">{n}</span><Play size={16} fill="currentColor" className="hidden group-hover:block text-(--text)" /></>}
      </button>
      <div className="flex items-center gap-3 min-w-0">
        <img src={song.cover} alt="" className="size-11 rounded-md object-cover bg-(--line)" />
        <div className="min-w-0">
          <p className={`truncate font-semibold ${active ? "text-(--accent)" : ""}`}>{song.title}</p>
          <p className="truncate text-sm text-(--muted)">{song.artist}</p>
        </div>
      </div>
      <div className="flex items-center gap-1 text-(--muted)">
        <button onClick={() => toggleLike(song)} aria-label="Like" className={`p-2 ${liked ? "text-(--accent)" : "hover:text-(--text) md:opacity-0 group-hover:opacity-100"}`}>
          <Heart size={18} fill={liked ? "currentColor" : "none"} />
        </button>
        <button onClick={() => addToQueue(song)} aria-label="Add to queue" className="p-2 hover:text-(--text) md:opacity-0 group-hover:opacity-100"><ListPlus size={18} /></button>
        {playlists.length > 0 && (
          <select aria-label="Add to playlist" value="" onChange={(e) => addToPlaylist(Number(e.target.value), song)}
            className="hidden md:block w-20 bg-transparent text-xs opacity-0 group-hover:opacity-100">
            <option value="" disabled>+ Playlist</option>
            {playlists.map((p) => <option key={p.id} value={p.id} className="text-black">{p.name}</option>)}
          </select>
        )}
      </div>
      <span className="hidden md:block text-sm text-(--muted) text-right">{song.duration}</span>
    </div>
  );
}