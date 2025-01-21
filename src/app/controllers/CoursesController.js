const Courses = require("../../app/models/Courses");
const { mongooseToObject } = require("../../utils/mongoose");

class CoursesController {
  // [GET] /courses/:slug
  show(req, res, next) {
    Courses.findOne({ slug: req.params.slug })
      .then((courses) =>
        res.render("courses/show", { courses: mongooseToObject(courses) })
      )
      .catch(next);
  }
}

module.exports = new CoursesController();
