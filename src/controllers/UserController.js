const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const lessonController = require("./LessonController");

module.exports = {
	getAllUsers,
	getDetails,
	createUser,
	signinUser,
	updateUser,
};

async function getAllUsers(req, res, next) {
	try {
		const result = await User.find({}).lean();
		res.status(200).json({ count: result.length, users: result });
	} catch (error) {
		next(error);
	}
}

async function getDetails(req, res, next) {
	try {
		const result = await User.findById(req.user).lean();
		if (result) {
			res.status(200).json(result);
		} else {
			const error = new Error("Not Found");
			error.status = 404;
			next(error);
		}
	} catch (error) {
		next(error);
	}
}

async function createUser(req, res, next) {
	try {
		const user = new User({
			_id: mongoose.Types.ObjectId(),
			name: {
				firstName: req.body.firstName,
				lastName: req.body.lastName,
			},
			gender: req.body.gender,
			age: req.body.age,
			email: req.body.email,
			password: req.body.password,
			checkpoint: { lessonid: null, chapter_number: null },
		});

		const result = await user.save();
		req.user = result._id;
		lessonController.generateLessons(req, res, next);
		console.log(result._id + "");
		const token = jwt.sign(result._id + "", process.env.TOKEN_SECRET);
		res.header("auth-token", token);

		res.status(200).json({
			success_message: "Successfully created account",
			user: {
				id: result._id,
				token: token,
			},
		});
	} catch (error) {
		console.log(error);
		if (error.code == 11000) {
			error.status = 400;
			error.message = "Email must be unique. Duplicate email found";
			next(error);
		}

		if (error._message == "user validation failed") {
			error.status = 400;
			next(error);
		}

		next(error);
	}
}

async function signinUser(req, res, next) {
	try {
		const exist = await User.findOne({
			email: req.body.email,
		});

		if (!exist) {
			const error = new Error("Username does not exist");
			error.status = 400;
			next(error);
		}

		const pass = await bcrypt.compare(req.body.password, exist.password);
		if (!pass) {
			const error = new Error("Password is wrong");
			error.status = 400;
			next(error);
		}

		const token = jwt.sign(exist.id, process.env.TOKEN_SECRET);
		res.header("auth-token", token);

		res.status(200).json({
			success_message: "You are logged in",
			user: {
				id: exist.id,
				token: token,
			},
		});
	} catch (error) {
		next(error);
	}
}

async function updateUser(req, res, next) {
	try {
		try {
			const updated = await User.findByIdAndUpdate(
				req.user,
				{ checkpoint: req.body.checkpoint },
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
	} catch (error) {}
}

async function updateUser(req, res, next) {
	try {
		try {
			const updated = await User.findByIdAndUpdate(
				req.user,
				{
					learner_state: req.body.learner_state,
					checkpoint: req.body.checkpoint,
				},
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
	} catch (error) {}
}
