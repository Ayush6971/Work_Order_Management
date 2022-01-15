const rAuth = require("./r-Auth");
const rUser = require("./r-user")

module.exports = (app) => {
  app.use("/", rAuth);
  app.use("/",rUser)
};
