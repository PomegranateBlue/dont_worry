import { create } from 'zustand';
import { devtools } from 'zustand/middleware';


type UserState = {
  userId: string | null;
  setUser: (user: string | null) => void;
};

export const useUserStore = create<UserState>((set) => ({
  userId: null,
  setUser: (userId) => set({ userId })
}));
