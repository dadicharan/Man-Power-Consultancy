import { Router } from 'express';
import { backendStorage } from '../services/storage';

const router = Router();

// Health Check
router.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'WorkForce Backend Service',
    environment: process.env.NODE_ENV || 'development'
  });
});

// Platform Statistics
router.get('/stats', (req, res) => {
  res.json(backendStorage.getStats());
});

// --- JOBS ENDPOINTS ---
router.get('/jobs', (req, res) => {
  const { category, search, location } = req.query;
  let jobs = backendStorage.getJobs();

  if (category && category !== 'All') {
    jobs = jobs.filter(j => j.category === category);
  }

  if (search) {
    const q = (search as string).toLowerCase();
    jobs = jobs.filter(j => 
      j.title.toLowerCase().includes(q) ||
      j.company.toLowerCase().includes(q) ||
      j.skillsRequired.some(s => s.toLowerCase().includes(q))
    );
  }

  if (location) {
    const loc = (location as string).toLowerCase();
    jobs = jobs.filter(j => j.location.toLowerCase().includes(loc));
  }

  res.json({ success: true, data: jobs, total: jobs.length });
});

router.get('/jobs/:id', (req, res) => {
  const job = backendStorage.getJobById(req.params.id);
  if (!job) {
    return res.status(404).json({ success: false, message: 'Job posting not found' });
  }
  res.json({ success: true, data: job });
});

router.post('/jobs', (req, res) => {
  const newJob = {
    ...req.body,
    id: `job-${Date.now()}`,
    postedDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    applicantsCount: 0,
    status: 'Active'
  };
  backendStorage.addJob(newJob);
  res.status(201).json({ success: true, data: newJob });
});

// --- CANDIDATES ENDPOINTS ---
router.get('/candidates', (req, res) => {
  const candidates = backendStorage.getCandidates();
  res.json({ success: true, data: candidates, total: candidates.length });
});

router.post('/candidates', (req, res) => {
  const newCand = {
    ...req.body,
    id: `cand-${Date.now()}`,
    registeredDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    status: req.body.status || 'Registered',
    profileCompletion: req.body.profileCompletion || 85
  };
  backendStorage.addCandidate(newCand);
  res.status(201).json({ success: true, data: newCand });
});

router.patch('/candidates/:id/status', (req, res) => {
  const { status } = req.body;
  const updated = backendStorage.updateCandidateStatus(req.params.id, status);
  if (!updated) {
    return res.status(404).json({ success: false, message: 'Candidate not found' });
  }
  res.json({ success: true, data: updated });
});

// --- EMPLOYERS ENDPOINTS ---
router.get('/employers', (req, res) => {
  const employers = backendStorage.getEmployers();
  res.json({ success: true, data: employers });
});

router.post('/employers', (req, res) => {
  const newEmp = {
    ...req.body,
    id: `emp-${Date.now()}`,
    joinedDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    status: 'Active'
  };
  backendStorage.addEmployer(newEmp);
  res.status(201).json({ success: true, data: newEmp });
});

// --- APPLICATIONS ENDPOINTS ---
router.get('/applications', (req, res) => {
  const apps = backendStorage.getApplications();
  res.json({ success: true, data: apps });
});

router.post('/applications', (req, res) => {
  const newApp = {
    ...req.body,
    id: `app-${Date.now()}`,
    appliedDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    status: 'Under Review'
  };
  backendStorage.addApplication(newApp);
  res.status(201).json({ success: true, data: newApp });
});

// --- ENQUIRIES ENDPOINTS ---
router.get('/enquiries', (req, res) => {
  const enquiries = backendStorage.getEnquiries();
  res.json({ success: true, data: enquiries });
});

router.post('/enquiries', (req, res) => {
  const newEnquiry = {
    ...req.body,
    id: `enq-${Date.now()}`,
    submissionDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    status: 'New'
  };
  backendStorage.addEnquiry(newEnquiry);
  res.status(201).json({ success: true, data: newEnquiry });
});

// --- AUTH VERIFICATION ENDPOINT ---
router.post('/auth/admin-login', (req, res) => {
  const { username, password } = req.body;
  // Standard Admin credentials: Admin@123
  if ((username === 'Admin@123' || username === 'admin' || username === 'admin@workforce.com') && password === 'Admin@123') {
    return res.json({
      success: true,
      user: {
        id: 'admin-1',
        name: 'System Administrator',
        email: 'admin@workforce.com',
        phone: '+91 6309116432',
        role: 'admin'
      },
      token: 'admin-auth-token-verified'
    });
  }
  return res.status(401).json({ success: false, message: 'Invalid Admin credentials' });
});

// --- AUDIT LOGS ---
router.get('/audit-logs', (req, res) => {
  res.json({ success: true, data: backendStorage.getAuditLogs() });
});

export default router;
