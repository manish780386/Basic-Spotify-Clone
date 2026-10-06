import { NavLink, Link } from "react-router-dom";
import { Home, Search, Library, Heart, Plus } from "lucide-react";
import { usePlayer } from "../../context/PlayerContext";
import ThemeToggle from "../ui/ThemeToggle";

const APP_NAME = "Dhunly"; // 👈 naam yaha badal

export const links = [
  { to: "/", label: "Home", Icon: Home },
  { to: "/search", label: "Search", Icon: Search },
  { to: "/library", label: "Your Library", Icon: Library },
];

export default function Sidebar() {
  const { playlists } = usePlayer();
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="rounded-xl bg-(--panel) p-5">
        <Link to="/" className="flex items-center gap-2 text-xl font-extrabold tracking-tight mb-6">
          <span className="grid place-items-center size-8 rounded-lg bg-(--accent) text-black">♪</span>
          {APP_NAME}
        </Link>
        <nav className="flex flex-col gap-1">
          {links.map(({ to, label, Icon }) => (
            <NavLink key={to} to={to} end={to === "/"}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg font-semibold transition-colors ${isActive ? "text-(--text) bg-(--hover)" : "text-(--muted) hover:text-(--text)"}`}>
              <Icon size={20} />{label}
            </NavLink>
          ))}
        </nav>
      </div>
      <div className="rounded-xl bg-(--panel) p-3 flex-1 overflow-y-auto">
        <div className="flex items-center justify-between px-2 py-1 text-(--muted) font-semibold">
          Playlists
          <Link to="/library" aria-label="Create playlist" className="p-1 rounded-full hover:bg-(--hover) hover:text-(--text)"><Plus size={18} /></Link>
        </div>
        <Link to="/library" className="flex items-center gap-3 p-2 rounded-lg hover:bg-(--hover)">
          <span className="grid place-items-center size-10 rounded-md bg-gradient-to-br from-violet-500 to-fuchsia-400"><Heart size={16} fill="white" /></span>
          <span className="text-sm font-semibold">Liked Songs</span>
        </Link>
        {playlists.map((p) => (
          <Link key={p.id} to={`/playlist/${p.id}`} className="flex items-center gap-3 p-2 rounded-lg hover:bg-(--hover)">
            <span className="grid place-items-center size-10 rounded-md bg-(--hover) text-(--muted)">♫</span>
            <span className="text-sm font-semibold truncate">{p.name}</span>
          </Link>
        ))}
      </div>
      <div className="px-2 pb-2"><ThemeToggle /></div>
    </div>
  );
}