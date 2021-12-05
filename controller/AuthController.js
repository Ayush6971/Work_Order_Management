const jwt = require("jsonwebtoken");
const { userFindOne } = require('./CommonController');
const passport = require('passport');

const login = async (req, res) => {
    try{
        const postData = req.body;
        console.log("🚀 ~ file: AuthController.js ~ line 8 ~ login ~ postData", req.user)
        if (!postData.email || !postData.password) {
            return res
              .status(400)
              .send({ message: "Please Provide Phone number and Password" });
        }
         return res.status(200).send('<p>You successfully logged in. --> <a href="/protected-route">Go to protected route</a></p>');
    }catch(error){
    console.log("🚀 ~ file: AuthController.js ~ line 29 ~ login ~ error", error)
    }
}

module.exports = {
    login
}