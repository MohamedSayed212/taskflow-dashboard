import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  AlertCircle,
  CalendarDays,
  CheckCircle,
  Clock,
  LayoutDashboard,
  TrendingUp,
  Users,
} from "lucide-react";

import {
  cardAnimation,
  containerAnimation,
  progressAnimation,
} from "../animations/dashboardAnimations";
import StatsCard from "../Components/StatsCard";
import { useAppData } from "../Context/useAppData";
import { getTaskCounts } from "../lib/taskCounts";

function AnimatedProgressBar({ width }) {
  return (
    <div className="h-2.5 overflow-hidden rounded-full bg-gray-200">
      <motion.div
        initial={progressAnimation.initial}
        animate={progressAnimation.animate(width)}
        className="h-2.5 rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-500"
      />
    </div>
  );
}

export default function Dashboard() {
  const { currentUser, projects, requests, tasks } = useAppData();

  const greetingName = currentUser.name?.trim()?.split(/\s+/)[0] || "there";

  const dashboardStats = useMemo(() => {
    const c = getTaskCounts(tasks);
    const pendingReq = requests.filter((r) => r.status === "Pending").length;
    return [
      { title: "Total Tasks", value: String(c.total), Icon: LayoutDashboard },
      { title: "Completed", value: String(c.completed), Icon: CheckCircle },
      { title: "In Progress", value: String(c.inProgress), Icon: Clock },
      {
        title: "Pending Requests",
        value: String(pendingReq),
        Icon: AlertCircle,
      },
    ];
  }, [tasks, requests]);

  const dashboardProgress = useMemo(() => {
    const total = tasks.length;
    if (!total) {
      return [
        ["Completed", "0%"],
        ["In Progress", "0%"],
        ["Pending", "0%"],
      ];
    }
    const c = getTaskCounts(tasks);
    const pct = (n) => `${Math.round((n / total) * 100)}%`;
    return [
      ["Completed", pct(c.completed)],
      ["In Progress", pct(c.inProgress)],
      ["Pending", pct(c.pending)],
    ];
  }, [tasks]);

  const todayPreview = useMemo(() => tasks.slice(0, 4), [tasks]);

  const projectCards = useMemo(
    () =>
      projects.slice(0, 6).map((p) => ({
        name: p.title,
        tasks: `${p.tasks} tasks`,
        progress: p.progress,
      })),
    [projects],
  );

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={containerAnimation}
      className="min-h-full bg-white py-4 sm:py-6"
    >
      <motion.div variants={cardAnimation} className="mb-8">
        <h1 className="text-xl font-bold text-gray-900 sm:text-2xl lg:text-3xl">
          Good morning, {greetingName}
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Here’s what’s happening with your tasks today.
        </p>
      </motion.div>

      <motion.div
        variants={containerAnimation}
        className="mb-6 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4"
      >
        {dashboardStats.map((item) => (
          <motion.div key={item.title} variants={cardAnimation}>
            <StatsCard title={item.title} value={item.value} Icon={item.Icon} />
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        variants={containerAnimation}
        className="grid grid-cols-1 gap-5 xl:grid-cols-12"
      >
        <div className="space-y-5 xl:col-span-8">
          <motion.section
            variants={cardAnimation}
            className="rounded-3xl border border-gray-100 bg-gray-50 p-4 sm:p-6"
          >
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900">Task Progress</h3>
              <TrendingUp className="text-purple-600" size={20} />
            </div>

            {!tasks.length ? (
              <p className="text-sm text-gray-500">
                Add tasks from the sidebar to see progress bars here.
              </p>
            ) : (
              dashboardProgress.map(([label, value]) => (
                <div key={label} className="mb-5 last:mb-0">
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="text-gray-600">{label}</span>
                    <strong className="text-gray-900">{value}</strong>
                  </div>
                  <AnimatedProgressBar width={value} />
                </div>
              ))
            )}
          </motion.section>

          <motion.section
            variants={cardAnimation}
            className="rounded-3xl border border-gray-100 bg-gray-50 p-4 sm:p-6"
          >
            <h3 className="mb-6 text-lg font-bold text-gray-900">
              Today’s Tasks
            </h3>

            {!todayPreview.length ? (
              <p className="text-sm text-gray-500">No tasks yet.</p>
            ) : (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {todayPreview.map((task) => (
                  <motion.div
                    key={task.id}
                    variants={cardAnimation}
                    className="rounded-2xl bg-white p-4"
                  >
                    <p className="font-semibold text-gray-800">{task.title}</p>
                    <span className="mt-3 inline-block rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-600">
                      {task.priority || task.status}
                    </span>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.section>

          <motion.section
            variants={cardAnimation}
            className="rounded-3xl border border-gray-100 bg-gray-50 p-4 sm:p-6"
          >
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900">
                Project Progress
              </h3>
              <span className="text-sm font-medium text-purple-600">
                View all
              </span>
            </div>

            {!projectCards.length ? (
              <p className="text-sm text-gray-500">
                Add projects on the Projects page to see them here.
              </p>
            ) : (
              <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                {projectCards.map((project) => (
                  <motion.div
                    key={project.name}
                    variants={cardAnimation}
                    className="rounded-2xl bg-white p-5"
                  >
                    <div className="mb-4 flex items-center justify-between gap-4">
                      <div>
                        <h4 className="font-bold text-gray-900">
                          {project.name}
                        </h4>
                        <p className="mt-1 text-sm text-gray-500">
                          {project.tasks}
                        </p>
                      </div>
                      <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-600">
                        {project.progress}
                      </span>
                    </div>
                    <AnimatedProgressBar width={project.progress} />
                  </motion.div>
                ))}
              </div>
            )}
          </motion.section>
        </div>

        <div className="space-y-5 xl:col-span-4">
          <motion.section
            variants={cardAnimation}
            className="rounded-3xl border border-gray-100 bg-gray-50 p-4 sm:p-6"
          >
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900">
                Upcoming Deadlines
              </h3>
              <CalendarDays className="text-purple-600" size={20} />
            </div>
            <p className="text-sm text-gray-500">
              Due dates from your tasks will appear here as you add them.
            </p>
          </motion.section>

          <motion.section
            variants={cardAnimation}
            className="rounded-3xl border border-gray-100 bg-gray-50 p-4 sm:p-6"
          >
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900">Team Overview</h3>
              <Users className="text-purple-600" size={20} />
            </div>
            <p className="text-sm text-gray-500">
              Team members can be linked to tasks in a future update.
            </p>
          </motion.section>

          <motion.section
            variants={cardAnimation}
            className="rounded-3xl border border-gray-100 bg-gray-50 p-4 sm:p-6"
          >
            <h3 className="mb-6 text-lg font-bold text-gray-900">
              Recent Activity
            </h3>
            <p className="text-sm text-gray-500">
              Activity feed will show here when events are logged.
            </p>
          </motion.section>
        </div>
      </motion.div>

      <motion.p
        variants={cardAnimation}
        className="mt-6 text-center text-xs text-gray-400"
      >
        © 2026 TaskFlow Dashboard
      </motion.p>
    </motion.div>
  );
}
