import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  User, 
  Briefcase, 
  Bookmark, 
  FileText, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  ArrowRight,
  UploadCloud,
  ChevronRight,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ApplicationStage } from '../types';

export const CandidatePortalPage: React.FC = () => {
  const { candidates, applications, jobs, savedJobIds, currentUser, showToast } = useApp();
  const [activeTab, setActiveTab] = useState<'applied' | 'saved' | 'profile'>('applied');

  // Candidate reference (default to Rohit Sharma cand-1 or current user)
  const currentCandidate = candidates.find(c => c.email.toLowerCase() === currentUser.email.toLowerCase()) || candidates[0];

  // Applications belonging to this candidate
  const myApplications = applications.filter(a => a.candidateId === currentCandidate?.id || a.candidateEmail === currentCandidate?.email);

  // Saved jobs
  const mySavedJobs = jobs.filter(j => savedJobIds.includes(j.id));

  const stages: ApplicationStage[] = ['Applied', 'Screening', 'Shortlisted', 'Interview', 'Selected', 'Joined'];

  const getStageIndex = (stage: ApplicationStage) => {
    return stages.indexOf(stage);
  };

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 pb-20">
      
      {/* Header Banner */}
      <div className="bg-[#071A2D] text-white py-10 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-orange-500 text-white font-extrabold text-2xl flex items-center justify-center shadow-lg">
                {currentCandidate?.fullName.charAt(0) || 'C'}
              </div>
              <div>
                <div className="inline-block px-2.5 py-0.5 rounded bg-orange-500/20 text-[#FF6B00] text-[10px] font-bold uppercase tracking-wider mb-1">
                  Candidate Portal
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {currentCandidate?.fullName || 'Candidate Dashboard'}
                </h1>
                <p className="text-xs text-slate-400 mt-0.5">
                  {currentCandidate?.currentJobTitle} • {currentCandidate?.currentLocation}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to="/jobs"
                className="px-4 py-2 rounded-lg bg-[#FF6B00] hover:bg-[#E05E00] text-white font-bold text-xs shadow transition-colors"
              >
                Browse Vacancies
              </Link>
            </div>
          </div>

          {/* Profile Completion Bar */}
          <div className="mt-8 bg-slate-900/80 p-4 rounded-xl border border-slate-800 max-w-xl">
            <div className="flex items-center justify-between text-xs mb-1.5 font-semibold">
              <span className="text-slate-300">Profile Completion</span>
              <span className="text-orange-400 font-bold">{currentCandidate?.profileCompletion || 85}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-orange-500 to-[#FF6B00] rounded-full transition-all duration-500" 
                style={{ width: `${currentCandidate?.profileCompletion || 85}%` }}
              />
            </div>
            <div className="mt-2 text-[11px] text-slate-400 flex items-center justify-between">
              <span>Verified contact & resume attached</span>
              <span className="text-emerald-400 font-medium">Ready for Employer Screening</span>
            </div>
          </div>

        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6">
            <button
              onClick={() => setActiveTab('applied')}
              className={`py-4 text-xs font-bold border-b-2 flex items-center gap-2 transition-colors ${
                activeTab === 'applied' 
                  ? 'border-[#FF6B00] text-[#FF6B00]' 
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              <Briefcase className="w-4 h-4" /> Applied Jobs ({myApplications.length})
            </button>
            <button
              onClick={() => setActiveTab('saved')}
              className={`py-4 text-xs font-bold border-b-2 flex items-center gap-2 transition-colors ${
                activeTab === 'saved' 
                  ? 'border-[#FF6B00] text-[#FF6B00]' 
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              <Bookmark className="w-4 h-4" /> Saved Openings ({mySavedJobs.length})
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`py-4 text-xs font-bold border-b-2 flex items-center gap-2 transition-colors ${
                activeTab === 'profile' 
                  ? 'border-[#FF6B00] text-[#FF6B00]' 
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              <User className="w-4 h-4" /> My Profile Details
            </button>
          </div>
        </div>
      </div>

      {/* Tab Contents */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        
        {/* Tab 1: Applied Jobs with ATS Timeline */}
        {activeTab === 'applied' && (
          <div className="space-y-6">
            {myApplications.length === 0 ? (
              <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
                <Briefcase className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="font-bold text-base text-slate-800">No Job Applications Yet</h3>
                <p className="text-xs text-slate-500 mt-1">Explore our verified openings and click "Apply Now" to start receiving interview invitations.</p>
                <Link to="/jobs" className="mt-4 inline-block px-5 py-2 bg-[#FF6B00] text-white font-bold text-xs rounded-lg shadow">
                  Browse Active Jobs
                </Link>
              </div>
            ) : (
              myApplications.map(app => {
                const currentIdx = getStageIndex(app.currentStage);
                return (
                  <div key={app.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                      <div>
                        <span className="text-[10px] font-bold text-[#FF6B00] uppercase tracking-wider">
                          Application #{app.id}
                        </span>
                        <h3 className="text-lg font-bold text-slate-900">{app.jobTitle}</h3>
                        <div className="text-xs text-slate-500 mt-0.5">
                          {app.company} • {app.location} • Applied on {app.appliedDate}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-full text-xs font-bold">
                          Stage: {app.currentStage}
                        </span>
                      </div>
                    </div>

                    {/* ATS Visual Progress Tracker Timeline */}
                    <div className="mt-6 pt-2">
                      <div className="text-xs font-bold text-slate-700 mb-3">Recruitment Pipeline Status</div>
                      <div className="grid grid-cols-6 gap-2 text-center">
                        {stages.map((st, sIdx) => {
                          const isPassed = sIdx <= currentIdx;
                          const isCurrent = sIdx === currentIdx;
                          return (
                            <div key={st} className="relative">
                              <div className={`h-2 rounded-full mb-2 transition-all ${
                                isPassed ? 'bg-[#FF6B00]' : 'bg-slate-200'
                              } ${isCurrent ? 'ring-2 ring-orange-300 animate-pulse' : ''}`} />
                              <div className={`text-[10px] sm:text-xs font-semibold ${
                                isCurrent ? 'text-[#FF6B00] font-bold' : isPassed ? 'text-slate-800' : 'text-slate-400'
                              }`}>
                                {st}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {app.recruiterNotes && (
                      <div className="mt-5 p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-700 flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#FF6B00] shrink-0 mt-0.5" />
                        <div>
                          <span className="font-semibold text-slate-900">Recruiter Update: </span>
                          {app.recruiterNotes}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* Tab 2: Saved Jobs */}
        {activeTab === 'saved' && (
          <div>
            {mySavedJobs.length === 0 ? (
              <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
                <Bookmark className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="font-bold text-base text-slate-800">No Saved Jobs</h3>
                <p className="text-xs text-slate-500 mt-1">Bookmark vacancies by clicking the ribbon icon on any job card.</p>
                <Link to="/jobs" className="mt-4 inline-block px-5 py-2 bg-[#FF6B00] text-white font-bold text-xs rounded-lg shadow">
                  Browse Active Jobs
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mySavedJobs.map(job => (
                  <div key={job.id} className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-bold text-base text-slate-900">{job.title}</h4>
                          <div className="text-xs text-slate-500">{job.company} • {job.location}</div>
                        </div>
                        <span className="text-xs font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded">
                          {job.salary ? job.salary.replace(/â‚¹/g, 'INR ').replace(/₹/g, 'INR ').trim() : ''}
                        </span>
                      </div>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[11px] text-slate-400">{job.experienceDisplay}</span>
                      <Link
                        to={`/jobs/${job.slug}`}
                        className="px-4 py-1.5 bg-[#FF6B00] text-white font-bold text-xs rounded-lg hover:bg-[#E05E00]"
                      >
                        Apply Now
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Profile Details */}
        {activeTab === 'profile' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
              Candidate Resume & Qualifications
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
              <div>
                <span className="text-slate-400 block font-medium">Full Name</span>
                <span className="font-semibold text-slate-900 text-sm mt-0.5 block">{currentCandidate.fullName}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Email Address</span>
                <span className="font-semibold text-slate-900 text-sm mt-0.5 block">{currentCandidate.email}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Phone Number</span>
                <span className="font-semibold text-slate-900 text-sm mt-0.5 block">{currentCandidate.phone}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Current Location</span>
                <span className="font-semibold text-slate-900 text-sm mt-0.5 block">{currentCandidate.currentLocation}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Highest Qualification</span>
                <span className="font-semibold text-slate-900 text-sm mt-0.5 block">{currentCandidate.highestQualification}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Experience Level</span>
                <span className="font-semibold text-slate-900 text-sm mt-0.5 block">{currentCandidate.totalExperience}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <span className="text-xs font-bold text-slate-700 block mb-2">Registered Skills</span>
              <div className="flex flex-wrap gap-2">
                {currentCandidate.skills.map((s, i) => (
                  <span key={i} className="px-3 py-1 bg-slate-100 rounded-lg text-xs font-semibold text-slate-800">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <span className="text-xs font-bold text-slate-700 block mb-2">Active Resume Document</span>
              <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-xl flex items-center justify-between max-w-md">
                <div className="flex items-center gap-2 text-xs text-blue-900 font-semibold truncate">
                  <FileText className="w-5 h-5 text-blue-600 shrink-0" />
                  <span className="truncate">{currentCandidate.resumeFileName || 'Resume_Document.pdf'}</span>
                </div>
                <button
                  onClick={() => showToast('Resume downloaded for review.', 'info')}
                  className="px-3 py-1 bg-blue-600 text-white rounded text-xs font-bold hover:bg-blue-700"
                >
                  Download
                </button>
              </div>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
