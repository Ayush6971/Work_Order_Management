const rAuth = require("./r-Auth");

module.exports = (app) => {
  app.use("/", rAuth);
};
