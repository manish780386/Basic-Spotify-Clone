import songs from "../data/songs";
import SongCard from "../components/song/SongCard";
import CreatePlaylist from "../components/playlist/CreatePlaylist";
import PlaylistList from "../components/playlist/PlaylistList";
import PlaylistSongs from "../components/playlist/PlaylistSongs";
import { useState } from "react";

export default function Home() {
  const [activePlaylist, setActivePlaylist] = useState(null);
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-8 text-gray-800 text-center">
          🎧 Your Playlist
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {songs.map((song) => (
            <SongCard key={song.id} song={song} />
          ))}
        </div>
      </div>
      return 
    <>
      <CreatePlaylist />
      <PlaylistList onSelect={setActivePlaylist} />
      <PlaylistSongs playlist={activePlaylist} />
    </>
    </div>
  );
}
