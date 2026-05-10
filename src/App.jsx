import "./App.css";
import SideBar from "./Components/SideBar";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Tasks from "./Pages/Tasks";
import Reports from "./Pages/Reports";
import Requests from "./Pages/Requests";
import Projects from "./Pages/Projects";
function App() {
  return (
    <div className="flex gap-2 ">
      {/* side bar */}
      <SideBar />
      {/* main content */}
      <main className="flex-1 py-3 px-6">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/requests" element={<Requests />} />
          <Route path="/projects" element={<Projects />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
