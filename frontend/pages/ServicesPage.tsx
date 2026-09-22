import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Briefcase, 
  Users, 
  UserCheck, 
  FileText, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Clock, 
  TrendingUp, 
  Award, 
  Building2, 
  Cpu, 
  Wrench, 
  HeartPulse 
} from 'lucide-react';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { useApp } from '../context/AppContext';

export const ServicesPage: React.FC = () => {
  const { services, setEnquiryModalOpen } = useApp();

  const industries = [
    { name: 'IT & Software', icon: Cpu, jobs: '18 Active Openings' },
    { name: 'Engineering & EPC', icon: Wrench, jobs: '15 Active Openings' },
    { name: 'Healthcare & Pharma', icon: HeartPulse, jobs: '4 Active Openings' },
    { name: 'Manufacturing & Plants', icon: Building2, jobs: '12 Active Openings' },
    { name: 'Banking & Financial', icon: TrendingUp, jobs: '6 Active Openings' },
    { name: 'Logistics & Supply Chain', icon: Briefcase, jobs: '8 Active Openings' }
  ];

  return (
    <div className="bg-white text-slate-900 pb-20">
      
      {/* Breadcrumb Header */}
      <Breadcrumb
        items={[{ label: 'Services' }]}
        title="Our Staffing Services"
        subtitle="Comprehensive workforce solutions engineered to fuel enterprise growth and organizational resilience."
        bannerImage="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80"
        badge="Strategic Workforce Solutions"
      />

      {/* =========================================================================
          SERVICES LIST (Matches Screen 6: 4 Full Service Cards)
          Permanent, Temporary, Contract, HR Consulting
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        <div className="space-y-8">
          {services.map((service, idx) => (
            <div 
              key={service.id}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-md p-6 sm:p-8 hover:shadow-xl hover:border-[#FF6B00]/40 transition-all flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8"
            >
              <div className="max-w-3xl space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-orange-50 text-[#FF6B00] flex items-center justify-center font-bold shrink-0">
                    <Briefcase className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-[#FF6B00] uppercase tracking-wider">Service Model 0{idx + 1}</span>
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900">{service.title}</h3>
                  </div>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {service.fullDesc}
                </p>

                {/* Key Service Highlights */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                  {(service.features || service.benefits || []).map((feat: string, fIdx: number) => (
                    <div key={fIdx} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Column */}
              <div className="w-full lg:w-60 shrink-0 bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-3 text-center">
                <div className="text-xs text-slate-500 font-medium">Standard SLA</div>
                <div className="text-sm font-bold text-slate-900">48h Initial Shortlist</div>
                <div className="text-[11px] text-emerald-600 font-semibold bg-emerald-50 py-1 rounded">
                  90-Day Placement Guarantee
                </div>

                <button
                  onClick={() => setEnquiryModalOpen(true)}
                  className="w-full py-2.5 bg-[#FF6B00] hover:bg-[#E05E00] text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow transition-colors"
                >
                  Request Consultation
                </button>

                <Link
                  to={`/services/${service.slug}`}
                  className="block text-xs font-semibold text-slate-600 hover:text-slate-900"
                >
                  View Detailed Specs →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          INDUSTRIES WE SERVE BREAKDOWN
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#FF6B00]">
            Domain Specialization
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 mt-1">
            Industries We Serve
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Certified recruitment specialists with firsthand experience in industry-specific compliance and technical proficiencies.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {industries.map((ind, idx) => {
            const Icon = ind.icon;
            return (
              <div 
                key={idx}
                className="bg-slate-50 rounded-2xl p-6 border border-slate-200/90 text-center hover:bg-orange-50/30 hover:border-[#FF6B00]/40 transition-all group"
              >
                <div className="w-14 h-14 rounded-2xl bg-white text-slate-700 group-hover:bg-[#FF6B00] group-hover:text-white mx-auto flex items-center justify-center shadow-sm transition-colors mb-3">
                  <Icon className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-base text-slate-900">{ind.name}</h4>
                <div className="text-xs font-semibold text-[#FF6B00] mt-1">{ind.jobs}</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-[#071A2D] text-white py-14 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl sm:text-3xl font-extrabold">Need a Custom Workforce Contract?</h3>
          <p className="text-sm text-slate-300 mt-2 max-w-xl mx-auto">
            Our corporate solutions team can customize hybrid staffing arrangements, managed services, or payroll outsourcing models.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/employer/enquiry"
              className="px-7 py-3 rounded-full bg-[#FF6B00] hover:bg-[#E05E00] text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow"
            >
              Submit Detailed Requisition
            </Link>
            <Link
              to="/contact"
              className="px-7 py-3 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs sm:text-sm uppercase tracking-wider border border-slate-700"
            >
              Contact Advisory Team
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};
