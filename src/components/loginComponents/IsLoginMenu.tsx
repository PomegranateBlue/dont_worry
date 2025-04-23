import Link from 'next/link';
import React from 'react';
import Text from '../common/Text';

export const IsLoginMenu = () => {
  return (
    <div className="flex flex-col gap-1 items-start headerMd:flex-row headerMd:gap-11">
      <Link href="/note" className="py-4 headerMd:py-0">
        <Text variant="title2" color="label-neutral">
          걱정 작성
        </Text>
      </Link>
      <Link href="/notebox" className="py-4 headerMd:py-0">
        <Text variant="title2" color="label-neutral">
          걱정 보관함
        </Text>
      </Link>
      <Link href="/ranking" className="py-4 headerMd:py-0">
        <Text variant="title2" color="label-neutral">
          통계
        </Text>
      </Link>
      <Link href="/letter" className="py-4 headerMd:py-0">
        <Text variant="title2" color="label-neutral">
          미래편지 작성
        </Text>
      </Link>
    </div>
  );
};
