import { useState } from 'react';
import { uploadImage, getImageUrl } from '@/app/utils/letter/imageAction';

export const useImageUpload = (userId: string | null) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
  };

  const uploadImageAndGetUrl = async (file: File): Promise<string> => {
    const encodedPath = `letters/${userId}_${Date.now()}.png`;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('path', encodedPath);

    await uploadImage(formData);
    return getImageUrl(encodedPath);
  };

  return {
    imageFile,
    imagePreview,
    setImageFile,
    setImagePreview,
    handleImageChange,
    uploadImageAndGetUrl
  };
};
