"use client";

import ScrollAnimation from '@/components/ScrollAnimation';
import Image from 'next/image';

export default function ContactPage() {
  return (
    <>
      <div className="page-hero">
        <span className="section-tag">Get In Touch</span>
        <h1>Contact Musikuli Dairies Limited</h1>
        <p>We&apos;re here to help. Reach out via phone, email, or visit us at our farm in Luwero.</p>
      </div>

      <section className="contact-main">
        <div className="container">
          <div className="contact-grid">
            {/* Contact Info */}
            <ScrollAnimation>
              <div>
                <span className="section-tag">Our Details</span>
                <h2 className="section-title mb-8">How to Reach Us</h2>
                <div className="contact-info-items">
                  {[
                    {
                      icon: '/icons/location.svg',
                      cls: 'blue',
                      title: 'Physical Address',
                      desc: 'Nsozibirye Village, Kigombe Parish, Luwero Sub County, Luwero District, Uganda',
                    },
                    {
                      icon: '/icons/mailbox.svg',
                      cls: 'green',
                      title: 'Postal Address',
                      desc: 'P.O Box 170174, Luwero-Uganda',
                    },
                    {
                      icon: '/icons/phone.svg',
                      cls: 'blue',
                      title: 'Telephone',
                      desc: '+256 200 933 861',
                    },
                    {
                      icon: '/icons/email.svg',
                      cls: 'gold',
                      title: 'Email Address',
                      desc: 'info@musikulidairies.com',
                    },
                    {
                      icon: '/icons/target.svg',
                      cls: 'green',
                      title: 'Business Hours',
                      desc: 'Monday – Saturday: 7:00 AM – 6:0 PM',
                    },
                  ].map((c) => (
                    <div key={c.title} className="contact-info-card">
                      <div className={`contact-info-icon ${c.cls}`}>
                        <Image src={c.icon} alt={c.title} width={24} height={24} />
                      </div>
                      <div>
                        <h4>{c.title}</h4>
                        <p>{c.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quick actions */}
                <div className="quick-actions">
                  <a href="tel:+256200933861" className="btn btn-primary" id="contact-call-btn">📞 Call Now</a>
                  <a href="mailto:info@musikulidairies.com" className="btn btn-outline" id="contact-email-btn">✉️ Send Email</a>
                  <a href="https://wa.me/256200933861" target="_blank" rel="noopener noreferrer" className="btn btn-green" id="contact-whatsapp-btn">💬 WhatsApp</a>
                </div>
              </div>
            </ScrollAnimation>

            {/* Map */}
            <ScrollAnimation delay={200}>
              <div>
                <div className="contact-map">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63678.43247756754!2d32.421!3d0.824!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x177b0b3be5e4e5a7%3A0x5d10f8a4f0e2e3a5!2sLuwero%2C%20Uganda!5e0!3m2!1sen!2s!4v1716700000000!5m2!1sen!2s"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Musikuli Dairies Location — Luwero, Uganda"
                    style={{ width: '100%', height: '100%', border: 0 }}
                  />
                </div>
                <p className="map-caption">
                  📍 Luwero District, Central Uganda
                </p>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Registration Info */}
      <section className="registration-section">
        <div className="container">
          <ScrollAnimation>
            <div className="registration-grid">
              <div className="registration-card">
                <div className="registration-icon">🏢</div>
                <h4 className="registration-title">Company Name</h4>
                <p className="registration-val">Musikuli Dairies Limited</p>
              </div>
              <div className="registration-card">
                <div className="registration-icon">📋</div>
                <h4 className="registration-title">Registration Number</h4>
                <p className="registration-val">80034163888407</p>
              </div>
              <div className="registration-card">
                <div className="registration-icon">📅</div>
                <h4 className="registration-title">Date Incorporated</h4>
                <p className="registration-val">29th June, 2023</p>
              </div>
              <div className="registration-card">
                <div className="registration-icon">🌍</div>
                <h4 className="registration-title">Country</h4>
                <p className="registration-val">Uganda</p>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </section>


    </>
  );
}