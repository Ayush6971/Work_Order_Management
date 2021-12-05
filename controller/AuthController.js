const jwt = require("jsonwebtoken");
const { userFindOne } = require('./CommonController');
const passport = require('passport');

const login = async (req, res, next) => {
    try{
        const postData = req.body;
        if (!postData.phoneNo || !postData.password) {
            return res
              .status(400)
              .send({ message: "Please Provide Phone number and Password" });
          }
        
          console.log("🚀 ~ file: AuthController.js ~ line 8 ~ login ~ postData", postData)
          passport.authenticate('local', { failureRedirect: '/' })

    }catch(error){}
}

module.exports = {
    login
}