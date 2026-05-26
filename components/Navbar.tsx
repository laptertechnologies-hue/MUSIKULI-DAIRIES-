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
      <nav className={navClass} role="navigation" aria-label="Main navigation">
        <div className="navbar-inner">
          {/* Logo */}
          <Link href="/" className="navbar-logo" aria-label="Musikuli Dairies Home">
            <div className="navbar-logo-icon">M</div>
            <div className="navbar-logo-text">
              <span className="navbar-logo-name">Musikuli Dairies</span>
              <span className="navbar-logo-sub">Limited · Est. 2023</span>
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
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`} role="dialog" aria-label="Mobile navigation">
        {links.map((l) => (
          <Link key={l.href} href={l.href} onClick={() => setMenuOpen(false)}>
            {l.label}
          </Link>
        ))}
        <Link
          href="/quote"
          className="btn btn-primary"
          style={{ marginTop: '0.5rem', justifyContent: 'center' }}
          onClick={() => setMenuOpen(false)}
        >
          🗒️ Get a Quote
        </Link>
      </div>
    </>
  );
}
