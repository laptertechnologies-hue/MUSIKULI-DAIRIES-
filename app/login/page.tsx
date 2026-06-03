'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function LoginPage() {
  const router = useRouter();
  const [data, setData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const loginUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const result = await signIn('credentials', {
      ...data,
      redirect: false,
    });

    if (result?.error) {
      setError('Invalid email or password');
      setLoading(false);
    } else {
      router.push('/login-redirect');
      router.refresh();
    }
  };

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--gray-50)', padding: '2rem' }}>
      <div style={{ background: 'white', padding: '3rem', borderRadius: '16px', boxShadow: 'var(--shadow-md)', width: '100%', maxWidth: '450px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
          <Image
            src="/images/logo.png"
            alt="Musikuli Dairies Logo"
            width={72}
            height={72}
            style={{ objectFit: 'contain' }}
            priority
          />
        </div>
        <h1 style={{ fontSize: '1.75rem', color: 'var(--blue-900)', marginBottom: '0.5rem', textAlign: 'center' }}>Welcome Back</h1>
        <p style={{ color: 'var(--gray-500)', textAlign: 'center', marginBottom: '2rem' }}>Log in to access your account</p>
        
        {error && (
          <div style={{ background: '#fee2e2', color: '#b91c1c', padding: '0.75rem', borderRadius: '8px', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
            {error}
          </div>
        )}

        <form onSubmit={loginUser} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--gray-700)' }}>Email Address</label>
            <input 
              type="email" 
              required
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--gray-200)' }}
            />
          </div>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--gray-700)', margin: 0 }}>Password</label>
              <Link href="/forgot-password" style={{ fontSize: '0.8rem', color: 'var(--blue-600)', fontWeight: 600, textDecoration: 'none' }}>
                Forgot Password?
              </Link>
            </div>
            <input 
              type="password" 
              required
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--gray-200)' }}
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            style={{ width: '100%', padding: '0.8rem', background: 'var(--blue-600)', color: 'white', borderRadius: '8px', fontWeight: 600, border: 'none', cursor: loading ? 'not-allowed' : 'pointer', marginTop: '0.5rem' }}
          >
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>

        <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          <button 
            onClick={() => signIn('google', { callbackUrl: '/login-redirect' })}
            style={{ width: '100%', padding: '0.8rem', background: 'white', color: 'var(--gray-700)', borderRadius: '8px', fontWeight: 600, border: '1px solid var(--gray-200)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
          >
            <img src="https://authjs.dev/img/providers/google.svg" alt="Google" width={20} height={20} />
            Sign in with Google
          </button>
        </div>

        <p style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.9rem', color: 'var(--gray-500)' }}>
          Don&apos;t have an account? <Link href="/register" style={{ color: 'var(--blue-600)', fontWeight: 600 }}>Register</Link>
        </p>
      </div>
    </div>
  );
}
