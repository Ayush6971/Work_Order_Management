const { getEstimateItems, getCurrentUserDetails, updateItems, getAllItemCategoriesByItemId, updateItemCategories, deleteItemCategories, createItemCategory, getItemCategoryById } = require("./CommonController");

const getAllEstimateItems = async (req, res) => {
    const getAllItems = await getEstimateItems();
    return res.status(200).json({ status: true, getAllItems });
};

const getManageItems = async (req, res) => {
    try {
        const currentUser = req.user;
        if (!currentUser) return res.status(400).json({ message: "Please login!" });

        const findCurrentUserDetails = await getCurrentUserDetails(
            currentUser._id,
            "role"
        );
        res.profile = findCurrentUserDetails;

        const getAllItems = await getEstimateItems();
        if (!getAllItems) res.status(404).json({ message: "Something went wrong, Items not found!" });
        const disabledItems = getAllItems.filter(item => item.isDisabled).map((currentValue, index) => {
            currentValue.serialNumber = index + 1;
            return currentValue;
        });;
        const enabledItems = getAllItems.filter(item => !item.isDisabled).map((currentValue, index) => {
            currentValue.serialNumber = index + 1;
            return currentValue;
        });

        return res.render("manageItems", { itemsList: getAllItems, disabledItems, enabledItems, res });


    } catch (error) {
        console.error("🚀 ~ file: ItemsController.js ~ line 21 ~ manageItems ~ error", error)
    }
}

const updateItem = async (req, res) => {
    try {
        const currentUser = req.user;
        const { updateItemForm } = req.body;
        if (!currentUser) return res.status(400).json({ message: "Please login!" });

        const { itemId, itemName, itemRate } = updateItemForm;
        const updateItemResult = await updateItems(itemId, { itemName, itemRate });
        if (!updateItemResult) return res.status(400).json({ message: "Unable to update item." });
        return res.status(200).json({ status: true, message: 'Item Updated successfully', updatedItem: updateItemResult });
    } catch (error) {
        console.error("🚀 ~ file: ItemsController.js ~ line 21 ~ updateItem ~ error", error)
    }
}

const disableItem = async (req, res) => {
    try {
        const currentUser = req.user;
        const { itemId } = req.body;
        if (!currentUser) return res.status(400).json({ message: "Please login!" });
        const updateItemResult = await updateItems(itemId, { isDisabled: true });
        if (!updateItemResult) return res.status(400).json({ message: "Unable to disable item." });
        return res.status(200).json({ status: true, message: 'Item Disabled successfully', updatedItem: updateItemResult });
    } catch (error) {
        console.error("🚀 ~ file: ItemsController.js ~ line 21 ~ updateItem ~ error", error)
    }
}

const enableItem = async (req, res) => {
    try {
        const currentUser = req.user;
        const { itemId } = req.body;
        if (!currentUser) return res.status(400).json({ message: "Please login!" });
        const updateItemResult = await updateItems(itemId, { isDisabled: false });
        if (!updateItemResult) return res.status(400).json({ message: "Unable to disable item." });
        return res.status(200).json({ status: true, message: 'Item Enabled successfully', updatedItem: updateItemResult });
    } catch (error) {
        console.error("🚀 ~ file: ItemsController.js ~ line 21 ~ updateItem ~ error", error)
    }
}

const addItemCategory = async (req, res) => {
    try {
        const currentUser = req.user;
        const { addItemCategoryForm } = req.body;
        if (!currentUser) return res.status(400).json({ message: "Please login!" });
        const { itemId, itemCategoryName, itemCategoryRate } = addItemCategoryForm;
        const addItemCategoryResult = await createItemCategory(itemId, itemCategoryName, itemCategoryRate);
        if (!addItemCategoryResult) return res.status(400).json({ message: "Unable to update item." });
        return res.status(200).json({ status: true, message: 'Item Category Created successfully' });
    } catch (error) {
        console.error("🚀 ~ file: ItemsController.js ~ line 118 ~ addItemCategory ~ error", error)
    }
}

const getItemCategories = async (req, res) => {
    try {

        const currentUser = req.user;
        if (!currentUser) return res.status(400).json({ message: "Please login!" });

        const { itemId } = req.query;

        const getAllItemCategories = await getAllItemCategoriesByItemId(itemId)
        return res.status(200).json({ status: true, itemCategories: getAllItemCategories });

    } catch (error) {
        console.error("🚀 ~ file: ItemsController.js ~ line 103 ~ getItemCategories ~ error", error)
    }
}

const updateItemCategory = async (req, res) => {
    try {
        const currentUser = req.user;
        const { updateItemCategoryForm } = req.body;

        if (!currentUser) return res.status(400).json({ message: "Please errorin!" });
        const { itemCategoryId, itemCategoryName, itemCategoryRate } = updateItemCategoryForm;
        const updateItemCategoryResult = await updateItemCategories(itemCategoryId, { itemCategoryName, itemCategoryRate });
        if (!updateItemCategoryResult) return res.status(400).json({ message: "Unable to update item." });
        return res.status(200).json({ status: true, message: 'Item Category Updated successfully' });
    } catch (error) {
        console.error("🚀 ~ file: ItemsController.js ~ line 118 ~ updateItemCategory ~ error", error)
    }
}

const deleteItemCategory = async (req, res) => {
    try {
        const currentUser = req.user;
        const { itemCategoryId } = req.body;
        if (!currentUser) return res.status(400).json({ message: "Please errorin!" });
        const deleteItemCategoryResult = await deleteItemCategories(itemCategoryId);
        if (!deleteItemCategoryResult) return res.status(400).json({ message: "Unable to Delete Item Category" })
        return res.status(200).json({ status: true, message: 'Item Category Deleted successfully' });
    } catch (error) {
        console.error("🚀 ~ file: ItemsController.js ~ line 126 ~ deleteItemCategory ~ error", error)
    }
}

const getItemCategoryAmount = async (req, res) => {
    try {

        const currentUser = req.user;
        if (!currentUser) return res.status(400).json({ message: "Please login!" });

        const { itemCategoryId } = req.query;

        const getItemCategoryDetails = await getItemCategoryById(itemCategoryId)
        return res.status(200).json({ status: true, itemCategoryAmount: getItemCategoryDetails.itemCategoryRate });

    } catch (error) {
        console.error("🚀 ~ file: ItemsController.js ~ line 103 ~ getItemCategories ~ error", error)
    }
}

module.exports = {
    getManageItems,
    getAllEstimateItems,
    updateItem,
    disableItem,
    enableItem,
    addItemCategory,
    getItemCategories,
    updateItemCategory,
    deleteItemCategory,
    getItemCategoryAmount
}