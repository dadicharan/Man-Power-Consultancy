import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Eye, 
  Target, 
  Users, 
  Award, 
  Clock, 
  Building2, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Sparkles
} from 'lucide-react';
import { Breadcrumb } from '../components/common/Breadcrumb';

export const AboutPage: React.FC = () => {
  const stats = [
    { value: '10+', label: 'Years of Experience', icon: Clock },
    { value: '500+', label: 'Happy Clients', icon: Building2 },
    { value: '5,000+', label: 'Candidates Placed', icon: Users },
    { value: '98%', label: 'Success Rate', icon: Award }
  ];

  const processSteps = [
    {
      step: '01',
      title: 'Talent Requirement Discovery',
      desc: 'Deep consultation with client stakeholders to calibrate technical skills, team dynamics, and compensation parameters.'
    },
    {
      step: '02',
      title: 'Precision Sourcing & Screening',
      desc: 'Leveraging active database sourcing, headhunting networks, and automated competency tests to identify top contenders.'
    },
    {
      step: '03',
      title: 'Comprehensive Verification',
      desc: 'Document scrutiny, educational credential checks, criminal verification, and past-employment audit calls.'
    },
    {
      step: '04',
      title: 'Interview & Offer Alignment',
      desc: 'Coordinating structured interview rounds, feedback loops, salary negotiations, and contract sign-offs.'
    },
    {
      step: '05',
      title: 'Onboarding & 90-Day Guarantee',
      desc: 'Active follow-up during joining weeks, ensuring smooth integration with an unconditional 90-day replacement warranty.'
    }
  ];

  const leadership = [
    {
      name: 'Ananya Rao',
      role: 'Managing Director & Founder',
      bio: 'Over 15 years in strategic manpower recruitment and workforce planning across India and the GCC region.',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
    },
    {
      name: 'Rajesh Varma',
      role: 'Head of Executive Search',
      bio: 'Former Fortune 500 talent director specializing in leadership recruitment and technical enterprise hiring.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'
    },
    {
      name: 'Dr. Sunita Rao',
      role: 'VP of Healthcare & Compliance',
      bio: 'Expert in hospital staffing accreditations, NABH compliance, and clinical human capital deployment.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80'
    }
  ];

  return (
    <div className="bg-white text-slate-900">
      
      {/* Breadcrumb Header */}
      <Breadcrumb
        items={[{ label: 'About Us' }]}
        title="About Us"
        subtitle="Empowering businesses with top-tier workforce solutions and guiding professionals toward rewarding careers."
        bannerImage="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80"
        badge="Who We Are"
      />

      {/* =========================================================================
          SECTION: WHO WE ARE (Matches Screen 2 in Refenecs.png)
          ========================================================================= */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-block px-3 py-1 rounded-full bg-orange-50 text-[#FF6B00] text-xs font-bold uppercase tracking-wider">
              WorkForce Manpower Consultancy
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Who We Are
            </h2>
            
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
              WorkForce Manpower Consultancy is a leading recruitment and staffing solutions provider, dedicated to connecting top talent with the right opportunities. We specialize in providing skilled, reliable and professional manpower solutions for businesses across various industries.
            </p>

            <p className="text-sm text-slate-600 leading-relaxed">
              Founded with the objective of removing frictions in human capital acquisition, we combine deep industry knowledge with modern screening technologies. Whether scaling an engineering manufacturing line, building a core software engineering team, or staffing healthcare facilities, our recruitment consultants deliver candidates with speed and verified competency.
            </p>

            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700 font-semibold">
              <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg border border-slate-200">
                <CheckCircle2 className="w-4 h-4 text-[#FF6B00] shrink-0" />
                <span>Pan-India Recruitment Network</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg border border-slate-200">
                <CheckCircle2 className="w-4 h-4 text-[#FF6B00] shrink-0" />
                <span>100% Statutory Compliance</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg border border-slate-200">
                <CheckCircle2 className="w-4 h-4 text-[#FF6B00] shrink-0" />
                <span>Custom Executive Sourcing</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg border border-slate-200">
                <CheckCircle2 className="w-4 h-4 text-[#FF6B00] shrink-0" />
                <span>90-Day Placement Guarantee</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" 
                alt="WorkForce recruitment team collaborating" 
                className="w-full h-80 sm:h-96 object-cover"
              />
            </div>
            {/* Small floating badge */}
            <div className="absolute -bottom-6 -left-6 bg-[#071A2D] text-white p-4 rounded-xl shadow-xl border border-slate-800 hidden sm:block">
              <div className="text-2xl font-black text-[#FF6B00]">10+ Years</div>
              <div className="text-xs text-slate-300">Of Staffing Excellence</div>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION: STATISTICS ROW (Matches Screen 2)
          ========================================================================= */}
      <section className="py-10 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={idx} className="text-center p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
                  <div className="w-10 h-10 mx-auto rounded-lg bg-orange-50 text-[#FF6B00] flex items-center justify-center mb-2">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="text-3xl font-extrabold text-slate-900 tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-xs font-bold text-slate-600 mt-1">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION: VISION & MISSION CARDS (Matches Screen 2)
          ========================================================================= */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Vision */}
          <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-md hover:border-[#FF6B00]/50 transition-all flex items-start gap-5">
            <div className="w-14 h-14 rounded-2xl bg-orange-50 text-[#FF6B00] flex items-center justify-center shrink-0 shadow-inner">
              <Eye className="w-7 h-7" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#FF6B00]">Strategic Direction</span>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">Our Vision</h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                "To be the most trusted manpower consultancy, creating value for both employers and job seekers across domestic and international markets."
              </p>
            </div>
          </div>

          {/* Mission */}
          <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-md hover:border-[#FF6B00]/50 transition-all flex items-start gap-5">
            <div className="w-14 h-14 rounded-2xl bg-orange-50 text-[#FF6B00] flex items-center justify-center shrink-0 shadow-inner">
              <Target className="w-7 h-7" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#FF6B00]">Core Purpose</span>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">Our Mission</h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                "To build a better workforce for a stronger tomorrow by bridging skill requirements with human potential through ethical, transparent recruitment."
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION: PEOPLE • PROCESS • PROGRESS BANNER (Matches Screen 2 bottom banner)
          ========================================================================= */}
      <section className="bg-[#071A2D] text-white py-14 text-center border-y border-slate-800">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-2xl sm:text-3xl font-extrabold tracking-widest text-white uppercase flex items-center justify-center gap-3">
            <span>People</span>
            <span className="text-[#FF6B00]">•</span>
            <span className="text-[#FF6B00]">Process</span>
            <span className="text-[#FF6B00]">•</span>
            <span>Progress</span>
          </div>
          <p className="mt-3 text-base sm:text-lg text-slate-300 font-light">
            "We believe in people, follow the right process, and create progress for everyone."
          </p>
        </div>
      </section>

      {/* =========================================================================
          SECTION: RECRUITMENT PROCESS (5 steps)
          ========================================================================= */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-[#FF6B00]">
            Systematic Methodology
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2 tracking-tight">
            Our Recruitment Process
          </h2>
          <p className="mt-3 text-sm text-slate-600">
            A battle-tested 5-stage framework delivering consistency, compliance, and top match rates.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {processSteps.map((step, idx) => (
            <div 
              key={idx}
              className="bg-slate-50 rounded-xl p-5 border border-slate-200 relative group hover:bg-white hover:shadow-md transition-all"
            >
              <div className="text-2xl font-black text-slate-300 group-hover:text-[#FF6B00] transition-colors mb-2">
                {step.step}
              </div>
              <h4 className="font-bold text-sm text-slate-900 mb-2 leading-snug">
                {step.title}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#FF6B00]">
              Leadership
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-2">
              Our Advisory Team
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {leadership.map((leader, idx) => (
              <div key={idx} className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm text-center p-6">
                <img 
                  src={leader.image} 
                  alt={leader.name} 
                  className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-orange-50 shadow"
                />
                <h3 className="text-lg font-bold text-slate-900 mt-4">{leader.name}</h3>
                <div className="text-xs font-semibold text-[#FF6B00]">{leader.role}</div>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">{leader.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};
