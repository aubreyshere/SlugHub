import { db } from "./firebaseSetup.js";
import { collection, getDocs } from "firebase/firestore";

// checks the connection to the Firebase Firestore Database SlugHub
const checkFirestore = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "events"));
    console.log("Firestore connected! Found", querySnapshot.size, "documents.");
  } catch (error) {
    console.error("Firestore connection failed:", error);
  }
};

checkFirestore();