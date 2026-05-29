'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

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
  const pathname = usePathname();
  const isHome = pathname === '/';

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
                width={32}
                height={32}
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
                  className={pathname === l.href ? 'navbar-cta' : ''}
                  aria-current={pathname === l.href ? 'page' : undefined}
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/quote" className="btn btn-primary" style={{ padding: '0.55rem 1.25rem' }}>
                Get a Quote
              </Link>
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
        <Link
          href="/quote"
          className="btn btn-primary"
          style={{ marginTop: '0.5rem', justifyContent: 'center' }}
          onClick={() => setMenuOpen(false)}
        >
          <Image src="/icons/email.svg" alt="" width={18} height={18} style={{ filter: 'brightness(0) invert(1)' }} />
          Get a Quote
        </Link>
      </div>
    </>
  );
}
