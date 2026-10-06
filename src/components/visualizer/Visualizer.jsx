import { useEffect, useRef } from "react";
import { usePlayer } from "../../context/PlayerContext";

export default function Visualizer({ color = "#ffffff" }) {
  const ref = useRef(null);
  const { getAnalyser } = usePlayer();

  useEffect(() => {
    const c = ref.current;
    const ctx = c.getContext("2d");
    let id;
    const draw = () => {
      id = requestAnimationFrame(draw);
      const an = getAnalyser();
      const { width: w, height: h } = c;
      ctx.clearRect(0, 0, w, h);
      let data = null;
      if (an) { data = new Uint8Array(an.frequencyBinCount); an.getByteFrequencyData(data); }
      const n = 48, bw = w / n;
      ctx.fillStyle = color;
      ctx.globalAlpha = 0.85;
      for (let i = 0; i < n; i++) {
        const v = data ? data[i] / 255 : 0.04;
        const bh = Math.max(4, v * h);
        ctx.fillRect(i * bw + 2, h - bh, bw - 4, bh);
      }
    };
    draw();
    return () => cancelAnimationFrame(id);
  }, [color, getAnalyser]);

  return <canvas ref={ref} width={600} height={120} className="w-full h-24 md:h-28" aria-hidden="true" />;
}