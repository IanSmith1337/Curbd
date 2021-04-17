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
  
 
function signIn(email, password, remember) {
  try {
    if(email == null) {
      throw new Error("Email cannot be empty.")
    } else {
      var eRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if(!email.match(eRegex)) {
        throw new Error("Email must be in the format \"user@example.com\"");
      }
    }

    if(password == null) {
      throw new Error("Password cannot be empty.")
    }

    if(remember) {
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
        firebase.auth().signInWithEmailAndPassword(email, password).then((userCredential) => {
          var user = userCredential.user;
          window.location.href = "https://curbid.web.app"
        }).catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode + ", " + errorMessage);
        });
      });
    } else {
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION).then(() => {
        firebase.auth().signInWithEmailAndPassword(email, password).then((userCredential) => {
          var user = userCredential.user;
          window.location.href = "https://curbid.web.app"
        }).catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode + ", " + errorMessage);
        });
      });
    }
  } catch(error) {
      console.log(error.message);
    }
  }

  function addOnClicks(){
    document.getElementById("signInButton").addEventListener("click", function() {
      var email = document.getElementById("email").value;
      var password = document.getElementById("pass").value;
      var remember = (document.getElementById("rme").getAttribute("checked") != null);
      signIn(email, password, remember);
    });
  }

