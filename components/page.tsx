'use client';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

// Metadata for the page (for SEO)
export const metadata: Metadata = {
  title: 'Careers | Musikuli Dairies Limited',
  description: 'Explore job opportunities at Musikuli Dairies Limited and join our growing team dedicated to agri-dairy excellence in Uganda.',
};

// Placeholder for job opportunities
const jobOpportunities = [
  {
    id: '1',
    title: 'Dairy Farm Manager',
    location: 'Luwero, Uganda',
    type: 'Full-time',
    description: 'Oversee daily operations of our Nsozibirye zero-grazing dairy farm, ensuring optimal production and animal welfare.',
    link: '/apply?job=dairy-farm-manager',
  },
  {
    id: '2',
    title: 'Agro-Produce Procurement Officer',
    location: 'Luwero, Nakaseke, Nakasongola',
    type: 'Full-time',
    description: 'Manage relationships with smallholder farmers and ensure timely procurement of maize, beans, rice, and groundnuts.',
    link: '/apply?job=procurement-officer',
  },
  {
    id: '3',
    title: 'Logistics & Distribution Assistant',
    location: 'Luwero, Uganda',
    type: 'Full-time',
    description: 'Coordinate the efficient transport and distribution of dairy products and agro-produce to various markets.',
    link: '/apply?job=logistics-assistant',
  },
  {
    id: '4',
    title: 'Community Outreach Coordinator',
    location: 'Luwero, Uganda',
    type: 'Part-time',
    description: 'Engage with local farming communities, organize training sessions, and support our outgrower network.',
    link: '/apply?job=community-coordinator',
  },
];

export default function CareersPage() {
  return (
    <>
      {/* ===== HERO ===== */}
      <div className="page-hero">
        <span className="section-tag">Join Our Team</span>
        <h1>Build a Future with Musikuli Dairies</h1>
        <p>We're growing and looking for passionate individuals to contribute to Uganda's agri-dairy sector.</p>
      </div>

      {/* ===== WHY WORK WITH US ===== */}
      <section style={{ padding: 'var(--section-pad)', background: 'white' }}>
        <div className="container text-center">
          <span className="section-tag">Our Culture</span>
          <h2 className="section-title">Why Choose Musikuli Dairies?</h2>
          <p className="section-subtitle mx-auto">
            At Musikuli Dairies, we believe in empowering our employees to make a real impact.
            Join a team that values innovation, sustainability, and community development.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginTop: '3rem' }}>
            <div style={{ background: 'var(--gray-50)', border: '1px solid var(--gray-100)', borderRadius: '16px', padding: '2rem', textAlign: 'left' }}>
              <div className="service-card-icon blue" style={{ marginBottom: '1rem', width: '48px', height: '48px' }}>
                <Image src="/icons/growth.svg" alt="Growth Icon" width={24} height={24} />
              </div>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--blue-900)', marginBottom: '0.75rem' }}>Professional Growth</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--gray-600)', lineHeight: 1.7 }}>
                We invest in our employees' development through training, mentorship, and opportunities for advancement.
              </p>
            </div>
            <div style={{ background: 'var(--gray-50)', border: '1px solid var(--gray-100)', borderRadius: '16px', padding: '2rem', textAlign: 'left' }}>
              <div className="service-card-icon green" style={{ marginBottom: '1rem', width: '48px', height: '48px' }}>
                <Image src="/icons/impact.svg" alt="Impact Icon" width={24} height={24} />
              </div>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--blue-900)', marginBottom: '0.75rem' }}>Meaningful Impact</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--gray-600)', lineHeight: 1.7 }}>
                Contribute to food security, farmer empowerment, and sustainable agriculture practices in Uganda.
              </p>
            </div>
            <div style={{ background: 'var(--gray-50)', border: '1px solid var(--gray-100)', borderRadius: '16px', padding: '2rem', textAlign: 'left' }}>
              <div className="service-card-icon gold" style={{ marginBottom: '1rem', width: '48px', height: '48px' }}>
                <Image src="/icons/team.svg" alt="Team Icon" width={24} height={24} />
              </div>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--blue-900)', marginBottom: '0.75rem' }}>Collaborative Environment</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--gray-600)', lineHeight: 1.7 }}>
                Work alongside a dedicated and supportive team in a dynamic and inclusive workplace.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CURRENT OPENINGS ===== */}
      <section style={{ padding: 'var(--section-pad)', background: 'var(--gray-50)' }}>
        <div className="container text-center">
          <span className="section-tag">Opportunities</span>
          <h2 className="section-title">Current Job Openings</h2>
          <p className="section-subtitle mx-auto">
            Explore our available positions and find your next career challenge with us.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginTop: '3rem' }}>
            {jobOpportunities.map((job) => (
              <div key={job.id} style={{ background: 'white', border: '1px solid var(--gray-100)', borderRadius: '16px', padding: '2rem', textAlign: 'left', display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--blue-900)', marginBottom: '0.5rem' }}>{job.title}</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--gray-500)', marginBottom: '0.75rem' }}>
                  {job.location} • {job.type}
                </p>
                <p style={{ fontSize: '0.9rem', color: 'var(--gray-600)', lineHeight: 1.7, flexGrow: 1 }}>
                  {job.description}
                </p>
                <Link href={job.link} className="btn btn-primary" style={{ marginTop: '1.5rem', alignSelf: 'flex-start' }}>
                  Apply Now →
                </Link>
              </div>
            ))}
          </div>
          {jobOpportunities.length === 0 && (
            <p style={{ fontSize: '1.1rem', color: 'var(--gray-600)', marginTop: '2rem' }}>
              No open positions at the moment. Please check back later!
            </p>
          )}
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section style={{ background: 'linear-gradient(135deg, var(--blue-600), var(--blue-800))', padding: '5rem 1.5rem', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ fontSize: 'clamp(2rem,4vw,2.75rem)', color: 'var(--white)', marginBottom: '1rem' }}>
            Can't Find Your Dream Role?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.75)', maxWidth: '520px', margin: '0 auto 2rem', lineHeight: 1.8 }}>
            We're always looking for talented individuals. Send us your CV and tell us how you can contribute to Musikuli Dairies.
          </p>
          <Link href="/contact" className="btn btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem' }}>
            <Image src="/icons/email.svg" alt="" width={18} height={18} style={{ filter: 'brightness(0) invert(1)' }} />
            Send Your CV
          </Link>
        </div>
      </section>
    </>
  );
}