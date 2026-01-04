import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const menuItems = [
    { name: "Home", path: "/", icon: "🏠" },
    { name: "Library", path: "/library", icon: "📚" },
    { name: "Playlists", path: "/playlists", icon: "🎵" },
  ];

  return (
    <div className="w-60 bg-[#181818] min-h-screen p-6 text-white fixed">
      <h1 className="text-2xl font-bold mb-8">Spotify Clone</h1>

      <nav className="flex flex-col gap-4">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 rounded hover:bg-gray-700 ${
                isActive ? "bg-gray-700 font-semibold" : ""
              }`
            }
          >
            <span>{item.icon}</span>
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
