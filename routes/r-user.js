const express = require("express");
const router = express.Router();
const User = require("../controller/UserController");
const isAuthenticated = require("../middlewares/isAuthenticated");

//login route
router.get("/addUser", User.getAddUser);
router.post("/addUserPost", User.postAddUser);
router.get("/profile", User.getMyProfile);
router.post("/updateProfile", User.updateMyProfile);
router.post("/resetEmail", User.resetEmail);
router.post('/resetPassword', User.resetPassword)
router.get('/resetEmailVerify/:emailResetToken/:newEmail', User.resetEmailToken);

module.exports = router;
