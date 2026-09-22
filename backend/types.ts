export type UserRole = 'guest' | 'candidate' | 'employer' | 'recruiter' | 'hr_manager' | 'admin' | 'super_admin';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatarUrl?: string;
  companyName?: string;
}

export interface Candidate {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  dob?: string;
  gender: 'Male' | 'Female' | 'Other' | string;
  currentLocation: string;
  highestQualification: string;
  university?: string;
  passingYear?: string;
  currentJobTitle: string;
  totalExperience: string;
  relevantExperience?: string;
  skills: string[];
  preferredRoles?: string[];
  preferredLocations?: string[];
  expectedSalary?: string;
  noticePeriod?: string;
  resumeFileName?: string;
  resumeUrl?: string;
  profilePhotoUrl?: string;
  appliedFor?: string;
  status: 'Registered' | 'Screening' | 'Shortlisted' | 'Interviewing' | 'Placed' | 'Archived';
  registeredDate: string;
  profileCompletion: number;
  notes?: string;
}

export interface Job {
  id: string;
  title: string;
  slug: string;
  company: string;
  companyLogoUrl?: string;
  category: string;
  location: string;
  employmentType: string;
  workMode: string;
  experienceLevel: string;
  salaryMin?: number;
  salaryMax?: number;
  salaryCurrency: string;
  salaryPeriod: string;
  salaryDisplay: string;
  description: string;
  keyResponsibilities: string[];
  requirements: string[];
  skillsRequired: string[];
  openings: number;
  postedDate: string;
  expiryDate: string;
  featured: boolean;
  urgent: boolean;
  status: 'Active' | 'Paused' | 'Closed';
  applicantsCount: number;
  contactEmail?: string;
  contactPhone?: string;
}

export interface Employer {
  id: string;
  companyName: string;
  industry: string;
  contactPerson: string;
  designation: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  status: 'Active' | 'Pending Verification' | 'Inactive';
  totalPositionsPosted: number;
  activeOpenings: number;
  joinedDate: string;
  notes?: string;
}

export interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  candidateId: string;
  candidateName: string;
  candidateEmail: string;
  candidatePhone: string;
  totalExperience: string;
  resumeFileName?: string;
  appliedDate: string;
  status: 'Under Review' | 'Shortlisted' | 'Interview Scheduled' | 'Offered' | 'Hired' | 'Rejected';
  notes?: string;
}

export interface EmployerEnquiry {
  id: string;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  staffingType: string;
  requiredPositions: string;
  numberOfStaff: number;
  location: string;
  message?: string;
  submissionDate: string;
  status: 'New' | 'Contacted' | 'Proposal Sent' | 'Closed Won' | 'Closed Lost';
}

export interface ContactMessage {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  date: string;
  status: 'Unread' | 'Replied' | 'Archived';
}

export interface AuditLog {
  id: string;
  action: string;
  performedBy: string;
  timestamp: string;
  details: string;
}
