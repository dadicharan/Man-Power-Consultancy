// Frontend API client to communicate with the Express backend (/api/*)

export async function fetchHealth() {
  const res = await fetch('/api/health');
  return res.json();
}

export async function fetchPlatformStats() {
  const res = await fetch('/api/stats');
  return res.json();
}

export async function fetchBackendJobs(params?: { category?: string; search?: string; location?: string }) {
  const query = new URLSearchParams(params as Record<string, string>).toString();
  const res = await fetch(`/api/jobs${query ? `?${query}` : ''}`);
  return res.json();
}

export async function postCandidateRegistration(candidateData: any) {
  const res = await fetch('/api/candidates', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(candidateData)
  });
  return res.json();
}

export async function postJobApplication(applicationData: any) {
  const res = await fetch('/api/applications', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(applicationData)
  });
  return res.json();
}

export async function postStaffingEnquiry(enquiryData: any) {
  const res = await fetch('/api/enquiries', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(enquiryData)
  });
  return res.json();
}

export async function verifyAdminCredentials(credentials: { username: string; password: string }) {
  const res = await fetch('/api/auth/admin-login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  });
  return res.json();
}
