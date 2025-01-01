import { create } from 'zustand';
import { onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH as auth } from '../FirebaseConfig';

interface AuthState {
  user: { uid: string; email: string } | null;
  loading: boolean;
}

export const useAuthStore = create<AuthState>((set) => {
  onAuthStateChanged(
    auth,
    (user) => {
      if (user) {
        set({ user: { uid: user.uid, email: user.email ?? '' }, loading: false });
      } else {
        set({ user: null, loading: false });
      }
    },
    (error) => {
      console.error('Error in onAuthStateChanged:', error);
      set({ loading: false });
    }
  );

  return {
    user: null,
    loading: true,
  };
});
