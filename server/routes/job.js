const express = require("express");
const router = express.Router();
const Job = require("../models/Job");

// POST /api/jobs — Add a job
router.post("/", async (req, res) => {
  const { title, company, status } = req.body;

  if (!title || !company || !status) {
    return res.status(400).json({ msg: "All fields required" });
  }

  try {
    const newJob = new Job({ title, company, status });
    await newJob.save();
    res.status(201).json(newJob);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// GET /api/jobs — Get all jobs
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
