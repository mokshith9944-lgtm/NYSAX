import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserRole } from '../types';
import { db, ADMIN_EMAIL } from '../lib/storage';

interface RegisterData {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
  company?: string;
  website?: string;
  phone?: string;
  serviceInterest?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password?: string) => Promise<{ success: boolean; message?: string }>;
  register: (data: RegisterData) => Promise<{ success: boolean; message?: string }>;
  loginWithGoogle: (profile: { name: string; email: string; picture?: string; company?: string }) => Promise<{ success: boolean; role: UserRole; message?: string }>;
  sendEmailOtp: (email: string) => Promise<{ success: boolean; message?: string; verificationToken?: string }>;
  verifyEmailOtp: (email: string, otp: string, verificationToken: string, extraData?: { name?: string; company?: string; serviceInterest?: string }) => Promise<{ success: boolean; role: UserRole; message?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => db.getCurrentUser());

  useEffect(() => {
    const handleAuthChange = () => {
      setUser(db.getCurrentUser());
    };

    window.addEventListener('nysax_auth_change', handleAuthChange);
    window.addEventListener('storage', handleAuthChange);
    return () => {
      window.removeEventListener('nysax_auth_change', handleAuthChange);
      window.removeEventListener('storage', handleAuthChange);
    };
  }, []);

  const login = async (email: string, password?: string): Promise<{ success: boolean; message?: string }> => {
    const cleanEmail = email.trim().toLowerCase();
    const foundUser = db.findUserByEmail(cleanEmail);
    if (!foundUser) {
      return { success: false, message: 'Account not found with this email. Please register to create your account.' };
    }

    if (password && foundUser.password && foundUser.password !== password) {
      return { success: false, message: 'Invalid credentials. Please re-enter your password.' };
    }

    const assignedRole: UserRole = cleanEmail === ADMIN_EMAIL.toLowerCase() ? 'admin' : 'client';
    const updatedUser: User = {
      ...foundUser,
      role: assignedRole,
      lastLogin: new Date().toISOString()
    };
    db.saveUser(updatedUser);
    db.setCurrentUser(updatedUser);
    setUser(updatedUser);
    return { success: true };
  };

  const register = async (data: RegisterData): Promise<{ success: boolean; message?: string }> => {
    const cleanEmail = data.email.trim().toLowerCase();
    const existing = db.findUserByEmail(cleanEmail);
    if (existing) {
      return { success: false, message: 'An account with this email address already exists. Please log in.' };
    }

    // Strictly enforce: ONLY nysaxofficial@gmail.com is admin, all other emails are clients
    const assignedRole: UserRole = cleanEmail === ADMIN_EMAIL.toLowerCase() ? 'admin' : 'client';

    const newUser: User = {
      id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      name: data.name,
      email: cleanEmail,
      password: data.password,
      role: assignedRole,
      company: data.company || '',
      website: data.website || '',
      phone: data.phone || '',
      serviceInterest: data.serviceInterest || 'All Services',
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
    };

    db.saveUser(newUser);

    // If client registered, automatically initialize their onboarding project workspace
    if (newUser.role === 'client') {
      db.saveProject({
        id: `proj_${Date.now()}`,
        clientId: newUser.id,
        clientName: newUser.name,
        clientEmail: newUser.email,
        title: `${newUser.company || newUser.name}'s Growth Acceleration Campaign`,
        serviceCategory: 'website',
        status: 'planning',
        progress: 15,
        startDate: new Date().toISOString().split('T')[0],
        targetDate: new Date(Date.now() + 45 * 86400000).toISOString().split('T')[0],
        deliverables: [
          { id: 'del_init_1', title: 'Onboarding & Growth Roadmap Diagnostic', completed: true },
          { id: 'del_init_2', title: 'Strategy Brief & KPI Setup', completed: false },
          { id: 'del_init_3', title: 'Creative & Technical Execution Phase', completed: false }
        ],
        updates: [
          {
            id: 'up_init_1',
            date: new Date().toISOString().split('T')[0],
            author: 'NYSAX Welcome Desk',
            text: 'Account created! Your dedicated account strategist will review your campaign roadmap within 4 business hours.'
          }
        ]
      });
    }

    db.setCurrentUser(newUser);
    setUser(newUser);
    return { success: true };
  };

  const loginWithGoogle = async (profile: { name: string; email: string; picture?: string; company?: string }): Promise<{ success: boolean; role: UserRole; message?: string }> => {
    const cleanEmail = profile.email.trim().toLowerCase();
    const assignedRole: UserRole = cleanEmail === ADMIN_EMAIL.toLowerCase() ? 'admin' : 'client';
    const existing = db.findUserByEmail(cleanEmail);

    let targetUser: User;
    if (existing) {
      targetUser = {
        ...existing,
        role: assignedRole,
        name: profile.name || existing.name,
        lastLogin: new Date().toISOString()
      };
    } else {
      targetUser = {
        id: `user_g_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
        name: profile.name || cleanEmail.split('@')[0],
        email: cleanEmail,
        role: assignedRole,
        company: profile.company || '',
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
      };

      if (assignedRole === 'client') {
        db.saveProject({
          id: `proj_${Date.now()}`,
          clientId: targetUser.id,
          clientName: targetUser.name,
          clientEmail: targetUser.email,
          title: `${targetUser.name}'s Growth Acceleration Campaign`,
          serviceCategory: 'website',
          status: 'planning',
          progress: 15,
          startDate: new Date().toISOString().split('T')[0],
          targetDate: new Date(Date.now() + 45 * 86400000).toISOString().split('T')[0],
          deliverables: [
            { id: 'del_g_1', title: 'Google Identity Setup & Growth Audit', completed: true },
            { id: 'del_g_2', title: 'Performance Roadmap Strategy', completed: false },
            { id: 'del_g_3', title: 'Conversion Funnel Execution', completed: false }
          ],
          updates: [
            {
              id: 'up_g_1',
              date: new Date().toISOString().split('T')[0],
              author: 'NYSAX Welcome Desk',
              text: 'Authenticated with Google. Your dedicated account strategist has been notified.'
            }
          ]
        });
      }
    }

    db.saveUser(targetUser);
    db.setCurrentUser(targetUser);
    setUser(targetUser);
    return { success: true, role: assignedRole };
  };

  const sendEmailOtp = async (email: string): Promise<{ success: boolean; message?: string; verificationToken?: string }> => {
    try {
      const res = await fetch('/api/auth-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'send', email }),
      });
      const data = await res.json();
      return data;
    } catch (err: any) {
      return { success: false, message: 'Failed to communicate with OTP verification server.' };
    }
  };

  const verifyEmailOtp = async (
    email: string,
    otp: string,
    verificationToken: string,
    extraData?: { name?: string; company?: string; serviceInterest?: string }
  ): Promise<{ success: boolean; role: UserRole; message?: string }> => {
    const cleanEmail = email.trim().toLowerCase();
    const assignedRole: UserRole = cleanEmail === ADMIN_EMAIL.toLowerCase() ? 'admin' : 'client';

    try {
      const res = await fetch('/api/auth-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'verify', email: cleanEmail, otp, verificationToken }),
      });
      const result = await res.json();

      if (!result.success) {
        return { success: false, role: assignedRole, message: result.message || 'Invalid passcode.' };
      }

      // Code is valid! Establish session in local DB
      const existing = db.findUserByEmail(cleanEmail);
      let sessionUser: User;

      if (existing) {
        sessionUser = {
          ...existing,
          role: assignedRole,
          lastLogin: new Date().toISOString()
        };
      } else {
        sessionUser = {
          id: `user_otp_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
          name: extraData?.name || cleanEmail.split('@')[0],
          email: cleanEmail,
          role: assignedRole,
          company: extraData?.company || '',
          serviceInterest: extraData?.serviceInterest || 'General Inbound',
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString(),
        };

        if (assignedRole === 'client') {
          db.saveProject({
            id: `proj_${Date.now()}`,
            clientId: sessionUser.id,
            clientName: sessionUser.name,
            clientEmail: sessionUser.email,
            title: `${sessionUser.company || sessionUser.name}'s Growth Acceleration Campaign`,
            serviceCategory: 'website',
            status: 'planning',
            progress: 15,
            startDate: new Date().toISOString().split('T')[0],
            targetDate: new Date(Date.now() + 45 * 86400000).toISOString().split('T')[0],
            deliverables: [
              { id: 'del_otp_1', title: 'Email Verified & Onboarding Roadmapped', completed: true },
              { id: 'del_otp_2', title: 'Strategy Brief & Deliverables Setup', completed: false },
              { id: 'del_otp_3', title: 'Creative & Technical Execution Phase', completed: false }
            ],
            updates: [
              {
                id: 'up_otp_1',
                date: new Date().toISOString().split('T')[0],
                author: 'NYSAX Welcome Desk',
                text: 'Email verified via OTP. Your dedicated account strategist will review your campaign roadmap within 4 business hours.'
              }
            ]
          });
        }
      }

      db.saveUser(sessionUser);
      db.setCurrentUser(sessionUser);
      setUser(sessionUser);
      return { success: true, role: assignedRole };
    } catch (err: any) {
      return { success: false, role: assignedRole, message: 'Network error verifying passcode.' };
    }
  };

  const logout = () => {
    db.setCurrentUser(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin: user?.email.toLowerCase().trim() === ADMIN_EMAIL.toLowerCase(),
        login,
        register,
        loginWithGoogle,
        sendEmailOtp,
        verifyEmailOtp,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
