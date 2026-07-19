'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="cookie-consent" role="alert">
      <div className="cookie-consent-text">
        We use cookies to improve your experience on our website, keep you signed in, and analyze traffic. By continuing to browse, you agree to our use of cookies and our <Link href="/privacy">Privacy Policy</Link>.
      </div>
      <div className="cookie-consent-btns">
        <button onClick={handleDecline} className="cookie-btn-decline" aria-label="Decline cookies">
          Decline
        </button>
        <button onClick={handleAccept} className="cookie-btn-accept" aria-label="Accept cookies">
          Accept
        </button>
      </div>
    </div>
  );
}
