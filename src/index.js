const express = require("express");
const morgan = require("morgan");
const handlebars = require("express-handlebars").engine;
const path = require("path");
const app = express();
const route = require("./routes/index");
const db = require("./config/db");

console.log("====================================");
console.log(path.join(__dirname, "\\public"));
console.log("====================================");

// Connect to db
db.connect();

app.use(express.static(path.join(__dirname, "\\public")));

// convert json
app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

// HTTP logger
app.use(morgan("tiny"));

// Template engine
app.engine("hbs", handlebars({ extname: ".hbs" }));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "\\resources\\views"));

// Routes
route(app);

app.listen(3000);
