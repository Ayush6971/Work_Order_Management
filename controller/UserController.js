const {
  userFindOne,
  roleFindll,
  getCurrentUserDetails,
  userUpdate,
  validateEmail
} = require("./CommonController");

const getAddUser = async (req, res) => {
  try {
    const currentUser = req.user;
    if (!currentUser) return res.status(400).json({ message: "Please login!" });

    const findCurrentUserDetails = await getCurrentUserDetails(
      currentUser._id,
      "role"
    );
    res.profile = findCurrentUserDetails;

    let findAllRoles = await roleFindll();

    findAllRoles = findAllRoles
      .filter(
        (rolesData) =>
          rolesData.authority !== "ROLE_CUSTOMER" &&
          (rolesData.authority = rolesData.authority.replace("ROLE_", ""))
      )
      .map((roleData) => {
        return {
          roleID: roleData._id,
          authority: roleData.authority,
        };
      });

    return res.render("addUser", { roles: findAllRoles, res: res });
  } catch (error) {
    console.error(
      "🚀 ~ file: UserController.js ~ line 22 ~ getAddUser ~ error",
      error
    );
  }
};

const postAddUser = async (req, res) => {
  try {
    const currentUser = req.user;
    const formData = req.body;
    console.log(
      "🚀 ~ file: UserController.js ~ line 24 ~ postAddUser ~ formData",
      formData
    );

    if (!currentUser) return res.status(400).json({ message: "Please login!" });

    const findCurrentUser = await userFindOne({ _id: currentUser._id });
    if (!findCurrentUser) return res.status(400).json("User not found!");

    return res.render("/dashboard");
  } catch (error) {
    console.error(
      "🚀 ~ file: UserController.js ~ line 42 ~ getAddUser ~ error",
      error
    );
  }
};

const getMyProfile = async (req, res) => {
  try {
    const currentUser = req.user;
    if (!currentUser) return res.status(400).json({ message: "Please login!" });

    const findCurrentUserDetails = await getCurrentUserDetails(
      currentUser._id,
      "role"
    );
    res.profile = findCurrentUserDetails;
    return res.render("myProfile", {
      profileData: findCurrentUserDetails,
      res: res,
    });
  } catch (error) {
    console.error(
      "🚀 ~ file: UserController.js ~ line 64 ~ getMyProfile ~ error",
      error
    );
  }
};

const updateMyProfile = async (req, res) => {
  try {
    const currentUser = req.user;
    const formData = req.body;

    if (!currentUser) return res.status(400).json({ message: "Please login!" });
    if (formData.profileForm.email)
      return res.status(405).json({ message: "Sorry! Email is not Editable." });

    if (
      !formData.profileForm.firstName ||
      !formData.profileForm.lastName ||
      !formData.profileForm.phoneNo
    ) {
      return res
        .status(206)
        .json({ message: "Please fill all mandotary fields!" });
    }

    let updateMyProfileDetails = await userUpdate(
      currentUser._id,
      formData.profileForm
    );
    if (updateMyProfileDetails)
      return res.status(200).json({ message: "Profile Updated Successfully!" });
    else
      return res
        .status(400)
        .json({ message: "Something Went Wrong! Please Try Again." });
  } catch (error) {
    console.error(
      "🚀 ~ file: UserController.js ~ line 89 ~ updateMyProfile ~ error",
      error
    );
  }
};

const changeEmail = async (req, res) => {
  try{
    const currentUser = req.user;
    if (!currentUser) return res.status(400).json({ message: "Please login!" });

    let isEmailValidate = validateEmail(req.body.newEmail);
    console.log("🚀 ~ file: UserController.js ~ line 134 ~ changeEmail ~ validateEmail", isEmailValidate)
    
    
    
  

  } catch(error){
  console.error("🚀 ~ file: UserController.js ~ line 129 ~ changeEmail ~ error", error)

  }
}

module.exports = {
  getAddUser,
  postAddUser,
  getMyProfile,
  updateMyProfile,
  changeEmail
};
