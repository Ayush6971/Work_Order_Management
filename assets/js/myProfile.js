function enableEdit() {

  $("input").each(function () {
    $(this).attr("disabled", false);
  });

  $("#profileFormSubmitBtn").fadeOut("fast", function () {
    $("#profileFormSubmitBtn").html(`
    <button type="submit" name="profileFormSubmit" class="btn btn-primary">Submit</button>
    `);
    $("#profileFormSubmitBtn").fadeIn("fast");
  });

}

function updateProfile(event) {
    event.preventDefault();
    $("button[name='profileFormSubmit']").attr("disabled", "disabled");

    let profileForm = $("#myProfileForm").serializeArray();


}