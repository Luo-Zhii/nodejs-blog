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
      await course.save().then(() => res.redirect("me/stored/courses"));
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

  // [DELETE] /courses/:id/
  destroy(reg, res, next) {
    Courses.delete({ _id: reg.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }
  // [DELETE] /courses/:id/forceDestroy
  forceDestroy(reg, res, next) {
    Courses.deleteOne({ _id: reg.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }
  // [PATCH] /courses/:id/restore
  restore(req, res, next) {
    Courses.restore({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }

  // [POST] courses/handle-form-actions
  handleFormActions(req, res, next) {
    switch (req.body.action) {
      case "delete":
        Courses.delete({ _id: { $in: req.body.courseIds } })
          .then(() => res.redirect("back"))
          .catch(next);
        break;
      default:
        res.json({ message: "Action is invalid!!! " });
    }
  }
}

module.exports = new CoursesController();
