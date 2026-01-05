import { useState } from "react";
import useDebounce from "../../hooks/useDebounce";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query);

  // 🔥 debounced search
  if (onSearch) onSearch(debouncedQuery);

  return (
    <input
      type="text"
      placeholder="Search songs or artists..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      className="w-full bg-[#242424] text-white px-4 py-2 rounded-full outline-none"
    />
  );
}
