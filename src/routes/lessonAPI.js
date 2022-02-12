const express = require("express");
const LessonController = require("../controllers/LessonController");
const router = express.Router();
const auth = require("../controllers/auth");

// GET
router.get("/all", auth.authenticate, LessonController.getAllLessons);
router.get("/:lessonid", auth.authenticate, LessonController.getSpecificLesson);
// // POST
router.post("/generate", auth.authenticate, LessonController.generateLessons);

// UPDATE
router.patch(
	"/:lessonid/:chapnum",
	auth.authenticate,
	LessonController.updateChapter
);

router.patch("/:lessonid", auth.authenticate, LessonController.updateLesson);

router.patch(
	"/update/lessons/advance",
	auth.authenticate,
	LessonController.advanceUpdate
);

router.patch(
	"/update/lessons/average",
	auth.authenticate,
	LessonController.averageUpdate
);

module.exports = router;
