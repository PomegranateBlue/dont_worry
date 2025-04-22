'use client';
import { createClient } from '@/app/utils/supabase/client';
import { useUserStore } from '@/store/auth/store';
import React, { ReactNode, useEffect } from 'react';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const supabase = createClient();
  const { setUser } = useUserStore();

  useEffect(() => {
    // const getUser1 = async () => {
    //   const { data: a } = await supabase.auth.getUser();
    //   console.log('provider', a);
    // };
    // getUser1();
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      console.log(event, session);

      if (event === 'INITIAL_SESSION') {
        // handle initial session
        console.log(session);
        if (session) {
          console.log(session?.user?.id);
          setUser(session?.user?.id);
        }
      } else if (event === 'SIGNED_IN') {
        // handle sign in event
      } else if (event === 'SIGNED_OUT') {
        // handle sign out event
      } else if (event === 'PASSWORD_RECOVERY') {
        // handle password recovery event
      } else if (event === 'TOKEN_REFRESHED') {
        // handle token refreshed event
      } else if (event === 'USER_UPDATED') {
        // handle user updated event
      }
    });
    return () => {
      // call unsubscribe to remove the callback
      data.subscription.unsubscribe();
    };
  }, []);

  return <>{children}</>;
};
