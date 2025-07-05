const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// ✅ Import and use auth routes here
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

// Optional root route
app.get("/", (req, res) => {
  res.send("API is working!");
});

// ✅ Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
    app.listen(5000, () => console.log("🚀 Server running on port 5000"));
  })
  .catch((err) => console.log("MongoDB Error:", err));
