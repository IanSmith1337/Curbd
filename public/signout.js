window.onload = function loaded(){
    var e = document.createElement("h2");
    firebase.auth().signOut().then(() => {
      setTimeout(function(){
        e.textContent = "Signing out..."
        e.style.color = "black";
        e.id = "element";
        document.body.appendChild(e);
        setTimeout(function(){
          checkLogout();
        }, 3000);
      }, 3000);
    }).catch((err) => {
      e.textContent = "An error occured trying to sign you out. Try again later.";
      e.style.color = "red";
      console.log(err.message);
    });
    
    function checkLogout(){
      if(firebase.auth().currentUser == null) {
        e.textContent = "Sign out successful. Redirecting you back to the main site...";
        e.style.color = "black";
        var old = document.body.childNodes[0];
        document.body.replaceChild(e, old);
        setTimeout(function(){window.location.href = "https://curbid.web.app"}, 5000);
      } else {
        e.textContent("Sign out unsuccessful. Try again in a few minutes.");
        e.style.color = "red";
        var old = document.body.childNodes[0];
        document.body.replaceChild(e, old);
      }
    }
  }