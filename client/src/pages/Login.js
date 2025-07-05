import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";
import Navbar from "../components/Navbar";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        form
      );
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4 text-black dark:text-white">
        <div className="absolute top-4 right-4">
        </div>

        <div className="w-full max-w-md p-6">
          <h1 className="text-3xl font-bold mb-6 text-center text-blue-600 dark:text-blue-400">
            Login to Job Tracker
          </h1>

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 mb-4 border rounded-md bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 mb-6 border rounded-md bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition hover:scale-[1.02]"
            >
              Login
            </button>
          </form>
          <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
            Don’t have an account?{" "}
            <a
              href="/register"
              className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
            >
              Register
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;

// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import ThemeToggle from "../components/ThemeToggle";

// const Login = () => {
//   const [form, setForm] = useState({ email: "", password: "" });
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await axios.post(
//         "http://localhost:5000/api/auth/login",
//         form
//       );

//       // ✅ Save token to localStorage
//       localStorage.setItem("token", res.data.token);
//       console.log("Token saved:", res.data.token);

//       alert("Login successful!");
//       navigate("/dashboard");
//     } catch (err) {
//       alert(err.response?.data?.msg || "Login failed");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4 text-black dark:text-white">
//       <ThemeToggle />
//       <div className="w-full max-w-md p-6 ">
//         <form
//           onSubmit={handleSubmit}
//           className="bg-white shadow-xl rounded-2xl px-8 pt-6 pb-8 w-full max-w-sm  "
//         >
//           <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
//             Login
//           </h2>

//           <input
//             type="email"
//             name="email"
//             placeholder="Enter your email"
//             required
//             className="w-full px-4 py-2 mt-2 mb-4 border rounded-md bg-white dark:bg-gray-800 text-black dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={form.password}
//             onChange={handleChange}
//             className="w-full px-4 py-2 mt-2 mb-4 border rounded-md bg-white dark:bg-gray-800 text-black dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
//             required
//           />

//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700 transition hover:scale-[1.02]"
//           >
//             Login
//           </button>

//           <p className="text-center text-sm text-gray-600 mt-4">
//             Don’t have an account?{" "}
//             <span
//               className="text-blue-600 hover:underline cursor-pointer"
//               onClick={() => navigate("/register")}
//             >
//               Register
//             </span>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;
