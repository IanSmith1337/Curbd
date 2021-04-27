const firebaseConfig = {
  apiKey: "AIzaSyApv8EvZtusDrVvS1Ck7Iqs3CG_ZzZQ-OA",
  authDomain: "curbid.firebaseapp.com",
  databaseURL: "https://curbid.firebaseio.com",
  projectId: "curbid",
  storageBucket: "curbid.appspot.com",
  messagingSenderId: "163635828850",
  appId: "1:163635828850:web:0bddee8769edc32d59caeb",
  measurementId: "G-59VL3VVPY6"
};

try {
  firebase.initializeApp(firebaseConfig);
} catch (error) {
  if (!/already exists/.test(error.message)) {
    console.error('Firebase initialization error', error.stack);
  }
}

const db = firebase.firestore();
const analytics = firebase.analytics();
const storage = firebase.storage();
var posts = new Array(50);

window.onload = () => {
  firebase.auth().onAuthStateChanged(function (user) {
    var status = document.getElementById("logStatus");
    var userString = document.createElement("h2");
    var fname, signin;
    var admin = false;
    var nav = document.getElementById("navholder");
    if (user != null) {
      db.collection("users").doc(user.uid).get().then((doc) => {
        fname = doc.data().fname;
        signin = doc.data().signin;
        admin = doc.data().admin;
        if (admin) {
          createNavItem(nav, "Testing Page", "testLogin.html")
        }
        if (signin) {
          userString.textContent = "Welcome back, " + fname + ".";
        } else {
          userString.textContent = "Welcome " + fname + "!";
        }
      }).catch((error) => {
        console.error(error);
      });
      var CANav = document.getElementById("createaccount");
      var SINav = document.getElementById("signin");
      nav.removeChild(CANav);
      nav.removeChild(SINav);
      createNavItem(nav, "Account", "account.html");
      createNavItem(nav, "Sign out", "signout.html");
      userString.style.color = "black";
      userString.id = "userStatus";
      if (document.getElementById("userStatus") != null) {
        status.replaceChild(document.getElementById("userStatus"), userString);
      } else {
        status.appendChild(userString);
        status.appendChild(document.createElement("br"));
      }
      updatePostcards();
      $("#modalButton").className = "btn btn-primary visible position-absolute bottom-0 end-0 mx-2 my-2"
      var pt, pb, pi;
      $("#modalButton").click(function () {
        pt = document.getElementById("postTitle");
        pb = document.getElementById("postBody");
        pi = document.getElementById("formFilePicker");
        $("#postButton").click(function () {
          createNewPost(pt.value, pb.value, pi.files[0]);
        })
      });
    } else {
      $("#modalButton").className = "btn btn-primary invisible position-absolute bottom-0 end-0 mx-2 my-2";
      userString.textContent = "You are currently not logged in.";
      userString.style.color = "black";
      userString.id = "userStatus";
      if (document.getElementById("userStatus") != null) {
        status.replaceChild(document.getElementById("userStatus"), userString);
      } else {
        status.appendChild(userString);
        status.appendChild(document.createElement("br"));
      }
    }
  });
}

