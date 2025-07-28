import { NextRequest, NextResponse } from 'next/server';
import { fal } from '@fal-ai/client';
import { requireAdmin } from '@/src/lib/dal';

// Configure fal client
fal.config({
  credentials: process.env.FAL_KEY,
});

export async function POST(request: NextRequest) {
  try {
    // Verify admin access
    await requireAdmin();

    const { prompt } = await request.json();

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json(
        { error: 'Prompt is required and must be a string' },
        { status: 400 }
      );
    }

    if (!process.env.FAL_KEY) {
      return NextResponse.json(
        { error: 'FAL_KEY environment variable is not configured' },
        { status: 500 }
      );
    }

    // Generate image using fal-ai
    const result = await fal.subscribe('fal-ai/flux/dev', {
      input: {
        prompt,
        image_size: 'landscape_4_3',
        num_inference_steps: 28,
        guidance_scale: 3.5,
        num_images: 1,
        enable_safety_checker: true,
        output_format: 'jpeg',
      },
      logs: true,
      onQueueUpdate: (update) => {
        if (update.status === 'IN_PROGRESS') {
          console.log('Generation in progress...');
        }
      },
    });

    if (!result.data || !result.data.images || result.data.images.length === 0) {
      return NextResponse.json(
        { error: 'No image was generated' },
        { status: 500 }
      );
    }

    const image = result.data.images[0];

    return NextResponse.json({
      imageUrl: image.url,
      prompt: result.data.prompt,
      seed: result.data.seed,
      hasNsfwConcepts: result.data.has_nsfw_concepts?.[0] || false,
    });

  } catch (error) {
    console.error('Error generating image:', error);
    
    if (error instanceof Error && error.message.includes('unauthorized')) {
      return NextResponse.json(
        { error: 'Unauthorized access' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to generate image' },
      { status: 500 }
    );
  }
} 