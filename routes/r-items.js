const express = require("express");
const router = express.Router();
const { getManageItems, getAllEstimateItems, updateItem, disableItem, enableItem, getItemCategories, updateItemCategory, deleteItemCategory, addItemCategory, getItemCategoryAmount } = require("../controller/ItemsController")

router.get('/getManageItems', getManageItems);
router.get('/getAllEstimateItems', getAllEstimateItems);
router.put('/updateItem', updateItem);
router.put('/disableItem', disableItem);
router.put('/enableItem', enableItem);
router.get('/itemCategories', getItemCategories);
router.post('/itemCategory', addItemCategory);
router.put('/itemCategory', updateItemCategory);
router.delete('/itemCategory', deleteItemCategory)
router.get('/itemCategoryAmount', getItemCategoryAmount);
module.exports = router;