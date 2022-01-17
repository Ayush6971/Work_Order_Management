const { userFindOne } = require("./CommonController");

const dashboard = async (req, res) => {
  try {
    const currentUser = req.user;
    if (!currentUser) return res.status(400).send("Please login!");

    const findCurrentUser = await userFindOne({ id: currentUser.id },'role');
    console.log("🚀 ~ file: AuthController.js ~ line 9 ~ dashboard ~ findCurrentUser", findCurrentUser)
    if (!findCurrentUser) return res.status(400).send("User not found!");
    res.profile = findCurrentUser;
    return res.render('dashboard',{res: res})
  } catch (error) {
    console.log(
      "🚀 ~ file: AuthController.js ~ line 29 ~ login ~ error",
      error
    );
  }
};

const logout = async (req, res) => {
    req.session.destroy();
    res.redirect("/");
}

module.exports = {
  dashboard,
  logout
};
