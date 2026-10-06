import { useEffect, useState } from "react";

const FALL = [124, 92, 246];

export default function useCoverColor(url) {
  const [rgb, setRgb] = useState(FALL);
  useEffect(() => {
    if (!url) { setRgb(FALL); return; }
    let dead = false;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      try {
        const c = document.createElement("canvas");
        c.width = c.height = 16;
        const x = c.getContext("2d");
        x.drawImage(img, 0, 0, 16, 16);
        const d = x.getImageData(0, 0, 16, 16).data;
        let r = 0, g = 0, b = 0, n = 0;
        for (let i = 0; i < d.length; i += 4) {
          const m = (d[i] + d[i + 1] + d[i + 2]) / 3;
          if (m < 30 || m > 225) continue; // skip near-black / near-white
          r += d[i]; g += d[i + 1]; b += d[i + 2]; n++;
        }
        if (n && !dead) setRgb([r / n, g / n, b / n].map(Math.round));
      } catch { /* cover CORS blocked: keep fallback */ }
    };
    img.src = url;
    return () => { dead = true; };
  }, [url]);
  return rgb;
}