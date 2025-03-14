const Folder = require("../models/folderModels");
const File = require("../models/fileModels");

const getFolderStructure = async (folderId) => {
  const folder = await Folder.findById(folderId)
    .populate("childFolders")
    .populate("files")
    .exec();

  if (!folder) return null;

  const folderData = {
    id: folder._id,
    name: folder.name,
    type: "folder",
    description: folder.description || "---",
    createdAt: folder.createdAt,
    updatedAt: folder.updatedAt,
    children: [],
  };

  for (const childFolder of folder.childFolders) {
    const childFolderData = await getFolderStructure(childFolder._id);
    if (childFolderData) {
      folderData.children.push(childFolderData);
    }
  }
  for (const file of folder.files) {
    folderData.children.push({
      id: file._id,
      name: file.name,
      type: "file",
      description: file.description || "---",
      createdAt: file.createdAt,
      updatedAt: file.updatedAt,
      filePath: file.filePath,
    });
  }
  return folderData;
};

const createFolder = async (req, res) => {
  try {
    const { name, description, parentFolder } = req.body;
    const folder = new Folder({ name, description, parentFolder });

    if (parentFolder) {
      const parent = await Folder.findById(parentFolder);
      if (parent) {
        parent.childFolders.push(folder._id);
        await parent.save();
      }
    }
    await folder.save();

    const io = req.app.get("io");
    io.emit("folderCreated", folder);

    res.status(201).json(folder);
    console.log(folder);
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log(error);
  }
};

const editFolder = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const folder = await Folder.findByIdAndUpdate(
      id,
      {
        name,
        description,
        updatedAt: Date.now(),
      },
      { new: true }
    );

    const io = req.app.get("io");
    io.emit("folderUpdated", folder);

    res.status(200).json(folder);
    console.log(folder);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteFolder = async (req, res) => {
  try {
    const { id } = req.params;

    const folder = await Folder.findById(id);
    if (!folder) {
      return res.status(404).json({ error: "Folder not found" });
    }

    const deleteChildFolders = async (folderId) => {
      const childFolders = await Folder.find({ parentFolder: folderId });
      for (const childFolder of childFolders) {
        await deleteChildFolders(childFolder._id);
        await Folder.findByIdAndDelete(childFolder._id);
      }
    };
    await deleteChildFolders(id);
    await File.deleteMany({ folder: id });

    if (folder.parentFolder) {
      const parent = await Folder.findById(folder.parentFolder);
      if (parent) {
        parent.childFolders = parent.childFolders.filter(
          (childId) => childId.toString() !== id
        );
        await parent.save();
      }
    }

    await Folder.findByIdAndDelete(id);

    const io = req.app.get("io");
    io.emit("folderDeleted", id);

    res.status(200).json({ message: "Folder deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getFolders = async (req, res) => {
  try {
    const { page = 1, limit = 8, name, description, createdAt } = req.query;
    const query = {};

    if (name) query.name = { $regex: name, $options: "i" };
    if (description) query.description = { $regex: description, $options: "i" };
    if (createdAt) query.createdAt = { $gte: new Date(createdAt) };

    const rootFolders = await Folder.find({ ...query, parentFolder: null })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const foldersData = await Promise.all(
      rootFolders.map(async (folder) => {
        return await getFolderStructure(folder._id);
      })
    );

    const count = await Folder.countDocuments({ ...query, parentFolder: null });

    res.status(200).json({
      folders: foldersData,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const countFileAndFolders = async (req, res) => {
  try {
    const folderCount = await Folder.countDocuments({});
    const fileCount = await File.countDocuments({});
    res.status(200).json({ folderCount, fileCount });
  } catch (error) {
    console.error("Error counting folders:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createFolder,
  editFolder,
  deleteFolder,
  getFolders,
  countFileAndFolders,
};
