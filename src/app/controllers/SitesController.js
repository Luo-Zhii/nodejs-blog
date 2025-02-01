const Courses = require("../../app/models/Courses");
const { multipleMongooseToObject } = require("../../utils/mongoose");

class SitesController {
  // [GET] /
  async index(req, res, next) {
    Courses.find({})
      .then((courses) => {
        res.render("home", { courses: multipleMongooseToObject(courses) });
      })
      .catch((err) => next(err));
  }

  // [GET] /search
  search(req, res) {
    res.render("search");
  }
}

module.exports = new SitesController();
