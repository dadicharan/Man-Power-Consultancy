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
  profileCompletion: number; // percentage e.g. 85
  notes?: string;
}

export type JobCategory = 
  | 'IT & Software'
  | 'Engineering'
  | 'Healthcare'
  | 'Sales & Marketing'
  | 'Finance & Accounts'
  | 'HR & Admin'
  | 'BPO & Customer Support'
  | 'Manufacturing'
  | 'Logistics'
  | 'Others';

export type EmploymentType = 'Full Time' | 'Part Time' | 'Contract' | 'Temporary' | 'Internship';
export type WorkMode = 'On-site' | 'Hybrid' | 'Remote';

export interface Job {
  id: string;
  title: string;
  slug: string;
  company: string;
  companyLogo?: string;
  location: string;
  category: JobCategory;
  industry: string;
  employmentType: EmploymentType;
  workMode: WorkMode;
  experienceMin: number;
  experienceMax: number;
  experienceDisplay: string; // e.g. "3 - 5 Years"
  salary: string; // e.g. "â¹ 6,00,000 - 9,00,000 P.A."
  vacancies: number;
  qualification: string;
  skills: string[];
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  deadline: string;
  status: 'Published' | 'Pending Review' | 'Draft' | 'Closed';
  featured: boolean;
  postedDate: string;
  applicationsCount: number;
}

export type ApplicationStage = 
  | 'Applied' 
  | 'Screening' 
  | 'Shortlisted' 
  | 'Interview' 
  | 'Selected' 
  | 'Rejected' 
  | 'Joined';

export interface Application {
  id: string;
  candidateId: string;
  candidateName: string;
  candidateEmail: string;
  candidatePhone: string;
  jobId: string;
  jobTitle: string;
  company: string;
  location: string;
  appliedDate: string;
  status: ApplicationStage;
  currentStage: ApplicationStage;
  resumeFileName?: string;
  coverLetter?: string;
  recruiterNotes?: string;
  interviewDate?: string;
  updatedAt: string;
}

export interface Employer {
  id: string;
  companyName: string;
  website: string;
  contactPerson: string;
  designation: string;
  email: string;
  phone: string;
  industry: string;
  companySize: string;
  location: string;
  description?: string;
  status: 'Active' | 'Pending' | 'Deactivated';
  postedJobsCount: number;
  activeApplicationsCount: number;
  registeredDate: string;
}

export interface EmployerEnquiry {
  id: string;
  companyName: string;
  contactPerson: string;
  designation: string;
  email: string;
  phone: string;
  companyLocation: string;
  website?: string;
  jobTitle: string;
  jobType?: string;
  vacancies: number;
  preferredSkills?: string;
  additionalRequirements?: string;
  status: 'New' | 'In Progress' | 'Contacted' | 'Resolved' | 'Closed' | 'Pending' | 'In-Review';
  createdAt: string;
  notes?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: 'Unread' | 'Read' | 'Replied';
  createdAt: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  slug: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  imageUrl: string;
  benefits: string[];
  features?: string[];
  industries: string[];
  process: string[];
  featured: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  company: string;
  designation: string;
  message: string;
  rating: number;
  avatarUrl: string;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: 'application' | 'enquiry' | 'job' | 'candidate' | 'system';
  read: boolean;
  timestamp: string;
  link?: string;
}

export interface AuditLog {
  id: string;
  user: string;
  action: string;
  entity: string;
  entityId: string;
  timestamp: string;
  details?: string;
}
