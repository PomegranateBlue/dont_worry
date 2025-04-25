'use client';

import Text from '@/components/common/Text';
import Image from 'next/image';

export default function ErrorPage() {
  return (
    <div className="flex flex-col items-center gap-5 py-20">
      <Image src="/images/ver-sad.svg" alt="ver-sad" width={100} height={100} />
      <Text variant={'title1'} color={'primary4'}>
        죄송합니다, 오류가 발생하였어요
      </Text>
    </div>
  );
}
