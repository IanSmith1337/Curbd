addOnClicks();
const db = firebase.firestore();
const analytics = firebase.analytics();

function resignIn(email, password) {
    var date = new Date();
    var e = document.createElement("div");
    e.textContent = "Error: ";
    e.className = "alert alert-warning show fixed-bottom";
    e.role = "alert";
    try {
        var user = firebase.auth().currentUser;
        var credential;

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
        if(firebase.auth().currentUser == null){
            firebase.auth().signInWithEmailAndPassword(email, password).then((userCredential) => {
                user = userCredential.user;
                db.collection("users").doc(user.uid).update({
                  signin: true,
                  lastLogin: date.toUTCString()
                }).then(() => {
                  console.log("Document updated successfully.");
                });
            });
        }
        credential = firebase.auth.EmailAuthProvider.credential(email, password);
        user.reauthenticateWithCredential(credential).then(function () {
            var admin;
            db.collection("users").doc(user.uid).get().then((doc) => {
                admin = doc.data().admin;
            });
            if (admin) {
                window.location.href = "https://curbid.web.app/test.html"
            } else {
                throw Error("Access Denied.");
            }
        }).catch(function (error) {
            document.body.innerHTML = ""
            var element = document.createElement("h1");
            element.textContent = "Access denied.";
            document.body.appendChild(element);
            console.error(error.message + ": " + error.stack);
        });
    } catch (error) {
        e.textContent = e.textContent + error.message;
        document.body.appendChild(e);
    }
}

function addOnClicks() {
    document.getElementById("signInButton").addEventListener("click", function () {
        var email = document.getElementById("email").value;
        var password = document.getElementById("pass").value;
        resignIn(email, password);
    });
}