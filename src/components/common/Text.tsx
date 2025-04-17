import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { ElementType, ReactNode } from 'react';

const textVariants = cva('', {
  variants: {
    variant: {
      display1: `text-[40px] leading-[135%] font-[600] ibmSans`, // ibmSans 폰트 적용
      display2: `text-[36px] leading-[135%] font-[600] ibmSans`,
      display3: `text-[32px] leading-[135%] font-[600] ibmSans`,
      heading1: `text-[28px] leading-[135%] font-[600] ibmSans`, // pretendard 폰트 적용
      heading2: `text-[24px] leading-[135%] font-[600] ibmSans`,
      heading3: `text-[22px] leading-[135%] font-[600] ibmSans`,
      title1: `text-[20px] leading-[135%] font-[600] pretendard`,
      title2: `text-[18px] leading-[135%] font-[600] pretendard`,
      body1: `text-[18px] leading-[150%] font-medium pretendard`,
      body2: `text-[16px] leading-[150%] font-medium pretendard`,
      body3: `text-[14px] leading-[150%] font-medium pretendard`,
      label1: `text-[12px] leading-[150%] font-regular pretendard`
    },
    color: {
      default: 'text-black',
      white: 'text-white',
      error: 'text-error',
      success: 'text-success',
      primary1: 'text-primary-1',
      primary2: 'text-primary-2',
      primary3: 'text-primary-3',
      primary4: 'text-primary-4',
      'label-neutral': 'text-label-neutral',
      'label-alternative': 'text-label-alternative', //#858588
      'label-normal': 'text-label-normal', //#171719
      'label-assistive': 'text-label-assistive' //#C7C8C9
    }
  },
  defaultVariants: {
    color: 'default'
  }
});

type TextProps = VariantProps<typeof textVariants> & {
  as?: ElementType;
  children: ReactNode;
  className?: string;
};

export default function Text({
  as: Component = 'p',
  children,
  variant = 'body1',
  color = 'default',
  className,
  ...props
}: TextProps) {
  return (
    <Component
      className={cn(textVariants({ variant, color }), className || '')}
      {...props}
    >
      {children}
    </Component>
  );
}

/*
실제사용예시
기본 p태그, 다른태그 사용시 as / variant : 텍스트속성 / color : 컬러
<Text as="h1" variant="display1" color="error">
  경고 메시지!
</Text>
*/
