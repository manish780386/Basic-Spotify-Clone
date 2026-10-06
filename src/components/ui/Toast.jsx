import { usePlayer } from "../../context/PlayerContext";

export default function Toast() {
  const { toast } = usePlayer();
  return (
    <div role="status" aria-live="polite"
      className={`fixed left-1/2 -translate-x-1/2 bottom-36 md:bottom-28 z-[70] rounded-full bg-(--text) text-(--bg) px-5 py-2 text-sm font-semibold shadow-xl transition-all duration-300 ${toast.show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"}`}>
      {toast.msg}
    </div>
  );
}