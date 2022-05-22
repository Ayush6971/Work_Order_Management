const { getAllEstimateItems, getCurrentUserDetails } = require("./CommonController");

const getAllItems = (req, res) => {
    try {
        const currentUser = req.user;
        if (!currentUser) return res.status(400).json({ message: "Please login!" });

        const findCurrentUserDetails = await getCurrentUserDetails(
            currentUser._id,
            "role"
        );
        res.profile = findCurrentUserDetails;

        const getAllItems = await getAllEstimateItems();
        if (!getAllItems) res.status(404).json({ message: "Something went wrong, Items not found!" });

        return res.status(200).json({ itemsList: getAllItems });


    } catch (error) {

    }
}


module.exports = {
    getAllItems
}