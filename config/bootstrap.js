const User = require("../models/user");
const Item = require("../models/item");
const Role = require("../models/role");
const bcrypt = require("bcrypt");

Role.findOne({ authority: "ROLE_ADMIN" }).exec(async function (err, foundRole) {
  if (!foundRole) {
    await Role.insertMany([
      { authority: "ROLE_CUSTOMER" },
      { authority: "ROLE_ADMIN" },
      { authority: "ROLE_SUPERADMIN" },
    ]);
  }
});

User.findOne({ phoneNo: "9406561244" }).exec(async function (
  err,
  findFirstUser
) {
  const findAdminRole = await Role.findOne({ authority: "ROLE_SUPERADMIN" });
  if (!findFirstUser) {
    let password = "admin@123";
    let hashedPassword = await bcrypt.hash(password, 8);

    await User.insertMany([
      {
        firstName: "Ayush",
        lastName: "Sahu",
        phoneNo: 9406561244,
        password: hashedPassword,
        email: "ayushsahu76@gmail.com",
        role: findAdminRole._id,
      },
    ]);
  }
});

Item.findOne({ itemName: "Borewell Digging" }).exec(async function (
  err,
  findFirstItem
) {
  if (!findFirstItem) {
    await Item.insertMany([
      { itemName: "Borewell Digging" },
      { itemName: "Casing Pipe" },
      { itemName: "Submersible Pump" },
      { itemName: "HDPE Pipe" },
      { itemName: "Fitting Equipments" },
      { itemName: "Gravel" },
      { itemName: "Yellow Soil" },
      { itemName: "Boring Pit by JCB" },
      { itemName: "Fitting charges" },
      { itemName: "Water tankers" },
      { itemName: "Pipe Slotting Charges" },
      { itemName: "Transportation Charges" },
      { itemName: "Other/Miscellaneous Charges" },
    ]);
  }
});
