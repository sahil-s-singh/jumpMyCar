import { initializeApp } from "firebase/app";
import { initializeAuth, 
  // @ts-ignore
  getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyDh_CAEqmNyAtALSfwdKXoF1ORBMxai-sI",
  authDomain: "jump-my-car.firebaseapp.com",
  projectId: "jump-my-car",
  storageBucket: "jump-my-car.firebasestorage.app",
  messagingSenderId: "640086958059",
  appId: "1:640086958059:web:39f175304d1815b85e43ae"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with persistent storage
export const FIREBASE_AUTH = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
