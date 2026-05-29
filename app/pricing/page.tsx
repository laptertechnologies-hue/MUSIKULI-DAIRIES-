import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Pricing | Musikuli Dairies Limited',
  description: 'View our competitive pricing for dairy products, agricultural produce, and custom bulk orders at Musikuli Dairies Limited.',
  openGraph: {
    title: 'Pricing | Musikuli Dairies Limited',
    description: 'Competitive pricing for premium dairy and agricultural products in Uganda.',
    url: 'https://musikulidairies.com/pricing',
  },
};

const plans = [
  {
    tag: 'Retail',
    title: 'Retail Purchase',
    price: 'Market Rate',
    unit: 'Standard pricing',
    desc: 'Walk-in purchase at our Kasana-Luwero retail outlet.',
    features: [
      'Fresh milk (processed & unprocessed)',
      'Maize, beans, rice & groundnuts',
      'No minimum order',
      'Same-day availability',
      'Receipt provided',
    ],
    cta: 'Visit Our Outlet',
    href: '/contact',
    featured: false,
    id: 'pricing-retail-btn',
  },
  {
    tag: 'Wholesale',
    title: 'Wholesale Order',
    price: 'Negotiated',
    unit: 'Per tonne / litre',
    desc: 'Competitive wholesale pricing for bulk buyers, traders and distributors.',
    features: [
      'All agricultural produce',
      'Dairy (milk) in bulk',
      'Volume-based discounts',
      'Scheduled delivery options',
      'Quality certificate',
      'Dedicated account manager',
    ],
    cta: 'Get Wholesale Quote',
    href: '/quote',
    featured: true,
    id: 'pricing-wholesale-btn',
  },
  {
    tag: 'Partnership',
    title: 'Outgrower Partner',
    price: 'Tailored',
    unit: 'Program-based',
    desc: 'Join our outgrower scheme as a farmer partner and access training, inputs, and guaranteed markets.',
    features: [
      'Free agronomy training',
      'Access to quality farm inputs',
      'Guaranteed market purchase',
      'Financial literacy support',
      'Agriculture finance access',
      'Community membership',
    ],
    cta: 'Join as a Farmer',
    href: '/quote',
    featured: false,
    id: 'pricing-partner-btn',
  },
];

const products = [
  { product: 'Fresh Milk (Unprocessed)', unit: 'Per litre', note: 'Farm gate price' },
  { product: 'Processed Milk', unit: 'Per litre', note: 'Retail / Wholesale' },
  { product: 'Maize (Dry)', unit: 'Per kg / Tonne', note: 'Grade A' },
  { product: 'Beans', unit: 'Per kg / Tonne', note: 'Sun-dried & sorted' },
  { product: 'Rice', unit: 'Per kg / Tonne', note: 'Clean & milled' },
  { product: 'Groundnuts', unit: 'Per kg / Tonne', note: 'Raw & roasted available' },
];

