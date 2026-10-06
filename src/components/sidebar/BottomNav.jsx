import { NavLink } from "react-router-dom";
import { links } from "./Sidebar";

export default function BottomNav() {
  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-50 flex justify-around bg-(--bg) border-t border-(--line) py-2">
      {links.map(({ to, label, Icon }) => (
        <NavLink key={to} to={to} end={to === "/"}
          className={({ isActive }) => `flex flex-col items-center text-[11px] gap-0.5 ${isActive ? "text-(--text)" : "text-(--muted)"}`}>
          <Icon size={22} />{label.replace("Your ", "")}
        </NavLink>
      ))}
    </nav>
  );
}