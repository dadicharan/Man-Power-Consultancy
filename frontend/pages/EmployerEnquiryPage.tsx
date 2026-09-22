import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  PhoneCall, 
  Clock, 
  ShieldCheck,
  UserCheck,
  FileText
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { useApp } from '../context/AppContext';

export const EmployerEnquiryPage: React.FC = () => {
  const { submitEmployerEnquiry, showToast, setCurrentRole } = useApp();

  const [companyName, setCompanyName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [designation, setDesignation] = useState('');
  const [companyLocation, setCompanyLocation] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [vacancies, setVacancies] = useState<number>(3);
  const [additionalRequirements, setAdditionalRequirements] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedEnquiryId, setSubmittedEnquiryId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!companyName.trim() || !contactPerson.trim() || !email.trim() || !phone.trim() || !jobTitle.trim()) {
      setErrorMsg('Please fill in all mandatory fields marked with *.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg(null);

    setTimeout(() => {
      const newEnquiry = submitEmployerEnquiry({
        companyName: companyName.trim(),
        contactPerson: contactPerson.trim(),
        designation: designation.trim() || 'Hiring Manager',
        companyLocation: companyLocation.trim() || 'Bangalore, India',
        email: email.trim(),
        phone: phone.trim(),
        jobTitle: jobTitle.trim(),
        vacancies: Number(vacancies) || 1,
        additionalRequirements: additionalRequirements.trim()
      });

      // Switch context role to employer for immediate testing
      setCurrentRole('employer');

      try {
        confetti({
          particleCount: 90,
          spread: 75,
          origin: { y: 0.6 }
        });
      } catch (err) {
        // canvas fallback
      }

      setIsSubmitting(false);
      setSubmittedEnquiryId(newEnquiry.id);
      showToast('Enquiry received! Our recruitment consultant will reach out shortly.', 'success');
    }, 600);
  };

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 pb-20">
      
      {/* Breadcrumb Header */}
      <Breadcrumb
        items={[
          { label: 'Employers', path: '/employers' },
          { label: 'Employer Enquiry' }
        ]}
        title="Employer Enquiry"
        subtitle="Fill the form below and our recruitment consultants will get in touch with you shortly."
        bannerImage="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1600&q=80"
        badge="Direct Hiring Request"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xl overflow-hidden">
          
          {submittedEnquiryId ? (
            <div className="p-8 sm:p-12 text-center space-y-5">
              <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-12 h-12" />
              </div>

              <div>
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">
                  Enquiry Submitted Successfully
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                  Thank You, {contactPerson}!
                </h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto mt-2">
                  Your staffing requisition has been assigned to our senior recruitment team. Reference ID: <strong className="text-slate-900">#{submittedEnquiryId}</strong>.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 max-w-md mx-auto text-left text-xs space-y-2 text-slate-700">
                <div className="flex justify-between">
                  <span className="text-slate-500">Company:</span>
                  <span className="font-semibold text-slate-900">{companyName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Target Role:</span>
                  <span className="font-semibold text-slate-900">{jobTitle} ({vacancies} openings)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Contact Number:</span>
                  <span className="font-semibold text-slate-900">{phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Expected Callback:</span>
                  <span className="font-semibold text-emerald-600">Within 2 business hours</span>
                </div>
                <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[11px]">
                  <span className="text-emerald-700 font-semibold flex items-center gap-1">
                    ✓ Enquiry Recorded & Saved
                  </span>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    const enqObj = {
                      id: submittedEnquiryId || 'enq-ref',
                      companyName,
                      contactPerson,
                      designation: designation || 'Manager',
                      email,
                      phone,
                      companyLocation: companyLocation || 'Bangalore',
                      jobTitle,
                      vacancies: Number(vacancies),
                      additionalRequirements,
                      status: 'New' as const,
                      createdAt: new Date().toLocaleDateString('en-GB')
                    };
                    import('../lib/excelExport').then(m => m.exportEnquiryToExcel(enqObj));
                    showToast('Enquiry exported to Excel (.xlsx)!', 'success');
                  }}
                  className="px-4 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow flex items-center gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Download Excel Sheet (.xlsx)</span>
                </button>
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
                <Link
                  to="/admin"
                  className="px-6 py-3 rounded-lg bg-[#071A2D] text-white font-bold text-xs sm:text-sm uppercase tracking-wider hover:bg-slate-800 transition-colors shadow"
                >
                  View in Admin Portal
                </Link>
                <Link
                  to="/employers"
                  className="px-6 py-3 rounded-lg bg-slate-100 text-slate-800 font-bold text-xs sm:text-sm uppercase tracking-wider hover:bg-slate-200 transition-colors"
                >
                  Explore Staffing Models
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-6">
              
              {errorMsg && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2.5">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Header inside form */}
              <div className="border-b border-slate-100 pb-4">
                <span className="text-xs font-bold text-[#FF6B00] uppercase tracking-wider">Enterprise Sourcing</span>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-0.5">Submit Staffing Requisition</h3>
                <p className="text-xs text-slate-500 mt-1">Our talent specialists will screen candidates matching your exact criteria.</p>
              </div>

              {/* Row 1: Company Name & Contact Person (Matches Screen 8) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={companyName}
                    onChange={e => setCompanyName(e.target.value)}
                    placeholder="Enter your company name"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-[#FF6B00] outline-none text-xs sm:text-sm text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Contact Person Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={contactPerson}
                    onChange={e => setContactPerson(e.target.value)}
                    placeholder="Enter contact person name"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-[#FF6B00] outline-none text-xs sm:text-sm text-slate-800"
                  />
                </div>
              </div>

              {/* Row 2: Designation & Company Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Designation / Role
                  </label>
                  <input
                    type="text"
                    value={designation}
                    onChange={e => setDesignation(e.target.value)}
                    placeholder="e.g. HR Manager / Talent Director"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-[#FF6B00] outline-none text-xs sm:text-sm text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Company Location / Work Site *
                  </label>
                  <input
                    type="text"
                    required
                    value={companyLocation}
                    onChange={e => setCompanyLocation(e.target.value)}
                    placeholder="e.g. Bangalore, Karnataka"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-[#FF6B00] outline-none text-xs sm:text-sm text-slate-800"
                  />
                </div>
              </div>

              {/* Row 3: Email Address & Phone Number */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Official Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Enter official email address"
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
                    placeholder="Enter direct phone number"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-[#FF6B00] outline-none text-xs sm:text-sm text-slate-800"
                  />
                </div>
              </div>

              {/* Row 4: Required Job Title & Number of Vacancies */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Required Job Title / Skill *
                  </label>
                  <input
                    type="text"
                    required
                    value={jobTitle}
                    onChange={e => setJobTitle(e.target.value)}
                    placeholder="e.g. Mechanical Engineer, Senior React Dev"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-[#FF6B00] outline-none text-xs sm:text-sm text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Number of Vacancies *
                  </label>
                  <input
                    type="number"
                    min={1}
                    required
                    value={vacancies}
                    onChange={e => setVacancies(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-[#FF6B00] outline-none text-xs sm:text-sm text-slate-800"
                  />
                </div>
              </div>

              {/* Row 5: Additional Requirements (Matches Screen 8) */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Additional Requirements / Specific Preferences
                </label>
                <textarea
                  rows={4}
                  value={additionalRequirements}
                  onChange={e => setAdditionalRequirements(e.target.value)}
                  placeholder="Mention target salary ranges, preferred experience years, notice period limits, or specialized certifications..."
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-[#FF6B00] outline-none text-xs sm:text-sm text-slate-800"
                />
              </div>

              {/* Trust checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-[11px] text-slate-600">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Confidential Sourcing</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-emerald-600" />
                  <span>Profile Shortlist in 48 Hours</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <UserCheck className="w-4 h-4 text-emerald-600" />
                  <span>Dedicated Account Lead</span>
                </div>
              </div>

              {/* Orange [Submit Enquiry] button (Matches Screen 8) */}
              <div className="pt-4 border-t border-slate-100">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  id="employer-enquiry-submit-btn"
                  className="w-full sm:w-auto px-10 py-3 rounded-lg bg-[#FF6B00] hover:bg-[#E05E00] text-white font-bold text-sm uppercase tracking-wider shadow-lg transition-all active:scale-95 disabled:opacity-50"
                >
                  {isSubmitting ? 'Submitting Enquiry...' : 'Submit Enquiry'}
                </button>
              </div>

            </form>
          )}

        </div>
      </div>

    </div>
  );
};
