const { getCurrentUserDetails } = require("./CommonController");

const getAddWorkOrder = async (req, res) => {
  try {
    const currentUser = req.user;
    if (!currentUser) return res.status(400).json({ message: "Please login!" });
    const findCurrentUserDetails = await getCurrentUserDetails(
      currentUser._id,
      "role"
    );
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
    if (!findCurrentUserDetails) return res.status(400).json("User not found!");

    res.profile = findCurrentUserDetails;

    const { name, presentAddress, workOrderAddress, phoneNo, advance, workOrderDate } =
      req.body.addUserForm;

    if (
      !name ||
      !presentAddress ||
      !workOrderAddress ||
      !phoneNo ||
      !advance ||
      !workOrderDate
    )
      return res.status(400).json("Please all mandatory fields!");

    const createWorkOrder = await createWorkOrder({
      name,
      presentAddress,
      workOrderAddress,
      phoneNo,
      advance: advance ? advance : null,
      workOrderDate,
    });

    if (createWorkOrder)
      return res.render("workOrderEstimate", {
        res: res,
      });
    else
      return res
        .status(400)
        .json({ message: "Something Went Wrong! Please Try Again." });
  } catch (error) {}
};

module.exports = {
  getAddWorkOrder,
  addWorkOrderBasic,
};
