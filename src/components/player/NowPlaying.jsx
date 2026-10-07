import { useEffect } from "react";
import { AnimatePresence, motion, useDragControls } from "framer-motion";
import { ChevronDown, Heart, Play, Pause, SkipBack, SkipForward, Shuffle, Repeat, Repeat1 } from "lucide-react";
import { usePlayer } from "../../context/PlayerContext";
import useCoverColor from "../../hooks/useCoverColor";
import Slider from "../ui/Slider";
import Visualizer from "../visualizer/Visualizer";

const fmt = (t) => `${Math.floor((t || 0) / 60)}:${String(Math.floor((t || 0) % 60)).padStart(2, "0")}`;

export default function NowPlaying() {
  const p = usePlayer();
  const s = p.current;
  const controls = useDragControls();
  const rgb = useCoverColor(s?.cover).join(",");
  const RepeatIcon = p.repeat === "one" ? Repeat1 : Repeat;
  const on = (v) => (v ? "text-(--accent)" : "text-(--muted) hover:text-(--text)");

  useEffect(() => {
    const k = (e) => e.key === "Escape" && p.setNpOpen(false);
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [p.setNpOpen]);

  return (
    <AnimatePresence>
      {p.npOpen && s && (
        <motion.div
          key="np"
          initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 30, stiffness: 260 }}
          drag="y" dragControls={controls} dragListener={false}
          dragConstraints={{ top: 0, bottom: 0 }} dragElastic={{ top: 0, bottom: 0.7 }}
          onDragEnd={(_, info) => { if (info.offset.y > 120 || info.velocity.y > 600) p.setNpOpen(false); }}
          className="fixed inset-0 z-[60] overflow-y-auto text-white"
          style={{
            background: `linear-gradient(180deg, rgb(${rgb}) 0%, rgba(0,0,0,.96) 100%)`,
            "--text": "#fff", "--muted": "rgba(255,255,255,.7)", "--line": "rgba(255,255,255,.25)",
          }}
        >
          <div className="mx-auto max-w-md min-h-full flex flex-col gap-5 px-6 pb-6">
            {/* drag handle: yaha se neeche kheench ke band karo */}
            <div onPointerDown={(e) => controls.start(e)} style={{ touchAction: "none" }} className="pt-3 pb-1 cursor-grab">
              <div className="mx-auto h-1.5 w-12 rounded-full bg-white/40 mb-3" />
              <div className="flex items-center justify-between">
                <button onClick={() => p.setNpOpen(false)} aria-label="Close" className="p-2 -ml-2 rounded-full hover:bg-white/10"><ChevronDown size={28} /></button>
                <span className="font-semibold text-sm">Now playing</span>
                <span className="w-8" />
              </div>
            </div>

            <img src={s.cover} alt="" className="w-full aspect-square rounded-2xl object-cover shadow-2xl bg-white/10" />

            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <h2 className="text-2xl font-extrabold tracking-tight truncate">{s.title}</h2>
                <p className="text-(--muted) truncate">{s.artist}</p>
              </div>
              <button onClick={() => p.toggleLike(s)} aria-label="Like" className={p.isLiked(s.id) ? "text-(--accent)" : "text-(--muted)"}>
                <Heart size={26} fill={p.isLiked(s.id) ? "currentColor" : "none"} />
              </button>
            </div>

            <div>
              <Slider label="Seek" value={p.time} max={p.duration} onChange={p.seek} />
              <div className="flex justify-between text-xs text-(--muted) mt-1"><span>{fmt(p.time)}</span><span>{fmt(p.duration)}</span></div>
            </div>

            <div className="flex items-center justify-between">
              <button onClick={p.toggleShuffle} aria-label="Shuffle" className={on(p.shuffle)}><Shuffle size={22} /></button>
              <button onClick={p.prev} aria-label="Previous"><SkipBack size={28} fill="currentColor" /></button>
              <button onClick={p.togglePlay} aria-label={p.isPlaying ? "Pause" : "Play"} className="grid place-items-center size-16 rounded-full bg-white text-black">
                {p.isPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" />}
              </button>
              <button onClick={p.next} aria-label="Next"><SkipForward size={28} fill="currentColor" /></button>
              <button onClick={p.toggleRepeat} aria-label="Repeat" className={on(p.repeat !== "none")}><RepeatIcon size={22} /></button>
            </div>

            <Visualizer color={`rgb(${rgb.split(",").map((v) => Math.min(255, +v + 70)).join(",")})`} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}