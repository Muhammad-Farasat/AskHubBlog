import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";


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

//<---------Initialize Firebase------------>

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


//<---------Initialize HTML---------->
const email = document.getElementById("mail");
const password = document.getElementById("pass");
const loginBtn = document.getElementById("signup");
const userNamer = document.getElementById("use");

//<-----------Functions-------------->

auth.onAuthStateChanged((user) => {
    if (user) {
        // User is signed in
        if (user.emailVerified) {
            // Email is verified, redirect to another page
            window.location.href = "./index.html";
            console.log(userNamer + "you have signed up successfully!");
        } else {
            // Email is not verified
            console.log("Email is not verified.");
        }
    } else {
        // User is signed out
        console.log("User is signed out.");
    }
});

const signUp = () => { 

    const username = userNamer.value;

        createUserWithEmailAndPassword(auth, email.value, password.value)
            .then((userCredential) => {
                // Signed up
                updateProfile(auth.currentUser, {
                    displayName: username
                  }).then(() => {
                    alert("Username added successfully!" + username)
                  }).catch((error) => {
                    alert("Error occured!")
                  });
                const user = userCredential.user;
                // Send email verification
                sendEmailVerification(user).then(() => {
                    // Email sent.
                    alert("Verification email sent. Please verify your email before signing in.");
                }).catch((error) => {
                    // An error happened.
                    alert("Error sending verification email:", error);
                });              
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert("Problem detected: " + errorMessage);
            });
    
};



//<------------Add Eventlistener------------>
loginBtn.addEventListener('click',signUp);