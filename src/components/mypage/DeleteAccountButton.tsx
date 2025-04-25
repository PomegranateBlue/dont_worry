'use client';

import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/auth/store';
import { useState } from 'react';
import Text from '../common/Text';
import { deleteUserAccount } from '@/app/utils/auth/logoutUser';

export default function DeleteAccountButton() {
  const { user, setUser } = useUserStore();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDeleteAccount = async () => {
    const confirmed = confirm(
      '탈퇴 시, 모든 기록이 사라지며 복구할 수 없어요.'
    );
    if (!confirmed || !user) return;

    setLoading(true);

    try {
      const { success, error } = await deleteUserAccount(user);

      if (!success) {
        throw error || new Error('회원탈퇴 처리 실패');
      }

      setUser(null);
      router.push('/');
    } catch (error) {
      alert('회원탈퇴 중 오류가 발생했습니다.');
      console.error('삭제 오류:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleDeleteAccount} disabled={loading}>
      <Text variant={'body3'} className="text-label-alternative underline">
        {loading ? '탈퇴 처리 중...' : '회원탈퇴'}
      </Text>
    </button>
  );
}
