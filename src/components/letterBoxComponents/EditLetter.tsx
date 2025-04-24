'use client';

import { useDeleteLetters } from '@/hooks/letterHooks/useDeleteLetters';

interface EditLetterProps {
  isEdit: boolean;
  setIsEdit: (state: boolean) => void;
  selectedLetterIds: string[];
  setSelectedLetterIds: (ids: string[]) => void;
}

const EditLetter = ({
  isEdit,
  setIsEdit,
  selectedLetterIds,
  setSelectedLetterIds
}: EditLetterProps) => {
  const { mutate } = useDeleteLetters();

  // 편집 모드 토글
  const handleToggleEdit = () => {
    setIsEdit(!isEdit); // 편집 모드 상태 변경
    if (isEdit) {
      setSelectedLetterIds([]); // 편집 모드 해제 시 선택 초기화
    }
  };

  // 선택된 편지 삭제
  const handleDeleteLetter = () => {
    if (selectedLetterIds.length === 0)
      return alert('삭제할 편지를 선택해주세요.');
    if (!confirm('정말 삭제하시겠습니까?')) return;

    mutate(selectedLetterIds, {
      onSuccess: () => {
        alert('삭제가 완료되었습니다.');
        setSelectedLetterIds([]);
      },
      onError: (error) => {
        alert('삭제 중 오류가 발생했습니다.');
        console.error(error);
      }
    });
  };

  return (
    <div className="flex justify-between items-center px-4 py-2">
      <button onClick={handleToggleEdit}>
        {isEdit ? '편집 모드 해제' : '편집 모드'}
      </button>

      {isEdit && (
        <div className="flex gap-2">
          <button onClick={handleDeleteLetter}>삭제</button>
        </div>
      )}
    </div>
  );
};

export default EditLetter;
