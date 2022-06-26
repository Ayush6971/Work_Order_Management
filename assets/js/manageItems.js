function addItemCateforyTable(itemCategories) {
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
    itemCategories.forEach((element) => {
        tableDivs += `<tr>
            <td name="itemCategoryName" id="itemName"><b>${element.itemCategoryName}</b></td>
            <td name="itemCategoryRate">${element.itemCategoryRate}</td>
            <td name="action"><a href="#" data-itemId="${element.itemId}" data-itemCategoryId="${element._id}" data-itemCategoryName="${element.itemCategoryName}" data-itemCategoryRate="${element.itemCategoryRate}" onclick="openEditItemCategoryModal(this);"><i class="fa fa-edit"></a></i>&nbsp;&nbsp;
            <a href="#" data-itemCategoryId="${element._id}" onclick="deleteItemCategory(this);"><i class="fa fa-trash"></i></a>
            </td>
            </tr>`;
    });
    tableDivs += `</tbody></table>`;
    $("#itemCategories").append(`${tableDivs}`);
}

function openEditItemModal(_this) {
    show_loader();
    $("#itemCategories").html("")
    const itemId = $(_this).data('itemid')
    $('#updateItemModal').fadeIn(300);
    $('<div class="modal-backdrop"></div>').appendTo(document.body);
    $('#itemId').val(itemId)
    $('.addItemCategory').attr('data-itemid', itemId);
    $('#itemName').val($(_this).data('itemname'))
    $('#itemRate').val($(_this).data('itemrate'))

    getItemCategories(itemId)
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

function openEditItemCategoryModal(_this) {
    $('#updateItemCategoryModal').fadeIn(300);
    $('#updateItemModal').fadeOut(200);
    $('<div class="modal-backdrop"></div>').appendTo(document.body);
    $('#itemIdCategoryModal').val($(_this).data('itemid'))
    $('#itemCategoryId').val($(_this).data('itemcategoryid'))
    $('#itemCategoryName').val($(_this).data('itemcategoryname'))
    $('#itemCategoryRate').val($(_this).data('itemcategoryrate'))
}

function openAddItemCategoryModal(_this) {
    $('.modal-title').text('Add Item Category');
    $('#updateItemCategoryModal').fadeIn(300);
    $('#updateItemModal').fadeOut(200);
    $('<div class="modal-backdrop"></div>').appendTo(document.body);
    $('form[id="updateItemCategoryForm"]').removeAttr('onsubmit').attr('onsubmit', 'addItemCategory(event)')
    $('#itemIdCategoryModal').val($(_this).data('itemid'))
    $('#itemCategoryId').remove()
    $('#itemCategoryName').val("")
    $('#itemCategoryRate').val("")
}

function addItemCategory(event) {
    show_loader();
    event.preventDefault();
    $('submit-btn-updateItemCategory').prop('disabled', true);
    const addItemCategoryForm = {};
    $.each($("#updateItemCategoryForm").serializeArray(), function () {
        addItemCategoryForm[this.name] = this.value;
    });
    $.ajax({
        type: "POST",
        url: "/itemCategory",
        data: { addItemCategoryForm },
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

function updateItemCategory(event) {
    show_loader();
    event.preventDefault();
    $('submit-btn-updateItemCategory').prop('disabled', true);
    const updateItemCategoryForm = {};
    $.each($("#updateItemCategoryForm").serializeArray(), function () {
        updateItemCategoryForm[this.name] = this.value;
    });
    $.ajax({
        type: "PUT",
        url: "/itemCategory",
        data: { updateItemCategoryForm },
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

function deleteItemCategory(_this) {
    show_loader();
    const itemCategoryId = $(_this).data('itemcategoryid')
    $.ajax({
        type: "DELETE",
        url: "/itemCategory",
        data: { itemCategoryId },
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

function getItemCategories(itemId) {
    $.ajax({
        type: "GET",
        url: "/itemCategories",
        data: { itemId },
        success: function (response) {
            hide_loader();
            if (response.itemCategories.length) {
                addItemCateforyTable(response.itemCategories)
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