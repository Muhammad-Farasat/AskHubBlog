//<------------Import FireBase------------------->

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import {getFirestore, getDocs, collection} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

//<--------------API Key------------->

const firebaseConfig = {
    apiKey: "AIzaSyALIayX15MobwzJMDdnYGxLbp1WF1oZ_58",
    authDomain: "farasat-ask-hub-blog.firebaseapp.com",
    databaseURL: "https://farasat-ask-hub-blog-default-rtdb.firebaseio.com",
    projectId: "farasat-ask-hub-blog",
    storageBucket: "farasat-ask-hub-blog.appspot.com",
    messagingSenderId: "557630976948",
    appId: "1:557630976948:web:443d1263e1a6c3ad80f8e1",
    measurementId: "G-HND7GC8L67"
};


//<---------Initilize FireBase------------->

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

//<--------------Initilize HTML----------->

const loginButton = document.getElementById("login");
const blogsContainer = document.getElementById("blogsContainer");
blogsContainer.innerHTML = "";

//<------------Functions------------>

onAuthStateChanged(auth, (user) => {
    if (user) {
        loginButton.textContent = "Logout";
            loginButton.onclick = handleLogoutClick;
    } else {
        loginButton.textContent = "Login";
            loginButton.onclick = handleLoginClick;
        };
});
function handleLoginClick() {
    // Redirect to login page
    window.location.href = "./login.html";
}
function handleLogoutClick() {
    // Sign out the user
    auth.signOut().then(() => {
        console.log("User signed out successfully.");
    }).catch((error) => {
        console.error("Error signing out:", error);
    });
}


getDocs(collection(db, "blogs")).then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        const blogData = doc.data();
        const blogElement = document.createElement("div");
        blogElement.className = "post text-white pt-2 px-3 pb-1 bg-[#242526] w-[80%] my-[10px] mx-[auto]"
        blogElement.innerHTML = `
            <h2 class= "text-3xl font-semibold">${blogData.title}</h2>
            <p>${blogData.description}</p>
            <p class="font-semibold"><i class="fa-solid fa-user font-semibold"></i> ${blogData.username}</p>
        `;
        blogsContainer.appendChild(blogElement);
    });
}).catch((error) => {
    console.error("Error getting blogs: ", error);
});

