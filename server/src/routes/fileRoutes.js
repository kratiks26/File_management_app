const express = require("express");
const { uploadFile, deleteFile } = require("../controllers/fileController");
const { storage } = require("../config/cloudinaryConfig");
const multer = require("multer");
const upload = multer({ storage });
const router = express.Router();

router.post("/files", upload.single("file"), uploadFile);
router.delete("/files/:id", deleteFile);

module.exports = router;
