const newsRouter = require("./news");
const sitesRouter = require("./sites");
const coursesRouter = require("./courses");

function route(app) {
  // Router

  app.use("/news", newsRouter);
  app.use("/", sitesRouter);
  app.use("/courses", coursesRouter);
}

module.exports = route;
