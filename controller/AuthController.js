const jwt = require("jsonwebtoken");
const { userFindOne } = require('./CommonController');
const passport = require('passport');

const login = async (req, res) => {
    try{
        const postData = req.body;
        if (!postData.phoneNo || !postData.password) {
            return res
              .status(400)
              .send({ message: "Please Provide Phone number and Password" });
          }

    let findUser = await userFindOne({phoneNo: postData.phoneNo});
    if(!findUser) return res.json({status:false,message:`No user found with ${postData.phoneNo}`});
    console.log("🚀 ~ file: AuthController.js ~ line 15 ~ login ~ findUser", findUser)

      passport.authenticate('local', _onPassportAuth.bind(this, req, res))(req, res);
    }catch(error){}
}

module.exports = {
    login
}