import 'server-only';
import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { env } from '@/src/lib/env';

// Objects are uploaded without ACLs: new buckets enforce "Bucket owner enforced"
// (ACLs disabled), so public read access must come from a bucket policy or
// CloudFront Origin Access Control.
const s3Client = new S3Client({
  region: env.AWS_REGION,
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID ?? '',
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY ?? '',
  },
});

export const s3Config = {
  bucket: env.S3_BUCKET_NAME ?? '',
  region: env.AWS_REGION ?? '',
  cloudFrontDomain: env.CLOUDFRONT_DOMAIN ?? '',
};

export function getPublicUrls(key: string) {
  return {
    s3Url: `https://${s3Config.bucket}.s3.${s3Config.region}.amazonaws.com/${key}`,
    cloudFrontUrl: `https://${s3Config.cloudFrontDomain}/${key}`,
  };
}

export async function generatePresignedUploadUrl(key: string, contentType: string, contentLength: number) {
  const command = new PutObjectCommand({
    Bucket: s3Config.bucket,
    Key: key,
    ContentType: contentType,
    ContentLength: contentLength,
  });

  const presignedUrl = await getSignedUrl(s3Client, command, {
    expiresIn: 300, // 5 minutes
  });

  return {
    presignedUrl,
    ...getPublicUrls(key),
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
  });

  await s3Client.send(command);

  return getPublicUrls(key);
}

export function generateS3Key(originalName: string, userId: string) {
  const timestamp = Date.now();
  const sanitizedName = originalName
    .replace(/[^a-zA-Z0-9.-]/g, '_')
    .replace(/_{2,}/g, '_')
    .replace(/\.{2,}/g, '.');
  
  return `images/${userId}/${timestamp}-${sanitizedName}`;
} 