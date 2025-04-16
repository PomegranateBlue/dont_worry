import { useEffect, useState } from 'react';
import { PencilLine, X } from 'lucide-react';
import Image from 'next/image';

interface ProfileImageProps {
  imageUrl?: string;
  onUpload: (file: File) => void;
  onDelete: () => void;
}

const ProfileImage = ({ imageUrl, onUpload, onDelete }: ProfileImageProps) => {
  const [preview, setPreview] = useState<string | null>(imageUrl || null);

  useEffect(() => {
    return () => {
      if (preview && preview !== imageUrl) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview, imageUrl]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (preview && preview !== imageUrl) {
        URL.revokeObjectURL(preview);
      }
      setPreview(URL.createObjectURL(file));
      onUpload(file);
    }
  };

  const handleDelete = async () => {
    try {
      await onDelete();
      setPreview(null);
    } catch (error) {
      console.error('Failed to delete image:', error);
    }
  };

  return (
    <div className="relative w-28 h-28 overflow-hidden">
      {preview ? (
        <Image
          width={200}
          height={100}
          src={preview}
          alt="프로필 이미지"
          priority
          unoptimized
          className="object-cover rounded-full w-full h-full"
        />
      ) : (
        <Image
          src="/images/profile-default-image.svg"
          alt="프로필 이미지"
          className="object-cover w-full h-full"
          width={100}
          height={200}
          unoptimized
          priority
        />
      )}

      <label className="absolute bottom-0 right-0 bg-black w-8 h-8 rounded-full flex items-center justify-center cursor-pointer">
        <PencilLine color="white" size={16} />
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleChange}
        />
      </label>

      {preview && (
        <button
          className="absolute top-0 right-0 bg-black w-4 h-4 rounded-full flex items-center justify-center"
          onClick={handleDelete}
        >
          <X color="white" size={12} />
        </button>
      )}
    </div>
  );
};

export default ProfileImage;
