import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy | Musikuli Dairies Limited',
  description: 'Privacy Policy for Musikuli Dairies Limited. Understand how we collect, store, and protect your personal information.',
  openGraph: {
    title: 'Privacy Policy | Musikuli Dairies Limited',
    description: 'Learn how Musikuli Dairies Limited manages and protects user data in Uganda.',
    url: 'https://musikulidairies.com/privacy',
  },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <div className="page-hero">
        <span className="section-tag">Legals</span>
        <h1>Privacy Policy</h1>
        <p>Last updated: July 19, 2026. Learn how we handle and protect your personal data.</p>
      </div>

      <section style={{ padding: 'var(--section-pad)', background: 'white' }}>
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto', color: 'var(--blue-900)' }}>
          <div style={{ lineHeight: '1.8', fontSize: '1.05rem' }}>
            <p style={{ marginBottom: '1.5rem' }}>
              At <strong>Musikuli Dairies Limited</strong>, we are committed to safeguarding the privacy of our website visitors, customers, and partners. This Privacy Policy outlines the types of information we collect, how we use it, and the security measures we employ to protect your data.
            </p>

            <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2.5rem', marginBottom: '1rem', color: 'var(--blue-950)' }}>
              1. Information We Collect
            </h2>
            <p style={{ marginBottom: '1rem' }}>
              We collect information to provide better services to our users and partners. The information we collect falls into two categories:
            </p>
            <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem', listStyleType: 'disc' }}>
              <li style={{ marginBottom: '0.5rem' }}>
                <strong>Information you provide to us:</strong> This includes your name, email address, telephone contact, and message when you register an account, request a quote, submit a job application, or post a broker listing.
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <strong>Information collected automatically:</strong> We collect details about your visits to our website, including traffic data, location data, logs, and resources accessed via cookies and server logs.
              </li>
            </ul>

            <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2.5rem', marginBottom: '1rem', color: 'var(--blue-950)' }}>
              2. How We Use Your Information
            </h2>
            <p style={{ marginBottom: '1rem' }}>
              We use the collected information to:
            </p>
            <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem', listStyleType: 'disc' }}>
              <li style={{ marginBottom: '0.5rem' }}>Verify and manage your user account.</li>
              <li style={{ marginBottom: '0.5rem' }}>Process quote requests and coordinate agricultural product order fulfillments.</li>
              <li style={{ marginBottom: '0.5rem' }}>Review job applications submitted via our careers section.</li>
              <li style={{ marginBottom: '0.5rem' }}>Moderate broker marketplace listings to maintain trust and prevent fraudulent trade.</li>
              <li style={{ marginBottom: '0.5rem' }}>Send transaction notifications and automated password reset links.</li>
            </ul>

            <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2.5rem', marginBottom: '1rem', color: 'var(--blue-950)' }}>
              3. Cookies and Tracking Technologies
            </h2>
            <p style={{ marginBottom: '1.5rem' }}>
              We use cookies to analyze web traffic, remember user preferences, and maintain active secure user sessions. You can choose to accept or decline cookies. Please note that declining cookies may restrict some website functionalities, particularly authentication and portal dashboard services.
            </p>

            <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2.5rem', marginBottom: '1rem', color: 'var(--blue-950)' }}>
              4. Data Sharing and Third Parties
            </h2>
            <p style={{ marginBottom: '1.5rem' }}>
              We do not sell, trade, or rent your personal information to third parties. We may share necessary details with trusted partners (such as database hosts, SMTP email delivery networks, and legal authorities under Ugandan law) to perform essential services, strictly on the condition of confidentiality.
            </p>

            <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2.5rem', marginBottom: '1rem', color: 'var(--blue-950)' }}>
              5. Data Security
            </h2>
            <p style={{ marginBottom: '1.5rem' }}>
              We employ robust administrative and technical measures, including standard encryption protocols and secure database hosting, to prevent unauthorized access, loss, or alteration of your personal data.
            </p>

            <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2.5rem', marginBottom: '1rem', color: 'var(--blue-950)' }}>
              6. Your Data Rights
            </h2>
            <p style={{ marginBottom: '1.5rem' }}>
              You have the right to access the personal data we hold about you, request corrections, update your telephone contact via the profile settings tab, or request the deletion of your account.
            </p>

            <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2.5rem', marginBottom: '1rem', color: 'var(--blue-950)' }}>
              7. Contact Us
            </h2>
            <p style={{ marginBottom: '1.5rem' }}>
              If you have any questions about this Privacy Policy or our handling of your data, please contact us:
            </p>
            <p style={{ paddingLeft: '1rem', borderLeft: '4px solid var(--blue-500)', fontStyle: 'italic', marginBottom: '2.5rem' }}>
              Musikuli Dairies Limited<br />
              Email: <a href="mailto:info@musikulidairies.com" style={{ color: 'var(--blue-600)', textDecoration: 'underline' }}>info@musikulidairies.com</a><br />
              Phone: +256 200 933 861<br />
              Address: Luwero, Uganda
            </p>

            <div style={{ textAlign: 'center', marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid #e5e7eb' }}>
              <Link href="/" className="btn btn-primary">
                Return to Home
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