function updatePostcards() {
  /*<div class="card-group row">
      <div class="col-sm-6">
        <div class="card mb-3">
          <img class="card-img-top" src="black.png" alt="Card image cap">
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional
              content. This content is a little bit longer.</p>
          </div>
          <div class="card-footer">
            <small class="text-muted">Last updated 3 mins ago</small>
          </div>
        </div>
      </div>*/
  function createItem(element) {
    let item = document.createElement(element);
    return item;
  }

  function addClass(item, classDef) {
    item.className = classDef
  }

  function addImage(item, image, alt) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = (event) => {
      var blob = xhr.response;
      console.log(blob.type)
      item.src = URL.createObjectURL(blob);
      item.alt = alt;
    };
    xhr.open('GET', image);
    setTimeout(xhr.send(), 3000);
  }

  function addText(item, text) {
    item.innerHTML = text
  }

  function append(item, parent) {
    parent.appendChild(item);
  }

  function insertCardBefore(item, parent) {
    parent.before(item);
  }

  db.collection("posts").limit(50).onSnapshot((querySnapshot) => {
    var cardRoot = createItem("div");
    var main = document.getElementById("main");
    if(document.getElementsByClassName("card-group row").length === 0){
      addClass(cardRoot, "card-group row");
      append(cardRoot, main);
    } else {
      document.getElementsByClassName("card-group row").item(0).remove();
      addClass(cardRoot, "card-group row");
      append(cardRoot, main);
    }
    querySnapshot.forEach((doc) => {
      if (!doc.data().hide) {
        var cardWrapper = createItem("div");
        addClass(cardWrapper, "col-sm-6");
        var cardBase = createItem("div");
        addClass(cardBase, "card mb-3");
        append(cardBase, cardWrapper);
        var cardImage = createItem("img");
        addClass(cardImage, "card-image-top");
        if (doc.data().image != null) {
          var imageRef = doc.data().image;
          storage.refFromURL(imageRef).getDownloadURL().then((url) => {
            addImage(cardImage, url, "Post Image");
          });
        }
        append(cardImage, cardBase);
        var cardBody = createItem("div");
        addClass(cardBody, "card-body");
        append(cardBody, cardBase);
        var cardTitle = createItem("h5");
        addClass(cardTitle, "card-title");
        addText(cardTitle, doc.data().title);
        append(cardTitle, cardBody);
        var cardText = createItem("p");
        addClass(cardText, "card-text");
        addText(cardText, doc.data().body);
        append(cardText, cardBody);
        var cardFooterWrap = createItem("div");
        addClass(cardFooterWrap, "card-footer");
        append(cardFooterWrap, cardBase);
        var cardFooter = createItem("p");
        addClass(cardFooter, "card-text");
        var timeNow = new Date().getTime();
        var timeSince = Math.abs(Math.floor((timeNow - doc.data().addTime) / 60000));
        var timeString = "";
        if (timeSince >= 60) {
          if ((timeSince / 60) >= 24) {
            timeString = "Posted " + Math.floor((timeSince / 60) / 24) + " days ago";
          } else {
            timeString = "Posted " + Math.floor(timeSince / 60) + " hours ago";
          }
        } else {
          timeString = "Posted " + timeSince + " minutes ago";
        }
        addText(cardFooter, timeString);
        append(cardFooter, cardFooterWrap);
        if (cardRoot.childElementCount === 0) {
          cardWrapper.id = "lastCard";
          append(cardWrapper, cardRoot);
        } else {
          var lastCard = document.getElementById("lastCard");
          insertCardBefore(cardWrapper, lastCard);
          cardWrapper.id = lastCard.id;
          lastCard.id = "";
        }
      }
    });
  });
}

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

function createNewPost(title, body, image) {
  var root = storage.ref();
  var ID = createID();
  var ref = root.child(ID);
  var fr = new FileReader();
  fr.onload = function () {
    var img = new Image();
    img.onload = function () {
      var canvas = document.createElement("canvas");
      canvas.height = 200;
      canvas.width = 200;
      canvas.getContext("2d").drawImage(img, 0, 0, 200, 200);
      canvas.toBlob(function(blob) {
        ref.put(blob);
      });
    }
    img.src = fr.result;
  }
  fr.readAsDataURL(image);
  var metadata = {
    cacheControl: 'public,max-age=300',
    contentType: 'image/jpeg'
  };
  ref.updateMetadata(metadata);
  var owner = firebase.auth().currentUser.uid
  db.collection("posts").doc(ID).set({
    hide: false,
    owner: owner,
    title: title,
    body: body,
    image: ref.toString(),
    queue: new Array < String > (25),
    addTime: new Date().getTime()
  }).catch((error) => {
    console.log(error.message + ": " + error.stack);
  })
}

function createID() {
  let idPart = () => Math.floor((1 + Math.random(20)) * Math.random(5) * 0xABCDEF).toString(16);
  return idPart() + '-' + idPart() + '-' + idPart();
}