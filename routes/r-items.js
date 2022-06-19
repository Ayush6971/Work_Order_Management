const express = require("express");
const router = express.Router();
const { getManageItems, getAllEstimateItems } = require("../controller/ItemsController")

router.get('/getManageItems', getManageItems);
router.get('/getAllEstimateItems', getAllEstimateItems);

module.exports = router;