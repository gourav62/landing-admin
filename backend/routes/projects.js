// backend/routes/projects.js
const express = require("express");
const multer = require("multer");
const Project = require("../models/Project");
const router = express.Router();
const auth = require('../middleware/auth');

// use memoryStorage so we can convert to base64 and save to DB
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 20 * 1024 * 1024 }, // 5MB limit (adjust)
});

// GET all projects
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 }).lean();
    res.json(projects);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Could not fetch projects" });
  }
});

router.post("/",auth, upload.single("image"), async (req, res) => {
  try {
    const { name, description } = req.body;
    let imageBase64 = "";

    if (req.file) {
      imageBase64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
    }

    const project = new Project({
      name,
      description,
      image: imageBase64,
    });

    await project.save();
    res.status(201).json(project);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Could not create project" });
  }
});

// DELETE (optional) — keep if you had delete in admin
router.delete("/:id",auth, async (req, res) => {
  try {
    const { id } = req.params;
    await Project.findByIdAndDelete(id);
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Delete failed" });
  }
});

module.exports = router;
