const {
  getCurrentUserDetails,
  createWorkOrder,
  getWorkOrderDetails,
  capitalizeFirstLetter,
  getEstimateItems,
  insertEstimate,
  insertEstimateTotal,
  convertEstimateHTMLToPDF
} = require("./CommonController");


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

    const findWorkOrderDetails = await getWorkOrderDetails(workOrderId)

    let getAllItems = await getEstimateItems();
    getAllItems = getAllItems.filter(item => !item.isDisabled).map((currentValue, index) => {
      currentValue.serialNumber = index + 1;
      return currentValue;
    });

    return res.render("workOrderEstimate", { res, workOrderDetails: findWorkOrderDetails, itemList: getAllItems });

  } catch (error) {
    console.error(
      "🚀 ~ file: WorkOrderController.js ~ line 114 ~ addWorkOrderQuotation ~ error",
      error
    );
  }
};

const addWorkOrderEstimate = async (req, res) => {
  try {
    let estimate, estimateTotal
    const currentUser = req.user;
    if (!currentUser) return res.status(400).json({ message: "Please login!" });

    const { workOrderId, addWorkOrderEstimateForm, estimateTotalObj } = req.body;
    console.log("🚀 ~ file: WorkOrderController.js ~ line 148 ~ addWorkOrderEstimate ~ addWorkOrderEstimateForm", addWorkOrderEstimateForm)

    const workOrderDetails = await getWorkOrderDetails(workOrderId);
    if (!workOrderDetails) return res.status(400).json({ message: "Work Order Not found" })

    if (!addWorkOrderEstimateForm || !estimateTotalObj) {
      return res.status(400).json({ message: "Please fill all Mandatory fields." });
    }

    if (addWorkOrderEstimateForm) {
      estimate = await insertEstimate(addWorkOrderEstimateForm)
    }

    if (estimateTotalObj)
      estimateTotal = await insertEstimateTotal(estimateTotalObj);

    if (!estimate || !estimateTotal) {
      return res.status(400).json({ message: "Something went wrong!" });
    }
    await convertEstimateHTMLToPDF(workOrderId)
    // return res.status(200).json({ message: "Estimate created successfully." });
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
