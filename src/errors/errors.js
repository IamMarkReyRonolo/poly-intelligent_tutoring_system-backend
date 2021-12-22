module.exports = { notFoundError, errorSender };

function notFoundError(req, res, next) {
	const error = new Error("Not Found");
	error.status = 404;
	next(error);
}

function errorSender(error, req, res, next) {
	error.status = error.status || 500;
	res.status(error.status).json(error.message);
}
