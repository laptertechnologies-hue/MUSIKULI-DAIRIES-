import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-grid">
        {/* Brand */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div className="navbar-logo-icon">
              <Image
                src="/images/logo.png"
                alt="Musikuli Dairies Logo"
                width={32}
                height={32}
                style={{ objectFit: 'contain' }}
              />
            </div>
            <div>
              <div className="footer-logo-name">Musikuli Dairies Ltd</div>
            </div>
          </div>
          <p className="footer-brand-desc">
            Uganda's premier supplier of high-quality dairy and agricultural products. 
            Committed to sustainable farming and empowering smallholder farmers across Luwero, Nakaseke and Nakasongola.
          </p>
          <div className="footer-social">
            <a href="mailto:musikuliimran@gmail.com" className="footer-social-btn" aria-label="Email us" title="Email">
              <Image src="/icons/email.svg" alt="" width={20} height={20} />
            </a>
            <a href="tel:+256200933861" className="footer-social-btn" aria-label="Call us" title="Call">
              <Image src="/icons/phone.svg" alt="" width={20} height={20} />
            </a>
            <a href="https://wa.me/256200933861" className="footer-social-btn" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" title="WhatsApp">
              <Image src="/icons/whatsapp.svg" alt="" width={20} height={20} />
            </a>
            <a href="https://www.tiktok.com/@musikulidairies" className="footer-social-btn" target="_blank" rel="noopener noreferrer" aria-label="TikTok" title="TikTok">
              <Image src="/icons/tiktok.svg" alt="" width={20} height={20} />
            </a>
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
 
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {year} Musikuli Dairies Limited. All rights reserved.</p>

      </div>
    </footer>
  );
}
