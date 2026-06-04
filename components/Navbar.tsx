'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/services', label: 'Services' },
  { href: '/portfolio', label: 'Gallery' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/careers', label: 'Careers' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const pathname = usePathname();

  if (pathname?.startsWith('/admin') || pathname?.startsWith('/dashboard')) {
    return null;
  }

  const isHome = pathname === '/';
  const { data: session } = useSession();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navClass = `navbar ${scrolled || !isHome ? 'scrolled' : 'transparent'}`;

  return (
    <>
      <nav className={navClass} role="navigation" aria-label="Main navigation" style={{ zIndex: 1000 }}>
        <div className="navbar-inner">
          {/* Logo */}
          <Link href="/" className="navbar-logo" aria-label="Musikuli Dairies Home">
            <div className="navbar-logo-icon">
              <Image
                src="/images/logo.png"
                alt="Musikuli Dairies Logo"
                width={56}
                height={56}
                style={{ objectFit: 'contain' }}
                priority
              />
            </div>
            <div className="navbar-logo-text">
              <span className="navbar-logo-name">Musikuli Dairies Ltd </span>
              
            </div>
          </Link>

          {/* Desktop links */}
          <ul className="navbar-links">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={pathname === l.href ? 'active' : ''}
                  aria-current={pathname === l.href ? 'page' : undefined}
                >
                  {l.label}
                </Link>
              </li>
            ))}
            {/* Auth Button */}
            <li style={{ position: 'relative' }}>
              {session?.user ? (
                <div>
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '100px', padding: '0.3rem 0.75rem 0.3rem 0.3rem', cursor: 'pointer', color: 'inherit', whiteSpace: 'nowrap' }}
                  >
                    {session.user?.image ? (
                      <Image src={session.user.image} alt="Avatar" width={28} height={28} style={{ borderRadius: '50%' }} />
                    ) : (
                      <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--blue-600)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.8rem', fontWeight: 700 }}>
                        {session.user?.name?.[0]?.toUpperCase() || 'U'}
                      </div>
                    )}
                    <span style={{ fontSize: '0.85rem', fontWeight: 600, whiteSpace: 'nowrap' }}>{session.user?.name?.split(' ')[0]}</span>
                    <span style={{ fontSize: '0.7rem', opacity: 0.7 }}>▾</span>
                  </button>
                  {userMenuOpen && (
                    <div style={{ position: 'absolute', top: '110%', right: 0, background: 'white', borderRadius: '12px', boxShadow: '0 8px 32px rgba(0,0,0,0.15)', minWidth: '160px', overflow: 'hidden', zIndex: 9999 }}>
                      {(session.user as any)?.role === 'ADMIN' && (
                        <Link href="/admin" onClick={() => setUserMenuOpen(false)} style={{ display: 'block', padding: '0.75rem 1rem', color: 'var(--blue-700)', fontWeight: 700, fontSize: '0.85rem', borderBottom: '1px solid var(--gray-100)' }}>⚙ Admin Dashboard</Link>
                      )}
                      <Link href="/dashboard" onClick={() => setUserMenuOpen(false)} style={{ display: 'block', padding: '0.75rem 1rem', color: 'var(--gray-700)', fontSize: '0.85rem', borderBottom: '1px solid var(--gray-100)' }}>📊 My Dashboard</Link>
                      <button onClick={() => { setUserMenuOpen(false); signOut(); }} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '0.75rem 1rem', color: '#dc2626', fontSize: '0.85rem', background: 'none', border: 'none', cursor: 'pointer' }}>Sign Out</button>
                    </div>
                  )}
                </div>
              ) : (
                <Link href="/login" className="btn btn-primary" style={{ padding: '0.55rem 1.25rem', whiteSpace: 'nowrap' }}>
                  Login
                </Link>
              )}
            </li>
          </ul>

          {/* Mobile button */}
          <button
            className="navbar-mobile-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-label="Toggle menu"
            id="mobile-menu-btn"
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`} role="dialog" aria-label="Mobile navigation" style={{ zIndex: 999 }}>
        {links.map((l) => (
          <div key={l.href} style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
            <Link 
              href={l.href} 
              onClick={() => setMenuOpen(false)}
              style={{ color: pathname === l.href ? 'var(--blue-600)' : 'inherit', fontWeight: pathname === l.href ? '700' : '400' }}
            >
              {l.label}
            </Link>
            {/* Show section links specifically when on the About page */}
            {pathname === '/about' && l.href === '/about' && (
              <div style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.6rem', marginTop: '0.25rem', marginBottom: '1rem', borderLeft: '2px solid var(--gray-100)' }}>
                <Link href="#mission" onClick={() => setMenuOpen(false)} style={{ fontSize: '0.9rem', opacity: 0.8 }}>• Mission & Vision</Link>
                <Link href="#founders" onClick={() => setMenuOpen(false)} style={{ fontSize: '0.9rem', opacity: 0.8 }}>• Our Founders</Link>
                <Link href="#values" onClick={() => setMenuOpen(false)} style={{ fontSize: '0.9rem', opacity: 0.8 }}>• Core Values</Link>
              </div>
            )}
          </div>
        ))}
        {/* Mobile Auth */}
        {session?.user ? (
          <div style={{ marginTop: '0.5rem', borderTop: '1px solid var(--gray-100)', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem' }}>
              {session.user?.image ? (
                <Image src={session.user.image} alt="Avatar" width={36} height={36} style={{ borderRadius: '50%' }} />
              ) : (
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--blue-600)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700 }}>
                  {session.user?.name?.[0]?.toUpperCase() || 'U'}
                </div>
              )}
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{session.user?.name}</div>
                <div style={{ fontSize: '0.75rem', opacity: 0.6 }}>{session.user?.email}</div>
              </div>
            </div>
            {(session.user as any)?.role === 'ADMIN' && (
              <Link href="/admin" onClick={() => setMenuOpen(false)} style={{ color: 'var(--blue-600)', fontWeight: 700 }}>⚙ Admin Dashboard</Link>
            )}
            <Link href="/dashboard" onClick={() => setMenuOpen(false)} style={{ color: 'var(--gray-700)', fontWeight: 600 }}>📊 My Dashboard</Link>
            <button onClick={() => { setMenuOpen(false); signOut(); }} style={{ background: '#fee2e2', color: '#dc2626', border: 'none', borderRadius: '8px', padding: '0.6rem', fontWeight: 600, cursor: 'pointer' }}>Sign Out</button>
          </div>
        ) : (
          <Link href="/login" className="btn btn-primary" style={{ marginTop: '0.5rem', justifyContent: 'center' }} onClick={() => setMenuOpen(false)}>
            Login
          </Link>
        )}
      </div>
    </>
  );
}
