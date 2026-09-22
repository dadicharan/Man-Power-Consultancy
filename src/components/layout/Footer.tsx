import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Linkedin, 
  Twitter, 
  Facebook, 
  Instagram, 
  Youtube, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer id="main-footer" className="bg-[#04111F] text-slate-300 border-t border-slate-800/80 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3 group inline-flex">
              <div className="w-10 h-10 rounded-lg bg-[#FF6B00] flex items-center justify-center text-white font-black text-xl shadow-md">
                W
              </div>
              <div>
                <div className="font-extrabold text-xl text-white tracking-tight leading-none">
                  WorkForce
                </div>
              </div>
            </Link>
            
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              WorkForce is a premier recruitment and staffing solutions organization, connecting high-caliber talent with industry-leading enterprises across IT, Engineering, Healthcare, and Corporate sectors.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noreferrer" 
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-[#FF6B00] flex items-center justify-center text-slate-300 hover:text-white transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noreferrer" 
                aria-label="Twitter"
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-[#FF6B00] flex items-center justify-center text-slate-300 hover:text-white transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer" 
                aria-label="Facebook"
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-[#FF6B00] flex items-center justify-center text-slate-300 hover:text-white transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer" 
                aria-label="Instagram"
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-[#FF6B00] flex items-center justify-center text-slate-300 hover:text-white transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noreferrer" 
                aria-label="YouTube"
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-[#FF6B00] flex items-center justify-center text-slate-300 hover:text-white transition-colors"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase border-b border-slate-800 pb-2">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/" className="hover:text-[#FF6B00] transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-slate-500" /> Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#FF6B00] transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-slate-500" /> About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-[#FF6B00] transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-slate-500" /> Staffing Services
                </Link>
              </li>
              <li>
                <Link to="/jobs" className="hover:text-[#FF6B00] transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-slate-500" /> Job Openings
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#FF6B00] transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-slate-500" /> Contact Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Candidates & Employers */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase border-b border-slate-800 pb-2">
              For Portals
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/candidates/register" className="hover:text-[#FF6B00] transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-slate-500" /> Candidate Registration
                </Link>
              </li>
              <li>
                <Link to="/candidate/portal" className="hover:text-[#FF6B00] transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-slate-500" /> Candidate Dashboard
                </Link>
              </li>
              <li>
                <Link to="/employers" className="hover:text-[#FF6B00] transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-slate-500" /> Employer Solutions
                </Link>
              </li>
              <li>
                <Link to="/employer/enquiry" className="hover:text-[#FF6B00] transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-slate-500" /> Submit Hiring Enquiry
                </Link>
              </li>
              <li>
                <Link to="/employer/portal" className="hover:text-[#FF6B00] transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-slate-500" /> Employer Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase border-b border-slate-800 pb-2">
              Headquarters
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#FF6B00] shrink-0 mt-0.5" />
                <span>Visakhapatnam, Andhra Pradesh - 530026, India</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#FF6B00] shrink-0" />
                <a href="tel:+916309116432" className="hover:text-[#FF6B00] transition-colors">+91 6309116432</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#FF6B00] shrink-0" />
                <a href="mailto:info@workforce.com" className="hover:text-[#FF6B00] transition-colors">info@workforce.com</a>
              </li>
              <li className="pt-2">
                <div className="inline-block px-3 py-1 bg-slate-900 border border-slate-800 rounded text-[11px] text-slate-400">
                  Business Hours: Mon - Sat: 9:00 AM - 6:30 PM
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} WorkForce. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-slate-300 transition-colors">Terms of Service</Link>
            <Link to="/contact" className="hover:text-slate-300 transition-colors">Corporate Support</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};
