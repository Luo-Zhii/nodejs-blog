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
  // [GET] /courses/create
  create(reg, res, next) {
    res.render("courses/create");
  }
  // [POST] /courses/store
  async store(req, res, next) {
    try {
      const course = new Courses(req.body);
      console.log("Course instance:", course);
      await course.save().then(() => res.redirect("/"));
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CoursesController();
