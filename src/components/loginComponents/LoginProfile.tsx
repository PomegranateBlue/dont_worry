'use client';

import { useUserInfo } from '@/hooks/userHooks/useUserInfo';
import Image from 'next/image';
import React from 'react';
import Text from '../common/Text';
import LogOutButton from './LogOutButton';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '../ui/dropdown-menu';
import Link from 'next/link';
import { PATHS } from '@/constants/common/paths';

const LoginProfile = () => {
  const { data: userData } = useUserInfo();
  return (
    <div className="flex items-center gap-3">
      <div className="w-[32px] h-[32px] rounded-full overflow-hidden">
        <Image
          src={userData?.profile_img || '/images/profile-default-image.svg'}
          alt="프로필 이미지"
          width={32}
          height={32}
          className="object-cover object-center w-full h-full"
          unoptimized
        />
      </div>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger>
          <div className="flex items-center">
            <Text variant="title2" color="label-neutral">
              {userData?.nickname}님
            </Text>
            <Image
              src="/images/keyboard-arrow-down.svg"
              alt="ico-down"
              width={24}
              height={24}
            />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem asChild>
            <Link href={PATHS.MYPAGE}>
              <Text variant="body3" color="label-neutral">
                마이페이지
              </Text>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Text variant="body3" color="label-neutral">
              <LogOutButton textColor="label-neutral" />
            </Text>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={PATHS.LETTERBOX}>
              <Text variant="body3" color="label-neutral">
                편지함
              </Text>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default LoginProfile;
