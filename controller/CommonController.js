const User = require("../models/user");
const Role = require("../models/role");

const userFindOne = async (condition, populate = null) => {
  if (populate) return await User.findOne(condition).populate(populate);

  return await User.findOne(condition);
};

const roleFindll = async () => {
  return await Role.find();
};

const getCurrentUserDetails = async (userId, populate) => {
  const findCurrentUser = await userFindOne({ id: userId }, populate);
  if (!findCurrentUser) return "User not found!";
  let profile = {
    firstName: findCurrentUser.firstName,
    lastName: findCurrentUser.lastName,
    email: findCurrentUser.email,
    role: findCurrentUser.role.authority,
    phoneNo: findCurrentUser.phoneNo,
  };

  return profile ? profile : null;
};

module.exports = {
  userFindOne,
  roleFindll,
  getCurrentUserDetails,
};
