/**
 * First-time defaults: empty lists. Navigation only — everything else is filled
 * by the user and stored in localStorage (see appStorage.js).
 */
export function createDefaultAppData() {
  return {
    currentUser: {
      name: "",
      email: "",
    },

    menuItems: [
      { id: 1, title: "Dashboard", iconName: "LayoutGrid", url: "/" },
      { id: 2, title: "Tasks", iconName: "CalendarCheck", url: "/tasks" },
      { id: 3, title: "Requests", iconName: "Bookmark", url: "/requests" },
      { id: 4, title: "Reports", iconName: "ClipboardList", url: "/reports" },
      { id: 5, title: "Projects", iconName: "FolderKanban", url: "/projects" },
    ],

    sidebarDeadlines: [],
    sidebarProjects: [],

    tasks: [],
    projects: [],
    requests: [],
    reports: [],
    reportStats: [],
  };
}
