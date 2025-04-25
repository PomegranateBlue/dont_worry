'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/auth/store';
import Text from '../common/Text';
import { signOutUser } from '@/app/utils/auth/logoutUser';

interface LogOutButtonProps {
  textVariant?: 'body3';
  textColor?: 'label-alternative' | 'label-neutral' | 'default';
  className?: string;
}

const LogOutButton = ({
  textVariant = 'body3',
  textColor = 'default',
  className
}: LogOutButtonProps) => {
  const { setUser } = useUserStore();
  const router = useRouter();

  const handleSignOut = async () => {
    const { success } = await signOutUser();

    if (success) {
      setUser(null);
      router.push('/');
      router.refresh();
    } else {
      router.push('/error');
    }
  };

  return (
    <button onClick={handleSignOut}>
      <Text variant={textVariant} color={textColor} className={className}>
        로그아웃
      </Text>
    </button>
  );
};

export default LogOutButton;
