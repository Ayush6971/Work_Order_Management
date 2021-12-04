require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");


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
require("./routes/r-index")(app);

//pre loaded data
require('./config/bootstrap')



app.listen(PORT, () => {
  console.log(`App is Running at http://localhost:${PORT}`);
});
