'use client';

import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/auth/store';
import { useState } from 'react';
import browserClient from '@/app/utils/supabase/client';
import Text from '../common/Text';

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

    const { error } = await browserClient
      .from('users')
      .update({ is_deleted: true }) // 소프트 삭제
      .eq('user_id', user);

    if (error) {
      alert('회원탈퇴 중 오류가 발생했습니다.');
      console.error('삭제 오류:', error);
      setLoading(false);
      return;
    }

    // 로그아웃 처리
    await browserClient.auth.signOut();
    setUser(null); // Zustand 상태 초기화
    router.push('/'); // 홈으로 이동
  };

  return (
    <button onClick={handleDeleteAccount} disabled={loading}>
      <Text variant={'body3'} className="text-label-alternative underline">
        {loading ? '탈퇴 처리 중...' : '회원탈퇴'}
      </Text>
    </button>
  );
}
