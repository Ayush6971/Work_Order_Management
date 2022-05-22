const express = require("express");
const router = express.Router();
const workOrder = require("../controller/WorkOrderController");
const { getAllQuotationItems } = require('../controller/CommonController') 

router.get("/addWorkOrder", workOrder.getAddWorkOrder);
router.post("/addWorkOrderBasic", workOrder.addWorkOrderBasic);
router.get("/addWorkOrderEstimate", workOrder.addWorkOrderEstimateGet);
router.get("/getAllQuotationItems", getAllQuotationItems)
module.exports = router;
