import ContactClient from './ContactClient';
import prisma from '@/lib/prisma';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Contact Us | Musikuli Dairies Limited',
  description: "Get in touch with Musikuli Dairies Limited. Call us, send an email, WhatsApp us, or visit our farm operations in Luwero, Central Uganda.",
};

export default async function ContactPage() {
  const contentItems = await prisma.siteContent.findMany({
    where: { page: 'contact' },
  });

  const contentMap: Record<string, string> = {};
  contentItems.forEach((item) => {
    contentMap[item.key] = item.value;
  });

  return <ContactClient content={contentMap} />;
}