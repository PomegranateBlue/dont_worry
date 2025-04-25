'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect } from 'react';
import { useUserInfo } from '@/hooks/userHooks/useUserInfo';
import { useUpdateUserInfo } from '@/hooks/mypageHooks/useProfileUpdate';
import Text from '../common/Text';

const nicknameSchema = z.object({
  nickname: z
    .string()
    .min(2, '닉네임은 최소 2자 이상이어야 합니다')
    .max(10, '닉네임은 최대 10자까지 가능합니다')
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

  const onSubmit = async (data: NicknameFormValues) => {
    try {
      await updateMutation.mutateAsync({ nickname: data.nickname });
      onClose();
      reset();
    } catch (error) {
      console.log('닉네임 수정 실패:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ">
      <div
        className="bg-white p-5 rounded-[20px] w-80 max-w-md m-8 xl:w-[480px] "
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onKeyDown={(e) => {
          if (e.key === 'Escape') onClose();
        }}
      >
        <div id="modal-title" className="mb-6 text-left">
          <Text variant="heading2" color="label-normal">
            닉네임
          </Text>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <input
              id="nickname"
              className="w-full p-4 border border-gray-300 rounded-lg mb-2 placeholder-label-assistive"
              placeholder={userInfo?.nickname ?? ''}
              {...register('nickname')}
            />
            <Text variant="body3" color="label-assistive">
              닉네임은 (임의 한영숫자 최대 10자)까지 가능합니다
            </Text>
            {errors.nickname && (
              <p className="text-red-500 mt-1 text-sm">
                {errors.nickname.message}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-2 mt-8">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-label-assistive bg-interaction-inactive border border-gray-300 hover:bg-opacity-70 rounded-lg"
            >
              취소
            </button>
            <button
              type="submit"
              disabled={updateMutation.isPending}
              className="flex-1 px-5 py-2 bg-primary-4 hover:bg-opacity-70 text-white rounded-lg transition duration-300"
            >
              {updateMutation.isPending ? '수정 중...' : '수정하기'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NicknameEditModal;
