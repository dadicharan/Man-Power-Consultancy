import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  Users, 
  Briefcase, 
  Clock, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  HelpCircle,
  FileCheck
} from 'lucide-react';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { useApp } from '../context/AppContext';

export const EmployersPage: React.FC = () => {
  const { setEnquiryModalOpen } = useApp();

  const staffingModels = [
    {
      title: 'Permanent Staffing',
      subtitle: 'Build your core foundation',
      desc: 'End-to-end recruitment for critical full-time leadership, managerial, and operational roles with our 90-day replacement warranty.',
      features: ['Dedicated Account Head', 'Deep Competency Testing', 'Salary Negotiation Support', '90-Day Guarantee'],
      slug: 'permanent-staffing'
    },
    {
      title: 'Temporary Staffing',
      subtitle: 'Flexible headcount on demand',
      desc: 'Swiftly scale capacity for seasonal surges, production peaks, and sudden absences without permanent payroll liabilities.',
      features: ['Deployment in 48-72h', '100% Payroll Compliance', 'Attendance Management', 'Zero Severance Risk'],
      slug: 'temporary-staffing'
    },
    {
      title: 'Contract Staffing',
      subtitle: 'Niche domain experts on project basis',
      desc: 'Deploy senior software architects, DevOps engineers, project managers, and specialized certified technicians on milestone terms.',
      features: ['Pre-vetted Technical Experts', 'Flexible Project Durations', 'Managed Timesheets', 'IP Protection Clauses'],
      slug: 'contract-staffing'
    },
    {
      title: 'HR Consulting & Compliance',
      subtitle: 'Organizational excellence',
      desc: 'Comprehensive labor law audits, PF/ESIC statutory compliance, salary benchmarking, and customized HR policy architecture.',
      features: ['Statutory Compliance Audits', 'Payroll Outsourcing', 'Performance Frameworks', 'Exit Management'],
      slug: 'hr-consulting'
    }
  ];

  const hiringSteps = [
    {
      num: '1',
      title: 'Requirement Analysis',
      desc: 'We analyze your company culture, technical role parameters, required accreditations, and budget benchmarks.'
    },
    {
      num: '2',
      title: 'Sourcing & Screening',
      desc: 'Multi-channel sourcing through our proprietary database of 50,000+ candidates, coupled with rigorous background checks.'
    },
    {
      num: '3',
      title: 'Interview & Selection',
      desc: 'We present a curated shortlist of top 3-5 candidates and coordinate structured technical and culture interviews.'
    },
    {
      num: '4',
      title: 'Onboarding & Support',
      desc: 'Complete documentation, joining assistance, and post-placement check-ins to ensure rapid team productivity.'
    }
  ];

  return (
    <div className="bg-white text-slate-900 pb-20">
      
      {/* Breadcrumb Header */}
      <Breadcrumb
        items={[{ label: 'Employers' }]}
        title="Employers & Staffing Solutions"
        subtitle="Empowering leading enterprises with agile, qualified, and fully compliant talent pipelines."
        bannerImage="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1600&q=80"
        badge="Enterprise Hiring"
      />

      {/* =========================================================================
          HERO OVERVIEW BANNER (Matches Screen 5)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="bg-[#071A2D] text-white rounded-2xl p-8 sm:p-12 shadow-2xl border border-slate-800 flex flex-col lg:flex-row items-center justify-between gap-10">
          
          <div className="max-w-xl space-y-4">
            <span className="px-3 py-1 bg-orange-500/20 text-[#FF6B00] text-xs font-bold rounded-full uppercase tracking-wider">
              Talent Sourcing Partner
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Scale Your Workforce with <span className="text-[#FF6B00]">Precision</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              From high-volume blue-collar staffing to executive technical search, WorkForce delivers vetted, certified personnel with turnaround times under 14 days.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                to="/employer/enquiry"
                className="px-6 py-3 rounded-full bg-[#FF6B00] hover:bg-[#E05E00] text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-lg transition-all"
              >
                Post a Job / Enquiry
              </Link>
              <button
                onClick={() => setEnquiryModalOpen(true)}
                className="px-6 py-3 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs sm:text-sm uppercase tracking-wider border border-slate-700 transition-all"
              >
                Request Consultation
              </button>
            </div>
          </div>

          <div className="relative w-full max-w-sm shrink-0">
            <div className="rounded-2xl overflow-hidden border-4 border-white/10 shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80" 
                alt="Corporate enterprise meeting"
                className="w-full h-80 object-cover"
              />
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          STAFFING SOLUTIONS (Matches Screen 5: 4 Cards)
          Permanent, Temporary, Contract, HR Consulting
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-[#FF6B00]">
            Comprehensive Models
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-1">
            Our Staffing Solutions
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Flexible, compliant workforce models built to absorb fluctuating operational demands.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {staffingModels.map((model, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-lg hover:border-[#FF6B00] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-orange-50 text-[#FF6B00] flex items-center justify-center font-bold mb-4">
                  <Building2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">{model.title}</h3>
                <div className="text-xs font-semibold text-[#FF6B00] mt-0.5">{model.subtitle}</div>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">{model.desc}</p>
                
                <div className="mt-4 pt-4 border-t border-slate-100 space-y-2">
                  {model.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-2 text-[11px] text-slate-700 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-5 mt-5 border-t border-slate-100">
                <Link
                  to={`/services/${model.slug}`}
                  className="block w-full py-2 text-center rounded-lg border border-slate-300 text-slate-700 font-bold text-xs hover:bg-[#071A2D] hover:text-white hover:border-[#071A2D] transition-colors"
                >
                  Learn More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          HIRING PROCESS (Matches Screen 5: 4 Horizontal Steps)
          Step 1 -> Step 2 -> Step 3 -> Step 4
          ========================================================================= */}
      <section className="bg-slate-50 py-20 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-[#FF6B00]">
              Strategic Delivery
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-1">
              Our 4-Step Hiring Process
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Designed to eliminate bad hires and shorten vacancy cycles dramatically.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {hiringSteps.map((step, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm relative"
              >
                <div className="w-10 h-10 rounded-full bg-[#071A2D] text-white flex items-center justify-center font-bold text-sm mb-4">
                  {step.num}
                </div>
                <h4 className="font-bold text-base text-slate-900 mb-2">
                  {step.title}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          LOOKING TO HIRE? CTA CARD (Matches Screen 5 Bottom Section)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-[#071A2D] text-white rounded-2xl p-8 sm:p-12 text-center max-w-3xl mx-auto border border-slate-800 shadow-xl">
          <span className="text-xs font-bold text-[#FF6B00] uppercase tracking-wider">Fast Turnaround</span>
          <h3 className="text-2xl sm:text-3xl font-extrabold mt-1">Looking to Hire?</h3>
          <p className="text-sm text-slate-300 mt-2 max-w-lg mx-auto">
            Post your job requirements with us today and let our certified recruiters deliver pre-screened candidate profiles in under 48 hours.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/employer/enquiry"
              id="employer-post-job-cta"
              className="px-8 py-3 rounded-full bg-[#FF6B00] hover:bg-[#E05E00] text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-lg transition-all"
            >
              Post a Job
            </Link>
            <button
              onClick={() => setEnquiryModalOpen(true)}
              className="px-8 py-3 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs sm:text-sm uppercase tracking-wider border border-slate-700 transition-all"
            >
              Request Consultation
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
