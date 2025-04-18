import { useState } from 'react';
import Image from 'next/image';

interface Post {
  id: number;
  content: string;
  imageUrl?: string;
}

const CommunityPostCard = ({
  post,
  onDelete
}: {
  post?: Post;
  onDelete: (id: number) => void;
}) => {
  const [content, setContent] = useState(post ? post.content : '');
  const [image, setImage] = useState<File | null>(null);
  const [isEditing, setIsEditing] = useState(!post);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content) {
      console.log('게시물 내용:', content);
      if (image) {
        console.log('업로드된 이미지:', image.name);
      }
    }
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (post && post.id) {
      onDelete(post.id);
    }
  };

  return (
    <div className="p-3 border m-2 rounded shadow-sm">
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <textarea
            placeholder="게시물을 작성하세요"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 mb-2 border"
          />
          <input
            type="file"
            onChange={(e) =>
              setImage(e.target.files ? e.target.files[0] : null)
            }
            className="mb-2"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded"
          >
            {post ? '수정 완료' : '게시물 작성'}
          </button>
        </form>
      ) : (
        <div>
          <p>{post?.content}</p>
          {post?.imageUrl && (
            <Image
              src={post.imageUrl}
              alt="게시물 이미지"
              className="mt-2 w-full h-32 object-cover"
            />
          )}
          <button
            onClick={() => setIsEditing(true)}
            className="mt-2 bg-yellow-500 text-white py-1 px-3 rounded"
          >
            수정
          </button>
          <button
            onClick={handleDelete}
            className="mt-2 ml-2 bg-red-500 text-white py-1 px-3 rounded"
          >
            삭제
          </button>
        </div>
      )}
    </div>
  );
};

export default CommunityPostCard;
