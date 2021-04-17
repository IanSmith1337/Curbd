const firebaseConfig = {
    apiKey: "AIzaSyApv8EvZtusDrVvS1Ck7Iqs3CG_ZzZQ-OA",
    authDomain: "curbid.firebaseapp.com",
    databaseURL: "https://curbid-default-rtdb.firebaseio.com",
    projectId: "curbid",
    storageBucket: "curbid.appspot.com",
    messagingSenderId: "163635828850",
    appId: "1:163635828850:web:0bddee8769edc32d59caeb",
    measurementId: "G-59VL3VVPY6"
  };

try {
firebase.initializeApp(firebaseConfig);   
} catch (error) {
    if (!/already exists/.test(error.message)) {
        console.error('Firebase initialization error', error.stack);
    }
}

firebase.auth().onAuthStateChanged(function(user) {
    var status = document.getElementById("logStatus");
    var userString = document.createElement("h2");
    var signout = document.createElement("a");
    if (user != null) {
        userString.textContent = "You are currently logged in as: " + user.email;
        userString.style.color = "black";
        userString.id = "userStatus";
        signout.textContent = "Click here to sign out.";
        signout.style.color = "black";
        signout.href = "signout.html";
        if (document.getElementById("userStatus") != null) {
          status.replaceChild(document.getElementById("userStatus"), userString);
        } else {
          status.appendChild(userString);
          status.appendChild(signout);
          status.appendChild(document.createElement("br"));
        }
    } else {
        userString.textContent = "You are currently not logged in.";
        userString.style.color = "black";
        userString.id = "userStatus";
        if (document.getElementById("userStatus") != null) {
          status.replaceChild(document.getElementById("userStatus"), userString);
        } else {
          status.appendChild(userString);
          status.appendChild(document.createElement("br")); 
        }
    }
});

const db = firebase.firestore();

