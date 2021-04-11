document.onload = function loaded(){
  document.getElementById("createButton").addEventListener("click", function() {
    createAccount()
  });
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
  try {
  if(email == null) {
    throw new Error("Email cannot be empty.")
  } else {
    var eRegex = "(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])"
    if(!email.match(eRegex)) {
      throw new Error("Email must be in the format \"user@example.com\"");
    }
  }

  if(password == null) {
    throw new Error("Password cannot be empty.")
  } else {
    var pRegex = "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$"
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



