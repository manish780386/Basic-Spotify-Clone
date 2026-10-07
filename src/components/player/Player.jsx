import { Play, Pause, SkipBack, SkipForward, Shuffle, Repeat, Repeat1, Volume2, VolumeX, Heart } from "lucide-react";
import { usePlayer } from "../../context/PlayerContext";
import Slider from "../ui/Slider";

const fmt = (t) => `${Math.floor((t || 0) / 60)}:${String(Math.floor((t || 0) % 60)).padStart(2, "0")}`;

export default function Player() {
  const p = usePlayer();
  const s = p.current;
  if (!s) return null;
  const RepeatIcon = p.repeat === "one" ? Repeat1 : Repeat;
  const on = (v) => (v ? "text-(--accent)" : "text-(--muted) hover:text-(--text)");
  const pct = p.duration ? (p.time / p.duration) * 100 : 0;

  return (
    <div className="fixed md:static bottom-14 inset-x-2 md:inset-x-0 z-40 md:z-auto rounded-xl md:rounded-none bg-(--hover) md:bg-(--bg) px-3 md:px-4 py-2 md:py-3 grid grid-cols-[1fr_auto] md:grid-cols-3 items-center gap-3">
      {/* mobile progress line */}
      <div className="md:hidden absolute left-3 right-3 bottom-0 h-0.5 rounded bg-(--line)" aria-hidden="true">
        <div className="h-full rounded bg-(--text)" style={{ width: `${pct}%` }} />
      </div>

      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={() => p.setNpOpen(true)}
          aria-label="Open now playing"
          className="flex items-center gap-3 min-w-0 text-left"
        >
          <img src={s.cover} alt="" className="size-11 md:size-14 rounded-md object-cover" />
          <div className="min-w-0">
            <p className="truncate font-semibold text-sm">{s.title}</p>
            <p className="truncate text-xs text-(--muted)">{s.artist}</p>
          </div>
        </button>
        <button onClick={() => p.toggleLike(s)} aria-label="Like" className={`hidden md:block ml-2 ${p.isLiked(s.id) ? "text-(--accent)" : "text-(--muted)"}`}>
          <Heart size={18} fill={p.isLiked(s.id) ? "currentColor" : "none"} />
        </button>
      </div>

      <div className="flex flex-col items-center gap-1 md:max-w-xl md:w-full md:mx-auto">
        <div className="flex items-center gap-4 md:gap-5">
          <button onClick={p.toggleShuffle} aria-label="Shuffle" className={`hidden md:block ${on(p.shuffle)}`}><Shuffle size={18} /></button>
          <button onClick={p.prev} aria-label="Previous" className="hidden md:block"><SkipBack size={20} fill="currentColor" /></button>
          <button onClick={p.togglePlay} aria-label={p.isPlaying ? "Pause" : "Play"} className="grid place-items-center size-10 rounded-full bg-(--text) text-(--bg)">
            {p.isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
          </button>
          <button onClick={p.next} aria-label="Next"><SkipForward size={20} fill="currentColor" /></button>
          <button onClick={p.toggleRepeat} aria-label="Repeat" className={`hidden md:block ${on(p.repeat !== "none")}`}><RepeatIcon size={18} /></button>
        </div>
        <div className="hidden md:flex items-center gap-2 w-full text-xs text-(--muted)">
          <span className="w-9 text-right">{fmt(p.time)}</span>
          <Slider label="Seek" value={p.time} max={p.duration} onChange={p.seek} />
          <span className="w-9">{fmt(p.duration)}</span>
        </div>
      </div>

      <div className="hidden md:flex items-center justify-end gap-2 text-(--muted)">
        <button onClick={() => p.setVolume(p.volume ? 0 : 0.8)} aria-label="Mute">{p.volume ? <Volume2 size={18} /> : <VolumeX size={18} />}</button>
        <div className="w-28"><Slider label="Volume" value={p.volume} max={1} onChange={p.setVolume} /></div>
      </div>
    </div>
  );
}