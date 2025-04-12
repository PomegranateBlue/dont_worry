import { create } from 'zustand';
// import { devtools } from 'zustand/middleware';
import { createJSONStorage, persist } from 'zustand/middleware';

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
    //todo: 데이터 생명주기 확인
    (set) => ({
      // user: localStorage.getItem('auth-storage'),
      user: null,
      setUser: (user) => set({ user })
    }),
    {
      name: 'auth-storage',
      storage:
        typeof window !== 'undefined'
          ? createJSONStorage(() => localStorage)
          : undefined
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
