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
    if (!/already exists/.test(err.message)) {
        console.error('Firebase initialization error', error.stack);
    }
}

firebase.auth().onAuthStateChanged(function(user) {
    if (user != null) {
        document.getElementById("main").remove();
        var main = document.createElement("div");
        main.id = "main";
        var exists = document.createElement("h2");
        exists.textContent = "You are currently logged in as: " + user.email;
        document.getElementById("main").appendChild(exists);
        document.getElementById("main").appendChild(document.createElement("br"));
    }
});

const db = firebase.firestore();

