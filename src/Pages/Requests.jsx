import { motion } from "framer-motion";
import { Check, X, Clock } from "lucide-react";

import {
  requestPageAnimation,
  requestItemAnimation,
} from "../animations/requestAnimations";

const Requests = () => {
  const requests = [
    {
      name: "Mohamed Sayed",
      title: "Request to extend deadline",
      task: "Beling Mobile App",
      time: "2 hours ago",
      status: "Pending",
    },
    {
      name: "Ahmed Ali",
      title: "Request new task approval",
      task: "Landingpage Beling",
      time: "Yesterday",
      status: "Pending",
    },
    {
      name: "Sara Mohamed",
      title: "Request report review",
      task: "Beling Admin CMS",
      time: "3 days ago",
      status: "Approved",
    },
  ];

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={requestPageAnimation}
      className="min-h-screen bg-white px-4 py-8 lg:px-4"
    >
      <motion.div variants={requestItemAnimation} className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 lg:text-3xl">
          Requests
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Review task requests and approvals.
        </p>
      </motion.div>

      <motion.div
        variants={requestPageAnimation}
        className="grid grid-cols-1 gap-5"
      >
        {requests.map((request, index) => (
          <motion.div
            key={index}
            variants={requestItemAnimation}
            className="rounded-3xl border border-gray-100 bg-gray-50 p-6"
          >
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="mb-3 flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 font-bold text-purple-600">
                    {request.name.charAt(0)}
                  </div>

                  <div>
                    <h3 className="font-bold text-gray-900">{request.name}</h3>

                    <p className="text-xs text-gray-500">{request.time}</p>
                  </div>
                </div>

                <h2 className="text-lg font-bold text-gray-900">
                  {request.title}
                </h2>

                <p className="mt-1 text-sm text-gray-500">{request.task}</p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <span className="flex items-center gap-1 rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-600">
                  <Clock size={14} />
                  {request.status}
                </span>

                <button className="flex items-center gap-1 rounded-xl bg-green-100 px-4 py-2 text-sm font-semibold text-green-600 transition-colors hover:bg-green-200">
                  <Check size={16} />
                  Approve
                </button>

                <button className="flex items-center gap-1 rounded-xl bg-red-100 px-4 py-2 text-sm font-semibold text-red-600 transition-colors hover:bg-red-200">
                  <X size={16} />
                  Reject
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Requests;
