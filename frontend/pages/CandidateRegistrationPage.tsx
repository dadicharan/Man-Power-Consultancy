import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  UploadCloud, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  ArrowRight,
  User,
  GraduationCap
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { useApp } from '../context/AppContext';
import { FakeJobsWarningBanner } from '../components/common/FakeJobsWarningBanner';

export const CandidateRegistrationPage: React.FC = () => {
  const navigate = useNavigate();
  const { addCandidate, showToast, setCurrentRole } = useApp();

  // Personal Details
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('Male');
  const [currentLocation, setCurrentLocation] = useState('');

  // Education & Experience
  const [highestQualification, setHighestQualification] = useState('B.Tech / B.E.');
  const [currentJobTitle, setCurrentJobTitle] = useState('');
  const [totalExperience, setTotalExperience] = useState('3 - 5 Years');
  const [skills, setSkills] = useState('');
  const [expectedSalary, setExpectedSalary] = useState('');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeFileName, setResumeFileName] = useState<string>('');
  const [agreedTerms, setAgreedTerms] = useState(false);

  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registeredCandId, setRegisteredCandId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const qualifications = [
    'B.Tech / B.E.',
    'M.Tech / M.E.',
    'BCA / MCA',
    'B.Sc / M.Sc Computer Science',
    'MBA / PGDM',
    'B.Com / M.Com / Chartered Accountant',
    'MBBS / B.Sc Nursing / Healthcare',
    'Diploma in Engineering',
    'Any Bachelor Degree / Graduate'
  ];

  const experienceRanges = [
    'Fresher (0 Years)',
    '1 - 3 Years',
    '3 - 5 Years',
    '5 - 7 Years',
    '7 - 10 Years',
    '10+ Years'
  ];

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      validateFile(e.target.files[0]);
    }
  };

  const validateFile = (file: File) => {
    const validExts = ['.pdf', '.doc', '.docx'];
    const isValid = validExts.some(ext => file.name.toLowerCase().endsWith(ext));
    if (!isValid) {
      setErrorMsg('Invalid file format. Please upload PDF, DOC, or DOCX.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setErrorMsg('File exceeds 5MB limit.');
      return;
    }
    setErrorMsg(null);
    setResumeFile(file);
    setResumeFileName(file.name);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !phone.trim() || !currentLocation.trim()) {
      setErrorMsg('Please fill in all mandatory personal details marked with *.');
      return;
    }
    if (!agreedTerms) {
      setErrorMsg('Please accept the Terms & Conditions to complete registration.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg(null);

    setTimeout(() => {
      const skillsArray = skills.trim() 
        ? skills.split(',').map(s => s.trim()).filter(Boolean)
        : ['Communication', 'Teamwork'];

      const newCandidate = addCandidate({
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        dob: dob || '1996-01-01',
        gender,
        currentLocation: currentLocation.trim(),
        highestQualification,
        currentJobTitle: currentJobTitle.trim() || 'Job Seeker',
        totalExperience,
        skills: skillsArray,
        expectedSalary: expectedSalary.trim() || 'Market Standard',
        resumeFileName: resumeFileName || 'Candidate_Resume.pdf',
        resumeUrl: '#'
      });

      // Switch context role to candidate for immediate testing
      setCurrentRole('candidate');

      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch (err) {
        // canvas fallback
      }

      setIsSubmitting(false);
      setRegisteredCandId(newCandidate.id);
      showToast('Registration successful! Your candidate profile is live.', 'success');
    }, 600);
  };

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 pb-20">
      
      {/* Breadcrumb Header */}
      <Breadcrumb
        items={[
          { label: 'Candidates', path: '/candidates' },
          { label: 'Candidate Registration' }
        ]}
        title="Candidate Registration"
        subtitle="Submit your credentials once to access verified openings across top multinational companies."
        bannerImage="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=1600&q=80"
        badge="Your Success Our Priority"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        
        {/* Candidate Trust & Safety Advisory */}
        <div className="mb-6">
          <FakeJobsWarningBanner compact={true} />
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xl overflow-hidden">
          
          {registeredCandId ? (
            <div className="p-8 sm:p-12 text-center space-y-5">
              <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              
              <div>
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">
                  Profile Generated Successfully
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                  Welcome aboard, {fullName}!
                </h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto mt-2">
                  Your candidate profile (ID: <strong className="text-slate-900">#{registeredCandId}</strong>) has been indexed in our recruitment database. Employers can now view your resume.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 max-w-md mx-auto text-left text-xs space-y-2 text-slate-700">
                <div className="flex justify-between">
                  <span className="text-slate-500">Registered Email:</span>
                  <span className="font-semibold text-slate-900">{email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Phone:</span>
                  <span className="font-semibold text-slate-900">{phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Location:</span>
                  <span className="font-semibold text-slate-900">{currentLocation}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Resume Attached:</span>
                  <span className="font-semibold text-blue-600">{resumeFileName || 'Candidate_Resume.pdf'}</span>
                </div>
                <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[11px]">
                  <span className="text-emerald-700 font-semibold flex items-center gap-1">
                    ✓ Verified & Registered in Candidate Database
                  </span>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    const candObj = {
                      id: registeredCandId,
                      fullName,
                      email,
                      phone,
                      dob,
                      gender,
                      currentLocation,
                      highestQualification,
                      currentJobTitle,
                      totalExperience,
                      skills: skills.split(',').map(s => s.trim()).filter(Boolean),
                      expectedSalary,
                      resumeFileName: resumeFileName || 'Candidate_Resume.pdf',
                      status: 'Registered' as const,
                      registeredDate: new Date().toLocaleDateString('en-GB'),
                      profileCompletion: 85
                    };
                    import('../lib/excelExport').then(m => m.exportCandidateToExcel(candObj));
                    showToast('Candidate record exported to Excel (.xlsx)!', 'success');
                  }}
                  className="px-4 py-2.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow flex items-center gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Download Excel Copy (.xlsx)</span>
                </button>
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
                <Link
                  to="/candidate/portal"
                  className="px-6 py-3 rounded-lg bg-[#071A2D] text-white font-bold text-xs sm:text-sm uppercase tracking-wider hover:bg-slate-800 transition-colors shadow"
                >
                  Go to Candidate Dashboard
                </Link>
                <Link
                  to="/jobs"
                  className="px-6 py-3 rounded-lg bg-[#FF6B00] text-white font-bold text-xs sm:text-sm uppercase tracking-wider hover:bg-[#E05E00] transition-colors shadow"
                >
                  Browse Matching Jobs
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-8">
              
              {errorMsg && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2.5">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* =========================================================================
                  TWO-COLUMN FORM (Matches Screen 7 in Refenecs.png)
                  Left: Personal Details
                  Right: Education & Experience
                  ========================================================================= */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Left Column: Personal Details */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 pb-2 border-b border-slate-100 text-slate-900 font-bold text-sm">
                    <User className="w-4 h-4 text-[#FF6B00]" />
                    <span>Personal Details</span>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={e => setFullName(e.target.value)}
                      placeholder="Enter your full name"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-[#FF6B00] outline-none text-xs sm:text-sm text-slate-800"
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
                      placeholder="Enter your email"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-[#FF6B00] outline-none text-xs sm:text-sm text-slate-800"
                    />
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
                      placeholder="Enter your phone number"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-[#FF6B00] outline-none text-xs sm:text-sm text-slate-800"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        value={dob}
                        onChange={e => setDob(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-lg border border-slate-300 focus:border-[#FF6B00] outline-none text-xs text-slate-800"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Gender *
                      </label>
                      <select
                        value={gender}
                        onChange={e => setGender(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-lg border border-slate-300 focus:border-[#FF6B00] outline-none text-xs text-slate-800 bg-white"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Current Location *
                    </label>
                    <input
                      type="text"
                      required
                      value={currentLocation}
                      onChange={e => setCurrentLocation(e.target.value)}
                      placeholder="Enter your location (e.g. Bangalore, India)"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-[#FF6B00] outline-none text-xs sm:text-sm text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Current Job Title / Designation
                    </label>
                    <input
                      type="text"
                      value={currentJobTitle}
                      onChange={e => setCurrentJobTitle(e.target.value)}
                      placeholder="e.g. Software Engineer, Accountant"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-[#FF6B00] outline-none text-xs sm:text-sm text-slate-800"
                    />
                  </div>
                </div>

                {/* Right Column: Education & Experience */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 pb-2 border-b border-slate-100 text-slate-900 font-bold text-sm">
                    <GraduationCap className="w-4 h-4 text-[#FF6B00]" />
                    <span>Education & Experience</span>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Highest Qualification *
                    </label>
                    <select
                      value={highestQualification}
                      onChange={e => setHighestQualification(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-[#FF6B00] outline-none text-xs sm:text-sm text-slate-800 bg-white"
                    >
                      {qualifications.map((q, i) => (
                        <option key={i} value={q}>{q}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Total Experience *
                    </label>
                    <select
                      value={totalExperience}
                      onChange={e => setTotalExperience(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-[#FF6B00] outline-none text-xs sm:text-sm text-slate-800 bg-white"
                    >
                      {experienceRanges.map((exp, i) => (
                        <option key={i} value={exp}>{exp}</option>
                      ))}
                    </select>
                  </div>

                  {/* Resume Upload (Matches Screen 7: Resume Upload * Choose File) */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Resume Upload * (PDF / DOC / DOCX, max 5MB)
                    </label>
                    <div
                      onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
                      onDragLeave={() => setIsDragging(false)}
                      onDrop={handleFileDrop}
                      className={`border-2 border-dashed rounded-xl p-4 text-center transition-colors ${
                        isDragging ? 'border-[#FF6B00] bg-orange-50/40' : 'border-slate-300 hover:border-slate-400 bg-slate-50'
                      }`}
                    >
                      <UploadCloud className="w-8 h-8 text-slate-400 mx-auto mb-1" />
                      <div className="text-xs text-slate-600">
                        <label 
                          htmlFor="registration-resume-file" 
                          className="font-bold text-[#FF6B00] cursor-pointer hover:underline"
                        >
                          Choose File
                        </label>{' '}
                        <span className="text-slate-400">or drag and drop</span>
                      </div>
                      <input
                        id="registration-resume-file"
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileInput}
                        className="hidden"
                      />
                    </div>

                    {resumeFileName ? (
                      <div className="mt-2 flex items-center justify-between p-2 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-900">
                        <div className="flex items-center gap-2 truncate">
                          <FileText className="w-4 h-4 text-blue-600 shrink-0" />
                          <span className="font-semibold truncate">{resumeFileName}</span>
                        </div>
                        <span className="text-[10px] bg-blue-100 text-blue-700 font-bold px-2 py-0.5 rounded">Uploaded</span>
                      </div>
                    ) : (
                      <div className="text-[11px] text-slate-400 mt-1">No file chosen yet. (Optional sample PDF will be generated if skipped).</div>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Skills (Optional, comma separated)
                    </label>
                    <input
                      type="text"
                      value={skills}
                      onChange={e => setSkills(e.target.value)}
                      placeholder="e.g. React, Node.js, SAP, AutoCAD, Sales"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-[#FF6B00] outline-none text-xs sm:text-sm text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Expected Annual CTC (Optional)
                    </label>
                    <input
                      type="text"
                      value={expectedSalary}
                      onChange={e => setExpectedSalary(e.target.value)}
                      placeholder="e.g. INR 12,00,000 P.A."
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-[#FF6B00] outline-none text-xs sm:text-sm text-slate-800"
                    />
                  </div>
                </div>

              </div>

              {/* Terms & Conditions Checkbox (Matches Screen 7) */}
              <div className="pt-4 border-t border-slate-100 flex items-start gap-2.5">
                <input
                  type="checkbox"
                  id="terms-checkbox"
                  checked={agreedTerms}
                  onChange={e => setAgreedTerms(e.target.checked)}
                  className="mt-1 w-4 h-4 text-[#FF6B00] border-slate-300 rounded focus:ring-[#FF6B00] accent-[#FF6B00]"
                />
                <label htmlFor="terms-checkbox" className="text-xs text-slate-600 leading-relaxed cursor-pointer">
                  I agree to the <Link to="/terms" className="text-[#FF6B00] font-semibold hover:underline">Terms & Conditions</Link> and{' '}
                  <Link to="/privacy" className="text-[#FF6B00] font-semibold hover:underline">Privacy Policy</Link>. I consent to WorkForce Manpower sharing my profile with verified employer partners.
                </label>
              </div>

              {/* Submit Button: Orange [Register] button as in Screen 7 */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  id="candidate-register-submit-btn"
                  className="w-full sm:w-auto px-10 py-3 rounded-lg bg-[#FF6B00] hover:bg-[#E05E00] text-white font-bold text-sm uppercase tracking-wider shadow-lg transition-all active:scale-95 disabled:opacity-50"
                >
                  {isSubmitting ? 'Registering...' : 'Register'}
                </button>
              </div>

            </form>
          )}

        </div>
      </div>

    </div>
  );
};
