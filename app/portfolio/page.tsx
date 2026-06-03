import PortfolioClient from './PortfolioClient';
import prisma from '@/lib/prisma';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Our Gallery | Musikuli Dairies Limited',
  description: 'A visual journey through Musikuli Dairies Limited farms, operations, products and the outgrower communities we serve in Luwero, Uganda.',
};

export default async function PortfolioPage() {
  const contentItems = await prisma.siteContent.findMany({
    where: { page: 'gallery' },
  });

  const contentMap: Record<string, string> = {};
  contentItems.forEach((item) => {
    contentMap[item.key] = item.value;
  });

  return <PortfolioClient content={contentMap} />;
}