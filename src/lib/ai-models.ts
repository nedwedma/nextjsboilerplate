// OpenRouter model IDs that clients may request. Adjust to the models you want to pay for.
export const CHAT_MODELS = ['openai/gpt-4o-mini', 'openai/gpt-4o'] as const;

export type ChatModel = (typeof CHAT_MODELS)[number];

export const DEFAULT_CHAT_MODEL: ChatModel = 'openai/gpt-4o-mini';

export const MAX_CHAT_TOKENS = 2000;
