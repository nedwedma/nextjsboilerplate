import { requireAdmin } from '@/src/lib/dal';
import Header from '@/src/components/navigation/Header';
import ImagesManager from '@/src/components/admin/images-manager';
import prisma from '@/src/lib/prisma';

export default async function AdminImagesPage() {
  // Professional auth check using DAL
  await requireAdmin();

  // Server-side data fetching with Prisma
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

  // Calculate stats server-side
  const totalSize = images.reduce((sum, img) => sum + img.size, 0);
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  const recentUploads = images.filter(img => 
    new Date(img.createdAt) > weekAgo
  ).length;

  const stats = {
    totalImages: images.length,
    totalSize,
    recentUploads,
  };

  return (
    <main className="flex flex-col">
      <Header />
      <div className="mt-10">
        <ImagesManager 
          initialImages={images}
          initialStats={stats}
        />
      </div>
    </main>
  );
}