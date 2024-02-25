  
  import { getAuth,createUserWithEmailAndPassword,signOut,signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

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

  const app = initializeApp(firebaseConfig);
  // const analytics = getAnalytics(app);
  const auth = getAuth();
  auth.initializeApp(firebaseConfig);

//Initial HTML classes...
const email = document.getElementById("mail");
const password = document.getElementById("pass");
const signupBtn = document.getElementsByClassName("signup")[0];
const currentPage = window.location.pathname.split("/").pop();
const loginBtn = document.getElementById("login"); //This is of Home page
const logInBtn = document.getElementsByClassName("log-in")[0]; //This is of Login page
const msg = document.getElementsByClassName("message")[0];
const logoutBtn = document.getElementById("logout");


const btn1 = () => {
    createUserWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
            window.location.href = "./index.html";
            loginBtn.style.display = "none";
            logoutBtn.style.display = "block";
            
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
        });
};

const btn2 = () =>{
  signInWithEmailAndPassword(auth, email.value, password.value)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    window.location.href = "./index.html";

  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    msg.style.display = 'block';
  });
}

const btn3 = () => {
  signOut(auth).then(() => {
  // Sign-out successful.
    alert("Sign out Successfully!");
}).catch((error) => {
  // An error happened.
      alert("Something went wrong!");
});
}


signupBtn && signupBtn.addEventListener('click', btn1);
logInBtn && logInBtn.addEventListener('click', btn2);
logoutBtn && logoutBtn.addEventListener('click', btn3);  