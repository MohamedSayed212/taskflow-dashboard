/**
 * Standalone search modal (same idea as the search UI inside SideBar).
 * Import and render where you need it; `onClose` runs when backdrop or Escape fires.
 */
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  ArrowUpToLine,
  Bookmark,
  CalendarCheck,
  ClipboardList,
  Folder,
  FolderKanban,
  LayoutGrid,
  Search,
  X,
} from "lucide-react";
import { useAppData } from "@/Context/useAppData";
import { useSearch } from "@/Context/useSearch";

const iconMap = {
  ArrowUpToLine,
  Bookmark,
  CalendarCheck,
  ClipboardList,
  Folder,
  FolderKanban,
  LayoutGrid,
};

const getIcon = (iconName) => iconMap[iconName] ?? Folder;

const GlobalSearchPopup = ({ onClose }) => {
  const { searchItems } = useAppData();
  const { searchValue, setSearchValue } = useSearch();
  const searchInputRef = useRef(null);

  // Search all shared records, then show quick access when the input is empty.
  const normalizedSearch = searchValue.trim().toLowerCase();
  const searchResults = normalizedSearch
    ? searchItems.filter((item) =>
        `${item.title} ${item.description} ${item.type}`
          .toLowerCase()
          .includes(normalizedSearch),
      )
    : searchItems.slice(0, 7);

  useEffect(() => {
    searchInputRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="flex max-h-[min(85dvh,640px)] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-white/80 bg-white/95 shadow-2xl shadow-violet-950/20"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Search"
      >
        {/* Search input */}
        <div className="border-b border-slate-100 bg-gradient-to-r from-violet-50 via-sky-50 to-cyan-50 p-4">
          <div className="flex items-center gap-3 rounded-2xl border border-white bg-white/90 px-4 py-3 shadow-sm">
            <Search size={20} className="shrink-0 text-violet-500" />
            <input
              ref={searchInputRef}
              type="text"
              aria-label="Global search"
              placeholder="Search pages, tasks, projects, reports..."
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
              className="min-w-0 flex-1 bg-transparent text-sm font-medium text-slate-800 outline-none placeholder:text-slate-400"
            />

            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
              aria-label="Close search"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Search results */}
        <div className="min-h-0 flex-1 overflow-y-auto p-3">
          <div className="mb-2 flex items-center justify-between px-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
            <span>{normalizedSearch ? "Results" : "Quick access"}</span>
            <span>{searchResults.length}</span>
          </div>

          {searchResults.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center">
              <p className="font-semibold text-slate-700">
                No matching results
              </p>
              <p className="mt-1 text-sm text-slate-400">
                Try searching for tasks, projects, reports, or requests.
              </p>
            </div>
          ) : (
            <div className="space-y-1">
              {searchResults.map((item) => {
                const Icon = getIcon(item.iconName);

                return (
                  <Link
                    key={`${item.type}-${item.title}`}
                    to={item.url}
                    onClick={onClose}
                    className="group flex items-center gap-3 rounded-2xl px-3 py-3 transition hover:bg-violet-50"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-50 to-cyan-50 text-violet-500 ring-1 ring-violet-100/70">
                      <Icon size={20} />
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-bold text-slate-800">
                        {item.title}
                      </span>
                      <span className="mt-0.5 block truncate text-xs font-medium text-slate-400">
                        {item.type} - {item.description}
                      </span>
                    </span>

                    <ArrowUpRight
                      size={17}
                      className="text-slate-300 transition group-hover:text-violet-500"
                    />
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GlobalSearchPopup;
