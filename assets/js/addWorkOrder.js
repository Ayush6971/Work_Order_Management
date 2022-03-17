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
      window.location.href = "/addWorkOrderQuotation";
    },
    error: function (response) {
      hide_loader();
      notifyMessages("error", "Error", `${response.responseJSON.message}`);
    },
  });
}
