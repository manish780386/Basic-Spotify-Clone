import SongCard from "../song/SongCard";

export default function SearchResults({ results }) {
  if (!results || results.length === 0) return null;

  return (
    <div className="mt-6 space-y-2">
      {results.map((song) => (
        <SongCard key={song.id} song={song} />
      ))}
    </div>
  );
}
