const firebaseConfig = {
  apiKey: "AIzaSyApv8EvZtusDrVvS1Ck7Iqs3CG_ZzZQ-OA",
  authDomain: "curbid.firebaseapp.com",
  databaseURL: "https://curbid.firebaseio.com",
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

const db = firebase.firestore();
const analytics = firebase.analytics();

firebase.auth().onAuthStateChanged(function (user) {
  var status = document.getElementById("logStatus");
  var userString = document.createElement("h2");
  var signout = document.createElement("a");
  var fname;
  if (user != null) {
    db.collection("users").doc(user.uid).get().then((doc) => {
      fname = `${doc.get("fname")}`;
      if (user.signin) {
        userString.textContent = "Welcome back, " + fname + ".";
      } else {
        userString.textContent = "Welcome " + fname + "!";
      }
    }).catch((error) => {
      console.error(error);
    });
    var nav = document.getElementById("navholder");
    var CANav = document.getElementById("createaccount");
    var SINav = document.getElementById("signin");
    nav.removeChild(CANav);
    nav.removeChild(SINav);
    var accountItem = document.createElement("li");
    var myaccount = document.createElement("a");
    accountItem.className = "nav-item";
    myaccount.className = "nav-link";
    myaccount.textContent = "Account";
    myaccount.href = "account.html";
    accountItem.appendChild(myaccount);
    nav.appendChild(accountItem);
    var signoutItem = document.createElement("li");
    signoutItem.className = "nav-item";
    signout.className = "nav-link";
    signout.textContent = "Sign out";
    signout.href = "signout.html";
    signoutItem.appendChild(signout);
    nav.appendChild(signoutItem);
    userString.style.color = "black";
    userString.id = "userStatus";
    if (document.getElementById("userStatus") != null) {
      status.replaceChild(document.getElementById("userStatus"), userString);
    } else {
      status.appendChild(userString);
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