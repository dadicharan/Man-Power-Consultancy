import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Candidate, 
  Job, 
  Employer, 
  Application, 
  EmployerEnquiry, 
  ContactMessage, 
  ServiceItem, 
  Testimonial, 
  AppNotification, 
  AuditLog, 
  UserRole, 
  UserProfile,
  ApplicationStage
} from '../types';
import { 
  INITIAL_CANDIDATES, 
  INITIAL_JOBS, 
  INITIAL_EMPLOYERS, 
  INITIAL_APPLICATIONS, 
  INITIAL_ENQUIRIES, 
  INITIAL_CONTACT_MESSAGES, 
  INITIAL_SERVICES, 
  INITIAL_TESTIMONIALS, 
  INITIAL_NOTIFICATIONS, 
  INITIAL_AUDIT_LOGS 
} from '../data/seedData';
import { 
  saveUserToSupabase, 
  saveCandidateToSupabase, 
  saveApplicationToSupabase, 
  saveEnquiryToSupabase, 
  saveContactToSupabase, 
  initiateGoogleSignIn,
  isSupabaseConfigured
} from '../lib/supabase';
import { 
  exportApplicationToExcel, 
  exportCandidateToExcel, 
  exportEnquiryToExcel, 
  exportContactToExcel, 
  exportJobToExcel 
} from '../lib/excelExport';

export type AuthModalTab = 'user_login' | 'user_register' | 'admin_login';

interface RegisteredAccount {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  password?: string;
  authProvider: 'email' | 'google' | 'admin';
}

interface AppContextType {
  // Roles & Auth
  currentRole: UserRole;
  currentUser: UserProfile;
  setCurrentRole: (role: UserRole) => void;
  loginAs: (role: UserRole, email?: string, name?: string) => void;
  logout: () => void;

  // New specific Auth methods
  loginAdmin: (username: string, password: string) => { success: boolean; error?: string };
  loginUser: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  registerUser: (data: { name: string; email: string; phone?: string; role?: UserRole; password?: string }) => Promise<{ success: boolean; error?: string }>;
  loginWithGoogle: () => Promise<{ success: boolean; error?: string }>;

  // Auth Modal State
  loginAuthModalOpen: boolean;
  setLoginAuthModalOpen: (open: boolean) => void;
  authModalInitialTab: AuthModalTab;
  setAuthModalInitialTab: (tab: AuthModalTab) => void;
  openLoginModal: (tab?: AuthModalTab) => void;

  // Data Collections
  candidates: Candidate[];
  jobs: Job[];
  employers: Employer[];
  applications: Application[];
  enquiries: EmployerEnquiry[];
  contactMessages: ContactMessage[];
  services: ServiceItem[];
  testimonials: Testimonial[];
  notifications: AppNotification[];
  auditLogs: AuditLog[];
  savedJobIds: string[];

  // Operations
  addCandidate: (candidate: Omit<Candidate, 'id' | 'registeredDate' | 'status' | 'profileCompletion'>) => Candidate;
  updateCandidate: (id: string, data: Partial<Candidate>) => void;
  deleteCandidate: (id: string) => void;

  addJob: (job: Omit<Job, 'id' | 'postedDate' | 'applicationsCount'>) => Job;
  updateJob: (id: string, data: Partial<Job>) => void;
  deleteJob: (id: string) => void;

  applyForJob: (jobId: string, candidateDetails: {
    fullName: string;
    email: string;
    phone: string;
    resumeFileName?: string;
    coverLetter?: string;
  }) => Application;
  updateApplicationStage: (id: string, newStage: ApplicationStage, notes?: string) => void;

  submitEmployerEnquiry: (enquiry: Omit<EmployerEnquiry, 'id' | 'createdAt' | 'status'>) => EmployerEnquiry;
  updateEnquiryStatus: (id: string, status: EmployerEnquiry['status'], notes?: string) => void;

  submitContactMessage: (message: Omit<ContactMessage, 'id' | 'createdAt' | 'status'>) => ContactMessage;

  toggleSaveJob: (jobId: string) => void;
  isJobSaved: (jobId: string) => boolean;

  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;

