function addWorkOrderBasic(event) {
  event.preventDefault();
  $("button[name='workOrderBasicSubmitBtn']").attr("disabled", "disabled");
  show_loader();
  const workOrderBasicForm = {};
  $.each($("#addWorkOrderBaiscForm").serializeArray(), function () {
    workOrderBasicForm[this.name] = this.value;
  });

  $.ajax({
    type: "POST",
    url: "/addWorkOrderBasic",
    data: { workOrderBasicForm },
    success: function (response) {
      hide_loader();
      Swal.fire({
        icon: "success",
        allowOutsideClick: false,
        title: "Update Success",
        text: `${response.message}`,
      }).then(function () {
        // window.location.href = "/dashboard";
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
