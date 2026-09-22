import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  X, 
  ShieldCheck, 
  Mail, 
  Lock, 
  User, 
  Building, 
  Phone, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight,
  Database,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AuthModal: React.FC = () => {
  const { 
    loginAuthModalOpen, 
    setLoginAuthModalOpen, 
    authModalInitialTab, 
    loginAdmin, 
    loginUser, 
    registerUser, 
    loginWithGoogle, 
    isSupabaseLive,
    showToast 
  } = useApp();

  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'user_login' | 'user_register' | 'admin_login'>('user_login');

  // Form states
  const [adminUsername, setAdminUsername] = useState('Admin@123');
  const [adminPassword, setAdminPassword] = useState('Admin@123');

  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regRole, setRegRole] = useState<'candidate' | 'employer'>('candidate');
  const [regPassword, setRegPassword] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (loginAuthModalOpen) {
      setActiveTab(authModalInitialTab);
      setErrorMessage(null);
    }
  }, [loginAuthModalOpen, authModalInitialTab]);

  if (!loginAuthModalOpen) return null;

  // Handle Admin Login (Strict: Admin@123 / Admin@123)
  const handleAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    setTimeout(() => {
      const res = loginAdmin(adminUsername, adminPassword);
      setIsLoading(false);
      if (res.success) {
        setLoginAuthModalOpen(false);
        navigate('/admin');
      } else {
        setErrorMessage(res.error || 'Invalid credentials. Username and password must be Admin@123.');
      }
    }, 400);
  };

  // Handle User Login (Also handles Admin@123 credentials)
  const handleUserLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    const cleanInput = userEmail.trim();
    const cleanPass = userPassword.trim();

    // Check if logging in with Admin@123
    if (cleanInput.toLowerCase() === 'admin@123' && cleanPass === 'Admin@123') {
      const res = loginAdmin('Admin@123', 'Admin@123');
      setIsLoading(false);
      if (res.success) {
        setLoginAuthModalOpen(false);
        navigate('/admin');
        return;
      } else {
        setErrorMessage(res.error || 'Invalid administrator credentials.');
        return;
      }
    }

    const res = await loginUser(userEmail, userPassword);
    setIsLoading(false);

    if (res.success) {
      setLoginAuthModalOpen(false);
    } else {
      setErrorMessage(res.error || 'Invalid email/username or password.');
    }
  };

  // Handle User Registration
  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    const res = await registerUser({
      name: regName,
      email: regEmail,
      phone: regPhone,
      role: regRole,
      password: regPassword
    });

    setIsLoading(false);

    if (res.success) {
      setLoginAuthModalOpen(false);
    } else {
      setErrorMessage(res.error || 'Failed to create account.');
    }
  };

  // Handle Google Login
  const handleGoogleAuth = async () => {
    setErrorMessage(null);
    setIsLoading(true);

    const res = await loginWithGoogle();
    setIsLoading(false);

    if (res.success) {
      setLoginAuthModalOpen(false);
    } else {
      setErrorMessage(res.error || 'Google login failed.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-200 relative flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header with Navy Branding */}
        <div className="bg-[#071A2D] text-white p-5 relative border-b border-slate-800">
          <button
            onClick={() => setLoginAuthModalOpen(false)}
            className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#FF6B00] text-white font-extrabold flex items-center justify-center text-sm shadow">
              W
            </div>
            <div>
              <h2 className="font-extrabold text-base text-white tracking-tight">
                WorkForce Portal
              </h2>
              <p className="text-[11px] text-slate-300">
                Sign in to your account
              </p>
            </div>
          </div>

          {/* Tab Selection: Clean 2 Tabs (Admin login hidden unless credentials entered) */}
          <div className="grid grid-cols-2 gap-1 mt-4 p-1 bg-slate-900/80 rounded-xl text-xs font-bold">
            <button
              onClick={() => { setActiveTab('user_login'); setErrorMessage(null); }}
              className={`py-2 px-1 rounded-lg text-center transition-all ${
                activeTab === 'user_login' 
                  ? 'bg-white text-slate-900 shadow' 
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setActiveTab('user_register'); setErrorMessage(null); }}
              className={`py-2 px-1 rounded-lg text-center transition-all ${
                activeTab === 'user_register' 
                  ? 'bg-white text-slate-900 shadow' 
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Create Account
            </button>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs">
          
          {/* Error Banner */}
          {errorMessage && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 flex items-start gap-2 animate-shake">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* =========================================================================
              TAB 1: USER SIGN IN (Candidate / Employer / Google / Admin@123)
              ========================================================================= */}
          {activeTab === 'user_login' && (
            <form onSubmit={handleUserLoginSubmit} className="space-y-4">
              
              {/* Google Sign In Button */}
              <button
                type="button"
                onClick={handleGoogleAuth}
                disabled={isLoading}
                id="google-login-btn"
                className="w-full py-2.5 px-4 rounded-xl border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 font-semibold text-slate-800 flex items-center justify-center gap-3 transition-all shadow-sm active:scale-95"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.14z"/>
                  <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.15C3.26 21.36 7.33 24 12 24z"/>
                  <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.14-1.55.38-2.27V6.58H1.24C.45 8.16 0 9.97 0 12s.45 3.84 1.24 5.42l4.04-3.15z"/>
                  <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.24 6.58l4.04 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                </svg>
                <span>Continue with Google</span>
              </button>

              <div className="flex items-center gap-2 my-3">
                <div className="flex-grow h-px bg-slate-200" />
                <span className="text-[10px] text-slate-400 font-semibold uppercase">Or sign in with email / username</span>
                <div className="flex-grow h-px bg-slate-200" />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Email Address or Username</label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={userEmail}
                    onChange={e => setUserEmail(e.target.value)}
                    placeholder="Enter email or username"
                    className="w-full pl-9 pr-3 py-2.5 border border-slate-300 rounded-xl outline-none focus:border-[#FF6B00]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                  <input
                    type="password"
                    required
                    value={userPassword}
                    onChange={e => setUserPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full pl-9 pr-3 py-2.5 border border-slate-300 rounded-xl outline-none focus:border-[#FF6B00]"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                id="user-signin-submit-btn"
                className="w-full py-3 rounded-xl bg-[#071A2D] hover:bg-slate-800 text-white font-bold uppercase tracking-wider text-xs shadow-md transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isLoading ? 'Signing In...' : 'Sign In to Portal'} <ArrowRight className="w-4 h-4" />
              </button>

              <div className="pt-2 text-center text-slate-500">
                Don't have an account yet?{' '}
                <button
                  type="button"
                  onClick={() => setActiveTab('user_register')}
                  className="text-[#FF6B00] font-bold hover:underline"
                >
                  Create one now
                </button>
              </div>
            </form>
          )}

          {/* =========================================================================
              TAB 2: USER REGISTRATION (Create Account)
              ========================================================================= */}
          {activeTab === 'user_register' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-3">
              
              {/* Google Sign In option */}
              <button
                type="button"
                onClick={handleGoogleAuth}
                disabled={isLoading}
                className="w-full py-2.5 px-4 rounded-xl border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 font-semibold text-slate-800 flex items-center justify-center gap-3 transition-all shadow-sm active:scale-95 mb-2"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.14z"/>
                  <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.15C3.26 21.36 7.33 24 12 24z"/>
                  <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.14-1.55.38-2.27V6.58H1.24C.45 8.16 0 9.97 0 12s.45 3.84 1.24 5.42l4.04-3.15z"/>
                  <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.24 6.58l4.04 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                </svg>
                <span>Sign up with Google</span>
              </button>

              <div className="flex items-center gap-2">
                <div className="flex-grow h-px bg-slate-200" />
                <span className="text-[10px] text-slate-400 font-semibold uppercase">Or register with email</span>
                <div className="flex-grow h-px bg-slate-200" />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Full Name *</label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={regName}
                    onChange={e => setRegName(e.target.value)}
                    placeholder="e.g. Ramesh Kumar"
                    className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-xl outline-none focus:border-[#FF6B00]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    value={regEmail}
                    onChange={e => setRegEmail(e.target.value)}
                    placeholder="name@email.com"
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl outline-none focus:border-[#FF6B00]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    value={regPhone}
                    onChange={e => setRegPhone(e.target.value)}
                    placeholder="+91..."
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl outline-none focus:border-[#FF6B00]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">I am registering as *</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setRegRole('candidate')}
                    className={`p-2.5 rounded-xl border text-left flex items-center gap-2 transition-all ${
                      regRole === 'candidate' 
                        ? 'border-[#FF6B00] bg-orange-50/50 text-[#FF6B00] font-bold' 
                        : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    <User className="w-4 h-4" />
                    <div>
                      <div className="text-xs">Job Seeker</div>
                      <div className="text-[10px] opacity-75 font-normal">Candidate</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setRegRole('employer')}
                    className={`p-2.5 rounded-xl border text-left flex items-center gap-2 transition-all ${
                      regRole === 'employer' 
                        ? 'border-[#071A2D] bg-slate-100 text-[#071A2D] font-bold' 
                        : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    <Building className="w-4 h-4" />
                    <div>
                      <div className="text-xs">Employer</div>
                      <div className="text-[10px] opacity-75 font-normal">Hiring Corp</div>
                    </div>
                  </button>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Password *</label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                  <input
                    type="password"
                    required
                    value={regPassword}
                    onChange={e => setRegPassword(e.target.value)}
                    placeholder="Create a password"
                    className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-xl outline-none focus:border-[#FF6B00]"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                id="create-account-submit-btn"
                className="w-full py-3 rounded-xl bg-[#FF6B00] hover:bg-[#E05E00] text-white font-bold uppercase tracking-wider text-xs shadow-md transition-all active:scale-95 disabled:opacity-50"
              >
                {isLoading ? 'Creating Account...' : 'Create Account & Sync'}
              </button>

              <div className="text-center text-slate-500 pt-1">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setActiveTab('user_login')}
                  className="text-[#FF6B00] font-bold hover:underline"
                >
                  Sign In
                </button>
              </div>
            </form>
          )}

          {/* =========================================================================
              TAB 3: ADMIN LOGIN (Username: Admin@123 | Password: Admin@123)
              ========================================================================= */}
          {activeTab === 'admin_login' && (
            <form onSubmit={handleAdminSubmit} className="space-y-4">
              
              {/* Credentials reminder badge */}
              <div className="p-3.5 bg-orange-50 border border-orange-200 rounded-xl space-y-1 text-slate-800">
                <div className="font-bold text-slate-900 flex items-center gap-1.5 text-xs text-[#FF6B00]">
                  <ShieldCheck className="w-4 h-4" /> System Administrator Access
                </div>
                <p className="text-[11px] text-slate-600">
                  To authenticate as the administrator, please use the credentials below:
                </p>
                <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-orange-200 font-mono text-[11px]">
                  <div className="bg-white px-2 py-1 rounded border border-orange-200">
                    <span className="text-slate-400 block text-[9px] uppercase">Username</span>
                    <span className="font-bold text-slate-900">Admin@123</span>
                  </div>
                  <div className="bg-white px-2 py-1 rounded border border-orange-200">
                    <span className="text-slate-400 block text-[9px] uppercase">Password</span>
                    <span className="font-bold text-slate-900">Admin@123</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Administrator Username *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={adminUsername}
                    onChange={e => setAdminUsername(e.target.value)}
                    placeholder="Admin@123"
                    className="w-full pl-9 pr-3 py-2.5 border border-slate-300 rounded-xl outline-none focus:border-[#FF6B00] font-mono text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Administrator Password *
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                  <input
                    type="password"
                    required
                    value={adminPassword}
                    onChange={e => setAdminPassword(e.target.value)}
                    placeholder="Admin@123"
                    className="w-full pl-9 pr-3 py-2.5 border border-slate-300 rounded-xl outline-none focus:border-[#FF6B00] font-mono text-xs"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                id="admin-login-submit-btn"
                className="w-full py-3 rounded-xl bg-[#071A2D] hover:bg-slate-800 text-white font-bold uppercase tracking-wider text-xs shadow-md transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isLoading ? 'Verifying Admin...' : 'Sign In as Administrator'} <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center pt-2 text-slate-500">
                Are you a job candidate or hiring client?{' '}
                <button
                  type="button"
                  onClick={() => setActiveTab('user_login')}
                  className="text-[#FF6B00] font-bold hover:underline"
                >
                  Candidate / Employer Login
                </button>
              </div>
            </form>
          )}

        </div>

      </div>
    </div>
  );
};
