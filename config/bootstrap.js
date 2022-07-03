const user = require("../models/user");
const item = require("../models/item");
const role = require("../models/role");
const itemCategories = require("../models/itemCategories");
const bcrypt = require("bcrypt");
const { getItemByName, userFindOne, getItemCategoryByName, createItemCategory } = require("../controller/CommonController");
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

  const findItems = await item.find()
  if (!findItems || findItems.length === 0) {
    await item.insertMany([
      { itemName: "Borewell Digging", itemRate: 160 },
      { itemName: "Casing Pipe", itemRate: 0 },
      { itemName: "Submersible Pump", itemRate: 0 },
      { itemName: "Complete Fitting Equipments", itemRate: 6000 },
      { itemName: "Gravel", itemRate: 60 },
      { itemName: "Yellow Soil", itemRate: 100 },
      { itemName: "Boring Pit by JCB", itemRate: 2000 },
      { itemName: "Fitting charges", itemRate: 200 },
      { itemName: "Water tankers", itemRate: 900 },
      { itemName: "Pipe Slotting Charges", itemRate: 250 },
      { itemName: "Transportation Charges", itemRate: 500 },
      { itemName: "Other/Miscellaneous Charges", itemRate: 0 },
    ]);
  }


  const getpvcPipeId = await getItemByName("Casing Pipe");
  const getpvcPipeCategoryByName = await itemCategories.find({ itemId: getpvcPipeId })
  if (getpvcPipeId && (!getpvcPipeCategoryByName || getpvcPipeCategoryByName.length === 0)) {
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
  const getSubmersibleCategories = await itemCategories.find({ itemId: getSubmersibleId })

  if (getSubmersibleId && (!getSubmersibleCategories || getSubmersibleCategories.length === 0)) {
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
