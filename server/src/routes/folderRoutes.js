const express = require("express");
const router = express.Router();
const {
  createFolder,
  editFolder,
  deleteFolder,
  getFolders,
  countFileAndFolders,
} = require("../controllers/folderController");

router.post("/folders", createFolder);
router.put("/folders/:id", editFolder);
router.delete("/folders/:id", deleteFolder);
router.get("/folders", getFolders);
router.get("/folders/count", countFileAndFolders);

module.exports = router;
