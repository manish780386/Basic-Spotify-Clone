import { useRef } from "react";
import useAudioVisualizer from "../../hooks/useAudioVisualizer";

export default function AudioVisualizer({ audioRef }) {
  const canvasRef = useRef(null);

  useAudioVisualizer(audioRef, canvasRef);

  return (
    <canvas
      ref={canvasRef}
      width={300}
      height={80}
      className="w-full mt-2 rounded bg-black"
    />
  );
}
