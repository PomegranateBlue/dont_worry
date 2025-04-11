'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useUpdateUserInfo, useUserInfo } from '@/hooks/useMyPageQueries';
import { useEffect } from 'react';

// 닉네임만을 위한 유효성 검증 스키마
const nicknameSchema = z.object({
  nickname: z.string().min(2, '닉네임은 최소 2자 이상이어야 합니다')
});

type NicknameFormValues = z.infer<typeof nicknameSchema>;

const NicknameEditModal = ({
  isOpen,
  onClose
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { data: userInfo } = useUserInfo();
  const updateMutation = useUpdateUserInfo();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm<NicknameFormValues>({
    resolver: zodResolver(nicknameSchema),
    defaultValues: {
      nickname: userInfo?.nickname || ''
    }
  });

  useEffect(() => {
    if (userInfo?.nickname) {
      setValue('nickname', userInfo.nickname);
    }
  }, [userInfo, setValue]);

  const onSubmit = (data: NicknameFormValues) => {
    // 닉네임만 업데이트
    updateMutation.mutate(
      { nickname: data.nickname },
      {
        onSuccess: () => {
          onClose();
          reset();
        },
        onError: (error) => {
          console.log('Failed to update nickname:', error);
        }
      }
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className="bg-white p-6 rounded-lg w-full max-w-md m-8"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onKeyDown={(e) => {
          if (e.key === 'Escape') onClose();
        }}
      >
        <h2 id="modal-title" className="text-xl font-bold mb-4">
          닉네임 변경
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="nickname"
              className="block text-sm font-medium mb-1"
            >
              닉네임
            </label>
            <input
              id="nickname"
              className="w-full p-2 border border-gray-300 rounded-lg"
              {...register('nickname')}
            />
            {errors.nickname && (
              <p className="text-red-500 mt-1 text-sm">
                {errors.nickname.message}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 hover:bg-gray-100 rounded-lg"
            >
              취소
            </button>
            <button
              type="submit"
              disabled={updateMutation.isPending}
              className="px-4 py-2 bg-primary-4 hover:bg-opacity-70 text-white rounded-lg transition duration-300"
            >
              {updateMutation.isPending ? '저장 중...' : '저장하기'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NicknameEditModal;
