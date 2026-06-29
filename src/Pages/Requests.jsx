import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Clock, Trash2, X } from "lucide-react";

import { requestItemAnimation, requestPageAnimation } from "../animations/requestAnimations";
import { useAppData } from "../Context/useAppData";

export default function Requests() {
  const { addRequest, deleteRequest, requests, updateRequest } = useAppData();
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [task, setTask] = useState("");

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={requestPageAnimation}
      className="min-h-full bg-white py-4 sm:py-6"
    >
      <motion.div variants={requestItemAnimation} className="mb-6 sm:mb-8">
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Requests</h1>
        <p className="mt-2 text-sm text-gray-500">
          Add a request, then approve or reject it. Everything saves in this browser.
        </p>
      </motion.div>

      <motion.section
        variants={requestItemAnimation}
        className="mb-8 rounded-2xl border border-gray-100 bg-gray-50 p-4 sm:p-6"
      >
        <h2 className="text-lg font-bold text-gray-900">New request</h2>
        <form
          className="mt-4 grid max-w-xl gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            addRequest({ name, title, task });
            setName("");
            setTitle("");
            setTask("");
          }}
        >
          <div>
            <label className="text-xs font-semibold text-gray-600" htmlFor="req-name">
              Person name
            </label>
            <input
              id="req-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Who is asking?"
              className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none ring-violet-400 focus:ring-2"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-600" htmlFor="req-title">
              Request title
            </label>
            <input
              id="req-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="Short title"
              className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none ring-violet-400 focus:ring-2"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-600" htmlFor="req-task">
              Details
            </label>
            <textarea
              id="req-task"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              rows={3}
              placeholder="What do they need?"
              className="mt-1 w-full resize-y rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none ring-violet-400 focus:ring-2"
            />
          </div>
          <button
            type="submit"
            className="w-fit rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-violet-700"
          >
            Add request
          </button>
        </form>
      </motion.section>

      <motion.section variants={requestPageAnimation} className="grid grid-cols-1 gap-4 sm:gap-5">
        {requests.length === 0 ? (
          <motion.p
            variants={requestItemAnimation}
            className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 py-12 text-center text-sm text-gray-500"
          >
            No requests yet. Use the form above.
          </motion.p>
        ) : (
          requests.map((request) => (
            <motion.article
              key={request.id}
              variants={requestItemAnimation}
              className="rounded-3xl border border-gray-100 bg-gray-50 p-4 sm:p-6"
            >
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div className="min-w-0">
                  <div className="mb-3 flex items-center gap-2">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple-100 text-sm font-bold text-purple-600">
                      {request.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{request.name}</p>
                      <p className="text-xs text-gray-500">{request.time}</p>
                    </div>
                  </div>
                  <h2 className="text-lg font-bold text-gray-900">{request.title}</h2>
                  <p className="mt-1 text-sm text-gray-600">{request.task}</p>
                </div>

                <div className="flex flex-wrap items-center gap-2 lg:shrink-0">
                  <span className="inline-flex items-center gap-1 rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700">
                    <Clock size={14} />
                    {request.status}
                  </span>
                  {request.status === "Pending" ? (
                    <>
                      <button
                        type="button"
                        onClick={() => updateRequest(request.id, { status: "Approved" })}
                        className="inline-flex items-center gap-1 rounded-xl bg-green-100 px-4 py-2 text-sm font-semibold text-green-700 hover:bg-green-200"
                      >
                        <Check size={16} />
                        Approve
                      </button>
                      <button
                        type="button"
                        onClick={() => updateRequest(request.id, { status: "Rejected" })}
                        className="inline-flex items-center gap-1 rounded-xl bg-red-100 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-200"
                      >
                        <X size={16} />
                        Reject
                      </button>
                    </>
                  ) : null}
                  <button
                    type="button"
                    onClick={() => deleteRequest(request.id)}
                    className="inline-flex items-center gap-1 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                  >
                    <Trash2 size={16} />
                    Remove
                  </button>
                </div>
              </div>
            </motion.article>
          ))
        )}
      </motion.section>
    </motion.div>
  );
}
