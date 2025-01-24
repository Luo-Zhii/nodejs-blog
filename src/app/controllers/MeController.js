const Courses = require("../../app/models/Courses");
const { mutipleMongooseToObject } = require("../../utils/mongoose");

class MeController {
  // [PUT] /me/store/courses
  storeCourses(req, res, next) {
    Courses.find({})
      .then((courses) =>
        res.render("me/stored-courses", {
          courses: mutipleMongooseToObject(courses),
        })
      )
      .catch(next);
  }
}

module.exports = new MeController();
