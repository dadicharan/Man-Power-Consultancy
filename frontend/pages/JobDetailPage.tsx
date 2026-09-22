import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Building, 
  MapPin, 
  Briefcase, 
  Clock, 
  Calendar, 
  Share2, 
  Bookmark, 
  BookmarkCheck, 
  CheckCircle2, 
  ArrowLeft,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Breadcrumb } from '../components/common/Breadcrumb';

export const JobDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { jobs, setApplyJobModal, toggleSaveJob, isJobSaved, showToast } = useApp();

  const job = jobs.find(j => j.slug === slug || j.id === slug);

  if (!job) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 text-center">
        <div className="bg-white p-8 rounded-2xl border border-slate-200 max-w-md w-full shadow-lg">
          <h2 className="text-2xl font-bold text-slate-900">Job Not Found</h2>
          <p className="text-sm text-slate-500 mt-2">The job opening you are looking for may have expired or been filled.</p>
          <Link to="/jobs" className="mt-6 inline-block px-5 py-2.5 bg-[#FF6B00] text-white font-bold text-xs rounded-lg shadow">
            Browse All Active Jobs
          </Link>
        </div>
      </div>
    );
  }

  const saved = isJobSaved(job.id);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Job link copied to clipboard!', 'success');
    }
  };

  const relatedJobs = jobs.filter(j => j.id !== job.id && j.category === job.category).slice(0, 3);

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: 'Jobs', path: '/jobs' },
          { label: job.title }
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        
        {/* Main Job Hero Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-black text-2xl shadow shrink-0">
                {job.company.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-orange-100 text-[#FF6B00] text-xs font-bold uppercase">
                    {job.category}
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                  {job.title}
                </h1>
                <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-xs sm:text-sm text-slate-600 mt-2 font-medium">
                  <span className="flex items-center gap-1 font-semibold text-slate-900">
                    <Building className="w-4 h-4 text-slate-400" />
                    {job.company}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    {job.location}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Briefcase className="w-4 h-4 text-slate-400" />
                    {job.employmentType} ({job.workMode})
                  </span>
                </div>
              </div>
            </div>

            {/* Apply & Action Buttons */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => toggleSaveJob(job.id)}
                className={`p-3 rounded-xl border transition-colors ${
                  saved ? 'bg-orange-50 border-orange-200 text-[#FF6B00]' : 'border-slate-200 text-slate-500 hover:bg-slate-50'
                }`}
                aria-label="Bookmark job"
              >
                {saved ? <BookmarkCheck className="w-5 h-5 fill-current" /> : <Bookmark className="w-5 h-5" />}
              </button>

              <button
                onClick={handleShare}
                className="p-3 rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50 transition-colors"
                aria-label="Share job"
              >
                <Share2 className="w-5 h-5" />
              </button>

              <button
                onClick={() => setApplyJobModal(job)}
                id="job-detail-apply-btn"
                className="px-8 py-3.5 rounded-xl bg-[#FF6B00] hover:bg-[#E05E00] text-white font-bold text-sm shadow-lg shadow-orange-950/20 active:scale-95 transition-all"
              >
                Apply Now
              </button>
            </div>

          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-100 text-xs">
            <div>
              <span className="text-slate-400 block font-medium">Offered Salary</span>
              <span className="text-slate-900 font-bold text-sm sm:text-base mt-0.5 block">
                {job.salary ? job.salary.replace(/â‚¹/g, 'INR ').replace(/₹/g, 'INR ').trim() : 'Competitive'}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">Experience Level</span>
              <span className="text-slate-900 font-bold text-sm sm:text-base mt-0.5 block">{job.experienceDisplay}</span>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">Open Vacancies</span>
              <span className="text-slate-900 font-bold text-sm sm:text-base mt-0.5 block">{job.vacancies} Positions</span>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">Application Deadline</span>
              <span className="text-slate-900 font-bold text-sm sm:text-base mt-0.5 block">{job.deadline}</span>
            </div>
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
          
          {/* Main Content Body */}
          <div className="lg:col-span-8 space-y-8 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm text-slate-800 text-sm leading-relaxed">
            
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-3 border-b border-slate-100 pb-2">
                Job Overview
              </h3>
              <p className="text-slate-700 leading-relaxed">
                {job.description}
              </p>
            </div>

            {job.responsibilities && job.responsibilities.length > 0 && (
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-3 border-b border-slate-100 pb-2">
                  Key Responsibilities
                </h3>
                <ul className="space-y-2.5">
                  {job.responsibilities.map((resp, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#FF6B00] shrink-0 mt-1" />
                      <span className="text-slate-700">{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {job.requirements && job.requirements.length > 0 && (
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-3 border-b border-slate-100 pb-2">
                  Requirements & Qualifications
                </h3>
                <ul className="space-y-2.5">
                  {job.requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-1" />
                      <span className="text-slate-700">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {job.skills && job.skills.length > 0 && (
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-3 border-b border-slate-100 pb-2">
                  Required Skills & Technologies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill, i) => (
                    <span key={i} className="px-3 py-1 rounded-lg bg-slate-100 text-slate-800 font-semibold text-xs border border-slate-200">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {job.benefits && job.benefits.length > 0 && (
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-3 border-b border-slate-100 pb-2">
                  Benefits & Perks
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {job.benefits.map((benefit, i) => (
                    <div key={i} className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-2.5 text-xs text-slate-800 font-medium">
                      <Sparkles className="w-4 h-4 text-[#FF6B00] shrink-0" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Bottom Apply trigger */}
            <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
              <div>
                <div className="font-bold text-slate-900">Ready to take the next step?</div>
                <div className="text-xs text-slate-500">Applications are reviewed within 48 hours.</div>
              </div>
              <button
                onClick={() => setApplyJobModal(job)}
                className="px-6 py-2.5 rounded-lg bg-[#FF6B00] hover:bg-[#E05E00] text-white font-bold text-xs uppercase tracking-wider shadow"
              >
                Apply for this Role
              </button>
            </div>

          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Company Info Box */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <h4 className="font-bold text-sm text-slate-900 mb-4 border-b border-slate-100 pb-2">
                Hiring Organization
              </h4>
              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-slate-400 block font-medium">Company</span>
                  <span className="font-bold text-slate-800">{job.company}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Industry</span>
                  <span className="text-slate-700">{job.industry}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Location</span>
                  <span className="text-slate-700">{job.location}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Recruitment Partner</span>
                  <span className="text-[#FF6B00] font-semibold">WorkForce Manpower Consultancy</span>
                </div>
              </div>
            </div>

            {/* Related Jobs */}
            {relatedJobs.length > 0 && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <h4 className="font-bold text-sm text-slate-900 mb-4 border-b border-slate-100 pb-2">
                  Similar Opportunities
                </h4>
                <div className="space-y-3">
                  {relatedJobs.map(rJob => (
                    <Link
                      key={rJob.id}
                      to={`/jobs/${rJob.slug}`}
                      className="block p-3 rounded-xl border border-slate-100 hover:border-[#FF6B00] hover:bg-orange-50/20 transition-all group"
                    >
                      <h5 className="font-bold text-xs text-slate-900 group-hover:text-[#FF6B00] line-clamp-1">
                        {rJob.title}
                      </h5>
                      <div className="text-[11px] text-slate-500 mt-1">
                        {rJob.company} • {rJob.location}
                      </div>
                      <div className="text-[11px] font-semibold text-slate-700 mt-1">
                        {rJob.salary ? rJob.salary.replace(/â‚¹/g, 'INR ').replace(/₹/g, 'INR ').trim() : ''}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
