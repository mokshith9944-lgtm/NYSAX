import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { WhyPartner } from './components/WhyPartner';
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
import PortalFieldCollection from './components/effects/PortalFieldCollection';

const MainApp: React.FC = () => {
  const { user, isAuthenticated, isAdmin } = useAuth();
  const [currentView, setCurrentView] = useState<'home' | 'client_portal' | 'admin_dashboard'>('home');
  
  // Modals state
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authInitialMode, setAuthInitialMode] = useState<'login' | 'register'>('login');
  const [authInitialRole, setAuthInitialRole] = useState<UserRole>('client');
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [auditModalOpen, setAuditModalOpen] = useState(false);

  // Sync state from URL pathname
  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname;
      if (path === '/portal/client') {
        if (!isAuthenticated) {
          handleOpenAuth('login', 'client');
          setCurrentView('home');
        } else {
          setCurrentView('client_portal');
        }
      } else if (path === '/admin') {
        if (!isAdmin) {
          handleOpenAuth('login', 'admin');
          setCurrentView('home');
        } else {
          setCurrentView('admin_dashboard');
        }
      } else {
        setCurrentView('home');
      }
    };

    handleLocationChange();
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, [isAuthenticated, isAdmin]);

  const setViewWithHistory = (view: 'home' | 'client_portal' | 'admin_dashboard') => {
    setCurrentView(view);
    const targetPath = view === 'home' ? '/' : view === 'client_portal' ? '/portal/client' : '/admin';
    if (window.location.pathname !== targetPath) {
      window.history.pushState({}, '', targetPath);
    }
  };

  const handleOpenAuth = (mode: 'login' | 'register' = 'login', role: UserRole = 'client') => {
    setAuthInitialMode(mode);
    setAuthInitialRole(role);
    setAuthModalOpen(true);
  };

  const handleAuthSuccess = (role: UserRole) => {
    if (role === 'admin') {
      setViewWithHistory('admin_dashboard');
    } else {
      setViewWithHistory('client_portal');
    }
  };

  return (
    <div className="relative min-h-screen bg-[#000000] text-white flex flex-col selection:bg-white selection:text-black">
      {/* Full-Website Ambient Portal Field Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-60">
        <PortalFieldCollection mode="dark" saturation={0} brightness={0.85} speed={0.8} />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Top Navbar */}
        <Navbar
          onOpenAuth={handleOpenAuth}
          onOpenBooking={() => setBookingModalOpen(true)}
          onOpenAudit={() => setAuditModalOpen(true)}
          currentView={currentView}
          setCurrentView={setViewWithHistory}
        />

      {/* Main View Router */}
      <main className="flex-1">
        {currentView === 'home' && (
          <>
            <Hero
              onOpenBooking={() => setBookingModalOpen(true)}
              onOpenAudit={() => setAuditModalOpen(true)}
            />
            <AboutSection
              onOpenBooking={() => setBookingModalOpen(true)}
            />
            <WhyPartner />
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
          setCurrentView={setViewWithHistory}
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
      </div>
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
