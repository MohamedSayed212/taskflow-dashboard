/** Small helpers so pages can show the same numbers without copying logic. */

export function getTaskCounts(tasks) {
  let completed = 0;
  let inProgress = 0;
  let pending = 0;
  for (const t of tasks) {
    if (t.status === "Completed") completed += 1;
    else if (t.status === "In Progress") inProgress += 1;
    else if (t.status === "Pending") pending += 1;
  }
  return {
    total: tasks.length,
    completed,
    inProgress,
    pending,
  };
}
