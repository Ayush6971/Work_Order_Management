const { userFindOne } = require("./CommonController");

const dashboard = async (req, res) => {
  try {
    const currentUser = req.user;
    if (!currentUser) return res.status(400).send("Please login!");

    const findCurrentUser = await userFindOne({ id: currentUser.id });
    if (!findCurrentUser) return res.status(400).send("User not found!");

    return res.render('dashboard')
  } catch (error) {
    console.log(
      "🚀 ~ file: AuthController.js ~ line 29 ~ login ~ error",
      error
    );
  }
};

module.exports = {
  dashboard,
};
