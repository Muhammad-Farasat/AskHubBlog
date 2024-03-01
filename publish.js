//<-----------Import FireBase---------------->
// import auth from "basic-auth";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {getFirestore, collection, addDoc, Timestamp,} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import {getAuth} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";


//<-----------API key------------>
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

//<--------------Initilize FireBase------------->
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

//<------------Initilize HTMl--------------->

// debugger

const saveBtn = document.getElementById("saveBtn");

    saveBtn.addEventListener("click", async () => {
        const title = document.getElementById("titleInput").value;
        const category = document.getElementById("categorySelect").value;
        const type = document.querySelector('input[name="type"]:checked').value;
        const status = document.querySelector('input[name="status"]:checked').value;
        const description = document.getElementById("descriptionInput").value;
        const currentUser = auth.currentUser;
        const username = currentUser.displayName;
        
        // function firebaseTimestampToDate(timestamp) {
        //     // Convert Firebase timestamp to milliseconds
        //     const milliseconds = timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000;
            
        //     // Create a new Date object using milliseconds
        //     const date = new Date(milliseconds);
        
        //     return date;
        // }

        // const firebaseTimestamp = { seconds: 1614570000, nanoseconds: 0 };


        // const date = firebaseTimestampToDate(firebaseTimestamp);
        // console.log(date);
        

        if (!currentUser) {
            alert("User not signed in!");
            console.error("Please Sign up first!");
            return;
        }

        try {
            // Add blog data to Firestore
            const docRef = await addDoc(collection(db, "blogs"), {
                title: title,
                category: category,
                type: type,
                status: status,
                description: description,
                username: username,
            });
             console.log("Blog published with ID: ", docRef.id);
            // Redirect to index page or show success message
            window.location.href = "./index.html";
        } catch (error) {
            console.log("Error adding blog: ", error);
            alert("Something went wrong!")
        }
    });