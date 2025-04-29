'use client';

import { useDeleteLetters } from '@/hooks/letterboxHooks/useDeleteLetters';
import Text from '../common/Text';
import { LETTER_ERROR_KEYS, LetterError } from '@/constants/error/letterError';
import { showToast } from '../common/Toast';

interface EditLetterProps {
  isEdit: boolean;
  setIsEdit: (state: boolean) => void;
  selectedLetterIds: string[];
  setSelectedLetterIds: (ids: string[]) => void;
  isAllSelected: boolean;
  onSelectAll: () => void;
}

const EditLetter = ({
  isEdit,
  setIsEdit,
  selectedLetterIds,
  setSelectedLetterIds,
  isAllSelected,
  onSelectAll
}: EditLetterProps) => {
  const { mutateAsync } = useDeleteLetters();

  // 편집 모드 토글
  const handleToggleEdit = () => {
    setIsEdit(!isEdit); // 편집 모드 상태 변경
    if (isEdit) {
      setSelectedLetterIds([]); // 편집 모드 해제 시 선택 초기화
    }
  };

  // 선택된 편지 삭제
  const handleDeleteLetter = async () => {
    if (selectedLetterIds.length === 0) {
      showToast('삭제할 편지를 선택해주세요.', 'info');
      return;
    }

    if (!confirm('정말 삭제하시겠습니까?')) return;

    try {
      await mutateAsync(selectedLetterIds);
      showToast('삭제가 완료되었습니다.', 'success');
      setSelectedLetterIds([]);
    } catch (error) {
      if (error) {
        throw new LetterError(LETTER_ERROR_KEYS.CANT_DELETE_LETTER); // 403 상태일 경우 CANT_DELETE_LETTER 에러 던짐
      } else {
        throw new Error('알 수 없는 오류가 발생했습니다.');
      }
    }
  };

  return (
    <div>
      {!isEdit ? (
        <button
          onClick={handleToggleEdit}
          className="flex h-[36px] px-2 py-4 justify-center items-center gap-2"
        >
          <Text variant="body3" color="label-alternative">
            편집
          </Text>
        </button>
      ) : (
        <div className="flex justify-between w-full">
          <div className="flex gap-2">
            <button onClick={onSelectAll}>
              <Text variant="body3" color="label-alternative">
                {isAllSelected ? '전체 해제' : '전체 선택'}
              </Text>
            </button>
            <button onClick={handleDeleteLetter}>
              <Text variant="body3" color="label-alternative">
                삭제
              </Text>
            </button>
            <button
              onClick={() => {
                setIsEdit(false);
                setSelectedLetterIds([]);
              }}
            >
              <Text variant="body3" color="label-alternative">
                취소
              </Text>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditLetter;
