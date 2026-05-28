import type { Metadata, Viewport } from 'next';
import { Inter, DM_Sans } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollAnimation from '@/components/ScrollAnimation';

const inter = Inter({ subsets: ['latin'], display: 'swap' });
const dmSans = DM_Sans({ subsets: ['latin'], display: 'swap', weight: ['400', '500', '700'] });

export const viewport: Viewport = {
  themeColor: '#1a56db',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://musikulidairies.com'),
  title: {
    default: 'Musikuli Dairies Limited | Premium Dairy & Agricultural Products Uganda',
    template: '%s | Musikuli Dairies Limited',
  },
  description:
    "Musikuli Dairies Limited — Uganda's premier supplier of high-quality dairy and agricultural produce. Serving 200+ smallholder farmers in Luwero, Nakaseke, and Nakasongola.",
  keywords: ['Musikuli Dairies', 'dairy products Uganda', 'agricultural produce', 'milk Uganda', 'maize', 'beans', 'groundnuts', 'Luwero'],
  icons: {
    icon: '/icons/favicon.ico',
    shortcut: '/icons/shortcut-icon.png',
    apple: [
      { url: '/icons/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'apple-touch-icon-precomposed', url: '/icons/apple-touch-icon-precomposed.png' },
    ],
  },
  openGraph: {
    title: 'Musikuli Dairies Limited',
    description: 'Premium dairy and agricultural products from the heart of Uganda.',
    url: 'https://musikulidairies.com',
    siteName: 'Musikuli Dairies',
    locale: 'en_UG',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.className} ${dmSans.className}`}>
      <body className={dmSans.className}>
        <Navbar />
        <main>{children}</main>
        <ScrollAnimation />
        <Footer />
      </body>
    </html>
  );
}
