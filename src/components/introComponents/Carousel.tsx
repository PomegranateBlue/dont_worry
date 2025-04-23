'use client';
import Text from '../common/Text';
import Image from 'next/image';
import { EMOTION_CATEGORIES } from '@/constants/openai/category';
import { motion } from 'framer-motion';
const Carousel = () => {
  const serviceIcons = [
    {
      src: '/images/box.svg',
      title: '걱정 보관함',
      tags: ['#주제별', '#감정별']
    },
    {
      src: '/images/chat.svg',
      title: 'AI 상담',
      tags: ['#GPT', '#실시간']
    },
    {
      src: '/images/community.svg',
      title: '커뮤니티',
      tags: ['#소통', '#공감']
    },
    {
      src: '/images/letter.svg',
      title: '미래 편지',
      tags: ['#기록', '#미래편지']
    }
  ];

  const items = [];
  let emotionIndex = 0;
  let serviceIndex = 0;

  while (emotionIndex < EMOTION_CATEGORIES.length) {
    for (let i = 0; i < 2; i++) {
      if (emotionIndex < EMOTION_CATEGORIES.length) {
        const emotion = EMOTION_CATEGORIES[emotionIndex];
        items.push({
          type: 'emotion',
          src: emotion.emoji,
          label: emotion.label
        });
        emotionIndex++;
      }
    }

    if (serviceIndex < serviceIcons.length) {
      const service = serviceIcons[serviceIndex];
      items.push({
        type: 'service',
        src: service.src,
        title: service.title,
        tags: service.tags
      });
      serviceIndex++;
    }
  }

  const doubledItems = [...items.slice(0, 2), ...items];
  console.log(doubledItems);
  return (
    <div className="w-full max-w-[360px] overflow-hidden mx-auto ">
      <motion.div
        className="flex gap-x-6  w-max "
        initial={{ x: 0 }}
        animate={{ x: '-50%' }}
        transition={{
          repeat: Infinity,
          repeatType: 'loop',
          ease: 'linear',
          duration: 20
        }}
      >
        {doubledItems.map((item, idx) =>
          item.type === 'emotion' ? (
            <div
              key={`${item.label}-${idx}`}
              className="bg-backgroundSet-normal flex items-center justify-center rounded-full w-[62px] h-[62px] shrink-0"
            >
              <Image src={item.src} width={36} height={36} alt="item" />
            </div>
          ) : (
            <div
              key={`${item.title}-${idx}`}
              className="flex  bg-white rounded-[40px]  gap-[10px] px-4 py-[9px]  w-[162px] h-[62px] shrink-0  items-center justify-center"
            >
              <div>
                <Image src={item.src} width={36} height={36} alt="title" />
              </div>
              <div className="flex flex-col ">
                <Text variant="body3">{item.title}</Text>
                <div className="flex flex-row">
                  {item.tags?.map((tag, i) => (
                    <Text variant="label1" key={i}>
                      {tag}
                    </Text>
                  ))}
                </div>
              </div>
            </div>
          )
        )}
      </motion.div>
    </div>
  );
};

export default Carousel;
