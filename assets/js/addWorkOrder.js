function getWorkOrderEstimate(workOrderId) {
  show_loader();
  $.ajax({
    type: "GET",
    url: "/getWorkOrderEstimate",
    data: { workOrderId },
    success: function (response, xhr) {
      hide_loader();
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
      window.location.href = "/getWorkOrderEstimate?workOrderId=" + response.workOrderId
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

function submitWorkOrderEstimate(event) {
  event.preventDefault();
  // const addWorkOrderEstimateForm = [];
  // $("#estimateGrid tbody tr").each(function (row, tr) {
  //   $(tr).each(function () {
  //     const itemId = $(this).find("td:eq(0)").data("itemid");
  //     if (itemId) {
  //       addWorkOrderEstimateForm.push({
  //         workOrderId: $('#workOrderId').val(),
  //         itemId,
  //         itemName: $(this).find("td:eq(1)").find('b').html().trim(),
  //         rate: parseInt($(this).find("td:eq(2)").text() || 0),
  //         quantity: parseInt($(this).find("td:eq(3)").find('input').val() || 0),
  //         amount: parseInt($(this).find("td:eq(4)").find('input').val() || 0),
  //       });
  //     }
  //   });
  // });
  // console.log("🚀 ~ file: addWorkOrder.js ~ line 65 ~ addWorkOrderEstimateForm", addWorkOrderEstimateForm)


  const grandTotal = $('#grandTotal').val();
  if (!grandTotal || grandTotal < 0) {
    Swal.fire({
      icon: "error",
      title: "Error",
      allowOutsideClick: false,
      text: 'Total Amount of the Bill is Empty! Please click on Get Total button for Total Amount.',
    })
    return false;
  }
  $("button[name='workOrderEstimateSubmitBtn']").attr("disabled", "disabled");

  show_loader();
  const addWorkOrderEstimateForm = [];

  $("#estimateGrid tbody tr").each(function (row, tr) {
    $(tr).each(function () {
      const itemId = $(this).find("td:eq(0)").data("itemid");
      if (itemId) {
        addWorkOrderEstimateForm.push({
          workOrderId: $('#workOrderId').val(),
          itemId,
          itemName: $(this).find("td:eq(1)").find('b').html().trim(),
          rate: parseInt($(this).find("td:eq(2)").text() || 0),
          quantity: parseInt($(this).find("td:eq(3)").find('input').val() || 0),
          amount: parseInt($(this).find("td:eq(4)").find('input').val() || 0),
        });
      }
    });
  });

  $.ajax({
    type: "POST",
    url: "/addWorkOrderEstimate",
    data: { addWorkOrderEstimateForm, grandTotal },
    success: function (response) {
      hide_loader();
      window.location.href = "/dashboard"
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

