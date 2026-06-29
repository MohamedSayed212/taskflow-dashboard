import { useEffect } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";

import { taskItemAnimation, taskPageAnimation } from "../animations/taskAnimations";
import TaskTable from "../Components/TaskTable";
import { useAppData } from "../Context/useAppData";
import { useSearch } from "../Context/useSearch";
import { useTasksModal } from "../Context/useTasksModal";

/** Lists tasks. `/tasks?new=1` opens the add-task modal. */
export default function Tasks() {
  const { deleteTask, tasks } = useAppData();
  const { searchValue } = useSearch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { openAddTaskModal, openEditTaskModal } = useTasksModal();

  useEffect(() => {
    if (searchParams.get("new") !== "1") return;
    openAddTaskModal();
    const next = new URLSearchParams(searchParams);
    next.delete("new");
    setSearchParams(next, { replace: true });
  }, [searchParams, setSearchParams, openAddTaskModal]);

  const q = searchValue.trim().toLowerCase();
  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(q),
  );

  const tableEmptyMessage =
    tasks.length > 0 && filteredTasks.length === 0
      ? "No tasks match your search."
      : undefined;

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={taskPageAnimation}
      className="min-h-full bg-white py-4 sm:py-6"
    >
      <motion.div variants={taskItemAnimation} className="mb-6 sm:mb-8">
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Tasks</h1>
        <p className="mt-2 text-sm text-gray-500">
          Manage your tasks. Add tasks from the sidebar. On small screens you can scroll the table
          sideways.
        </p>
      </motion.div>

      <motion.div
        variants={taskItemAnimation}
        className="rounded-3xl border border-gray-100 bg-gray-50 p-3 sm:p-6"
      >
        <TaskTable
          tasks={filteredTasks}
          emptyMessage={tableEmptyMessage}
          onEditTask={openEditTaskModal}
          onDeleteTask={deleteTask}
        />
      </motion.div>
    </motion.div>
  );
}
