const express = require("express");
const router = express.Router();
const { getManageItems, getAllEstimateItems, updateItem } = require("../controller/ItemsController")

router.get('/getManageItems', getManageItems);
router.get('/getAllEstimateItems', getAllEstimateItems);
router.put('/updateItem', updateItem);

module.exports = router;