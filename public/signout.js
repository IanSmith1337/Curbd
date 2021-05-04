const analytics = firebase.analytics();
window.onload = function loaded() {
  var e = document.createElement("div");
  e.role = "alert";
  e.textContent = "Signing out...";
  e.className = "alert alert-primary show fixed-bottom"
  document.body.appendChild(e);
  firebase.auth().signOut().then(() => {
    setTimeout(function () {
      document.body.removeChild(e);
      checkLogout();
    }, 3000);
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
        window.location.href = window.location.hostname + "index.html"
      }, 2000);
    } else {
      e.textContent = "Sign out unsuccessful. Try again in a few minutes.";
      document.body.appendChild(e);
    }
  }
}