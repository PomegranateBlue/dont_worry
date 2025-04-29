import { useState } from 'react';
import { Pencil } from 'lucide-react';
import Image from 'next/image';
import ProfileImageEditModal from './ProfileImageEditModal';

interface ProfileImageProps {
  imageUrl?: string;
  onUpload: (file: File) => void;
  onDelete: () => void;
}

const ProfileImage = ({ imageUrl, onUpload, onDelete }: ProfileImageProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="relative w-28 h-28">
      <Image
        src={imageUrl || '/images/profile-default-image.svg'}
        alt="프로필 이미지"
        width={112}
        height={112}
        className="rounded-full object-cover w-full h-full p-3"

      />

      <button
        onClick={() => setIsModalOpen(true)}
        className="absolute bottom-0 right-1 bg-white w-8 h-8 rounded-full flex items-center justify-center"
      >
        <Pencil size={16} className="text-label-neutral" />
      </button>

      <ProfileImageEditModal
        isOpen={isModalOpen}
        imageUrl={imageUrl}
        onClose={() => setIsModalOpen(false)}
        onUpload={onUpload}
        onDelete={onDelete}
      />
    </div>
  );
};

export default ProfileImage;
