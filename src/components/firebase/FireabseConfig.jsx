// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDwO3AqkaUjoKXvZCjwa4kX-O2HipiYNOQ",
  authDomain: "mysecondapp-87d88.firebaseapp.com",
  projectId: "mysecondapp-87d88",
  storageBucket: "mysecondapp-87d88.appspot.com",
  messagingSenderId: "959893100215",
  appId: "1:959893100215:web:e38c27fb2c83b8bb53df32",
  measurementId: "G-Z15Z39JXM5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and Auth
const fireDB = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Export the initialized services
export { auth, provider, fireDB };