addOnClicks();

window.onload = function loaded(){
  firebase.auth().onAuthStateChanged(function(user) {
    if (user != null) {
      var e = document.createElement("h2");
      e.textContent = "You're currently logged in. Redirecting you back to the main site..."
      e.style.color = "black"
      document.body.appendChild(e);
      setTimeout(function(){}, 5000)
      window.location.href = "https://curbid.web.app"
    }
  });
}
  
 
function createAccount(email, password) {
  try {
  if(email == "") {
    throw new Error("Email cannot be empty.")
  } else {
    var eRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if(!email.match(eRegex)) {
      throw new Error("Email must be in the format \"user@example.com\"");
    }
  }

  if(password == "") {
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
        if(fname == ""){
          throw Error("First name cannot be empty.");
        } else {
          throw Error("Last name cannot be empty.");
        }
      }
      const db = firebase.database();
      db.collection("users").doc(user.uid).set({
        fname: fname,
        lname: lname,
        email: email
      }).then(() => {
        console.log("Document written successfully.");
      });
      user.updateProfile({
        signin: false
      });
      analytics.logEvent("sign_up");
      // window.location.href = "https://curbid.web.app"
    }).catch((error) => {
      var e = document.createElement("h2");
      e.textContent = error.message;
      e.style.color = "red";
      e.id = "error"
      if(document.getElementById(error) != null){
        document.body.replaceChild(document.getElementById(error), e);
      } else {
        document.body.appendChild(e);
      }
    });
  } catch(error) {
    var e = document.createElement("h2");
    e.textContent = error.message;
    e.style.color = "red";
    e.id = "error"
    if(document.getElementById(error) != null){
      document.body.replaceChild(document.getElementById(error), e);
    } else {
      document.body.appendChild(e);
    }
  }
}

function addOnClicks(){
  document.getElementById("createButton").addEventListener("click", function() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("pass").value;
    createAccount(email, password);
  });
}



