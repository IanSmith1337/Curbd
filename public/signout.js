const analytics = firebase.analytics();
window.onload = function loaded() {
  var e = document.createElement("div");
  e.textContent = "Error: ";
  e.role = "alert";
  var xh = document.createElement("button");
  xh.type = "button";
  xh.className = "close";
  xh.attributes.setNamedItem("data-dismiss", "alert");
  xh.attributes.setNamedItem("aria-label", "Close");
  var x = document.createElement("span");
  x.attributes.setNamedItem("aria-hidden", "true");
  x.textContent =  "\u00D7"
  xh.appendChild(x);
  e.appendChild(xh);
  e.textContent = "Signing out...";
  e.className = "alert alert-primary show fixed-bottom"
  document.body.appendChild(e);
  firebase.auth().signOut().then(() => {
    setTimeout(function () {
      $(e).fadeOut();
      document.body.removeChild(e);
      checkLogout();
    }, 5000);
  }).catch((err) => {
    e.textContent = "An error occured trying to sign you out. Try again later.";
    e.className = "alert alert-warning show fixed-bottom";
    document.body.appendChild(e);
  });

  function checkLogout() {
    if (firebase.auth().currentUser == null) {
      e.textContent = "Sign out successful. Redirecting you back to the main site...";
      e.className = "alert alert-primary show fixed-bottom"
      document.body.appendChild(e);
      setTimeout(function () {
        window.location.href = "https://curbid.web.app"
      }, 5000);
    } else {
      e.textContent = "Sign out unsuccessful. Try again in a few minutes.";
      document.body.appendChild(e);
    }
  }
}