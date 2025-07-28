import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export const s3Config = {
  bucket: process.env.S3_BUCKET_NAME!,
  region: process.env.AWS_REGION!,
  cloudFrontDomain: process.env.CLOUDFRONT_DOMAIN!,
};

export async function generatePresignedUploadUrl(key: string, contentType: string) {
  const command = new PutObjectCommand({
    Bucket: s3Config.bucket,
    Key: key,
    ContentType: contentType,
    ACL: 'public-read',
  });

  const presignedUrl = await getSignedUrl(s3Client, command, {
    expiresIn: 300, // 5 minutes
  });

  return {
    presignedUrl,
    s3Url: `https://${s3Config.bucket}.s3.${s3Config.region}.amazonaws.com/${key}`,
    cloudFrontUrl: `https://${s3Config.cloudFrontDomain}/${key}`,
  };
}

export async function deleteS3Object(key: string) {
  const command = new DeleteObjectCommand({
    Bucket: s3Config.bucket,
    Key: key,
  });

  await s3Client.send(command);
}

export async function uploadToS3(buffer: Buffer, key: string, contentType: string = 'image/jpeg') {
  const command = new PutObjectCommand({
    Bucket: s3Config.bucket,
    Key: key,
    Body: buffer,
    ContentType: contentType,
    ACL: 'public-read',
  });

  await s3Client.send(command);

  return {
    s3Url: `https://${s3Config.bucket}.s3.${s3Config.region}.amazonaws.com/${key}`,
    cloudFrontUrl: `https://${s3Config.cloudFrontDomain}/${key}`,
  };
}

export function generateS3Key(originalName: string, userId: string) {
  const timestamp = Date.now();
  const sanitizedName = originalName
    .replace(/[^a-zA-Z0-9.-]/g, '_')
    .replace(/_{2,}/g, '_');
  
  return `images/${userId}/${timestamp}-${sanitizedName}`;
} 