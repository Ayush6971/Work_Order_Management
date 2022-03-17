const express = require("express");
const router = express.Router();
const workOrder = require("../controller/WorkOrderController");

router.get("/addWorkOrder", workOrder.getAddWorkOrder);
router.post("/addWorkOrderBasic", workOrder.addWorkOrderBasic);
router.get("/addWorkOrderQuotation", workOrder.addWorkOrderQuotation);

module.exports = router;
