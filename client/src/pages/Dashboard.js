// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import ThemeToggle from "../components/ThemeToggle"; // Make sure this exists
// import Navbar from "../components/Navbar";

// const Dashboard = () => {
//   const navigate = useNavigate();
//   const [jobs, setJobs] = useState([]);
//   const [form, setForm] = useState({
//     title: "",
//     company: "",
//     status: "Pending",
//   });

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       alert("You must login first!");
//       navigate("/login");
//     } else {
//       fetchJobs();
//     }
//   }, []);

//   const fetchJobs = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/jobs");
//       setJobs(res.data);
//     } catch (err) {
//       console.error("Failed to fetch jobs", err);
//     }
//   };

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleAddJob = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post("http://localhost:5000/api/jobs", form);
//       setForm({ title: "", company: "", status: "Pending" });
//       fetchJobs();
//     } catch (err) {
//       alert("Failed to add job");
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="min-h-screen bg-gray-100 dark:bg-gray-900 px-4 py-8 text-black dark:text-white">
//         <ThemeToggle />

//         <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg w-full">
//           <h1 className="text-4xl font-extrabold text-center mb-10 text-blue-600 dark:text-blue-400 drop-shadow-sm">
//             📋 Job Tracker Dashboard
//           </h1>

//           {/* Job Form */}
//           <form
//             onSubmit={handleAddJob}
//             className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg mb-10 space-y-4 transition"
//           >
//             <h2 className="text-2xl font-semibold mb-4">➕ Add New Job</h2>

//             <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
//               <input
//                 name="title"
//                 placeholder="Job Title"
//                 value={form.title}
//                 onChange={handleChange}
//                 required
//                 className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
//               />
//               <input
//                 name="company"
//                 placeholder="Company"
//                 value={form.company}
//                 onChange={handleChange}
//                 required
//                 className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
//               />
//             </div>

//             <select
//               name="status"
//               value={form.status}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
//             >
//               <option value="Pending">Pending</option>
//               <option value="Interview">Interview</option>
//               <option value="Rejected">Rejected</option>
//             </select>

//             <button
//               type="submit"
//               className="w-full bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700 transition transform hover:scale-[1.01]"
//             >
//               Add Job
//             </button>
//           </form>

//           {/* Job List */}
//           <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-200">
//             🗂️ Your Job Applications
//           </h2>

//           {jobs.length === 0 ? (
//             <p className="text-gray-500 dark:text-gray-400">
//               No jobs added yet.
//             </p>
//           ) : (
//             <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4">
//               {jobs.map((job) => (
//                 <div
//                   key={job._id}
//                   className="bg-white dark:bg-gray-800 border dark:border-gray-600 rounded-lg p-5 shadow hover:shadow-md transition transform hover:scale-[1.01]"
//                 >
//                   <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-2">
//                     {job.title}
//                   </h3>
//                   <p className="text-md mb-1">
//                     <span className="font-medium text-gray-600 dark:text-gray-400">
//                       🏢 Company:
//                     </span>{" "}
//                     {job.company}
//                   </p>
//                   <p className="text-md">
//                     <span className="font-medium text-gray-600 dark:text-gray-400">
//                       📍 Status:
//                     </span>{" "}
//                     <span
//                       className={`inline-block px-2 py-1 rounded-full text-sm font-bold ${
//                         job.status === "Interview"
//                           ? "bg-green-100 text-green-700 dark:bg-green-700 dark:text-green-100"
//                           : job.status === "Rejected"
//                           ? "bg-red-100 text-red-700 dark:bg-red-700 dark:text-red-100"
//                           : "bg-yellow-100 text-yellow-700 dark:bg-yellow-600 dark:text-yellow-100"
//                       }`}
//                     >
//                       {job.status}
//                     </span>
//                   </p>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Dashboard;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [form, setForm] = useState({
    title: "",
    company: "",
    status: "Pending",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must login first!");
      navigate("/login");
    } else {
      fetchJobs();
    }
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/jobs");
      setJobs(res.data);
    } catch (err) {
      console.error("Failed to fetch jobs", err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddJob = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/jobs", form);
      setForm({ title: "", company: "", status: "Pending" });
      fetchJobs();
    } catch (err) {
      alert("Failed to add job");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white transition-all">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold mb-6 text-blue-600 dark:text-blue-400 text-center">
          Job Tracker Dashboard
        </h1>

        {/* Form to add a job */}
        <form
          onSubmit={handleAddJob}
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-10"
        >
          <h2 className="text-2xl font-semibold mb-4">➕ Add New Job</h2>
          <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
            <input
              type="text"
              name="title"
              placeholder="Job Title"
              value={form.title}
              onChange={handleChange}
              required
              className="flex-1 px-4 py-2 border rounded-md bg-white dark:bg-gray-700 text-black dark:text-white"
            />
            <input
              type="text"
              name="company"
              placeholder="Company"
              value={form.company}
              onChange={handleChange}
              required
              className="flex-1 px-4 py-2 border rounded-md bg-white dark:bg-gray-700 text-black dark:text-white"
            />
          </div>

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full mt-4 px-4 py-2 border rounded-md bg-white dark:bg-gray-700 text-black dark:text-white"
          >
            <option value="Pending">Pending</option>
            <option value="Interview">Interview</option>
            <option value="Rejected">Rejected</option>
          </select>

          <button
            type="submit"
            className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Add Job
          </button>
        </form>

        {/* Display list of jobs */}
        <h2 className="text-2xl font-semibold mb-6 text-center">
        Your Job Applications
        </h2>

        {jobs.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">
            No jobs added yet. Start by adding one above.
          </p>
        ) : (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="bg-white dark:bg-gray-800 border dark:border-gray-600 rounded-lg p-5 shadow hover:shadow-lg transition transform hover:scale-[1.02]"
              >
                <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  {job.title}
                </h3>
                <p className="mb-1">
                  <span className="font-semibold text-gray-600 dark:text-gray-300">
                    🏢 Company:
                  </span>{" "}
                  {job.company}
                </p>
                <p>
                  <span className="font-semibold text-gray-600 dark:text-gray-300">
                    📍 Status:
                  </span>{" "}
                  <span
                    className={`inline-block px-2 py-1 text-sm font-bold rounded-full ${
                      job.status === "Interview"
                        ? "bg-green-200 text-green-800 dark:bg-green-600 dark:text-white"
                        : job.status === "Rejected"
                        ? "bg-red-200 text-red-800 dark:bg-red-600 dark:text-white"
                        : "bg-yellow-200 text-yellow-800 dark:bg-yellow-600 dark:text-white"
                    }`}
                  >
                    {job.status}
                  </span>
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
