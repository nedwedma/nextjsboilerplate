export interface ImageData {
  id: string;
  filename: string;
  originalName: string;
  cloudFrontUrl: string;
  s3Url: string;
  size: number;
  mimeType: string;
  user: {
    id?: string;
    name: string | null;
    email: string | null;
  };
  createdAt: Date;
} 