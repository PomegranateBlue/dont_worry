// import { User } from '@supabase/supabase-js';
import { create } from 'zustand';
// import { devtools } from 'zustand/middleware';
import { persist } from 'zustand/middleware';

type UserState = {
  user: string | null;
  setUser: (user: string | null) => void;
  // user: User | null;
  // setUser: (user: User | null) => void;
};

// export const useUserStore = create<UserState>((set) => ({
//   user: null,
//   setUser: (user) => set({ user })
// }));

//1.로컬스토리지 없애기 - 쿠키에서 가져오면 된다.
//2.구조정리 - 로그인이 여러곳에서 작동하고있음
//3. 페이지 컴포넌트들 다 서버로 바꾸기 -

//라우터 홈으로 가는거
//쿠키에서 가져오면 된다.
//로컬스토리지에 하면안된다.
export const useUserStore = create<UserState>()(
  persist( //todo: 데이터 생명주기 확인
    (set) => ({

      user: localStorage.getItem('auth-storage'),

      setUser: (user) => set({ user })
    }),
    {
      name: 'auth-storage'
    }
  )
);
