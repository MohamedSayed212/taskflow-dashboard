import { motion } from "framer-motion";
import { Search, CalendarDays, MoreVertical } from "lucide-react";
import {
  taskPageAnimation,
  taskItemAnimation,
} from "../animations/taskAnimations";

const Tasks = () => {
  // Tasks Data

  const tasks = [
    {
      title: "Design dashboard UI",
      project: "TaskFlow",
      status: "Completed",
      priority: "High",
      date: "Today",
    },
    {
      title: "Fix sidebar active state",
      project: "TaskFlow",
      status: "In Progress",
      priority: "Medium",
      date: "Tomorrow",
    },
    {
      title: "Build tasks page",
      project: "Admin CMS",
      status: "Pending",
      priority: "High",
      date: "3 days left",
    },
  ];

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={taskPageAnimation}
      className="min-h-screen bg-white px-4 py-8 lg:px-4"
    >
      {/* Header Section */}
      <motion.div
        variants={taskItemAnimation}
        className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between"
      >
        {/* Page Title */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 lg:text-3xl">
            Tasks
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Manage and track all your tasks.
          </p>
        </div>
      </motion.div>
      {/* Search Bar Section */}
      <motion.div
        variants={taskItemAnimation}
        className="mb-6 flex items-center gap-3 rounded-3xl border border-gray-100 bg-gray-50 px-5 py-4"
      >
        {/* Search Icon */}
        <Search size={18} className="text-gray-400" />

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search tasks..."
          className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
        />
      </motion.div>
      {/* Tasks container */}
      <motion.div
        variants={taskItemAnimation}
        className="rounded-3xl border border-gray-100 bg-gray-50 p-6"
      >
        {/* Space Between Task Cards */}
        <div className="space-y-4">
          {/* Loop Through Tasks */}
          {tasks.map((task, index) => (
            // Single Task Card
            <motion.div
              key={index}
              variants={taskItemAnimation}
              className="flex flex-col gap-4 rounded-2xl bg-white p-5 lg:flex-row lg:items-center lg:justify-between"
            >
              {/* =========================
                    Left Side
                    Task Info
                ========================== */}
              <div>
                {/* Task Title */}
                <h3 className="font-bold text-gray-900">{task.title}</h3>

                {/* Project Name */}
                <p className="mt-1 text-sm text-gray-500">{task.project}</p>
              </div>

              {/* =========================
                    Right Side
                    Task Details
                ========================== */}
              <div className="flex flex-wrap items-center gap-3">
                {/* Task Status */}
                <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-600">
                  {task.status}
                </span>

                {/* Task Priority */}
                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">
                  {task.priority}
                </span>

                {/* Task Date */}
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  {/* Calendar Icon */}
                  <CalendarDays size={16} />

                  {/* Date Text */}
                  {task.date}
                </div>

                {/* More Options Icon */}
                <MoreVertical
                  size={18}
                  className="cursor-pointer text-gray-400"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Tasks;
