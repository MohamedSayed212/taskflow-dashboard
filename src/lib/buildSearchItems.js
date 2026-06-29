/**
 * Builds the global search index from whatever is currently in app state.
 */
export function buildSearchItems({
  tasks,
  projects,
  requests,
  reports,
  menuItems,
  sidebarDeadlines,
  sidebarProjects,
}) {
  return [
    ...menuItems.map((item) => ({
      title: item.title,
      description: `Open ${item.title}`,
      type: "Page",
      url: item.url,
      iconName: item.iconName,
    })),
    ...tasks.map((task) => ({
      title: task.title,
      description: `${task.status} task in ${task.project}${task.deadlineDuration ? ` · ${task.deadlineDuration}` : ""}`,
      type: "Task",
      url: "/tasks",
      iconName: "CalendarCheck",
    })),
    ...projects.map((project) => ({
      title: project.title,
      description: project.description,
      type: "Project",
      url: "/projects",
      iconName: "Folder",
    })),
    ...sidebarProjects.map((project) => ({
      title: project.title,
      description: "Project shortcut",
      type: "Project",
      url: project.url,
      iconName: project.iconName,
    })),
    ...reports.map((report) => ({
      title: report.title,
      description: `${report.type} report from ${report.date}`,
      type: "Report",
      url: "/reports",
      iconName: "ClipboardList",
    })),
    ...requests.map((request) => ({
      title: request.title,
      description: `${request.name} - ${request.task}`,
      type: "Request",
      url: "/requests",
      iconName: "Bookmark",
    })),
    ...sidebarDeadlines.map((deadline) => ({
      title: deadline.title,
      description: "Incoming deadline",
      type: "Deadline",
      url: deadline.url,
      iconName: deadline.iconName,
    })),
  ];
}
