addOnClicks();
const db = firebase.firestore();
const analytics = firebase.analytics();

var user = firebase.auth().currentUser;
var credential;

function resignIn(email, password) {
    var date = new Date();
    var e = document.createElement("div");
    e.textContent = "Error: ";
    e.className = "alert alert-warning show fixed-bottom";
    e.role = "alert";
    try {
        if (email == null) {
            throw new Error("Email cannot be empty.")
        } else {
            var eRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            if (!email.match(eRegex)) {
                throw new Error("Email must be in the format \"user@example.com\"");
            }
        }

        if (password == null) {
            throw new Error("Password cannot be empty.")
        }
        firebase.auth().signInWithEmailAndPassword(email, password).then((userCredential) => {
            credential = userCredential.user;
            db.collection("users").doc(user.uid).update({
                signin: true,
                lastLogin: date.toUTCString()
            }).then(() => {
                console.log("Document updated successfully.");
            });
        }).catch((error) => {
            e.textContent = e.textContent + error.message;
            document.body.appendChild(e);
        });
    } catch (error) {
        e.textContent = e.textContent + error.message;
        document.body.appendChild(e);
    }
    user.reauthenticateWithCredential(credential).then(function () {
        var admin;
        db.collection("users").doc(user.uid).get().then((doc) => {
            admin = doc.data().isAdmin;
        });
        if (admin) {
            var a = new a();
        } else {
            throw Error();
        }
    }).catch(function (error) {
        document.body.innerHTML = ""
        document.body.appendChild(document.createElement("h1").textContent("Access denied."));
    });
}

