import { PlayerProvider } from "../context/PlayerContext";
import Player from "../components/player/Player";
import Sidebar from "../components/sidebar/Sidebar";
import Home from "../pages/Home";
import QueuePanel from "../components/queue/QueuePanel";

export default function MainLayout() {
  return (
    <PlayerProvider>
      <div className="flex bg-[#121212] min-h-screen text-white">

        {/* Sidebar – Desktop only */}
        <aside className="hidden md:flex md:flex-col md:w-60 fixed md:h-screen">
          <Sidebar />
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 md:ml-60 pb-32">
          <Home />
        </main>

        {/* Queue Panel – Desktop only */}
        <aside className="hidden lg:block w-72 p-4 border-l border-gray-800">
          <QueuePanel />
        </aside>

        {/* Bottom Player */}
        <Player />

      </div>
    </PlayerProvider>
  );
}
