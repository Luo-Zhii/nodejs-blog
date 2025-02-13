const express = require("express");
const morgan = require("morgan");
const handlebars = require("express-handlebars").engine;
const path = require("path");
const app = express();
const methodOverride = require("method-override");
const route = require("./routes/index");
const db = require("./config/db");

const SortMiddleware = require("./app/middlewares/SortMiddleware")

// Connect to db
db.connect();

app.use(express.static(path.join(__dirname, "public")));

// convert json
app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

// override with POST having ?_method=DELETE
app.use(methodOverride("_method"));

// Customer middleware
app.use(SortMiddleware)


// HTTP logger
app.use(morgan("tiny"));

// Template engine
app.engine(
  "hbs",
  handlebars({
    extname: ".hbs",
    helpers: require("./helpers/handlebars.js")
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources", "views"));

// Routes
route(app);

app.listen(3000);