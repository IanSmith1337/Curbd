const analytics = firebase.analytics();
window.onload = function loaded() {
  var e = document.createElement("div");
  e.role = "alert";
  var xh = document.createElement("button");
  xh.type = "button";
  xh.className = "close";
  var attr = document.createAttribute("data-dismiss");
  attr.value = "alert";
  xh.attributes.setNamedItem(attr);
  var x = document.createElement("span");
  x.textContent =  "\u00D7"
  xh.appendChild(x);
  e.appendChild(xh);
  e.textContent = "Signing out...";
  e.className = "alert alert-primary show fixed-bottom"
  document.body.appendChild(e);
  firebase.auth().signOut().then(() => {
    setTimeout(function () {
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