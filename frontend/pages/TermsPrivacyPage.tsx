import React from 'react';
import { Breadcrumb } from '../components/common/Breadcrumb';

export const TermsPrivacyPage: React.FC<{ type: 'terms' | 'privacy' }> = ({ type }) => {
  const isTerms = type === 'terms';

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 pb-20">
      <Breadcrumb
        items={[{ label: isTerms ? 'Terms & Conditions' : 'Privacy Policy' }]}
        title={isTerms ? 'Terms of Service' : 'Privacy Policy'}
        subtitle="WorkForce Manpower Consultancy regulatory compliance, data protection, and recruitment protocols."
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        <div className="bg-white p-8 sm:p-12 rounded-2xl border border-slate-200 shadow-sm text-sm text-slate-700 leading-relaxed space-y-6">
          
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-xl font-bold text-slate-900">
              {isTerms ? 'Client & Candidate Terms of Service' : 'Candidate & Enterprise Privacy Policy'}
            </h2>
            <p className="text-xs text-slate-500 mt-1">Last Updated: September 2026</p>
          </div>

          {isTerms ? (
            <>
              <div>
                <h3 className="font-bold text-slate-900 text-base mb-2">1. Scope of Staffing Services</h3>
                <p>
                  WorkForce Manpower Consultancy acts as an intermediary workforce provider connecting licensed employers with screened candidates for permanent, contract, and temporary placements across India and overseas.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 text-base mb-2">2. Candidate Zero-Fee Guarantee</h3>
                <p>
                  In compliance with Ministry of Labor & Employment regulations, WorkForce Manpower Consultancy strictly charges ZERO placement or registration fees to job applicants. Any individual or agency soliciting money on behalf of WorkForce should be reported immediately.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 text-base mb-2">3. 90-Day Placement Replacement Warranty</h3>
                <p>
                  For permanent recruitment retainers, if a placed candidate resigns or is terminated for performance within 90 calendar days of joining, WorkForce will provide a replacement candidate at zero additional sourcing cost.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 text-base mb-2">4. Statutory Compliance</h3>
                <p>
                  All temporary and contract personnel are administered with strict adherence to PF, ESIC, Gratuity, and minimum wage legislation.
                </p>
              </div>
            </>
          ) : (
            <>
              <div>
                <h3 className="font-bold text-slate-900 text-base mb-2">1. Data Collection & Usage</h3>
                <p>
                  We collect resumes, contact information, educational credentials, and employment history solely to match job candidates with prospective hiring organizations and facilitate recruitment interviews.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 text-base mb-2">2. Confidentiality & Third-Party Disclosure</h3>
                <p>
                  Candidate profiles and resumes are only shared with verified, contracted client employers after receiving explicit candidate interest or consent. We do not sell or monetize personal recruitment data to third-party marketing entities.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 text-base mb-2">3. Data Retention & Right to Erasure</h3>
                <p>
                  Candidates may request their profile or uploaded resume be updated, anonymized, or purged from our active applicant database at any time by emailing privacy@workforcemanpower.com.
                </p>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
};
