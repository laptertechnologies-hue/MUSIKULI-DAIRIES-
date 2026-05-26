import Link from 'next/link';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-grid">
        {/* Brand */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div className="navbar-logo-icon" style={{ background: 'linear-gradient(135deg,#1a56db,#16a34a)' }}>M</div>
            <div>
              <div className="footer-logo-name">Musikuli Dairies Ltd</div>
              <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Est. June 2023 · Reg. 80034163888407</div>
            </div>
          </div>
          <p className="footer-brand-desc">
            Uganda's premier supplier of high-quality dairy and agricultural products. 
            Committed to sustainable farming and empowering smallholder farmers across Luwero, Nakaseke and Nakasongola.
          </p>
          <div className="footer-social">
            <a href="mailto:musikuliimran@gmail.com" className="footer-social-btn" aria-label="Email us" title="Email">✉</a>
            <a href="tel:+256200933861" className="footer-social-btn" aria-label="Call us" title="Call">📞</a>
            <a href="https://wa.me/256200933861" className="footer-social-btn" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" title="WhatsApp">💬</a>
          </div>
        </div>

        {/* Company */}
        <div className="footer-col">
          <h4>Company</h4>
          <ul className="footer-links">
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/about#mission">Mission & Vision</Link></li>
            <li><Link href="/about#founders">Our Founders</Link></li>
            <li><Link href="/about#values">Core Values</Link></li>
          </ul>
        </div>

        {/* Services */}
        <div className="footer-col">
          <h4>Services</h4>
          <ul className="footer-links">
            <li><Link href="/services#dairy">Dairy Enterprise</Link></li>
            <li><Link href="/services#agro">Agro-produce</Link></li>
            <li><Link href="/services#mcc">Milk Collection</Link></li>
            <li><Link href="/services#outgrower">Outgrower Scheme</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-col">
          <h4>Contact</h4>
          <ul className="footer-links">
            <li><a href="mailto:musikuliimran@gmail.com">musikuliimran@gmail.com</a></li>
            <li><a href="tel:+256200933861">+256 200 933 861</a></li>
            <li><span>P.O Box 170174</span></li>
            <li><span>Luwero, Uganda</span></li>
          </ul>
          <div style={{ marginTop: '1.25rem' }}>
            <Link href="/quote" className="btn btn-primary" style={{ fontSize: '0.85rem', padding: '0.65rem 1.25rem' }}>
              Get a Quote →
            </Link>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {year} Musikuli Dairies Limited. All rights reserved.</p>
        <p>Nsozibirye-Kigombe, Luwero Sub County, Luwero District, Uganda</p>
      </div>
    </footer>
  );
}
