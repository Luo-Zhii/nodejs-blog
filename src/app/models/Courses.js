const mongoose = require("mongoose");
const mongoose_delete = require("mongoose-delete");
const Schema = mongoose.Schema;
const slug = require("mongoose-slug-updater");

const Course = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    thumbnail: { type: String },
    videoId: { type: String },
    level: { type: String },
    slug: { type: String, unique: true, required: true },
  },
  {
    timestamps: true,
  }
);

mongoose.plugin(slug);
Course.plugin(mongoose_delete, {
  deletedAt: true,
  overrideMethods: ["delete", "find", "restore"],
});

module.exports = mongoose.model("Course", Course);
