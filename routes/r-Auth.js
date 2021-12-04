const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const Auth = require("../controller/AuthController");


//login route
router.post(
    "/login",
    [
      check("phoneNo")
        .isLength({ min: 10 })
        .withMessage("phoneNo must be at least of 10 digits"),
      check("password").isLength({ min: 5 }),
    ],
    Auth.login
  );

  module.exports = router;
