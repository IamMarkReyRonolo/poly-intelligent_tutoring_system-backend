const express = require("express");

const router = express.Router();

router.get("/test-server", (req, res, next) => {
	res.status(200).json("Server is up and running");
});

module.exports = router;
