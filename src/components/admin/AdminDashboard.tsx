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
  DollarSign
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../lib/storage';
import { User, Lead, Project } from '../../types';

interface AdminDashboardProps {
  onBackToHome: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBackToHome }) => {
  const { user, logout } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'leads' | 'users' | 'projects'>('leads');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const refreshData = () => {
    setUsers(db.getUsers());
    setLeads(db.getLeads());
    setProjects(db.getProjects());
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

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(db.exportDatabaseJSON());
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `nysax_agency_database_${new Date().toISOString().split('T')[0]}.json`);
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

  return (
    <div className="min-h-screen bg-[#06080F] text-slate-100 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Control Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-[#0D1220] border border-cyan-500/20 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-40 bg-cyan-600/10 blur-[90px] pointer-events-none" />

          <div>
            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors mb-3"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Public Agency Site</span>
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-display font-black text-white">
                  NYSAX Executive Command Center
                </h1>
                <p className="text-xs text-slate-400">
                  Logged in as: <span className="text-cyan-300 font-semibold">{user?.email}</span> (Administrator)
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleExportJSON}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition-colors flex items-center gap-2"
              title="Download full database snapshot"
            >
              <Download className="w-3.5 h-3.5 text-cyan-400" />
              <span>Export Database (JSON)</span>
            </button>
            <button
              onClick={logout}
              className="px-4 py-2.5 rounded-xl bg-rose-600/20 hover:bg-rose-600 text-rose-200 hover:text-white border border-rose-500/30 text-xs font-semibold transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Real-time KPI Stats Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-[#0D1220] border border-white/10 space-y-1">
            <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
              <span>Total Registered Users</span>
              <Users className="w-4 h-4 text-purple-400" />
            </div>
            <p className="text-3xl font-display font-bold text-white tracking-tight">{users.length}</p>
            <p className="text-[11px] text-emerald-400 font-medium">Active in database</p>
          </div>

          <div className="p-5 rounded-2xl bg-[#0D1220] border border-white/10 space-y-1">
            <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
              <span>Leads & Inquiries</span>
              <MessageSquare className="w-4 h-4 text-cyan-400" />
            </div>
            <p className="text-3xl font-display font-bold text-white tracking-tight">{leads.length}</p>
            <p className="text-[11px] text-cyan-400 font-medium">
              {leads.filter(l => l.status === 'new').length} new unread
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#0D1220] border border-white/10 space-y-1">
            <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
              <span>Active Client Campaigns</span>
              <Briefcase className="w-4 h-4 text-indigo-400" />
            </div>
            <p className="text-3xl font-display font-bold text-white tracking-tight">{projects.length}</p>
            <p className="text-[11px] text-indigo-400 font-medium">SEO, Web, Email & Social</p>
          </div>

          <div className="p-5 rounded-2xl bg-[#0D1220] border border-white/10 space-y-1">
            <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
              <span>Pipeline Value</span>
              <DollarSign className="w-4 h-4 text-emerald-400" />
            </div>
            <p className="text-3xl font-display font-bold text-white tracking-tight">$74,500</p>
            <p className="text-[11px] text-emerald-400 font-medium">Estimated deal pipeline</p>
          </div>
        </div>

        {/* Tab Selection & Search Filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex rounded-2xl bg-slate-900 border border-white/10 p-1 max-w-md">
            <button
              onClick={() => setActiveTab('leads')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'leads' ? 'bg-cyan-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'
              }`}
            >
              Leads & CRM ({leads.length})
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'users' ? 'bg-cyan-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'
              }`}
            >
              User Accounts ({users.length})
            </button>
            <button
              onClick={() => setActiveTab('projects')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'projects' ? 'bg-cyan-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'
              }`}
            >
              Client Projects ({projects.length})
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search by name, email, brand..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>

            {activeTab === 'leads' && (
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500"
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
          <div className="rounded-3xl bg-[#0D1220] border border-white/10 overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#090D17] text-slate-400 uppercase text-[10px] tracking-wider border-b border-white/[0.08]">
                  <tr>
                    <th className="py-3.5 px-4 font-semibold">Lead Contact</th>
                    <th className="py-3.5 px-4 font-semibold">Service Needed</th>
                    <th className="py-3.5 px-4 font-semibold">Budget</th>
                    <th className="py-3.5 px-4 font-semibold">Source</th>
                    <th className="py-3.5 px-4 font-semibold">Date</th>
                    <th className="py-3.5 px-4 font-semibold">Status</th>
                    <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.06] text-slate-300">
                  {filteredLeads.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center py-10 text-slate-500">
                        No leads match your criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredLeads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="py-4 px-4">
                          <div className="font-semibold text-white">{lead.name}</div>
                          <div className="text-[11px] text-slate-400">{lead.email}</div>
                          {lead.websiteOrHandle && (
                            <div className="text-[10px] text-purple-400 mt-0.5">{lead.websiteOrHandle}</div>
                          )}
                          {lead.message && (
                            <div className="text-[11px] text-slate-400 italic mt-1 line-clamp-2 max-w-xs">
                              "{lead.message}"
                            </div>
                          )}
                        </td>
                        <td className="py-4 px-4 font-medium text-cyan-300">
                          {lead.service}
                        </td>
                        <td className="py-4 px-4 font-mono text-slate-200">
                          {lead.budget || 'Not specified'}
                        </td>
                        <td className="py-4 px-4">
                          <span className="px-2 py-0.5 rounded-md bg-white/[0.05] border border-white/[0.08] text-[10px] font-semibold uppercase text-slate-400">
                            {lead.source.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-slate-400 text-[11px]">
                          {new Date(lead.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-4 px-4">
                          <select
                            value={lead.status}
                            onChange={(e) => handleUpdateLeadStatus(lead.id, e.target.value as Lead['status'])}
                            className={`px-2.5 py-1 rounded-lg text-xs font-semibold focus:outline-none ${
                              lead.status === 'new'
                                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                                : lead.status === 'contacted'
                                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                                : lead.status === 'in_review'
                                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                                : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            }`}
                          >
                            <option value="new">New</option>
                            <option value="contacted">Contacted</option>
                            <option value="in_review">In Review</option>
                            <option value="closed">Closed / Won</option>
                          </select>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <a
                            href={`mailto:${lead.email}?subject=NYSAX Growth Strategy Follow-up for ${lead.name}`}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-600/20 hover:bg-purple-600 text-purple-200 hover:text-white transition-colors"
                          >
                            <Mail className="w-3.5 h-3.5" />
                            <span>Reply</span>
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
          <div className="rounded-3xl bg-[#0D1220] border border-white/10 overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#090D17] text-slate-400 uppercase text-[10px] tracking-wider border-b border-white/[0.08]">
                  <tr>
                    <th className="py-3.5 px-4 font-semibold">User</th>
                    <th className="py-3.5 px-4 font-semibold">Email</th>
                    <th className="py-3.5 px-4 font-semibold">Role</th>
                    <th className="py-3.5 px-4 font-semibold">Company</th>
                    <th className="py-3.5 px-4 font-semibold">Service Focus</th>
                    <th className="py-3.5 px-4 font-semibold">Registered</th>
                    <th className="py-3.5 px-4 font-semibold text-right">Role Management</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.06] text-slate-300">
                  {filteredUsers.map((u) => (
                    <tr key={u.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-4 px-4 font-semibold text-white">
                        {u.name}
                      </td>
                      <td className="py-4 px-4 text-slate-300">
                        {u.email}
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase ${
                            u.role === 'admin'
                              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                              : 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                          }`}
                        >
                          {u.role}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-slate-300">
                        {u.company || '—'}
                      </td>
                      <td className="py-4 px-4 text-purple-300">
                        {u.serviceInterest || 'All Services'}
                      </td>
                      <td className="py-4 px-4 text-slate-400 text-[11px]">
                        {new Date(u.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-4 text-right">
                        <button
                          onClick={() => handleToggleUserRole(u)}
                          className="px-3 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/10 text-slate-300 text-xs font-medium border border-white/10 transition-colors"
                        >
                          Make {u.role === 'admin' ? 'Client' : 'Admin'}
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
                className="p-6 rounded-3xl bg-[#0D1220] border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded bg-purple-500/15 text-purple-300 text-[10px] font-bold uppercase">
                      {proj.serviceCategory}
                    </span>
                    <span className="text-xs text-slate-400">Client: {proj.clientName} ({proj.clientEmail})</span>
                  </div>
                  <h4 className="text-base font-bold text-white">{proj.title}</h4>
                  <p className="text-xs text-slate-400 mt-1">Timeline: {proj.startDate} to {proj.targetDate}</p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className="text-xs text-slate-400">Status</span>
                    <p className="text-sm font-semibold text-emerald-400 capitalize">{proj.status.replace('_', ' ')} ({proj.progress}%)</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
