const mongoose = require("mongoose");
const mongoose_delete = require("mongoose-delete");
const Schema = mongoose.Schema;
const slug = require("mongoose-slug-updater");

const Courses = new Schema(
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

// Custom query helpers
Courses.query.sortable = function (req) {
  if (req.query.hasOwnProperty('_sort')) {
    const isValidType = ['asc', 'desc'].includes(req.query.type)
    return this.sort({
      [req.query.column]: isValidType ? req.query.type : 'asc'
    })
  }
  return this
}

// Add plugin
Courses.plugin(mongoose_delete, {
  deletedAt: true,
  overrideMethods: ["count", "delete", "find", "restore"],
});

module.exports = mongoose.model("Courses", Courses);
