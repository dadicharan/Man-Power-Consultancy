import * as XLSX from 'xlsx';
import { Application, Candidate, EmployerEnquiry, ContactMessage, Job } from '../types';

/**
 * Generic helper to convert an object or array of objects into an Excel (.xlsx) file and trigger download.
 */
export function exportToExcel(
  sheetName: string,
  data: Record<string, any>[],
  fileName: string
): boolean {
  try {
    if (!data || data.length === 0) return false;

    // Create a new workbook
    const wb = XLSX.utils.book_new();
    
    // Create worksheet
    const ws = XLSX.utils.json_to_sheet(data);

    // Auto-fit column widths
    const colWidths = Object.keys(data[0] || {}).map(key => {
      const maxLen = Math.max(
        key.length,
        ...data.map(row => (row[key] ? String(row[key]).length : 0))
      );
      return { wch: Math.min(Math.max(maxLen + 3, 12), 40) };
    });
    ws['!cols'] = colWidths;

    // Append worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, sheetName.slice(0, 31));

    // Generate and download
    const cleanFileName = fileName.endsWith('.xlsx') ? fileName : `${fileName}.xlsx`;
    XLSX.writeFile(wb, cleanFileName);
    return true;
  } catch (err) {
    console.error('Failed to export to Excel:', err);
    return false;
  }
}

/**
 * Save single or updated Job Application to an Excel sheet
 */
export function exportApplicationToExcel(app: Application): boolean {
  const row = {
    'Application ID': app.id,
    'Candidate Name': app.candidateName,
    'Candidate Email': app.candidateEmail,
    'Candidate Phone': app.candidatePhone,
    'Target Job Title': app.jobTitle,
    'Hiring Company': app.company,
    'Job Location': app.location,
    'Applied Date': app.appliedDate,
    'Current Stage': app.currentStage,
    'Resume Attached': app.resumeFileName || 'Standard Profile CV',
    'Cover Letter': app.coverLetter || 'N/A',
    'Recruiter Notes': app.recruiterNotes || '',
    'Timestamp': new Date().toISOString()
  };

  const safeName = (app.candidateName || 'Applicant').replace(/[^a-zA-Z0-9]/g, '_');
  return exportToExcel('Application Record', [row], `WorkForce_Application_${safeName}_${Date.now().toString().slice(-4)}.xlsx`);
}

/**
 * Save single Candidate Registration to an Excel sheet
 */
export function exportCandidateToExcel(candidate: Candidate): boolean {
  const row = {
    'Candidate ID': candidate.id,
    'Full Name': candidate.fullName,
    'Email Address': candidate.email,
    'Phone Number': candidate.phone,
    'Date of Birth': candidate.dob || 'N/A',
    'Gender': candidate.gender || 'N/A',
    'Current Location': candidate.currentLocation,
    'Highest Qualification': candidate.highestQualification,
    'University / College': candidate.university || 'N/A',
    'Graduation Year': candidate.passingYear || 'N/A',
    'Current Job Title': candidate.currentJobTitle,
    'Total Experience': candidate.totalExperience,
    'Key Skills': Array.isArray(candidate.skills) ? candidate.skills.join(', ') : candidate.skills,
    'Preferred Roles': Array.isArray(candidate.preferredRoles) ? candidate.preferredRoles.join(', ') : 'Open',
    'Expected Salary': candidate.expectedSalary || 'Negotiable',
    'Notice Period': candidate.noticePeriod || 'Immediate',
    'Resume File': candidate.resumeFileName || 'resume.pdf',
    'Registration Date': candidate.registeredDate,
    'System Status': candidate.status
  };

  const safeName = (candidate.fullName || 'Candidate').replace(/[^a-zA-Z0-9]/g, '_');
  return exportToExcel('Candidate Profile', [row], `WorkForce_Candidate_${safeName}_${Date.now().toString().slice(-4)}.xlsx`);
}

/**
 * Save single Employer Hiring Enquiry to an Excel sheet
 */
export function exportEnquiryToExcel(enq: EmployerEnquiry): boolean {
  const row = {
    'Enquiry Reference': enq.id,
    'Company Name': enq.companyName,
    'Contact Person': enq.contactPerson,
    'Designation': enq.designation,
    'Official Email': enq.email,
    'Contact Phone': enq.phone,
    'Company Location': enq.companyLocation,
    'Target Job Title': enq.jobTitle,
    'Staffing Type': enq.jobType || 'Permanent',
    'Required Vacancies': enq.vacancies,
    'Preferred Skills': enq.preferredSkills || 'N/A',
    'Additional Requirements': enq.additionalRequirements || 'Standard Requisition',
    'Submission Date': enq.createdAt,
    'Enquiry Status': enq.status
  };

  const safeName = (enq.companyName || 'Company').replace(/[^a-zA-Z0-9]/g, '_');
  return exportToExcel('Employer Enquiry', [row], `WorkForce_Enquiry_${safeName}_${Date.now().toString().slice(-4)}.xlsx`);
}

