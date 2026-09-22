import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Menu, 
  X, 
  Briefcase, 
  ChevronDown, 
  User, 
  Building, 
  ShieldCheck, 
  Bell, 
  CheckCircle2, 
  LogIn,
  LogOut,
  Sparkles,
  Smartphone,
  Tablet
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const { 
    currentRole, 
    currentUser, 
    setCurrentRole, 
    logout,
    openLoginModal,
    notifications, 
    markNotificationRead, 
    markAllNotificationsRead 
  } = useApp();

  const isGuest = !currentUser || currentUser.role === 'guest';
  const activeNotifications = isGuest ? [] : notifications;
  const unreadCount = isGuest ? 0 : activeNotifications.filter(n => !n.read).length;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile/tablet menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setRoleDropdownOpen(false);
    setNotifDropdownOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Jobs', path: '/jobs' },
    { name: 'Candidates', path: '/candidates' },
    { name: 'Employers', path: '/employers' },
    { name: 'Contact', path: '/contact' },
  ];

  const handleRoleSelect = (role: UserRole) => {
    setCurrentRole(role);
    setRoleDropdownOpen(false);
    if (role === 'admin') {
      navigate('/admin');
    } else if (role === 'candidate') {
      navigate('/candidate/portal');
    } else if (role === 'employer') {
      navigate('/employer/portal');
    }
  };

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/' || location.pathname === '';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <header 
        id="main-header"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-[#071A2D]/95 backdrop-blur-md shadow-lg py-2.5' 
            : 'bg-[#071A2D] py-3.5'
        } border-b border-slate-800 text-white`}
      >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Brand Logo */}
          <Link to="/" id="brand-logo" className="flex items-center gap-2.5 sm:gap-3 group shrink-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-[#FF6B00] to-[#E05300] flex items-center justify-center text-white font-black text-lg sm:text-xl shadow-md shadow-orange-950/40 group-hover:scale-105 transition-transform">
              <span className="tracking-tighter">W</span>
            </div>
            <div>
              <div className="font-extrabold text-base sm:text-xl tracking-tight leading-tight flex items-center gap-1 text-white">
                WorkForce
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]"></span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation Links (visible on large desktop xl) */}
          <nav className="hidden xl:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  id={`nav-link-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className={`px-3 py-1.5 rounded-md text-sm font-semibold transition-colors relative ${
                    active 
                      ? 'text-[#FF6B00]' 
                      : 'text-slate-200 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  {link.name}
                  {active && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#FF6B00] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Area (Desktop & Tablet) */}
          <div className="flex items-center gap-2 sm:gap-3">

            {/* Notification Bell */}
            <div className="relative">
              <button
                id="header-notification-btn"
                onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
                aria-label="Notifications"
                className="relative p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/70 transition-colors"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-[#FF6B00] text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Popover */}
              {notifDropdownOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-[#0A2238] border border-slate-700/80 rounded-xl shadow-2xl overflow-hidden z-50 text-slate-100 animate-fadeIn">
                  <div className="p-3 bg-[#071A2D] border-b border-slate-700/80 flex items-center justify-between">
                    <span className="font-bold text-xs uppercase tracking-wider text-slate-300">
                      Notifications ({unreadCount})
                    </span>
                    {unreadCount > 0 && (
                      <button 
                        onClick={markAllNotificationsRead} 
                        className="text-[11px] text-[#FF6B00] hover:underline font-semibold"
                      >
                        Mark all read
                      </button>
                    )}
                  </div>
                  <div className="max-h-72 overflow-y-auto divide-y divide-slate-800">
                    {isGuest ? (
                      <div className="p-5 text-center text-xs text-slate-400">
                        <Bell className="w-6 h-6 text-slate-500 mx-auto mb-2 opacity-50" />
                        <p className="font-semibold text-slate-200">0 Notifications</p>
                        <p className="mt-1 text-slate-400 text-[11px] leading-relaxed">
                          Sign in to your account to view personalized notifications and hiring updates.
                        </p>
                        <button 
                          type="button" 
                          onClick={() => { setNotifDropdownOpen(false); openLoginModal('user_login'); }}
                          className="mt-3 px-3.5 py-1.5 rounded-lg bg-[#FF6B00] text-white text-xs font-bold hover:bg-[#E05E00] transition-colors"
                        >
                          Sign In
                        </button>
                      </div>
                    ) : activeNotifications.length === 0 ? (
                      <div className="p-4 text-center text-xs text-slate-400">No new notifications</div>
                    ) : (
                      activeNotifications.slice(0, 5).map(n => (
                        <div 
                          key={n.id} 
                          onClick={() => {
                            markNotificationRead(n.id);
                            if (n.link) navigate(n.link);
                            setNotifDropdownOpen(false);
                          }}
                          className={`p-3 text-xs cursor-pointer hover:bg-slate-800/80 transition-colors ${
                            !n.read ? 'bg-slate-800/40 border-l-2 border-[#FF6B00]' : ''
                          }`}
                        >
                          <div className="font-semibold text-white flex items-center justify-between">
                            <span>{n.title}</span>
                            <span className="text-[10px] text-slate-400 font-normal">{n.timestamp}</span>
                          </div>
                          <p className="text-slate-300 mt-1 line-clamp-2">{n.message}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* User Login / Profile Component (PRESENT ON EVERY VIEW) */}
            {currentUser.role !== 'guest' ? (
              <div className="relative">
                <button
                  id="user-profile-menu-btn"
                  onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                  className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-lg bg-slate-800/90 border border-slate-700 hover:border-slate-600 text-slate-200 hover:text-white transition-all text-xs"
                >
                  <div className="w-6 h-6 rounded-full bg-[#FF6B00] text-white flex items-center justify-center font-bold text-xs">
                    {currentUser.name ? currentUser.name.charAt(0) : 'U'}
                  </div>
                  <div className="text-left hidden sm:block max-w-[110px] truncate">
                    <div className="font-bold text-[11px] truncate leading-tight text-white">{currentUser.name}</div>
                    <div className="text-[9px] uppercase tracking-wider text-orange-400 font-semibold">{currentUser.role}</div>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {roleDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-[#09223A] border border-slate-700 rounded-xl shadow-2xl py-2 z-50 text-xs animate-fadeIn">
                    <div className="px-3 py-2 border-b border-slate-800">
                      <div className="font-bold text-white text-xs">{currentUser.name}</div>
                      <div className="text-slate-400 text-[10px] truncate">{currentUser.email || 'Signed In'}</div>
                      <div className="mt-1 inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-orange-500/20 text-orange-400 border border-orange-500/30">
                        {currentUser.role} Mode
                      </div>
                    </div>

                    <div className="py-1">
                      {currentUser.role === 'admin' ? (
                        <Link 
                          to="/admin" 
                          onClick={() => setRoleDropdownOpen(false)}
                          className="px-3 py-2 hover:bg-slate-800 flex items-center gap-2 text-orange-300 font-semibold"
                        >
                          <ShieldCheck className="w-4 h-4 text-orange-400" /> Admin Dashboard (ATS)
                        </Link>
                      ) : currentUser.role === 'candidate' ? (
                        <Link 
                          to="/candidate/portal" 
                          onClick={() => setRoleDropdownOpen(false)}
                          className="px-3 py-2 hover:bg-slate-800 flex items-center gap-2 text-slate-200"
                        >
                          <User className="w-4 h-4 text-blue-400" /> Candidate Portal
                        </Link>
                      ) : (
                        <Link 
                          to="/employer/portal" 
                          onClick={() => setRoleDropdownOpen(false)}
                          className="px-3 py-2 hover:bg-slate-800 flex items-center gap-2 text-slate-200"
                        >
                          <Building className="w-4 h-4 text-emerald-400" /> Employer Portal
                        </Link>
                      )}

                      <button
                        onClick={() => openLoginModal('user_login')}
                        className="w-full text-left px-3 py-2 hover:bg-slate-800 flex items-center gap-2 text-slate-300"
                      >
                        <User className="w-4 h-4 text-slate-400" /> Switch / Add Account
                      </button>
                    </div>

                    <div className="border-t border-slate-800 pt-1">
                      <button
                        onClick={() => { logout(); setRoleDropdownOpen(false); }}
                        className="w-full text-left px-3 py-2 hover:bg-red-950/40 text-red-300 flex items-center gap-2 font-semibold"
                      >
                        <LogOut className="w-4 h-4 text-red-400" /> Log Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              // Not logged in: Show clean Login button (Admin login hidden unless logged in with Admin@123)
              <div className="flex items-center gap-1.5 sm:gap-2">
                <button
                  id="header-login-btn"
                  onClick={() => openLoginModal('user_login')}
                  className="px-3.5 sm:px-4 py-1.5 rounded-lg text-xs font-bold bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 flex items-center gap-1.5 transition-all active:scale-95 shadow-sm"
                >
                  <LogIn className="w-3.5 h-3.5 text-[#FF6B00]" />
                  <span>Login</span>
                </button>
              </div>
            )}

            {/* Get Started CTA */}
            <Link
              to="/candidates/register"
              id="header-cta-btn"
              className="hidden sm:flex px-4 py-1.5 sm:py-2 rounded-md font-bold text-xs sm:text-sm bg-[#FF6B00] hover:bg-[#E05E00] active:scale-95 text-white shadow-md shadow-orange-950/30 transition-all items-center gap-1.5"
            >
              Get Started
            </Link>

            {/* MOBILE & TABLET TOGGLE BUTTON (PERFECTLY VISIBLE ON < xl: TABLET & MOBILE) */}
            <div className="flex xl:hidden items-center">
              <button
                id="mobile-tablet-nav-toggle-btn"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle Navigation Menu"
                className="p-2 sm:p-2.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 transition-colors flex items-center gap-1.5"
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5 text-orange-400" />
                ) : (
                  <>
                    <Menu className="w-5 h-5 text-white" />
                    <span className="text-[11px] font-semibold text-slate-300 hidden md:inline">Menu</span>
                  </>
                )}
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* MOBILE & TABLET FULL NAVIGATION DRAWER (< xl) */}
      {mobileMenuOpen && (
        <div 
          id="mobile-tablet-drawer"
          className="xl:hidden bg-[#071A2D] border-b border-slate-800 px-4 sm:px-6 pt-3 pb-6 space-y-4 shadow-2xl animate-fadeIn"
        >
          {/* Quick status bar on tablet/mobile */}
          <div className="flex items-center justify-between p-2.5 bg-slate-900/90 rounded-xl border border-slate-800 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-slate-300">
                User Status: <strong className="text-white capitalize">{currentUser.role}</strong>
              </span>
            </div>

            {currentUser.role === 'guest' ? (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => { openLoginModal('user_login'); setMobileMenuOpen(false); }}
                  className="px-3 py-1.5 rounded-lg bg-[#FF6B00] text-white font-bold text-xs shadow"
                >
                  Sign In / Register
                </button>
              </div>
            ) : (
              <button
                onClick={() => { logout(); setMobileMenuOpen(false); }}
                className="text-red-400 font-semibold text-[11px] hover:underline"
              >
                Sign Out
              </button>
            )}
          </div>

          {/* Navigation Links Grid (Tablet: 4 cols, Mobile: 2 cols) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 border-b border-slate-800 pb-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-between transition-all ${
                  isActive(link.path) 
                    ? 'text-[#FF6B00] bg-orange-950/40 border border-orange-800/50' 
                    : 'text-slate-200 hover:text-white bg-slate-800/40 hover:bg-slate-800'
                }`}
              >
                <span>{link.name}</span>
                {isActive(link.path) && <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]" />}
              </Link>
            ))}
          </div>

          {/* Quick Action Portals */}
          <div className={`grid grid-cols-1 ${currentRole === 'admin' ? 'sm:grid-cols-3' : 'sm:grid-cols-2'} gap-2 text-xs`}>
            <Link 
              to="/candidate/portal" 
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 bg-slate-800/60 hover:bg-slate-800 rounded-xl border border-slate-700 flex items-center gap-2.5 text-slate-200"
            >
              <User className="w-4 h-4 text-blue-400 shrink-0" />
              <div>
                <div className="font-bold text-white">Candidate Portal</div>
                <div className="text-[10px] text-slate-400">Search & track jobs</div>
              </div>
            </Link>

            <Link 
              to="/employer/portal" 
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 bg-slate-800/60 hover:bg-slate-800 rounded-xl border border-slate-700 flex items-center gap-2.5 text-slate-200"
            >
              <Building className="w-4 h-4 text-emerald-400 shrink-0" />
              <div>
                <div className="font-bold text-white">Employer Portal</div>
                <div className="text-[10px] text-slate-400">Post jobs & enquiries</div>
              </div>
            </Link>

            {/* ONLY DISPLAY ADMIN ACCESS IN MENU WHEN USER HAS LOGGED IN WITH ADMIN@123 */}
            {currentRole === 'admin' && (
              <Link
                to="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="p-3 bg-orange-950/40 hover:bg-orange-900/50 rounded-xl border border-orange-800/60 flex items-center gap-2.5 text-orange-200"
              >
                <ShieldCheck className="w-4 h-4 text-orange-400 shrink-0" />
                <div>
                  <div className="font-bold text-white flex items-center gap-1">
                    Admin Console
                  </div>
                  <div className="text-[10px] text-orange-300/80">Recruiter ATS & metrics</div>
                </div>
              </Link>
            )}
          </div>

          {/* Direct CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 pt-1">
            <Link
              to="/candidates/register"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 rounded-xl text-center font-bold text-sm bg-[#FF6B00] text-white shadow-md hover:bg-[#E05E00]"
            >
              Register as Candidate (Instant Resume Upload)
            </Link>
            <Link
              to="/employers"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 rounded-xl text-center font-bold text-sm bg-slate-800 text-slate-200 hover:text-white border border-slate-700"
            >
              Post Requirement (Hiring Enquiry)
            </Link>
          </div>
        </div>
      )}
    </header>
    {/* Spacer to guarantee underlying content doesn't get obscured by locked header */}
    <div className="h-[64px] sm:h-[72px] shrink-0" aria-hidden="true" />
  </>
  );
};
