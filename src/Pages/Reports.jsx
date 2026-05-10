import { motion } from "framer-motion";

import {
  FileText,
  Download,
  TrendingUp,
  Clock,
  CheckCircle,
} from "lucide-react";

import {
  reportPageAnimation,
  reportItemAnimation,
} from "../animations/reportAnimations";

const Reports = () => {
  const reports = [
    {
      title: "Weekly Task Report",
      date: "May 9, 2026",
      type: "Weekly",
    },
    {
      title: "Project Progress Report",
      date: "May 7, 2026",
      type: "Project",
    },
    {
      title: "Team Performance Report",
      date: "May 1, 2026",
      type: "Performance",
    },
  ];

  const stats = [
    {
      title: "Completed Tasks",
      value: "12",
      icon: CheckCircle,
    },
    {
      title: "Active Tasks",
      value: "8",
      icon: Clock,
    },
    {
      title: "Progress Rate",
      value: "76%",
      icon: TrendingUp,
    },
  ];

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={reportPageAnimation}
      className="min-h-screen bg-white px-4 py-8 lg:px-4"
    >
      <motion.div variants={reportItemAnimation} className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 lg:text-3xl">
          Reports
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          View summaries and project reports.
        </p>
      </motion.div>

      <motion.div
        variants={reportPageAnimation}
        className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-3"
      >
        {stats.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={index}
              variants={reportItemAnimation}
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

      <motion.div
        variants={reportItemAnimation}
        className="rounded-3xl border border-gray-100 bg-gray-50 p-6"
      >
        <h3 className="mb-6 text-lg font-bold text-gray-900">Recent Reports</h3>

        <motion.div variants={reportPageAnimation} className="space-y-4">
          {reports.map((report, index) => (
            <motion.div
              key={index}
              variants={reportItemAnimation}
              className="flex flex-col gap-4 rounded-2xl bg-white p-5 lg:flex-row lg:items-center lg:justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-100 text-purple-600">
                  <FileText size={22} />
                </div>

                <div>
                  <h3 className="font-bold text-gray-900">{report.title}</h3>

                  <p className="mt-1 text-sm text-gray-500">{report.date}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-600">
                  {report.type}
                </span>

                <button className="flex items-center gap-2 rounded-xl bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-600 transition-colors hover:bg-gray-200">
                  <Download size={16} />
                  Download
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Reports;
