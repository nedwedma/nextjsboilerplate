import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/src/components/ui/card';
import { Button } from '@/src/components/ui/button';
import { Trash2, Copy, ExternalLink, Calendar, User, FileImage } from 'lucide-react';
import { toast } from 'sonner';
import { ImageData } from '@/src/types/image';

interface ImageGridProps {
  images: ImageData[];
  onImageDeleted: (imageId: string) => void;
}

export default function ImageGrid({ images, onImageDeleted }: ImageGridProps) {
  const [deletingIds, setDeletingIds] = useState<Set<string>>(new Set());

  const copyToClipboard = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success('CloudFront URL copied to clipboard!');
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      toast.error('Failed to copy URL');
    }
  };

  const deleteImage = async (imageId: string) => {
    if (!confirm('Are you sure you want to delete this image? This action cannot be undone.')) {
      return;
    }

    setDeletingIds(prev => new Set(prev).add(imageId));

    try {
      const response = await fetch(`/api/admin/images?id=${imageId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete image');
      }

      onImageDeleted(imageId);
      toast.success('Image deleted successfully');
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Failed to delete image');
    } finally {
      setDeletingIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(imageId);
        return newSet;
      });
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (images.length === 0) {
    return (
      <Card className="p-12 text-center">
        <FileImage className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No images uploaded yet</h3>
        <p className="text-gray-500">Upload your first image to get started.</p>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {images.map((image) => (
        <Card key={image.id} className="overflow-hidden hover:shadow-lg transition-shadow">
          <div className="relative aspect-video bg-gray-100">
            <Image
              src={image.cloudFrontUrl}
              alt={image.originalName}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          
          <CardContent className="p-4">
            <div className="space-y-3">
              {/* Image Info */}
              <div>
                <h3 className="font-semibold text-sm truncate" title={image.originalName}>
                  {image.originalName}
                </h3>
                <p className="text-xs text-gray-500">
                  {formatFileSize(image.size)} • {image.mimeType.split('/')[1].toUpperCase()}
                </p>
              </div>

              {/* Metadata */}
              <div className="space-y-1 text-xs text-gray-500">
                <div className="flex items-center space-x-1">
                  <User className="h-3 w-3" />
                  <span>{image.user.name || image.user.email || 'Unknown'}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-3 w-3" />
                  <span>{formatDate(image.createdAt)}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-2 pt-2">
                <Button
                  onClick={() => copyToClipboard(image.cloudFrontUrl)}
                  size="sm"
                  variant="outline"
                  className="flex-1 text-xs"
                >
                  <Copy className="h-3 w-3 mr-1" />
                  Copy URL
                </Button>
                
                <Button
                  onClick={() => window.open(image.cloudFrontUrl, '_blank')}
                  size="sm"
                  variant="outline"
                  className="px-2"
                >
                  <ExternalLink className="h-3 w-3" />
                </Button>
                
                <Button
                  onClick={() => deleteImage(image.id)}
                  disabled={deletingIds.has(image.id)}
                  size="sm"
                  variant="outline"
                  className="px-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
} 