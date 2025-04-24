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
      <div className="bg-white rounded-[20px] p-5 w-80 shadow-lg relative xl:w-[480px]">
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
            unoptimized
          />
        </div>

        <div className="text-left mb-8">
          <Text variant="heading3" variant2="heading2" color="label-normal">
            프로필 사진 설정
          </Text>
        </div>

        <label className="flex items-center gap-3 border-b cursor-pointer hover:opacity-80 pb-5 pt-5">
          <ImagePlus size={24} />
          <Text variant="title2" variant2="title1" color="label-neutral">
            라이브러리에서 선택
          </Text>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>

        <div className="flex items-center pb-5 pt-5 gap-3 text-error hover:opacity-80">
          <button
            onClick={() => {
              onDelete();
              onClose();
            }}
            className="flex gap-2"
          >
            <Trash2 size={24} />
            <Text variant="title2" variant2="title1" color="error">
              현재 사진 삭제
            </Text>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileImageEditModal;
