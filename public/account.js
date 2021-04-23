
const db = firebase.firestore();
const analytics = firebase.analytics();

firebase.auth().onAuthStateChanged(function (user) {
    if (user != null) {
        var fname = document.getElementById("fname");
        var lname = document.getElementById("lname");
        var email = document.getElementById("email");
        fname.value = user.fname;
        lname.value = user.lname;
        email.value = user.email;
    }
}