const User = require("../models/user");
const Role = require("../models/role");

const userFindOne = async (condition, populate = null) => {
  if (populate) return await User.findOne(condition).populate(populate);

  return await User.findOne(condition);
};

const roleFindll = async () => {
  return await Role.find();
};

module.exports = {
  userFindOne,
  roleFindll
};
