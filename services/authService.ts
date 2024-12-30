import { signInWithEmailAndPassword, createUserWithEmailAndPassword, UserCredential, signOut } from 'firebase/auth';
import { FIREBASE_AUTH as auth } from '../FirebaseConfig'; // Your Firebase initialization file

// Login function
export const loginUser = async (email: string, password: string): Promise<UserCredential> => {
  return await signInWithEmailAndPassword(auth, email, password);
};

// Register function
export const registerUser = async (email: string, password: string): Promise<UserCredential> => {
  return await createUserWithEmailAndPassword(auth, email, password);
};


export const logoutUser = async (): Promise<any> => {
  return await signOut(auth);
}; 