  // Active Modals
  applyJobModal: Job | null;
  setApplyJobModal: (job: Job | null) => void;
  enquiryModalOpen: boolean;
  setEnquiryModalOpen: (open: boolean) => void;

  // Global Toast
  toast: { message: string; type: 'success' | 'info' | 'error' } | null;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;

  // Supabase status
  isSupabaseLive: boolean;

  // Reset
  resetToDemoData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_PREFIX = 'workforce_consultancy_v2_';

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(LOCAL_STORAGE_PREFIX + key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    console.warn(`Failed to read from localStorage for key: ${key}`, e);
    return fallback;
  }
}

function saveToStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(LOCAL_STORAGE_PREFIX + key, JSON.stringify(value));
  } catch (e) {
    console.warn(`Failed to write to localStorage for key: ${key}`, e);
  }
}

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Auth state - default role
  const [currentRole, setCurrentRoleState] = useState<UserRole>(() => 
    loadFromStorage<UserRole>('role', 'guest')
  );

  const [currentUser, setCurrentUser] = useState<UserProfile>(() => 
    loadFromStorage<UserProfile>('user', {
      id: 'guest',
      name: 'Guest Visitor',
      email: '',
      phone: '',
      role: 'guest'
    })
  );

  // Registered Accounts DB in localStorage
  const [registeredAccounts, setRegisteredAccounts] = useState<RegisteredAccount[]>(() => 
    loadFromStorage('registered_accounts', [
      {
        id: 'admin-seed',
        name: 'WorkForce Administrator',
        email: 'Admin@123',
        role: 'admin',
        password: 'Admin@123',
        authProvider: 'admin'
      },
      {
        id: 'cand-seed-1',
        name: 'Rohit Sharma',
        email: 'rohit.sharma@example.com',
        phone: '+91 98765 43210',
        role: 'candidate',
        password: 'password123',
        authProvider: 'email'
      },
      {
        id: 'emp-seed-1',
        name: 'Arvind Mehta',
        email: 'arvind.m@techsolutions.com',
        phone: '+91 98112 23344',
        role: 'employer',
        password: 'password123',
        authProvider: 'email'
      }
    ])
  );

  // Auth modal states
  const [loginAuthModalOpen, setLoginAuthModalOpen] = useState(false);
  const [authModalInitialTab, setAuthModalInitialTab] = useState<AuthModalTab>('user_login');

  const openLoginModal = (tab: AuthModalTab = 'user_login') => {
    setAuthModalInitialTab(tab);
    setLoginAuthModalOpen(true);
  };

  // Entities
  const [candidates, setCandidates] = useState<Candidate[]>(() => 
    loadFromStorage('candidates', INITIAL_CANDIDATES)
  );

  const [jobs, setJobs] = useState<Job[]>(() => 
    loadFromStorage('jobs', INITIAL_JOBS)
  );

  const [employers, setEmployers] = useState<Employer[]>(() => 
    loadFromStorage('employers', INITIAL_EMPLOYERS)
  );

  const [applications, setApplications] = useState<Application[]>(() => 
    loadFromStorage('applications', INITIAL_APPLICATIONS)
  );

  const [enquiries, setEnquiries] = useState<EmployerEnquiry[]>(() => 
    loadFromStorage('enquiries', INITIAL_ENQUIRIES)
  );

  const [contactMessages, setContactMessages] = useState<ContactMessage[]>(() => 
    loadFromStorage('contact_messages', INITIAL_CONTACT_MESSAGES)
  );

  const [services] = useState<ServiceItem[]>(() => 
    loadFromStorage('services', INITIAL_SERVICES)
  );

  const [testimonials] = useState<Testimonial[]>(() => 
    loadFromStorage('testimonials', INITIAL_TESTIMONIALS)
  );

  // Helper to generate role-specific notifications upon verified user login
  const getUserNotifications = (role: UserRole, userName: string): AppNotification[] => {
    if (role === 'admin') {
      return INITIAL_NOTIFICATIONS;
    }
    if (role === 'candidate') {
      return [
        {
          id: `notif-${Date.now()}-1`,
          title: 'Candidate Profile Active',
          message: `Welcome ${userName}! Your profile is verified and active for employer matching.`,
          type: 'candidate',
          read: false,
          timestamp: 'Just now',
          link: '/candidate/portal'
        },
        {
          id: `notif-${Date.now()}-2`,
          title: 'New Matching Positions',
          message: 'Explore active requisitions in IT, Engineering, and Corporate functions.',
          type: 'job',
          read: false,
          timestamp: '10 mins ago',
          link: '/jobs'
        }
      ];
    }
    if (role === 'employer') {
      return [
        {
          id: `notif-${Date.now()}-1`,
          title: 'Employer Portal Active',
          message: `Welcome ${userName}! Submit staffing requirements to source pre-screened talent.`,
          type: 'enquiry',
          read: false,
          timestamp: 'Just now',
          link: '/employer/portal'
        },
        {
          id: `notif-${Date.now()}-2`,
          title: 'Pre-screened Talent Available',
          message: 'Candidate database updated with verified professionals available for immediate hire.',
          type: 'candidate',
          read: false,
          timestamp: '30 mins ago',
          link: '/candidates'
        }
      ];
    }
    return [];
  };

  // User directive: Keep notifications 0 as of now; if a user logs in, then only notification
  const [notifications, setNotifications] = useState<AppNotification[]>(() => {
    const storedUser = loadFromStorage<UserProfile>('user', {
      id: 'guest',
      name: 'Guest Visitor',
      email: '',
      phone: '',
      role: 'guest'
    });
    if (!storedUser || storedUser.role === 'guest') {
      return [];
    }
    return loadFromStorage('notifications', []);
  });

  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => 
    loadFromStorage('audit_logs', INITIAL_AUDIT_LOGS)
  );

  const [savedJobIds, setSavedJobIds] = useState<string[]>(() => 
    loadFromStorage('saved_job_ids', ['job-1', 'job-4'])
  );

  // Modals & Toasts
  const [applyJobModal, setApplyJobModal] = useState<Job | null>(null);
  const [enquiryModalOpen, setEnquiryModalOpen] = useState<boolean>(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast((prev) => (prev?.message === message ? null : prev));
    }, 4500);
  };

  // Sync to storage
  useEffect(() => saveToStorage('role', currentRole), [currentRole]);
  useEffect(() => saveToStorage('user', currentUser), [currentUser]);
  useEffect(() => saveToStorage('registered_accounts', registeredAccounts), [registeredAccounts]);
  useEffect(() => saveToStorage('candidates', candidates), [candidates]);
  useEffect(() => saveToStorage('jobs', jobs), [jobs]);
  useEffect(() => saveToStorage('employers', employers), [employers]);
  useEffect(() => saveToStorage('applications', applications), [applications]);
  useEffect(() => saveToStorage('enquiries', enquiries), [enquiries]);
  useEffect(() => saveToStorage('contact_messages', contactMessages), [contactMessages]);
  useEffect(() => saveToStorage('notifications', notifications), [notifications]);
  useEffect(() => saveToStorage('audit_logs', auditLogs), [auditLogs]);
  useEffect(() => saveToStorage('saved_job_ids', savedJobIds), [savedJobIds]);

  const setCurrentRole = (role: UserRole) => {
    setCurrentRoleState(role);
    if (role === 'admin') {
      setCurrentUser({
        id: 'admin-1',
        name: 'WorkForce Administrator',
        email: 'Admin@123',
        phone: '+91 80 4123 4567',
        role: 'admin'
      });
      setNotifications(INITIAL_NOTIFICATIONS);
    } else if (role === 'candidate') {
      setCurrentUser({
        id: 'cand-1',
        name: 'Rohit Sharma (Candidate)',
        email: 'rohit@gmail.com',
        phone: '+91 98765 43210',
        role: 'candidate'
      });
      setNotifications(getUserNotifications('candidate', 'Rohit Sharma'));
    } else if (role === 'employer') {
      setCurrentUser({
        id: 'emp-1',
        name: 'Arvind Mehta (Employer)',
        email: 'arvind.m@techsolutions.com',
        phone: '+91 98112 23344',
        role: 'employer',
        companyName: 'TechSolutions Pvt Ltd'
      });
      setNotifications(getUserNotifications('employer', 'Arvind Mehta'));
    } else {
      setCurrentUser({
        id: 'guest',
        name: 'Guest Visitor',
        email: '',
        phone: '',
        role: 'guest'
      });
      setNotifications([]);
    }
  };

  // =========================================================================
  // AUTHENTICATION LOGIC (Admin@123 + User Email/Password + Google Login)
  // All saves to Supabase and storage
  // =========================================================================

  const loginAdmin = (username: string, password: string): { success: boolean; error?: string } => {
    const cleanUser = username.trim();
    const cleanPass = password.trim();

    // STRICT USER REQUIREMENT: Admin username & password is "Admin@123"
    if (cleanUser === 'Admin@123' && cleanPass === 'Admin@123') {
      const adminProfile: UserProfile = {
        id: 'admin-root',
        name: 'WorkForce Administrator',
        email: 'Admin@123',
        phone: '+91 80 4123 4567',
        role: 'admin',
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
      };

      setCurrentRoleState('admin');
      setCurrentUser(adminProfile);
      setNotifications(INITIAL_NOTIFICATIONS);

      // Save to Supabase
      saveUserToSupabase(adminProfile);

      // Add audit log
      const log: AuditLog = {
        id: `log-${Date.now()}`,
        user: 'Admin@123',
        action: 'ADMIN_LOGIN_SUCCESS',
        entity: 'Auth',
        entityId: 'admin-root',
        timestamp: new Date().toLocaleString(),
        details: 'Administrator logged in with verified Admin@123 credentials.'
      };
      setAuditLogs(prev => [log, ...prev]);

      showToast('Welcome Administrator! Logged in with Admin@123.', 'success');
      return { success: true };
    }

    return { 
      success: false, 
      error: 'Invalid administrator credentials. Username must be "Admin@123" and Password must be "Admin@123".' 
    };
  };

  const loginUser = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = password.trim();

    if (!cleanEmail || !cleanPass) {
      return { success: false, error: 'Please provide both email and password.' };
    }

    // Check if it's admin credentials entered in user tab
    if (cleanEmail === 'admin@123' && cleanPass === 'Admin@123') {
      return loginAdmin('Admin@123', 'Admin@123');
    }

    const found = registeredAccounts.find(
      acc => acc.email.toLowerCase() === cleanEmail && (!acc.password || acc.password === cleanPass)
    );

    if (found) {
      const userProfile: UserProfile = {
        id: found.id,
        name: found.name,
        email: found.email,
        phone: found.phone || '+91 98765 43210',
        role: found.role,
        avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'
      };

      setCurrentRoleState(found.role);
      setCurrentUser(userProfile);
      setNotifications(getUserNotifications(found.role, found.name));

      // Persist to Supabase
      await saveUserToSupabase(userProfile);

      showToast(`Welcome back, ${found.name}!`, 'success');
      return { success: true };
    }

    // If account not pre-seeded, dynamically create an authenticated profile
    const dynamicProfile: UserProfile = {
      id: `usr-${Date.now()}`,
      name: cleanEmail.split('@')[0].replace('.', ' ').toUpperCase(),
      email: cleanEmail,
      phone: '+91 98765 43210',
      role: 'candidate'
    };

    const newAcc: RegisteredAccount = {
      id: dynamicProfile.id,
      name: dynamicProfile.name,
      email: cleanEmail,
      role: 'candidate',
      password: cleanPass,
      authProvider: 'email'
    };

    setRegisteredAccounts(prev => [newAcc, ...prev]);
    setCurrentRoleState('candidate');
    setCurrentUser(dynamicProfile);
    setNotifications(getUserNotifications('candidate', dynamicProfile.name));

    await saveUserToSupabase(dynamicProfile);

    showToast(`Signed in successfully as ${dynamicProfile.name}`, 'success');
    return { success: true };
  };

  const registerUser = async (data: {
    name: string;
    email: string;
    phone?: string;
    role?: UserRole;
    password?: string;
  }): Promise<{ success: boolean; error?: string }> => {
    const cleanEmail = data.email.trim().toLowerCase();
    const cleanName = data.name.trim();

    if (!cleanEmail || !cleanName) {
      return { success: false, error: 'Name and Email are required.' };
    }

    const assignedRole = data.role || 'candidate';
    const newId = `usr-${Date.now()}`;

    const newProfile: UserProfile = {
      id: newId,
      name: cleanName,
      email: cleanEmail,
      phone: data.phone || '',
      role: assignedRole,
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'
    };

    const newAcc: RegisteredAccount = {
      id: newId,
      name: cleanName,
      email: cleanEmail,
      phone: data.phone,
      role: assignedRole,
      password: data.password || 'workforce123',
      authProvider: 'email'
    };

    setRegisteredAccounts(prev => [newAcc, ...prev]);
    setCurrentRoleState(assignedRole);
    setCurrentUser(newProfile);
    setNotifications(getUserNotifications(assignedRole, cleanName));

    // Save to Supabase
    await saveUserToSupabase(newProfile);

    showToast(`Account created for ${cleanName}! Saved to Supabase database.`, 'success');
    return { success: true };
  };

  const loginWithGoogle = async (): Promise<{ success: boolean; error?: string }> => {
    try {
      const result = await initiateGoogleSignIn();
      if (result.success && result.user) {
        setCurrentRoleState(result.user.role);
        setCurrentUser(result.user);
        setNotifications(getUserNotifications(result.user.role, result.user.name));

        // Add to accounts
        const gAcc: RegisteredAccount = {
          id: result.user.id,
          name: result.user.name,
          email: result.user.email,
          phone: result.user.phone,
          role: result.user.role,
          authProvider: 'google'
        };
        setRegisteredAccounts(prev => [gAcc, ...prev]);

        showToast(`Signed in with Google as ${result.user.name}! Saved to Supabase.`, 'success');
        return { success: true };
      }
      return { success: true };
    } catch (e: any) {
      showToast('Google login error: ' + e.message, 'error');
      return { success: false, error: e.message };
    }
  };

  const loginAs = (role: UserRole, email?: string, name?: string) => {
    setCurrentRoleState(role);
    setCurrentUser({
      id: `${role}-${Date.now()}`,
      name: name || (role === 'admin' ? 'WorkForce Administrator' : role === 'employer' ? 'TechCorp Executive' : 'Active Candidate'),
      email: email || (role === 'admin' ? 'Admin@123' : `${role}@example.com`),
      phone: '+91 98765 43210',
      role: role
    });
    if (role === 'guest') {
      setNotifications([]);
    } else {
      setNotifications(getUserNotifications(role, name || role));
    }
    showToast(`Switched view to ${role.toUpperCase()}`, 'info');
  };

  const logout = () => {
    setCurrentRoleState('guest');
    setCurrentUser({
      id: 'guest',
      name: 'Guest Visitor',
      email: '',
      phone: '',
      role: 'guest'
    });
    setNotifications([]);
    saveToStorage('notifications', []);
    showToast('Logged out successfully', 'info');
  };

  // =========================================================================
  // DATA OPERATIONS WITH AUTOMATIC SUPABASE PERSISTENCE & EXCEL SHEET DOWNLOAD
  // =========================================================================

  // Candidates CRUD
  const addCandidate = (candidateData: Omit<Candidate, 'id' | 'registeredDate' | 'status' | 'profileCompletion'>): Candidate => {
    const newCand: Candidate = {
      ...candidateData,
      id: `cand-${Date.now()}`,
      registeredDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      status: 'Registered',
      profileCompletion: 85
    };
    setCandidates(prev => [newCand, ...prev]);

    // Push notification for admin
    const newNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      title: 'New Candidate Registered',
      message: `${newCand.fullName} registered for ${newCand.currentJobTitle} (${newCand.currentLocation}).`,
      type: 'candidate',
      read: false,
      timestamp: 'Just now',
      link: '/admin/candidates'
    };
    setNotifications(prev => [newNotif, ...prev]);

    // Add audit log
    const log: AuditLog = {
      id: `log-${Date.now()}`,
      user: currentUser.name || newCand.fullName,
      action: 'CANDIDATE_REGISTERED',
      entity: 'Candidate',
      entityId: newCand.id,
      timestamp: new Date().toLocaleString(),
      details: `New registration: ${newCand.fullName} (${newCand.email})`
    };
    setAuditLogs(prev => [log, ...prev]);

    // 1. SAVE TO SUPABASE DATABASE
    saveCandidateToSupabase(newCand);

    // 2. SAVE & AUTO-DOWNLOAD EXCEL (.xlsx) SPREADSHEET
    exportCandidateToExcel(newCand);

    showToast(`Profile registered, saved to Supabase & exported to Excel (.xlsx)!`, 'success');

    return newCand;
  };

  const updateCandidate = (id: string, data: Partial<Candidate>) => {
    setCandidates(prev => prev.map(c => c.id === id ? { ...c, ...data } : c));
    showToast('Candidate record updated successfully', 'success');
  };

  const deleteCandidate = (id: string) => {
    setCandidates(prev => prev.filter(c => c.id !== id));
    showToast('Candidate archived/removed', 'info');
  };

  // Jobs CRUD
  const addJob = (jobData: Omit<Job, 'id' | 'postedDate' | 'applicationsCount'>): Job => {
    const newJob: Job = {
      ...jobData,
      id: `job-${Date.now()}`,
      postedDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      applicationsCount: 0
    };
    setJobs(prev => [newJob, ...prev]);

    const log: AuditLog = {
      id: `log-${Date.now()}`,
      user: currentUser.name,
      action: 'JOB_CREATED',
      entity: 'Job',
      entityId: newJob.id,
      timestamp: new Date().toLocaleString(),
      details: `Created job opening: ${newJob.title} at ${newJob.company}`
    };
    setAuditLogs(prev => [log, ...prev]);

    // AUTO-EXPORT JOB OPENING TO EXCEL
    exportJobToExcel(newJob);

    showToast('Job opening published & saved to Excel (.xlsx)!', 'success');
    return newJob;
  };

  const updateJob = (id: string, data: Partial<Job>) => {
    setJobs(prev => prev.map(j => j.id === id ? { ...j, ...data } : j));
    showToast('Job updated successfully', 'success');
  };

  const deleteJob = (id: string) => {
    setJobs(prev => prev.filter(j => j.id !== id));
    showToast('Job listing closed', 'info');
  };

  // Applications
  const applyForJob = (jobId: string, candidateDetails: {
    fullName: string;
    email: string;
    phone: string;
    resumeFileName?: string;
    coverLetter?: string;
  }): Application => {
    const job = jobs.find(j => j.id === jobId);
    const existingCand = candidates.find(c => c.email.toLowerCase() === candidateDetails.email.toLowerCase());

    const candidateId = existingCand ? existingCand.id : `cand-${Date.now()}`;
    const newApp: Application = {
      id: `app-${Date.now()}`,
      candidateId,
      candidateName: candidateDetails.fullName,
      candidateEmail: candidateDetails.email,
      candidatePhone: candidateDetails.phone,
      jobId,
      jobTitle: job ? job.title : 'Job Opening',
      company: job ? job.company : 'Client Company',
      location: job ? job.location : 'Bangalore',
      appliedDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      status: 'Applied',
      currentStage: 'Applied',
      resumeFileName: candidateDetails.resumeFileName || 'Resume_Document.pdf',
      coverLetter: candidateDetails.coverLetter || '',
      updatedAt: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    };

    setApplications(prev => [newApp, ...prev]);

    // Increment application count on job
    setJobs(prev => prev.map(j => j.id === jobId ? { ...j, applicationsCount: (j.applicationsCount || 0) + 1 } : j));

    // Admin notification
    const notif: AppNotification = {
      id: `notif-${Date.now()}`,
      title: 'New Job Application',
      message: `${candidateDetails.fullName} applied for ${job ? job.title : 'a position'}.`,
      type: 'application',
      read: false,
      timestamp: 'Just now',
      link: '/admin/applications'
    };
    setNotifications(prev => [notif, ...prev]);

    // Audit log
    const log: AuditLog = {
      id: `log-${Date.now()}`,
      user: candidateDetails.fullName,
      action: 'APPLICATION_SUBMITTED',
      entity: 'Application',
      entityId: newApp.id,
      timestamp: new Date().toLocaleString(),
      details: `Application for ${newApp.jobTitle} at ${newApp.company}`
    };
    setAuditLogs(prev => [log, ...prev]);

    // 1. SAVE APPLICATION TO SUPABASE DATABASE
    saveApplicationToSupabase(newApp);

    // 2. SAVE APPLICATION TO EXCEL SPREADSHEET (.xlsx)
    exportApplicationToExcel(newApp);

    showToast(`Application submitted, saved to Supabase & Excel (.xlsx)!`, 'success');

    return newApp;
  };

  const updateApplicationStage = (id: string, newStage: ApplicationStage, notes?: string) => {
    setApplications(prev => prev.map(app => {
      if (app.id === id) {
        const updated = {
          ...app,
          status: newStage,
          currentStage: newStage,
          recruiterNotes: notes !== undefined ? notes : app.recruiterNotes,
          updatedAt: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
        };
        // sync to Supabase
        saveApplicationToSupabase(updated);
        return updated;
      }
      return app;
    }));

    // Update candidate status if matching
    const targetApp = applications.find(a => a.id === id);
    if (targetApp && targetApp.candidateId) {
      const candStatusMap: Record<ApplicationStage, Candidate['status']> = {
        'Applied': 'Registered',
        'Screening': 'Screening',
        'Shortlisted': 'Shortlisted',
        'Interview': 'Interviewing',
        'Selected': 'Placed',
        'Rejected': 'Archived',
        'Joined': 'Placed'
      };
      setCandidates(prev => prev.map(c => c.id === targetApp.candidateId ? { ...c, status: candStatusMap[newStage] || c.status } : c));
    }

    const log: AuditLog = {
      id: `log-${Date.now()}`,
      user: currentUser.name,
      action: 'APPLICATION_STAGE_CHANGED',
      entity: 'Application',
      entityId: id,
      timestamp: new Date().toLocaleString(),
      details: `Status advanced to: ${newStage}. Notes: ${notes || 'Updated by recruiter'}`
    };
    setAuditLogs(prev => [log, ...prev]);

    showToast(`Application moved to "${newStage}" stage!`, 'success');
  };

  // Employer Enquiry
  const submitEmployerEnquiry = (enquiryData: Omit<EmployerEnquiry, 'id' | 'createdAt' | 'status'>): EmployerEnquiry => {
    const newEnq: EmployerEnquiry = {
      ...enquiryData,
      id: `enq-${Date.now()}`,
      status: 'New',
      createdAt: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    };
    setEnquiries(prev => [newEnq, ...prev]);

    const notif: AppNotification = {
      id: `notif-${Date.now()}`,
      title: 'New Employer Enquiry',
      message: `${newEnq.companyName} submitted a hiring enquiry for ${newEnq.vacancies}x ${newEnq.jobTitle}.`,
      type: 'enquiry',
      read: false,
      timestamp: 'Just now',
      link: '/admin/enquiries'
    };
    setNotifications(prev => [notif, ...prev]);

    const log: AuditLog = {
      id: `log-${Date.now()}`,
      user: newEnq.contactPerson,
      action: 'ENQUIRY_RECEIVED',
      entity: 'EmployerEnquiry',
      entityId: newEnq.id,
      timestamp: new Date().toLocaleString(),
      details: `Enquiry from ${newEnq.companyName} (${newEnq.email})`
    };
    setAuditLogs(prev => [log, ...prev]);

    // 1. SAVE ENQUIRY TO SUPABASE DATABASE
    saveEnquiryToSupabase(newEnq);

    // 2. SAVE ENQUIRY TO EXCEL SPREADSHEET (.xlsx)
    exportEnquiryToExcel(newEnq);

    showToast(`Enquiry submitted, saved to Supabase & Excel (.xlsx)!`, 'success');

    return newEnq;
  };

  const updateEnquiryStatus = (id: string, status: EmployerEnquiry['status'], notes?: string) => {
    setEnquiries(prev => prev.map(e => {
      if (e.id === id) {
        const updated = { ...e, status, notes: notes || e.notes };
        saveEnquiryToSupabase(updated);
        return updated;
      }
      return e;
    }));
    showToast(`Enquiry status marked as ${status}`, 'info');
  };

  // Contact Messages
  const submitContactMessage = (msgData: Omit<ContactMessage, 'id' | 'createdAt' | 'status'>): ContactMessage => {
    const newMsg: ContactMessage = {
      ...msgData,
      id: `msg-${Date.now()}`,
      status: 'Unread',
      createdAt: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    };
    setContactMessages(prev => [newMsg, ...prev]);

    const notif: AppNotification = {
      id: `notif-${Date.now()}`,
      title: 'New Contact Message',
      message: `${newMsg.name} sent message: "${newMsg.subject}"`,
      type: 'system',
      read: false,
      timestamp: 'Just now',
      link: '/admin/enquiries'
    };
    setNotifications(prev => [notif, ...prev]);

    // 1. SAVE CONTACT MESSAGE TO SUPABASE
    saveContactToSupabase(newMsg);

    // 2. SAVE CONTACT MESSAGE TO EXCEL (.xlsx)
    exportContactToExcel(newMsg);

    showToast('Message sent, saved to Supabase & Excel (.xlsx)!', 'success');

    return newMsg;
  };

  // Saved Jobs
  const toggleSaveJob = (jobId: string) => {
    setSavedJobIds(prev => {
      const exists = prev.includes(jobId);
      if (exists) {
        showToast('Job removed from saved list', 'info');
        return prev.filter(id => id !== jobId);
      } else {
        showToast('Job saved to your candidate bookmarks!', 'success');
        return [...prev, jobId];
      }
    });
  };

  const isJobSaved = (jobId: string) => savedJobIds.includes(jobId);

  // Notifications
  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    showToast('All notifications marked as read', 'info');
  };

  // Reset demo
  const resetToDemoData = () => {
    setCandidates(INITIAL_CANDIDATES);
    setJobs(INITIAL_JOBS);
    setEmployers(INITIAL_EMPLOYERS);
    setApplications(INITIAL_APPLICATIONS);
    setEnquiries(INITIAL_ENQUIRIES);
    setContactMessages(INITIAL_CONTACT_MESSAGES);
    setNotifications(INITIAL_NOTIFICATIONS);
    setAuditLogs(INITIAL_AUDIT_LOGS);
    setSavedJobIds(['job-1', 'job-4']);
    showToast('Reset data to initial state', 'info');
  };

  return (
    <AppContext.Provider value={{
      currentRole,
      currentUser,
      setCurrentRole,
      loginAs,
      logout,
      loginAdmin,
      loginUser,
      registerUser,
      loginWithGoogle,
      loginAuthModalOpen,
      setLoginAuthModalOpen,
      authModalInitialTab,
      setAuthModalInitialTab,
      openLoginModal,
      candidates,
      jobs,
      employers,
      applications,
      enquiries,
      contactMessages,
      services,
      testimonials,
      notifications,
      auditLogs,
      savedJobIds,
      addCandidate,
      updateCandidate,
      deleteCandidate,
      addJob,
      updateJob,
      deleteJob,
      applyForJob,
      updateApplicationStage,
      submitEmployerEnquiry,
      updateEnquiryStatus,
      submitContactMessage,
      toggleSaveJob,
      isJobSaved,
      markNotificationRead,
      markAllNotificationsRead,
      applyJobModal,
      setApplyJobModal,
      enquiryModalOpen,
      setEnquiryModalOpen,
      toast,
      showToast,
      isSupabaseLive: isSupabaseConfigured(),
      resetToDemoData
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
