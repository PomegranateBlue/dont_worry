import Link from 'next/link';
import React from 'react';
import Text from '../common/Text';

export const IsLoginMenu = () => {
  return (
    <>
      <Link href="/note" className="py-4">
        <Text variant="title2" color="label-neutral">
          걱정 작성
        </Text>
      </Link>
      <Link href="/notebox" className="py-4">
        <Text variant="title2" color="label-neutral">
          걱정 보관함
        </Text>
      </Link>
      <Link href="/ranking" className="py-4">
        <Text variant="title2" color="label-neutral">
          통계
        </Text>
      </Link>
      <Link href="/letter" className="py-4">
        <Text variant="title2" color="label-neutral">
          미래편지 작성
        </Text>
      </Link>
    </>
  );
};
