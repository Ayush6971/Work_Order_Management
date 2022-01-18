function enableEdit() {
    console.log("enableEdit")

  $("input").each(function () {
    $(this).attr("disabled", false);
  });

  $("#profileFormSubmitBtn").fadeOut("fast", function () {
    $("#profileFormSubmitBtn").html(`
    <button type="submit" class="btn btn-primary" onclick="updateProfile(this)">Submit</button>
    `);
    $("#profileFormSubmitBtn").fadeIn("fast");
  });

}

function updateProfile(event) {
    console.log("updateProfile")
    event.preventDefault();
    ('#profileFormSubmitBtn').attr("disabled", true)

}