export const fetchGPT = async ({
  topic,
  emotions,
  message
}: {
  topic: string | null;
  emotions: string[];
  message: string;
}) => {
  const res = await fetch('/utils/openai', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      content: `주제: ${topic}, 감정: ${emotions.join(
        ', '
      )}, 메시지: ${message}`
    })
  });

  const data = await res.json();
  return data.content;
};
