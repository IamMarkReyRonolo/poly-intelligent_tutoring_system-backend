const mongoose = require("mongoose");

// SCHEMA

const lessonSchema = new mongoose.Schema(
	{
		userid: {
			type: mongoose.Schema.Types.ObjectId,
		},
		name: {
			type: String,
		},
		lesson_number: {
			type: Number,
		},
		status: {
			type: String,
			enum: ["Completed", "Locked", "In Progress"],
			default: "Locked",
		},
		chapter: [
			{
				chapter_number: {
					type: Number,
				},
				chapter_name: {
					type: String,
				},
				tutorial_status: {
					type: String,
					enum: ["Not Yet", "Locked", "Completed", "Redo"],
					default: "Locked",
				},
				exercise_status: {
					type: String,
					enum: ["Failed", "Locked", "Passed", "Not Yet"],
					default: "Locked",
				},
				exercise_score: {
					type: Number,
				},
			},
		],
	},
	{ timestamps: true }
);

// MONGOOSE MIDDLEWARES

// MODEL

const Lesson = mongoose.model("lesson", lessonSchema);

module.exports = Lesson;
