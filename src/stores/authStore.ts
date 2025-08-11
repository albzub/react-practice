import { create } from 'zustand';

interface AuthState {
  user: { email: string } | null;
  setUser: (user: { email: string } | null) => void;
  login: (email: string, password: string) => boolean;
  signup: (email: string, password: string) => boolean;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  login: (email, password) => {
    if (email && password.length >6) {
      set({ user: {email}});
      return true;
    }
    return false;
  },
  signup: (email, password) => {
    if (email && password.length > 12 ) {
      set({user: {email}});
      return true;
    }
    return false;
  },
  logout: () => set({ user: null }),
}));

export default useAuthStore;