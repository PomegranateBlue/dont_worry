import browserClient from '@/app/utils/supabase/client';
import { showToast } from '@/components/common/Toast';
import { updateUserInfo } from '@/app/utils/supabase/db';

export const signOutUser = async () => {
  try {
    const { error } = await browserClient.auth.signOut();
    if (error) throw error;

    localStorage.removeItem('auth-storage');
    showToast('🙏 안녕히가세요 🙏', 'info');

    return { success: true, error: null };
  } catch (error) {
    console.error('로그아웃 오류:', error);
    return { success: false, error };
  }
};

export const deleteUserAccount = async (user: string) => {
  try {
    // 사용자 소프트 삭제
    const updatedUser = await updateUserInfo(user, { is_deleted: true });
    if (!updatedUser) {
      throw new Error('사용자 정보 업데이트 실패');
    }

    await signOutUser();

    return { success: true, error: null };
  } catch (error) {
    console.error('회원탈퇴 오류:', error);
    return { success: false, error };
  }
};
