function addWorkOrderBasic(event) {
  console.log("🚀 ~ file: addWorkOrder.js ~ line 2 ~ addWorkOrderBasic ~ event", event)
  event.preventDefault();
  $("button[name='workOrderBasicSubmitBtn']").attr("disabled", "disabled");
//   show_loader();
  const workOrderBasicForm = {};
  $.each($("#addWorkOrderBaiscForm").serializeArray(), function () {
    workOrderBasicForm[this.name] = this.value;
  });
  console.log("🚀 ~ file: addWorkOrder.js ~ line 7 ~ addWorkOrderBasic ~ workOrderBasicForm", workOrderBasicForm)

  $.ajax({
    type: "POST",
    url: "/addWorkOrderBasic",
    data: { workOrderBasicForm },
    success: function (response) {
      hide_loader();
      Swal.fire({
        icon: "success",
        allowOutsideClick: false,
        title: "Success",
        text: `${response.message}`,
      }).then(function () {
        // window.location.href = "/dashboard";
      });
    },
    error: function (response) {
      hide_loader();
       notifyMessages(
        "error",
        "Error",
        `${response.responseJSON.message}`)
    },
  });
}
