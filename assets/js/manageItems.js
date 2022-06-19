
function openEditItemModal(_this) {
    $('#updateItemModal').fadeIn(300);
    $('<div class="modal-backdrop"></div>').appendTo(document.body);
    $('#itemId').val($(_this).data('itemid'))
    $('#itemName').val($(_this).data('itemname'))
    $('#itemRate').val($(_this).data('itemrate'))
}

function updateItem(event) {
    event.preventDefault();
    $('submit-btn-updateItem').prop('disabled', true);
    const updateItemForm = {};
    $.each($("#updateItemForm").serializeArray(), function () {
        updateItemForm[this.name] = this.value;
    });
    console.log("🚀 ~ file: manageItems.js ~ line 15 ~ updateItem ~ formData", updateItemForm)
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
            })
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