
function editItem(_this) {
    console.log("🚀 ~ file: manageItems.js ~ line 3 ~ editItem ~ this", _this)
    $('#editItemModal').fadeIn(500);
    $('#itemId').val($(_this).data('itemid'))
    $('#itemName').val($(_this).data('itemname'))
    $('#itemRate').val($(_this).data('itemrate'))

}