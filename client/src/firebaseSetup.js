// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAG8aZNWcJEFGT4uvt7ruibK4xcCfFuB2k",
  authDomain: "slughubbing.firebaseapp.com",
  projectId: "slughubbing",
  storageBucket: "slughubbing.firebasestorage.app",
  messagingSenderId: "680081976058",
  appId: "1:680081976058:web:06b77f558c6980cb78b743",
  measurementId: "G-L8Z6J4L4MN"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firestore database
const db = getFirestore(app);

export { db };