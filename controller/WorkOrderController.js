const {
  getCurrentUserDetails,
  createWorkOrder,
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
    return res.render("addWorkOrder", { res: res });
  } catch (error) {
    console.log(
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
      name,
      presentAddress,
      workOrderAddress,
      phoneNo,
      advance,
      workOrderDate,
    } = req.body.workOrderBasicForm;

    if (
      !name ||
      !presentAddress ||
      !workOrderAddress ||
      !phoneNo ||
      // !advance ||
      !workOrderDate
    )
      return res
        .status(400)
        .json({ message: "Please Fill all mandatory fields!" });

    const createWorkOrderBasic = await createWorkOrder({
      name,
      presentAddress,
      workOrderAddress,
      phoneNo,
      advanceAmount: advance ? advance : null,
      workOrderDate,
    });
    if (createWorkOrderBasic){
      return res.status(200).json({ message: "Work Order Basic Added." });
    }
    else
      return res
        .status(400)
        .json({ message: "Something Went Wrong! Please Try Again." });
  } catch (error) {
    console.log(
      "🚀 ~ file: WorkOrderController.js ~ line 81 ~ addWorkOrderBasic ~ error",
      error
    );
  }
};

const addWorkOrderEstimate = async (req, res) => {
console.log("🚀 ~ file: WorkOrderController.js ~ line 88 ~ addWorkOrderEstimate ~ req", req.method)
  try{
    if(req.method === 'GET'){
    const currentUser = req.user;
    
    if (!currentUser) return res.status(400).json({ message: "Please login!" });
    const findCurrentUserDetails = await getCurrentUserDetails(
      currentUser._id,
      "role"
    );
    
    if (!findCurrentUserDetails)
    return res.status(400).json({ message: "User not found!" });
    
    res.profile = findCurrentUserDetails;
    return res.render("workOrderEstimate", { res: res });
    }else if(req.method === 'POST'){
console.log("2323232")
    }
  }catch(error){
  }

}

module.exports = {
  getAddWorkOrder,
  addWorkOrderBasic,
  addWorkOrderEstimate
};
