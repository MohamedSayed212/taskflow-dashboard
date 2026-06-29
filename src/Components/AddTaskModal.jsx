import { useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

import { useAppData } from "@/Context/useAppData";
import { useTasksModal } from "@/Context/useTasksModal";

const PRIORITIES = ["High", "Medium", "Low"];
const STATUSES = ["Pending", "In Progress", "Completed"];

function formatDate(dateValue) {
  if (!dateValue) return "No date";

  return new Date(`${dateValue}T12:00:00`).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function AddTaskForm() {
  const { addTask, projects, updateTask } = useAppData();
  const { closeAddTaskModal, editingTask, defaultProject } = useTasksModal();

  const firstProject = projects[0]?.title || "General";

  // If editingTask exists, the form starts with old values.
  const [title, setTitle] = useState(editingTask?.title || "");
  const [project, setProject] = useState(editingTask?.project || defaultProject || firstProject);
  const [status, setStatus] = useState(editingTask?.status || "Pending");
  const [priority, setPriority] = useState(editingTask?.priority || "Medium");
  const [dueDate, setDueDate] = useState(editingTask?.dueIso || "");

  const handleSubmit = (event) => {
    event.preventDefault();

    const taskData = {
      title: title.trim(),
      project,
      status,
      priority,
      dueIso: dueDate,
      date: formatDate(dueDate),
    };

    if (!taskData.title) return;

    if (editingTask) {
      updateTask(editingTask.id, taskData);
    } else {
      addTask(taskData);
    }

    closeAddTaskModal();
  };

  return (
    <div
      className="w-full max-w-md rounded-3xl border border-white/80 bg-white shadow-2xl"
      onClick={(event) => event.stopPropagation()}
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-center justify-between border-b border-slate-100 bg-gradient-to-r from-violet-50 to-cyan-50 px-5 py-4">
        <h2 className="text-lg font-bold text-slate-900">
          {editingTask ? "Edit task" : "Add new task"}
        </h2>

        <button
          type="button"
          onClick={closeAddTaskModal}
          className="rounded-lg p-2 text-slate-500 hover:bg-white/80 hover:text-slate-800"
          aria-label="Close"
        >
          <X size={20} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 p-5">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500">
            Task name
          </label>
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
            placeholder="What needs to be done?"
            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none ring-violet-400 focus:ring-2"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500">
            Project
          </label>
          <select
            value={project}
            onChange={(event) => setProject(event.target.value)}
            className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none ring-violet-400 focus:ring-2"
          >
            {projects.length === 0 ? (
              <option value="General">General</option>
            ) : (
              projects.map((projectItem) => (
                <option key={projectItem.id} value={projectItem.title}>
                  {projectItem.title}
                </option>
              ))
            )}
          </select>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500">
              Status
            </label>
            <select
              value={status}
              onChange={(event) => setStatus(event.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none ring-violet-400 focus:ring-2"
            >
              {STATUSES.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500">
              Priority
            </label>
            <select
              value={priority}
              onChange={(event) => setPriority(event.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none ring-violet-400 focus:ring-2"
            >
              {PRIORITIES.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500">
            Due date
          </label>
          <input
            type="date"
            value={dueDate}
            onChange={(event) => setDueDate(event.target.value)}
            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none ring-violet-400 focus:ring-2"
          />
        </div>

        <div className="flex justify-end gap-3 border-t border-slate-100 pt-4">
          <button
            type="button"
            onClick={closeAddTaskModal}
            className="rounded-xl px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="rounded-xl bg-violet-600 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-700"
          >
            {editingTask ? "Save changes" : "Add task"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default function AddTaskModal() {
  const { addTaskModalOpen, closeAddTaskModal } = useTasksModal();

  if (!addTaskModalOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[220] flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-sm"
      onClick={closeAddTaskModal}
    >
      <AddTaskForm />
    </div>,
    document.body,
  );
}
