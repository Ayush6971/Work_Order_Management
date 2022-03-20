require("dotenv").config({});

const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const passport = require("passport");
const session = require("express-session");
const autoIncrement = require("mongoose-auto-increment");

// Passport Config
require("./config/passport");

// Connect to MongoDB
mongoose.connect(
  process.env.DATABASE,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (!err) {
      console.log("Successfully Established Connection with MongoDB");
    } else {
      console.log(
        "Failed to Establish Connection with MongoDB with Error: " + err
      );
    }
  }
);

app.use(express.static(__dirname + "/assets"));
app.use(
  express.urlencoded({
    extended: true
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.set("views", `${__dirname}/views`);
app.set("view engine", "ejs");

const PORT = process.env.PORT;

//pre loaded data
require("./config/bootstrap");

//routes
require("./routes/r-index")(app);

require('nodemailer');

app.get("/", (req, res) => {
  res.render("login", { res: res });
});

app.listen(PORT, () => {
  console.log(`App is Running at http://localhost:${PORT}`);
});
