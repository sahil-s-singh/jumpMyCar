import {create} from 'zustand';

// Define the AuthStore state
interface AuthState {
  user: { uid: string; email: string } | null;
  login: (user: { uid: null|string; email: null|string }) => void;
  logout: () => void;
}

// Create the Zustand store 
export const useAuthStore = create<AuthState>((set: any) => ({
  user: null,
  login: ({ uid, email }) => set({ uid, email }), // Set user on login
  logout: () => set({ user: null }), // Clear user on logout
}));
