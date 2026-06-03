import AboutClient from './AboutClient';
import prisma from '@/lib/prisma';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'About Us | Musikuli Dairies Limited',
  description: 'Learn about Musikuli Dairies Limited, our founders Mr. Ibrahim Musikuli and Mrs. Reginah Nabateregga, and our commitment to quality agriculture and dairy products in Uganda.',
};

export default async function AboutPage() {
  const contentItems = await prisma.siteContent.findMany({
    where: { page: 'about' },
  });

  // Convert to key-value record map
  const contentMap: Record<string, string> = {};
  contentItems.forEach((item) => {
    contentMap[item.key] = item.value;
  });

  return <AboutClient content={contentMap} />;
}