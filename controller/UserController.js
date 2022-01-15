const { userFindOne,roleFindll } = require("./CommonController");

const getAddUser = async (req, res) => {
  try {
    const currentUser = req.user;
    if (!currentUser) return res.status(400).send("Please login!");

    const findCurrentUser = await userFindOne({ id: currentUser.id });
    if (!findCurrentUser) return res.status(400).send("User not found!");

    const findAllRoles = await roleFindll();
    
    return res.render("addUser",findAllRoles);
  } catch (error) {
    console.log(
      "🚀 ~ file: UserController.js ~ line 13 ~ getAddUser ~ error",
      error
    );
  }
};

const postAddUser = async (req, res) => {
    try {
        const currentUser = req.user;
        const formData = req.body;
        console.log("🚀 ~ file: UserController.js ~ line 24 ~ postAddUser ~ formData", formData)

        if (!currentUser) return res.status(400).send("Please login!");
    
        const findCurrentUser = await userFindOne({ id: currentUser.id });
        if (!findCurrentUser) return res.status(400).send("User not found!");
    
        return res.render("addUser");
      } catch (error) {
        console.log(
          "🚀 ~ file: UserController.js ~ line 13 ~ getAddUser ~ error",
          error
        );
      }

}

module.exports = {
    getAddUser,
    postAddUser
};
