import { User, Lead, Project, SupportTicket, ClientReview } from '../types';
import { db as firestore, doc, setDoc, getDocs, collection } from './firebase';

const USERS_KEY = 'nysax_users_db_v1';
const LEADS_KEY = 'nysax_leads_db_v1';
const PROJECTS_KEY = 'nysax_projects_db_v1';
const TICKETS_KEY = 'nysax_tickets_db_v1';
const REVIEWS_KEY = 'nysax_reviews_db_v1';
const BOOKINGS_KEY = 'nysax_bookings_db_v1';
const CURRENT_USER_KEY = 'nysax_current_user_v1';

export const ADMIN_EMAIL = 'nysaxofficial@gmail.com';

// Initial seed data for admin and sample clients
const INITIAL_USERS: User[] = [
  {
    id: 'user_admin_01',
    name: 'NYSAX Executive Command',
    email: ADMIN_EMAIL,
    password: 'admin',
    role: 'admin',
    company: 'NYSAX Agency Command',
    phone: '+91 99440 00000',
    serviceInterest: 'Executive Operations',
    createdAt: new Date().toISOString(),
    lastLogin: new Date().toISOString(),
  },
  {
    id: 'user_client_01',
    name: 'Sarah Jenkins',
    email: 'client@brand.com',
    password: 'client123',
    role: 'client',
    company: 'Aura Luxe Skincare',
    website: 'https://auraluxe.example.com',
    phone: '+1 (555) 349-9210',
    serviceInterest: 'Email Marketing & Retention',
    createdAt: new Date(Date.now() - 14 * 86400000).toISOString(),
    lastLogin: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: 'user_client_02',
    name: 'David Thorne',
    email: 'david@thorneapp.com',
    password: 'password123',
    role: 'client',
    company: 'Thorne AI SaaS',
    website: 'https://thorneapp.com',
    phone: '+1 (555) 892-1049',
    serviceInterest: 'SEO Optimization & Sales Strategy',
    createdAt: new Date(Date.now() - 7 * 86400000).toISOString(),
    lastLogin: new Date(Date.now() - 86400000).toISOString(),
  }
];

const INITIAL_LEADS: Lead[] = [
  {
    id: 'lead_01',
    name: 'Marcus Vance',
    email: 'marcus@vancecapital.io',
    service: 'SEO Optimization',
    budget: '$3,000 - $5,000/mo',
    websiteOrHandle: 'https://vancecapital.io',
    message: 'Looking to dominate high-intent finance keywords and rank #1 nationally.',
    source: 'contact_form',
    status: 'new',
    createdAt: new Date(Date.now() - 2 * 3600000).toISOString(),
  },
  {
    id: 'lead_02',
    name: 'Elena Rostova',
    email: 'elena@glowstudio.co',
    service: 'Newbies in Social Media Marketing',
    budget: '$1,500 - $3,000/mo',
    websiteOrHandle: '@glowstudio.official',
    message: 'We are completely new to Instagram reels and TikTok. Need complete zero-to-hero branding and content strategy.',
    source: 'chat_agent',
    status: 'contacted',
    createdAt: new Date(Date.now() - 6 * 3600000).toISOString(),
  },
  {
    id: 'lead_03',
    name: 'Liam Zhang',
    email: 'liam@nexusgear.shop',
    service: 'Email Marketing & Retention',
    budget: '$5,000+/mo',
    websiteOrHandle: 'https://nexusgear.shop',
    message: 'Need 10 automated Klaviyo flows built from scratch for our DTC storefront.',
    source: 'strategy_booking',
    status: 'in_review',
    createdAt: new Date(Date.now() - 24 * 3600000).toISOString(),
  }
];

