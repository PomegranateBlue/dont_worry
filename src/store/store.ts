import { create } from 'zustand';
// import { devtools } from 'zustand/middleware';
import { persist } from 'zustand/middleware';

type UserState = {
  user: string | null;
  setUser: (user: string | null) => void;
};

// export const useUserStore = create<UserState>((set) => ({
//   user: null,
//   setUser: (user) => set({ user })
// }));

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null, //localStorage.getItem('auth-storage'), //이 부분이 의심
      setUser: (user) => set({ user })
    }),
    {
      name: 'auth-storage'
    }
  )
);
