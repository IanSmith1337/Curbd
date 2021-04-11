addOnClicks();

document.onload = function loaded(){
  firebase.auth().onAuthStateChanged(function(user) {
    if (user != null) {
      document.getElementById("createDiv").remove();
      var exists = document.createElement("h2");
      exists.textContent = "You are currently logged in. Click here to go back to the main site: "
      document.getElementById("main").appendChild(exists);
      document.getElementById("main").appendChild(document.createElement("br"));
      var returnLink = document.createElement("a");
      returnLink.href = "index.html";
      returnLink.textContent = "Go back";
      document.getElementById("main").appendChild(returnLink);
    }
  });
}
  
 
function createAccount(email, password) {
  console.log("triggered");
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
  } else {
    var pRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/
    if (!password.match(pRegex)) {
      throw new Error("Password format does not match the required format. Please try again.");
    }
  }
  firebase.auth().createUserWithEmailAndPassword(email, password).then((userCredential) => {
      var user = userCredential.user;
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
    var email = document.getElementById("email").textContent;
    var password = document.getElementById("pass").textContent;
    createAccount(email, password);
  });
}



