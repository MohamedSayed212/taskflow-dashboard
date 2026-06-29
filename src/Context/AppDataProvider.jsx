import { useEffect, useMemo, useState } from "react";

import { AppDataContext } from "./AppDataContext";
import { buildSearchItems } from "@/lib/buildSearchItems";
import { loadAppData, saveAppData } from "@/lib/appStorage";

export const AppDataProvider = ({ children }) => {
  // One shared state for the whole app.
  const [appData, setAppData] = useState(loadAppData);

  // Save every change in localStorage.
  useEffect(() => {
    saveAppData(appData);
  }, [appData]);

  const getNextId = (items) => {
    return items.reduce((maxId, item) => Math.max(maxId, item.id || 0), 0) + 1;
  };

  const addTask = (task) => {
    setAppData((data) => ({
      ...data,
      tasks: [...data.tasks, { ...task, id: getNextId(data.tasks) }],
    }));
  };

  const updateTask = (taskId, updatedFields) => {
    setAppData((data) => ({
      ...data,
      tasks: data.tasks.map((task) =>
        task.id === taskId ? { ...task, ...updatedFields } : task,
      ),
    }));
  };

  const deleteTask = (taskId) => {
    setAppData((data) => ({
      ...data,
      tasks: data.tasks.filter((task) => task.id !== taskId),
    }));
  };

  const updateProject = (projectId, updatedFields) => {
    setAppData((data) => ({
      ...data,
      projects: data.projects.map((p) =>
        p.id === projectId ? { ...p, ...updatedFields } : p,
      ),
    }));
  };

  const deleteProject = (projectId) => {
    setAppData((data) => ({
      ...data,
      projects: data.projects.filter((p) => p.id !== projectId),
    }));
  };

  const addProject = ({ title, description }) => {
    if (!title?.trim()) return;

    setAppData((data) => ({
      ...data,
      projects: [
        ...data.projects,
        {
          id: getNextId(data.projects),
          title: title.trim(),
          description: description?.trim() || "New project in TaskFlow.",
          tasks: 0,
          members: 1,
          progress: "0%",
          status: "Pending",
          deadline: "TBD",
        },
      ],
    }));
  };

  const addRequest = ({ name, title, task }) => {
    if (!name?.trim() || !title?.trim()) return;

    setAppData((data) => ({
      ...data,
      requests: [
        ...data.requests,
        {
          id: getNextId(data.requests),
          name: name.trim(),
          title: title.trim(),
          task: task?.trim() || "—",
          time: "Just now",
          status: "Pending",
        },
      ],
    }));
  };

  const updateRequest = (requestId, updatedFields) => {
    setAppData((data) => ({
      ...data,
      requests: data.requests.map((request) =>
        request.id === requestId ? { ...request, ...updatedFields } : request,
      ),
    }));
  };

  const deleteRequest = (requestId) => {
    setAppData((data) => ({
      ...data,
      requests: data.requests.filter((request) => request.id !== requestId),
    }));
  };

  const addReport = ({ title, type }) => {
    if (!title?.trim()) return;

    setAppData((data) => ({
      ...data,
      reports: [
        ...data.reports,
        {
          id: getNextId(data.reports),
          title: title.trim(),
          type: type || "Summary",
          date: new Date().toLocaleDateString(),
        },
      ],
    }));
  };

  const deleteReport = (reportId) => {
    setAppData((data) => ({
      ...data,
      reports: data.reports.filter((report) => report.id !== reportId),
    }));
  };

  const searchItems = useMemo(() => {
    return buildSearchItems(appData);
  }, [appData]);

  const value = {
    ...appData,
    searchItems,
    addTask,
    updateTask,
    deleteTask,
    addProject,
    updateProject,
    deleteProject,
    addRequest,
    updateRequest,
    deleteRequest,
    addReport,
    deleteReport,
  };

  return (
    <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>
  );
};
