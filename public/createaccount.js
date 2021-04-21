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


function createAccount(email, password) {
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
    if (email == "") {
      throw new Error("Email cannot be empty.")
    } else {
      var eRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if (!email.match(eRegex)) {
        throw new Error("Email must be in the format \"user@example.com\"");
      }
    }

    if (password == "") {
      throw new Error("Password cannot be empty.")
    } else {
      var pRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&.])[A-Za-z\d@$!%*#?&.]{8,}$/
      if (!password.match(pRegex)) {
        throw new Error("Password format does not match the required format. Please try again.");
      }
    }
    firebase.auth().createUserWithEmailAndPassword(email, password).then((userCredential) => {
      var user = userCredential.user;
      var fname = document.getElementById("fname").value;
      var lname = document.getElementById("lname").value;
      if (fname == "" || lname == "") {
        if (fname == "") {
          throw Error("First name cannot be empty.");
        } else {
          throw Error("Last name cannot be empty.");
        }
      }
      db.collection("users").doc(user.uid).set({
        fname: fname,
        lname: lname,
        email: email
      }).then(() => {
        console.log("Document written successfully.");
        analytics.logEvent("sign_up");
        e.textContent = "Account created. Redirecting you back to the main site..."
        e.className = "alert alert-primary show fixed-bottom"
        document.body.appendChild(e);
        user.updateProfile({
          signin: false
        });
        setTimeout(function () {
          window.location.href = "https://curbid.web.app"
        }, 5000);
      });
    }).catch((error) => {
      e.textContent = e.textContent + error.message;
      document.body.appendChild(e);
    });
  } catch (error) {
    e.textContent = e.textContent + error.message;
    document.body.appendChild(e);
  }
}

function addOnClicks() {
  document.getElementById("createButton").addEventListener("click", function () {
    var email = document.getElementById("email").value;
    var password = document.getElementById("pass").value;
    createAccount(email, password);
  });
}