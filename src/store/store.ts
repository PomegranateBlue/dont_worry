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
  persist( //todo: 데이터 생명주기 확인
    (set) => ({
      user: null, //localStorage.getItem('auth-storage'), //null
      setUser: (user) => set({ user })
    }),
    {
      name: 'auth-storage'
    }
  )
);
