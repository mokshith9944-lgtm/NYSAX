import React, { useState } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { RoiCalculator } from './components/RoiCalculator';
import { CaseStudies } from './components/CaseStudies';
import { Process } from './components/Process';
import { Testimonials } from './components/Testimonials';
import { Faq } from './components/Faq';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ChatAgent } from './components/chat/ChatAgent';
import { AuthModal } from './components/auth/AuthModal';
import { BookingModal } from './components/booking/BookingModal';
import { AuditModal } from './components/audit/AuditModal';
import { ClientPortal } from './components/portal/ClientPortal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { UserRole } from './types';

const MainApp: React.FC = () => {
  const { user, isAuthenticated, isAdmin } = useAuth();
  const [currentView, setCurrentView] = useState<'home' | 'client_portal' | 'admin_dashboard'>('home');
  
  // Modals state
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authInitialMode, setAuthInitialMode] = useState<'login' | 'register'>('login');
  const [authInitialRole, setAuthInitialRole] = useState<UserRole>('client');
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [auditModalOpen, setAuditModalOpen] = useState(false);

  const handleOpenAuth = (mode: 'login' | 'register' = 'login', role: UserRole = 'client') => {
    setAuthInitialMode(mode);
    setAuthInitialRole(role);
    setAuthModalOpen(true);
  };

  const handleAuthSuccess = (role: UserRole) => {
    if (role === 'admin') {
      setCurrentView('admin_dashboard');
    } else {
      setCurrentView('client_portal');
    }
  };

  return (
    <div className="min-h-screen bg-[#06080F] text-slate-100 flex flex-col selection:bg-purple-500/30 selection:text-purple-200">
      {/* Top Navbar */}
      <Navbar
        onOpenAuth={handleOpenAuth}
        onOpenBooking={() => setBookingModalOpen(true)}
        onOpenAudit={() => setAuditModalOpen(true)}
        currentView={currentView}
        setCurrentView={setCurrentView}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {currentView === 'home' && (
          <>
            <Hero
              onOpenBooking={() => setBookingModalOpen(true)}
              onOpenAudit={() => setAuditModalOpen(true)}
            />
            <Services
              onOpenBooking={() => setBookingModalOpen(true)}
              onOpenAudit={() => setAuditModalOpen(true)}
            />
            <RoiCalculator
              onOpenBooking={() => setBookingModalOpen(true)}
            />
            <CaseStudies />
            <Process />
            <Testimonials />
            <Faq />
            <ContactSection
              onOpenBooking={() => setBookingModalOpen(true)}
            />
          </>
        )}

        {currentView === 'client_portal' && (
          <ClientPortal
            onBackToHome={() => setCurrentView('home')}
            onOpenBooking={() => setBookingModalOpen(true)}
          />
        )}

        {currentView === 'admin_dashboard' && (
          <AdminDashboard
            onBackToHome={() => setCurrentView('home')}
          />
        )}
      </main>

      {/* Footer (shown on home view) */}
      {currentView === 'home' && (
        <Footer
          onOpenAuth={handleOpenAuth}
          onOpenBooking={() => setBookingModalOpen(true)}
          onOpenAudit={() => setAuditModalOpen(true)}
          setCurrentView={setCurrentView}
        />
      )}

      {/* 24/7 Rule-Based AI Growth Advisor Chatbot */}
      <ChatAgent
        onOpenBooking={() => setBookingModalOpen(true)}
        onOpenAudit={() => setAuditModalOpen(true)}
      />

      {/* Modals */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authInitialMode}
        initialRole={authInitialRole}
        onSuccess={handleAuthSuccess}
      />

      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
      />

      <AuditModal
        isOpen={auditModalOpen}
        onClose={() => setAuditModalOpen(false)}
      />
      
      {/* Vercel Web Analytics */}
      <Analytics />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
};

export default App;
