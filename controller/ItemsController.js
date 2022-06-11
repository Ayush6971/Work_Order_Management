const { getEstimateItems, getCurrentUserDetails } = require("./CommonController");

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
        console.log("🚀 ~ file: ItemsController.js ~ line 21 ~ manageItems ~ getAllItems", getAllItems)

        return res.render("manageItems", { itemsList: getAllItems, res });


    } catch (error) {
        console.log("🚀 ~ file: ItemsController.js ~ line 21 ~ manageItems ~ error", error)
    }
}


module.exports = {
    getManageItems,
    getAllEstimateItems
}