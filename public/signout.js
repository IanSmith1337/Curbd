window.onload = function loaded(){
  var e = document.body.createElement("h2");
  e.textContent = "Signing out...";
  e.style.color = "black";
  document.body.appendChild(e);
  var old = document.body.childNodes[0];
  firebase.auth().signOut().then(() => {
    setTimeout(function(){checkLogout();}, 5000);
  }).catch((err) => {
    e.textContent = "An error occured trying to sign you out. Try again later.";
    e.style.color = "red";
    document.body.replaceChild(e, old);
    console.log(err.message);
  });
    
  function checkLogout(){
    if(firebase.auth().currentUser == null) {
      e.textContent = "Sign out successful. Redirecting you back to the main site...";
      e.style.color = "black";
      old = document.body.childNodes[0];
      document.body.replaceChild(e, old);
      setTimeout(function(){window.location.href = "https://curbid.web.app"}, 5000);
    } else {
        e.textContent("Sign out unsuccessful. Try again in a few minutes.");
        e.style.color = "red";
        old = document.body.childNodes[0];
        document.body.replaceChild(e, old);
      }
    }
}