'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [token, setToken] = useState('');
  const [email, setEmail] = useState('');
  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const t = searchParams.get('token');
    const e = searchParams.get('email');
    if (t) setToken(t);
    if (e) setEmail(e);
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Something went wrong');
      } else {
        setMessage('Your password has been successfully reset. Redirecting to login page...');
        setTimeout(() => {
          router.push('/login');
        }, 3000);
      }
    } catch (err: any) {
      setError('Failed to connect to the server. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!token || !email) {
    return (
      <div style={{ textAlign: 'center' }}>
        <div style={{ color: '#b91c1c', background: '#fee2e2', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
          Invalid or expired password reset link. Please request a new link.
        </div>
        <Link href="/forgot-password" style={{ color: 'var(--blue-600)', fontWeight: 600, textDecoration: 'none' }}>
          Request New Link
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {error && (
        <div style={{ background: '#fee2e2', color: '#b91c1c', padding: '0.75rem', borderRadius: '8px', fontSize: '0.9rem' }}>
          {error}
        </div>
      )}

      {message && (
        <div style={{ background: '#ecfdf5', color: '#047857', padding: '0.75rem', borderRadius: '8px', fontSize: '0.9rem', lineHeight: '1.4' }}>
          {message}
        </div>
      )}

      <div>
        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--gray-700)' }}>New Password</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--gray-200)' }}
          placeholder="Min. 6 characters"
        />
      </div>

      <div>
        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--gray-700)' }}>Confirm New Password</label>
        <input
          type="password"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--gray-200)' }}
          placeholder="Repeat new password"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        style={{ width: '100%', padding: '0.8rem', background: 'var(--blue-600)', color: 'white', borderRadius: '8px', fontWeight: 600, border: 'none', cursor: loading ? 'not-allowed' : 'pointer', marginTop: '0.5rem' }}
      >
        {loading ? 'Resetting Password...' : 'Reset Password'}
      </button>
    </form>
  );
}

export default function ResetPasswordPage() {
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
        <h1 style={{ fontSize: '1.75rem', color: 'var(--blue-900)', marginBottom: '0.5rem', textAlign: 'center' }}>Reset Password</h1>
        <p style={{ color: 'var(--gray-500)', textAlign: 'center', marginBottom: '2rem', fontSize: '0.9rem' }}>
          Create a new strong password for your account.
        </p>

        <Suspense fallback={<div style={{ textAlign: 'center', color: 'var(--gray-500)' }}>Loading...</div>}>
          <ResetPasswordForm />
        </Suspense>

        <p style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.9rem', color: 'var(--gray-500)' }}>
          Remember your password? <Link href="/login" style={{ color: 'var(--blue-600)', fontWeight: 600, textDecoration: 'none' }}>Back to Login</Link>
        </p>
      </div>
    </div>
  );
}
