import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Gallery | Musikuli Dairies Limited',
  description: 'View our farm, dairy products, agricultural produce, and community initiatives in our photo gallery.',
};

const galleryItems = [
  { src: '/images/hero_farm.png', alt: 'Musikuli Farm — Nsozibirye, Luwero', caption: 'Our Farm', sub: 'Nsozibirye-Kigombe, Luwero' },
  { src: '/images/dairy_products.png', alt: 'Fresh dairy products', caption: 'Dairy Products', sub: 'Fresh milk & dairy' },
  { src: '/images/agro_produce.png', alt: 'Agricultural produce', caption: 'Agro Produce', sub: 'Maize, Beans, Rice & Groundnuts' },
  { src: '/images/farmers_community.png', alt: 'Farmer community in Luwero', caption: 'Our Community', sub: '200+ supported farmers' },
  { src: '/images/milk_collection.png', alt: 'Milk collection centre', caption: 'Milk Collection Centre', sub: 'Reducing milk wastage' },
  { src: '/images/founders.png', alt: 'Musikuli Dairies founders', caption: 'Our Founders', sub: 'Ibrahim Musikuli & Reginah Nabateregga' },
];

export default function PortfolioPage() {
  return (
    <>
      <div className="page-hero">
        <span className="section-tag">Our Gallery</span>
        <h1>Farm to Table — Our Visual Story</h1>
        <p>A glimpse into our farm, operations, products and the communities we&apos;re proud to serve across Uganda.</p>
      </div>

      <section style={{ padding: 'var(--section-pad)', background: 'white' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.5rem' }}>
            {galleryItems.map((item) => (
              <div key={item.caption} className="gallery-item" style={{ height: '280px' }}>
                <Image src={item.src} alt={item.alt} fill style={{ objectFit: 'cover' }} />
                <div className="gallery-item-overlay" style={{ opacity: 1, background: 'linear-gradient(to top, rgba(10,22,40,0.8) 0%, transparent 55%)' }}>
                  <div>
                    <div style={{ color: 'white', fontWeight: 700, fontFamily: 'Inter, sans-serif', fontSize: '1rem' }}>{item.caption}</div>
                    <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem', marginTop: '0.15rem' }}>{item.sub}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Farm Info */}
      <section style={{ padding: 'var(--section-pad)', background: 'var(--gray-50)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span className="section-tag">Our Farm</span>
            <h2 className="section-title">Nsozibirye Zero-Grazing Farm</h2>
            <p className="section-subtitle mx-auto">Our demonstration farm serves as a training centre for smallholder dairy farmers in the region.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
            {[
              { icon: '📍', title: 'Location', desc: 'Nsozibirye Village, Kigombe Parish, Luwero Sub County' },
              { icon: '🐄', title: 'Zero-Grazing Farm', desc: 'Modern dairy farming methods in an enclosed, controlled environment' },
              { icon: '🎓', title: 'Training Centre', desc: 'Hands-on training for farmers in pasture growing, milk handling and livestock management' },
              { icon: '🌿', title: 'Sustainable Practices', desc: 'Promoting environmentally sustainable agriculture that benefits communities' },
            ].map((f) => (
              <div key={f.title} style={{ background: 'white', border: '1px solid var(--gray-100)', borderRadius: '16px', padding: '1.5rem', textAlign: 'center' }}>
                <div style={{ fontSize: '2.25rem', marginBottom: '0.75rem' }}>{f.icon}</div>
                <h4 style={{ color: 'var(--blue-900)', marginBottom: '0.5rem', fontFamily: 'Inter, sans-serif' }}>{f.title}</h4>
                <p style={{ fontSize: '0.875rem', color: 'var(--gray-500)', lineHeight: 1.7 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
