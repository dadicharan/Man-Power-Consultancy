import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Briefcase, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  ArrowRight, 
  Building2, 
  HelpCircle 
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Breadcrumb } from '../components/common/Breadcrumb';

export const ServiceDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { services, setEnquiryModalOpen } = useApp();

  const service = services.find(s => s.slug === slug) || services[0];

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 pb-20">
      
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: 'Services', path: '/services' },
          { label: service.title }
        ]}
        title={service.title}
        subtitle={service.shortDesc}
        bannerImage="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80"
        badge="Staffing Specification"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Service Content */}
          <div className="lg:col-span-8 bg-white p-6 sm:p-10 rounded-2xl border border-slate-200 shadow-sm space-y-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#FF6B00]">Overview</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                About {service.title}
              </h2>
              <p className="text-slate-700 mt-3 text-sm sm:text-base leading-relaxed">
                {service.fullDesc}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">
                Included Deliverables & Capabilities
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(service.features || service.benefits || []).map((feat: string, i: number) => (
                  <div key={i} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 flex items-start gap-2.5 text-xs text-slate-800 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-5 bg-orange-50/60 border border-orange-200 rounded-xl flex items-start gap-3">
              <ShieldCheck className="w-6 h-6 text-[#FF6B00] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-sm text-slate-900">Guaranteed Compliance & Retention</h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Every placement comes backed by our statutory compliance audit, credential verification, and 90-day replacement pledge if expectations are unmet.
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="font-bold text-slate-900">Ready to deploy personnel?</div>
                <div className="text-xs text-slate-500">Fast-track matching within 48 business hours.</div>
              </div>
              <button
                onClick={() => setEnquiryModalOpen(true)}
                className="px-6 py-2.5 rounded-lg bg-[#FF6B00] hover:bg-[#E05E00] text-white font-bold text-xs uppercase tracking-wider shadow"
              >
                Request Consultation
              </button>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h4 className="font-bold text-sm text-slate-900 border-b border-slate-100 pb-2">
                Service Benchmark
              </h4>
              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-slate-400 block font-medium">Initial Candidate Shortlist</span>
                  <span className="font-bold text-slate-800">Within 48 - 72 Hours</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Replacement Policy</span>
                  <span className="font-bold text-emerald-600">90 Days Free Replacement</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Statutory Compliance</span>
                  <span className="font-bold text-slate-800">100% PF, ESIC & Labor Act</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Sourcing Range</span>
                  <span className="font-bold text-slate-800">Pan-India & International</span>
                </div>
              </div>
            </div>

            {/* Other services */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <h4 className="font-bold text-sm text-slate-900 border-b border-slate-100 pb-2">
                All Staffing Models
              </h4>
              {services.map(s => (
                <Link
                  key={s.id}
                  to={`/services/${s.slug}`}
                  className={`block p-2.5 rounded-lg text-xs font-semibold transition-colors ${
                    s.slug === slug ? 'bg-[#071A2D] text-white' : 'hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  {s.title}
                </Link>
              ))}
            </div>

          </div>

        </div>
      </div>

    </div>
  );
};
