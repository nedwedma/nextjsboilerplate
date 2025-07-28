'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/src/components/ui/tabs';
import ImageUpload from '@/src/components/admin/image-upload';
import ImageGrid from '@/src/components/admin/image-grid';
import AIImageGenerator from '@/src/components/admin/ai-image-generator';
import { Images, Upload, Database, Sparkles } from 'lucide-react';
import { ImageData } from '@/src/types/image';

interface StatsData {
  totalImages: number;
  totalSize: number;
  recentUploads: number;
}

interface ImagesManagerProps {
  initialImages: ImageData[];
  initialStats: StatsData;
}

export default function ImagesManager({ initialImages, initialStats }: ImagesManagerProps) {
  const [images, setImages] = useState<ImageData[]>(initialImages);
  const [stats, setStats] = useState<StatsData>(initialStats);

  const handleUploadComplete = (newImage: ImageData) => {
    setImages(prev => [newImage, ...prev]);
    setStats(prev => ({
      totalImages: prev.totalImages + 1,
      totalSize: prev.totalSize + newImage.size,
      recentUploads: prev.recentUploads + 1,
    }));
  };

  const handleImageDeleted = (imageId: string) => {
    const deletedImage = images.find(img => img.id === imageId);
    if (deletedImage) {
      setImages(prev => prev.filter(img => img.id !== imageId));
      setStats(prev => ({
        totalImages: prev.totalImages - 1,
        totalSize: prev.totalSize - deletedImage.size,
        recentUploads: prev.recentUploads - (
          new Date(deletedImage.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) ? 1 : 0
        ),
      }));
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full px-4">
      {/* Header */}
      <div className="flex flex-col gap-2 mb-4">
        <div className="flex items-center space-x-3">
          <Images className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold">Image Management</h1>
        </div>
        <p className="text-muted-foreground">
          Upload and manage images for your projects with S3 and CloudFront integration
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Database className="h-8 w-8 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">{stats.totalImages}</p>
                <p className="text-sm text-gray-500">Total Images</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Upload className="h-8 w-8 text-green-500" />
              <div>
                <p className="text-2xl font-bold">{stats.recentUploads}</p>
                <p className="text-sm text-gray-500">This Week</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Images className="h-8 w-8 text-purple-500" />
              <div>
                <p className="text-2xl font-bold">{formatFileSize(stats.totalSize)}</p>
                <p className="text-sm text-gray-500">Storage Used</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="gallery" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="gallery">Image Gallery</TabsTrigger>
          <TabsTrigger value="upload">Upload Images</TabsTrigger>
          <TabsTrigger value="ai-generate">AI Generate</TabsTrigger>
        </TabsList>
        
        <TabsContent value="gallery" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Images className="h-5 w-5" />
                <span>Image Gallery</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ImageGrid 
                images={images} 
                onImageDeleted={handleImageDeleted}
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="upload" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Upload className="h-5 w-5" />
                <span>Upload New Images</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ImageUpload onUploadComplete={handleUploadComplete} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="ai-generate" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Sparkles className="h-5 w-5" />
                <span>AI Image Generation</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <AIImageGenerator onImageGenerated={handleUploadComplete} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 