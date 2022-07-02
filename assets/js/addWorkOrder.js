function addWorkOrderEstimateGet(workOrderId) {
  show_loader();
  $.ajax({
    type: "GET",
    url: "/addWorkOrderEstimate",
    data: { workOrderId },
    success: function (response, xhr) {
      hide_loader();
    },
    error: function (response) {
      hide_loader();
      notifyMessages("error", "Error", `${response.responseJSON.message}`);
    },
  });
}

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
      window.location.href = "/addWorkOrderEstimate?workOrderId=" + response.workOrderId
    },
    error: function (response) {
      hide_loader();
      notifyMessages("error", "Error", `${response.responseJSON.message}`);
    },
  });
}

function submitWorkOrderQuotation(event) {
  event.preventDefault();
  $("button[name='workOrderQuotationSubmitBtn']").attr("disabled", "disabled");

  show_loader();
  const addWorkOrderQuotationForm = [];

  $("#quotationGrid tbody tr").each(function (row, tr) {
    $(tr).each(function () {
      addWorkOrderQuotationForm.push({
        isChecked: $(this).find("input").val(),
        itemId: $(this).find("td:eq(0)").data("itemid"),
        itemName: $(this).find("td:eq(1)").text(),
        rate: $(this).find("td:eq(2)").text(),
        quantity: $(this).find("td:eq(3)").text(),
        amount: $(this).find("td:eq(4)").text(),
      });
    });
  });
}

function getTotal() {
  show_loader();
  let sum = 0
  $('.inputAmount').each(function () {
    sum += parseInt($(this).val() || 0);
  });
  if (!sum || sum === "") $('#grandTotal').val(0);
  $('#grandTotal').val(sum);
  hide_loader();
}

function getAmount(_this) {
  const quantity = $(_this).val();
  const amount = $(_this).data('itemrate');
  const total = amount * quantity;
  $(_this).closest('td').next('td').find('input').val(total);
}

