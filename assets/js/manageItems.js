
function openEditItemModal(_this) {
    show_loader();
    $("#itemCategories").html("")
    const itemId = $(_this).data('itemid')
    $('#updateItemModal').fadeIn(300);
    $('<div class="modal-backdrop"></div>').appendTo(document.body);
    $('#itemId').val(itemId)
    $('#itemName').val($(_this).data('itemname'))
    $('#itemRate').val($(_this).data('itemrate'))
    console.log("🚀 ~ file: manageItems.js ~ line 14 ~ openEditItemModal ~ itemId", itemId)

    $.ajax({
        type: "GET",
        url: "/itemCategories",
        data: { itemId },
        success: function (response) {
            console.log("🚀 ~ file: manageItems.js ~ line 14 ~ openEditItemModal ~ response", response)
            hide_loader();
            if (response.itemCategories.length) {
                let tableDivs = `<table class="table table-bordered"><tbody>`;
                tableDivs += `
            <thead class="thead-dark">
            <tr>
                          <th style="width: 40% !important;height: 12px !important;">Item Category Name</th>
                          <th style="width: 40% !important;height: 12px !important;">Item Category Rate</th>
                          <th style="width: 20% !important;height: 12px !important;">Action</th>
                          </tr>
                          </thead>
                          `;
                response.itemCategories.forEach((element) => {
                    tableDivs += `<tr>
                        <td name="itemCategoryName" id="itemName"><b>${element.itemCategoryName}</b></td>
                        <td name="itemCategoryRate">${element.itemCategoryRate}</td>
                        <td name="action"><a href="#" data-itemId="${element.itemId}" data-itemCategoryId="${element._id}" data-itemCategoryName="${element.itemCategoryName}" data-itemCategoryRate="${element.itemCategoryRate}" 
                        "><i class="fa fa-edit"></a></i>&nbsp;&nbsp;
                        <a href="#" data-itemCategoryId="${element._id}" "><i class="fa fa-trash"></i></a>
                        </td>
                        </tr>`;
                });
                tableDivs += `</tbody></table>`;
                $("#itemCategories").append(`${tableDivs}`);
            }
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

function updateItem(event) {
    show_loader();
    event.preventDefault();
    $('submit-btn-updateItem').prop('disabled', true);
    const updateItemForm = {};
    $.each($("#updateItemForm").serializeArray(), function () {
        updateItemForm[this.name] = this.value;
    });
    $.ajax({
        type: "PUT",
        url: "/updateItem",
        data: { updateItemForm },
        success: function (response) {
            hide_loader();
            Swal.fire({
                icon: "success",
                title: "Success",
                allowOutsideClick: false,
                text: `${response.message}`,
            }).then(function () { window.location.href = "/getManageItems"; })
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

function disableItem(_this) {
    show_loader();
    const itemId = $(_this).data('itemid')
    $.ajax({
        type: "PUT",
        url: "/disableItem",
        data: { itemId },
        success: function (response) {
            hide_loader();
            Swal.fire({
                icon: "success",
                title: "Success",
                allowOutsideClick: false,
                text: `${response.message}`,
            }).then(function () { window.location.href = "/getManageItems"; })
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

function enableItem(_this) {
    show_loader();
    const itemId = $(_this).data('itemid')
    $.ajax({
        type: "PUT",
        url: "/enableItem",
        data: { itemId },
        success: function (response) {
            hide_loader();
            Swal.fire({
                icon: "success",
                title: "Success",
                allowOutsideClick: false,
                text: `${response.message}`,
            }).then(function () { window.location.href = "/getManageItems"; })
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