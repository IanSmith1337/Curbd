const db = firebase.firestore();
const analytics = firebase.analytics();

firebase.auth().onAuthStateChanged(function (user) {
    if (user != null) {
        var nav = document.getElementById("navholder");
        var CANav = document.getElementById("createaccount");
        var SINav = document.getElementById("signin");
        nav.removeChild(CANav);
        nav.removeChild(SINav);
        createNavItem(nav, "About", "about.html");
        createNavItem(nav, "Account", "account.html");
        createNavItem(nav, "Sign out", "signout.html");
        var fname = document.getElementById("fname");
        var lname = document.getElementById("lname");
        var email = document.getElementById("email");
        var tel = document.getElementById("tel");
        var school = document.getElementById("school");
        var lastLogin = document.getElementById("lastLogin");
        db.collection("users").doc(user.uid).get().then((doc) => {
            fname.value = doc.data().fname;
            lname.value = doc.data().lname;
            email.value = doc.data().email;
            school.value = doc.data().school;
            if (doc.data().tel != null) {
                tel.value = doc.data().tel;
            } else {
                tel.value = "";
            }
            var date = new Date(doc.data().lastLogin);
            lastLogin.value = date.toUTCString();
        });
        document.getElementById("saveButton").addEventListener("click", function () {
            db.collection("users").doc(user.uid).update({
                tel: tel.value
            }).then(() => {
                console.log("Document updated successfully.");
            });
        });
    } else {
        window.location.href = "index.html"
    }
});

function createNavItem(nav, text, dest) {
    var navItem = document.createElement("li");
    var navLink = document.createElement("a");
    navItem.className = "nav-item";
    navLink.className = "nav-link";
    navLink.textContent = text;
    navLink.href = dest;
    navItem.appendChild(navLink);
    nav.appendChild(navItem);
  }