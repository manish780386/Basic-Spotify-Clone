import { useState } from "react";
import { usePlayer } from "../../context/PlayerContext";

export default function CreatePlaylist() {
  const [name, setName] = useState("");
  const { createPlaylist } = usePlayer();

  return (
    <div className="flex gap-2 mt-4">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="New Playlist"
        className="bg-[#242424] px-3 py-2 rounded w-full"
      />
      <button
        onClick={() => {
          if (name) createPlaylist(name);
          setName("");
        }}
        className="bg-green-500 px-4 rounded"
      >
        Create
      </button>
    </div>
  );
}
