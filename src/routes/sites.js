const express = require("express");
const app = express();
const router = express.Router();

const sitesController = require("../app/controllers/SitesController");

router.get("/search", sitesController.search);
router.get("/", sitesController.index);

module.exports = router;
