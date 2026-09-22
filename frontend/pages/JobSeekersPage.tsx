import React from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle2, 
  ArrowRight, 
  Cpu, 
  Wrench, 
  HeartPulse, 
  TrendingUp, 
  Briefcase, 
  UserPlus, 
  LogIn, 
  Sparkles,
  ShieldCheck,
  Award
} from 'lucide-react';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { FakeJobsWarningBanner } from '../components/common/FakeJobsWarningBanner';

export const JobSeekersPage: React.FC = () => {
  const categories = [
    { name: 'IT & Software', icon: Cpu, desc: 'Frontend, Cloud, AI' },
    { name: 'Engineering', icon: Wrench, desc: 'Design, Plant & Civil' },
    { name: 'Healthcare', icon: HeartPulse, desc: 'Clinical & Hospital' },
    { name: 'Sales & Marketing', icon: TrendingUp, desc: 'B2B & Digital' },
    { name: 'Others', icon: Briefcase, desc: 'Finance, HR, Logistics' }
  ];

  return (
    <div className="bg-white text-slate-900 pb-20">
      
      {/* Breadcrumb Header */}
      <Breadcrumb
        items={[{ label: 'Job Seekers' }]}
        title="Job Seekers"
        subtitle="Connect with leading employers, explore verified openings, and accelerate your career with personalized recruitment support."
        bannerImage="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=1600&q=80"
        badge="Career Elevation"
      />

      {/* =========================================================================
          HERO BANNER & HIGHLIGHT (Matches Screen 4: "Your Dream Job Awaits")
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="bg-[#071A2D] text-white rounded-2xl p-8 sm:p-12 shadow-2xl border border-slate-800 relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-10">
          
          <div className="max-w-xl space-y-4">
            <div className="inline-block px-3 py-1 bg-orange-500/20 border border-orange-500/40 text-[#FF6B00] text-xs font-bold rounded-full uppercase tracking-wider">
              100% Free Candidate Placement
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Your Dream Job <span className="text-[#FF6B00]">Awaits</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Join over 5,000+ placed professionals who accelerated their career path through WorkForce Manpower Consultancy. Get matched with top-tier corporate employers in days.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                to="/candidates/register"
                className="px-6 py-3 rounded-full bg-[#FF6B00] hover:bg-[#E05E00] text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-lg transition-all"
              >
                Register Profile Now
              </Link>
              <Link
                to="/jobs"
                className="px-6 py-3 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs sm:text-sm uppercase tracking-wider border border-slate-700 transition-all"
              >
                Explore All Jobs
              </Link>
            </div>
          </div>

          <div className="relative w-full max-w-sm shrink-0">
            <div className="rounded-2xl overflow-hidden border-4 border-white/10 shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80" 
                alt="Confident professional candidate"
                className="w-full h-80 object-cover"
              />
            </div>
          </div>

        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { value: '5,000+', label: 'Candidates placed', tone: 'bg-[#FFF5EE]' },
            { value: '14 days', label: 'Average hiring cycle', tone: 'bg-[#F3F8FF]' },
            { value: '500+', label: 'Corporate partners', tone: 'bg-[#F5FFF7]' }
          ].map((item) => (
            <div key={item.label} className={`rounded-2xl border border-slate-200 p-4 ${item.tone}`}>
              <div className="text-2xl font-extrabold text-slate-900">{item.value}</div>
              <div className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-600 mt-1">{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          CANDIDATE TRUST & SAFETY ADVISORY: BEWARE OF FAKE JOBS
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <FakeJobsWarningBanner />
      </section>

      {/* =========================================================================
          DUAL CARDS (Matches Screen 4: "Why Choose Us?" and "Submit Your Profile")
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card 1: Why Choose Us? */}
          <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-md flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#FF6B00]">Candidate Perks</span>
              <h3 className="text-2xl font-bold text-slate-900 mt-1 mb-6">Why Choose Us?</h3>
              
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">Wide Range of Job Opportunities</h4>
                    <p className="text-xs text-slate-600 mt-0.5">Access exclusive technical, managerial, and operational roles across leading Indian sectors.</p>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">Career Guidance & Support</h4>
                    <p className="text-xs text-slate-600 mt-0.5">Resume optimization feedback, technical interview preparation tips, and compensation insights.</p>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">100% Free Registration</h4>
                    <p className="text-xs text-slate-600 mt-0.5">We never charge candidates any registration fees or cut commissions from your earned salary.</p>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">Trusted by Top Companies</h4>
                    <p className="text-xs text-slate-600 mt-0.5">Direct hiring lines to 500+ Fortune 500 multinationals and high-growth enterprise clients.</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
              <ShieldCheck className="w-4 h-4 text-[#FF6B00]" /> Verified placements with compliant labor contracts.
            </div>
          </div>

          {/* Card 2: Submit Your Profile */}
          <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200 shadow-md flex flex-col justify-between text-center md:text-left">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#FF6B00]">Direct Application</span>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">Submit Your Profile</h3>
              <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                Register with us once and let elite employers discover your credentials for active and confidential upcoming vacancies.
              </p>

              <div className="my-8 p-6 bg-white rounded-xl border border-slate-200/80 shadow-sm text-center">
                <div className="w-14 h-14 bg-orange-50 text-[#FF6B00] rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <UserPlus className="w-7 h-7" />
                </div>
                <div className="font-bold text-slate-900 text-base">Quick Candidate Registration</div>
                <p className="text-xs text-slate-500 mt-1">Takes less than 2 minutes to upload your CV and skills profile.</p>
                <Link
                  to="/candidates/register"
                  id="job-seeker-register-btn"
                  className="mt-5 inline-block w-full py-3 rounded-lg bg-[#FF6B00] hover:bg-[#E05E00] text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow transition-all active:scale-95"
                >
                  Register Now
                </Link>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 text-center text-xs text-slate-600">
              Already registered?{' '}
              <Link to="/candidate/portal" className="text-[#FF6B00] font-bold hover:underline">
                Login to Candidate Portal
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          POPULAR JOB CATEGORIES (Matches Screen 4)
          Grid of circular/rounded icon cards
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-[#FF6B00]">
            Explore by Sector
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 mt-1">
            Popular Job Categories
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 text-center">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <Link
                key={idx}
                to={`/jobs?category=${encodeURIComponent(cat.name)}`}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md hover:border-[#FF6B00] transition-all group flex flex-col items-center"
              >
                <div className="w-16 h-16 rounded-full bg-slate-100 group-hover:bg-[#FF6B00] text-slate-700 group-hover:text-white flex items-center justify-center transition-colors shadow-inner mb-4">
                  <Icon className="w-7 h-7" />
                </div>
                <h4 className="font-bold text-sm text-slate-900 group-hover:text-[#FF6B00] transition-colors">
                  {cat.name}
                </h4>
                <p className="text-[11px] text-slate-500 mt-1">
                  {cat.desc}
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          DARK NAVY BOTTOM CTA BANNER (Matches Screen 4)
          "Ready to take the next step in your career? Join thousands of job seekers..."
          ========================================================================= */}
      <section className="mt-16 bg-[#071A2D] text-white py-14 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Ready to take the next step in your career?
            </h3>
            <p className="text-slate-300 text-sm mt-1">
              Join thousands of job seekers who found their dream jobs through us.
            </p>
          </div>
          <Link
            to="/candidates/register"
            className="px-8 py-3 rounded-full bg-[#FF6B00] hover:bg-[#E05E00] text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-lg shrink-0 transition-all"
          >
            Register Now
          </Link>
        </div>
      </section>

    </div>
  );
};
