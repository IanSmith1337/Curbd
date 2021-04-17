addOnClicks();

window.onload = function loaded(){
  firebase.auth().onAuthStateChanged(function(user) {
    if (user != null) {
      var element = document.createElement("h2").textContent("You're currently logged in. Redirecting you back to the main site...")
      element.style.color = "black"
      document.body.appendChild(element);
      delay(5000);
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
      window.location.href = "https://curbid.web.app"
    }).catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode + ", " + errorMessage);
    });
  } catch(error) {
    console.log(error.message);
  }
}

function addOnClicks(){
  document.getElementById("createButton").addEventListener("click", function() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("pass").value;
    createAccount(email, password);
  });
}



