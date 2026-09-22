import React, { useState } from 'react';
import { X, Building, Mail, Phone, User, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const EnquiryModal: React.FC = () => {
  const { enquiryModalOpen, setEnquiryModalOpen, submitEmployerEnquiry, showToast } = useApp();

  const [companyName, setCompanyName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [vacancies, setVacancies] = useState<number>(5);
  const [additionalRequirements, setAdditionalRequirements] = useState('');
  const [companyLocation, setCompanyLocation] = useState('Bangalore');
  const [submitted, setSubmitted] = useState(false);

  if (!enquiryModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitEmployerEnquiry({
      companyName,
      contactPerson,
      designation: 'Hiring Manager',
      email,
      phone,
      companyLocation,
      jobTitle,
      vacancies,
      additionalRequirements
    });
    setSubmitted(true);
    showToast('Consultation request received! Our recruitment consultant will reach out within 2 hours.', 'success');
  };

  const handleClose = () => {
    setEnquiryModalOpen(false);
    setSubmitted(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 text-slate-900 relative"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">Request Dispatched!</h3>
            <p className="text-sm text-slate-600 max-w-sm mx-auto">
              Thank you, {contactPerson}. Our senior talent consultant will call you at {phone} to customize your staffing plan.
            </p>
            <button
              onClick={handleClose}
              className="px-6 py-2.5 rounded-lg bg-[#071A2D] text-white font-bold text-sm hover:bg-slate-800 transition-colors shadow"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <span className="text-[11px] font-bold text-[#FF6B00] uppercase tracking-wider">Fast Track Hiring</span>
              <h3 className="text-xl font-bold text-slate-900">Request Manpower Consultation</h3>
              <p className="text-xs text-slate-500 mt-0.5">Let our workforce experts tailor a solution for your exact requirements.</p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Company Name *</label>
                <input
                  type="text"
                  required
                  value={companyName}
                  onChange={e => setCompanyName(e.target.value)}
                  placeholder="e.g. Apex Tech Ltd"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:border-[#FF6B00] outline-none"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Contact Person *</label>
                <input
                  type="text"
                  required
                  value={contactPerson}
                  onChange={e => setContactPerson(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:border-[#FF6B00] outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="rahul@company.com"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:border-[#FF6B00] outline-none"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:border-[#FF6B00] outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Role / Job Title Needed *</label>
                <input
                  type="text"
                  required
                  value={jobTitle}
                  onChange={e => setJobTitle(e.target.value)}
                  placeholder="e.g. Mechanical Engineer"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:border-[#FF6B00] outline-none"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Number of Vacancies *</label>
                <input
                  type="number"
                  min={1}
                  required
                  value={vacancies}
                  onChange={e => setVacancies(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:border-[#FF6B00] outline-none"
                />
              </div>
            </div>

            <div className="text-xs">
              <label className="block font-semibold text-slate-700 mb-1">Specific Requirements or Comments</label>
              <textarea
                rows={2}
                value={additionalRequirements}
                onChange={e => setAdditionalRequirements(e.target.value)}
                placeholder="Experience level, budget, or preferred location..."
                className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:border-[#FF6B00] outline-none"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-lg bg-[#FF6B00] hover:bg-[#E05E00] text-white text-xs font-bold shadow transition-all active:scale-95"
              >
                Submit Consultation Request
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
