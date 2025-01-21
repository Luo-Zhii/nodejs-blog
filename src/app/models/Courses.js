const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Courses = new Schema({
  name: { type: String, default: "hahaha", maxLength: 255 },
  description: { type: String, maxLength: 600 },
  thumbnail: { type: String, maxLength: 255 },
  createAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Courses", Courses);
