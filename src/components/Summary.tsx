import { motion } from "motion/react";

export default function Summary({ totalTasks, completed, pending }) {
  const completion =
    totalTasks > 0 ? Math.round((completed / totalTasks) * 100) : 0;

  const stats = [
    {
      value: totalTasks,
      label: "Total Tasks",
      color: "text-indigo-500",
    },
    {
      value: completed,
      label: "Completed",
      color: "text-green-500",
    },
    {
      value: pending,
      label: "Pending",
      color: "text-amber-400",
    },
    {
      value: `${completion}%`,
      label: "Completion",
      color: "text-indigo-600",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.15 }}
      className=" p-6"
    >
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-8 py-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-4 divide-x divide-gray-100">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center px-6">
              <span className={`text-4xl font-bold ${stat.color}`}>
                {stat.value}
              </span>
              <span className="text-gray-500 text-sm mt-2">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="mt-6">
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div
              className="bg-indigo-500 h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${completion}%` }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
