const express = require("express");
const router = express.Router();
const workOrder = require("../controller/WorkOrderController");

router.get('/addWorkOrder', workOrder.getAddWorkOrder);
router.post('/addWorkOrderBasic', workOrder.addWorkOrderBasic)

module.exports = router;