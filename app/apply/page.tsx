import { Suspense } from 'react';
import ApplyForm from './ApplyForm';

export default function ApplyPage() {
  return (
    <>
      <div className="page-hero">
        <span className="section-tag">Careers</span>
        <h1>Apply for a Position</h1>
        <p>Join our team and help us build the future of agri-dairy in Uganda.</p>
      </div>

      <section className="quote-section" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
        <div className="container">
          <div className="quote-layout" style={{ gridTemplateColumns: '1fr' }}>
            <div className="quote-form-wrapper" style={{ maxWidth: '800px', margin: '0 auto', width: '100%' }}>
              <Suspense fallback={<div>Loading form...</div>}>
                <ApplyForm />
              </Suspense>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
