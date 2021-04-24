const db = firebase.firestore();
const analytics = firebase.analytics();

firebase.auth().onAuthStateChanged(function (user) {
    if (user != null) {
        var fname = document.getElementById("fname");
        var lname = document.getElementById("lname");
        var email = document.getElementById("email");
        var tel = document.getElementById("tel");
        var address = document.getElementById("address");
        var lastLogin = document.getElementById("lastLogin");
        db.collection("users").doc(user.uid).get().then((doc) => {
            fname.value = doc.data().fname;
            lname.value = doc.data().lname;
            email.value = doc.data().email;
            if (doc.data().tel != null) {
                tel.value = doc.data().tel;
            } else {
                tel.value = "";
            }
            if (doc.data().address != null) {
                address.value = doc.data().address;
            } else {
                address.value = "";
            }
            lastLogin.value = doc.data().lastLogin;
        });
        document.getElementById("saveButton").addEventListener("click", function () {
            db.collection("users").doc(user.uid).update({
                tel: tel.value,
                address: address.value
            }).then(() => {
                console.log("Document updated successfully.");
            });
        });
    }
});