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
        title:'Update Success',
        text: `${response.message}`,
      }).then(function() {
        window.location.href = "/dashboard";
    });
    },
    error: function (response) {
      hide_loader();
      Swal.fire({
        icon: "error",
        title:'OOPS! Something went Wrong',
        text: `${response.responseJSON.message}`,
      });
    }
  });
}
