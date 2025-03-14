const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DataBase Connected");
  } catch (err) {
    console.error("DataBase Connection error:", err);
  }
};

module.exports = connectDB;
