import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Musikuli Dairies Limited | Premium Dairy & Agricultural Products Uganda',
  description:
    "Musikuli Dairies Limited — Uganda's premier supplier of high-quality dairy and agricultural produce. Serving 200+ smallholder farmers in Luwero, Nakaseke, and Nakasongola.",
  keywords: 'Musikuli Dairies, dairy products Uganda, agricultural produce, milk Uganda, maize, beans, groundnuts, Luwero',
  openGraph: {
    title: 'Musikuli Dairies Limited',
    description: 'Premium dairy and agricultural products from the heart of Uganda.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
