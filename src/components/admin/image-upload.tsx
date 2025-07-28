'use client';

import { useState, useCallback, useRef } from 'react';
import { Card } from '@/src/components/ui/card';
import { Button } from '@/src/components/ui/button';
import { Upload, X, CheckCircle, AlertCircle } from 'lucide-react';
import { ImageData } from '@/src/types/image';

interface ImageUploadProps {
  onUploadComplete: (image: ImageData) => void;
}

interface UploadingFile {
  file: File;
  progress: number;
  status: 'uploading' | 'success' | 'error';
  error?: string;
}

export default function ImageUpload({ onUploadComplete }: ImageUploadProps) {
  const [uploadingFiles, setUploadingFiles] = useState<UploadingFile[]>([]);
  const [isDragActive, setIsDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): string | null => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      return 'Only JPEG, PNG, WebP and GIF images are allowed';
    }
    if (file.size > 10 * 1024 * 1024) {
      return 'File size must be less than 10MB';
    }
    return null;
  };

  const uploadFile = useCallback(async (file: File) => {
    try {
      // Get presigned URL
      const response = await fetch('/api/admin/images/presigned-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          filename: file.name,
          contentType: file.type,
          size: file.size,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to get upload URL');
      }

      const { presignedUrl, s3Key, s3Url, cloudFrontUrl } = await response.json();

      // Update progress
      setUploadingFiles(prev => 
        prev.map(f => f.file === file ? { ...f, progress: 50 } : f)
      );

      // Upload to S3
      const uploadResponse = await fetch(presignedUrl, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type,
        },
      });

      if (!uploadResponse.ok) {
        throw new Error('Failed to upload to S3');
      }

      // Update progress
      setUploadingFiles(prev => 
        prev.map(f => f.file === file ? { ...f, progress: 75 } : f)
      );

      // Save metadata
      const metadataResponse = await fetch('/api/admin/images', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          filename: file.name,
          originalName: file.name,
          mimeType: file.type,
          size: file.size,
          s3Key,
          s3Url,
          cloudFrontUrl,
        }),
      });

      if (!metadataResponse.ok) {
        throw new Error('Failed to save image metadata');
      }

      const { image } = await metadataResponse.json();

      // Mark as complete
      setUploadingFiles(prev => 
        prev.map(f => f.file === file ? { ...f, progress: 100, status: 'success' } : f)
      );

      onUploadComplete(image);

      // Remove from uploading list after delay
      setTimeout(() => {
        setUploadingFiles(prev => prev.filter(f => f.file !== file));
      }, 2000);

    } catch (error) {
      console.error('Upload error:', error);
      setUploadingFiles(prev => 
        prev.map(f => f.file === file ? { 
          ...f, 
          status: 'error', 
          error: error instanceof Error ? error.message : 'Upload failed'
        } : f)
      );
    }
  }, [onUploadComplete]);

  const handleFiles = useCallback((files: FileList | null) => {
    if (!files) return;
    
    const fileArray = Array.from(files);
    const validFiles: File[] = [];
    
    for (const file of fileArray) {
      const error = validateFile(file);
      if (error) {
        alert(`${file.name}: ${error}`);
        continue;
      }
      validFiles.push(file);
    }

    if (validFiles.length === 0) return;

    const newFiles = validFiles.map(file => ({
      file,
      progress: 0,
      status: 'uploading' as const,
    }));

    setUploadingFiles(prev => [...prev, ...newFiles]);
    validFiles.forEach(uploadFile);
  }, [uploadFile]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(false);
    handleFiles(e.dataTransfer.files);
  }, [handleFiles]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const removeUploadingFile = (file: File) => {
    setUploadingFiles(prev => prev.filter(f => f.file !== file));
  };

  return (
    <div className="space-y-4">
      <Card className="p-8">
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={openFileDialog}
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
            isDragActive
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300 hover:border-gray-400'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileInput}
            className="hidden"
          />
          <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          {isDragActive ? (
            <p className="text-lg text-blue-600">Drop the images here...</p>
          ) : (
            <div>
              <p className="text-lg text-gray-600 mb-2">
                Drag & drop images here, or click to select files
              </p>
              <p className="text-sm text-gray-500">
                Supports JPEG, PNG, WebP, GIF up to 10MB
              </p>
            </div>
          )}
        </div>
      </Card>

      {uploadingFiles.length > 0 && (
        <Card className="p-4">
          <h3 className="font-semibold mb-4">Uploading Files</h3>
          <div className="space-y-3">
            {uploadingFiles.map((uploadingFile, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium truncate max-w-xs">
                      {uploadingFile.file.name}
                    </span>
                    <div className="flex items-center space-x-2">
                      {uploadingFile.status === 'success' && (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      )}
                      {uploadingFile.status === 'error' && (
                        <AlertCircle className="h-4 w-4 text-red-500" />
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeUploadingFile(uploadingFile.file)}
                        className="h-6 w-6 p-0"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  {uploadingFile.status === 'uploading' && (
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${uploadingFile.progress}%` }}
                      />
                    </div>
                  )}
                  {uploadingFile.status === 'error' && (
                    <p className="text-xs text-red-500 mt-1">{uploadingFile.error}</p>
                  )}
                  {uploadingFile.status === 'success' && (
                    <p className="text-xs text-green-500 mt-1">Upload complete!</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
} 