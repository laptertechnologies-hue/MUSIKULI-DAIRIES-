import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import ScrollAnimation from '@/components/ScrollAnimation';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Careers | Musikuli Dairies Limited',
  description: 'Explore job opportunities at Musikuli Dairies Limited and join our growing team dedicated to agri-dairy excellence in Uganda.',
};

function daysLeft(deadline: Date): string {
  const now = new Date();
  const diff = Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  if (diff <= 0) return 'Closing today';
  if (diff === 1) return '1 day left';
  return `${diff} days left`;
}

export default async function CareersPage() {
  // Fetch active, non-expired jobs from the database
  const now = new Date();
  const jobs = await prisma.jobListing.findMany({
    where: {
      isActive: true,
      OR: [{ deadline: null }, { deadline: { gte: now } }],
    },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <>
      {/* ===== HERO ===== */}
      <div className="page-hero">
        <span className="section-tag">Join Our Team</span>
        <h1>Build a Future with Musikuli Dairies</h1>
        <p>We&apos;re growing and looking for passionate individuals to contribute to Uganda&apos;s agri-dairy sector.</p>
      </div>

      {/* ===== WHY WORK WITH US ===== */}
      <section style={{ padding: 'var(--section-pad)', background: 'white' }}>
        <div className="container text-center">
          <ScrollAnimation>
            <span className="section-tag">Our Culture</span>
            <h2 className="section-title">Why Choose Musikuli Dairies?</h2>
            <p className="section-subtitle mx-auto">
              At Musikuli Dairies, we believe in empowering our employees to make a real impact.
              Join a team that values innovation, sustainability, and community development.
            </p>
          </ScrollAnimation>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginTop: '3rem' }}>
            <div style={{ background: 'var(--gray-50)', border: '1px solid var(--gray-100)', borderRadius: '16px', padding: '2rem', textAlign: 'left' }}>
              <div className="service-card-icon blue" style={{ marginBottom: '1rem', width: '48px', height: '48px' }}>
                <Image src="/icons/award.svg" alt="" width={24} height={24} />
              </div>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--blue-900)', marginBottom: '0.75rem' }}>Professional Growth</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--gray-600)', lineHeight: 1.7 }}>
                We invest in our employees&apos; development through training, mentorship, and opportunities for advancement.
              </p>
            </div>
            <div style={{ background: 'var(--gray-50)', border: '1px solid var(--gray-100)', borderRadius: '16px', padding: '2rem', textAlign: 'left' }}>
              <div className="service-card-icon green" style={{ marginBottom: '1rem', width: '48px', height: '48px' }}>
                <Image src="/icons/target.svg" alt="" width={24} height={24} />
              </div>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--blue-900)', marginBottom: '0.75rem' }}>Meaningful Impact</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--gray-600)', lineHeight: 1.7 }}>
                Contribute to food security, farmer empowerment, and sustainable agriculture practices in Uganda.
              </p>
            </div>
            <div style={{ background: 'var(--gray-50)', border: '1px solid var(--gray-100)', borderRadius: '16px', padding: '2rem', textAlign: 'left' }}>
              <div className="service-card-icon gold" style={{ marginBottom: '1rem', width: '48px', height: '48px' }}>
                <Image src="/icons/product-community.svg" alt="" width={24} height={24} />
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
          <ScrollAnimation>
            <span className="section-tag">Opportunities</span>
            <h2 className="section-title">Current Job Openings</h2>
            <p className="section-subtitle mx-auto">
              Explore our available positions and find your next career challenge with us.
            </p>
          </ScrollAnimation>

          {jobs.length === 0 ? (
            <div style={{ marginTop: '3rem', background: 'white', borderRadius: '16px', padding: '4rem 2rem', border: '1px solid var(--gray-100)' }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🌱</div>
              <h3 style={{ color: 'var(--blue-900)', marginBottom: '0.5rem' }}>No Open Positions Right Now</h3>
              <p style={{ color: 'var(--gray-600)', maxWidth: '400px', margin: '0 auto 1.5rem' }}>
                We&apos;re not currently hiring, but we&apos;re always growing. Send us your CV and we&apos;ll be in touch!
              </p>
              <Link href="/contact" className="btn btn-primary">Send Your CV →</Link>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginTop: '3rem' }}>
              {jobs.map((job, i) => (
                <ScrollAnimation key={job.id} delay={i * 100}>
                  <div style={{ background: 'white', border: '1px solid var(--gray-100)', borderRadius: '16px', padding: '2rem', textAlign: 'left', display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem', gap: '0.5rem' }}>
                      <h3 style={{ fontSize: '1.2rem', color: 'var(--blue-900)', margin: 0 }}>{job.title}</h3>
                      <span style={{ flexShrink: 0, fontSize: '0.72rem', padding: '0.2rem 0.6rem', borderRadius: '100px', background: 'var(--blue-50)', color: 'var(--blue-600)', fontWeight: 700 }}>
                        {job.type}
                      </span>
                    </div>

                    <p style={{ fontSize: '0.85rem', color: 'var(--gray-500)', margin: '0 0 0.75rem' }}>
                      📍 {job.location}
                    </p>

                    <p style={{ fontSize: '0.9rem', color: 'var(--gray-600)', lineHeight: 1.7, flexGrow: 1, margin: '0 0 1rem' }}>
                      {job.description}
                    </p>

                    {job.requirements && (
                      <div style={{ background: 'var(--gray-50)', borderRadius: '10px', padding: '0.85rem', marginBottom: '1rem', fontSize: '0.82rem', color: 'var(--gray-700)' }}>
                        <strong style={{ color: 'var(--blue-900)' }}>Requirements:</strong><br />
                        {job.requirements}
                      </div>
                    )}

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', fontSize: '0.8rem', color: 'var(--gray-500)' }}>
                      {job.salary && <span>💰 {job.salary}</span>}
                      {job.deadline && (
                        <span style={{ color: daysLeft(new Date(job.deadline)).includes('day') && parseInt(daysLeft(new Date(job.deadline))) <= 7 ? '#dc2626' : 'inherit' }}>
                          ⏰ {daysLeft(new Date(job.deadline))}
                        </span>
                      )}
                    </div>

                    <Link
                      href={`/apply?jobId=${job.id}&job=${encodeURIComponent(job.title)}`}
                      className="btn btn-primary"
                      style={{ marginTop: 'auto', textAlign: 'center', justifyContent: 'center' }}
                    >
                      Apply Now →
                    </Link>
                  </div>
                </ScrollAnimation>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ===== LIFE AT MUSIKULI ===== */}
      <section style={{ padding: 'var(--section-pad)', background: 'white' }}>
        <div className="container">
          <ScrollAnimation className="text-center" style={{ marginBottom: '3rem' }}>
            <span className="section-tag">Gallery</span>
            <h2 className="section-title">Life at Musikuli Dairies</h2>
            <p className="section-subtitle mx-auto">
              See our team in action across our farms, collection centers, and community outreach programs.
            </p>
          </ScrollAnimation>
          <div className="gallery-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
            {['/images/hero_farm.png', '/images/farmers_community.png', '/images/milk_collection.png'].map((src, i) => (
              <div key={i} style={{ height: '300px', position: 'relative' }}>
                <Image src={src} alt="Life at Musikuli" fill style={{ objectFit: 'cover', borderRadius: '16px' }} sizes="(max-width: 768px) 100vw, 33vw" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section style={{ background: 'linear-gradient(135deg, var(--blue-600), var(--blue-800))', padding: '5rem 1.5rem', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ fontSize: 'clamp(2rem,4vw,2.75rem)', color: 'var(--white)', marginBottom: '1rem' }}>
            Can&apos;t Find Your Dream Role?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.75)', maxWidth: '520px', margin: '0 auto 2rem', lineHeight: 1.8 }}>
            We&apos;re always looking for talented individuals. Send us your CV and tell us how you can contribute to Musikuli Dairies.
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
