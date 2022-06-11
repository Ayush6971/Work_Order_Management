const express = require("express");
const router = express.Router();
const { getManageItems, getAllEstimateItems } = require("../controller/ItemsController")

router.get('/getManageItems', getManageItems);
router.get('/getAllItems', getAllEstimateItems);

module.exports = router;