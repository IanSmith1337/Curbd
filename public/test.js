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
                document.write('<!DOCTYPE html>\n');
                document.write('<html lang=\"en\">\n');
                document.write('\n');
                document.write('<head>\n');
                document.write('    <meta charset=\"UTF-8\">\n');
                document.write('    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n');
                document.write('    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n');
                document.write('    <meta http-equiv=\"cache-control\" content=\"max-age=0\">\n');
                document.write('    <meta http-equiv=\"cache-control\" content=\"no-cache\">\n');
                document.write('    <meta http-equiv=\"expires\" content=\"-1\">\n');
                document.write('    <meta http-equiv=\"expires\" content=\"Tue, 01 Jan 1980 11:00:00 GMT\">\n');
                document.write('    <meta http-equiv=\"pragma\" content=\"no-cache\">\n');
                document.write('    <link rel=\"stylesheet\" href=\"https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css\"\n');
                document.write('        integrity=\"sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T\" crossorigin=\"anonymous\">\n');
                document.write('    <script src=\"https://code.jquery.com/jquery-3.3.1.slim.min.js\"\n');
                document.write('        integrity=\"sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo\" crossorigin=\"anonymous\">\n');
                document.write('    </script>\n');
                document.write('    <script src=\"https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js\"\n');
                document.write('        integrity=\"sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1\" crossorigin=\"anonymous\">\n');
                document.write('    </script>\n');
                document.write('    <script src=\"https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js\"\n');
                document.write('        integrity=\"sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM\" crossorigin=\"anonymous\">\n');
                document.write('    </script>\n');
                document.write('    <link rel=\"stylesheet\" type=\"text/css\" src=\"theme.css\" media=\"screen\" />\n');
                document.write('    <title>Curbid</title>\n');
                document.write('</head>\n');
                document.write('\n');
                document.write('<body class=\"px-0\">\n');
                document.write('    <nav id=\"nav\" class=\"navbar navbar-light bg-light no-gutters border-bottom sticky-top\">\n');
                document.write('        <button class=\"btn col\" type=\"button\" data-toggle=\"collapse\" data-target=\"#navLinks\">\n');
                document.write('            <span class=\"navbar-toggler-icon\"></span>\n');
                document.write('        </button>\n');
                document.write('        <div id=\"spacer\" class=\"col\"></div>\n');
                document.write('        <a class=\"navbar-brand col-9 text-center\" href=\"index.html\"><img src=\"placeholder-logo-2.png\" class=\"img-fluid\"\n');
                document.write('                alt=\"Curbid Logo\"></img></a>\n');
                document.write('        <div id=\"spacer\" class=\"col\"></div>\n');
                document.write('        <div class=\"collapse navbar-collapse\" id=\"navLinks\">\n');
                document.write('            <ul class=\"navbar-nav\" id=\"navholder\">\n');
                document.write('                <li class=\"nav-item\" id=\"myaccount\">\n');
                document.write('                    <a class=\"nav-link\" href=\"account.html\">Account</a>\n');
                document.write('                </li>\n');
                document.write('                <li class=\"nav-item\" id=\"signout\">\n');
                document.write('                    <a class=\"nav-link\" href=\"signout.html\">Sign out</a>\n');
                document.write('                </li>\n');
                document.write('            </ul>\n');
                document.write('        </div>\n');
                document.write('    </nav>\n');
                document.write('    <div id=\"main\" class=\"px-3 py-3\">\n');
                document.write('        <div id=\"createDiv\">\n');
                document.write('            <strong>\n');
                document.write('                <h2 class=\"col-12\">Test Page</h2>\n');
                document.write('            </strong>\n');
                document.write('            <form class=\"col-12\">\n');
                document.write('                <div class=\"form-group row\">\n');
                document.write('                    <label for=\"t1\" class=\"col-sm-2 col-form-label text-center\">Authentication Test:</label>\n');
                document.write('                    <p id=\"t1\" class=\"col-12 font-italic font-weight-bold text-center\"></p>\n');
                document.write('                </div>\n');
                document.write('                <div class=\"form-group row\">\n');
                document.write('                    <label for=\"t2\" class=\"col-sm-2 col-form-label text-center\">Profile Update Test:</label>\n');
                document.write('                    <p id=\"t2\" class=\"col-12 font-italic font-weight-bold text-center\"></p>\n');
                document.write('                </div>\n');
                document.write('                <div class=\"form-group row\">\n');
                document.write('                    <label for=\"t3\" class=\"col-sm-2 col-form-label text-center\">School Verification Test: <strong>UNIMPLEMENTED</strong></label>\n');
                document.write('                    <p id=\"t3\" class=\"col-12 font-italic font-weight-bold text-center text-danger\">FAILED</p>\n');
                document.write('                </div>\n');
                document.write('                <div class=\"form-group row\">\n');
                document.write('                    <label for=\"t4\" class=\"col-sm-2 col-form-label text-center\">Post Response Test:</label>\n');
                document.write('                    <p id=\"t4\" class=\"col-12 font-italic font-weight-bold text-center\"></p>\n');
                document.write('                </div>\n');
                document.write('                <div class=\"form-group row\">\n');
                document.write('                    <label for=\"t5\" class=\"col-sm-2 col-form-label text-center\">Post Edit Test:</label>\n');
                document.write('                    <p id=\"t5\" class=\"col-12 font-italic font-weight-bold text-center\"></p>\n');
                document.write('                </div>\n');
                document.write('                <div class=\"form-group row\">\n');
                document.write('                    <label for=\"t6\" class=\"col-sm-2 col-form-label text-center\">Post Removal Test:</label>\n');
                document.write('                    <p id=\"t6\" class=\"col-12 font-italic font-weight-bold text-center\"></p>\n');
                document.write('                </div>\n');
                document.write('                <div class=\"form-group row\">\n');
                document.write('                    <label for=\"t6\" class=\"col-sm-2 col-form-label text-center\">Contact Retreival Test:</label>\n');
                document.write('                    <p id=\"t6\" class=\"col-12 font-italic font-weight-bold text-center\"></p>\n');
                document.write('                </div>\n');
                document.write('            </form>\n');
                document.write('        </div>\n');
                document.write('    </div>\n');
                document.write('    <!-- The core Firebase JS SDK is always required and must be listed first -->\n');
                document.write('    <script src=\"/__/firebase/8.3.3/firebase-app.js\"></script>\n');
                document.write('    <script src=\"/__/firebase/8.3.3/firebase-analytics.js\"></script>\n');
                document.write('    <script src=\"/__/firebase/8.3.3/firebase-auth.js\"></script>\n');
                document.write('    <script src=\"/__/firebase/8.3.3/firebase-firestore.js\"></script>\n');
                document.write('    <!-- Initialize Firebase -->\n');
                document.write('    <script src=\"/__/firebase/init.js\"></script>\n');
                document.write('    <!-- Custom Scripts -->\n');
                document.write('    <script src=\"account.js\"></script>\n');
                document.write('</body>\n');
                document.write('\n');
                document.write('</html>');
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