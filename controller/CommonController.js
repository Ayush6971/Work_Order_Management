const user = require("../models/user");
const role = require("../models/role");
const workOrder = require("../models/workOrder");

const userInsertOne = async (userObject) => {
  return await user.create(userObject);
};

const userFindOne = async (condition, populate = null) => {
  if (populate) return await user.findOne(condition).populate(populate);

  return await user.findOne(condition);
};

const userUpdate = async (condition, updateObject) => {
  return await user.updateOne(
    condition,
    { $set: updateObject },
    { upsert: true }
  );
};

const roleFindll = async () => {
  return await role.find();
};

const getCurrentUserDetails = async (userId, populate) => {
  const findCurrentUser = await userFindOne({ _id: userId }, populate);
  if (!findCurrentUser) return "user not found!";
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

const createWorkOrder = async (createObject) => {
  return await workOrder.create(createObject)
}

module.exports = {
  userFindOne,
  userInsertOne,
  userUpdate,
  roleFindll,
  getCurrentUserDetails,
  validateEmail,
  createWorkOrder
};
