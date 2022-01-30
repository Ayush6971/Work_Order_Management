function enableEdit() {
  $("input[name!='email']").each(function () {
    $(this).attr("disabled", false);
  });

  $("#profileFormSubmitBtn").fadeOut("fast", function () {
    $("#profileFormSubmitBtn").html(`
    <button type="submit" name="profileFormSubmit" class="btn btn-primary">Submit</button>
    `);
    $("#profileFormSubmitBtn").fadeIn("fast");
  });
}

function updateProfile(event) {
  event.preventDefault();
  $("button[name='profileFormSubmit']").attr("disabled", "disabled");
  show_loader();
  const profileForm = {};
  $.each($("#myProfileForm").serializeArray(), function () {
    profileForm[this.name] = this.value;
  });

  $.ajax({
    type: "POST",
    url: "/updateProfile",
    data: { profileForm },
    success: function (response) {
      hide_loader();
      Swal.fire({
        icon: "success",
        allowOutsideClick: false,
        title: "Update Success",
        text: `${response.message}`,
      }).then(function () {
        window.location.href = "/dashboard";
      });
    },
    error: function (response) {
      hide_loader();
      Swal.fire({
        icon: "error",
        allowOutsideClick: false,
        title: "OOPS! Something went Wrong",
        text: `${response.responseJSON.message}`,
      });
    },
  });
}

function emailChangerequest(newEmail) {
  if (newEmail === null || newEmail === "")
    return notifyMessages("error", "Error", "Email Field Can not be blank!");
  show_loader();
  $.ajax({
    type: "POST",
    url: "/resetEmail",
    data: { newEmail },
    success: function (response) {
      hide_loader();
      Swal.fire({
        icon: "success",
        allowOutsideClick: false,
        title: "Update Success",
        text: `${response.message}`,
      }).then(function (input) {
        window.location.href = "/logout";
      });
    },
    error: function (response) {
      hide_loader();
      Swal.fire({
        icon: "error",
        allowOutsideClick: false,
        title: "OOPS! Something went Wrong",
        text: `${response.responseJSON.message}`,
      });
    },
  });
}

function resetEmailPopup() {
  Swal.fire({
    icon: "info",
    allowOutsideClick: false,
    title: "Please input your new email: ",
    html: '<input name="email" type="email" value="" id="newEmailBox" class="swal2-input">',
  }).then((input) => {
    if (input.isConfirmed) {
      let newEmail = $("#newEmailBox").val();
      emailChangerequest(newEmail);
    }
  });
}

function resetPassword(currentPassword, newPassword, confirmNewPassword) {
  show_loader();
  
}

function resetPasswordPopup() {
  Swal.fire({
    icon: "info",
    allowOutsideClick: false,
    title: "Please enter following details: ",
    html: '<input name="currentPassword" type="password" id="currentPwd" class="swal2-input" placeholder="Current Password"> <br> <input name="newPassword" type="password" id="newPwd" class="swal2-input" placeholder="New Password"> <br> <input name="confirmNewPassword" type="password" id="confirmNewPwd" class="swal2-input" placeholder="Confirm New Password">',
  }).then((input) => {
    if (input.isConfirmed) {
      let currentPassword = $("#currentPwd").val();
      let newPassword = $("#newPwd").val();
      let confirmNewPassword = $("#confirmNewPwd").val();
      if (newPassword !== confirmNewPassword)
        return notifyMessages(
          "error",
          "Error",
          "New Password and Confirm Password does not match!"
        );

        $.ajax({
          type: "POST",
          url: "/resetPassword",
          data: { currentPassword, newPassword, confirmNewPassword },
          success: function (response) {
            hide_loader();
            Swal.fire({
              icon: "success",
              allowOutsideClick: false,
              title: "Update Success",
              text: `${response.message}`,
            }).then(function (input) {
              window.location.href = "/logout";
            });
          },
          error: function (response) {
            hide_loader();
            Swal.fire({
              icon: "error",
              allowOutsideClick: false,
              title: "OOPS! Something went Wrong",
              text: `${response.responseJSON.message}`,
            });
          },
        });
    }
  });
}
