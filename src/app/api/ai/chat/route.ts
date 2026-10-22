import { NextResponse } from "next/server";
import { z } from "zod";
import { assertAuth, handleRouteError } from "@/src/lib/dal";
import { env } from "@/src/lib/env";
import { siteConfig } from "@/src/lib/site-config";
import { CHAT_MODELS, DEFAULT_CHAT_MODEL, MAX_CHAT_TOKENS } from "@/src/lib/ai-models";

const chatSchema = z.object({
  messages: z
    .array(
      z.object({
        // "system" is not accepted from clients so they cannot override server-side instructions.
        role: z.enum(["user", "assistant"]),
        content: z.string().min(1).max(10_000),
      })
    )
    .min(1)
    .max(50),
  model: z.enum(CHAT_MODELS).default(DEFAULT_CHAT_MODEL),
  maxTokens: z.number().int().positive().max(MAX_CHAT_TOKENS).default(1000),
  temperature: z.number().min(0).max(2).default(0.7),
  stream: z.boolean().default(false),
});

export async function POST(request: Request) {
  try {
    await assertAuth();

    const parsed = chatSchema.safeParse(await request.json().catch(() => null));
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid request" },
        { status: 400 }
      );
    }

    if (!env.OPENROUTER_API_KEY) {
      console.error("OPENROUTER_API_KEY environment variable is not configured");
      return NextResponse.json({ error: "Chat is not configured" }, { status: 503 });
    }

    const { messages, model, maxTokens, temperature, stream } = parsed.data;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.OPENROUTER_API_KEY}`,
        "HTTP-Referer": env.NEXT_PUBLIC_SITE_URL,
        "X-Title": siteConfig.name,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        messages,
        max_tokens: maxTokens,
        temperature,
        stream,
      }),
      signal: request.signal,
    });

    if (!response.ok) {
      const upstreamError = await response.text().catch(() => "");
      console.error(`OpenRouter request failed (${response.status})`, upstreamError);
      return NextResponse.json({ error: "Chat request failed" }, { status: 502 });
    }

    if (stream) {
      return new Response(response.body, {
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          Connection: "keep-alive",
        },
      });
    }

    const data = await response.json();
    return NextResponse.json({ content: data.choices?.[0]?.message?.content ?? "" });
  } catch (error) {
    return handleRouteError(error, "Chat request failed");
  }
}
