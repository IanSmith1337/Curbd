const db = firebase.firestore();
const analytics = firebase.analytics();

firebase.auth().onAuthStateChanged(function (user) {
    if (user != null && document.referrer == "https://curbid.web.app/testLogin.html") {
        db.collection("users").doc(user.uid).get().then((doc) => {
            var admin = doc.data().admin;
            var timeSinceLastLog = new Date(doc.data().lastLogin);
            var currentTime = new Date;
            var differenceInMins = (Math.abs((timeSinceLastLog.getTime() - currentTime.getTime()) / 60000))
            console.log(differenceInMins);
            console.log(differenceInMins < 20);
            if (admin && differenceInMins < 20) {
                var test = document.getElementById("t1");
                test.innerHTML = "Ready."
                for (var i = 2; i <= 7; i++) {
                    if (i != 3) {
                        test = document.getElementById("t" + i);
                        test.innerHTML = "Ready."
                    }
                }
                document.getElementById("start").addEventListener("click", function () {
                    test1(user);
                    test2("d7iFqf89EqbdSPlfb4s1M1N8Pbq2");
                    test4(user.uid);
                    test5();
                    var images = [];
                    images.push(createImage("black.png"));
                    images.push(createImage("black.png"));
                    images.push(createImage("black.png"));
                    test6(user.uid, "Testing, Testing... 1... 2... 3...", images);
                    test7("d7iFqf89EqbdSPlfb4s1M1N8Pbq2");
                });
            } else {
                console.log("admin status red");
                window.location.href = "https://curbid.web.app/testLogin.html";
            }
        });
    } else {
        console.log("refer/null red");
        window.location.href = "https://curbid.web.app/testLogin.html";
    }
});

function test1(user) {
    var result = document.getElementById("t1");
    if (user != null) {
        result.className = "col-12 font-italic font-weight-bold text-center text-success"
        result.innerHTML = "PASSED"
    } else {
        result.className = "col-12 font-italic font-weight-bold text-center text-danger"
        result.innerHTML = "FAILED"
    }
}

function test2(uid) {
    var result = document.getElementById("t2");
    db.collection("users").doc(uid).update({
        tel: "123-456-7890",
        address: "224 Main St., Towson, MD, 21252"
    }).then(() => {
        result.className = "col-12 font-italic font-weight-bold text-center text-success"
        result.innerHTML = "PASSED"
    }).catch((error) => {
        result.className = "col-12 font-italic font-weight-bold text-center text-danger"
        result.innerHTML = "FAILED"
    })
}

function test4(uid) {
    var result = document.getElementById("t4");
    db.collection("posts").doc("test").update({
        queue: firebase.firestore.FieldValue.arrayUnion(uid)
    }).catch((error) => {
        result.className = "col-12 font-italic font-weight-bold text-center text-danger"
        result.innerHTML = "FAILED"
        console.error(error.message + ": " + error.stack);
    });
    db.collection("posts").doc("test").get().then((doc) => {
        var queue = doc.data().queue;
        if (queue.includes(uid)) {
            result.className = "col-12 font-italic font-weight-bold text-center text-success"
            result.innerHTML = "PASSED"
        } else {
            result.className = "col-12 font-italic font-weight-bold text-center text-danger"
            result.innerHTML = "FAILED"
        }
    }).catch((error) => {
        result.className = "col-12 font-italic font-weight-bold text-center text-danger"
        result.innerHTML = "FAILED"
        console.error(error.message + ": " + error.stack);
    });
}

function test5() {
    var result = document.getElementById("t5");
    var content = Math.random().toString(36).slice(2);
    db.collection("posts").doc("test").update({
        body: content
    }).then(() => {
        db.collection("posts").doc("test").get().then((doc) => {
            var retrieval = doc.data().body;
            if (retrieval === content) {
                result.className = "col-12 font-italic font-weight-bold text-center text-success"
                result.innerHTML = "PASSED"
            } else {
                result.className = "col-12 font-italic font-weight-bold text-center text-danger"
                result.innerHTML = "FAILED"
            }
        }).catch((error) => {
            result.className = "col-12 font-italic font-weight-bold text-center text-danger"
            result.innerHTML = "FAILED"
            console.error(error.message + ": " + error.stack);
        });
    });
}

function test6(owner, body, images) {
    var result = document.getElementById("t6");
    var imageArray = images;
    var queueArray = new Array<string>(25);
    db.collection("posts").add({
        owner: owner,
        body: body,
        images: firebase.firestore.FieldValue.arrayUnion(imageArray),
        queue: firebase.firestore.FieldValue.arrayUnion(queueArray)
    }).then((doc) => {
        doc.delete().then(() => {
            result.className = "col-12 font-italic font-weight-bold text-center text-success"
            result.innerHTML = "PASSED"
        }).catch((error) => {
            result.className = "col-12 font-italic font-weight-bold text-center text-danger"
            result.innerHTML = "FAILED"
            console.error(error.message + ": " + error.stack);
        });
    }).catch((error) => {
        result.className = "col-12 font-italic font-weight-bold text-center text-danger"
        result.innerHTML = "FAILED"
        console.error(error.message + ": " + error.stack);
    });
}

function test7(uid) {
    var result = document.getElementById("t7");
    var tel = "123-456-7890";
    var address = "224 Main St., Towson, MD, 21252";
    var utel, uaddress;
    db.collection("users").doc(uid).get().then((doc) => {
        utel = doc.data().tel;
        uaddress = doc.data().address;
        if (tel === utel && address === uaddress) {
            result.className = "col-12 font-italic font-weight-bold text-center text-success"
            result.innerHTML = "PASSED"
        } else {
            result.className = "col-12 font-italic font-weight-bold text-center text-danger"
            result.innerHTML = "FAILED"
        }
    }).catch((error) => {
        result.className = "col-12 font-italic font-weight-bold text-center text-danger"
        result.innerHTML = "FAILED"
    })
}

var createImage = function (src) {
    var img = new Image();
    img.src = src;
    return img;
};