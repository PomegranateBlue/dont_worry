import { supabase } from '@/app/utils/supabase/supabase';
import { showToast } from '@/components/common/Toast';

const BUCKET_NAME = process.env.NEXT_PUBLIC_STORAGE_BUCKET!;

// create - 이미지 업로드하기
export const uploadImage = async (formData: FormData) => {
  const file = formData.get('file') as File;
  const path = formData.get('path') as string;

  if (!file || !path) {
    throw new Error('file 또는 path가 FormData에 없습니다.');
  }

  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(path, file, { upsert: true });

  if (error) throw error;
  return {
    data
  };
};

// read - 이미지 url 가져오기
export const getImageUrl = (path: string) => {
  const { data } = supabase.storage.from(BUCKET_NAME).getPublicUrl(path);
  return data.publicUrl;
};

// Update - 이미지 수정하기
export const updateImage = async (formData: FormData) => {
  const result = await uploadImage(formData); // 이미지 업로드 로직 재사용, 중복 불필요하면 삭제할 예정
  showToast('이미지가 수정되었습니다.', 'success');
  return result;
};

// Delete - 이미지 삭제하기
export const deleteImage = async (path: string) => {
  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .remove([path]);

  if (error) throw error;

  showToast('이미지를 삭제했습니다.', 'success');
  return data;
};
