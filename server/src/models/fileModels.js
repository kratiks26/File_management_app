const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const fileSchema = Schema(
  {
    name: {
      type: String,
      require: true,
      trim: true,
    },
    folder: {
      type: Schema.Types.ObjectId,
      ref: "Folder",
      required: false,
    },
    filePath: {
      type: String,
      required: true,
    },
    publicId: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      trim: true,
    },
    createAt: {
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

module.exports = model("File", fileSchema);
