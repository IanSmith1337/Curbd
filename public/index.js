/* 
TODO:
--------------------------
1. Add community guidelines and agreement button to account creation. 
6. Add TUID verification.

*/

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
var efield1, efield2;
var button;
var listener;

window.onload = () => {
  var nav = document.getElementById("navholder");
  createNavItem(nav, "About", "about.html");
  firebase.auth().onAuthStateChanged(function (user) {
    var status = document.getElementById("logStatus");
    var userString = document.createElement("h2");
    var fname, signin;
    var admin = false;
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
      db.collection("users").doc(user.uid).get().then((doc) => {
        let school = doc.data().school;
        updatePostcards(user, school);
      });
      document.getElementById("modalButton").className = "btn btn-primary visible position-fixed bottom-0 end-0 mx-2 my-2";
      document.getElementById("modalButton").style = "z-index: 1000;"
      var modal = document.getElementById("postModal");
      modal.addEventListener('show.bs.modal', function () {
        document.getElementById("postButton").addEventListener("click", postModalHandler);
      });
      modal.addEventListener('hidden.bs.modal', function () {
        document.getElementById("postButton").removeEventListener("click", postModalHandler);
      });
      var emodal = document.getElementById("editModal");
      emodal.addEventListener('show.bs.modal', function (event) {
        button = event.relatedTarget
        var postTitle = $(button).parents(".card").children(".card-body").children(".card-title").text()
        var postBody = $(button).parents(".card").children(".card-body").children(".card-text").text();
        efield1 = emodal.querySelector("#editTitle")
        efield1.value = postTitle;
        efield2 = emodal.querySelector("#editBody");
        efield2.value = postBody;
      });
      emodal.addEventListener('hide.bs.modal', function () {
        var postID = $(button).parent().get(0).id;
        db.collection("posts").doc(postID).update({
          title: efield1.value,
          body: efield2.value
        });
      });
      var closeModal = document.getElementById("closeModal")
      closeModal.addEventListener('show.bs.modal', function (event) {
        button = event.relatedTarget
        var confirm = closeModal.querySelector(".btn-danger");
        confirm.addEventListener("click", function () {
          var postID = $(button).parent().get(0).id;
          db.collection("posts").doc(postID).delete();
          var imageStore = storage.ref(postID);
          storage.refFromURL(imageStore).getDownloadURL().then(() => {
            imageStore.delete();
          }).catch(() => {
            console.log("file not found");
          });
        });
      });
    } else {
      document.getElementById("modalButton").className = "btn btn-primary invisible position-fixed bottom-0 end-0 mx-2 my-2";
      userString.textContent = "Welcome to Curbd! You're one step closer to making a difference in your community.";
      userString.style.color = "black";
      userString.id = "userStatus";
      if (document.getElementById("userStatus") != null) {
        status.replaceChild(document.getElementById("userStatus"), userString);
      } else {
        status.appendChild(userString);
        status.appendChild(document.createElement("br"));
      }
      var getStartedDiv = document.createElement("div");
      var getStarted = document.createElement("h6");
      getStarted.textContent = "To get started, click the navigation button in the upper left. There, you can view the about page to learn more about what we do, as well as make a new account or sign in to an existing one."
      status.appendChild(getStartedDiv);
      getStartedDiv.appendChild(getStarted);
      var restrict = document.createElement("h6");
      restrict.textContent = "Unfortunately, we are only open to Towson University students at the moment, but we hope to spread to many other colleges and communities soon."
      getStartedDiv.appendChild(restrict);
    }
  });
}

window.onbeforeunload = function () {
  listener();
}

