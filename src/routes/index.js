const newsRouter = require("./news");
const sitesRouter = require("./sites");

function route(app) {
  // Router

  app.use("/news", newsRouter);
  app.use("/", sitesRouter);
}

module.exports = route;
