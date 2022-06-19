const user = require("../models/user");
const item = require("../models/item");
const role = require("../models/role");
const bcrypt = require("bcrypt");
const { getItemByName, userFindOne, getItemCategoryByName, createItemCategory } = require("../controller/CommonController");
const itemCategories = require("../models/itemCategories");
async function createInitialData() {
  const foundRole = await role.findOne({ authority: "ROLE_SUPERADMIN" })
  if (!foundRole) {
    await role.insertMany([
      { authority: "ROLE_CUSTOMER" },
      { authority: "ROLE_ADMIN" },
      { authority: "ROLE_SUPERADMIN" },
    ]);
  }

  const findFirstUser = await userFindOne({ phoneNo: "9406561244" });
  if (!findFirstUser) {
    const findAdminRole = await role.findOne({ authority: "ROLE_SUPERADMIN" });
    let password = "admin@123";
    let hashedPassword = await bcrypt.hash(password, 8);

    await user.create({
      firstName: "Ayush",
      lastName: "Sahu",
      phoneNo: 9406561244,
      password: hashedPassword,
      email: "ayushsahu76@gmail.com",
      role: findAdminRole._id,
    });
  }

  const findFirstItem
    = await getItemByName("Borewell Digging");
  if (!findFirstItem) {
    await item.insertMany([
      { itemName: "Borewell Digging", itemRate: 150 },
      { itemName: "Casing Pipe", itemRate: 150 },
      { itemName: "Submersible Pump", itemRate: 150 },
      { itemName: "Complete Fitting Equipments", itemRate: 150 },
      { itemName: "Gravel", itemRate: 150 },
      { itemName: "Yellow Soil", itemRate: 150 },
      { itemName: "Boring Pit by JCB", itemRate: 150 },
      { itemName: "Fitting charges", itemRate: 150 },
      { itemName: "Water tankers", itemRate: 150 },
      { itemName: "Pipe Slotting Charges", itemRate: 150 },
      { itemName: "Transportation Charges", itemRate: 150 },
      { itemName: "Other/Miscellaneous Charges", itemRate: 150 },
    ]);
  }


  const getpvcPipeId = await getItemByName("Casing Pipe");
  const getpvcPipeCategoryByName = await getItemCategoryByName("5 inch")
  if (getpvcPipeId && !getpvcPipeCategoryByName) {
    const itemCategoryArray = [
      { itemId: getpvcPipeId._id, itemCategoryName: "5 inch", itemCategoryRate: 200 },
      { itemId: getpvcPipeId._id, itemCategoryName: "6 inch", itemCategoryRate: 220 },
      { itemId: getpvcPipeId._id, itemCategoryName: "7 inch", itemCategoryRate: 240 },
      { itemId: getpvcPipeId._id, itemCategoryName: "8 inch", itemCategoryRate: 280 }
    ]
    itemCategoryArray.forEach(data => {
      createItemCategory(data.itemId, data.itemCategoryName, data.itemCategoryRate)
    })
  }

  const getSubmersibleId = await getItemByName("Submersible Pump");
  const getSubmersibleCategoryByName = await getItemCategoryByName("Texmo 1hp")

  if (getSubmersibleId && !getSubmersibleCategoryByName) {
    const itemCategoryArray = [
      { itemId: getSubmersibleId._id, itemCategoryName: "Texmo 1hp", itemCategoryRate: 10000 },
      { itemId: getSubmersibleId._id, itemCategoryName: "Texmo 1.5hp", itemCategoryRate: 15000 },
      { itemId: getSubmersibleId._id, itemCategoryName: "Texmo 2hp", itemCategoryRate: 20000 },
    ]
    itemCategoryArray.forEach(data => {
      createItemCategory(data.itemId, data.itemCategoryName, data.itemCategoryRate)
    })
  }


}
createInitialData();
