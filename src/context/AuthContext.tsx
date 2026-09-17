import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserRole } from '../types';
import { db } from '../lib/storage';

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
  logout: () => void;
  quickDemoLogin: (role: UserRole) => void;
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
    const foundUser = db.findUserByEmail(email);
    if (!foundUser) {
      return { success: false, message: 'Account not found with this email. Please check your spelling or register.' };
    }

    if (password && foundUser.password && foundUser.password !== password) {
      return { success: false, message: 'Invalid password. Try again or use one-click demo login.' };
    }

    const updatedUser = {
      ...foundUser,
      lastLogin: new Date().toISOString()
    };
    db.saveUser(updatedUser);
    db.setCurrentUser(updatedUser);
    setUser(updatedUser);
    return { success: true };
  };

  const register = async (data: RegisterData): Promise<{ success: boolean; message?: string }> => {
    const existing = db.findUserByEmail(data.email);
    if (existing) {
      return { success: false, message: 'An account with this email address already exists. Please log in.' };
    }

    const newUser: User = {
      id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      name: data.name,
      email: data.email.trim(),
      password: data.password,
      role: data.role || 'client',
      company: data.company || '',
      website: data.website || '',
      phone: data.phone || '',
      serviceInterest: data.serviceInterest || 'All Services',
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
    };

    db.saveUser(newUser);

    // If client selected a service, automatically create their first onboarding project placeholder
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
            author: 'NYSAX Welcome Bot',
            text: 'Account created! Your dedicated account strategist will reach out within 4 business hours.'
          }
        ]
      });
    }

    db.setCurrentUser(newUser);
    setUser(newUser);
    return { success: true };
  };

  const logout = () => {
    db.setCurrentUser(null);
    setUser(null);
  };

  const quickDemoLogin = (role: UserRole) => {
    if (role === 'admin') {
      login('admin@nysax.agency', 'admin123');
    } else {
      login('client@brand.com', 'client123');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        login,
        register,
        logout,
        quickDemoLogin,
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
