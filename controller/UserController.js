const { userFindOne, roleFindll } = require("./CommonController");

const getAddUser = async (req, res) => {
  try {
    const currentUser = req.user;
    if (!currentUser) return res.status(400).send("Please login!");

    const findCurrentUser = await userFindOne({ id: currentUser.id });
    if (!findCurrentUser) return res.status(400).send("User not found!");
    res.profile = findCurrentUser;
    let findAllRoles = await roleFindll();
    findAllRoles = findAllRoles.filter(
      (data) => data.authority !== "ROLE_CUSTOMER"
    );
    findAllRoles = findAllRoles.map((roleData) => {
      return {
        roleID: roleData._id,
        authority: roleData.authority,
      };
    });
    return res.render("addUser", { roles: findAllRoles, res: res });
  } catch (error) {
    console.log(
      "🚀 ~ file: UserController.js ~ line 22 ~ getAddUser ~ error",
      error
    );
  }
};

const postAddUser = async (req, res) => {
  try {
    const currentUser = req.user;
    const formData = req.body;
    console.log(
      "🚀 ~ file: UserController.js ~ line 24 ~ postAddUser ~ formData",
      formData
    );

    if (!currentUser) return res.status(400).send("Please login!");

    const findCurrentUser = await userFindOne({ id: currentUser.id });
    if (!findCurrentUser) return res.status(400).send("User not found!");

    return res.render("addUser");
  } catch (error) {
    console.log(
      "🚀 ~ file: UserController.js ~ line 42 ~ getAddUser ~ error",
      error
    );
  }
};

module.exports = {
  getAddUser,
  postAddUser,
};
