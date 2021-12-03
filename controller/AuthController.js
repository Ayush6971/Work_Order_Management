const models = require("../models");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
    try{
        const postData = req.body;
        if (!postData.phoneNo || !postData.password) {
            return res
              .status(400)
              .send({ message: "Please Provide Phone number and Password" });
          }

    }catch(error){}
}

module.exports = {
    login
}