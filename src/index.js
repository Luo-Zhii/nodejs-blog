const express = require("express");
const morgan = require("morgan");
const handlebars = require("express-handlebars").engine;
const path = require("path");
const app = express();
const route = require("./routes/index");
const db = require("./config/db");

// Connect to db
db.connect();

//Image
app.use(express.static(path.join(__dirname, "../public")));

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

// HTTP logger
app.use(morgan("tiny"));

// Template engine
app.engine("hbs", handlebars({ extname: ".hbs" }));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "\\resources\\views"));

// Routes
route(app);

app.listen(3000);
