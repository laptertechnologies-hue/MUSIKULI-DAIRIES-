"use client";

import { Suspense } from 'react';
import ScrollAnimation from '@/components/ScrollAnimation';
import ApplyForm from './ApplyForm';

export default function ApplyPage() {
  return (
    <>
      <div className="page-hero">
        <span className="section-tag">Careers</span>
        <h1>Apply for a Position</h1>
        <p>Join our team and help us build the future of agri-dairy in Uganda.</p>
      </div>

      <section className="apply-section">
        <div className="container">
          <div className="apply-layout">
            <div className="apply-form-container">
              <ScrollAnimation>
                <Suspense fallback={<div>Loading form...</div>}>
                  <ApplyForm />
                </Suspense>
              </ScrollAnimation>
            </div>
          </div>
        </div>
      </section>

      
    </>
  );
}
