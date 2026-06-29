import { useState } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import {
  CalendarDays,
  CheckCircle2,
  Circle,
  Clock,
  FolderKanban,
  MoreVertical,
  Pencil,
  Plus,
  Trash2,
  Users,
  X,
} from "lucide-react";

import {
  projectItemAnimation,
  projectPageAnimation,
  projectProgressAnimation,
} from "../animations/projectAnimations";
import { useAppData } from "../Context/useAppData";
import { useTasksModal } from "../Context/useTasksModal";

const STATUS_ICON = {
  Completed: <CheckCircle2 size={14} className="text-emerald-500" />,
  "In Progress": <Clock size={14} className="text-amber-500" />,
  Pending: <Circle size={14} className="text-gray-400" />,
};

const STATUS_BADGE = {
  Completed: "bg-emerald-100 text-emerald-700",
  "In Progress": "bg-amber-100 text-amber-700",
  Pending: "bg-gray-100 text-gray-500",
};

function AnimatedProgressBar({ width }) {
  return (
    <div className="h-2.5 overflow-hidden rounded-full bg-gray-200">
      <motion.div
        initial={projectProgressAnimation.initial}
        animate={projectProgressAnimation.animate(width)}
        className="h-2.5 rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-500"
      />
    </div>
  );
}

function ProjectCard({ project, projectTasks }) {
  const { tasks, updateTask, updateProject, deleteProject } = useAppData();
  const { openAddTaskModal } = useTasksModal();
  const [showPopup, setShowPopup] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [editTitle, setEditTitle] = useState(project.title);
  const [editDesc, setEditDesc] = useState(project.description);

  const completedCount = projectTasks.filter((t) => t.status === "Completed").length;
  const taskCount = projectTasks.length;
  const progressPct =
    taskCount === 0 ? 0 : Math.round((completedCount / taskCount) * 100);
  const progressLabel = `${progressPct}%`;

  const availableTasks = tasks.filter((t) => t.project !== project.title);

  const openPopup = () => {
    setSelectedId(availableTasks[0]?.id?.toString() ?? "");
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedId("");
  };

  const assignTask = () => {
    const id = Number(selectedId);
    if (!id) return;
    updateTask(id, { project: project.title });
    closePopup();
  };

  const saveEdit = () => {
    if (!editTitle.trim()) return;
    updateProject(project.id, {
      title: editTitle.trim(),
      description: editDesc.trim(),
    });
    setShowEdit(false);
  };

  const cancelEdit = () => {
    setEditTitle(project.title);
    setEditDesc(project.description);
    setShowEdit(false);
  };

  return (
    <motion.div
      variants={projectItemAnimation}
      className="flex flex-col rounded-3xl border border-gray-100 bg-gray-50 p-4 sm:p-6"
    >
      <div className="mb-5 flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-purple-100 text-purple-600">
            <FolderKanban size={22} />
          </div>
          {showEdit ? (
            <div className="flex-1">
              <input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                placeholder="Project name"
                className="mb-1.5 w-full rounded-xl border border-violet-200 bg-white px-3 py-1.5 text-sm font-bold text-gray-900 outline-none ring-violet-400 focus:ring-2"
              />
              <input
                value={editDesc}
                onChange={(e) => setEditDesc(e.target.value)}
                placeholder="Description (optional)"
                className="w-full rounded-xl border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-500 outline-none ring-violet-400 focus:ring-2"
              />
              <div className="mt-2 flex gap-2">
                <button
                  type="button"
                  onClick={saveEdit}
                  className="rounded-lg bg-violet-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-violet-700"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-semibold text-gray-600 hover:bg-gray-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div>
              <h3 className="font-bold text-gray-900">{project.title}</h3>
              <p className="mt-1 text-sm text-gray-500">{project.description}</p>
            </div>
          )}
        </div>

        {/* Kebab menu */}
        <div className="relative shrink-0">
          <button
            type="button"
            onClick={() => setShowMenu((v) => !v)}
            className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-200 hover:text-gray-600"
            aria-label="Project options"
          >
            <MoreVertical size={20} />
          </button>

          {showMenu && (
            <>
              {/* Backdrop to close on outside click */}
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowMenu(false)}
              />
              <div className="absolute right-0 top-9 z-20 min-w-[130px] overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg">
                <button
                  type="button"
                  onClick={() => {
                    setShowMenu(false);
                    setEditTitle(project.title);
                    setEditDesc(project.description);
                    setShowEdit(true);
                  }}
                  className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-violet-50 hover:text-violet-700"
                >
                  <Pencil size={15} />
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowMenu(false);
                    deleteProject(project.id);
                  }}
                  className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
                >
                  <Trash2 size={15} />
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
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
          {taskCount} {taskCount === 1 ? "task" : "tasks"}
        </span>
      </div>

      {/* Task list */}
      <div className="mb-4 flex-1">
        {projectTasks.length === 0 ? (
          <p className="text-sm text-gray-400">No tasks yet. Add the first one below.</p>
        ) : (
          <ul className="space-y-2">
            {projectTasks.map((task) => (
              <li
                key={task.id}
                className="flex items-center gap-2.5 rounded-xl bg-white px-3 py-2.5"
              >
                {STATUS_ICON[task.status] ?? <Circle size={14} className="text-gray-400" />}
                <span className="min-w-0 flex-1 truncate text-sm font-medium text-gray-700">
                  {task.title}
                </span>
                <span
                  className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold ${STATUS_BADGE[task.status] ?? "bg-gray-100 text-gray-500"}`}
                >
                  {task.status}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Add-task popup */}
      {showPopup && (
        <div className="mb-4 rounded-2xl border border-violet-200 bg-white p-4 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-bold text-gray-800">Add task</span>
            <button
              type="button"
              onClick={closePopup}
              className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
              aria-label="Close"
            >
              <X size={16} />
            </button>
          </div>

          {/* Existing task section */}
          <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-gray-400">
            Existing task
          </p>
          {availableTasks.length === 0 ? (
            <p className="mb-3 text-xs text-gray-400">All tasks are already in this project.</p>
          ) : (
            <div className="mb-3 flex gap-2">
              <select
                value={selectedId}
                onChange={(e) => setSelectedId(e.target.value)}
                className="min-w-0 flex-1 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none ring-violet-400 focus:ring-2"
              >
                {availableTasks.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.title} — {t.project || "No project"}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={assignTask}
                className="shrink-0 rounded-xl bg-violet-600 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-700"
              >
                Add
              </button>
            </div>
          )}

          {/* Divider */}
          <div className="mb-3 flex items-center gap-2">
            <div className="h-px flex-1 bg-gray-100" />
            <span className="text-xs text-gray-400">or</span>
            <div className="h-px flex-1 bg-gray-100" />
          </div>

          {/* Create new task */}
          <button
            type="button"
            onClick={() => {
              closePopup();
              openAddTaskModal(project.title);
            }}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-violet-300 py-2 text-sm font-semibold text-violet-600 transition-colors hover:border-violet-400 hover:bg-violet-50"
          >
            <Plus size={15} />
            Create new task
          </button>
        </div>
      )}

      {/* Single add button */}
      <button
        type="button"
        onClick={showPopup ? closePopup : openPopup}
        className="mb-5 flex w-full items-center justify-center gap-1.5 rounded-xl border border-dashed border-purple-300 py-2 text-sm font-semibold text-purple-600 transition-colors hover:border-purple-400 hover:bg-purple-50"
      >
        <Plus size={15} />
        Add task
      </button>

      <div>
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="font-medium text-gray-600">Project Progress</span>
          <span className="font-bold text-purple-600">{progressLabel}</span>
        </div>
        <AnimatedProgressBar width={progressLabel} />
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const { addProject, projects, tasks } = useAppData();
  const [searchParams, setSearchParams] = useSearchParams();
  const [draftName, setDraftName] = useState("");

  const showQuickAdd = searchParams.get("new") === "1";

  const openQuickAdd = () => {
    const next = new URLSearchParams(searchParams);
    next.set("new", "1");
    setSearchParams(next, { replace: false });
  };

  const closeQuickAdd = () => {
    setDraftName("");
    const next = new URLSearchParams(searchParams);
    next.delete("new");
    setSearchParams(next, { replace: true });
  };

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={projectPageAnimation}
      className="min-h-full bg-white py-4 sm:py-6"
    >
      <motion.div
        variants={projectItemAnimation}
        className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-between"
      >
        <div className="min-w-0">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Projects</h1>
          <p className="mt-2 text-sm text-gray-500">
            Manage your projects. Data is saved in this browser.
          </p>
        </div>

        <button
          type="button"
          onClick={openQuickAdd}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gray-100 px-5 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-violet-100 hover:text-violet-700 sm:w-fit"
        >
          <Plus size={18} />
          Add Project
        </button>
      </motion.div>

      {showQuickAdd ? (
        <motion.div
          variants={projectItemAnimation}
          className="mb-6 rounded-2xl border border-violet-200 bg-violet-50/80 p-4 sm:p-5"
        >
          <div className="mb-3 flex items-start justify-between gap-2">
            <div>
              <h2 className="font-semibold text-violet-900">New project</h2>
              <p className="mt-1 text-xs text-violet-800/90">
                Saved with your other TaskFlow data (localStorage).
              </p>
            </div>
            <button
              type="button"
              onClick={closeQuickAdd}
              className="rounded-lg p-1.5 text-violet-700 hover:bg-violet-100"
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>
          <label className="block text-xs font-medium text-violet-800" htmlFor="project-draft">
            Project name
          </label>
          <input
            id="project-draft"
            value={draftName}
            onChange={(e) => setDraftName(e.target.value)}
            placeholder="e.g. Mobile redesign"
            className="mt-1 w-full rounded-xl border border-violet-200 bg-white px-3 py-2 text-sm outline-none ring-violet-400 focus:ring-2"
          />
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => {
                if (!draftName.trim()) return;
                addProject({ title: draftName });
                closeQuickAdd();
              }}
              className="rounded-xl bg-violet-600 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-700"
            >
              Create project
            </button>
            <button
              type="button"
              onClick={closeQuickAdd}
              className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-violet-800 ring-1 ring-violet-200 hover:bg-violet-50"
            >
              Cancel
            </button>
          </div>
        </motion.div>
      ) : null}

      <motion.div
        variants={projectPageAnimation}
        className="grid grid-cols-1 gap-5 xl:grid-cols-2"
      >
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            projectTasks={tasks.filter((t) => t.project === project.title)}
          />
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
}
