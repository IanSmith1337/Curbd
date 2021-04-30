const db = firebase.firestore();
const analytics = firebase.analytics();

firebase.auth().onAuthStateChanged(function (user) {
    if (user != null) {
        var CANav = document.getElementById("createaccount");
        var SINav = document.getElementById("signin");
        nav.removeChild(CANav);
        nav.removeChild(SINav);
        createNavItem(nav, "Account", "account.html");
        createNavItem(nav, "Sign out", "signout.html");
        userString.style.color = "black";
        userString.id = "userStatus";
        if (document.getElementById("userStatus") != null) {
            status.replaceChild(document.getElementById("userStatus"), userString);
        } else {
            status.appendChild(userString);
            status.appendChild(document.createElement("br"));
        }
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
            var date = new Date(doc.data().lastLogin);
            lastLogin.value = date.toUTCString();
        });
        document.getElementById("saveButton").addEventListener("click", function () {
            db.collection("users").doc(user.uid).update({
                tel: tel.value,
                address: address.value
            }).then(() => {
                console.log("Document updated successfully.");
            });
        });
    } else {
        window.location.href = "https://curbid.web.app"
    }
});