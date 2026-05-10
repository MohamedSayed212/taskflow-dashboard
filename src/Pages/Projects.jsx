import { motion } from "framer-motion";

import {
  FolderKanban,
  CalendarDays,
  Users,
  MoreVertical,
  Plus,
  Search,
} from "lucide-react";

import {
  projectPageAnimation,
  projectItemAnimation,
  projectProgressAnimation,
} from "../animations/projectAnimations";

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: "TaskFlow Dashboard",
      description: "Admin dashboard for managing tasks and reports.",
      tasks: 12,
      members: 3,
      progress: "80%",
      status: "In Progress",
      deadline: "Tomorrow",
    },
    {
      id: 2,
      title: "Portfolio Website",
      description: "Personal portfolio to showcase frontend projects.",
      tasks: 8,
      members: 1,
      progress: "100%",
      status: "Completed",
      deadline: "Done",
    },
    {
      id: 3,
      title: "E-Commerce UI",
      description: "Frontend UI for products, cart, and checkout pages.",
      tasks: 5,
      members: 2,
      progress: "35%",
      status: "Pending",
      deadline: "3 days left",
    },
    {
      id: 4,
      title: "Landing Page Design",
      description: "Responsive landing page with modern UI sections.",
      tasks: 7,
      members: 2,
      progress: "55%",
      status: "In Progress",
      deadline: "Friday",
    },
  ];

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={projectPageAnimation}
      className="min-h-screen bg-white px-4 py-8 lg:px-4"
    >
      <motion.div
        variants={projectItemAnimation}
        className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-gray-900 lg:text-3xl">
            Projects
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Manage your projects, tasks, team members, and deadlines.
          </p>
        </div>

        <button className="flex w-fit items-center gap-2 rounded-2xl bg-gray-100 px-5 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-violet-100 hover:text-violet-700">
          <Plus size={18} />
          Add Project
        </button>
      </motion.div>

      <motion.div
        variants={projectItemAnimation}
        className="mb-6 flex items-center gap-3 rounded-3xl border border-gray-100 bg-gray-50 px-5 py-4"
      >
        <Search size={18} className="text-gray-400" />

        <input
          type="text"
          placeholder="Search projects..."
          className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
        />
      </motion.div>

      <motion.div
        variants={projectPageAnimation}
        className="grid grid-cols-1 gap-5 xl:grid-cols-2"
      >
        {projects.map((project) => (
          <motion.div
            key={project.id}
            variants={projectItemAnimation}
            className="rounded-3xl border border-gray-100 bg-gray-50 p-6"
          >
            <div className="mb-5 flex items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-purple-100 text-purple-600">
                  <FolderKanban size={22} />
                </div>

                <div>
                  <h3 className="font-bold text-gray-900">{project.title}</h3>

                  <p className="mt-1 text-sm text-gray-500">
                    {project.description}
                  </p>
                </div>
              </div>

              <MoreVertical
                size={20}
                className="cursor-pointer text-gray-400"
              />
            </div>

            <div className="mb-5 flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-600">
                {project.status}
              </span>

              <span className="flex items-center gap-1 rounded-full bg-white px-3 py-1 text-xs font-semibold text-gray-500">
                <CalendarDays size={14} />
                {project.deadline}
              </span>

              <span className="flex items-center gap-1 rounded-full bg-white px-3 py-1 text-xs font-semibold text-gray-500">
                <Users size={14} />
                {project.members} members
              </span>

              <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-gray-500">
                {project.tasks} tasks
              </span>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="font-medium text-gray-600">
                  Project Progress
                </span>

                <span className="font-bold text-purple-600">
                  {project.progress}
                </span>
              </div>

              <div className="h-2.5 overflow-hidden rounded-full bg-gray-200">
                <motion.div
                  initial={projectProgressAnimation.initial}
                  animate={projectProgressAnimation.animate(project.progress)}
                  className="h-2.5 rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-500"
                />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.p
        variants={projectItemAnimation}
        className="mt-8 text-center text-xs text-gray-400"
      >
        © 2026 TaskFlow Projects
      </motion.p>
    </motion.div>
  );
};

export default Projects;