const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj_01',
    clientId: 'user_client_01',
    clientName: 'Sarah Jenkins',
    clientEmail: 'client@brand.com',
    title: 'Aura Luxe - Full Klaviyo Lifecycle & Retention Automation',
    serviceCategory: 'email_marketing',
    status: 'in_progress',
    progress: 68,
    startDate: '2026-08-20',
    targetDate: '2026-10-01',
    deliverables: [
      { id: 'del_1', title: 'Customer Persona & Lifecycle Mapping', completed: true },
      { id: 'del_2', title: 'High-Converting Welcome Series (4 Emails)', completed: true },
      { id: 'del_3', title: 'Cart & Browse Abandonment Sequences', completed: true },
      { id: 'del_4', title: 'Post-Purchase Cross-Sell & VIP Flows', completed: false, dueDate: '2026-09-25' },
      { id: 'del_5', title: 'A/B Testing Subject Lines & Send-Time Optimization', completed: false, dueDate: '2026-10-01' }
    ],
    updates: [
      {
        id: 'up_1',
        date: '2026-09-14',
        author: 'NYSAX Account Lead',
        text: 'Welcome flow open rates hit 54.2% with a 4.1% placed-order rate in test phase.'
      },
      {
        id: 'up_2',
        date: '2026-09-08',
        author: 'NYSAX Copywriting Team',
        text: 'Completed email copy and branded design templates. Awaiting client review.'
      }
    ]
  },
  {
    id: 'proj_02',
    clientId: 'user_client_02',
    clientName: 'David Thorne',
    clientEmail: 'david@thorneapp.com',
    title: 'Thorne AI - Enterprise SEO Dominance & High-Intent Backlinks',
    serviceCategory: 'seo',
    status: 'in_progress',
    progress: 42,
    startDate: '2026-09-01',
    targetDate: '2026-11-15',
    deliverables: [
      { id: 'del_10', title: 'Core Web Vitals & Technical Speed Optimization', completed: true },
      { id: 'del_11', title: 'Competitive Keyword Gap Matrix (50 High-Intent Terms)', completed: true },
      { id: 'del_12', title: 'Topic Cluster Silos & Programmatic Pillar Pages', completed: false, dueDate: '2026-09-30' },
      { id: 'del_13', title: 'Tier-1 Authority Guest Posts & PR Backlinks', completed: false, dueDate: '2026-10-20' }
    ],
    updates: [
      {
        id: 'up_10',
        date: '2026-09-12',
        author: 'NYSAX SEO Strategist',
        text: 'Fixed 42 crawl depth errors and improved Google PageSpeed score from 48 to 96.'
      }
    ]
  }
];

const INITIAL_TICKETS: SupportTicket[] = [
  {
    id: 'tick_01',
    clientId: 'user_client_01',
    clientName: 'Sarah Jenkins',
    subject: 'Adding SMS Abandonment Integration to Klaviyo',
    category: 'Feature Request',
    priority: 'medium',
    status: 'open',
    createdAt: new Date(Date.now() - 18 * 3600000).toISOString(),
    messages: [
      {
        id: 'msg_1',
        sender: 'Sarah Jenkins',
        text: 'Hi team, can we also incorporate SMS marketing with Attentive/Klaviyo SMS into our abandonment flow?',
        createdAt: new Date(Date.now() - 18 * 3600000).toISOString(),
        isAdmin: false,
      },
      {
        id: 'msg_2',
        sender: 'NYSAX Admin',
        text: 'Absolutely Sarah! We are configuring the TCPA compliant opt-in banner right now and will sync it with your cart flow.',
        createdAt: new Date(Date.now() - 14 * 3600000).toISOString(),
        isAdmin: true,
      }
    ]
  }
];

