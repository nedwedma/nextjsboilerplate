import { NextResponse } from 'next/server';
import { z } from 'zod';
import { assertAdmin, handleRouteError } from '@/src/lib/dal';
import { generatePresignedUploadUrl, generateS3Key } from '@/src/lib/s3';
import { ALLOWED_IMAGE_TYPES, MAX_IMAGE_SIZE } from '@/src/lib/images';

const presignSchema = z.object({
  filename: z.string().trim().min(1).max(255),
  contentType: z.enum(ALLOWED_IMAGE_TYPES, 'Only JPEG, PNG, WebP and GIF images are allowed'),
  size: z.number().int().positive().max(MAX_IMAGE_SIZE, 'File size must be less than 10MB'),
});

export async function POST(request: Request) {
  try {
    const session = await assertAdmin();

    const parsed = presignSchema.safeParse(await request.json().catch(() => null));
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? 'Invalid request' },
        { status: 400 }
      );
    }

    const { filename, contentType, size } = parsed.data;
    const s3Key = generateS3Key(filename, session.userId);
    const { presignedUrl } = await generatePresignedUploadUrl(s3Key, contentType, size);

    return NextResponse.json({ presignedUrl, s3Key });
  } catch (error) {
    return handleRouteError(error, 'Failed to generate upload URL');
  }
}
