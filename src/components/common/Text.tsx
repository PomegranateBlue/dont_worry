import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { ElementType, ReactNode } from 'react';

const textVariants = cva('', {
  variants: {
    variant: {
      display1: `text-[40px] leading-[135%] ibmSans-600`,
      display2: `text-[36px] leading-[135%] ibmSans-600`,
      display3: `text-[32px] leading-[135%] ibmSans-600`,
      heading1: `text-[28px] leading-[135%] ibmSans-600`,
      heading2: `text-[24px] leading-[135%] ibmSans-600`,
      heading3: `text-[22px] leading-[135%] ibmSans-600`,
      heading4: `text-[26px] leading-[135%] ibmSans-500`,
      heading5: `text-[16px] leading-[135%] ibmSans-500`,
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
      'label-alternative': 'text-label-alternative',
      'label-normal': 'text-label-normal',
      'label-assistive': 'text-label-assistive'
    }
  },
  defaultVariants: {
    color: 'default'
  }
});

// 반응형 스타일을 위한 변형 매핑
const responsiveVariantMap = {
  display1: {
    fontSize: 'xl:text-[40px]',
    lineHeight: 'xl:leading-[135%]',
    fontWeight: 'xl:font-[600]',
    fontFamily: 'xl:ibmSans'
  },
  display2: {
    fontSize: 'xl:text-[36px]',
    lineHeight: 'xl:leading-[135%]',
    fontWeight: 'xl:font-[600]',
    fontFamily: 'xl:ibmSans'
  },
  display3: {
    fontSize: 'xl:text-[32px]',
    lineHeight: 'xl:leading-[135%]',
    fontWeight: 'xl:font-[600]',
    fontFamily: 'xl:ibmSans'
  },
  heading1: {
    fontSize: 'xl:text-[28px]',
    lineHeight: 'xl:leading-[135%]',
    fontWeight: 'xl:font-[600]',
    fontFamily: 'xl:ibmSans'
  },
  heading2: {
    fontSize: 'xl:text-[24px]',
    lineHeight: 'xl:leading-[135%]',
    fontWeight: 'xl:font-[600]',
    fontFamily: 'xl:ibmSans'
  },
  heading3: {
    fontSize: 'xl:text-[22px]',
    lineHeight: 'xl:leading-[135%]',
    fontWeight: 'xl:font-[600]',
    fontFamily: 'xl:ibmSans'
  },
  heading4: {
    fontSize: 'xl:text-[26px]',
    lineHeight: 'xl:leading-[135%]',
    fontWeight: 'xl:font-[500]',
    fontFamily: 'xl:ibmSans'
  },
  heading5: {
    fontSize: 'xl:text-[16px]',
    lineHeight: 'xl:leading-[135%]',
    fontWeight: 'xl:font-[500]',
    fontFamily: 'xl:ibmSans'
  },
  title1: {
    fontSize: 'xl:text-[20px]',
    lineHeight: 'xl:leading-[135%]',
    fontWeight: 'xl:font-[600]',
    fontFamily: 'xl:pretendard'
  },
  title2: {
    fontSize: 'xl:text-[18px]',
    lineHeight: 'xl:leading-[135%]',
    fontWeight: 'xl:font-[600]',
    fontFamily: 'xl:pretendard'
  },
  body1: {
    fontSize: 'xl:text-[18px]',
    lineHeight: 'xl:leading-[150%]',
    fontWeight: 'xl:font-medium',
    fontFamily: 'xl:pretendard'
  },
  body2: {
    fontSize: 'xl:text-[16px]',
    lineHeight: 'xl:leading-[150%]',
    fontWeight: 'xl:font-medium',
    fontFamily: 'xl:pretendard'
  },
  body3: {
    fontSize: 'xl:text-[14px]',
    lineHeight: 'xl:leading-[150%]',
    fontWeight: 'xl:font-medium',
    fontFamily: 'xl:pretendard'
  },
  label1: {
    fontSize: 'xl:text-[12px]',
    lineHeight: 'xl:leading-[150%]',
    fontWeight: 'xl:font-regular',
    fontFamily: 'xl:pretendard'
  }
};

type TextProps = VariantProps<typeof textVariants> & {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  variant2?: VariantProps<typeof textVariants>['variant']; // xl용 스타일
};

// 반응형 클래스 생성 함수
const getResponsiveClass = (
  variant?: TextProps['variant'],
  color?: TextProps['color']
) => {
  if (!variant || !responsiveVariantMap[variant]) return '';

  const styles = responsiveVariantMap[variant];
  const classes = Object.values(styles);

  if (color) {
    classes.push(`xl:text-${color}`);
  }

  return classes.join(' ');
};

export default function Text({
  as: Component = 'p',
  children,
  variant = 'body1',
  variant2,
  color = 'default',
  className,
  ...props
}: TextProps) {
  const baseClass = textVariants({ variant, color });
  const xlClass = variant2 ? getResponsiveClass(variant2, color) : '';

  return (
    <Component className={cn(baseClass, xlClass, className)} {...props}>
      {children}
    </Component>
  );
}
