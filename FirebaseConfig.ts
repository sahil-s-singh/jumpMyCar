// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDh_CAEqmNyAtALSfwdKXoF1ORBMxai-sI",
  authDomain: "jump-my-car.firebaseapp.com",
  projectId: "jump-my-car",
  storageBucket: "jump-my-car.firebasestorage.app",
  messagingSenderId: "640086958059",
  appId: "1:640086958059:web:39f175304d1815b85e43ae"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);