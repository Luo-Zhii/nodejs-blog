const Courses = require("../../app/models/Courses");
const { mongooseToObject } = require("../../utils/mongoose");

class CoursesController {
  // [GET] /courses/:slug
  show(req, res, next) {
    Courses.findOne({ slug: req.params.slug })
      .then((course) =>
        res.render("courses/show", { course: mongooseToObject(course) })
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

  // [GET] /courses/:id/edit
  edit(reg, res, next) {
    Courses.findById(reg.params.id).then((course) =>
      res.render("courses/edit", { course: mongooseToObject(course) })
    );
  }

  // [PUT] /courses/:id
  update(reg, res, next) {
    Courses.updateOne({ _id: reg.params.id }, reg.body)
      .then(() => res.redirect("/me/stored/courses"))
      .catch(next);
  }
}

module.exports = new CoursesController();
