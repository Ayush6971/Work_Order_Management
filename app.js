require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

const User = require('./models/user')
const createDocument = async () =>{
    try{
        const createUser = new User({
            firstName: 'Ayush',
            lastName: 'Sahu',
            phoneNo: '09406561244',
            password: '12345',
            email: 'ayushsahu76@gmail.com',
            role:1
        });
        const result = await createUser.save();
        console.info(result);
    }catch(e){
        console.error(e)
    }
}

createDocument();

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
	useUnifiedTopology: true,
  }, (err) => {
    if (!err) {
      console.log("Successfully Established Connection with MongoDB");
      
    } else {
      console.log(
        "Failed to Establish Connection with MongoDB with Error: " + err
      );
    }
  });

  
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT;

//routes
// require("./routes/r-index")(app);



app.listen(PORT, () => {
  console.log(`App is Running on the PORT ${PORT}`);
});