/**
 * Save single Contact Us message to an Excel sheet
 */
export function exportContactToExcel(contact: ContactMessage): boolean {
  const row = {
    'Message ID': contact.id,
    'Sender Name': contact.name,
    'Sender Email': contact.email,
    'Sender Phone': contact.phone,
    'Subject': contact.subject,
    'Message Details': contact.message,
    'Date Received': contact.createdAt,
    'Status': contact.status
  };

  const safeName = (contact.name || 'Contact').replace(/[^a-zA-Z0-9]/g, '_');
  return exportToExcel('Contact Message', [row], `WorkForce_Contact_${safeName}_${Date.now().toString().slice(-4)}.xlsx`);
}

/**
 * Save single Job Requisition to an Excel sheet
 */
export function exportJobToExcel(job: Job): boolean {
  const row = {
    'Job ID': job.id,
    'Job Title': job.title,
    'Company': job.company,
    'Location': job.location,
    'Category': job.category,
    'Employment Type': job.employmentType,
    'Work Mode': job.workMode,
    'Salary Range': job.salary,
    'Vacancies': job.vacancies,
    'Experience Required': job.experienceDisplay,
    'Qualification': job.qualification,
    'Key Skills': Array.isArray(job.skills) ? job.skills.join(', ') : job.skills,
    'Status': job.status,
    'Posted Date': job.postedDate
  };

  const safeName = (job.title || 'Job').replace(/[^a-zA-Z0-9]/g, '_');
  return exportToExcel('Job Opening', [row], `WorkForce_Job_${safeName}_${Date.now().toString().slice(-4)}.xlsx`);
}

/**
 * Bulk exports for Admin Console
 */
export function exportAllApplicationsToExcel(applications: Application[]): boolean {
  const data = applications.map(app => ({
    'Application ID': app.id,
    'Candidate Name': app.candidateName,
    'Candidate Email': app.candidateEmail,
    'Candidate Phone': app.candidatePhone,
    'Target Job': app.jobTitle,
    'Company': app.company,
    'Location': app.location,
    'Applied Date': app.appliedDate,
    'Current Stage': app.currentStage,
    'Resume': app.resumeFileName || 'resume.pdf',
    'Notes': app.recruiterNotes || ''
  }));
  return exportToExcel('ATS Applications', data, `WorkForce_All_Applications_${new Date().toISOString().slice(0, 10)}.xlsx`);
}

export function exportAllCandidatesToExcel(candidates: Candidate[]): boolean {
  const data = candidates.map(c => ({
    'Candidate ID': c.id,
    'Full Name': c.fullName,
    'Email': c.email,
    'Phone': c.phone,
    'Location': c.currentLocation,
    'Qualification': c.highestQualification,
    'Experience': c.totalExperience,
    'Current Title': c.currentJobTitle,
    'Skills': Array.isArray(c.skills) ? c.skills.join(', ') : c.skills,
    'Expected Salary': c.expectedSalary || '',
    'Notice Period': c.noticePeriod || '',
    'Registered Date': c.registeredDate,
    'Status': c.status
  }));
  return exportToExcel('Candidates Talent Pool', data, `WorkForce_All_Candidates_${new Date().toISOString().slice(0, 10)}.xlsx`);
}

export function exportAllEnquiriesToExcel(enquiries: EmployerEnquiry[]): boolean {
  const data = enquiries.map(e => ({
    'Enquiry ID': e.id,
    'Company': e.companyName,
    'Contact Person': e.contactPerson,
    'Designation': e.designation,
    'Email': e.email,
    'Phone': e.phone,
    'Location': e.companyLocation,
    'Requirement': e.jobTitle,
    'Vacancies': e.vacancies,
    'Skills': e.preferredSkills || '',
    'Created At': e.createdAt,
    'Status': e.status
  }));
  return exportToExcel('Employer Enquiries', data, `WorkForce_All_Enquiries_${new Date().toISOString().slice(0, 10)}.xlsx`);
}

export function exportAllJobsToExcel(jobs: Job[]): boolean {
  const data = jobs.map(j => ({
    'Job ID': j.id,
    'Job Title': j.title,
    'Company': j.company,
    'Category': j.category,
    'Location': j.location,
    'Type': j.employmentType,
    'Salary': j.salary,
    'Openings': j.vacancies,
    'Experience': j.experienceDisplay,
    'Status': j.status,
    'Applications': j.applicationsCount
  }));
  return exportToExcel('Active Jobs', data, `WorkForce_All_Jobs_${new Date().toISOString().slice(0, 10)}.xlsx`);
}

// Aliases for convenience
export const exportJobsToExcel = exportAllJobsToExcel;
export const exportCandidatesToExcel = exportAllCandidatesToExcel;
export const exportApplicationsToExcel = exportAllApplicationsToExcel;
export const exportEnquiriesToExcel = exportAllEnquiriesToExcel;
