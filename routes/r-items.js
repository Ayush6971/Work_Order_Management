const express = require("express");
const router = express.Router();
const { getManageItems, getAllEstimateItems, updateItem, disableItem, enableItem, getItemCategories } = require("../controller/ItemsController")

router.get('/getManageItems', getManageItems);
router.get('/getAllEstimateItems', getAllEstimateItems);
router.get('/itemCategories', getItemCategories);

router.put('/updateItem', updateItem);
router.put('/disableItem', disableItem);
router.put('/enableItem', enableItem);
module.exports = router;