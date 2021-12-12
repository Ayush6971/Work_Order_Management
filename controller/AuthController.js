const { userFindOne } = require('./CommonController');

const dashboard = async (req, res) => {
    try{
        const currentUser = req.user;
        if(!currentUser) return res.status(400).send('Please login!');

        const findCurrentUser = await userFindOne({id:  currentUser.id});
        if(!findCurrentUser) return res.status(400).send('User not found!');

         return res.status(200).send('<p>You successfully logged in. --> <a href="/protected-route">Go to protected route</a></p>');
    }catch(error){
    console.log("🚀 ~ file: AuthController.js ~ line 29 ~ login ~ error", error)
    }
}

module.exports = {
    dashboard
}