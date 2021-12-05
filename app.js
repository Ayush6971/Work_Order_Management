require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const passport = require('passport');
const passport_local = require('passport-local');

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

  

const PORT = process.env.PORT;

//routes
require("./routes/r-index")(app);

//pre loaded data
require('./config/bootstrap')

require('./config/passport')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());



app.listen(PORT, () => {
  console.log(`App is Running at http://localhost:${PORT}`);
});
