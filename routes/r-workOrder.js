const express = require("express");
const router = express.Router();
const workOrder = require("../controller/WorkOrderController");

router.get('/addWorkOrder', workOrder.getAddWorkOrder);

module.exports = router;