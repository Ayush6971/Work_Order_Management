const User = require("../models/user");
const Role = require("../models/role");

const userInsertOne = async (userObject) => {
  return await User.create(userObject);
};

const userFindOne = async (condition, populate = null) => {
  if (populate) return await User.findOne(condition).populate(populate);

  return await User.findOne(condition);
};

const userUpdate = async (condition, updateObject) => {
  return await User.updateOne(
    condition,
    { $set: updateObject },
    { upsert: true }
  );
};

const roleFindll = async () => {
  return await Role.find();
};

const getCurrentUserDetails = async (userId, populate) => {
  const findCurrentUser = await userFindOne({ _id: userId }, populate);
  if (!findCurrentUser) return "User not found!";
  let profile = {
    firstName: findCurrentUser.firstName,
    lastName: findCurrentUser.lastName,
    email: findCurrentUser.email,
    role: findCurrentUser.role.authority.replace("ROLE_", ""),
    phoneNo: findCurrentUser.phoneNo,
  };

  return profile ? profile : null;
};

const validateEmail = (email) => {
  return email.match(/^\w+([\.-]?\w+)+@\w+([\.:]?\w+)+(\.[a-zA-Z0-9]{2,3})+$/)
    ? true
    : false;
};

module.exports = {
  userFindOne,
  userInsertOne,
  userUpdate,
  roleFindll,
  getCurrentUserDetails,
  validateEmail,
};
