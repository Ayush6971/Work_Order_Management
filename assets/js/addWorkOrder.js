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

function loadQuotationGrid() {
  show_loader();
  $.ajax({
    type: "GET",
    url: "/getAllQuotationItems",
    data: null,
    success: function (response) {
      $("#loadQuotationGrid").empty();
      $("#loadQuotationGrid").html("");
      let tableDivs = `<table id="quotationGrid" class="table table-bordered"><tbody>`;
      tableDivs += `
    <thead class="thead-dark">
    <tr>
    <th style="width: 5% !important;height: 32px !important;">##</th>
                  <th style="width: 30% !important;height: 32px !important;">Description</th>
                  <th style="width: 10% !important;height: 32px !important;">Rate</th>
                  <th style="width: 10% !important;height: 32px !important;">Quantity</th>
                  <th style="width: 20% !important;height: 32px !important;">Amount</th>
                  </tr>
                  </thead>
                  `;
      response.getAllItems.forEach((ele) => {
        tableDivs += `<tr>
        <td name="itemID" data-itemID="${ele.itemID}"><input type="checkbox"></td>
            <td name="itemName"><b>${ele.itemName}</b></td>
            <td name="itemRate">${ele.itemRate}</td>
            <td name="quantity"></td>
            <td name="amount"></td>
            </tr>`;
      });
      tableDivs += `</tbody></table>`;
      $("#loadQuotationGrid").append(`${tableDivs}`);
    },
    error: function (response) {},
  });
}

function submitWorkOrderQuotation(event) {
  event.preventDefault();
  $("button[name='workOrderQuotationSubmitBtn']").attr("disabled", "disabled");
  // show_loader();

  const addWorkOrderQuotationForm = []
  $('#quotationGrid tbody tr').each(function(row, tr) {

    $(tr).each(function () {

      addWorkOrderQuotationForm.push({
        isChecked: $(this).find('input').val(),
        itemID: $(this).find('td:eq(0)').data('itemid'),
        itemName: $(this).find('td:eq(1)').text(),
        rate: $(this).find('td:eq(2)').text(),
        quantity:$(this).find('td:eq(3)').text(),
        amount: $(this).find('td:eq(4)').text()
      });
      console.log("🚀 ~ file: addWorkOrder.js ~ line 80 ~ addWorkOrderQuotationForm", addWorkOrderQuotationForm)
    })
  });
}

$(() => {
  loadQuotationGrid();
});
