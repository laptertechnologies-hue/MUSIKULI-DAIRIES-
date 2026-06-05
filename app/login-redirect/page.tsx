'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';

export default function LoginRedirectPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return;

    if (!session || !session.user) {
      router.push('/login');
    } else if (session.user.role === 'ADMIN') {
      router.push('/admin');
    } else {
      router.push('/dashboard');
    }
  }, [session, status, router]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '70vh', gap: '1rem', background: '#f8fafc' }}>
      <Loader2 className="animate-spin" size={40} style={{ color: '#1e3a8a' }} />
      <p style={{ color: '#64748b', fontSize: '0.95rem', fontWeight: 600 }}>
        Redirecting to your portal...
      </p>
    </div>
  );
}
