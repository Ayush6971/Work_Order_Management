const User = require("../models/user");

const userFindOne = async (condition, populate = null) => {
  if (populate) return await User.findOne(condition).populate(populate);

  return await User.findOne(condition);
};

module.exports = {
  userFindOne,
};
