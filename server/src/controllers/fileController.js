const File = require("../models/fileModels");
const Folder = require("../models/folderModels");
const { cloudinary, storage } = require("../config/cloudinaryConfig");

const multer = require("multer");

const upload = multer({ storage });

const uploadFile = async (req, res) => {
  try {
    const { name, folder, description } = req.body;
    const filePath = req.file.path;
    const publicId = req.file.filename;

    const file = new File({ name, folder, filePath, publicId, description });
    if (folder) {
      const parentFolder = await Folder.findById(folder);
      if (parentFolder) {
        parentFolder.files.push(file._id);
        await parentFolder.save();
      }
    }

    await file.save();

    const io = req.app.get("io");
    io.emit("fileUploaded", file);
    res.status(201).json(file);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteFile = async (req, res) => {
  try {
    const { id } = req.params;
    const file = await File.findByIdAndDelete(id);

    const parentFolder = await Folder.findById(file.folder);
    if (parentFolder) {
      parentFolder.files = parentFolder.files.filter(
        (fileId) => fileId.toString() !== id
      );
      await parentFolder.save();
    }

    await cloudinary.uploader.destroy(file.publicId);

    const io = req.app.get("io");
    io.emit("fileDeleted", id);

    res.status(200).json({ message: "File deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { uploadFile, deleteFile };
