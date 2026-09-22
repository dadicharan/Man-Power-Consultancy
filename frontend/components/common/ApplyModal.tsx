import React, { useState } from 'react';
import { 
  X, 
  UploadCloud, 
  FileText, 
  CheckCircle2, 
  Building, 
  MapPin, 
  DollarSign, 
  AlertCircle 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../../context/AppContext';

export const ApplyModal: React.FC = () => {
  const { applyJobModal, setApplyJobModal, applyForJob, currentUser, showToast } = useApp();

  const [fullName, setFullName] = useState(currentUser.role === 'candidate' ? currentUser.name : '');
  const [email, setEmail] = useState(currentUser.role === 'candidate' ? currentUser.email : '');
  const [phone, setPhone] = useState(currentUser.phone || '');
  const [coverLetter, setCoverLetter] = useState('');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeFileName, setResumeFileName] = useState<string>('Standard_Resume.pdf');
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedAppId, setSubmittedAppId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!applyJobModal) return null;

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      validateAndSetFile(file);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const validateAndSetFile = (file: File) => {
    const validExtensions = ['.pdf', '.doc', '.docx'];
    const hasValidExt = validExtensions.some(ext => file.name.toLowerCase().endsWith(ext));
    if (!hasValidExt) {
      setErrorMsg('Please upload a valid document (PDF, DOC, DOCX).');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setErrorMsg('File size must be under 5MB.');
      return;
    }
    setErrorMsg(null);
    setResumeFile(file);
    setResumeFileName(file.name);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !phone.trim()) {
      setErrorMsg('Please complete your name, email, and phone number.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const newApp = applyForJob(applyJobModal.id, {
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        resumeFileName: resumeFileName,
        coverLetter: coverLetter.trim()
      });

      // Confetti celebration
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        // ignore if canvas unavailable
      }

      setIsSubmitting(false);
      setSubmittedAppId(newApp.id);
      showToast(`Application submitted for ${applyJobModal.title}!`, 'success');
    }, 600);
  };

  const handleClose = () => {
    setApplyJobModal(null);
    setSubmittedAppId(null);
    setErrorMsg(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 text-slate-900 relative"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 bg-[#071A2D] text-white flex items-start justify-between rounded-t-2xl relative">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#FF6B00]">
              Job Application
            </div>
            <h3 className="text-xl sm:text-2xl font-bold mt-1 text-white">
              {applyJobModal.title}
            </h3>
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300 mt-2">
              <span className="flex items-center gap-1 font-medium">
                <Building className="w-3.5 h-3.5 text-slate-400" />
                {applyJobModal.company}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                {applyJobModal.location}
              </span>
              <span>•</span>
              <span className="text-orange-400 font-semibold">
                {applyJobModal.salary ? applyJobModal.salary.replace(/â‚¹/g, 'INR ').replace(/₹/g, 'INR ').trim() : ''}
              </span>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6">
          {submittedAppId ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-slate-900">Application Submitted!</h4>
                <p className="text-sm text-slate-600 mt-1 max-w-sm mx-auto">
                  Your profile and resume have been forwarded to the hiring team at {applyJobModal.company}. Application reference code: <strong className="text-slate-900">#{submittedAppId}</strong>.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-slate-600 max-w-md mx-auto text-left space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-500">Applicant:</span>
                  <span className="font-semibold text-slate-800">{fullName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Target Role:</span>
                  <span className="font-semibold text-slate-800">{applyJobModal.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Current ATS Stage:</span>
                  <span className="font-semibold text-blue-600">Applied (Screening Pending)</span>
                </div>
                <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[11px]">
                  <span className="text-emerald-700 font-semibold flex items-center gap-1">
                    ✓ Application Recorded & Saved
                  </span>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    const appObj = {
                      id: submittedAppId || 'app-ref',
                      candidateId: 'cand-ref',
                      candidateName: fullName,
                      candidateEmail: email,
                      candidatePhone: phone,
                      jobId: applyJobModal.id,
                      jobTitle: applyJobModal.title,
                      company: applyJobModal.company,
                      location: applyJobModal.location,
                      appliedDate: new Date().toLocaleDateString('en-GB'),
                      status: 'Applied' as const,
                      currentStage: 'Applied' as const,
                      resumeFileName: resumeFileName,
                      coverLetter,
                      updatedAt: new Date().toLocaleDateString('en-GB')
                    };
                    import('../../lib/excelExport').then(m => m.exportApplicationToExcel(appObj));
                    showToast('Application exported to Excel (.xlsx)!', 'success');
                  }}
                  className="px-4 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow flex items-center gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Download Excel (.xlsx)</span>
                </button>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleClose}
                  className="px-6 py-2.5 rounded-lg bg-[#071A2D] text-white font-bold text-sm hover:bg-slate-800 transition-colors shadow"
                >
                  Close & Explore More Jobs
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-sm">
              {errorMsg && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    placeholder="e.g. Rohit Sharma"
                    className="w-full px-3.5 py-2 rounded-lg border border-slate-300 focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00] outline-none text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="e.g. rohit@gmail.com"
                    className="w-full px-3.5 py-2 rounded-lg border border-slate-300 focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00] outline-none text-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00] outline-none text-slate-800"
                />
              </div>

              {/* Resume Upload Area */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Upload Resume (PDF/DOCX, max 5MB) *
                </label>
                <div
                  onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleFileDrop}
                  className={`border-2 border-dashed rounded-xl p-4 text-center transition-colors ${
                    isDragging ? 'border-[#FF6B00] bg-orange-50/40' : 'border-slate-300 hover:border-slate-400 bg-slate-50'
                  }`}
                >
                  <UploadCloud className="w-8 h-8 text-slate-400 mx-auto mb-1.5" />
                  <div className="text-xs text-slate-600">
                    <span className="font-semibold text-[#FF6B00] cursor-pointer hover:underline">
                      Click to browse
                    </span> or drag and drop your file here
                  </div>
                  <input 
                    type="file" 
                    accept=".pdf,.doc,.docx" 
                    onChange={handleFileInput}
                    className="hidden" 
                    id="resume-file-input"
                  />
                  <label htmlFor="resume-file-input" className="absolute inset-0 cursor-pointer"></label>
                </div>

                {resumeFileName && (
                  <div className="mt-2 flex items-center justify-between p-2.5 bg-blue-50/70 border border-blue-200 rounded-lg text-xs text-blue-900">
                    <div className="flex items-center gap-2 truncate">
                      <FileText className="w-4 h-4 text-blue-600 shrink-0" />
                      <span className="font-semibold truncate">{resumeFileName}</span>
                    </div>
                    <span className="text-[10px] text-blue-600 font-bold uppercase bg-blue-100 px-2 py-0.5 rounded">Ready</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Cover Letter / Note to Recruiter (Optional)
                </label>
                <textarea
                  rows={3}
                  value={coverLetter}
                  onChange={e => setCoverLetter(e.target.value)}
                  placeholder="Briefly describe your relevant experience, key achievements, and availability..."
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00] outline-none text-slate-800 text-xs"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 font-semibold text-xs hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2 rounded-lg bg-[#FF6B00] hover:bg-[#E05E00] text-white font-bold text-xs shadow-md transition-all active:scale-95 disabled:opacity-50"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
