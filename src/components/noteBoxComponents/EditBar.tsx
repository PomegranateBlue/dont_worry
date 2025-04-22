'use client';

import Text from '../common/Text';

interface EditBarProps {
  isEdit: boolean;
  selectedNoteIds: string[];
  onToggleEdit: () => void;
  onDelete: () => void;
}

const EditBar = ({
  isEdit,
  selectedNoteIds,
  onToggleEdit,
  onDelete
}: EditBarProps) => {
  return (
    <div className="flex  px-2 py-4 ">
      {isEdit ? (
        <div className="flex gap-2">
          <button
            className={selectedNoteIds.length === 0 ? 'opacity-50' : ''}
            onClick={onDelete}
            disabled={selectedNoteIds.length === 0}
          >
            <Text variant="body3" color="label-alternative">
              삭제
            </Text>
          </button>
          <button onClick={onToggleEdit}>
            <Text variant="body3" color="label-alternative">
              취소
            </Text>
          </button>
        </div>
      ) : (
        <button onClick={onToggleEdit}>
          <Text variant="body3" color="label-alternative" as="p">
            편집
          </Text>
        </button>
      )}
    </div>
  );
};

export default EditBar;
