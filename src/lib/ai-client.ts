import type { ChatModel } from "@/src/lib/ai-models";

interface ChatOptions {
  model?: ChatModel;
  maxTokens?: number;
  temperature?: number;
}

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatResponse {
  content: string;
  error?: string;
}

export class AIClient {
  static async chat(messages: Message[], options: ChatOptions = {}): Promise<ChatResponse> {
    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages,
          model: options.model,
          maxTokens: options.maxTokens,
          temperature: options.temperature,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to chat");
      }

      return data;
    } catch (error) {
      return {
        content: "",
        error: error instanceof Error ? error.message : "Unknown error occurred",
      };
    }
  }
}
