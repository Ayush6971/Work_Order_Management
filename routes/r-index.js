const rAuth = require("./r-auth");
const rUser = require("./r-user")
const rWorkOrder = require("./r-workOrder");
const rItems = require("./r-items")

module.exports = (app) => {
  app.use("/", rAuth);
  app.use("/", rUser);
  app.use("/", rWorkOrder)
  app.use("/", rItems);
};
