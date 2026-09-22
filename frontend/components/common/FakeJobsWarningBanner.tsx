import React, { useState } from 'react';
import { 
  ShieldAlert, 
  CheckCircle2, 
  AlertTriangle, 
  PhoneCall, 
  Mail, 
  ChevronDown, 
  ChevronUp, 
  BadgeCheck,
  Lock
} from 'lucide-react';

interface FakeJobsWarningBannerProps {
  compact?: boolean;
}

export const FakeJobsWarningBanner: React.FC<FakeJobsWarningBannerProps> = ({ compact = false }) => {
  const [expanded, setExpanded] = useState(!compact);

  return (
    <div className="w-full bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 border-2 border-amber-300/80 rounded-2xl p-5 sm:p-6 shadow-sm">
      
      {/* Top Advisory Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-md">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-200/80 text-amber-900 text-[10px] font-extrabold uppercase tracking-wider">
                Official Candidate Advisory
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full">
                <BadgeCheck className="w-3.5 h-3.5" /> 100% Free Placement
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-extrabold text-slate-900 mt-0.5">
              Beware of Fake Job Offers & Recruitment Fraud
            </h3>
            <p className="text-xs text-slate-700 mt-0.5">
              WorkForce strictly follows ethical recruitment practices. We <span className="font-bold underline text-amber-900">NEVER</span> demand money or deposits from job seekers.
            </p>
          </div>
        </div>

        {compact && (
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="self-start sm:self-center px-3 py-1.5 rounded-lg bg-white border border-amber-300 text-amber-900 text-xs font-bold hover:bg-amber-100 transition-colors inline-flex items-center gap-1 shrink-0"
          >
            {expanded ? (
              <><span>Hide Safety Rules</span> <ChevronUp className="w-3.5 h-3.5" /></>
            ) : (
              <><span>Safety Checklist</span> <ChevronDown className="w-3.5 h-3.5" /></>
            )}
          </button>
        )}

      </div>

      {/* Expanded Security Highlights */}
      {expanded && (
        <div className="mt-5 pt-5 border-t border-amber-200/90 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          
          {/* Pillar 1 */}
          <div className="bg-white/90 backdrop-blur rounded-xl p-3.5 border border-amber-200 flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center gap-2 font-bold text-slate-900 mb-1.5">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                Zero Registration Fees
              </div>
              <p className="text-slate-600 leading-relaxed text-[11px]">
                WorkForce never charges any fee for registration, resume circulation, scheduling interviews, or issuing offer letters. All placements are completely free for candidates.
              </p>
            </div>
            <div className="mt-2 text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-1 rounded">
              No security deposits or training charges
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="bg-white/90 backdrop-blur rounded-xl p-3.5 border border-amber-200 flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center gap-2 font-bold text-slate-900 mb-1.5">
                <div className="w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-3.5 h-3.5" />
                </div>
                Red Flags to Identify Scams
              </div>
              <p className="text-slate-600 leading-relaxed text-[11px]">
                Never pay anyone asking for money via UPI/QR codes for "interview processing", "laptop guarantee", or "background check fees". We never ask for OTPs or banking PINs.
              </p>
            </div>
            <div className="mt-2 text-[10px] font-semibold text-red-800 bg-red-50 px-2 py-1 rounded">
              Reject offers asking for money on WhatsApp/Telegram
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="bg-white/90 backdrop-blur rounded-xl p-3.5 border border-amber-200 flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center gap-2 font-bold text-slate-900 mb-1.5">
                <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                  <Lock className="w-3.5 h-3.5" />
                </div>
                Official Verification Channel
              </div>
              <p className="text-slate-600 leading-relaxed text-[11px]">
                Legitimate emails are sent only from our verified domain <span className="font-semibold text-slate-800">@workforce.com</span>. Verify any offer letter directly with our Visakhapatnam headquarters.
              </p>
            </div>
            <div className="mt-2 pt-1 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-800">
              <a href="tel:+919182736423" className="text-amber-800 hover:underline flex items-center gap-1">
                <PhoneCall className="w-3 h-3 text-amber-700" /> +91 9182736423
              </a>
              <a href="mailto:info@workforce.com" className="text-amber-800 hover:underline flex items-center gap-1">
                <Mail className="w-3 h-3 text-amber-700" /> info@workforce.com
              </a>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
