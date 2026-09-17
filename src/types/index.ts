export type UserRole = 'client' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: UserRole;
  company?: string;
  website?: string;
  phone?: string;
  serviceInterest?: string;
  createdAt: string;
  lastLogin?: string;
  avatarUrl?: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  service: string;
  budget?: string;
  websiteOrHandle?: string;
  message?: string;
  source: 'contact_form' | 'chat_agent' | 'audit_modal' | 'strategy_booking';
  status: 'new' | 'contacted' | 'in_review' | 'closed';
  createdAt: string;
}

export interface Project {
  id: string;
  clientId: string;
  clientName: string;
  clientEmail: string;
  title: string;
  serviceCategory: 'seo' | 'website' | 'sales_strategy' | 'email_marketing' | 'social_media_newbies';
  status: 'planning' | 'in_progress' | 'review' | 'completed';
  progress: number; // 0 to 100
  startDate: string;
  targetDate: string;
  deliverables: {
    id: string;
    title: string;
    completed: boolean;
    dueDate?: string;
  }[];
  updates: {
    id: string;
    date: string;
    author: string;
    text: string;
  }[];
}

export interface SupportTicket {
  id: string;
  clientId: string;
  clientName: string;
  subject: string;
  category: string;
  priority: 'low' | 'medium' | 'high';
  status: 'open' | 'pending' | 'resolved';
  messages: {
    id: string;
    sender: string;
    text: string;
    createdAt: string;
    isAdmin: boolean;
  }[];
  createdAt: string;
}

export interface ServiceDetail {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  features: string[];
  metrics: string;
  timeline: string;
  deliverables: string[];
  idealFor: string;
}
