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
    helpers: {
      sum: (a, b) => a + b,
      sortable: (field, sort) => {

        
        console.log(sort.column)
        const sortType = field === sort.column ? sort.type : 'default'

        const icons = {
          default: "fa-solid fa-sort",
          asc: "fa-solid fa-arrow-down-short-wide",
          desc: "fa-solid fa-arrow-down-wide-short",
        }

        const types = {
          default: 'asc',
          asc: 'desc',
          desc: 'asc',
        }

        const icon = icons[sortType]
        const type = types[sortType]

        return `<a class="text-blue-500" href="?_sort&column=${field}&type=${type}">
                                <i class="${icon}"></i>
                            </a >`
      }
    },
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources", "views"));

// Routes
route(app);

app.listen(3000);