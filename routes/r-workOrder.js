const express = require("express");
const router = express.Router();
const { getAddWorkOrder, addWorkOrderBasic, getWorkOrderEstimate, addWorkOrderEstimate } = require("../controller/WorkOrderController");

router.get("/addWorkOrder", getAddWorkOrder);
router.post("/addWorkOrderBasic", addWorkOrderBasic);
router.get("/getWorkOrderEstimate", getWorkOrderEstimate);
router.post("/addWorkOrderEstimate", addWorkOrderEstimate)
module.exports = router;
