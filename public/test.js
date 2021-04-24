firebase.auth().onAuthStateChanged(function (user) {
    if (user != null && document.referrer != "https://curbid.web.app/testLogin.html") {
        db.collection("users").doc(user.uid).get().then((doc) => {
            var admin = doc.data().admin;
            if(admin) {
                var test = document.getElementById("t1");
                test.value = "Ready."
                for(var i = 0; i < 5; i++){
                    test = document.getElementById("t" + i);
                    test.value = "Ready."
                }
            
            } else {
                window.location.href = "https://curbid.web.app/testLogin.html";
            }
        });
    } else {
        window.location.href = "https://curbid.web.app/testLogin.html";
    }
});