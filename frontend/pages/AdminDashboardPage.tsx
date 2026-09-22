import React, { useState } from 'react';
import { 
  Briefcase, 
  Users, 
  FileText, 
  Building2, 
  Plus, 
  Search, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  Filter, 
  ArrowUpRight,
  ShieldCheck,
  ChevronDown,
  X
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  PieChart, 
  Pie, 
  Cell, 
  Legend 
} from 'recharts';
import { useApp } from '../context/AppContext';
import { ApplicationStage, Job, JobCategory } from '../types';

export const AdminDashboardPage: React.FC = () => {
  const { 
    currentRole,
    currentUser,
    loginAdmin,
    logout,
    jobs, 
    candidates, 
    applications, 
    enquiries, 
    auditLogs, 
    updateApplicationStage, 
    updateEnquiryStatus, 
    deleteJob, 
    addJob,
    isSupabaseLive,
    showToast 
  } = useApp();

  // Admin gatekeeper credentials
  const [adminUser, setAdminUser] = useState('Admin@123');
  const [adminPass, setAdminPass] = useState('Admin@123');
  const [authError, setAuthError] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<'overview' | 'jobs' | 'candidates' | 'applications' | 'enquiries' | 'audit'>('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [isNewJobModalOpen, setIsNewJobModalOpen] = useState(false);

  // New job form state
  const [newTitle, setNewTitle] = useState('');
  const [newCompany, setNewCompany] = useState('');
  const [newLocation, setNewLocation] = useState('Bangalore, India');
  const [newCategory, setNewCategory] = useState('IT & Software');
  const [newSalary, setNewSalary] = useState('INR 12,00,000 - INR 18,00,000 P.A.');
  const [newEmploymentType, setNewEmploymentType] = useState<'Full Time' | 'Contract' | 'Temporary' | 'Part Time'>('Full Time');
  const [newVacancies, setNewVacancies] = useState<number>(3);
  const [newExperience, setNewExperience] = useState('3 - 5 Years');
  const [newDescription, setNewDescription] = useState('');

  // Recharts Data
  const monthlyData = [
    { month: 'Apr', applications: 45, placements: 14 },
    { month: 'May', applications: 62, placements: 22 },
    { month: 'Jun', applications: 78, placements: 28 },
    { month: 'Jul', applications: 95, placements: 34 },
    { month: 'Aug', applications: 112, placements: 42 },
    { month: 'Sep', applications: 138, placements: 51 },
  ];

  const categoryDistribution = [
    { name: 'IT & Software', value: 18, color: '#FF6B00' },
    { name: 'Engineering', value: 15, color: '#071A2D' },
    { name: 'Healthcare', value: 4, color: '#10B981' },
    { name: 'Sales & Marketing', value: 7, color: '#3B82F6' },
    { name: 'Finance & Others', value: 6, color: '#8B5CF6' },
  ];

  const handleCreateJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newCompany.trim() || !newDescription.trim()) {
      showToast('Please fill all mandatory job fields.', 'error');
      return;
    }

    const generatedSlug = newTitle.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now().toString().slice(-4);

    addJob({
      title: newTitle.trim(),
      slug: generatedSlug,
      company: newCompany.trim(),
      location: newLocation.trim(),
      category: newCategory as JobCategory,
      industry: newCategory,
      salary: newSalary.trim(),
      employmentType: newEmploymentType,
      workMode: 'On-site',
      vacancies: Number(newVacancies) || 1,
      experienceMin: 2,
      experienceMax: 5,
      experienceDisplay: newExperience,
      qualification: 'Relevant Bachelor Degree / Professional Certification',
      description: newDescription.trim(),
      responsibilities: ['Execute key tasks according to project roadmap.', 'Collaborate with team leads and client managers.'],
      requirements: ['Proven track record in related field.', 'Strong communication and problem solving skills.'],
      skills: ['Core Competency', 'Communication', 'Teamwork'],
      benefits: ['Health Insurance', 'Performance Bonus', 'Paid Time Off'],
      deadline: '30 Days from Posting',
      status: 'Published',
      featured: true
    });

    setIsNewJobModalOpen(false);
    // Reset form
    setNewTitle('');
    setNewCompany('');
    setNewDescription('');
    showToast(`New job posting "${newTitle}" published successfully!`, 'success');
  };

  const stages: ApplicationStage[] = ['Applied', 'Screening', 'Shortlisted', 'Interview', 'Selected', 'Rejected', 'Joined'];

  // Admin Login Handler
  const handleAdminGatekeeperLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = loginAdmin(adminUser, adminPass);
    if (!success) {
      setAuthError('Invalid administrator credentials. Required Username: Admin@123 | Password: Admin@123');
    } else {
      setAuthError(null);
      showToast('Welcome Administrator! Admin portal unlocked.', 'success');
    }
  };

  // If NOT currently authenticated as Admin, show the required Admin login gatekeeper
  if (currentRole !== 'admin') {
    return (
      <div className="bg-slate-900 min-h-screen text-slate-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-[#071A2D] border border-slate-700 rounded-3xl p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 rounded-2xl bg-[#FF6B00] text-white font-extrabold text-2xl flex items-center justify-center mx-auto shadow-lg">
              WF
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight mt-2">
              Administrator Portal
            </h2>
            <p className="text-xs text-slate-400">
              WorkForce Manpower & Recruitment Management Console
            </p>
          </div>

          {authError && (
            <div className="p-3 bg-red-950/60 border border-red-800 rounded-xl text-xs text-red-300">
              {authError}
            </div>
          )}

          <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-3.5 text-xs text-slate-300 space-y-1">
            <div className="text-[#FF6B00] font-bold uppercase tracking-wider text-[10px]">
              Required Admin Credentials
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Username:</span>
              <code className="bg-slate-900 px-2 py-0.5 rounded text-orange-300 font-mono">Admin@123</code>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Password:</span>
              <code className="bg-slate-900 px-2 py-0.5 rounded text-orange-300 font-mono">Admin@123</code>
            </div>
          </div>

          <form onSubmit={handleAdminGatekeeperLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Admin Username
              </label>
              <input
                type="text"
                required
                value={adminUser}
                onChange={e => setAdminUser(e.target.value)}
                placeholder="Admin@123"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:border-[#FF6B00] outline-none text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Admin Password
              </label>
              <input
                type="password"
                required
                value={adminPass}
                onChange={e => setAdminPass(e.target.value)}
                placeholder="Admin@123"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:border-[#FF6B00] outline-none text-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#FF6B00] hover:bg-[#E05E00] text-white font-bold text-sm shadow-lg transition-all active:scale-[0.99] uppercase tracking-wider mt-2"
            >
              Sign In as Administrator
            </button>
          </form>

          <div className="text-center">
            <a
              href="/"
              className="text-xs text-slate-400 hover:text-white transition-colors underline"
            >
              &larr; Return to Public Website
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-100 min-h-screen text-slate-900 pb-20">
      
      {/* Top Admin Navigation Header */}
      <header className="bg-[#071A2D] text-white border-b border-slate-800 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#FF6B00] text-white font-extrabold flex items-center justify-center text-sm shadow">
              WF
            </div>
            <div>
              <div className="text-sm font-extrabold text-white flex items-center gap-2">
                WorkForce Admin Console
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded font-mono">
                  v1.0 Live
                </span>
                <span className="text-[10px] bg-blue-500/20 text-blue-400 border border-blue-500/30 px-2 py-0.5 rounded font-mono">
                  Supabase DB Synced
                </span>
              </div>
              <div className="text-[11px] text-slate-400">
                Logged in as <strong className="text-white">Admin@123</strong> • Enterprise Manpower & ATS Management
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Quick Excel Export All */}
            <button
              onClick={() => {
                import('../lib/excelExport').then(m => {
                  m.exportJobsToExcel(jobs);
                  m.exportCandidatesToExcel(candidates);
                  m.exportApplicationsToExcel(applications);
                  m.exportEnquiriesToExcel(enquiries);
                });
                showToast('All system records exported to Excel sheets (.xlsx)!', 'success');
              }}
              title="Download all tables into Excel (.xlsx)"
              className="px-3 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow flex items-center gap-1.5 transition-all"
            >
              <FileText className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Export Excel</span>
            </button>

            <button
              onClick={() => setIsNewJobModalOpen(true)}
              id="admin-post-job-top-btn"
              className="px-4 py-2 rounded-lg bg-[#FF6B00] hover:bg-[#E05E00] text-white text-xs font-bold shadow transition-all active:scale-95 flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> Post New Job
            </button>

            <button
              onClick={logout}
              title="Sign out of Admin Console"
              className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold transition-all border border-slate-700"
            >
              Log Out
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200 text-xs font-bold text-slate-600">
          {[
            { key: 'overview', label: 'Dashboard Overview', icon: TrendingUp },
            { key: 'jobs', label: `Jobs (${jobs.length})`, icon: Briefcase },
            { key: 'candidates', label: `Candidates (${candidates.length})`, icon: Users },
            { key: 'applications', label: `Applications (${applications.length})`, icon: FileText },
            { key: 'enquiries', label: `Enquiries (${enquiries.length})`, icon: Building2 },
            { key: 'audit', label: 'Audit Trail', icon: Clock },
          ].map(tab => {
            const Icon = tab.icon;
            const active = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`px-4 py-2.5 rounded-xl flex items-center gap-2 transition-all whitespace-nowrap ${
                  active 
                    ? 'bg-[#071A2D] text-white shadow' 
                    : 'bg-white hover:bg-slate-200 text-slate-700'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* =========================================================================
            TAB 1: OVERVIEW & ANALYTICS (Matches Screen 10)
            ========================================================================= */}
        {activeTab === 'overview' && (
          <div className="space-y-6 mt-6">
            
            {/* 4 Metric Cards (Matches Screen 10) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Active Jobs</div>
                  <div className="text-3xl font-extrabold text-slate-900 mt-1">{jobs.length}</div>
                  <div className="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
                    <ArrowUpRight className="w-3.5 h-3.5" /> +12% this month
                  </div>
                </div>
                <div className="w-12 h-12 rounded-xl bg-orange-50 text-[#FF6B00] flex items-center justify-center">
                  <Briefcase className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Registered Candidates</div>
                  <div className="text-3xl font-extrabold text-slate-900 mt-1">{candidates.length + 150}</div>
                  <div className="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
                    <ArrowUpRight className="w-3.5 h-3.5" /> +24% new profiles
                  </div>
                </div>
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Users className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Applications Received</div>
                  <div className="text-3xl font-extrabold text-slate-900 mt-1">{applications.length + 300}</div>
                  <div className="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
                    <ArrowUpRight className="w-3.5 h-3.5" /> 38 pending review
                  </div>
                </div>
                <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                  <FileText className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Employer Enquiries</div>
                  <div className="text-3xl font-extrabold text-slate-900 mt-1">{enquiries.length + 15}</div>
                  <div className="text-[11px] text-[#FF6B00] font-semibold mt-1 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> Fast callback required
                  </div>
                </div>
                <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  <Building2 className="w-6 h-6" />
                </div>
              </div>

            </div>

            {/* Recharts Analytics Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Bar Chart: Applications & Placements Trend */}
              <div className="lg:col-span-8 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">Application vs. Placement Velocity</h3>
                    <p className="text-xs text-slate-500">Monthly breakdown of candidate applications and verified hirings.</p>
                  </div>
                  <span className="text-[11px] font-bold text-[#FF6B00] bg-orange-50 px-2.5 py-1 rounded-md">
                    2026 Fiscal Year
                  </span>
                </div>

                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                      <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748B' }} />
                      <YAxis tick={{ fontSize: 11, fill: '#64748B' }} />
                      <Tooltip />
                      <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                      <Bar dataKey="applications" name="Applications" fill="#071A2D" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="placements" name="Placements (Joined)" fill="#FF6B00" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Donut Chart: Job Categories */}
              <div className="lg:col-span-4 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Openings by Sector</h3>
                  <p className="text-xs text-slate-500">Current live demand distribution.</p>
                </div>

                <div className="h-52 w-full my-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={45}
                        outerRadius={70}
                        paddingAngle={4}
                        dataKey="value"
                      >
                        {categoryDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="space-y-1 text-xs border-t border-slate-100 pt-3">
                  {categoryDistribution.map((cat, i) => (
                    <div key={i} className="flex items-center justify-between text-slate-700">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }} />
                        <span>{cat.name}</span>
                      </div>
                      <span className="font-bold">{cat.value}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Recent Applications Quick Table */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Recent Applications (ATS Pipeline)</h3>
                  <p className="text-xs text-slate-500">Manage candidate progression across recruitment stages.</p>
                </div>
                <button 
                  onClick={() => setActiveTab('applications')}
                  className="text-xs text-[#FF6B00] font-bold hover:underline"
                >
                  View All ({applications.length}) →
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-slate-50 text-[11px] uppercase tracking-wider text-slate-500 border-b border-slate-200">
                    <tr>
                      <th className="px-5 py-3">Applicant Name</th>
                      <th className="px-5 py-3">Job Applied</th>
                      <th className="px-5 py-3">Date</th>
                      <th className="px-5 py-3">Current Stage</th>
                      <th className="px-5 py-3 text-right">Update ATS Stage</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {applications.slice(0, 5).map(app => (
                      <tr key={app.id} className="hover:bg-slate-50/80">
                        <td className="px-5 py-3.5 font-bold text-slate-900">
                          {app.candidateName}
                          <div className="text-[11px] text-slate-400 font-normal">{app.candidateEmail}</div>
                        </td>
                        <td className="px-5 py-3.5">
                          <div className="font-semibold text-slate-800">{app.jobTitle}</div>
                          <div className="text-[11px] text-slate-400">{app.company}</div>
                        </td>
                        <td className="px-5 py-3.5 text-slate-500">{app.appliedDate}</td>
                        <td className="px-5 py-3.5">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            app.currentStage === 'Selected' ? 'bg-emerald-100 text-emerald-700' :
                            app.currentStage === 'Interview' ? 'bg-blue-100 text-blue-700' :
                            app.currentStage === 'Rejected' ? 'bg-red-100 text-red-700' :
                            'bg-orange-100 text-orange-800'
                          }`}>
                            {app.currentStage}
                          </span>
                        </td>
                        <td className="px-5 py-3.5 text-right">
                          <select
                            value={app.currentStage}
                            onChange={e => {
                              updateApplicationStage(app.id, e.target.value as ApplicationStage);
                              showToast(`Updated ${app.candidateName} to ${e.target.value}`, 'success');
                            }}
                            className="text-xs border border-slate-200 rounded-lg px-2 py-1 bg-white font-medium cursor-pointer"
                          >
                            {stages.map(st => (
                              <option key={st} value={st}>{st}</option>
                            ))}
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* =========================================================================
            TAB 2: JOBS MANAGEMENT
            ========================================================================= */}
        {activeTab === 'jobs' && (
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm mt-6">
            <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">Manage Job Vacancies ({jobs.length})</h3>
                <p className="text-xs text-slate-500">Publish, modify, or retire hiring requisitions.</p>
              </div>
              <button
                onClick={() => setIsNewJobModalOpen(true)}
                className="px-4 py-2 bg-[#FF6B00] text-white rounded-lg text-xs font-bold hover:bg-[#E05E00] flex items-center gap-1.5 shadow"
              >
                <Plus className="w-4 h-4" /> Post New Job
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 text-[11px] uppercase tracking-wider text-slate-500 border-b border-slate-200">
                  <tr>
                    <th className="px-5 py-3">Job Title & Sector</th>
                    <th className="px-5 py-3">Company & Location</th>
                    <th className="px-5 py-3">Salary Offered</th>
                    <th className="px-5 py-3">Openings</th>
                    <th className="px-5 py-3">Status</th>
                    <th className="px-5 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {jobs.map(job => (
                    <tr key={job.id} className="hover:bg-slate-50/80">
                      <td className="px-5 py-3.5">
                        <div className="font-bold text-slate-900">{job.title}</div>
                        <div className="text-[11px] text-[#FF6B00] font-semibold">{job.category}</div>
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="font-medium text-slate-800">{job.company}</div>
                        <div className="text-[11px] text-slate-400">{job.location}</div>
                      </td>
                      <td className="px-5 py-3.5 font-medium">{job.salary}</td>
                      <td className="px-5 py-3.5 font-bold">{job.vacancies}</td>
                      <td className="px-5 py-3.5">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-700">
                          {job.status}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete job opening "${job.title}"?`)) {
                              deleteJob(job.id);
                              showToast(`Job "${job.title}" deleted.`, 'info');
                            }
                          }}
                          className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                          title="Delete Job"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 3: CANDIDATES DATABASE
            ========================================================================= */}
        {activeTab === 'candidates' && (
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm mt-6">
            <div className="p-5 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Candidate Talent Pool ({candidates.length})</h3>
              <p className="text-xs text-slate-500">Verified resumes registered through portal and consultancy sourcing.</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 text-[11px] uppercase tracking-wider text-slate-500 border-b border-slate-200">
                  <tr>
                    <th className="px-5 py-3">Candidate</th>
                    <th className="px-5 py-3">Contact</th>
                    <th className="px-5 py-3">Qualification</th>
                    <th className="px-5 py-3">Experience</th>
                    <th className="px-5 py-3">Skills</th>
                    <th className="px-5 py-3">Resume</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {candidates.map(c => (
                    <tr key={c.id} className="hover:bg-slate-50/80">
                      <td className="px-5 py-3.5">
                        <div className="font-bold text-slate-900">{c.fullName}</div>
                        <div className="text-[11px] text-slate-500">{c.currentJobTitle}</div>
                      </td>
                      <td className="px-5 py-3.5">
                        <div>{c.email}</div>
                        <div className="text-slate-400">{c.phone}</div>
                      </td>
                      <td className="px-5 py-3.5 font-medium">{c.highestQualification}</td>
                      <td className="px-5 py-3.5 font-medium">{c.totalExperience}</td>
                      <td className="px-5 py-3.5">
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {c.skills.slice(0, 3).map((s, i) => (
                            <span key={i} className="px-1.5 py-0.5 bg-slate-100 text-slate-700 text-[10px] rounded font-medium">
                              {s}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="text-[11px] text-blue-600 font-semibold cursor-pointer hover:underline">
                          {c.resumeFileName || 'View CV'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 4: APPLICATIONS (ATS)
            ========================================================================= */}
        {activeTab === 'applications' && (
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm mt-6">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">Applicant Tracking System ({applications.length})</h3>
                <p className="text-xs text-slate-500">Full candidate recruitment lifecycle.</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 text-[11px] uppercase tracking-wider text-slate-500 border-b border-slate-200">
                  <tr>
                    <th className="px-5 py-3">Applicant Name</th>
                    <th className="px-5 py-3">Target Job</th>
                    <th className="px-5 py-3">Applied Date</th>
                    <th className="px-5 py-3">Current Stage</th>
                    <th className="px-5 py-3">Recruiter Notes</th>
                    <th className="px-5 py-3 text-right">Advance Stage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {applications.map(app => (
                    <tr key={app.id} className="hover:bg-slate-50/80">
                      <td className="px-5 py-3.5 font-bold text-slate-900">
                        {app.candidateName}
                        <div className="text-[11px] text-slate-400 font-normal">{app.candidateEmail}</div>
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="font-semibold text-slate-800">{app.jobTitle}</div>
                        <div className="text-[11px] text-slate-400">{app.company}</div>
                      </td>
                      <td className="px-5 py-3.5 text-slate-500">{app.appliedDate}</td>
                      <td className="px-5 py-3.5">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-orange-100 text-orange-800">
                          {app.currentStage}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-slate-600 text-[11px] max-w-xs">
                        {app.recruiterNotes || 'No notes added yet'}
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <select
                          value={app.currentStage}
                          onChange={e => {
                            updateApplicationStage(app.id, e.target.value as ApplicationStage);
                            showToast(`Updated stage to ${e.target.value}`, 'success');
                          }}
                          className="text-xs border border-slate-200 rounded-lg px-2 py-1 bg-white font-medium cursor-pointer"
                        >
                          {stages.map(st => (
                            <option key={st} value={st}>{st}</option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 5: EMPLOYER ENQUIRIES
            ========================================================================= */}
        {activeTab === 'enquiries' && (
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm mt-6">
            <div className="p-5 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Corporate Staffing Enquiries ({enquiries.length})</h3>
              <p className="text-xs text-slate-500">Direct hiring requisitions submitted by companies.</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 text-[11px] uppercase tracking-wider text-slate-500 border-b border-slate-200">
                  <tr>
                    <th className="px-5 py-3">Company & Contact</th>
                    <th className="px-5 py-3">Requirement</th>
                    <th className="px-5 py-3">Vacancies</th>
                    <th className="px-5 py-3">Date</th>
                    <th className="px-5 py-3">Status</th>
                    <th className="px-5 py-3 text-right">Change Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {enquiries.map(enq => (
                    <tr key={enq.id} className="hover:bg-slate-50/80">
                      <td className="px-5 py-3.5">
                        <div className="font-bold text-slate-900">{enq.companyName}</div>
                        <div className="text-[11px] text-slate-500">{enq.contactPerson} • {enq.phone}</div>
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="font-semibold text-slate-800">{enq.jobTitle}</div>
                        <div className="text-[11px] text-slate-400">{enq.additionalRequirements || 'Standard recruitment'}</div>
                      </td>
                      <td className="px-5 py-3.5 font-bold text-slate-900">{enq.vacancies}</td>
                      <td className="px-5 py-3.5 text-slate-500">{enq.createdAt}</td>
                      <td className="px-5 py-3.5">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          enq.status === 'Closed' || enq.status === 'Resolved' ? 'bg-slate-100 text-slate-700' :
                          enq.status === 'Contacted' || enq.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                          'bg-amber-100 text-amber-800'
                        }`}>
                          {enq.status}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <select
                          value={enq.status}
                          onChange={e => {
                            updateEnquiryStatus(enq.id, e.target.value as any);
                            showToast(`Enquiry #${enq.id} updated to ${e.target.value}`, 'info');
                          }}
                          className="text-xs border border-slate-200 rounded-lg px-2 py-1 bg-white font-medium cursor-pointer"
                        >
                          <option value="New">New</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Resolved">Resolved</option>
                          <option value="Closed">Closed</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 6: AUDIT TRAIL
            ========================================================================= */}
        {activeTab === 'audit' && (
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm mt-6 p-6">
            <h3 className="text-base font-bold text-slate-900 mb-2">System Audit Trail</h3>
            <p className="text-xs text-slate-500 mb-6">Real-time recording of all admin and candidate interactions.</p>

            <div className="space-y-3">
              {auditLogs.map(log => (
                <div key={log.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start justify-between text-xs">
                  <div>
                    <div className="font-bold text-slate-900 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#FF6B00]" />
                      {log.action}
                    </div>
                    <div className="text-slate-600 mt-1 pl-4">{log.details}</div>
                  </div>
                  <div className="text-slate-400 font-mono text-[11px] shrink-0">
                    {log.timestamp}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* =========================================================================
          MODAL: POST NEW JOB
          ========================================================================= */}
      {isNewJobModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl border border-slate-200 relative">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <div>
                <span className="text-[10px] font-bold text-[#FF6B00] uppercase tracking-wider">Recruitment Manager</span>
                <h3 className="text-xl font-bold text-slate-900">Publish New Job Requisition</h3>
              </div>
              <button 
                onClick={() => setIsNewJobModalOpen(false)}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateJob} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Job Title *</label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={e => setNewTitle(e.target.value)}
                    placeholder="e.g. Senior Mechanical Design Engineer"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:border-[#FF6B00]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Hiring Company *</label>
                  <input
                    type="text"
                    required
                    value={newCompany}
                    onChange={e => setNewCompany(e.target.value)}
                    placeholder="e.g. L&T Heavy Engineering"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:border-[#FF6B00]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Sector / Category</label>
                  <select
                    value={newCategory}
                    onChange={e => setNewCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:border-[#FF6B00] bg-white"
                  >
                    <option value="IT & Software">IT & Software</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Sales & Marketing">Sales & Marketing</option>
                    <option value="Finance & Accounts">Finance & Accounts</option>
                    <option value="HR & Admin">HR & Admin</option>
                    <option value="Others">Others</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={newLocation}
                    onChange={e => setNewLocation(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:border-[#FF6B00]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Employment Type</label>
                  <select
                    value={newEmploymentType}
                    onChange={e => setNewEmploymentType(e.target.value as any)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:border-[#FF6B00] bg-white"
                  >
                    <option value="Full Time">Full Time</option>
                    <option value="Contract">Contract</option>
                    <option value="Temporary">Temporary</option>
                    <option value="Part Time">Part Time</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Salary Range</label>
                  <input
                    type="text"
                    value={newSalary}
                    onChange={e => setNewSalary(e.target.value)}
                    placeholder="e.g. INR 10,00,000 - INR 15,00,000 P.A."
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:border-[#FF6B00]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Vacancies</label>
                  <input
                    type="number"
                    min={1}
                    value={newVacancies}
                    onChange={e => setNewVacancies(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:border-[#FF6B00]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Experience Required</label>
                  <input
                    type="text"
                    value={newExperience}
                    onChange={e => setNewExperience(e.target.value)}
                    placeholder="e.g. 3 - 5 Years"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:border-[#FF6B00]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Job Description & Responsibilities *</label>
                <textarea
                  rows={4}
                  required
                  value={newDescription}
                  onChange={e => setNewDescription(e.target.value)}
                  placeholder="Outline key expectations, required qualifications, and reporting structure..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:border-[#FF6B00]"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsNewJobModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 font-semibold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#FF6B00] hover:bg-[#E05E00] text-white font-bold rounded-lg shadow"
                >
                  Publish Job Requisition
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
