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
const bcrypt = require("bcrypt");

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
    if (!findCurrentUser) return res.status(400).json({message:"User not found!"});

    const { firstName, lastName, phoneNo, email, role } = req.body.addUserForm;

    if (!firstName || !lastName || !phoneNo || !email || !role)
      return res.status(400).json({message:"Please all mandatory fields!"});

    const checkUserExist = await userFindOne({ email, phoneNo });
    if (checkUserExist) return res.status(400).json({message:"User already Exist!"});

    let password = "user@123";
    let hashedPassword = await bcrypt.hash(password, 8);

    const createUser = await userInsertOne({
      firstName,
      lastName,
      phoneNo,
      email,
      role,
      password: hashedPassword,
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
    if (!currentUser) return res.status(400).json({ message: "Please login!" });

    if (
      !postData.newPassword ||
      !postData.currentPassword ||
      !postData.confirmNewPassword
    )
      return res
        .status(400)
        .json({ message: "Please fill all mandatory fields!" });

    const findCurrentUserDetails = await userFindOne({ _id: currentUser._id });
    const checkPassword = await bcrypt.compare(
      postData.currentPassword,
      findCurrentUserDetails.password
    );
    if (!checkPassword)
      return res
        .status(400)
        .send({ message: "Current Password is not correct!" });

    const hashNewPassword = await bcrypt.hash(postData.newPassword, 8);
    let updateMyPassword = await userUpdate(
      { _id: currentUser._id },
      { password: hashNewPassword }
    );

    if (updateMyPassword)
      return res.status(200).json({
        message:
          "Password Updated Successfully! \n You will be logged out please use new password to login.",
      });
    else
      return res
        .status(400)
        .json({ message: "Something Went Wrong! Please Try Again." });
  } catch (error) {
    console.log(
      "🚀 ~ file: UserController.js ~ line 245 ~ resetPassword ~ error",
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
