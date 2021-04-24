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
        credential = firebase.auth.EmailAuthProvider.credential(email, password);
        user.reauthenticateWithCredential(credential).then(function () {
            var admin;
            db.collection("users").doc(user.uid).get().then((doc) => {
                admin = doc.data().admin;
            });
            if (admin) {
                var page = '    <nav id=\"nav\" class=\"navbar navbar-light bg-light no-gutters border-bottom sticky-top\">\n'
                + '        <button class=\"btn col\" type=\"button\" data-toggle=\"collapse\" data-target=\"#navLinks\">\n'
                + '            <span class=\"navbar-toggler-icon\"></span>\n'
                + '        </button>\n'
                + '        <div id=\"spacer\" class=\"col\"></div>\n'
                + '        <a class=\"navbar-brand col-9 text-center\" href=\"index.html\"><img src=\"placeholder-logo-2.png\" class=\"img-fluid\"\n'
                + '                alt=\"Curbid Logo\"></img></a>\n'
                + '        <div id=\"spacer\" class=\"col\"></div>\n'
                + '        <div class=\"collapse navbar-collapse\" id=\"navLinks\">\n'
                + '            <ul class=\"navbar-nav\" id=\"navholder\">\n'
                + '                <li class=\"nav-item\" id=\"myaccount\">\n'
                + '                    <a class=\"nav-link\" href=\"account.html\">Account</a>\n'
                + '                </li>\n'
                + '                <li class=\"nav-item\" id=\"signout\">\n'
                + '                    <a class=\"nav-link\" href=\"signout.html\">Sign out</a>\n'
                + '                </li>\n'
                + '            </ul>\n'
                + '        </div>\n'
                + '    </nav>\n'
                + '    <div id=\"main\" class=\"px-3 py-3\">\n'
                + '        <div id=\"createDiv\">\n'
                + '            <strong>\n'
                + '                <h2 class=\"col-12\">Test Page</h2>\n'
                + '            </strong>\n'
                + '            <form class=\"col-12\">\n'
                + '                <div class=\"form-group row\">\n'
                + '                    <label for=\"t1\" class=\"col-sm-2 col-form-label text-center\">Authentication Test:</label>\n'
                + '                    <p id=\"t1\" class=\"col-12 font-italic font-weight-bold text-center\"></p>\n'
                + '                </div>\n'
                + '                <div class=\"form-group row\">\n'
                + '                    <label for=\"t2\" class=\"col-sm-2 col-form-label text-center\">Profile Update Test:</label>\n'
                + '                    <p id=\"t2\" class=\"col-12 font-italic font-weight-bold text-center\"></p>\n'
                + '                </div>\n'
                + '                <div class=\"form-group row\">\n'
                + '                    <label for=\"t3\" class=\"col-sm-2 col-form-label text-center\">School Verification Test: <strong>UNIMPLEMENTED</strong></label>\n'
                + '                    <p id=\"t3\" class=\"col-12 font-italic font-weight-bold text-center text-danger\">FAILED</p>\n'
                + '                </div>\n'
                + '                <div class=\"form-group row\">\n'
                + '                    <label for=\"t4\" class=\"col-sm-2 col-form-label text-center\">Post Response Test:</label>\n'
                + '                    <p id=\"t4\" class=\"col-12 font-italic font-weight-bold text-center\"></p>\n'
                + '                </div>\n'
                + '                <div class=\"form-group row\">\n'
                + '                    <label for=\"t5\" class=\"col-sm-2 col-form-label text-center\">Post Edit Test:</label>\n'
                + '                    <p id=\"t5\" class=\"col-12 font-italic font-weight-bold text-center\"></p>\n'
                + '                </div>\n'
                + '                <div class=\"form-group row\">\n'
                + '                    <label for=\"t6\" class=\"col-sm-2 col-form-label text-center\">Post Removal Test:</label>\n'
                + '                    <p id=\"t6\" class=\"col-12 font-italic font-weight-bold text-center\"></p>\n'
                + '                </div>\n'
                + '                <div class=\"form-group row\">\n'
                + '                    <label for=\"t6\" class=\"col-sm-2 col-form-label text-center\">Contact Retreival Test:</label>\n'
                + '                    <p id=\"t6\" class=\"col-12 font-italic font-weight-bold text-center\"></p>\n'
                + '                </div>\n'
                + '            </form>\n'
                + '        </div>\n'
                + '    </div>\n'
                + '    <!-- The core Firebase JS SDK is always required and must be listed first -->\n'
                + '    <script src=\"/__/firebase/8.3.3/firebase-app.js\"></script>\n'
                + '    <script src=\"/__/firebase/8.3.3/firebase-analytics.js\"></script>\n'
                + '    <script src=\"/__/firebase/8.3.3/firebase-auth.js\"></script>\n'
                + '    <script src=\"/__/firebase/8.3.3/firebase-firestore.js\"></script>\n'
                + '    <!-- Initialize Firebase -->\n'
                + '    <script src=\"/__/firebase/init.js\"></script>\n'
                + '    <!-- Custom Scripts -->\n'
                + '    <script src=\"test2.js\"></script>\n'
                document.body.innerHTML = page;
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