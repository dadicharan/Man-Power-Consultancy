import { 
  Candidate, 
  Job, 
  Employer, 
  Application, 
  EmployerEnquiry, 
  ContactMessage, 
  AuditLog 
} from '../types';

// In-memory data store with live state
export class BackendStorage {
  private candidates: Candidate[] = [];
  private jobs: Job[] = [];
  private employers: Employer[] = [];
  private applications: Application[] = [];
  private enquiries: EmployerEnquiry[] = [];
  private contactMessages: ContactMessage[] = [];
  private auditLogs: AuditLog[] = [];

  constructor() {
    this.seedInitialData();
  }

  private seedInitialData() {
    this.jobs = [
      {
        id: 'job-1',
        title: 'Senior Full Stack Engineer (React + Node.js)',
        slug: 'senior-full-stack-engineer-react-nodejs',
        company: 'CloudMatrix Technologies Pvt Ltd',
        category: 'IT & Software',
        location: 'Bangalore, India',
        employmentType: 'Full Time',
        workMode: 'Hybrid',
        experienceLevel: '5-8 Years',
        salaryMin: 1400000,
        salaryMax: 2200000,
        salaryCurrency: 'INR',
        salaryPeriod: 'P.A.',
        salaryDisplay: 'INR 14,00,000 - 22,00,000 P.A.',
        description: 'Lead engineering squad in architecting resilient web solutions.',
        keyResponsibilities: ['Architect responsive frontend interfaces', 'Build robust Node.js backend microservices'],
        requirements: ['5+ years relevant experience with React and TypeScript', 'Proficiency in Node.js'],
        skillsRequired: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker'],
        openings: 3,
        postedDate: '12 Apr 2025',
        expiryDate: '12 May 2025',
        featured: false,
        urgent: true,
        status: 'Active',
        applicantsCount: 18
      },
      {
        id: 'job-2',
        title: 'Lead Plant Operations Manager',
        slug: 'lead-plant-operations-manager',
        company: 'Bharat Precision Industrial Ltd',
        category: 'Manufacturing',
        location: 'Visakhapatnam, Andhra Pradesh',
        employmentType: 'Full Time',
        workMode: 'On-site',
        experienceLevel: '8-12 Years',
        salaryMin: 1000000,
        salaryMax: 1600000,
        salaryCurrency: 'INR',
        salaryPeriod: 'P.A.',
        salaryDisplay: 'INR 10,00,000 - 16,00,000 P.A.',
        description: 'Supervise industrial manufacturing operations, shift schedules, and technical workforce teams.',
        keyResponsibilities: ['Lead team of 150+ operational staff', 'Ensure quality control standards'],
        requirements: ['B.Tech / Mechanical Engineering', '8+ years shop-floor management experience'],
        skillsRequired: ['Plant Management', 'Six Sigma', 'Lean Manufacturing', 'Team Leadership'],
        openings: 2,
        postedDate: '14 Apr 2025',
        expiryDate: '28 May 2025',
        featured: false,
        urgent: false,
        status: 'Active',
        applicantsCount: 9
      }
    ];

    this.candidates = [
      {
        id: 'cand-1',
        fullName: 'Rohit Sharma',
        email: 'rohit@gmail.com',
        phone: '+91 9876543210',
        currentLocation: 'Bangalore, India',
        highestQualification: 'B.Tech / B.E. Computer Science',
        currentJobTitle: 'Software Developer',
        totalExperience: '5 - 7 Years',
        skills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker'],
        gender: 'Male',
        expectedSalary: 'INR 18,00,000 - 22,00,000 P.A.',
        status: 'Shortlisted',
        registeredDate: '10 Apr 2025',
        profileCompletion: 95
      }
    ];

    this.employers = [
      {
        id: 'emp-1',
        companyName: 'CloudMatrix Technologies Pvt Ltd',
        industry: 'IT & Software',
        contactPerson: 'Suresh Menon',
        designation: 'VP of Talent Acquisition',
        email: 'talent@cloudmatrix.io',
        phone: '+91 9876500001',
        city: 'Bangalore',
        state: 'Karnataka',
        status: 'Active',
        totalPositionsPosted: 6,
        activeOpenings: 3,
        joinedDate: '15 Jan 2025'
      }
    ];

    this.auditLogs = [
      {
        id: 'log-1',
        action: 'System Boot',
        performedBy: 'System',
        timestamp: new Date().toISOString(),
        details: 'Backend server initialized with backend storage service.'
      }
    ];
  }

  // Jobs
  getJobs(): Job[] {
    return this.jobs;
  }

  getJobById(id: string): Job | undefined {
    return this.jobs.find(j => j.id === id || j.slug === id);
  }

  addJob(job: Job): Job {
    this.jobs.unshift(job);
    this.addAuditLog('Job Created', 'Employer/Admin', `Job created: ${job.title}`);
    return job;
  }

  // Candidates
  getCandidates(): Candidate[] {
    return this.candidates;
  }

  getCandidateById(id: string): Candidate | undefined {
    return this.candidates.find(c => c.id === id);
  }

  addCandidate(candidate: Candidate): Candidate {
    this.candidates.unshift(candidate);
    this.addAuditLog('Candidate Registered', candidate.fullName, `Candidate registered: ${candidate.fullName}`);
    return candidate;
  }

  updateCandidateStatus(id: string, status: Candidate['status']): Candidate | null {
    const candidate = this.candidates.find(c => c.id === id);
    if (candidate) {
      candidate.status = status;
      this.addAuditLog('Candidate Status Updated', 'Admin', `Status updated to ${status} for ${candidate.fullName}`);
      return candidate;
    }
    return null;
  }

  // Employers
  getEmployers(): Employer[] {
    return this.employers;
  }

  addEmployer(employer: Employer): Employer {
    this.employers.unshift(employer);
    this.addAuditLog('Employer Added', 'System', `Employer added: ${employer.companyName}`);
    return employer;
  }

  // Applications
  getApplications(): Application[] {
    return this.applications;
  }

  addApplication(app: Application): Application {
    this.applications.unshift(app);
    // increment job applicants count
    const job = this.jobs.find(j => j.id === app.jobId);
    if (job) {
      job.applicantsCount = (job.applicantsCount || 0) + 1;
    }
    this.addAuditLog('Application Submitted', app.candidateName, `Applied to ${app.jobTitle}`);
    return app;
  }

  // Enquiries
  getEnquiries(): EmployerEnquiry[] {
    return this.enquiries;
  }

  addEnquiry(enquiry: EmployerEnquiry): EmployerEnquiry {
    this.enquiries.unshift(enquiry);
    this.addAuditLog('Staffing Enquiry', enquiry.companyName, `Enquiry for ${enquiry.staffingType}`);
    return enquiry;
  }

  // Contact Messages
  getContactMessages(): ContactMessage[] {
    return this.contactMessages;
  }

  addContactMessage(msg: ContactMessage): ContactMessage {
    this.contactMessages.unshift(msg);
    return msg;
  }

  // Audit Logs
  getAuditLogs(): AuditLog[] {
    return this.auditLogs;
  }

  addAuditLog(action: string, performedBy: string, details: string) {
    this.auditLogs.unshift({
      id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      action,
      performedBy,
      timestamp: new Date().toISOString(),
      details
    });
  }

  // Stats
  getStats() {
    return {
      activeCandidates: this.candidates.length,
      activeJobs: this.jobs.filter(j => j.status === 'Active').length,
      partnerEmployers: this.employers.length,
      totalApplications: this.applications.length,
      placementRate: '94.8%'
    };
  }
}

export const backendStorage = new BackendStorage();
