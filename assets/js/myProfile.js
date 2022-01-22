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

function emailChangerequest(newEmail){
  // show_loader();
  $.ajax({
    type: "POST",
    url: "/changeEmail",
    data: { newEmail },
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

function openInputPopup(){
  Swal.fire({        
    icon:'info',
    title: "Please input your new email: ",
    html:
    '<input name="email" type="email" value="" id="newEmailBox" class="swal2-input">',
  }).then((input) => {
    if (input.isConfirmed) {
      let newEmail = $('#newEmailBox').val();
      emailChangerequest(newEmail)
    }  
  })
}

function resetEmailAlert() {
  swal.fire({
    icon: "question",
    title:'Are you sure you want to reset your email?',
    showCancelButton: true,
    confirmButtonColor: '#198753',
    cancelButtonColor: '#d33',
    confirmButtonText:'<i class="fa fa-thumbs-up"></i> Yes!',
    cancelButtonText:
    '<i class="fa fa-thumbs-down"></i> Cancel',
  }).then((result) => {
    if (result.isConfirmed) {
     openInputPopup()
    }
  })
  
}
