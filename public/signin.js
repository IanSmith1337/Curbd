addOnClicks();
const analytics = firebase.analytics();
const db = firebase.firestore();

window.onload = function loaded() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user != null) {
      window.location.href = "https://curbid.web.app";
    }
  });
}


function signIn(email, password, remember) {
  var e = document.createElement("div");
  e.textContent = "Error: ";
  e.className = "alert alert-warning alert-dismissible fade show fixed-bottom";
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
  try {
    if (email == null) {
      throw new Error("Email cannot be empty.")
    } else {
      var eRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if (!email.match(eRegex)) {
        throw new Error("Email must be in the format \"user@example.com\"");
      }
    }

    if (password == null) {
      throw new Error("Password cannot be empty.")
    }

    if (remember) {
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
        firebase.auth().signInWithEmailAndPassword(email, password).then((userCredential) => {
          var user = userCredential.user;
          user.updateProfile({
            signin: true,
            lastLogin: Date.now()
          });
          analytics.logEvent("login");
          var e = document.createElement("h2");
          e.textContent = "Login success. Redirecting you back to the main site..."
          e.className = "alert alert-primary show fixed-bottom"
          document.body.appendChild(e);
          setTimeout(function () {
            window.location.href = "https://curbid.web.app"
          }, 5000);
        }).catch((error) => {
          e.textContent = e.textContent + error.message;
          document.body.appendChild(e);
        });
      });
    } else {
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION).then(() => {
        firebase.auth().signInWithEmailAndPassword(email, password).then((userCredential) => {
          var user = userCredential.user;
          user.updateProfile({
            signin: true,
            lastLogin: Date.now()
          });
          analytics.logEvent("login");
          e.textContent = "Login success. Redirecting you back to the main site..."
          e.className = "alert alert-primary show fixed-bottom"
          document.body.appendChild(e);
          setTimeout(function () {
            window.location.href = "https://curbid.web.app"
          }, 5000);
        }).catch((error) => {
          e.textContent = e.textContent + error.message;
          document.body.appendChild(e);
        });
      });
    }
  } catch (error) {
    e.textContent = e.textContent + error.message;
    document.body.appendChild(e);
  }
}

function addOnClicks() {
  document.getElementById("signInButton").addEventListener("click", function () {
    var email = document.getElementById("email").value;
    var password = document.getElementById("pass").value;
    var remember = (document.getElementById("rme").getAttribute("checked") != null);
    signIn(email, password, remember);
  });
}