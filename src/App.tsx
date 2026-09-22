import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ApplyModal } from './components/common/ApplyModal';
import { EnquiryModal } from './components/common/EnquiryModal';
import { AuthModal } from './components/common/AuthModal';
import { NotificationToast } from './components/common/NotificationToast';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { JobsPage } from './pages/JobsPage';
import { JobDetailPage } from './pages/JobDetailPage';
import { JobSeekersPage } from './pages/JobSeekersPage';
import { CandidateRegistrationPage } from './pages/CandidateRegistrationPage';
import { CandidatePortalPage } from './pages/CandidatePortalPage';
import { EmployersPage } from './pages/EmployersPage';
import { EmployerEnquiryPage } from './pages/EmployerEnquiryPage';
import { ServicesPage } from './pages/ServicesPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { ContactPage } from './pages/ContactPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { TermsPrivacyPage } from './pages/TermsPrivacyPage';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}

function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 w-full overflow-x-hidden">
      <Navbar />
      
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/jobs" element={<JobsPage />} />
          <Route path="/jobs/:slug" element={<JobDetailPage />} />
          <Route path="/candidates" element={<JobSeekersPage />} />
          <Route path="/candidates/register" element={<CandidateRegistrationPage />} />
          <Route path="/candidate/portal" element={<CandidatePortalPage />} />
          <Route path="/employers" element={<EmployersPage />} />
          <Route path="/employer/enquiry" element={<EmployerEnquiryPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:slug" element={<ServiceDetailPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="/terms" element={<TermsPrivacyPage type="terms" />} />
          <Route path="/privacy" element={<TermsPrivacyPage type="privacy" />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>

      <Footer />

      {/* Global Modals */}
      <ApplyModal />
      <EnquiryModal />
      <AuthModal />
      <NotificationToast />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <ScrollToTop />
        <MainLayout />
      </BrowserRouter>
    </AppProvider>
  );
}
