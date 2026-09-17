import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Users, 
  MessageSquare, 
  Briefcase, 
  TrendingUp, 
  Search, 
  ArrowLeft, 
  Download, 
  Mail, 
  CheckCircle2, 
  Clock, 
  ChevronDown, 
  RotateCcw, 
  Sparkles, 
  ExternalLink, 
  DollarSign,
  Star,
  Check,
  X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../lib/storage';
import { User, Lead, Project, ClientReview } from '../../types';

interface AdminDashboardProps {
  onBackToHome: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBackToHome }) => {
  const { user, logout } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [reviews, setReviews] = useState<ClientReview[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'leads' | 'users' | 'projects' | 'reviews'>('leads');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const refreshData = () => {
    setUsers(db.getUsers());
    setLeads(db.getLeads());
    setProjects(db.getProjects());
    setReviews(db.getReviews());
  };

  useEffect(() => {
    refreshData();
    window.addEventListener('nysax_storage_update', refreshData);
    return () => window.removeEventListener('nysax_storage_update', refreshData);
  }, []);

  const handleUpdateLeadStatus = (leadId: string, newStatus: Lead['status']) => {
    db.updateLeadStatus(leadId, newStatus);
    refreshData();
  };

  const handleToggleUserRole = (targetUser: User) => {
    const updatedRole = targetUser.role === 'admin' ? 'client' : 'admin';
    db.saveUser({ ...targetUser, role: updatedRole });
    refreshData();
  };

  const handleUpdateReviewStatus = (reviewId: string, newStatus: 'pending' | 'approved' | 'rejected') => {
    db.updateReviewStatus(reviewId, newStatus);
    refreshData();
  };

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(db.exportDatabaseJSON());
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `nysa_agency_snapshot_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const filteredLeads = leads.filter((l) => {
    const matchesSearch = 
      l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.service.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || l.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (u.company && u.company.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const pendingReviewsCount = reviews.filter(r => r.status === 'pending').length;

  return (
    <div className="min-h-screen bg-black/90 text-white pt-24 pb-16 border-t border-neutral-900 font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Control Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-none bg-neutral-950/80 border border-neutral-800">
          <div>
            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-neutral-400 hover:text-white transition-colors mb-3 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Public Studio Site</span>
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-none bg-white text-black flex items-center justify-center border border-white">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-light text-white uppercase tracking-tight">
                  Nysa Agency // Executive Command Suite
                </h1>
                <p className="text-xs text-neutral-400 font-mono mt-0.5">
                  Principals: <span className="text-white">Nikhil • Mokshith • Amaresh</span> | Session: <span className="text-white">{user?.email}</span>
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleExportJSON}
              className="px-4 py-2.5 rounded-none bg-neutral-900 hover:bg-white hover:text-black text-white border border-neutral-800 text-xs font-mono uppercase tracking-widest transition-colors flex items-center gap-2 cursor-pointer"
              title="Download full database snapshot"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Snapshot</span>
            </button>
            <button
              onClick={logout}
              className="px-4 py-2.5 rounded-none bg-white text-black hover:bg-neutral-200 text-xs font-mono uppercase tracking-widest transition-colors cursor-pointer border border-white"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Real-time KPI Stats Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-6 rounded-none bg-neutral-950/80 border border-neutral-800 space-y-1">
            <div className="flex items-center justify-between text-neutral-500 text-[10px] uppercase tracking-widest">
              <span>Client Accounts</span>
              <Users className="w-4 h-4 text-white" />
            </div>
            <p className="text-3xl font-light text-white">{users.length}</p>
            <p className="text-[10px] text-neutral-500 uppercase tracking-wider">Registered in database</p>
          </div>

          <div className="p-6 rounded-none bg-neutral-950/80 border border-neutral-800 space-y-1">
            <div className="flex items-center justify-between text-neutral-500 text-[10px] uppercase tracking-widest">
              <span>Inquiries / Leads</span>
              <MessageSquare className="w-4 h-4 text-white" />
            </div>
            <p className="text-3xl font-light text-white">{leads.length}</p>
            <p className="text-[10px] text-white uppercase tracking-wider">
              {leads.filter(l => l.status === 'new').length} uncontacted
            </p>
          </div>

          <div className="p-6 rounded-none bg-neutral-950/80 border border-neutral-800 space-y-1">
            <div className="flex items-center justify-between text-neutral-500 text-[10px] uppercase tracking-widest">
              <span>Active Projects</span>
              <Briefcase className="w-4 h-4 text-white" />
            </div>
            <p className="text-3xl font-light text-white">{projects.length}</p>
            <p className="text-[10px] text-neutral-500 uppercase tracking-wider">Deployments & Retainers</p>
          </div>

          <div className="p-6 rounded-none bg-neutral-950/80 border border-neutral-800 space-y-1">
            <div className="flex items-center justify-between text-neutral-500 text-[10px] uppercase tracking-widest">
              <span>Client Reviews</span>
              <Star className="w-4 h-4 text-white" />
            </div>
            <p className="text-3xl font-light text-white">{reviews.length}</p>
            <p className="text-[10px] text-neutral-400 uppercase tracking-wider">{pendingReviewsCount} pending moderation</p>
          </div>
        </div>

        {/* Tab Selection & Search Filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex rounded-none bg-neutral-950 border border-neutral-800 p-1 max-w-xl">
            <button
              onClick={() => setActiveTab('leads')}
              className={`px-4 py-2 rounded-none text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'leads' ? 'bg-white text-black' : 'text-neutral-400 hover:text-white'
              }`}
            >
              CRM Leads ({leads.length})
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`px-4 py-2 rounded-none text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'users' ? 'bg-white text-black' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Accounts ({users.length})
            </button>
            <button
              onClick={() => setActiveTab('projects')}
              className={`px-4 py-2 rounded-none text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'projects' ? 'bg-white text-black' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Projects ({projects.length})
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`px-4 py-2 rounded-none text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'reviews' ? 'bg-white text-black' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Feedback ({reviews.length}) {pendingReviewsCount > 0 && `• ${pendingReviewsCount}`}
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Filter entries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-none bg-neutral-950 border border-neutral-800 text-white text-xs placeholder:text-neutral-500 focus:outline-none focus:border-white font-mono"
              />
            </div>

            {activeTab === 'leads' && (
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2.5 rounded-none bg-neutral-950 border border-neutral-800 text-white text-xs font-mono focus:outline-none focus:border-white cursor-pointer"
              >
                <option value="all">All Statuses</option>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="in_review">In Review</option>
                <option value="closed">Closed</option>
              </select>
            )}
          </div>
        </div>

        {/* Tab 1: Leads CRM Table */}
        {activeTab === 'leads' && (
          <div className="rounded-none bg-neutral-950/80 border border-neutral-800 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-neutral-900 text-neutral-400 uppercase text-[10px] font-mono tracking-widest border-b border-neutral-800">
                  <tr>
                    <th className="py-4 px-5 font-normal">Lead Contact</th>
                    <th className="py-4 px-5 font-normal">Service Focus</th>
                    <th className="py-4 px-5 font-normal">Budget</th>
                    <th className="py-4 px-5 font-normal">Source</th>
                    <th className="py-4 px-5 font-normal">Date</th>
                    <th className="py-4 px-5 font-normal">Status</th>
                    <th className="py-4 px-5 font-normal text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-900 text-neutral-300">
                  {filteredLeads.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center py-10 text-neutral-500 font-mono">
                        No leads match current criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredLeads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-neutral-900/60 transition-colors">
                        <td className="py-4 px-5">
                          <div className="font-normal text-white uppercase">{lead.name}</div>
                          <div className="text-[11px] text-neutral-400 font-mono">{lead.email}</div>
                          {lead.websiteOrHandle && (
                            <div className="text-[10px] text-white font-mono mt-0.5">{lead.websiteOrHandle}</div>
                          )}
                          {lead.message && (
                            <div className="text-[11px] text-neutral-400 italic mt-1 line-clamp-2 max-w-xs font-sans font-light">
                              "{lead.message}"
                            </div>
                          )}
                        </td>
                        <td className="py-4 px-5 font-normal text-white">
                          {lead.service}
                        </td>
                        <td className="py-4 px-5 font-mono text-white">
                          {lead.budget || 'Unspecified'}
                        </td>
                        <td className="py-4 px-5">
                          <span className="px-2 py-0.5 rounded-none bg-neutral-900 border border-neutral-800 text-[10px] font-mono uppercase text-neutral-300">
                            {lead.source.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="py-4 px-5 text-neutral-400 font-mono text-[11px]">
                          {new Date(lead.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-4 px-5">
                          <select
                            value={lead.status}
                            onChange={(e) => handleUpdateLeadStatus(lead.id, e.target.value as Lead['status'])}
                            className="px-2.5 py-1 rounded-none text-xs font-mono bg-neutral-900 border border-neutral-700 text-white focus:outline-none focus:border-white cursor-pointer"
                          >
                            <option value="new">New</option>
                            <option value="contacted">Contacted</option>
                            <option value="in_review">In Review</option>
                            <option value="closed">Closed</option>
                          </select>
                        </td>
                        <td className="py-4 px-5 text-right">
                          <a
                            href={`mailto:${lead.email}?subject=[Nysa%20Agency]%20Executive%20Follow-up%20for%20${lead.name}`}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-none bg-white hover:bg-neutral-200 text-black text-xs font-mono uppercase tracking-widest transition-colors border border-white"
                          >
                            <Mail className="w-3 h-3" />
                            <span>Dispatch</span>
                          </a>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: User Accounts Table */}
        {activeTab === 'users' && (
          <div className="rounded-none bg-neutral-950/80 border border-neutral-800 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-neutral-900 text-neutral-400 uppercase text-[10px] font-mono tracking-widest border-b border-neutral-800">
                  <tr>
                    <th className="py-4 px-5 font-normal">Account</th>
                    <th className="py-4 px-5 font-normal">Email</th>
                    <th className="py-4 px-5 font-normal">Role</th>
                    <th className="py-4 px-5 font-normal">Entity</th>
                    <th className="py-4 px-5 font-normal">Retainer Discipline</th>
                    <th className="py-4 px-5 font-normal">Enrolled</th>
                    <th className="py-4 px-5 font-normal text-right">Privilege Control</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-900 text-neutral-300">
                  {filteredUsers.map((u) => (
                    <tr key={u.id} className="hover:bg-neutral-900/60 transition-colors">
                      <td className="py-4 px-5 font-normal text-white uppercase">
                        {u.name}
                      </td>
                      <td className="py-4 px-5 text-neutral-300 font-mono">
                        {u.email}
                      </td>
                      <td className="py-4 px-5">
                        <span
                          className={`px-2 py-0.5 rounded-none text-[10px] font-mono uppercase tracking-wider ${
                            u.role === 'admin'
                              ? 'bg-white text-black'
                              : 'bg-neutral-900 text-neutral-300 border border-neutral-700'
                          }`}
                        >
                          {u.role}
                        </span>
                      </td>
                      <td className="py-4 px-5 text-neutral-300">
                        {u.company || '—'}
                      </td>
                      <td className="py-4 px-5 text-white font-normal">
                        {u.serviceInterest || 'All Disciplines'}
                      </td>
                      <td className="py-4 px-5 text-neutral-400 font-mono text-[11px]">
                        {new Date(u.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-5 text-right">
                        <button
                          onClick={() => handleToggleUserRole(u)}
                          className="px-3.5 py-1 rounded-none bg-neutral-900 hover:bg-white hover:text-black text-white text-xs font-mono uppercase tracking-widest border border-neutral-700 transition-colors cursor-pointer"
                        >
                          Convert to {u.role === 'admin' ? 'Client' : 'Admin'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Projects Table */}
        {activeTab === 'projects' && (
          <div className="space-y-4">
            {projects.map((proj) => (
              <div
                key={proj.id}
                className="p-6 rounded-none bg-neutral-950/80 border border-neutral-800 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded-none bg-neutral-900 border border-neutral-800 text-white text-[10px] font-mono uppercase tracking-wider">
                      {proj.serviceCategory}
                    </span>
                    <span className="text-xs text-neutral-400 font-mono">Client: {proj.clientName} ({proj.clientEmail})</span>
                  </div>
                  <h4 className="text-base font-normal uppercase tracking-wide text-white">{proj.title}</h4>
                  <p className="text-xs text-neutral-500 font-mono mt-1">Timeline: {proj.startDate} to {proj.targetDate}</p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className="text-[10px] text-neutral-500 font-mono uppercase tracking-widest">Status</span>
                    <p className="text-sm font-mono text-white capitalize">{proj.status.replace('_', ' ')} ({proj.progress}%)</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 4: Client Feedback Moderation */}
        {activeTab === 'reviews' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                Authentic Client Feedback Stream ({reviews.length} total • {pendingReviewsCount} pending)
              </h3>
            </div>
            {reviews.length === 0 ? (
              <div className="p-12 rounded-none bg-neutral-950/80 border border-neutral-800 text-center text-xs text-neutral-500 font-mono">
                No client feedback submitted yet.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {reviews.map((rev) => (
                  <div
                    key={rev.id}
                    className={`p-6 rounded-none border transition-colors flex flex-col justify-between ${
                      rev.status === 'approved'
                        ? 'bg-neutral-950/90 border-neutral-700'
                        : rev.status === 'rejected'
                        ? 'bg-neutral-950/40 border-neutral-900 opacity-60'
                        : 'bg-neutral-900/80 border-white'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3.5 h-3.5 ${
                                i < rev.rating ? 'fill-white text-white' : 'text-neutral-800'
                              }`}
                            />
                          ))}
                          <span className="text-xs font-mono text-neutral-400 ml-2">({rev.rating}/5)</span>
                        </div>
                        <span className={`text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-none border ${
                          rev.status === 'approved'
                            ? 'bg-white text-black border-white'
                            : rev.status === 'rejected'
                            ? 'bg-neutral-900 text-neutral-500 border-neutral-800'
                            : 'bg-neutral-900 text-white border-neutral-400'
                        }`}>
                          {rev.status}
                        </span>
                      </div>

                      <p className="text-xs text-neutral-300 font-sans font-light leading-relaxed mb-4">
                        "{rev.feedback}"
                      </p>

                      <div className="border-t border-neutral-800 pt-3">
                        <p className="text-xs font-normal text-white uppercase tracking-wider">{rev.author}</p>
                        <p className="text-[10px] text-neutral-400 font-mono">{rev.role} • {rev.company}</p>
                        <p className="text-[10px] text-neutral-500 font-mono mt-0.5">{rev.service} • {new Date(rev.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-2 mt-6 pt-3 border-t border-neutral-900">
                      {rev.status !== 'approved' && (
                        <button
                          onClick={() => handleUpdateReviewStatus(rev.id, 'approved')}
                          className="px-3 py-1.5 rounded-none bg-white text-black hover:bg-neutral-200 text-[10px] font-mono uppercase tracking-widest transition-colors cursor-pointer border border-white"
                        >
                          Approve & Publish
                        </button>
                      )}
                      {rev.status !== 'rejected' && (
                        <button
                          onClick={() => handleUpdateReviewStatus(rev.id, 'rejected')}
                          className="px-3 py-1.5 rounded-none bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white text-[10px] font-mono uppercase tracking-widest transition-colors cursor-pointer border border-neutral-800"
                        >
                          Reject
                        </button>
                      )}
                      {rev.status !== 'pending' && (
                        <button
                          onClick={() => handleUpdateReviewStatus(rev.id, 'pending')}
                          className="px-2.5 py-1.5 rounded-none bg-neutral-900 text-neutral-500 hover:text-neutral-300 text-[10px] font-mono uppercase tracking-widest transition-colors cursor-pointer"
                        >
                          Reset
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
