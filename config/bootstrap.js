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

    await User.create({
        firstName: "Ayush",
        lastName: "Sahu",
        phoneNo: 9406561244,
        password: hashedPassword,
        email: "ayushsahu76@gmail.com",
        role: findAdminRole._id,
      });
  }
});

Item.findOne({ itemName: "Borewell Digging" }).exec(async function (
  err,
  findFirstItem
) {
  if (!findFirstItem) {
    await Item.insertMany([
      { itemName: "Borewell Digging", rate: 150},
      { itemName: "Casing Pipe", rate: 150 },
      { itemName: "Submersible Pump",rate: 150 },
      { itemName: "Complete Fitting Equipments",rate: 150 },
      { itemName: "Gravel",rate: 150},
      { itemName: "Yellow Soil",rate: 150 },
      { itemName: "Boring Pit by JCB",rate: 150 },
      { itemName: "Fitting charges",rate: 150 },
      { itemName: "Water tankers",rate: 150 },
      { itemName: "Pipe Slotting Charges",rate: 150 },
      { itemName: "Transportation Charges",rate: 150 },
      { itemName: "Other/Miscellaneous Charges",rate: 150 },
    ]);
  }
});
