import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  ArrowUpToLine,
  Bookmark,
  CalendarCheck,
  ChevronDown,
  ClipboardList,
  Folder,
  FolderKanban,
  LayoutGrid,
  Plus,
  Search,
} from "lucide-react";

import logo from "../assets/logo.png";
import profilePicture from "../assets/profilePicture.webp";
import GlobalSearchPopup from "./GlobalSearchPopup";
import { InputGroup, InputGroupAddon } from "@/Components/ui/input-group";
import { useAppData } from "@/Context/useAppData";
import { useSearch } from "@/Context/useSearch";
import { useTasksModal } from "@/Context/useTasksModal";
import { cn } from "@/lib/utils";

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

function SidebarSection({ title, items, onMobileClose }) {
  return (
    <div className="mt-6 ml-1">
      <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400">
        {title}
      </h3>

      <div className="space-y-1">
        {items.length === 0 ? (
          <p className="px-4 py-2 text-sm text-neutral-400">No items yet</p>
        ) : (
          items.map((item) => {
            const Icon = getIcon(item.iconName);

            return (
              <NavLink
                key={item.id}
                to={item.url}
                onClick={onMobileClose}
                className={({ isActive }) =>
                  cn(
                    "group flex w-full items-center gap-3 rounded-xl px-4 py-3 text-[15px] font-medium transition-all duration-200",
                    isActive
                      ? "bg-violet-100 text-violet-800"
                      : "text-neutral-500 hover:bg-violet-100/70 hover:text-violet-700",
                  )
                }
              >
                <Icon size={22} className="shrink-0" />
                <span>{item.title}</span>
              </NavLink>
            );
          })
        )}
      </div>

      <div className="mt-5 border-b border-neutral-200" />
    </div>
  );
}

const SideBar = ({ mobileOpen = false, onMobileClose = () => {} }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { currentUser, menuItems, sidebarDeadlines, sidebarProjects } = useAppData();
  const { searchValue } = useSearch();
  const { openAddTaskModal } = useTasksModal();

  return (
    <>
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 flex min-h-screen w-[min(100vw,340px)] flex-col overflow-y-auto bg-neutral-100 px-5 py-8 shadow-xl transition-transform duration-300 ease-out sm:px-7 sm:py-10 lg:static lg:w-[300px] lg:translate-x-0 lg:shadow-none xl:w-[340px]",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        <div className="mb-10 flex items-center gap-3 lg:mb-14">
          <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-md shadow-violet-200/50 ring-1 ring-violet-100">
            <div className="absolute inset-1 rounded-[18px] bg-gradient-to-br from-violet-500/10 via-fuchsia-500/10 to-sky-400/15" />
            <div
              aria-label="TaskFlow logo"
              role="img"
              className="relative h-10 w-10 bg-gradient-to-br from-violet-600 via-fuchsia-500 to-sky-500"
              style={{
                WebkitMask: `url(${logo}) center / contain no-repeat`,
                mask: `url(${logo}) center / contain no-repeat`,
              }}
            />
          </div>

          <h2 className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-sky-500 bg-clip-text text-2xl font-bold tracking-tight text-transparent">
            TaskFlow
          </h2>
        </div>

        <div className="flex items-center gap-3 rounded-xl border border-neutral-300 bg-neutral-50 p-2.5">
          <img src={profilePicture} alt="Profile" className="h-12 w-12 rounded-full" />

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-neutral-700">
              {currentUser.name?.trim() || "Your name"}
            </p>
            <p className="truncate text-xs text-neutral-500">
              {currentUser.email?.trim() || "you@example.com"}
            </p>
          </div>

          <button className="ml-auto rounded-lg p-2 text-neutral-700 transition-colors hover:bg-neutral-200">
            <ChevronDown size={18} />
          </button>
        </div>

        <InputGroup
          className="mt-3 h-11 cursor-pointer rounded-xl border-neutral-300 bg-neutral-50 transition hover:border-violet-200 hover:bg-white"
          onClick={() => setIsSearchOpen(true)}
        >
          <button type="button" className="min-w-0 flex-1 truncate text-left text-sm text-neutral-500">
            {searchValue || "Search anything..."}
          </button>
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
        </InputGroup>

        <button
          type="button"
          onClick={() => {
            openAddTaskModal();
            onMobileClose();
          }}
          className="mt-7 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-neutral-200 text-sm font-semibold text-neutral-700 transition-colors hover:bg-violet-100 hover:text-violet-700"
        >
          Add New Task
          <Plus size={18} />
        </button>

        <SidebarSection title="Main Menu" items={menuItems} onMobileClose={onMobileClose} />
        <SidebarSection title="Incoming Deadline" items={sidebarDeadlines} onMobileClose={onMobileClose} />
        <SidebarSection title="My Project's" items={sidebarProjects} onMobileClose={onMobileClose} />
      </aside>

      {isSearchOpen ? <GlobalSearchPopup onClose={() => setIsSearchOpen(false)} /> : null}
    </>
  );
};

export default SideBar;
