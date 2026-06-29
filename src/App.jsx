import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import "./App.css";
import Header from "./Components/Header";
import SideBar from "./Components/SideBar";
import Dashboard from "./Pages/Dashboard";
import NotFound from "./Pages/NotFound";
import Projects from "./Pages/Projects";
import Reports from "./Pages/Reports";
import Requests from "./Pages/Requests";
import Tasks from "./Pages/Tasks";
import AddTaskModal from "./Components/AddTaskModal";
import { AppDataProvider } from "./Context/AppDataProvider";
import { SearchProvider } from "./Context/SearchProvider";
import { TasksModalProvider } from "./Context/TasksModalProvider";

/**
 * App is the root layout: providers wrap everything, then we render
 * the chrome (header + sidebar + main) and the router <Routes>.
 */
function App() {
  // Mobile sidebar drawer: open/closed. On `lg` screens SideBar ignores this
  // and stays visible (see SideBar.jsx Tailwind classes).
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // When the drawer is open, lock page scroll so the background does not move.
  useEffect(() => {
    document.body.style.overflow = mobileNavOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileNavOpen]);

  return (
    <AppDataProvider>
      <SearchProvider>
        <TasksModalProvider>
        <div className="theme flex min-h-screen flex-col bg-background lg:flex-row">
          {/* Top bar: only small/medium screens (see Header.jsx). */}
          <Header onMenuClick={() => setMobileNavOpen(true)} />

          <div className="relative flex min-h-0 flex-1 flex-col lg:flex-row">
            {/* Dark overlay behind the drawer; tap to close. */}
            {mobileNavOpen ? (
              <button
                type="button"
                className="fixed inset-0 z-40 bg-slate-900/45 backdrop-blur-[1px] lg:hidden"
                aria-label="Close menu"
                onClick={() => setMobileNavOpen(false)}
              />
            ) : null}

            <SideBar
              mobileOpen={mobileNavOpen}
              onMobileClose={() => setMobileNavOpen(false)}
            />

            {/* Page content grows to fill remaining width (`flex-1`, `min-w-0`). */}
            <main className="min-h-0 w-full min-w-0 flex-1 px-3 py-4 sm:px-5 sm:py-6 lg:px-8 lg:py-8">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/tasks" element={<Tasks />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/requests" element={<Requests />} />
                {/* `/*` matches /projects and any sub-path used in the sidebar. */}
                <Route path="/projects/*" element={<Projects />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </div>
        <AddTaskModal />
        </TasksModalProvider>
      </SearchProvider>
    </AppDataProvider>
  );
}

export default App;
