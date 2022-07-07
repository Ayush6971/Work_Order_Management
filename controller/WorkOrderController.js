const {
  getCurrentUserDetails,
  createWorkOrder,
  getWorkOrderDetails,
  capitalizeFirstLetter,
  getEstimateItems,
  insertEstimate,
  insertEstimateTotal,
  convertEstimateHTMLToPDF,
  getEstimateDetailsByWOId,
  getEstimateTotalDetailsByWOId
} = require("./CommonController");
const path = require("path");
const fs = require("fs");


const getAddWorkOrder = async (req, res) => {
  try {
    const currentUser = req.user;

    if (!currentUser) return res.status(400).json({ message: "Please login!" });
    const findCurrentUserDetails = await getCurrentUserDetails(
      currentUser._id,
      "role"
    );

    if (!findCurrentUserDetails)
      return res.status(400).json({ message: "User not found!" });

    res.profile = findCurrentUserDetails;
    return res.render("addWorkOrder", { res });
  } catch (error) {
    console.error(
      "🚀 ~ file: WorkOrderController.js ~ line 22 ~ getAddWorkOrder ~ error",
      error
    );
  }
};

const addWorkOrderBasic = async (req, res) => {
  try {
    const currentUser = req.user;
    if (!currentUser) return res.status(400).json({ message: "Please login!" });

    const findCurrentUserDetails = await getCurrentUserDetails(
      currentUser._id,
      "role"
    );
    if (!findCurrentUserDetails)
      return res.status(400).json({ message: "User not found!" });
    res.profile = findCurrentUserDetails;

    const {
      presentAddress,
      workOrderAddress,
      phoneNo,
      advance,
      workOrderDate,
    } = req.body.workOrderBasicForm;

    let { firstName,
      lastName } = req.body.workOrderBasicForm;
    if (
      !firstName ||
      !lastName ||
      !presentAddress ||
      !workOrderAddress ||
      !phoneNo ||
      // !advance ||
      !workOrderDate
    )
      return res
        .status(400)
        .json({ message: "Please Fill all mandatory fields!" });

    firstName = await capitalizeFirstLetter(firstName.trim());
    lastName = await capitalizeFirstLetter(lastName.trim());

    const createWorkOrderBasic = await createWorkOrder({
      firstName,
      lastName,
      presentAddress,
      workOrderAddress,
      phoneNo,
      advanceAmount: advance ? advance : null,
      workOrderDate,
    });

    if (createWorkOrderBasic) {
      return res.status(200).json({
        message: "Work Order Basic Added.",
        workOrderId: createWorkOrderBasic._id,
      });
    } else
      return res
        .status(400)
        .json({ message: "Something Went Wrong! Please Try Again." });
  } catch (error) {
    console.error(
      "🚀 ~ file: WorkOrderController.js ~ line 81 ~ addWorkOrderBasic ~ error",
      error
    );
  }
};

const getWorkOrderEstimate = async (req, res) => {
  try {
    const currentUser = req.user;
    const workOrderId = req.query.workOrderId;

    if (!currentUser)
      return res.status(400).json({ message: "Please login!" });

    if (!workOrderId)
      return res.status(400).json({ message: "Please fill all fields!" })

    const findCurrentUserDetails = await getCurrentUserDetails(
      currentUser._id,
      "role"
    );

    if (!findCurrentUserDetails)
      return res.status(400).json({ message: "User not found!" });

    res.profile = findCurrentUserDetails;

    const workOrderDetails = await getWorkOrderDetails(workOrderId)
    let estimateDetails = await getEstimateDetailsByWOId(workOrderId)
    const estimateTotalDetails = await getEstimateTotalDetailsByWOId(workOrderId);

    estimateDetails = estimateDetails.map((currentValue, index) => {
      currentValue.serialNumber = index + 1;
      return currentValue;
    });
    const templateParams = {
      workOrderDetails,
      estimateDetails,
      estimateTotalDetails
    }
    const template = fs.readFileSync(path.normalize(path.join(__dirname, '../views/generateEstimatePDF.ejs')), 'utf-8');
    const fileName = `${workOrderDetails.firstName} ${workOrderDetails.lastName}_estimate_${workOrderDetails.estimateNumber}.pdf`

    await convertEstimateHTMLToPDF(templateParams, template, fileName)
    return res.render("generateEstimatePDF", { workOrderDetails, estimateDetails, estimateTotalDetails });
    // let getAllItems = await getEstimateItems();
    // getAllItems = getAllItems.filter(item => !item.isDisabled).map((currentValue, index) => {
    //   currentValue.serialNumber = index + 1;
    //   return currentValue;
    // });
    // return res.render("workOrderEstimate", { res, workOrderDetails, itemList: getAllItems });

  } catch (error) {
    console.error(
      "🚀 ~ file: WorkOrderController.js ~ line 114 ~ addWorkOrderQuotation ~ error",
      error
    );
  }
};

const addWorkOrderEstimate = async (req, res) => {
  try {
    let estimateDetails, estimateTotalDetails
    const currentUser = req.user;
    if (!currentUser) return res.status(400).json({ message: "Please login!" });

    const { workOrderId, addWorkOrderEstimateForm, estimateTotalObj } = req.body;

    const workOrderDetails = await getWorkOrderDetails(workOrderId);
    if (!workOrderDetails) return res.status(400).json({ message: "Work Order Not found" })

    if (!addWorkOrderEstimateForm || !estimateTotalObj) {
      return res.status(400).json({ message: "Please fill all Mandatory fields." });
    }

    if (addWorkOrderEstimateForm) {
      estimateDetails = await insertEstimate(addWorkOrderEstimateForm)
    }

    if (estimateTotalObj)
      estimateTotalDetails = await insertEstimateTotal(estimateTotalObj);

    if (!estimateDetails || !estimateTotalDetails) {
      return res.status(400).json({ message: "Something went wrong!" });
    }

    estimateDetails = estimateDetails.map((currentValue, index) => {
      currentValue.serialNumber = index + 1;
      return currentValue;
    });
    const templateParams = {
      workOrderDetails,
      estimateDetails,
      estimateTotalDetails
    }
    const template = fs.readFileSync(path.normalize(path.join(__dirname, '../views/generateEstimatePDF.ejs')), 'utf-8');
    const fileName = `${workOrderDetails.firstName} ${workOrderDetails.lastName}_estimate_${workOrderDetails.estimateNumber}.pdf`

    await convertEstimateHTMLToPDF(templateParams, template, fileName)
    return res.status(200).json({ message: "Estimate created successfully." });
  } catch (error) {
    console.error("🚀 ~ file: WorkOrderController.js ~ line 141 ~ addWorkOrderEstimate ~ error", error)
  }
}

module.exports = {
  getAddWorkOrder,
  addWorkOrderBasic,
  getWorkOrderEstimate,
  addWorkOrderEstimate
};
