import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/src/lib/auth';
import prisma from '@/src/lib/prisma';
import { deleteS3Object } from '@/src/lib/s3';

export async function GET(request: Request) {
  try {
    const session = await auth.api.getSession({ headers: request.headers });
    
    if (!session?.user?.id || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const images = await prisma.image.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({ images });

  } catch (error) {
    console.error('Get images error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch images' },
      { status: 500 }
    );
  }
}

// POST /api/admin/images - Save image metadata after successful upload OR save AI-generated image
export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: request.headers });
    
    if (!session?.user?.id || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();

    // Handle AI-generated image from URL
    if (body.imageUrl && body.isAiGenerated) {
      const { imageUrl, prompt } = body;

      try {
        // Download the image from the URL
        const imageResponse = await fetch(imageUrl);
        if (!imageResponse.ok) {
          throw new Error('Failed to download image');
        }

        const imageBuffer = await imageResponse.arrayBuffer();
        const contentType = imageResponse.headers.get('content-type') || 'image/jpeg';
        
        // Generate filename
        const timestamp = Date.now();
        const filename = `ai-generated-${timestamp}.jpg`;
        const s3Key = `images/${filename}`;

        // Upload to S3
        const { uploadToS3 } = await import('@/src/lib/s3');
        const { s3Url, cloudFrontUrl } = await uploadToS3(
          Buffer.from(imageBuffer),
          s3Key,
          contentType
        );

        // Save to database with AI-specific metadata
        const image = await prisma.image.create({
          data: {
            filename,
            originalName: `AI Generated: ${prompt.substring(0, 100)}`,
            mimeType: contentType,
            size: imageBuffer.byteLength,
            s3Key,
            s3Url,
            cloudFrontUrl,
            uploadedBy: session.user.id,
          },
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        });

        return NextResponse.json(image);

      } catch (error) {
        console.error('Error saving AI-generated image:', error);
        return NextResponse.json(
          { error: 'Failed to save AI-generated image' },
          { status: 500 }
        );
      }
    }

    // Handle regular file upload metadata
    const {
      filename,
      originalName,
      mimeType,
      size,
      s3Key,
      s3Url,
      cloudFrontUrl,
    } = body;

    const image = await prisma.image.create({
      data: {
        filename,
        originalName,
        mimeType,
        size,
        s3Key,
        s3Url,
        cloudFrontUrl,
        uploadedBy: session.user.id,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json(image);

  } catch (error) {
    console.error('Save image metadata error:', error);
    return NextResponse.json(
      { error: 'Failed to save image metadata' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/images - Delete image
export async function DELETE(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: request.headers });
    
    if (!session?.user?.id || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const imageId = searchParams.get('id');

    if (!imageId) {
      return NextResponse.json({ error: 'Image ID required' }, { status: 400 });
    }

    const image = await prisma.image.findUnique({
      where: { id: imageId },
    });

    if (!image) {
      return NextResponse.json({ error: 'Image not found' }, { status: 404 });
    }

    // Delete from S3
    await deleteS3Object(image.s3Key);

    // Delete from database
    await prisma.image.delete({
      where: { id: imageId },
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Delete image error:', error);
    return NextResponse.json(
      { error: 'Failed to delete image' },
      { status: 500 }
    );
  }
} 