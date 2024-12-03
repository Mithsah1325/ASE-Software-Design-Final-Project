// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCLjVJMnJoZcs4GCAdlyx73WUGPbI_XaVg",
  authDomain: "fitness-tracking-and-analytic.firebaseapp.com",
  projectId: "fitness-tracking-and-analytic",
  storageBucket: "fitness-tracking-and-analytic.firebasestorage.app",
  messagingSenderId: "405494579348",
  appId: "1:405494579348:web:39b2a0d9dd4e17b1aeb481"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);


export { auth, db, googleProvider, setDoc, doc, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut };