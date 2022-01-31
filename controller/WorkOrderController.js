const {
  userFindOne,
  userInsertOne,
  roleFindll,
  getCurrentUserDetails,
  userUpdate,
  validateEmail,
} = require("./CommonController");

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

module.exports = {
  getAddWorkOrder,
};
