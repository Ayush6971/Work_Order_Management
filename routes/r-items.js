const express = require("express");
const router = express.router();
const { getAllItems } = require("../controller/ItemsController")

router.get('/getAllItems', getAllItems);

module.exports = router;