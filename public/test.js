firebase.auth().onAuthStateChanged(function (user) {
    if (user != null && document.referrer != "https://curbid.web.app/testLogin.html") {
        db.collection("users").doc(user.uid).get().then((doc) => {
            var admin = doc.data().admin;
            var timeSinceLastLog = new Date(doc.data().lastLogin);
            var currentTime = new Date;
            var differenceInMins = ((timeSinceLastLog.getTime() - currentTime.getTime())/60000)
            console.log(differenceInMins);
            console.log(differenceInMins < 20);
            if(admin || differenceInMins < 20) {
                var test = document.getElementById("t1");
                test.value = "Ready."
                for(var i = 0; i < 5; i++){
                    test = document.getElementById("t" + i);
                    test.value = "Ready."
                }
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