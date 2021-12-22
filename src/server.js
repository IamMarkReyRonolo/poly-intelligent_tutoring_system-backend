const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { connectToDatabase } = require("./database/db-connection");
const { notFoundError, errorSender } = require("./errors/errors");
require("dotenv").config();

const app = express();

// MIDDLEWARES
app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// DATABASE CONNECTION
connectToDatabase();

// API REQUESTS
const test = require("./routes/test-server");
const userAPI = require("./routes/userAPI");
const lessonAPI = require("./routes/lessonAPI");
app.use("/", test);

app.use("/api/users", userAPI);
app.use("/api/lessons", lessonAPI);

// ERROR HANDLING
app.use(notFoundError);
app.use(errorSender);

// APP LISTENING
app.listen(process.env.PORT || 3000, () => {
	console.log("Server is now running");
});
