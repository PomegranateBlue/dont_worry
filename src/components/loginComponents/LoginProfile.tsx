'use client';
// import { useUserInfo } from '@/hooks/useMyPageQueries';
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

const LoginProfile = () => {
  const { data: userData } = useUserInfo();
  console.log('userData', userData);
  return (
    <div className="flex items-center gap-3">
      <Image
        src={userData?.profile_img || '/images/profile-default-image.svg'}
        alt="프로필 이미지"
        width={32}
        height={32}
        className="rounded-full"
      />
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="flex items-center">
            <Text variant="title2" color="label-neutral">
              {userData?.nickname} 님
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
          <DropdownMenuItem>
            <Link href="/mypage">
              <Text variant="body3" color="label-neutral">
                마이페이지
              </Text>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="">
            <Text variant="body3" color="label-neutral">
              <LogOutButton />
            </Text>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/letter">
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
