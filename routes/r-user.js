const express = require("express");
const router = express.Router();
const User = require("../controller/UserController");
const isAuthenticated = require("../middlewares/isAuthenticated");

//login route
router.get("/addUser", User.getAddUser);
router.post("/addUser",User.postAddUser);
router.get("/profile", User.getMyProfile);
module.exports = router;
