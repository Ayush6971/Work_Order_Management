const { userFindOne, getCurrentUserDetails } = require("./CommonController");

const dashboard = async (req, res) => {
  try {
    const currentUser = req.user;
    if (!currentUser) return res.status(400).send("Please login!");

    const findCurrentUserDetails = await getCurrentUserDetails(
      currentUser._id,
      "role"
    );
    res.profile = findCurrentUserDetails;

    return res.render("dashboard", { res: res });
  } catch (error) {
    console.error(
      "🚀 ~ file: AuthController.js ~ line 29 ~ login ~ error",
      error
    );
  }
};

const logout = async (req, res) => {
  req.session.destroy();
  res.redirect("/");
};

module.exports = {
  dashboard,
  logout,
};
