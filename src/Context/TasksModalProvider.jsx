import { useState } from "react";

import { TasksModalContext } from "./TasksModalContext";

export function TasksModalProvider({ children }) {
  const [addTaskModalOpen, setAddTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [defaultProject, setDefaultProject] = useState(null);

  const openAddTaskModal = (projectTitle = null) => {
    setDefaultProject(projectTitle);
    setEditingTask(null);
    setAddTaskModalOpen(true);
  };

  const openEditTaskModal = (task) => {
    setDefaultProject(null);
    setEditingTask(task);
    setAddTaskModalOpen(true);
  };

  const closeAddTaskModal = () => {
    setEditingTask(null);
    setDefaultProject(null);
    setAddTaskModalOpen(false);
  };

  return (
    <TasksModalContext.Provider
      value={{
        addTaskModalOpen,
        editingTask,
        defaultProject,
        openAddTaskModal,
        openEditTaskModal,
        closeAddTaskModal,
      }}
    >
      {children}
    </TasksModalContext.Provider>
  );
}
