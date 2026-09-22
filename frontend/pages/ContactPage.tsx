import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Building,
  ShieldCheck,
  MessageSquare,
  FileText
} from 'lucide-react';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { useApp } from '../context/AppContext';

export const ContactPage: React.FC = () => {
  const { showToast } = useApp();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('General Staffing Enquiry');
  const [message, setMessage] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !phone.trim() || !message.trim()) {
      setErrorMsg('Please fill in all mandatory fields marked with *.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg(null);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
      showToast('Thank you! Your message has been sent to our consulting desk.', 'success');
    }, 500);
  };

  const handleReset = () => {
    setFullName('');
    setEmail('');
    setPhone('');
    setMessage('');
    setIsSent(false);
  };

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 pb-20">
      
      {/* Breadcrumb Header */}
      <Breadcrumb
        items={[{ label: 'Contact Us' }]}
        title="Contact Us"
        subtitle="We are here to help. Reach out to us for any queries or customized manpower assistance."
        bannerImage="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80"
        badge="Get in Touch"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* =========================================================================
              LEFT COLUMN: CONTACT INFORMATION (Matches Screen 9)
              Address, Phone, Email, Working Hours, Map Card
              ========================================================================= */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-md">
              <span className="text-xs font-bold uppercase tracking-wider text-[#FF6B00]">
                WorkForce Manpower HQ
              </span>
              <h3 className="text-2xl font-bold text-slate-900 mt-1 mb-6">
                Contact Information
              </h3>

              <div className="space-y-6 text-sm">
                
                {/* Office Address */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#FF6B00] flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Registered Office</h4>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      Gajuwaka, Visakhapatnam, Andhra Pradesh - 530026, India
                    </p>
                  </div>
                </div>

                {/* Direct Phone Numbers */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#FF6B00] flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Phone Lines</h4>
                    <p className="text-xs text-slate-600 mt-1">
                      <a href="tel:+916309116432" className="hover:text-[#FF6B00] font-medium">+91 6309116432</a> (Direct & Candidate Desk)
                    </p>
                  </div>
                </div>

                {/* Email Support */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#FF6B00] flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Email Address</h4>
                    <p className="text-xs text-slate-600 mt-1">
                      <a href="mailto:info@workforce.com" className="hover:text-[#FF6B00] font-medium">info@workforce.com</a>
                    </p>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#FF6B00] flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Consultancy Hours</h4>
                    <p className="text-xs text-slate-600 mt-1">
                      Monday - Saturday: 9:00 AM - 7:00 PM IST<br />
                      Sunday: Closed (Emergency on-call only)
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Simulated Location / Branch Network Card */}
            <div className="bg-[#071A2D] text-white rounded-2xl p-6 border border-slate-800 shadow-md">
              <span className="text-[10px] font-bold text-[#FF6B00] uppercase tracking-wider">Pan-India Presence</span>
              <h4 className="text-base font-bold mt-1">Regional Branch Offices</h4>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Hyderabad • Chennai • Mumbai • Pune • Delhi NCR
              </p>
              <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Licensed under Ministry of Labor & Employment</span>
              </div>
            </div>

          </div>

          {/* =========================================================================
              RIGHT COLUMN: SEND US A MESSAGE FORM (Matches Screen 9)
              ========================================================================= */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-10 shadow-md">
              
              {isSent ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">Message Dispatched!</h3>
                  <p className="text-sm text-slate-600 max-w-md mx-auto">
                    Thank you, {fullName}. Our recruitment communications team will review your inquiry and respond within 24 hours.
                  </p>
                  
                  <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        const contactObj = {
                          id: `msg-${Date.now()}`,
                          name: fullName,
                          email,
                          phone,
                          subject,
                          message,
                          status: 'Unread' as const,
                          createdAt: new Date().toLocaleDateString('en-GB')
                        };
                        import('../lib/excelExport').then(m => m.exportContactToExcel(contactObj));
                        showToast('Contact message exported to Excel (.xlsx)!', 'success');
                      }}
                      className="px-4 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow flex items-center gap-1.5"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Download Excel Sheet (.xlsx)</span>
                    </button>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={handleReset}
                      className="px-6 py-2.5 rounded-lg bg-[#071A2D] text-white font-bold text-xs uppercase tracking-wider shadow hover:bg-slate-800"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="border-b border-slate-100 pb-3">
                    <span className="text-xs font-bold text-[#FF6B00] uppercase tracking-wider">Direct Communication</span>
                    <h3 className="text-2xl font-bold text-slate-900 mt-0.5">Send Us a Message</h3>
                    <p className="text-xs text-slate-500 mt-1">Whether inquiring about talent acquisition or seeking a position, we're ready to assist.</p>
                  </div>

                  {errorMsg && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 flex items-center gap-2">
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
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        placeholder="Enter your contact number"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-[#FF6B00] outline-none text-xs sm:text-sm text-slate-800"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Subject
                      </label>
                      <select
                        value={subject}
                        onChange={e => setSubject(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-[#FF6B00] outline-none text-xs sm:text-sm text-slate-800 bg-white"
                      >
                        <option value="General Staffing Enquiry">General Staffing Enquiry</option>
                        <option value="Employer Hiring Requisition">Employer Hiring Requisition</option>
                        <option value="Candidate Application Status">Candidate Application Status</option>
                        <option value="Corporate Partnership">Corporate Partnership</option>
                        <option value="Billing & Invoicing">Billing & Invoicing</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Message *
                    </label>
                    <textarea
                      rows={5}
                      required
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      placeholder="Please describe your workforce requirement, query, or candidate feedback in detail..."
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-[#FF6B00] outline-none text-xs sm:text-sm text-slate-800"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      id="contact-form-submit-btn"
                      className="w-full sm:w-auto px-10 py-3 rounded-lg bg-[#FF6B00] hover:bg-[#E05E00] text-white font-bold text-sm uppercase tracking-wider shadow-md transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'} <Send className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              )}

            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
