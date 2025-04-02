export interface PromptConfig {
  category: string;
  description: string;
  systemPrompt: string;
}

export interface UserMessage {
  category: string;
  context: string;
}

export interface GPTResponse {
  answer: string;
}
