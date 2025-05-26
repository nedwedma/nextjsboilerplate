interface GenerateOptions {
  model?: string;
  maxTokens?: number;
  temperature?: number;
}

interface ChatOptions extends GenerateOptions {
  stream?: boolean;
}

interface Message {
  role: "user" | "assistant" | "system";
  content: string;
}

interface GenerateResponse {
  content: string;
  error?: string;
}

interface ChatResponse {
  content: string;
  error?: string;
}

export class AIClient {
  static async generateContent(prompt: string, options: GenerateOptions = {}): Promise<GenerateResponse> {
    try {
      const response = await fetch("/api/ai/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          model: options.model,
          maxTokens: options.maxTokens,
          temperature: options.temperature,
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || "Failed to generate content");
      }

      return data;
    } catch (error) {
      return {
        content: "",
        error: error instanceof Error ? error.message : "Unknown error occurred",
      };
    }
  }

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
          stream: options.stream,
        }),
      });

      if (options.stream) {
        return {
          content: "",
          error: "Streaming not implemented in client yet",
        };
      }

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