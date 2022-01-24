const {
  userFindOne,
  roleFindll,
  getCurrentUserDetails,
  userUpdate,
  validateEmail,
} = require("./CommonController");

const { sendEmail } = require("../config/email");

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
      {_id:currentUser._id},
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
    console.log(
      "🚀 ~ file: UserController.js ~ line 134 ~ resetEmail ~ validateEmail",
      isEmailValidate
    );

    if (isEmailValidate) {
      const resetEmailToken = "uuid.v4()";
      emailObject = {
        toEmail: req.body.newEmail,
        subject: "Reset Email",
        text: `Click on the Button to reset your email to ${req.body.newEmail}.`,
        html: `<a href="http://localhost:3000/resetEmail/${resetEmailToken}/${req.body.newEmail}"><button type="button" class="btn btn-primary">Reset Email!</button></a>`,
      };
      console.log(
        "🚀 ~ file: UserController.js ~ line 143 ~ resetEmail ~ emailObject",
        emailObject
      );

      // await sendEmail(toEmail, subject, text, html);
      await sendEmail(emailObject);
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
    console.log("🚀 ~ file: UserController.js ~ line 167 ~ resetEmailToken ~ req.body", req.param)

    const emailResetToken = req.body.resetEmailToken,
      newEmail = req.body.newEmail;

    if (!emailResetToken || !newEmail)
      return res.status(400).json({ message: "Something Went Wrong! Please Try Again." });

    const findUser = await userFindOne({ emailResetToken: emailResetToken });
    if (!findUser)
      return res
        .status(400)
        .json({ message: "Please retry your token has expired!" });

    const updateEmail = await userUpdate({ emailResetToken: emailResetToken },{email: newEmail})

  } catch (error) {
    console.log(
      "🚀 ~ file: UserController.js ~ line 168 ~ resetEmailToken ~ error",
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
};
