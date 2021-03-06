addOnClicks();
const analytics = firebase.analytics();
const db = firebase.firestore();

window.onload = function loaded() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user != null) {
      setTimeout(function () {
        window.location.href = "index.html"
      }, 2000);
    }
  });
}


function createAccount(email, password) {
  var e = document.createElement("div");
  e.textContent = "Error: ";
  e.className = "alert alert-warning show fixed-bottom";
  e.role = "alert";
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
      var school = document.getElementById("school");
      if (fname == "" || lname == "") {
        if (fname == "") {
          throw Error("First name cannot be empty.");
        } else {
          throw Error("Last name cannot be empty.");
        }
      }
      if (String(school.value).toLowerCase() != "towson university") {
        school.setAttribute("readonly", true);
        school.classname = "form-control-plaintext";
        var br = document.createElement("br");
        for (let i = 0; i < 3; i++) {
          document.body.appendChild(br);
        }
        throw Error("We're sorry, but this app is currently only open to Towson University students. If you believe this to be an error, please email \"ismith13@students.towson.edu.\"");
      } else {
        var schoolUser = "Towson";
        var date = new Date();
        db.collection("users").doc(user.uid).set({
          fname: fname,
          lname: lname,
          email: email,
          address: null,
          tel: null,
          signin: false,
          lastLogin: date.getTime(),
          school: schoolUser
        }).then(() => {
          console.log("Document written successfully.");
          analytics.logEvent("sign_up");
        });
        e.textContent = "Account created.";
        e.className = "alert alert-primary show fixed-bottom"
        document.body.appendChild(e);
      }
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