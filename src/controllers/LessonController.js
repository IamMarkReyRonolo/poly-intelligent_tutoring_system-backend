const Lesson = require("../models/lesson");

module.exports = {
	getAllLessons,
	getSpecificLesson,
	generateLessons,
	updateLesson,
	updateChapter,
	advanceUpdate,
	averageUpdate,
};

async function getAllLessons(req, res, next) {
	try {
		const result = await Lesson.find({ userid: req.user }).lean();
		res.status(200).json({ count: result.length, lessons: result });
	} catch (error) {
		next(error);
	}
}

async function getSpecificLesson(req, res, next) {
	try {
		const result = await Lesson.findById(req.params.lessonid).lean();
		res.status(200).json({ count: result.length, lessons: result });
	} catch (error) {
		next(error);
	}
}

async function generateLessons(req, res, next) {
	try {
		const lesson1 = new Lesson({
			userid: req.user,
			name: "Intro To Polynomials",
			lesson_number: 1,
			status: "In Progress",
			chapter: [
				{
					chapter_number: 1,
					chapter_name: "Definition and Degree of a Polynomial",
					tutorial_status: "Not Yet",
					exercise_status: "Not Yet",
				},
				{
					chapter_number: 2,
					chapter_name: "Terms and Types of Polynomials",
				},
				{
					chapter_number: 3,
					chapter_name: "Polynomial Equations and Functions",
				},
				{
					chapter_number: 4,
					chapter_name: "Final Test",
				},
			],
		});

		const lesson2 = new Lesson({
			userid: req.user,
			name: "Polynomial Operations",
			lesson_number: 2,
			chapter: [
				{
					chapter_number: 1,
					chapter_name: "Addition of Polynomials",
					tutorial_status: "Not Yet",
					exercise_status: "Not Yet",
				},
				{
					chapter_number: 2,
					chapter_name: "Subtraction of Polynomials",
				},
				{
					chapter_number: 3,
					chapter_name: "Multiplication of Polynomials",
				},
				{
					chapter_number: 4,
					chapter_name: "Division of Polynomials",
				},
				{
					chapter_number: 5,
					chapter_name: "Final Test",
				},
			],
		});

		const lesson3 = new Lesson({
			userid: req.user,
			name: "Solving Linear Polynomials",
			lesson_number: 3,
			chapter: [
				{
					chapter_number: 1,
					chapter_name: "Solving Linear Polynomials",
					tutorial_status: "Not Yet",
					exercise_status: "Not Yet",
				},
				{
					chapter_number: 2,
					chapter_name: "Final Test",
				},
			],
		});

		const lessons = [lesson1, lesson2, lesson3];
		const docs = await Lesson.insertMany(lessons);
	} catch (error) {
		next(error);
	}
}

async function updateLesson(req, res, next) {
	try {
		const updated = await Lesson.findOneAndUpdate(
			{ _id: req.params.lessonid },
			{ status: req.body.status },
			{ new: true }
		);
		if (updated) {
			res.status(201).json({ message: "Update succesful", updated });
		} else {
			error = new Error("Not Found");
			error.status = 404;
			next(error);
		}
	} catch (error) {
		next(error);
	}
}

async function advanceUpdate(req, res, next) {
	try {
		console.log("yowww");
		const updated = await Lesson.updateMany(
			{ userid: req.user },
			{
				$set: {
					status: req.body.status,
				},
			}
		);
		console.log(updated);
		if (updated) {
			res.status(201).json({ message: "Update succesful", updated });
		} else {
			error = new Error("Not Found");
			error.status = 404;
			next(error);
		}
	} catch (error) {
		console.log(error);
		next(error);
	}
}

async function averageUpdate(req, res, next) {
	try {
		const updated = await Lesson.findOneAndUpdate(
			{ userid: req.user, name: "Polynomial Operations" },
			{ status: req.body.status },
			{ new: true }
		);
		if (updated) {
			res.status(201).json({ message: "Update succesful", updated });
		} else {
			error = new Error("Not Found");
			error.status = 404;
			next(error);
		}
	} catch (error) {
		next(error);
	}
}

async function updateChapter(req, res, next) {
	try {
		const updated = await Lesson.updateOne(
			{
				_id: req.params.lessonid,
				"chapter.chapter_number": req.params.chapnum,
			},
			{
				$set: {
					"chapter.$.tutorial_status": req.body.tutorial_status,
					"chapter.$.exercise_status": req.body.exercise_status,
					"chapter.$.exercise_score": req.body.exercise_score,
				},
			},
			{ new: true }
		);
		if (updated.matchedCount != 0) {
			res.status(201).json({ message: "Update succesful", updated });
		} else {
			error = new Error("Not Found");
			error.status = 404;
			next(error);
		}
	} catch (error) {
		next(error);
	}
}
