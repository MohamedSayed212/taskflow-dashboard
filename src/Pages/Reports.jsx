import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Clock, FileText, Trash2, TrendingUp } from "lucide-react";

import { reportItemAnimation, reportPageAnimation } from "../animations/reportAnimations";
import StatsCard from "../Components/StatsCard";
import { useAppData } from "../Context/useAppData";
import { getTaskCounts } from "../lib/taskCounts";

const REPORT_TYPES = ["Summary", "Export", "Weekly"];

export default function Reports() {
  const { addReport, deleteReport, reports, tasks } = useAppData();
  const [title, setTitle] = useState("");
  const [type, setType] = useState(REPORT_TYPES[0]);

  const stats = useMemo(() => {
    const c = getTaskCounts(tasks);
    return [
      { title: "Total tasks", value: String(c.total), Icon: TrendingUp },
      { title: "Completed", value: String(c.completed), Icon: CheckCircle },
      { title: "In progress", value: String(c.inProgress), Icon: Clock },
    ];
  }, [tasks]);

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={reportPageAnimation}
      className="min-h-full bg-white py-4 sm:py-6"
    >
      <motion.div variants={reportItemAnimation} className="mb-6 sm:mb-8">
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Reports</h1>
        <p className="mt-2 text-sm text-gray-500">
          Numbers come from your saved tasks. Add saved report rows below.
        </p>
      </motion.div>

      <motion.div
        variants={reportPageAnimation}
        className="mb-6 grid grid-cols-1 gap-4 sm:mb-8 sm:gap-5 md:grid-cols-3"
      >
        {stats.map((s) => (
          <motion.div key={s.title} variants={reportItemAnimation}>
            <StatsCard title={s.title} value={s.value} Icon={s.Icon} />
          </motion.div>
        ))}
      </motion.div>

      <motion.section
        variants={reportItemAnimation}
        className="mb-8 rounded-2xl border border-gray-100 bg-gray-50 p-4 sm:p-6"
      >
        <h2 className="text-lg font-bold text-gray-900">Add a report</h2>
        <p className="mt-1 text-sm text-gray-500">
          This saves a row in your browser (same localStorage as tasks).
        </p>
        <form
          className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end"
          onSubmit={(e) => {
            e.preventDefault();
            addReport({ title, type });
            setTitle("");
            setType(REPORT_TYPES[0]);
          }}
        >
          <div className="min-w-0 flex-1 sm:max-w-xs">
            <label className="text-xs font-semibold text-gray-600" htmlFor="report-title">
              Title
            </label>
            <input
              id="report-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="e.g. Sprint wrap-up"
              className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none ring-violet-400 focus:ring-2"
            />
          </div>
          <div className="w-full sm:w-44">
            <label className="text-xs font-semibold text-gray-600" htmlFor="report-type">
              Type
            </label>
            <select
              id="report-type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="mt-1 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm outline-none ring-violet-400 focus:ring-2"
            >
              {REPORT_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-violet-700"
          >
            Save report
          </button>
        </form>
      </motion.section>

      <motion.section
        variants={reportItemAnimation}
        className="rounded-3xl border border-gray-100 bg-gray-50 p-4 sm:p-6"
      >
        <h2 className="text-lg font-bold text-gray-900">Saved reports</h2>

        {reports.length === 0 ? (
          <p className="mt-4 py-6 text-center text-sm text-gray-500">
            None yet. Use the form above to add one.
          </p>
        ) : (
          <motion.ul variants={reportPageAnimation} className="mt-4 space-y-3">
            {reports.map((report) => (
              <motion.li
                key={report.id}
                variants={reportItemAnimation}
                className="flex flex-col gap-3 rounded-2xl bg-white p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
                    <FileText size={20} />
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-gray-900">{report.title}</p>
                    <p className="text-sm text-gray-500">{report.date}</p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700">
                    {report.type}
                  </span>
                  <button
                    type="button"
                    onClick={() => deleteReport(report.id)}
                    className="inline-flex items-center gap-1 rounded-xl border border-red-100 bg-red-50 px-3 py-2 text-sm font-semibold text-red-700 hover:bg-red-100"
                  >
                    <Trash2 size={16} />
                    Remove
                  </button>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </motion.section>
    </motion.div>
  );
}
