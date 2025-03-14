const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const folderSchema = Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    parentFolder: {
      type: Schema.Types.ObjectId,
      ref: "Folder",
      default: null,
    },
    childFolders: [
      {
        type: Schema.Types.ObjectId,
        ref: "Folder",
      },
    ],
    files: [
      {
        type: Schema.Types.ObjectId,
        ref: "File",
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updateAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = model("Folder", folderSchema);