function updatePostcards(user, userschool) {
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
      item.src = URL.createObjectURL(blob);
      item.alt = alt;
      item.style = "width: 100%; height: auto;";
    }
    xhr.open('GET', image);
    xhr.send()
  }

  function addText(item, text) {
    item.innerHTML = text
  }

  function append(item, parent) {
    parent.append(item);
  }

  function showSpinner() {
    var spin = document.createElement("div");
    addClass(spin, "spinner-border text-secondary");
    spin.style = "height: 5vmax; width: 5vmax; display: block; margin-left: auto; margin-right: auto;"
    spin.id = "spin";
    append(spin, document.getElementById("logStatus"));
  }

  function removeSpinner() {
    document.getElementById("spin").remove();
  }

  function photoHandler(storageRef, frame) {
    var pi = document.getElementById("formFilePicker");
    let image = pi.files[0];
    storage.refFromURL(storageRef).getDownloadURL().then((url) => {
      addImage(frame, url, "Post Image");
    }).catch((err) => {
      if (image != null) {
        var fr = new FileReader();
        fr.onload = function () {
          var img = new Image();
          img.onload = function () {
            var canvas = document.createElement("canvas");
            canvas.width = img.width;
            if (canvas.width > 480) {
              canvas.width = 480;
              canvas.height = 270;
            }
            canvas.height = img.height;
            if (canvas.height > 270) {
              canvas.width = 480;
              canvas.height = 270;
            }
            canvas.getContext("2d").drawImage(img, 0, 0, 480, 270);
            canvas.toBlob(function (blob) {
              storage.refFromURL(storageRef).put(blob).then(() => {
                storage.refFromURL(storageRef).getDownloadURL().then((url) => {
                  addImage(frame, url, "Post Image");
                });
              });
            });
          }
          img.src = fr.result;
        }
        fr.readAsDataURL(image);
      }
    });
  }

  listener = db.collection("posts").where("school", "==", userschool).orderBy("addTime", "desc").limit(50).onSnapshot((querySnapshot) => {
    showSpinner();
    db.collection("users").doc(user.uid).get().then((userdoc) => {
      let admin = userdoc.admin
      if (document.getElementById("cd") != null) {
        document.getElementById("cd").remove();
      }
      var cardRoot = createItem("div");
      var main = document.getElementById("main");
      cardRoot.id = "cd";
      addClass(cardRoot, "card-group row");
      append(cardRoot, main);
      querySnapshot.forEach((doc) => {
        var index = 0;
        if (!doc.data().hide) {
          var cardWrapper = createItem("div");
          addClass(cardWrapper, "col-sm-4 h-50");
          var cardBase = createItem("div");
          addClass(cardBase, "card mb-3");
          append(cardBase, cardWrapper);
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
          var cardImage = createItem("img");
          addClass(cardImage, "card-image-bottom");
          if (doc.data().image != "") {
            var imageRef = doc.data().image;
            photoHandler(imageRef, cardImage);
          }
          append(cardImage, cardBase);
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
              if (Math.floor((timeSince / 60) / 24) == 1) {
                timeString = "Posted " + Math.floor((timeSince / 60) / 24) + " day ago";
              } else {
                timeString = "Posted " + Math.floor((timeSince / 60) / 24) + " days ago";
              }
            } else {
              if (Math.floor(timeSince / 60) == 1) {
                timeString = "Posted " + Math.floor(timeSince / 60) + " hour ago";
              } else {
                timeString = "Posted " + Math.floor(timeSince / 60) + " hours ago";
              }
            }
          } else {
            if (timeSince == 1) {
              timeString = "Posted " + timeSince + " minute ago";
            } else {
              timeString = "Posted " + timeSince + " minutes ago";
            }
          }
          addText(cardFooter, timeString);
          append(cardFooter, cardFooterWrap);
          var optDiv = createItem("div");
          var ul = createItem("ul");
          ul.id = doc.id;
          optDiv.id = doc.id;
          addClass(optDiv, "btn-group");
          addClass(ul, "dropdown-menu");
          var itemQueue = Array.from(doc.data().queue);
          var count = 0
          itemQueue.forEach((item) => {
            if (item != "") {
              count++;
            }
          });
          var info = document.createElement("p");
          // If user is not in the queue, not an owner, and the queue isn't full.
          if (!itemQueue.includes(user.uid) && user.uid != doc.data().owner && count <= 24) {
            var get = createItem("button");
            addClass(get, "btn btn-primary");
            addText(get, "Get");
            append(optDiv, cardFooterWrap);
            append(get, optDiv);
            get.id = "get" + index;
            addText(get, "Get");
            var confirmID = createID(true);
            get.addEventListener("click", function (event) {
              var postID = $(this).parent().get(0).id;
              db.collection("posts").doc(postID).update({
                queue: firebase.firestore.FieldValue.arrayUnion(user.uid),
                confirmation: confirmID
              }).catch((error) => {
                console.log(error.message + ": " + error.stack);
              });
            });
            info.innerHTML = "<strong>Users in line for item: " + count + "/25.</strong>";
            append(document.createElement("br"), cardBody);
            append(info, cardBody);
          }
          //If user is not in the queue, doesn't own the item, and the queue is full.
          if (!itemQueue.includes(user.uid) && user.uid != doc.data().owner && count == 25) {
            info.innerHTML = "<strong>Sorry, but it seems the queue is full for this item. </strong>";
            append(document.createElement("br"), cardBody);
            append(info, cardBody);
          }
          //If the user is in the queue, and they're first.
          if (itemQueue.includes(user.uid) && itemQueue.indexOf(user.uid) == 0) {
            if (!admin) {
              var postButton = createItem("button");
              addClass(postButton, "btn btn-secondary");
              addText(postButton, "Leave queue");
              append(optDiv, cardFooterWrap);
              append(postButton, optDiv);
              info.innerHTML = "<strong>You're the first in line! Here is the owner's contacts: (" + atob(doc.data().c1) + ")"
              if (atob(doc.data().c2) != "undefined") {
                info.innerHTML += "<strong>, (" + atob(doc.data().c2) + ")";
              }
              info.innerHTML += "<br> Confirmation Code: " + doc.data().confirmation + "</strong>"
              append(info, cardBody);
              postButton.addEventListener("click", function (event) {
                var postID = $(this).parent().get(0).id;
                var confirmID = createID(true);
                db.collection("posts").doc(postID).update({
                  queue: firebase.firestore.FieldValue.arrayRemove(user.uid),
                  confirmation: confirmID
                });
              });
            } else {
              var optionButton = createItem("button");
              optionButton.setAttribute("data-bs-toggle", "dropdown");
              addClass(optionButton, "btn btn-secondary dropdown-toggle");
              addText(optionButton, "Options");
              append(optDiv, cardFooterWrap);
              append(ul, optDiv);
              info.innerHTML = "<strong>You're the first in line! Here is the owner's contacts: (" + atob(doc.data().c1) + ")"
              if (atob(doc.data.c2) != "undefined") {
                info.innerHTML += "<strong>, (" + atob(doc.data().c2) + ")";
              }
              info.innerHTML += "<br> Confirmation Code: " + doc.data().confirmation + "</strong>"
              append(document.createElement("br"), cardBody);
              append(info, cardBody);
              var leave = createItem("li");
              addClass(leave, "dropdown-item");
              leave.id = "leave" + index;
              addText(leave, "Leave the queue");
              append(leave, ul);
              leave.addEventListener("click", function (event) {
                var postID = $(this).parent().get(0).id;
                var confirmID = createID(true);
                db.collection("posts").doc(postID).update({
                  queue: firebase.firestore.FieldValue.arrayRemove(user.uid),
                  confirmation: confirmID
                });
              });
            }
          }

          // If the user is in the queue but not first.
          if (itemQueue.includes(user.uid) && itemQueue.indexOf(user.uid) != 0) {
            if (!admin) {
              var postButton = createItem("button");
              addClass(postButton, "btn btn-secondary");
              addText(postButton, "Leave queue");
              append(optDiv, cardFooterWrap);
              append(postButton, optDiv);
              info.innerHTML = "<strong>Current position for item: " + (itemQueue.indexOf(user.uid) + 1) + "</strong>";
              append(document.createElement("br"), cardBody);
              append(info, cardBody);
              postButton.addEventListener("click", function (event) {
                var postID = $(this).parent().get(0).id;
                var confirmID = createID(true);
                db.collection("posts").doc(postID).update({
                  queue: firebase.firestore.FieldValue.arrayRemove(user.uid),
                  confirmation: confirmID
                });
              });
            } else {
              var optionButton = createItem("button");
              optionButton.setAttribute("data-bs-toggle", "dropdown");
              addClass(optionButton, "btn btn-secondary dropdown-toggle");
              addText(optionButton, "Options");
              append(optDiv, cardFooterWrap);
              append(optionButton, optDiv);
              append(ul, optDiv);
              info.innerHTML = "<strong>Current position for item: " + (itemQueue.indexOf(user.uid) + 1) + "</strong>";
              append(document.createElement("br"), cardBody);
              append(info, cardBody);
              var leave = createItem("li");
              addClass(leave, "dropdown-item");
              leave.id = "leave" + index;
              addText(leave, "Leave the queue");
              append(leave, ul);
              leave.addEventListener("click", function (event) {
                var postID = $(this).parent().get(0).id;
                var confirmID = createID(true);
                db.collection("posts").doc(postID).update({
                  queue: firebase.firestore.FieldValue.arrayRemove(user.uid),
                  confirmation: confirmID
                });
              });
            }
          }

          // Post owner controls
          if (doc.data().owner == user.uid || admin == true) {
            info.innerHTML = "<strong>Users in line for item: " + count + "/25.</strong>";
            info.innerHTML += "<br> Confirmation Code (check this with the first in line!): " + doc.data().confirmation + "</strong>"
            append(document.createElement("br"), cardBody);
            append(info, cardBody);
            var first = createItem("p");
            first.innerHTML = "Current first in line: "
            var optionButton = createItem("button");
            optionButton.setAttribute("data-bs-toggle", "dropdown");
            addClass(optionButton, "btn btn-secondary dropdown-toggle");
            addText(optionButton, "Options");
            append(optDiv, cardFooterWrap);
            append(optionButton, optDiv);
            append(ul, optDiv);
            var editItem = createItem("li");
            var remove = createItem("li");
            var next = createItem("li");
            addClass(next, "dropdown-item");
            addClass(editItem, "dropdown-item");
            addClass(remove, "dropdown-item");
            addText(next, "Move to next person in line.");
            next.addEventListener("click", function (event) {
              var postID = $(this).parent().get(0).id;
              var confirmID = createID(true);
              db.collection("posts").doc(postID).update({
                queue: firebase.firestore.FieldValue.arrayRemove(user.uid),
                confirmation: confirmID
              });
            });
            append(next, ul);
            editItem.setAttribute("data-bs-toggle", "modal");
            editItem.setAttribute("data-bs-target", "#editModal");
            addText(editItem, "Edit");
            editItem.id = "edit" + index;
            append(editItem, ul);
            addClass(remove, "dropdown-item text-danger");
            addText(remove, "Close post");
            remove.setAttribute("data-bs-toggle", "modal");
            remove.setAttribute("data-bs-target", "#closeModal");
            remove.id = "close" + index;
            append(remove, ul);
          }
          append(cardWrapper, cardRoot);
        }
      });
    });
    removeSpinner();
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

