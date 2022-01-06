$('[data-toggle="offcanvas"]').click(function () {
  $("#wrapper").toggleClass("toggled");
});

function navToggle() {
  var element = document.getElementById("nav-wrapper");
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
function leftpaddingToggle() {
  var element = document.getElementById("wrapper");
  element.classList.toggle("toggled");
}
