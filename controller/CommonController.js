const user = require("../models/user");
const role = require("../models/role");
const workOrder = require("../models/workOrder");
const item = require("../models/item");
const itemCategories = require("../models/itemCategories");
const userInsertOne = async (userObject) => {
  return await user.create(userObject);
};

const userFindOne = async (condition, populate = null) => {
  if (populate) return await user.findOne(condition).populate(populate);

  return await user.findOne(condition);
};

const userUpdate = async (condition, updateObject) => {
  return await user.updateOne(
    condition,
    { $set: updateObject },
    { upsert: true }
  );
};

const roleFindll = async () => {
  return await role.find();
};

const getCurrentUserDetails = async (_id, populate) => {
  const findCurrentUser = await userFindOne({ _id }, populate);
  if (!findCurrentUser) return "user not found!";
  let profile = {
    firstName: findCurrentUser.firstName,
    lastName: findCurrentUser.lastName,
    email: findCurrentUser.email,
    role: findCurrentUser.role.authority.replace("ROLE_", ""),
    phoneNo: findCurrentUser.phoneNo,
  };

  return profile ? profile : null;
};

const validateEmail = (email) => {
  return email.match(/^\w+([\.-]?\w+)+@\w+([\.:]?\w+)+(\.[a-zA-Z0-9]{2,3})+$/)
    ? true
    : false;
};

const createWorkOrder = async (createObject) => {
  return await workOrder.create(createObject);
};

const getEstimateItems = async () => {
  let getAllItems = await item.find().populate('itemCategories');
  getAllItems = getAllItems.map((itemData) => {
    return {
      itemId: itemData._id,
      itemName: itemData.itemName,
      itemRate: itemData.itemRate,
      isDisabled: itemData.isDisabled,
      itemCategories: itemData.itemCategories.sort() || null,
    };
  });

  return getAllItems;
};

const getWorkOrderDetails = async (_id) => {
  return await workOrder.findOne({ _id })
}

const capitalizeFirstLetter = async (string) => {
  return await string.charAt(0).toUpperCase() + string.slice(1);
}

const getItemByName = async (itemName) => {
  return await item.findOne({ itemName })
}

const getItemById = async (_id) => {
  return await item.findOne({ _id })
}

const updateItems = async (_id, updateObject) => {
  return await item.findByIdAndUpdate({ _id }, updateObject, { new: true, upsert: true });
}

const getItemCategoryByName = async (itemCategoryName) => {
  return await itemCategories.findOne({ itemCategoryName })
}

const createItemCategory = async (itemId, itemCategoryName, itemCategoryRate) => {
  const createItemCategory = await itemCategories.create({ itemId, itemCategoryName, itemCategoryRate })
  return await item.findByIdAndUpdate({ _id: itemId },
    { $push: { itemCategories: createItemCategory.id } }, { new: true, upsert: true })
}
const getAllItemCategoriesByItemId = async (itemId) => {
  return await itemCategories.find({ itemId });
}

const updateItemCategories = async (_id, updateObject) => {
  return await itemCategories.findByIdAndUpdate({ _id }, updateObject, { new: true, upsert: true })
}

const deleteItemCategories = async (_id) => {
  return await itemCategories.findByIdAndDelete({ _id })
}

module.exports = {
  userFindOne,
  userInsertOne,
  userUpdate,
  roleFindll,
  getCurrentUserDetails,
  validateEmail,
  createWorkOrder,
  getEstimateItems,
  getWorkOrderDetails,
  capitalizeFirstLetter,
  getItemByName,
  getItemCategoryByName,
  createItemCategory,
  updateItems,
  getItemById,
  getAllItemCategoriesByItemId,
  updateItemCategories,
  deleteItemCategories
};
