const Courses = require("../../app/models/Courses");

class SitesController {
  // [GET] /
  async index(req, res) {
    try {
      const courses = await Courses.find({});
      res.json(courses);
    } catch (err) {
      console.error(err);
      res.status(500).res.json({ err: "error" });
    }
  }

  // [GET] /search
  search(req, res) {
    res.render("search");
  }
}

module.exports = new SitesController();
