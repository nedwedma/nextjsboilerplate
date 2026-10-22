'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import prisma from '@/src/lib/prisma';
import { AuthError, assertAdmin } from '@/src/lib/dal';
import { deleteS3Object, getPublicUrls, uploadToS3 } from '@/src/lib/s3';
import { ALLOWED_IMAGE_TYPES, MAX_IMAGE_SIZE, isAllowedImageType } from '@/src/lib/images';
import type { ImageData } from '@/src/types/image';

export type ActionResult<T> = { ok: true; data: T } | { ok: false; error: string };

const IMAGES_PATH = '/admin/images';
const AI_IMAGE_HOSTS = ['fal.media'];

const imageInclude = {
  user: { select: { id: true, name: true, email: true } },
} as const;

function toErrorResult(error: unknown, fallback: string): { ok: false; error: string } {
  if (error instanceof AuthError) {
    return { ok: false, error: error.message };
  }
  console.error(fallback, error);
  return { ok: false, error: fallback };
}

const uploadedImageSchema = z.object({
  s3Key: z.string().min(1).max(512),
  originalName: z.string().min(1).max(255),
  mimeType: z.enum(ALLOWED_IMAGE_TYPES),
  size: z.number().int().positive().max(MAX_IMAGE_SIZE),
});

export async function saveUploadedImage(
  input: z.infer<typeof uploadedImageSchema>
): Promise<ActionResult<ImageData>> {
  try {
    const session = await assertAdmin();
    const parsed = uploadedImageSchema.safeParse(input);
    if (!parsed.success) {
      return { ok: false, error: 'Invalid image metadata' };
    }

    const { s3Key, originalName, mimeType, size } = parsed.data;

    // Keys are issued by the presigned-url route and scoped to the uploading user.
    if (!s3Key.startsWith(`images/${session.userId}/`) || s3Key.includes('..')) {
      return { ok: false, error: 'Invalid upload key' };
    }

    const image = await prisma.image.create({
      data: {
        filename: s3Key.split('/').pop() ?? s3Key,
        originalName,
        mimeType,
        size,
        s3Key,
        ...getPublicUrls(s3Key),
        uploadedBy: session.userId,
      },
      include: imageInclude,
    });

    revalidatePath(IMAGES_PATH);
    return { ok: true, data: image };
  } catch (error) {
    return toErrorResult(error, 'Failed to save image metadata');
  }
}

const aiImageSchema = z.object({
  imageUrl: z.url({ protocol: /^https$/ }),
  prompt: z.string().trim().min(1).max(1000),
});

function isAllowedAiImageHost(url: URL) {
  return AI_IMAGE_HOSTS.some((host) => url.hostname === host || url.hostname.endsWith(`.${host}`));
}

export async function saveAiImage(
  input: z.infer<typeof aiImageSchema>
): Promise<ActionResult<ImageData>> {
  try {
    const session = await assertAdmin();
    const parsed = aiImageSchema.safeParse(input);
    if (!parsed.success) {
      return { ok: false, error: 'Invalid image data' };
    }

    const { imageUrl, prompt } = parsed.data;
    const url = new URL(imageUrl);
    if (!isAllowedAiImageHost(url)) {
      return { ok: false, error: 'Image host is not allowed' };
    }

    const response = await fetch(url, { redirect: 'error' });
    if (!response.ok) {
      return { ok: false, error: 'Failed to download image' };
    }

    const contentType = response.headers.get('content-type')?.split(';')[0].trim() ?? '';
    if (!isAllowedImageType(contentType)) {
      return { ok: false, error: 'Unsupported image type' };
    }

    const declaredSize = Number(response.headers.get('content-length') ?? 0);
    if (declaredSize > MAX_IMAGE_SIZE) {
      return { ok: false, error: 'Image is too large' };
    }

    const buffer = Buffer.from(await response.arrayBuffer());
    if (buffer.byteLength > MAX_IMAGE_SIZE) {
      return { ok: false, error: 'Image is too large' };
    }

    const extension = contentType.split('/')[1];
    const filename = `ai-generated-${Date.now()}.${extension}`;
    const s3Key = `images/${session.userId}/${filename}`;
    const urls = await uploadToS3(buffer, s3Key, contentType);

    const image = await prisma.image.create({
      data: {
        filename,
        originalName: `AI Generated: ${prompt.slice(0, 100)}`,
        mimeType: contentType,
        size: buffer.byteLength,
        s3Key,
        ...urls,
        uploadedBy: session.userId,
      },
      include: imageInclude,
    });

    revalidatePath(IMAGES_PATH);
    return { ok: true, data: image };
  } catch (error) {
    return toErrorResult(error, 'Failed to save AI-generated image');
  }
}

export async function deleteImage(imageId: string): Promise<ActionResult<{ id: string }>> {
  try {
    await assertAdmin();
    const id = z.string().min(1).max(64).safeParse(imageId);
    if (!id.success) {
      return { ok: false, error: 'Invalid image ID' };
    }

    const image = await prisma.image.findUnique({ where: { id: id.data } });
    if (!image) {
      return { ok: false, error: 'Image not found' };
    }

    await deleteS3Object(image.s3Key);
    await prisma.image.delete({ where: { id: image.id } });

    revalidatePath(IMAGES_PATH);
    return { ok: true, data: { id: image.id } };
  } catch (error) {
    return toErrorResult(error, 'Failed to delete image');
  }
}
