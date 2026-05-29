import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Request a Quote | Musikuli Dairies Limited',
  description: 'Get a competitive quote for our fresh milk, dairy products, or bulk agricultural produce.',
};

export default function QuoteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
