import { X, Trash2, ImagePlus } from 'lucide-react';
import Image from 'next/image';
import Text from '../common/Text';

interface ProfileImageEditModalProps {
  isOpen: boolean;
  imageUrl?: string;
  onClose: () => void;
  onUpload: (file: File) => void;
  onDelete: () => void;
}

const ProfileImageEditModal = ({
  isOpen,
  imageUrl,
  onClose,
  onUpload,
  onDelete
}: ProfileImageEditModalProps) => {
  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onUpload(file);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-5 w-80 shadow-lg relative xl:w-[480px]">

        <button onClick={onClose} className="absolute top-5 right-5 ">
          <X size={20} />
        </button>

        <div className="flex justify-start mb-8 h-20">
          <Image
            src={imageUrl || '/images/profile-default-image.svg'}
            alt="프로필 사진"
            width={80}
            height={80}
            className="rounded-full object-cover p-2"
          />
        </div>

        <h2 className="text-left mb-8">
          <Text variant="heading2">프로필 사진 설정</Text>
        </h2>

        <label className="flex items-center gap-2 cursor-pointer hover:opacity-80 mb-6 mt-6">
          <ImagePlus size={24} />
          <Text variant="title1" color="label-neutral">
            라이브러리에서 선택
          </Text>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>

        <button
          onClick={() => {
            onDelete();
            onClose();
          }}
          className="flex items-center mb-6 mt-6 gap-2 text-error hover:opacity-80"
        >
          <Trash2 size={24} />
          <Text variant="title1" color="error">
            현재 사진 삭제
          </Text>
        </button>
      </div>
    </div>
  );
};

export default ProfileImageEditModal;
