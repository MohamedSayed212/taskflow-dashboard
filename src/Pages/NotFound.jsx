/**
 * NotFound — shown when the URL does not match any <Route>.
 * Good practice: always add a catch‑all route in App.jsx.
 */
import { Link } from "react-router-dom";
import { Home } from "lucide-react";

const NotFound = () => {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <p className="text-6xl font-black text-violet-200">404</p>
      <h1 className="mt-2 text-xl font-bold text-gray-900 sm:text-2xl">
        Page not found
      </h1>
      <p className="mt-2 max-w-md text-sm text-gray-500">
        That address is not part of this demo app. Use the menu or the button
        below to go back home.
      </p>
      <Link
        to="/"
        className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-700"
      >
        <Home size={18} />
        Back to dashboard
      </Link>
    </div>
  );
};

export default NotFound;
