import logo from "../assets/logo.png";
import profilePicture from "../assets/profilePicture.webp";
import {
  ChevronDown,
  Plus,
  Search,
  CalendarCheck,
  Bookmark,
  LayoutGrid,
  ClipboardList,
} from "lucide-react";
import { Button } from "@/Components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/Components/ui/input-group";

const SideBar = () => {
  const user = {
    name: "Mohamed Sayed",
    email: "mohamed@gmail.com",
  };

  const menuItems = [
    {
      id: 1,
      title: "Dashborad",
      icon: LayoutGrid,
    },
    { id: 2, title: "Tasks", icon: CalendarCheck },
    { id: 3, title: "Requests", icon: Bookmark },
    { id: 4, title: "Reports", icon: ClipboardList },
  ];

  return (
    <aside className="h-screen w-[350px] bg-neutral-100 px-8 py-10">
      {/* Logo */}
      <div className="mb-14 flex items-center gap-3">
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
        {/* text */}
        <h2 className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-sky-500 bg-clip-text text-2xl font-bold tracking-tight text-transparent">
          TaskFlow
        </h2>
      </div>

      {/* Profile Card */}
      <div className="flex items-center gap-3 rounded-xl border border-neutral-300 bg-neutral-50 p-2.5">
        <img
          src={profilePicture}
          alt="Profile"
          className="h-12 w-12 rounded-full"
        />

        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-neutral-700">
            {user.name}
          </p>
          <p className="truncate text-xs text-neutral-500">{user.email}</p>
        </div>

        <button className="ml-auto rounded-lg p-2 text-neutral-700 transition-colors duration-200 hover:bg-neutral-200">
          <ChevronDown size={18} />
        </button>
      </div>

      {/* Search Field */}
      <InputGroup className="mt-3 h-11 rounded-xl border-neutral-300 bg-neutral-50 focus-within:border-violet-400 focus-within:ring-violet-200/60">
        <InputGroupInput placeholder="Search..." />
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
      </InputGroup>

      {/* Add Task Button */}
      <Button className="mt-7 h-11 w-full rounded-xl bg-neutral-200 text-sm font-semibold text-neutral-700 shadow-none transition-colors duration-200 hover:bg-violet-100 hover:text-violet-700">
        Add New Task
        <Plus size={18} />
      </Button>

      {/* Main Menu */}
      <div className="mt-12 ml-1">
        <h3 className="text-xs mb-3 font-semibold tracking-[0.2em] text-neutral-400 uppercase">
          Main Menu
        </h3>
        {/* items in menu */}
        {menuItems.map((item) => {
          const Icon = item.icon;
          const Title = item.title;
          return (
            <div key={item.id}>
              <button
                key={item.id}
                className="group flex w-full items-center gap-[10px] rounded-xl px-4 py-3 text-neutral-500 transition-all duration-200 hover:bg-violet-100/70 hover:text-violet-700"
              >
                {/* Icon */}
                <Icon size={22} className="transition-colors duration-200" />

                {/* Title */}
                <span className="text-[15px] font-medium">{Title}</span>
              </button>
            </div>
          );
        })}
      </div>
    </aside>
  );
};

export default SideBar;
