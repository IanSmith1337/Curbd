addOnClicks();
const analytics = firebase.analytics();
const db = firebase.firestore();

window.onload = function loaded() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user != null) {
      var e = document.createElement("div");
      e.role = "alert";
      e.textContent = "Redirecting you back to the main site..."
      e.className = "alert alert-primary show fixed-bottom"
      setTimeout(function () {
        document.body.appendChild(e);
      }, 3000);
      setTimeout(function () {
        window.location.href = "https://curbid.web.app"
      }, 5000);
    }
  });
}


function signIn(email, password, remember) {
  var date = new Date();
  var e = document.createElement("div");
  e.textContent = "Error: ";
  e.className = "alert alert-warning show fixed-bottom";
  e.role = "alert";
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
          db.collection("users").doc(user.uid).update({
            signin: true,
            lastLogin: date.getTime(),
            school: "Towson"
          }).then(() => {
            console.log("Document updated successfully.");
          });
        });
        analytics.logEvent("login");
        var e = document.createElement("h2");
        e.textContent = "Login success."
        e.className = "alert alert-primary show fixed-bottom"
        document.body.appendChild(e);
      }).catch((error) => {
        e.textContent = e.textContent + error.message;
        document.body.appendChild(e);
      });
    } else {
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION).then(() => {
        firebase.auth().signInWithEmailAndPassword(email, password).then((userCredential) => {
          var user = userCredential.user;
          db.collection("users").doc(user.uid).update({
            signin: true,
            lastLogin: date.getTime()
          }).then(() => {
            console.log("Document updated successfully.");
          });
          analytics.logEvent("login");
          e.textContent = "Login success."
          e.className = "alert alert-primary show fixed-bottom"
          document.body.appendChild(e);
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