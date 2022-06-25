const { getEstimateItems, getCurrentUserDetails, updateItems, getAllItemCategoriesByItemId } = require("./CommonController");

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

        const findCurrentUserDetails = await getCurrentUserDetails(
            currentUser._id,
            "role"
        );
        res.profile = findCurrentUserDetails;
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

        const findCurrentUserDetails = await getCurrentUserDetails(
            currentUser._id,
            "role"
        );
        res.profile = findCurrentUserDetails;
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

        const findCurrentUserDetails = await getCurrentUserDetails(
            currentUser._id,
            "role"
        );
        res.profile = findCurrentUserDetails;
        const updateItemResult = await updateItems(itemId, { isDisabled: false });
        if (!updateItemResult) return res.status(400).json({ message: "Unable to disable item." });
        return res.status(200).json({ status: true, message: 'Item Enabled successfully', updatedItem: updateItemResult });
    } catch (error) {
        console.error("🚀 ~ file: ItemsController.js ~ line 21 ~ updateItem ~ error", error)
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
    }
}
module.exports = {
    getManageItems,
    getAllEstimateItems,
    updateItem,
    disableItem,
    enableItem,
    getItemCategories
}