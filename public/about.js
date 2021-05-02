window.onload = () => {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user != null) {
            var nav = document.getElementById("navholder");
            var CANav = document.getElementById("createaccount");
            var SINav = document.getElementById("signin");
            nav.removeChild(CANav);
            nav.removeChild(SINav);
            createNavItem(nav, "Account", "account.html");
            createNavItem(nav, "Sign out", "signout.html");
        }
    });
    var status = document.getElementById("logStatus");
    var aboutDiv = document.createElement("div");
    aboutDiv.id = "about";
    var about = document.createElement("h6");
    about.textContent = "Every year, at colleges across the nation, move out is one of the most hectic times of the year. Figuring out how you'll get home, and what stuff you can bring with you, is one of the greatest challenges. Because of this, a lot of items that are perfectly good for people to use end up in a landfill. Well, not anymore. Curbid is a new way to pass on the items you no longer want or use, or unable to take with you, to other students who can, saving them from ending up in a landfill. We are currently open to Towson University students only, but we hope to be able to serve many other communities soon."
    status.appendChild(aboutDiv);
    aboutDiv.appendChild(about);
    var howDiv = document.createElement("div");
    howDiv.id = "how";
    status.appendChild(howDiv);
    aboutDiv.appendChild(document.createElement("br"));
    var howT = document.createElement("h5");
    howT.textContent = "Here's how it works:";
    aboutDiv.appendChild(howT);
    var how = document.createElement("p");
    how.innerHTML = "<strong>For item seekers:</strong>";
    aboutDiv.appendChild(how);
    var how2 = document.createElement("p");
    how2.innerHTML = "Step 1: Create an account or sign in. You can do that by clicking the three bars at the top left of the screen.";
    aboutDiv.appendChild(how2);
    var how3 = document.createElement("p");
    how3.innerHTML = "Step 2: Browse the posts to find something you like.";
    aboutDiv.appendChild(how3);
    var how4 = document.createElement("p");
    how4.innerHTML = "Step 3: Click the options button on the post, then get.";
    aboutDiv.appendChild(how4);
    var how5 = document.createElement("p");
    how5.innerHTML = "Step 4: See what position you're in.";
    aboutDiv.appendChild(how5);
    var how6 = document.createElement("p");
    how6.innerHTML = "If you're first, congrats, you've got dibs on the item! You are given the contact information of the owner to set up a time and place to get it. If you find you can't pick up the item, please make sure to leave the queue, so the next person can get it. Otherwise, you'll be informed what position you're in, and how many are in front of you.";
    aboutDiv.appendChild(how6);
    aboutDiv.appendChild(document.createElement("p"));
    var how7 = document.createElement("br");
    how7.innerHTML = "<strong>For item owners:</strong>";
    aboutDiv.appendChild(how7);
    var how8 = document.createElement("p");
    how8.innerHTML = "Step 1: Create an account or sign in. You can do that by clicking the three bars at the top left of the screen.";
    aboutDiv.appendChild(how8);
    var how9 = document.createElement("p");
    how9.innerHTML = "Step 2: Go to your account page via the navigation bar and enter your contact info. This is only given to the first person in line, so they can set up a time and place to get it. You can leave info blank, but your email will be used as a method of contact. After entering your info, hit Update.";
    aboutDiv.appendChild(how9);
    var how10 = document.createElement("p");
    how10.innerHTML = "Step 3: After returning to the homepage by clicking the logo, click the \"Create Post\" button in the bottom left.";
    aboutDiv.appendChild(how10);
    var how11 = document.createElement("p");
    how11.innerHTML = "Step 4: Add the details of your post, give it a title, and include a picture if you want.";
    aboutDiv.appendChild(how11);
    var how12 = document.createElement("p");
    how12.innerHTML = "Step 5: Wait for seekers to contact you! If you need to edit your post, feel free to do so by clicking Options, then Edit.";
    aboutDiv.appendChild(how12);
    var how13 = document.createElement("p");
    how13.innerHTML = "Step 6: After the item has been passed off, make sure to close your post, so other users know that this item was taken.";
    aboutDiv.appendChild(how13);
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