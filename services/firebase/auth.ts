// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Replace with your Firebase project config
const firebaseConfig = {
    apiKey: "AIzaSyDmAjfnBcFz2VqQ_MPSgpINyKwiLb7DnG8",
    authDomain: "buddyweight-dc076.firebaseapp.com",
    projectId: "buddyweight-dc076",
    storageBucket: "buddyweight-dc076.appspot.com",
    //messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    //appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Auth and Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);
