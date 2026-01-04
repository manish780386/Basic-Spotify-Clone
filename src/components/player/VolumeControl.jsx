import { useEffect, useState } from "react";

export default function VolumeControl({ audioRef }) {
  const [volume, setVolume] = useState(0.8);

  useEffect(() => {
    if (!audioRef?.current) return;
    audioRef.current.volume = volume;
  }, [volume, audioRef]);

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm">🔊</span>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={(e) => setVolume(e.target.value)}
        className="w-24 h-1"
      />
    </div>
  );
}
