/**
 * Header (mobile only — hidden on large screens with `lg:hidden`)
 *
 * Why it exists: On small screens the sidebar is hidden to save space.
 * This bar gives you a menu button to open the sidebar drawer.
 */
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";

const Header = ({ onMenuClick }) => {
  return (
    <header className="sticky top-0 z-40 flex shrink-0 items-center gap-3 border-b border-neutral-200 bg-neutral-100 px-3 py-3 shadow-sm lg:hidden">
      <button
        type="button"
        onClick={onMenuClick}
        className="rounded-xl p-2 text-neutral-700 transition hover:bg-white hover:text-violet-700"
        aria-label="Open menu"
      >
        <Menu size={22} />
      </button>

      <Link
        to="/"
        className="text-lg font-bold tracking-tight text-transparent bg-gradient-to-r from-violet-600 via-fuchsia-500 to-sky-500 bg-clip-text"
      >
        TaskFlow
      </Link>
    </header>
  );
};

export default Header;
