const express = require("express");
const morgan = require("morgan");
const handlebars = require("express-handlebars").engine;
const path = require("path");
const app = express();

//Image
app.use(express.static(path.join(__dirname, "../public")));

// HTTP logger
app.use(morgan("tiny"));

// Template engine
app.engine("hbs", handlebars({ extname: ".hbs" }));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "\\views"));

app.get("/", function (req, res) {
  res.render("home");
});

app.listen(3000);
