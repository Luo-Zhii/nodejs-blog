const Courses = require("../../app/models/Courses");
const { mutipleMongooseToObject } = require("../../utils/mongoose");

class SitesController {
  // [GET] /
  async index(req, res, next) {
    Courses.find({})
      .then((courses) => {
        res.render("home", { courses: mutipleMongooseToObject(courses) });
      })
      .catch((err) => next(err));
  }

  // [GET] /search
  search(req, res) {
    res.render("search");
  }
}

module.exports = new SitesController();
