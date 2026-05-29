import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Portfolio & Gallery | Musikuli Dairies Limited',
  description: 'View our farm operations, dairy products, agro-produce and the community of farmers we work with across Uganda.',
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
