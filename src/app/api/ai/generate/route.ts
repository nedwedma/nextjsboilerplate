import { NextResponse } from 'next/server';
import { fal } from '@fal-ai/client';
import { z } from 'zod';
import { assertAdmin, handleRouteError } from '@/src/lib/dal';
import { env } from '@/src/lib/env';

fal.config({
  credentials: env.FAL_KEY,
});

const generateSchema = z.object({
  prompt: z.string().trim().min(1, 'Prompt is required').max(1000, 'Prompt is too long'),
});

export async function POST(request: Request) {
  try {
    await assertAdmin();

    const parsed = generateSchema.safeParse(await request.json().catch(() => null));
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? 'Invalid request' },
        { status: 400 }
      );
    }

    if (!env.FAL_KEY) {
      console.error('FAL_KEY environment variable is not configured');
      return NextResponse.json({ error: 'Image generation is not configured' }, { status: 503 });
    }

    const result = await fal.subscribe('fal-ai/flux/dev', {
      input: {
        prompt: parsed.data.prompt,
        image_size: 'landscape_4_3',
        num_inference_steps: 28,
        guidance_scale: 3.5,
        num_images: 1,
        enable_safety_checker: true,
        output_format: 'jpeg',
      },
    });

    const image = result.data?.images?.[0];
    if (!image) {
      return NextResponse.json({ error: 'No image was generated' }, { status: 502 });
    }

    return NextResponse.json({
      imageUrl: image.url,
      prompt: result.data.prompt,
      seed: result.data.seed,
      hasNsfwConcepts: result.data.has_nsfw_concepts?.[0] || false,
    });
  } catch (error) {
    return handleRouteError(error, 'Failed to generate image');
  }
}
