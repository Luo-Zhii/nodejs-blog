const express = require("express");
const app = express();
const router = express.Router();

const sitesController = require("../app/controllers/SitesController");

router.use("/search", sitesController.search);
router.use("/", sitesController.index);

module.exports = router;
