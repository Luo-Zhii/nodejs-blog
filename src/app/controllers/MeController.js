const Courses = require("../../app/models/Courses");
const {
  multipleMongooseToObject
  
} = require("../../utils/mongoose");

class MeController {
  // [PUT] /me/store/courses
  storeCourses(req, res, next) {

    Promise.all([Courses.find({}).sortable(req), Courses.countDocuments({
        deleted: true
      })])
      .then(([courses, deletedCount]) =>
        res.render("me/stored-courses", {
          courses: multipleMongooseToObject(courses),
          deletedCount,
        })
      )
      .catch(next);
  }

  trashCourses(req, res, next) {
    Courses.findWithDeleted({
        deleted: true
      })
      .then((courses) =>
        res.render("me/trashed-courses", {
          courses: multipleMongooseToObject(courses),
        })
      )
      .catch(next);
  }
}

module.exports = new MeController();
