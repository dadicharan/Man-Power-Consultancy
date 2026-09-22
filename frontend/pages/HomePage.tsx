import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Briefcase, 
  Users, 
  UserCheck, 
  FileText, 
  Clock, 
  Award, 
  CheckCircle2, 
  ArrowRight, 
  TrendingUp, 
  Building2, 
  Cpu, 
  Wrench, 
  HeartPulse, 
  ShieldCheck, 
  Search, 
  Play, 
  Pause,
  ChevronRight,
  Star
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { JobCard } from '../components/jobs/JobCard';

export const HomePage: React.FC = () => {
  const { jobs, services, testimonials, setEnquiryModalOpen } = useApp();
  const [videoPlaying, setVideoPlaying] = useState(false);

  // Take top 6 featured or published jobs
  const featuredJobs = jobs.filter(j => j.status === 'Published').slice(0, 6);

  const stats = [
    { target: 10, suffix: '+', label: 'Years of Experience', icon: Clock, desc: 'Proven recruitment heritage' },
    { target: 500, suffix: '+', label: 'Happy Clients', icon: Building2, desc: 'Enterprises & startups' },
    { target: 5000, suffix: '+', label: 'Candidates Placed', icon: Users, desc: 'Across top global sectors' },
    { target: 98, suffix: '%', label: 'Success Rate', icon: Award, desc: 'Client satisfaction score' }
  ];
  const statsSectionRef = useRef<HTMLElement>(null);
  const hasAnimatedStats = useRef(false);
  const [animatedStats, setAnimatedStats] = useState(() => stats.map(() => 0));

  useEffect(() => {
    const statsSection = statsSectionRef.current;
    if (!statsSection) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || hasAnimatedStats.current) return;
      hasAnimatedStats.current = true;
      const startTime = performance.now();
      const duration = 650;

      const animateStats = (currentTime: number) => {
        const progress = Math.min((currentTime - startTime) / duration, 1);
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        setAnimatedStats(stats.map((stat) => Math.round(stat.target * easedProgress)));
        if (progress < 1) requestAnimationFrame(animateStats);
      };

      requestAnimationFrame(animateStats);
      observer.disconnect();
    }, { threshold: 0.25 });

    observer.observe(statsSection);
    return () => observer.disconnect();
  }, []);

  const whyChooseUs = [
    {
      title: 'Quality Talent',
      desc: 'Rigorous multi-stage vetting, background verification, and competency testing ensure only elite candidates arrive at your door.',
      icon: Award
    },
    {
      title: 'Fast Hiring',
      desc: 'Our pre-screened talent pipeline slashes average time-to-hire from 45 days to under 14 days without sacrificing quality.',
      icon: TrendingUp
    },
    {
      title: 'Cost Effective',
      desc: 'Maximized return on hiring spend with transparent pricing, zero hidden fees, and our 90-day replacement warranty.',
      icon: ShieldCheck
    },
    {
      title: 'Dedicated Support',
      desc: 'Personal account managers and specialized industry recruiters guide candidates and hiring executives every step.',
      icon: UserCheck
    }
  ];

  const industries = [
    { name: 'IT & Software', icon: Cpu, jobs: '18 Openings', desc: 'Full Stack, Cloud, DevOps & AI' },
    { name: 'Engineering', icon: Wrench, jobs: '15 Openings', desc: 'Mechanical, Civil, Electrical' },
    { name: 'Healthcare', icon: HeartPulse, jobs: '4 Openings', desc: 'Doctors, Nurses, Administrators' },
    { name: 'Manufacturing', icon: Building2, jobs: '12 Openings', desc: 'Plant Ops, QA & Logistics' },
    { name: 'Banking & Finance', icon: TrendingUp, jobs: '6 Openings', desc: 'Chartered Accounts, FP&A' },
    { name: 'Sales & Marketing', icon: Users, jobs: '7 Openings', desc: 'B2B Enterprise, Digital Growth' },
    { name: 'BPO & Support', icon: UserCheck, jobs: '10 Openings', desc: 'Customer Success & Omnichannel' },
    { name: 'Logistics', icon: Briefcase, jobs: '8 Openings', desc: 'Supply Chain & Fleet Dispatch' }
  ];

  return (
    <div className="bg-white text-slate-900 overflow-hidden">
      
      {/* =========================================================================
          1. HERO SECTION (Desktop: Left-Aligned | Mobile & Tablet: Centered)
          ========================================================================= */}
      <section className="relative bg-white text-black min-h-[540px] lg:min-h-[640px] flex items-center overflow-hidden border-b border-slate-200/80">
        
        {/* Background Visual: Only the manpower workforce image directly in the background */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/55 to-slate-900/20" />
          <img 
            src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=2070&q=85" 
            alt="Workforce and Manpower Staffing Team"
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Content Container (Center-aligned on mobile and tablet; left-aligned on desktop lg+) */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 w-full flex flex-col items-center lg:items-start">
          <div className="max-w-2xl text-center lg:text-left flex flex-col items-center lg:items-start">
            
            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15] sm:leading-[1.1] text-center lg:text-left">
              Build Your <span className="text-[#FF6B00]">Team</span>.<br />
              Build Your <span className="text-[#FF6B00]">Success</span>.
            </h1>

            {/* Subtitle */}
            <p className="mt-5 text-base sm:text-lg text-white leading-relaxed max-w-xl font-medium text-center lg:text-left mx-auto lg:mx-0">
              We provide skilled, reliable and professional workforce solutions for businesses of all sizes. Fast-track your hiring or discover your next career milestone.
            </p>

            {/* CTA Buttons (Centered on mobile/tablet, Left on desktop) */}
            <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 w-full">
              <button
                onClick={() => setEnquiryModalOpen(true)}
                id="hero-hire-talent-btn"
                className="px-7 py-3.5 rounded-full font-bold text-sm bg-[#FF6B00] hover:bg-[#E05E00] active:scale-95 text-white shadow-md shadow-orange-500/20 transition-all flex items-center justify-center gap-2"
              >
                Hire Talent <ArrowRight className="w-4 h-4" />
              </button>

              <Link
                to="/jobs"
                id="hero-find-job-btn"
                className="px-7 py-3.5 rounded-full font-bold text-sm bg-white hover:bg-slate-100 border-2 border-black hover:border-slate-800 text-black transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <Search className="w-4 h-4 text-black" /> Find a Job
              </Link>
            </div>

            {/* Quick trust metrics (Centered on mobile/tablet, Left on desktop) */}
            <div className="mt-10 pt-6 border-t border-white/40 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs text-white font-semibold w-full">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#FF6B00] shrink-0" />
                <span className="text-white">Verified Pre-screened Talent</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#FF6B00] shrink-0" />
                <span className="text-white">90-Day Placement Guarantee</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          2. TRUST / STATISTICS ROW (Matches Screen 1 4-card statistics row)
          ========================================================================= */}
      <section ref={statsSectionRef} className="relative -mt-8 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div 
                key={idx}
                className="bg-white rounded-xl p-5 sm:p-6 shadow-lg shadow-slate-200/50 border border-slate-200/80 hover:border-[#FF6B00]/40 transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-orange-50 text-[#FF6B00] flex items-center justify-center mb-3 group-hover:bg-[#FF6B00] group-hover:text-white transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  {animatedStats[idx].toLocaleString()}{stat.suffix}
                </div>
                <div className="text-xs sm:text-sm font-bold text-slate-700 mt-1">
                  {stat.label}
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  {stat.desc}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          3. POPULAR SERVICES (Matches Screen 1)
          ========================================================================= */}
      <section className="py-20 bg-slate-50/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-[#FF6B00]">
              Our Core Offerings
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2 tracking-tight">
              Popular Staffing Services
            </h2>
            <p className="mt-3 text-sm text-slate-600">
              Tailored workforce models engineered to deliver qualified personnel on your exact organizational timelines.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.slice(0, 4).map((serv) => (
              <div 
                key={serv.id}
                className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-orange-50 text-[#FF6B00] flex items-center justify-center font-bold mb-4">
                    <Briefcase className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {serv.title}
                  </h3>
                  <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                    {serv.shortDesc}
                  </p>
                </div>

                <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between">
                  <Link 
                    to={`/services/${serv.slug}`} 
                    className="text-xs font-bold text-[#FF6B00] hover:text-[#D95500] flex items-center gap-1"
                  >
                    View Details <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                  <button
                    onClick={() => setEnquiryModalOpen(true)}
                    className="text-[11px] font-semibold text-slate-500 hover:text-slate-900"
                  >
                    Enquire
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          4. DARK NAVY CTA BAR (Matches Screen 1 middle CTA)
          "Find the Right Talent or Your Next Opportunity"
          ========================================================================= */}
      <section className="bg-[#071A2D] text-white py-12 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Find the Right Talent or Your Next Opportunity
              </h3>
              <p className="text-sm text-slate-300 mt-1">
                Serving over 500+ corporate partners and 5,000+ placed professionals across India and abroad.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
              <Link
                to="/employers"
                className="px-6 py-2.5 rounded-lg bg-[#FF6B00] hover:bg-[#E05E00] text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all"
              >
                For Employers
              </Link>
              <Link
                to="/candidates"
                className="px-6 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-bold text-xs uppercase tracking-wider transition-all"
              >
                For Job Seekers
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. FEATURED JOBS (Matches Screen 1 & Screen 3)
          ========================================================================= */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#FF6B00]">
                Verified Vacancies
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 mt-1 tracking-tight">
                Latest Verified Job Openings
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Explore active requirements vetted by our manpower consultants.
              </p>
            </div>
            <Link
              to="/jobs"
              className="px-5 py-2 rounded-lg border-2 border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white font-bold text-xs transition-colors flex items-center gap-1"
            >
              View All Jobs <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredJobs.map(job => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          6. WHY CHOOSE US (Matches Screen 1)
          ========================================================================= */}
      <section className="py-20 bg-slate-50 border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-[#FF6B00]">
              The WorkForce Advantage
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2 tracking-tight">
              Why Partner With Us?
            </h2>
            <p className="mt-3 text-sm text-slate-600">
              We bridge talent gaps with institutional precision, verified candidates, and guaranteed compliance.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div 
                  key={idx}
                  className="bg-white rounded-xl p-6 border border-slate-200/80 shadow-sm"
                >
                  <div className="w-12 h-12 rounded-xl bg-orange-50 text-[#FF6B00] flex items-center justify-center font-bold mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* =========================================================================
          7. INDUSTRIES WE SERVE (Matches Screen 1 & Screen 6)
          ========================================================================= */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-[#FF6B00]">
              Sector Expertise
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2 tracking-tight">
              Industries We Serve
            </h2>
            <p className="mt-3 text-sm text-slate-600">
              Specialized domain recruitment teams with deep insights into industry-specific skills and accreditations.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {industries.map((ind, idx) => {
              const Icon = ind.icon;
              return (
                <Link
                  key={idx}
                  to={`/jobs?category=${encodeURIComponent(ind.name)}`}
                  className="bg-slate-50 hover:bg-orange-50/50 rounded-xl p-5 border border-slate-200/80 hover:border-[#FF6B00]/40 transition-all text-center group"
                >
                  <div className="w-12 h-12 rounded-full bg-white text-slate-700 group-hover:bg-[#FF6B00] group-hover:text-white mx-auto flex items-center justify-center shadow-sm transition-colors mb-3">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 group-hover:text-[#FF6B00] transition-colors">
                    {ind.name}
                  </h4>
                  <div className="text-[11px] text-slate-500 mt-1">
                    {ind.desc}
                  </div>
                  <div className="text-[10px] font-bold text-[#FF6B00] mt-2">
                    {ind.jobs}
                  </div>
                </Link>
              );
            })}
          </div>

        </div>
      </section>

      {/* =========================================================================
          8. CANDIDATE CTA & EMPLOYER CTA DUAL BANNERS
          ========================================================================= */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Candidate Card */}
            <div className="bg-[#071A2D] rounded-2xl p-8 border border-slate-800 relative overflow-hidden flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-[#FF6B00] uppercase tracking-wider">Job Seekers</span>
                <h3 className="text-2xl sm:text-3xl font-bold mt-1 text-white">
                  Ready for Your Next Career Move?
                </h3>
                <p className="text-sm text-slate-300 mt-3 leading-relaxed">
                  Submit your resume today and access unadvertised executive and technical vacancies with premium employers across India.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3 mt-8">
                <Link
                  to="/jobs"
                  className="px-5 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase"
                >
                  Search Jobs
                </Link>
                <Link
                  to="/candidates/register"
                  className="px-5 py-2.5 rounded-lg bg-[#FF6B00] hover:bg-[#E05E00] text-white font-bold text-xs uppercase shadow"
                >
                  Submit Resume
                </Link>
              </div>
            </div>

            {/* Employer Card */}
            <div className="bg-[#071A2D] rounded-2xl p-8 border border-slate-800 relative overflow-hidden flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-[#FF6B00] uppercase tracking-wider">Employers</span>
                <h3 className="text-2xl sm:text-3xl font-bold mt-1 text-white">
                  Looking for the Right Talent?
                </h3>
                <p className="text-sm text-slate-300 mt-3 leading-relaxed">
                  Tell us your staffing specifications. Our specialized consultants source, screen, and deploy certified candidates in days.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3 mt-8">
                <Link
                  to="/employer/enquiry"
                  className="px-5 py-2.5 rounded-lg bg-[#FF6B00] hover:bg-[#E05E00] text-white font-bold text-xs uppercase shadow"
                >
                  Post a Job / Enquiry
                </Link>
                <Link
                  to="/employers"
                  className="px-5 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase"
                >
                  Staffing Models
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          9. TESTIMONIALS (Matches Screen 1)
          ========================================================================= */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-[#FF6B00]">
              Client Feedback
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2 tracking-tight">
              Trusted by Industry Leaders
            </h2>
            <p className="mt-3 text-sm text-slate-600">
              Read how our manpower and recruitment solutions transformed staffing for our corporate partners.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.slice(0, 3).map((test) => (
              <div 
                key={test.id}
                className="bg-slate-50 rounded-xl p-6 border border-slate-200/90 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-400 mb-3">
                    {[...Array(test.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed">
                    "{test.message}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-5 mt-5 border-t border-slate-200">
                  <img 
                    src={test.avatarUrl} 
                    alt={test.name} 
                    className="w-10 h-10 rounded-full object-cover border border-slate-300"
                  />
                  <div>
                    <div className="font-bold text-xs text-slate-900">
                      {test.name}
                    </div>
                    <div className="text-[11px] text-slate-500 font-medium">
                      {test.designation}, {test.company}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
};
