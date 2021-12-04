const User = require("../models/user");

const userFindOne = async (condition) => {
    let foundOne = await User.findOne(condition);
    return foundOne;
  }

  module.exports = {
      userFindOne
  }