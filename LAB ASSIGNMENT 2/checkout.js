
$(document).ready(function() {

  $("#checkoutForm").on("submit", function(e) {
    e.preventDefault(); 
    let isValid = true;

    let fullName = $("#fullName").val().trim();
    let email = $("#email").val().trim();
    let phone = $("#phone").val().trim();
    let address = $("#address").val().trim();
    let city = $("#city").val().trim();
    let postal = $("#postal").val().trim();
    let country = $("#country").val().trim();
    let termsChecked = $("#termsCheck").is(":checked");

    if (fullName.length < 3) {
      $("#fullName").addClass("is-invalid");
      isValid = false;
    } else {
      $("#fullName").removeClass("is-invalid").addClass("is-valid");
    }

    if (!email.includes("@") || !email.includes(".")) {
      $("#email").addClass("is-invalid");
      isValid = false;
    } else {
      $("#email").removeClass("is-invalid").addClass("is-valid");
    }

    if (isNaN(phone) || phone.length < 10) {
      $("#phone").addClass("is-invalid");
      isValid = false;
    } else {
      $("#phone").removeClass("is-invalid").addClass("is-valid");
    }

    if (address === "") {
      $("#address").addClass("is-invalid");
      isValid = false;
    } else {
      $("#address").removeClass("is-invalid").addClass("is-valid");
    }

    if (city === "") {
      $("#city").addClass("is-invalid");
      isValid = false;
    } else {
      $("#city").removeClass("is-invalid").addClass("is-valid");
    }

    if (isNaN(postal) || postal === "") {
      $("#postal").addClass("is-invalid");
      isValid = false;
    } else {
      $("#postal").removeClass("is-invalid").addClass("is-valid");
    }

    if (country === "") {
      $("#country").addClass("is-invalid");
      isValid = false;
    } else {
      $("#country").removeClass("is-invalid").addClass("is-valid");
    }

    if (!termsChecked) {
      $("#termsCheck").addClass("is-invalid");
      isValid = false;
    } else {
      $("#termsCheck").removeClass("is-invalid");
    }

    if (isValid) {
      alert("✅ Form submitted successfully!");
      this.reset(); 
      $(".is-valid").removeClass("is-valid"); 
    }
  });
});
