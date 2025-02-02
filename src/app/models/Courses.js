const mongoose = require("mongoose");
const mongoose_delete = require("mongoose-delete");
const slug = require("mongoose-slug-updater");
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema  ;

const Courses = new Schema(
  {
    _id: {type: Number},
    name: { type: String, required: true },
    description: { type: String },
    thumbnail: { type: String },
    videoID: { type: String },
    level: { type: String },
    slug: { type: String, unique: true, required: true },
  },
  {
    _id: false,
    timestamps: true,
  }
);
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
mongoose.plugin(slug);

Courses.plugin(AutoIncrement);

Courses.plugin(mongoose_delete, {
  deletedAt: true,
  overrideMethods: ["count", "delete", "find", "restore"],
});

module.exports = mongoose.model("Courses", Courses);
