import { useContext } from "react";

import { TasksModalContext } from "./TasksModalContext";

export function useTasksModal() {
  const ctx = useContext(TasksModalContext);
  if (!ctx) {
    throw new Error("useTasksModal must be used within TasksModalProvider");
  }
  return ctx;
}
