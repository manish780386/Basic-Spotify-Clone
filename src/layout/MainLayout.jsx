import { Routes, Route } from "react-router-dom";
import { PlayerProvider } from "../context/PlayerContext";
import Sidebar from "../components/sidebar/Sidebar";
import BottomNav from "../components/sidebar/BottomNav.jsx";
import Player from "../components/player/Player";
import QueuePanel from "../components/queue/QueuePanel";
import Home from "../pages/Home";
import Search from "../pages/Search.jsx";
import Library from "../pages/Library.jsx";
import Playlist from "../pages/Playlist.jsx";
import useKeyboardControls from "../hooks/useKeyboardControls.js";

function Shell() {
  useKeyboardControls();
  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 min-h-0 flex gap-2 p-2 md:pb-0">
        <aside className="hidden md:flex w-64 shrink-0"><Sidebar /></aside>
        <main className="flex-1 min-w-0 overflow-y-auto rounded-xl bg-(--panel) pb-40 md:pb-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/library" element={<Library />} />
            <Route path="/playlist/:id" element={<Playlist />} />
          </Routes>
        </main>
        <aside className="hidden xl:flex w-80 shrink-0"><QueuePanel /></aside>
      </div>
      <Player />
      <BottomNav />
    </div>
  );
}

export default function MainLayout() {
  return <PlayerProvider><Shell /></PlayerProvider>;
}