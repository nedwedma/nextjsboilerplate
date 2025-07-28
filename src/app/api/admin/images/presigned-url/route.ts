import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/src/lib/auth';
import { generatePresignedUploadUrl, generateS3Key } from '@/src/lib/s3';

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: request.headers });
    
    if (!session?.user?.id || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { filename, contentType, size } = await request.json();

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(contentType)) {
      return NextResponse.json(
        { error: 'Only JPEG, PNG, WebP and GIF images are allowed' },
        { status: 400 }
      );
    }

    // Validate file size (max 10MB)
    if (size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File size must be less than 10MB' },
        { status: 400 }
      );
    }

    const s3Key = generateS3Key(filename, session.user.id);
    const uploadData = await generatePresignedUploadUrl(s3Key, contentType);

    return NextResponse.json({
      ...uploadData,
      s3Key,
      filename,
      contentType,
      size,
    });

  } catch (error) {
    console.error('Presigned URL generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate upload URL' },
      { status: 500 }
    );
  }
} 