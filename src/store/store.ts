import { create } from 'zustand';
// import { devtools } from 'zustand/middleware';

type UserState = {
  user: string | null;
  setUser: (user: string | null) => void;
};

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user })
}));
