import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type UserState = {
  user: string | null;
  setUser: (user: string | null) => void;
  hydrated: boolean;
  setHydrated: () => void;
};

// export const useUserStore = create<UserState>((set) => ({
//   user: null,
//   setUser: (user) => set({ user })
// }));

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
// export const useUserStore = create<UserState>()(
//   if(typeof window!=="undefiend"){
//     persist(
//       //todo: 데이터 생명주기 확인
//       (set) => ({
//         user: localStorage.getItem('auth-storage'),

//         setUser: (user) => set({ user })
//       }),
//       {
//         name: 'auth-storage',
//       }
//     )
//   }
// );
