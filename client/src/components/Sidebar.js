import React from "react";

const Sidebar = ({ jobs }) => {
  const pending = jobs.filter((job) => job.status === "Pending").length;
  const interview = jobs.filter((job) => job.status === "Interview").length;
  const rejected = jobs.filter((job) => job.status === "Rejected").length;
  const total = jobs.length;

  return (
    <div className="w-[220px] h-screen sticky top-0 bg-white dark:bg-gray-900 text-black dark:text-white p-4 shadow-md">
      <div className="h-full flex flex-col justify-center items-start space-y-6">
        <h2 className="text-xl font-bold">📊 Job Summary</h2>
        <ul className="space-y-2 w-full">
          <li className="flex justify-between font-semibold">
            <span>Total Jobs</span>
            <span>{total}</span>
          </li>
          <li className="flex justify-between text-yellow-500">
            <span>🟡 Pending</span>
            <span>{pending}</span>
          </li>
          <li className="flex justify-between text-blue-500">
            <span>🔵 Interview</span>
            <span>{interview}</span>
          </li>
          <li className="flex justify-between text-red-500">
            <span>🔴 Rejected</span>
            <span>{rejected}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
