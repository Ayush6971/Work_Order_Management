function addWorkOrderEstimateGet(workOrderId) {
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

function loadItemCategories(itemCategories) {
  console.log("🚀 ~ file: addWorkOrder.js ~ line 40 ~ loadItemCategories ~ itemCategories", itemCategories)
  if (itemCategories.length) {
    let appendSelect = `<select class="form-select adjustSelect" name="role">
    <option selected><b>Select Item Category</b></option>`;
    itemCategories.forEach(function (itemCategory) {
      appendSelect += `<option value="${itemCategory.id}">${itemCategory.name}</option>`
    })
    appendSelect += `</select>`;
  }
  $('#itemName').append(appendSelect);
}

function loadQuotationGrid() {
  console.error("Loading Quotation")
  show_loader();
  $.ajax({
    type: "GET",
    url: "/getAllEstimateItems",
    data: null,
    success: function (response) {
      $("#loadQuotationGrid").empty();
      $("#loadQuotationGrid").html("");
      let tableDivs = `<table id="quotationGrid" class="table table-bordered"><tbody>`;
      tableDivs += `
    <thead class="thead-dark">
    <tr>
    <th style="width: 5% !important;height: 32px !important;">##</th>
                  <th style="width: 35% !important;height: 32px !important;">Description</th>
                  <th style="width: 10% !important;height: 32px !important;">Rate</th>
                  <th style="width: 10% !important;height: 32px !important;">Quantity</th>
                  <th style="width: 20% !important;height: 32px !important;">Amount</th>
                  </tr>
                  </thead>
                  `;
      response.getAllItems.forEach((element) => {
        tableDivs += `<tr>
        <td name="itemId" data-itemId="${element.itemId}"><input type="checkbox"></td>
            <td name="itemName" id="itemName" window.onload="loadItemCategories(${element.itemCategories})"><b>${element.itemName}</b></td>
            <td name="itemRate">${element.itemRate}</td>
            <td name="quantity"><input type="text"/></td>
            <td name="amount"><input type="text"/></td>
            </tr>`;
      });
      tableDivs += `<tr><td colspan='4' class="totalText">TOTAL</td><td><input type="text"/></td></tr>`;
      tableDivs += `</tbody></table>`;
      $("#loadQuotationGrid").append(`${tableDivs}`);
    },
    error: function (response) {
      console.error("🚀 ~ file: addWorkOrder.js ~ line 77 ~ loadQuotationGrid ~ response", response)
    }
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

$(() => {
  loadQuotationGrid();
});
