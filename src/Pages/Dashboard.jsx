import { motion } from "framer-motion";
import {
  containerAnimation,
  cardAnimation,
  progressAnimation,
} from "../animations/dashboardAnimations";

import {
  LayoutDashboard,
  CheckCircle,
  Clock,
  AlertCircle,
  TrendingUp,
  CalendarDays,
  Users,
} from "lucide-react";

const Dashboard = () => {
  const stats = [
    { title: "Total Tasks", value: "24", icon: LayoutDashboard },
    { title: "Completed", value: "12", icon: CheckCircle },
    { title: "In Progress", value: "8", icon: Clock },
    { title: "Pending Requests", value: "4", icon: AlertCircle },
  ];

  const todayTasks = [
    { title: "Design dashboard UI", status: "High" },
    { title: "Fix sidebar active state", status: "Medium" },
    { title: "Review task requests", status: "Low" },
    { title: "Send weekly report", status: "High" },
  ];

  const deadlines = [
    { title: "Beling Mobile App", date: "Tomorrow" },
    { title: "Landingpage Beling", date: "3 days left" },
    { title: "Beling Admin CMS", date: "Friday" },
  ];

  const teamMembers = ["Mohamed", "Ahmed", "Sara"];

  const activities = [
    "Mohamed added a new task",
    "Report was submitted",
    "Mobile App deadline updated",
    "New request received",
  ];

  const projects = [
    { name: "Beling Mobile App", tasks: "12 tasks", progress: "80%" },
    { name: "Landingpage Beling", tasks: "8 tasks", progress: "55%" },
    { name: "Beling Admin CMS", tasks: "6 tasks", progress: "35%" },
  ];

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={containerAnimation}
      className="min-h-screen bg-white px-4 py-8 lg:px-4"
    >
      {/* Header */}
      <motion.div variants={cardAnimation} className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 lg:text-3xl">
          Good morning, Mohamed 👋
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Here’s what’s happening with your tasks today.
        </p>
      </motion.div>

      {/* Stats */}
      <motion.div
        variants={containerAnimation}
        className="mb-6 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4"
      >
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={item.title}
              variants={cardAnimation}
              className="flex items-center gap-4 rounded-3xl border border-gray-100 bg-gray-50 p-5"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-100 text-purple-600">
                <Icon size={22} />
              </div>

              <div>
                <p className="text-sm text-gray-500">{item.title}</p>

                <h2 className="mt-1 text-2xl font-bold text-gray-900">
                  {item.value}
                </h2>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Main Layout */}
      <motion.div
        variants={containerAnimation}
        className="grid grid-cols-1 gap-5 xl:grid-cols-12"
      >
        {/* Left Column */}
        <div className="space-y-5 xl:col-span-8">
          {/* Task Progress */}
          <motion.section
            variants={cardAnimation}
            className="rounded-3xl border border-gray-100 bg-gray-50 p-6"
          >
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900">Task Progress</h3>

              <TrendingUp className="text-purple-600" size={20} />
            </div>

            {[
              ["Completed", "50%"],
              ["In Progress", "33%"],
              ["Pending", "17%"],
            ].map(([label, value]) => (
              <div key={label} className="mb-5 last:mb-0">
                <div className="mb-2 flex justify-between text-sm">
                  <span className="text-gray-600">{label}</span>

                  <strong className="text-gray-900">{value}</strong>
                </div>

                <div className="h-2.5 overflow-hidden rounded-full bg-gray-200">
                  <motion.div
                    initial={progressAnimation.initial}
                    animate={progressAnimation.animate(value)}
                    className="h-2.5 rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-500"
                  />
                </div>
              </div>
            ))}
          </motion.section>

          {/* Today's Tasks */}
          <motion.section
            variants={cardAnimation}
            className="rounded-3xl border border-gray-100 bg-gray-50 p-6"
          >
            <h3 className="mb-6 text-lg font-bold text-gray-900">
              Today’s Tasks
            </h3>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {todayTasks.map((task) => (
                <motion.div
                  key={task.title}
                  variants={cardAnimation}
                  className="rounded-2xl bg-white p-4"
                >
                  <p className="font-semibold text-gray-800">{task.title}</p>

                  <span className="mt-3 inline-block rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-600">
                    {task.status}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Project Progress */}
          <motion.section
            variants={cardAnimation}
            className="rounded-3xl border border-gray-100 bg-gray-50 p-6"
          >
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900">
                Project Progress
              </h3>

              <span className="text-sm font-medium text-purple-600">
                View all
              </span>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              {projects.map((project) => (
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

                  <div className="h-2.5 overflow-hidden rounded-full bg-gray-200">
                    <motion.div
                      initial={progressAnimation.initial}
                      animate={progressAnimation.animate(project.progress)}
                      className="h-2.5 rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-500"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </div>

        {/* Right Column */}
        <div className="space-y-5 xl:col-span-4">
          {/* Upcoming Deadlines */}
          <motion.section
            variants={cardAnimation}
            className="rounded-3xl border border-gray-100 bg-gray-50 p-6"
          >
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900">
                Upcoming Deadlines
              </h3>

              <CalendarDays className="text-purple-600" size={20} />
            </div>

            {deadlines.map((item) => (
              <div
                key={item.title}
                className="flex items-center justify-between border-b border-gray-200 py-4 first:pt-0 last:border-b-0 last:pb-0"
              >
                <p className="font-semibold text-gray-700">{item.title}</p>

                <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-600">
                  {item.date}
                </span>
              </div>
            ))}
          </motion.section>

          {/* Team Overview */}
          <motion.section
            variants={cardAnimation}
            className="rounded-3xl border border-gray-100 bg-gray-50 p-6"
          >
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900">Team Overview</h3>

              <Users className="text-purple-600" size={20} />
            </div>

            <div className="space-y-4">
              {teamMembers.map((name) => (
                <div key={name} className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 font-bold text-purple-600">
                    {name.charAt(0)}
                  </div>

                  <div>
                    <p className="font-semibold text-gray-800">{name}</p>

                    <p className="text-xs text-gray-500">Task Member</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Recent Activity */}
          <motion.section
            variants={cardAnimation}
            className="rounded-3xl border border-gray-100 bg-gray-50 p-6"
          >
            <h3 className="mb-6 text-lg font-bold text-gray-900">
              Recent Activity
            </h3>

            <div className="space-y-4">
              {activities.map((activity) => (
                <div key={activity} className="flex items-center gap-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-purple-500" />

                  <p className="text-sm text-gray-600">{activity}</p>
                </div>
              ))}
            </div>
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
};

export default Dashboard;
