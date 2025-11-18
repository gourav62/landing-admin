// backend/routes/clients.js
const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");
const Client = require("../models/Client");
const auth = require('../middleware/auth');
require("dotenv").config();

const router = express.Router();

// Configure Cloudinary
if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
} else {
  console.warn("Cloudinary credentials not found in .env — uploads to Cloudinary will fail. Provide CLOUDINARY_* env variables.");
}


const storage = multer.memoryStorage();


const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    
    if (!file.mimetype.startsWith("image/")) {
      return cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE", "Only image files are allowed"));
    }
    cb(null, true);
  },
});


function uploadToCloudinaryBuffer(buffer, options = {}) {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(options, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
}

// GET clients
router.get("/", async (req, res) => {
  try {
    const clients = await Client.find().sort({ createdAt: -1 }).lean();
    res.json(clients);
  } catch (err) {
    console.error("GET /api/clients error:", err);
    res.status(500).json({ message: "Could not fetch clients" });
  }
});

// POST client with image (multipart/form-data)
router.post("/",auth, upload.single("image"), async (req, res) => {
  try {
    const { name, designation, description } = req.body;
    console.log(req.body)
    if (!name || !designation) {
      return res.status(400).json({ message: "Missing required fields: name, designation" });
    }

    let imageUrl = "";
    let imagePublicId = "";

    if (req.file && req.file.buffer) {
      if (!cloudinary || !cloudinary.uploader) {
        
        console.warn("Cloudinary not configured; storing base64 in DB as fallback (not recommended).");
        imageUrl = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
      } else {
        
        const uploadResult = await uploadToCloudinaryBuffer(req.file.buffer, { folder: "clients", resource_type: "image" });
        imageUrl = uploadResult.secure_url || uploadResult.url;
        imagePublicId = uploadResult.public_id;
      }
    }

    const client = await Client.create({
      name,
      designation,
      description: description || "",
      image: imageUrl,
      imagePublicId,
    });

    res.status(201).json(client);
  } catch (err) {
    console.error("POST /api/clients error:", err);

    // Multer errors (e.g. file too large or incorrect file type)
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({ message: "File is too large. Max size is 10MB." });
      }
      if (err.code === "LIMIT_UNEXPECTED_FILE") {
        return res.status(400).json({ message: err.message || "Unexpected file" });
      }
      return res.status(400).json({ message: err.message || "Upload error" });
    }

    res.status(500).json({ message: "Could not create client", error: err.message });
  }
});

// DELETE client 
router.delete("/:id",auth, async (req, res) => {
  try {
    const id = req.params.id;
    const client = await Client.findById(id);
    if (!client) return res.status(404).json({ message: "Client not found" });


    if (client.imagePublicId && cloudinary && cloudinary.uploader) {
      try {
        await cloudinary.uploader.destroy(client.imagePublicId, { resource_type: "image" });
      } catch (err) {
        console.warn("Failed to delete image from Cloudinary:", err.message || err);
        
      }
    }

    await Client.findByIdAndDelete(id);
    res.json({ ok: true });
  } catch (err) {
    console.error("DELETE /api/clients error:", err);
    res.status(500).json({ message: "Delete failed" });
  }
});

module.exports = router;
