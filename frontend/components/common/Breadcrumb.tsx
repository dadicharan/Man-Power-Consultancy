import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbProps {
  items: { label: string; path?: string }[];
  title?: string;
  subtitle?: string;
  bannerImage?: string;
  badge?: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ 
  items, 
  title, 
  subtitle, 
  bannerImage, 
  badge 
}) => {
  return (
    <div className="relative bg-[#071A2D] text-white py-12 md:py-16 overflow-hidden border-b border-slate-800">
      {/* Optional Background Image Overlay */}
      {bannerImage && (
        <div className="absolute inset-0 z-0">
          <img 
            src={bannerImage} 
            alt={title || 'Header banner'} 
            className="w-full h-full object-cover object-center opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#071A2D] via-[#071A2D]/90 to-transparent" />
        </div>
      )}

      {/* Decorative Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293710_1px,transparent_1px),linear-gradient(to_bottom,#1f293710_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb links */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-400 font-medium mb-3">
          <Link to="/" className="hover:text-white flex items-center gap-1 transition-colors">
            <Home className="w-3.5 h-3.5 text-slate-400" />
            <span>Home</span>
          </Link>
          {items.map((item, idx) => (
            <React.Fragment key={idx}>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
              {item.path ? (
                <Link to={item.path} className="hover:text-white transition-colors">
                  {item.label}
                </Link>
              ) : (
                <span className="text-[#FF6B00] font-semibold">{item.label}</span>
              )}
            </React.Fragment>
          ))}
        </nav>

        {/* Title and Subtitle */}
        {title && (
          <div className="max-w-2xl">
            {badge && (
              <div className="inline-block px-3 py-1 bg-orange-500/10 border border-orange-500/30 text-[#FF6B00] text-xs font-bold rounded-full mb-3 uppercase tracking-wider">
                {badge}
              </div>
            )}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
