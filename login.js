//<---------------Import FireBase------------->
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";


//<-----------API Key---------->
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


//<-----------Initilize FireBase---------->
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


//<------------Initilize HTML------------>
const email = document.getElementById("mail");
const password = document.getElementById("pass");
const msg = document.getElementById("msg");
const loginBtn = document.getElementById("log-in");


//<----------Functions------------>
const logIn = () =>{ signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {

    const user = userCredential.user;
    window.location.href = "./index.html";
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    msg.style.display = "block";
  });
}


//<-------------Button(s)--------------->
loginBtn.addEventListener("click", logIn);