$('[data-toggle="offcanvas"]').click(function () {
  $("#wrapper").toggleClass("toggled");
});

function navToggleP1() {
  var element = document.getElementById("nav-wrapper-p1");
  if (element.style.display === "none") {
    element.style.display = "flex";
  } else if (element.style.display === "flex") {
    element.style.display = "none";
  } else {
    element.style.display = "flex";
  }
}

function navToggleP2() {
  var element = document.getElementById("nav-wrapper-p2");
  if (element.style.display === "none") {
    element.style.display = "flex";
  } else if (element.style.display === "flex") {
    element.style.display = "none";
  } else {
    element.style.display = "flex";
  }
}

function navToggleP3() {
  var element = document.getElementById("nav-wrapper-p3");
  if (element.style.display === "none") {
    element.style.display = "flex";
  } else if (element.style.display === "flex") {
    element.style.display = "none";
  } else {
    element.style.display = "flex";
  }
}
function testiToggle() {
  var element = document.getElementById("testi-wrapper");
  if (element.style.display === "none") {
    element.style.display = "block";
  } else if (element.style.display === "block") {
    element.style.display = "none";
  } else {
    element.style.display = "block";
  }
}

function sideToggle() {
  var element = document.getElementById("sidebar-wrapper");
  if (element.style.display === "flex") {
    element.style.display = "none";
  } else if (element.style.display === "none") {
    element.style.display = "flex";
  } else {
    element.style.display = "flex";
  }
}

function signToggle() {
  var element = document.getElementById("sign-wrapper");
  if (element.style.display === "flex") {
    element.style.display = "none";
  } else if (element.style.display === "none") {
    element.style.display = "flex";
  } else {
    element.style.display = "flex";
  }
}

function DVsignToggle() {
  var element = document.getElementById("developer-sign");
  if (element.style.display === "none") {
    element.style.display = "flex";
  } else if (element.style.display === "flex") {
    element.style.display = "none";
  } else {
    element.style.display = "flex";
  }
}
function USsignToggle() {
  var element = document.getElementById("user-sign");
  if (element.style.display === "none") {
    element.style.display = "flex";
  } else if (element.style.display === "flex") {
    element.style.display = "none";
  } else {
    element.style.display = "flex";
  }
}

function DVsignOff() {
  var element = document.getElementById("developer-sign");
  if (element.style.display === "flex") {
    element.style.display = "none";
  }
}

function USsignOff() {
  var element = document.getElementById("user-sign");
  if (element.style.display === "flex") {
    element.style.display = "none";
  }
}

function leftpaddingToggle() {
  var element = document.getElementById("wrapper");
  element.classList.toggle("toggled");
}

function commentToggle() {
  var element = document.getElementById("hidden-comment");
  if (element.style.display === "none") {
    element.style.display = "flex";
  } else if (element.style.display === "flex") {
    element.style.display = "none";
  } else {
    element.style.display = "flex";
  }
}

function user_comment() {
  var x = document.getElementById("user-input").value;
  document.getElementById("user-output").innerHTML = x;
}

// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener(
      "submit",
      function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();
