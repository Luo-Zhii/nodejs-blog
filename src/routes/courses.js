const express = require("express");
const router = express.Router();

const CoursesController = require("../app/controllers/CoursesController");

router.get("/create", CoursesController.create);
router.post("/store", CoursesController.store);
router.get("/:id/edit", CoursesController.edit);
router.post("/handle-form-actions", CoursesController.handleFormActions);
router.put("/:id", CoursesController.update);
router.patch("/:id/restore", CoursesController.restore);
router.delete("/:id", CoursesController.destroy);
router.delete("/:id/force", CoursesController.forceDestroy);
router.get("/:slug", CoursesController.show);

module.exports = router;
