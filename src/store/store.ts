import { create } from 'zustand';

type UserState = {
  userId: string | null;
  setUser: (user: string | null) => void;
};

export const useUserStore = create<UserState>((set) => ({
  userId: null,
  setUser: (userId) => set({ userId })
}));
