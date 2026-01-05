import SongCard from "../song/SongCard";

export default function PlaylistSongs({ playlist }) {
  if (!playlist) return null;

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-4">{playlist.name}</h2>

      {playlist.songs.length === 0 && (
        <p className="text-gray-400">No songs added</p>
      )}

      {playlist.songs.map((song) => (
        <SongCard key={song.id} song={song} />
      ))}
    </div>
  );
}
