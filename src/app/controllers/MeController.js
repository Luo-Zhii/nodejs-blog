const Courses = require("../../app/models/Courses");
const { mutipleMongooseToObject } = require("../../utils/mongoose");

class MeController {
  // [PUT] /me/store/courses
  storeCourses(req, res, next) {
    Promise.all([Courses.find({}), Courses.countDocuments({ deleted: true })])
      .then(([courses, deletedCount]) =>
        res.render("me/stored-courses", {
          courses: mutipleMongooseToObject(courses),
          deletedCount,
        })
      )
      .catch(next);
  }

  trashCourses(req, res, next) {
    Courses.findWithDeleted({ deleted: true })
      .then((courses) =>
        res.render("me/trashed-courses", {
          courses: mutipleMongooseToObject(courses),
        })
      )
      .catch(next);
  }
}

module.exports = new MeController();