function createNewPost(title, body, owner, email) {
  var root = storage.ref();
  var ID = createID(false);
  var ref = root.child(ID);
  var uTel;
  db.collection("users").doc(owner).get().then((doc) => {
    uTel = doc.data().tel;
  });
  db.collection("posts").doc(ID).set({
    hide: false,
    owner: owner,
    c1: window.btoa(email),
    c2: window.btoa(uTel),
    title: title,
    body: body,
    image: ref.toString(),
    queue: new Array < String > (25),
    addTime: new Date().getTime(),
    school: "Towson"
  }).catch((error) => {
    console.log(error.message + ": " + error.stack);
  });
}

function createID(small) {
  if (small) {
    let idPart = () => Math.floor((1 + Math.random(20)) * Math.random(5) * 0xABCDEF).toString(16);
    return idPart();
  } else {
    let idPart = () => Math.floor((1 + Math.random(20)) * Math.random(5) * 0xABCDEF).toString(16);
    return idPart() + '-' + idPart() + '-' + idPart();
  }
}

function postModalHandler() {
  var user = firebase.auth().currentUser
  var pt = document.getElementById("postTitle");
  var pb = document.getElementById("postBody");
  var owner = user.uid
  var email = user.email
  createNewPost(pt.value, pb.value, owner, email);
}