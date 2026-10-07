import { useEffect, useRef } from "react";
import { usePlayer } from "../../context/PlayerContext";

export default function Visualizer({ color = "#ffffff" }) {
  const ref = useRef(null);
  const { getAnalyser, isPlaying } = usePlayer();
  const playing = useRef(isPlaying);
  playing.current = isPlaying;

  useEffect(() => {
    const c = ref.current;
    const ctx = c.getContext("2d");
    const n = 48;
    const level = new Array(n).fill(0.04);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let id;

    const draw = (t) => {
      id = requestAnimationFrame(draw);
      const an = getAnalyser();
      let data = null;
      if (an) { data = new Uint8Array(an.frequencyBinCount); an.getByteFrequencyData(data); }

      const { width: w, height: h } = c;
      ctx.clearRect(0, 0, w, h);
      const bw = w / n;
      ctx.fillStyle = color;
      ctx.globalAlpha = 0.85;

      for (let i = 0; i < n; i++) {
        let target;
        if (data) target = data[i % data.length] / 255;                       // real audio data
        else if (!playing.current) target = 0.04;                              // paused
        else if (reduce) target = 0.3;
        else target = 0.25 + 0.55 * Math.abs(Math.sin(t / 260 + i * 0.55)) * (0.6 + 0.4 * Math.sin(t / 900 + i * 1.7)); // fallback animation
        level[i] += (target - level[i]) * 0.18;
        const bh = Math.max(4, level[i] * h);
        ctx.fillRect(i * bw + 2, h - bh, bw - 4, bh);
      }
    };
    id = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(id);
  }, [color, getAnalyser]);

  return <canvas ref={ref} width={600} height={120} className="w-full h-24 md:h-28" aria-hidden="true" />;
}