import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type UserState = {
  user: string | null;
  setUser: (user: string | null) => void;
  hydrated: boolean;
  setHydrated: () => void;
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      hydrated: false,
      setHydrated: () => set({ hydrated: true })
    }),
    {
      name: 'auth-storage',
      storage:
        typeof window !== 'undefined'
          ? createJSONStorage(() => localStorage)
          : undefined,
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      }
    }
  )
);
