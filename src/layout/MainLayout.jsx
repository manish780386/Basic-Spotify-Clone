import { Routes, Route } from "react-router-dom";
import { CatalogProvider } from "../context/CatalogContext";
import { PlayerProvider } from "../context/PlayerContext";
import Sidebar from "../components/sidebar/Sidebar";
import BottomNav from "../components/sidebar/BottomNav";
import Player from "../components/player/Player";
import NowPlaying from "../components/player/NowPlaying";
import QueuePanel from "../components/queue/QueuePanel";
import Toast from "../components/ui/Toast";
import Home from "../pages/Home";
import Search from "../pages/Search";
import Library from "../pages/Library";
import Playlist from "../pages/Playlist";
import Mood from "../pages/Mood";
import useKeyboardControls from "../hooks/useKeyboardControls";

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
            <Route path="/mood/:name" element={<Mood />} />
          </Routes>
        </main>
        <aside className="hidden xl:flex w-80 shrink-0"><QueuePanel /></aside>
      </div>
      <Player />
      <BottomNav />
      <NowPlaying />
      <Toast />
    </div>
  );
}

export default function MainLayout() {
  return (
    <CatalogProvider>
      <PlayerProvider>
        <Shell />
      </PlayerProvider>
    </CatalogProvider>
  );
}