// Helper functions for safe local persistence
export const db = {
  // Users
  getUsers: (): User[] => {
    try {
      const data = localStorage.getItem(USERS_KEY);
      let users: User[] = data ? JSON.parse(data) : INITIAL_USERS;

      // Filter out deprecated admin accounts
      users = users.filter(u => u.email.toLowerCase() !== 'admin@nysax.agency');

      // Ensure nysaxofficial@gmail.com is present as executive admin
      const hasAdmin = users.some(u => u.email.toLowerCase() === ADMIN_EMAIL.toLowerCase());
      if (!hasAdmin) {
        users.unshift({
          id: 'user_admin_01',
          name: 'NYSAX Executive Command',
          email: ADMIN_EMAIL,
          password: 'admin',
          role: 'admin',
          company: 'NYSAX Agency Command',
          phone: '+91 99440 00000',
          serviceInterest: 'Executive Operations',
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString(),
        });
      }

      // Enforce: ONLY nysaxofficial@gmail.com has admin role; all others are client
      users = users.map(u => {
        const isOfficialAdmin = u.email.toLowerCase() === ADMIN_EMAIL.toLowerCase();
        return {
          ...u,
          role: isOfficialAdmin ? ('admin' as const) : ('client' as const)
        };
      });

      localStorage.setItem(USERS_KEY, JSON.stringify(users));
      return users;
    } catch {
      return INITIAL_USERS;
    }
  },

  saveUser: (user: User): void => {
    const cleanEmail = user.email.toLowerCase().trim();
    const isOfficialAdmin = cleanEmail === ADMIN_EMAIL.toLowerCase();
    const userToSave: User = {
      ...user,
      email: cleanEmail,
      role: isOfficialAdmin ? 'admin' : 'client'
    };

    const users = db.getUsers();
    const existingIndex = users.findIndex(u => u.id === userToSave.id || u.email.toLowerCase() === cleanEmail);
    if (existingIndex >= 0) {
      users[existingIndex] = { ...users[existingIndex], ...userToSave };
    } else {
      users.push(userToSave);
    }
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    window.dispatchEvent(new Event('nysax_storage_update'));

    // Google Cloud Firestore Sync
    try {
      setDoc(doc(firestore, 'users', userToSave.id), userToSave, { merge: true }).catch(() => {});
    } catch (e) {}
  },

  findUserByEmail: (email: string): User | undefined => {
    const clean = email.toLowerCase().trim();
    const users = db.getUsers();
    let found = users.find(u => u.email.toLowerCase() === clean);

    if (!found && clean === ADMIN_EMAIL.toLowerCase()) {
      const adminUser: User = {
        id: 'user_admin_01',
        name: 'NYSAX Executive Command',
        email: ADMIN_EMAIL,
        password: 'admin',
        role: 'admin',
        company: 'NYSAX Agency Command',
        phone: '+91 99440 00000',
        serviceInterest: 'Executive Operations',
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
      };
      db.saveUser(adminUser);
      return adminUser;
    }

    if (found) {
      return {
        ...found,
        role: clean === ADMIN_EMAIL.toLowerCase() ? 'admin' : 'client'
      };
    }
    return undefined;
  },

  // Leads
  getLeads: (): Lead[] => {
    try {
      const data = localStorage.getItem(LEADS_KEY);
      if (!data) {
        localStorage.setItem(LEADS_KEY, JSON.stringify(INITIAL_LEADS));
        return INITIAL_LEADS;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_LEADS;
    }
  },

  saveLead: (lead: Omit<Lead, 'id' | 'createdAt'> & { id?: string; createdAt?: string }): Lead => {
    const leads = db.getLeads();
    const newLead: Lead = {
      id: lead.id || `lead_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      createdAt: lead.createdAt || new Date().toISOString(),
      name: lead.name,
      email: lead.email,
      service: lead.service,
      budget: lead.budget,
      websiteOrHandle: lead.websiteOrHandle,
      message: lead.message,
      source: lead.source,
      status: lead.status || 'new',
    };
    leads.unshift(newLead);
    localStorage.setItem(LEADS_KEY, JSON.stringify(leads));
    window.dispatchEvent(new Event('nysax_storage_update'));

    // Google Cloud Firestore Sync
    try {
      setDoc(doc(firestore, 'leads', newLead.id), newLead, { merge: true }).catch(() => {});
    } catch (e) {}

    return newLead;
  },

  updateLeadStatus: (leadId: string, status: Lead['status']): void => {
    const leads = db.getLeads();
    const index = leads.findIndex(l => l.id === leadId);
    if (index >= 0) {
      leads[index].status = status;
      localStorage.setItem(LEADS_KEY, JSON.stringify(leads));
      window.dispatchEvent(new Event('nysax_storage_update'));

      try {
        setDoc(doc(firestore, 'leads', leadId), { status }, { merge: true }).catch(() => {});
      } catch (e) {}
    }
  },

  // Projects
  getProjects: (): Project[] => {
    try {
      const data = localStorage.getItem(PROJECTS_KEY);
      if (!data) {
        localStorage.setItem(PROJECTS_KEY, JSON.stringify(INITIAL_PROJECTS));
        return INITIAL_PROJECTS;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_PROJECTS;
    }
  },

  getProjectsByClient: (clientId: string, clientEmail?: string): Project[] => {
    const all = db.getProjects();
    const cleanEmail = clientEmail?.toLowerCase().trim();
    return all.filter(p => p.clientId === clientId || (cleanEmail && p.clientEmail && p.clientEmail.toLowerCase() === cleanEmail));
  },

  saveProject: (project: Project): void => {
    const projects = db.getProjects();
    const index = projects.findIndex(p => p.id === project.id);
    if (index >= 0) {
      projects[index] = project;
    } else {
      projects.unshift(project);
    }
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
    window.dispatchEvent(new Event('nysax_storage_update'));

    // Google Cloud Firestore Sync
    try {
      setDoc(doc(firestore, 'projects', project.id), project, { merge: true }).catch(() => {});
    } catch (e) {}
  },

  // Bookings (persisted directly to Google Cloud Firestore)
  getBookings: (): any[] => {
    try {
      const data = localStorage.getItem(BOOKINGS_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  saveBooking: async (bookingData: any): Promise<void> => {
    const bookingId = `book_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`;
    const fullBooking = {
      id: bookingId,
      ...bookingData,
      createdAt: new Date().toISOString(),
    };

    try {
      const existing = db.getBookings();
      existing.unshift(fullBooking);
      localStorage.setItem(BOOKINGS_KEY, JSON.stringify(existing));
      window.dispatchEvent(new Event('nysax_storage_update'));
    } catch (e) {}

    // Google Cloud Firestore Sync
    try {
      await setDoc(doc(firestore, 'bookings', bookingId), fullBooking, { merge: true });
    } catch (e) {
      console.warn('[Firestore booking write notice]:', e);
    }
  },

  // Background Cloud Sync
  syncWithFirestore: async (): Promise<void> => {
    try {
      const [usersSnap, projectsSnap, leadsSnap] = await Promise.allSettled([
        getDocs(collection(firestore, 'users')),
        getDocs(collection(firestore, 'projects')),
        getDocs(collection(firestore, 'leads')),
      ]);

      if (usersSnap.status === 'fulfilled' && !usersSnap.value.empty) {
        const cloudUsers = usersSnap.value.docs.map((d) => d.data() as User);
        const currentUsers = db.getUsers();
        const mergedUsers = [...currentUsers];
        cloudUsers.forEach((cu) => {
          const idx = mergedUsers.findIndex(
            (lu) => lu.id === cu.id || lu.email.toLowerCase() === cu.email.toLowerCase()
          );
          if (idx >= 0) {
            mergedUsers[idx] = { ...mergedUsers[idx], ...cu };
          } else {
            mergedUsers.push(cu);
          }
        });
        localStorage.setItem(USERS_KEY, JSON.stringify(mergedUsers));
      }

      if (projectsSnap.status === 'fulfilled' && !projectsSnap.value.empty) {
        const cloudProjects = projectsSnap.value.docs.map((d) => d.data() as Project);
        const currentProjects = db.getProjects();
        const mergedProjects = [...currentProjects];
        cloudProjects.forEach((cp) => {
          const idx = mergedProjects.findIndex((lp) => lp.id === cp.id);
          if (idx >= 0) {
            mergedProjects[idx] = { ...mergedProjects[idx], ...cp };
          } else {
            mergedProjects.unshift(cp);
          }
        });
        localStorage.setItem(PROJECTS_KEY, JSON.stringify(mergedProjects));
      }

      window.dispatchEvent(new Event('nysax_storage_update'));
    } catch (err) {
      console.warn('[Firestore sync notice]:', err);
    }
  },

  // Tickets
  getTickets: (): SupportTicket[] => {
    try {
      const data = localStorage.getItem(TICKETS_KEY);
      if (!data) {
        localStorage.setItem(TICKETS_KEY, JSON.stringify(INITIAL_TICKETS));
        return INITIAL_TICKETS;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_TICKETS;
    }
  },

  getTicketsByClient: (clientId: string): SupportTicket[] => {
    const tickets = db.getTickets();
    return tickets.filter(t => t.clientId === clientId);
  },

  saveTicket: (ticket: SupportTicket): void => {
    const tickets = db.getTickets();
    const index = tickets.findIndex(t => t.id === ticket.id);
    if (index >= 0) {
      tickets[index] = ticket;
    } else {
      tickets.unshift(ticket);
    }
    localStorage.setItem(TICKETS_KEY, JSON.stringify(tickets));
    window.dispatchEvent(new Event('nysax_storage_update'));
  },

  // Current session
  getCurrentUser: (): User | null => {
    try {
      const data = localStorage.getItem(CURRENT_USER_KEY);
      if (!data) return null;
      const user: User = JSON.parse(data);
      const isOfficialAdmin = user.email.toLowerCase().trim() === ADMIN_EMAIL.toLowerCase();
      return {
        ...user,
        role: isOfficialAdmin ? 'admin' : 'client'
      };
    } catch {
      return null;
    }
  },

  setCurrentUser: (user: User | null): void => {
    if (user) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(CURRENT_USER_KEY);
    }
    window.dispatchEvent(new Event('nysax_auth_change'));
  },

  // Reviews & Authentic Feedback
  getReviews: (): ClientReview[] => {
    try {
      const data = localStorage.getItem(REVIEWS_KEY);
      if (!data) return [];
      return JSON.parse(data);
    } catch {
      return [];
    }
  },

  getApprovedReviews: (): ClientReview[] => {
    return db.getReviews().filter(r => r.status === 'approved' && r.is_verified);
  },

  saveReview: (review: Omit<ClientReview, 'id' | 'createdAt'> & { id?: string; createdAt?: string }): ClientReview => {
    const reviews = db.getReviews();
    const newRev: ClientReview = {
      id: review.id || `rev_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      createdAt: review.createdAt || new Date().toISOString(),
      author: review.author,
      role: review.role,
      company: review.company,
      rating: review.rating,
      feedback: review.feedback,
      service: review.service,
      status: review.status || 'pending',
      is_verified: review.is_verified || false,
    };
    reviews.unshift(newRev);
    localStorage.setItem(REVIEWS_KEY, JSON.stringify(reviews));
    window.dispatchEvent(new Event('nysax_storage_update'));
    return newRev;
  },

  updateReviewStatus: (reviewId: string, status: 'pending' | 'approved' | 'rejected'): void => {
    const reviews = db.getReviews();
    const idx = reviews.findIndex(r => r.id === reviewId);
    if (idx >= 0) {
      reviews[idx].status = status;
      reviews[idx].is_verified = status === 'approved';
      localStorage.setItem(REVIEWS_KEY, JSON.stringify(reviews));
      window.dispatchEvent(new Event('nysax_storage_update'));
    }
  },

  // Export DB for backup or inspection
  exportDatabaseJSON: (): string => {
    return JSON.stringify({
      users: db.getUsers(),
      leads: db.getLeads(),
      projects: db.getProjects(),
      tickets: db.getTickets(),
      reviews: db.getReviews(),
      exportedAt: new Date().toISOString(),
    }, null, 2);
  },

  resetDatabase: (): void => {
    localStorage.setItem(USERS_KEY, JSON.stringify(INITIAL_USERS));
    localStorage.setItem(LEADS_KEY, JSON.stringify(INITIAL_LEADS));
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(INITIAL_PROJECTS));
    localStorage.setItem(TICKETS_KEY, JSON.stringify(INITIAL_TICKETS));
    localStorage.removeItem(REVIEWS_KEY);
    window.dispatchEvent(new Event('nysax_storage_update'));
  }
};
