import { X } from "lucide-react";
import { usePlayer } from "../../context/PlayerContext";

export default function QueuePanel() {
  const { current, queue, index, playSong, removeFromQueue } = usePlayer();
  return (
    <div className="w-full rounded-xl bg-(--panel) p-4 overflow-y-auto">
      <h2 className="font-bold mb-4">Now playing</h2>
      {current ? (
        <>
          <img src={current.cover} alt="" className="w-full aspect-square rounded-lg object-cover mb-3" />
          <p className="font-bold text-lg truncate">{current.title}</p>
          <p className="text-(--muted) mb-6">{current.artist}</p>
          <h3 className="font-semibold text-(--muted) mb-2">Next in queue</h3>
          {queue.slice(index + 1).map((song, k) => (
            <div key={`${song.id}-${k}`} className="group flex items-center gap-3 p-2 rounded-lg hover:bg-(--hover)">
              <img src={song.cover} alt="" onClick={() => playSong(song, queue)} className="size-10 rounded object-cover cursor-pointer" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold truncate">{song.title}</p>
                <p className="text-xs text-(--muted) truncate">{song.artist}</p>
              </div>
              <button onClick={() => removeFromQueue(index + 1 + k)} aria-label="Remove from queue" className="opacity-0 group-hover:opacity-100 text-(--muted)"><X size={16} /></button>
            </div>
          ))}
          {index + 1 >= queue.length && <p className="text-sm text-(--muted)">Nothing queued. Use the queue button on any song.</p>}
        </>
      ) : <p className="text-sm text-(--muted)">Pick a song to see it here.</p>}
    </div>
  );
}