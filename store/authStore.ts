import { create } from 'zustand';
import { onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH as auth } from '../FirebaseConfig';

interface AuthState {
  user: { uid: string; email: string, accessToken: string } | null;
  loading: boolean;
}

export const useAuthStore = create<AuthState>((set) => {
  onAuthStateChanged(
    auth,
    (user: any) => {
      if (user) {
        set({ user: { accessToken: user.accessToken, uid: user.uid, email: user.email ?? '' }, loading: false });
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
