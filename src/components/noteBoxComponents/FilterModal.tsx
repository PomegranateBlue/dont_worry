// components/FilterModal.tsx
interface Props {
  onClose: () => void;
}

const FilterModal = ({ onClose }: Props) => {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-end">
      {/* 배경 클릭 시 닫힘 */}
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-[375px] bg-white rounded-t-2xl p-4 z-10">
        <h2 className="text-lg font-bold text-center mb-4">작성순</h2>
        <div className="grid grid-cols-3 gap-2">
          {['최신순', '오래된순', '가나다순'].map((item) => (
            <button
              key={item}
              className="border rounded-full px-3 py-1 text-sm"
            >
              {item}
            </button>
          ))}
        </div>
        <div className="mt-6 flex justify-between">
          <button className="text-sm text-gray-400">초기화</button>
          <button
            className="bg-black text-white px-4 py-2 text-sm rounded-full"
            onClick={onClose}
          >
            12개 결과보기
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