export default function PricingPage() {
  return (
    <>
      <div className="page-hero">
        <span className="section-tag">Pricing</span>
        <h1>Transparent &amp; Competitive Pricing</h1>
        <p>Affordable, quality products for retail buyers, wholesalers and outgrower partners. Request a custom quote for your specific needs.</p>
      </div>

      {/* Plans */}
      <section style={{ padding: 'var(--section-pad)', background: 'white' }}>
        <div className="container">
          <div className="pricing-grid">
            {plans.map((plan) => (
              <div key={plan.title} className={`pricing-card ${plan.featured ? 'featured' : ''}`}>
                {plan.featured && (
                  <div className="pricing-popular-badge" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Image src="/icons/award.svg" alt="" width={14} height={14} style={{ filter: 'brightness(0) invert(1)' }} />
                    Most Popular
                  </div>
                )}
                <div className="pricing-card-tag">{plan.tag}</div>
                <h3>{plan.title}</h3>
                <div className="pricing-price">{plan.price}</div>
                <div className="pricing-price-unit">{plan.unit}</div>
                <p style={{ fontSize: '0.875rem', color: plan.featured ? 'rgba(255,255,255,0.7)' : 'var(--gray-500)', lineHeight: 1.7, marginBottom: '1.25rem' }}>{plan.desc}</p>
                <div className="pricing-divider" />
                <ul className="pricing-features">
                  {plan.features.map((f) => (
                    <li key={f} className="pricing-feature">
                      <Image src="/icons/target.svg" alt="" width={14} height={14} className="pricing-check" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href={plan.href} className={`btn ${plan.featured ? '' : 'btn-primary'}`}
                  id={plan.id}
                  style={plan.featured ? { background: 'white', color: 'var(--blue-700)', fontWeight: 700, fontFamily: 'Inter, sans-serif', width: '100%', justifyContent: 'center' } : { width: '100%', justifyContent: 'center' }}>
                  {plan.cta} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Price Reference */}
      <section style={{ padding: 'var(--section-pad)', background: 'var(--gray-50)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span className="section-tag">Product Reference</span>
            <h2 className="section-title">Our Products</h2>
            <p className="section-subtitle mx-auto">
              Actual prices vary with market conditions. Contact us or request a quote for current pricing.
            </p>
          </div>
          <div style={{ background: 'white', border: '1px solid var(--gray-100)', borderRadius: '20px', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: 'var(--blue-900)', color: 'white' }}>
                  <th style={{ padding: '1rem 1.5rem', textAlign: 'left', fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', letterSpacing: '0.05em' }}>Product</th>
                  <th style={{ padding: '1rem 1.5rem', textAlign: 'left', fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', letterSpacing: '0.05em' }}>Unit</th>
                  <th style={{ padding: '1rem 1.5rem', textAlign: 'left', fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', letterSpacing: '0.05em' }}>Price</th>
                  <th style={{ padding: '1rem 1.5rem', textAlign: 'left', fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', letterSpacing: '0.05em' }}>Note</th>
                </tr>
              </thead>
              <tbody>
                {products.map((row, i) => (
                  <tr key={row.product} style={{ background: i % 2 === 0 ? 'white' : 'var(--gray-50)', borderBottom: '1px solid var(--gray-100)' }}>
                    <td style={{ padding: '1rem 1.5rem', fontWeight: 600, color: 'var(--blue-900)', fontSize: '0.9rem' }}>{row.product}</td>
                    <td style={{ padding: '1rem 1.5rem', color: 'var(--gray-600)', fontSize: '0.875rem' }}>{row.unit}</td>
                    <td style={{ padding: '1rem 1.5rem' }}>
                      <span style={{ background: 'var(--blue-100)', color: 'var(--blue-700)', padding: '0.2rem 0.75rem', borderRadius: '100px', fontSize: '0.8rem', fontWeight: 600, fontFamily: 'Inter, sans-serif' }}>
                        Contact for Price
                      </span>
                    </td>
                    <td style={{ padding: '1rem 1.5rem', color: 'var(--gray-500)', fontSize: '0.8rem' }}>{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link href="/quote" className="btn btn-primary" id="pricing-cta-btn">
              <Image src="/icons/target.svg" alt="" width={18} height={18} style={{ filter: 'brightness(0) invert(1)' }} />
              Request a Custom Quote
            </Link>
          </div>
        </div>
      </section>

      {/* Note */}
      <section style={{ padding: '2rem 1.5rem 4rem', background: 'white' }}>
        <div className="container">
          <div style={{ background: 'var(--blue-50)', border: '1px solid var(--blue-100)', borderRadius: '16px', padding: '1.5rem 2rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <div style={{ width: '40px', height: '40px', background: 'var(--blue-100)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Image src="/icons/target.svg" alt="" width={20} height={20} />
            </div>
            <div>
              <strong style={{ color: 'var(--blue-900)', fontFamily: 'Inter, sans-serif', display: 'block', marginBottom: '0.25rem' }}>Pricing Note</strong>
              <p style={{ color: 'var(--gray-600)', fontSize: '0.875rem', lineHeight: 1.7 }}>
                All prices are subject to market conditions and seasonal availability. Bulk discounts apply for wholesale orders. 
                Please use our <Link href="/quote" style={{ color: 'var(--blue-600)', fontWeight: 600 }}>quote request form</Link> or 
                contact us directly at <a href="tel:+256200933861" style={{ color: 'var(--blue-600)', fontWeight: 600 }}>+256 200 933 861</a> for 
                the most current pricing.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
