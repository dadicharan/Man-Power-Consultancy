import React from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  Briefcase, 
  Clock, 
  Bookmark, 
  BookmarkCheck, 
  ArrowUpRight,
  Sparkles,
  DollarSign
} from 'lucide-react';
import { Job } from '../../types';
import { useApp } from '../../context/AppContext';

interface JobCardProps {
  job: Job;
  compact?: boolean;
}

export const JobCard: React.FC<JobCardProps> = ({ job, compact = false }) => {
  const { setApplyJobModal, toggleSaveJob, isJobSaved } = useApp();
  const saved = isJobSaved(job.id);

  // Pick category icon background color
  const getCategoryTheme = (cat: string) => {
    switch (cat) {
      case 'IT & Software':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Engineering':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Healthcare':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Sales & Marketing':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Finance & Accounts':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const formatSalaryText = (salaryStr?: string) => {
    if (!salaryStr) return 'Competitive';
    return salaryStr.replace(/â‚¹/g, 'INR ').replace(/₹/g, 'INR ').trim();
  };

  return (
    <div 
      id={`job-card-${job.id}`}
      className="bg-white rounded-xl border border-slate-200/90 shadow-sm hover:shadow-md hover:border-slate-300 transition-all p-5 sm:p-6 group relative flex flex-col justify-between"
    >
      <div>
        {/* Top Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-lg shadow-sm shrink-0">
              {job.company.charAt(0)}
            </div>
            <div>
              <Link 
                to={`/jobs/${job.slug}`}
                className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#FF6B00] transition-colors leading-snug line-clamp-1"
              >
                {job.title}
              </Link>
              <div className="text-xs font-semibold text-slate-500 mt-0.5">
                {job.company}
              </div>
            </div>
          </div>

          {/* Bookmark Button */}
          <button
            onClick={() => toggleSaveJob(job.id)}
            aria-label={saved ? 'Remove saved job' : 'Save job'}
            className={`p-2 rounded-lg transition-colors ${
              saved 
                ? 'text-[#FF6B00] bg-orange-50' 
                : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'
            }`}
          >
            {saved ? <BookmarkCheck className="w-5 h-5 fill-current" /> : <Bookmark className="w-5 h-5" />}
          </button>
        </div>

        {/* Metadata row */}
        <div className="flex flex-wrap items-center gap-y-1 gap-x-2 text-xs text-slate-600 mt-3.5 pt-3 border-t border-slate-100 font-medium">
          <span className={`px-2 py-0.5 rounded border text-[11px] font-semibold ${getCategoryTheme(job.category)}`}>
            {job.category}
          </span>
          <span className="text-slate-300">•</span>
          <span className="flex items-center gap-1">
            <Briefcase className="w-3.5 h-3.5 text-slate-400" />
            {job.employmentType} ({job.workMode})
          </span>
          <span className="text-slate-300">•</span>
          <span className="flex items-center gap-1 text-slate-600">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            {job.location}
          </span>
        </div>

        {/* Experience & Salary details */}
        {!compact && (
          <div className="grid grid-cols-2 gap-2 mt-3 text-xs bg-slate-50/80 p-2.5 rounded-lg border border-slate-100">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Experience</span>
              <span className="font-semibold text-slate-800">{job.experienceDisplay}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Salary / CTC</span>
              <span className="font-semibold text-slate-800">{formatSalaryText(job.salary)}</span>
            </div>
          </div>
        )}

        {/* Key skills pills */}
        {!compact && job.skills && job.skills.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {job.skills.slice(0, 4).map((skill, idx) => (
              <span key={idx} className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[11px]">
                {skill}
              </span>
            ))}
            {job.skills.length > 4 && (
              <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-500 text-[11px]">
                +{job.skills.length - 4} more
              </span>
            )}
          </div>
        )}
      </div>

      {/* Card Action Footer */}
      <div className="flex items-center justify-between gap-3 mt-4 pt-3 border-t border-slate-100">
        <span className="text-[11px] text-slate-400 font-medium">
          Posted {job.postedDate}
        </span>
        <div className="flex items-center gap-2">
          <Link
            to={`/jobs/${job.slug}`}
            className="px-3 py-1.5 rounded-md text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors flex items-center gap-1"
          >
            Details <ArrowUpRight className="w-3 h-3" />
          </Link>
          <button
            onClick={() => setApplyJobModal(job)}
            className="px-4 py-1.5 rounded-md text-xs font-bold bg-[#FF6B00] hover:bg-[#E05E00] text-white shadow-sm hover:shadow transition-all active:scale-95"
          >
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
};
