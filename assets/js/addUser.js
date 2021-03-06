function addUserPost(event) {
  event.preventDefault();
  show_loader();
  const addUserForm = {};
  $.each($("#addUserForm").serializeArray(), function () {
    addUserForm[this.name] = this.value;
  });

  $.ajax({
    type: "POST",
    url: "/addUserPost",
    data: { addUserForm },
    success: function (response) {
      hide_loader();
      Swal.fire({
        icon: "success",
        title: "Success",
        allowOutsideClick: false,
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
        text: `${response.responseJSON}`,
      });
    },
  });
}
