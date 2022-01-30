const {
  userFindOne,
  userInsertOne,
  roleFindll,
  getCurrentUserDetails,
  userUpdate,
  validateEmail,
} = require("./CommonController");
const { sendEmail } = require("../config/email");
const uuid = require("uuid-with-v6");

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
    if (!currentUser) return res.status(400).json({ message: "Please login!" });

    const findCurrentUser = await userFindOne({ _id: currentUser._id });
    if (!findCurrentUser) return res.status(400).json("User not found!");

    const { firstName, lastName, phoneNo, email, role } = req.body.addUserForm;

    if (!firstName || !lastName || !phoneNo || !email || !role)
      return res.status(400).json("Please all mandatory fields!");

    const createUser = await userInsertOne({
      firstName,
      lastName,
      phoneNo,
      email,
      role,
    });
    if (createUser)
      return res.status(200).json({ message: "User Created Succesfully!" });
    else
      return res
        .status(400)
        .json({ message: "Something Went Wrong! Please Try Again." });
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
        .status(400)
        .json({ message: "Please fill all mandotary fields!" });
    }

    let updateMyProfileDetails = await userUpdate(
      { _id: currentUser._id },
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

const resetEmail = async (req, res) => {
  try {
    let emailObject;
    const currentUser = req.user;
    if (!currentUser) return res.status(400).json({ message: "Please login!" });

    let isEmailValidate = validateEmail(req.body.newEmail);

    if (isEmailValidate) {
      const emailResetToken = uuid.v6();
      emailObject = {
        toEmail: req.body.newEmail,
        subject: "Reset Email",
        text: `Click on the Button to reset your email to ${req.body.newEmail}.`,
        html: `<a href="http://localhost:3000/resetEmailVerify/${emailResetToken}/${req.body.newEmail}"><button type="button" class="btn btn-primary">Reset Email!</button></a>`,
      };
      const updateEmailToken = await userUpdate(
        { _id: currentUser._id },
        { emailResetToken }
      );
      if (updateEmailToken) await sendEmail(emailObject);
      return res.status(200).json({
        message: `Reset Email Verification link succesfully sent to ${req.body.newEmail} \n You will be logged out once you press OK!`,
      });
    }
  } catch (error) {
    console.error(
      "🚀 ~ file: UserController.js ~ line 129 ~ resetEmail ~ error",
      error
    );
  }
};

const resetEmailToken = async (req, res) => {
  try {
    const emailResetToken = req.params.emailResetToken;
    const newEmail = req.params.newEmail;

    if (!emailResetToken || !newEmail)
      return res
        .status(400)
        .json({ message: "Something Went Wrong! Please Try Again." });

    const findUser = await userFindOne({ emailResetToken });
    if (!findUser)
      return res
        .status(400)
        .json({ message: "Please retry your token has expired!" });

    const updateEmail = await userUpdate(
      { emailResetToken },
      { email: newEmail }
    );
    if (updateEmail)
      return res.status(200).json({ message: "Email Updated Successfully!" });
    else
      return res
        .status(400)
        .json({ message: "Something Went Wrong! Please Try Again." });
  } catch (error) {
    console.log(
      "🚀 ~ file: UserController.js ~ line 168 ~ resetEmailToken ~ error",
      error
    );
  }
};

const resetPassword = async (req, res) => {
  try {
    const currentUser = req.user;
    const postData = req.body;
    console.log(
      "🚀 ~ file: UserController.js ~ line 203 ~ resetPassword ~ postData",
      postData
    );
    if (!currentUser) return res.status(400).json({ message: "Please login!" });
  } catch (error) {
    console.log(
      "🚀 ~ file: UserController.js ~ line 203 ~ resetPassword ~ error",
      error
    );
  }
};

module.exports = {
  getAddUser,
  postAddUser,
  getMyProfile,
  updateMyProfile,
  resetEmail,
  resetEmailToken,
  resetPassword,
};
