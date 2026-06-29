/**
 * Task list with a ⋮ menu per row (Edit opens the modal, Delete removes the task).
 * The row menu is portaled to `document.body` so it is not clipped by the table’s horizontal scroll.
 */
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";

const MENU_WIDTH_PX = 160;

function computeMenuPos(triggerEl) {
  const r = triggerEl.getBoundingClientRect();
  const left = Math.min(
    Math.max(8, r.right - MENU_WIDTH_PX),
    window.innerWidth - MENU_WIDTH_PX - 8,
  );
  return { top: r.bottom + 4, left };
}

const TaskTable = ({
  tasks,
  onEditTask,
  onDeleteTask,
  emptyMessage,
}) => {
  const [openMenuId, setOpenMenuId] = useState(null);
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0 });

  const updateMenuPosition = (taskId) => {
    const trigger = document.querySelector(
      `[data-task-menu-trigger="${taskId}"]`,
    );
    if (!trigger) return;
    setMenuPos(computeMenuPos(trigger));
  };

  useEffect(() => {
    if (openMenuId == null) return;
    const onScrollOrResize = () => updateMenuPosition(openMenuId);
    window.addEventListener("resize", onScrollOrResize);
    document.addEventListener("scroll", onScrollOrResize, true);
    return () => {
      window.removeEventListener("resize", onScrollOrResize);
      document.removeEventListener("scroll", onScrollOrResize, true);
    };
  }, [openMenuId]);

  useEffect(() => {
    if (openMenuId == null) return;
    const handleMouseDown = (event) => {
      const inTrigger = event.target.closest(
        `[data-task-menu-trigger="${openMenuId}"]`,
      );
      const inDropdown = event.target.closest("[data-task-menu-dropdown]");
      if (!inTrigger && !inDropdown) setOpenMenuId(null);
    };
    document.addEventListener("mousedown", handleMouseDown);
    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, [openMenuId]);

  if (!tasks.length) {
    return (
      <p className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 py-10 text-center text-sm text-gray-500">
        {emptyMessage ??
          "No tasks yet. Use Add task in the sidebar to create your first one."}
      </p>
    );
  }

  const menuPortal =
    openMenuId != null ? (
      <div
        data-task-menu-dropdown
        className="fixed z-[180] w-40 overflow-hidden rounded-xl border border-gray-200 bg-white py-1 shadow-lg"
        style={{ top: menuPos.top, left: menuPos.left }}
        role="menu"
      >
        <button
          type="button"
          role="menuitem"
          onClick={() => {
            const task = tasks.find((t) => t.id === openMenuId);
            if (task) onEditTask(task);
            setOpenMenuId(null);
          }}
          className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-gray-700 hover:bg-violet-50"
        >
          <Pencil size={16} className="text-violet-600" />
          Edit
        </button>
        <button
          type="button"
          role="menuitem"
          onClick={() => {
            onDeleteTask(openMenuId);
            setOpenMenuId(null);
          }}
          className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
        >
          <Trash2 size={16} />
          Delete
        </button>
      </div>
    ) : null;

  return (
    <>
      {menuPortal ? createPortal(menuPortal, document.body) : null}
      <div className="w-full overflow-x-auto rounded-2xl border border-gray-100 bg-white shadow-sm">
      <table className="w-full min-w-[44rem] text-left text-sm">
        <thead className="border-b border-gray-100 bg-gray-50 text-xs font-semibold uppercase tracking-wide text-gray-500">
          <tr>
            <th className="px-4 py-3 sm:px-5">Task</th>
            <th className="px-4 py-3 sm:px-5">Project</th>
            <th className="px-4 py-3 sm:px-5">Status</th>
            <th className="px-4 py-3 sm:px-5">Priority</th>
            <th className="px-4 py-3 sm:px-5">Due</th>
            <th className="px-4 py-3 sm:px-5">Duration</th>
            <th className="w-14 px-2 py-3 text-right sm:px-3">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {tasks.map((task) => (
            <tr key={task.id} className="transition hover:bg-violet-50/40">
              <td className="px-4 py-3 font-semibold text-gray-900 sm:px-5">
                {task.title}
              </td>
              <td className="px-4 py-3 text-gray-600 sm:px-5">
                {task.project}
              </td>
              <td className="px-4 py-3 sm:px-5">
                <span className="inline-block rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-semibold text-purple-700">
                  {task.status}
                </span>
              </td>
              <td className="px-4 py-3 sm:px-5">
                <span className="inline-block rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-semibold text-gray-700">
                  {task.priority}
                </span>
              </td>
              <td className="px-4 py-3 text-gray-600 sm:px-5">{task.date}</td>
              <td className="px-4 py-3 text-gray-500 sm:px-5">
                {task.deadlineDuration ? (
                  <span className="text-xs font-medium text-violet-700">
                    {task.deadlineDuration}
                  </span>
                ) : (
                  <span className="text-xs text-gray-400">—</span>
                )}
              </td>
              <td className="px-2 py-2 text-right sm:px-3">
                <div className="inline-flex justify-end">
                  <button
                    type="button"
                    data-task-menu-trigger={task.id}
                    onClick={(e) => {
                      if (openMenuId === task.id) {
                        setOpenMenuId(null);
                        return;
                      }
                      setMenuPos(computeMenuPos(e.currentTarget));
                      setOpenMenuId(task.id);
                    }}
                    className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                    aria-label="Task options"
                    aria-expanded={openMenuId === task.id}
                    aria-haspopup="menu"
                  >
                    <MoreVertical size={20} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
};

export default TaskTable;
