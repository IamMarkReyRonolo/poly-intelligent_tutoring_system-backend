const express = require("express");
const UserController = require("../controllers/UserController");
const router = express.Router();
const auth = require("../controllers/auth");

// GET
router.get("/all", UserController.getAllUsers);
router.get("/getdetails", auth.authenticate, UserController.getDetails);

// POST
router.post("/signin", UserController.signinUser);
router.post("/create", UserController.createUser);

// UPDATE
router.patch("/update", auth.authenticate, UserController.updateUser);

// DELETE

module.exports = router;
