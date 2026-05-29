import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Apply for a Job | Musikuli Dairies Limited',
  description: 'Submit your job application to join the team at Musikuli Dairies Limited.',
};

export default function ApplyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
