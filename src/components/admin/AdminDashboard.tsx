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
    <div className="min-h-screen bg-[#FBFBFB] text-black pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Control Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-[24px] bg-white border border-gray-200 shadow-xs">
          <div>
            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-gray-500 hover:text-black transition-colors mb-3 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Public Agency Site</span>
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-normal text-black tracking-tight">
                  NYSAX Executive <span className="italic font-serif">Command Center</span>
                </h1>
                <p className="text-xs text-gray-500 font-mono">
                  Logged in as: <span className="text-black font-semibold">{user?.email}</span> (Administrator)
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleExportJSON}
              className="px-5 py-2.5 rounded-full bg-gray-100 hover:bg-black hover:text-white text-black border border-gray-200 text-xs font-mono uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer"
              title="Download full database snapshot"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Database (JSON)</span>
            </button>
            <button
              onClick={logout}
              className="px-5 py-2.5 rounded-full bg-black hover:bg-gray-800 text-white text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Real-time KPI Stats Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-6 rounded-[24px] bg-white border border-gray-200 space-y-1 shadow-xs">
            <div className="flex items-center justify-between text-gray-500 text-xs font-mono uppercase">
              <span>Total Registered Users</span>
              <Users className="w-4 h-4 text-black" />
            </div>
            <p className="text-3xl font-mono font-bold text-black tracking-tight">{users.length}</p>
            <p className="text-[11px] text-gray-500 font-mono">Active in database</p>
          </div>

          <div className="p-6 rounded-[24px] bg-white border border-gray-200 space-y-1 shadow-xs">
            <div className="flex items-center justify-between text-gray-500 text-xs font-mono uppercase">
              <span>Leads & Inquiries</span>
              <MessageSquare className="w-4 h-4 text-black" />
            </div>
            <p className="text-3xl font-mono font-bold text-black tracking-tight">{leads.length}</p>
            <p className="text-[11px] text-black font-mono font-semibold">
              {leads.filter(l => l.status === 'new').length} new unread
            </p>
          </div>

          <div className="p-6 rounded-[24px] bg-white border border-gray-200 space-y-1 shadow-xs">
            <div className="flex items-center justify-between text-gray-500 text-xs font-mono uppercase">
              <span>Active Client Campaigns</span>
              <Briefcase className="w-4 h-4 text-black" />
            </div>
            <p className="text-3xl font-mono font-bold text-black tracking-tight">{projects.length}</p>
            <p className="text-[11px] text-gray-500 font-mono">SEO, Web, Email & Social</p>
          </div>

          <div className="p-6 rounded-[24px] bg-white border border-gray-200 space-y-1 shadow-xs">
            <div className="flex items-center justify-between text-gray-500 text-xs font-mono uppercase">
              <span>Pipeline Value</span>
              <DollarSign className="w-4 h-4 text-black" />
            </div>
            <p className="text-3xl font-mono font-bold text-black tracking-tight">$74,500</p>
            <p className="text-[11px] text-gray-500 font-mono">Estimated deal pipeline</p>
          </div>
        </div>

        {/* Tab Selection & Search Filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex rounded-full bg-gray-200/70 p-1.5 max-w-md">
            <button
              onClick={() => setActiveTab('leads')}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all cursor-pointer ${
                activeTab === 'leads' ? 'bg-black text-white shadow-xs' : 'text-gray-600 hover:text-black'
              }`}
            >
              Leads & CRM ({leads.length})
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all cursor-pointer ${
                activeTab === 'users' ? 'bg-black text-white shadow-xs' : 'text-gray-600 hover:text-black'
              }`}
            >
              User Accounts ({users.length})
            </button>
            <button
              onClick={() => setActiveTab('projects')}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all cursor-pointer ${
                activeTab === 'projects' ? 'bg-black text-white shadow-xs' : 'text-gray-600 hover:text-black'
              }`}
            >
              Client Projects ({projects.length})
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search by name, email, brand..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-full bg-white border border-gray-200 text-black text-xs placeholder:text-gray-400 focus:outline-none focus:border-black shadow-xs"
              />
            </div>

            {activeTab === 'leads' && (
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2.5 rounded-full bg-white border border-gray-200 text-black text-xs font-mono focus:outline-none focus:border-black shadow-xs cursor-pointer"
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
          <div className="rounded-[24px] bg-white border border-gray-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FBFBFB] text-gray-500 uppercase text-[10px] font-mono tracking-wider border-b border-gray-200">
                  <tr>
                    <th className="py-4 px-5 font-medium">Lead Contact</th>
                    <th className="py-4 px-5 font-medium">Service Needed</th>
                    <th className="py-4 px-5 font-medium">Budget</th>
                    <th className="py-4 px-5 font-medium">Source</th>
                    <th className="py-4 px-5 font-medium">Date</th>
                    <th className="py-4 px-5 font-medium">Status</th>
                    <th className="py-4 px-5 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-800">
                  {filteredLeads.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center py-10 text-gray-400 font-mono">
                        No leads match your criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredLeads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-gray-50/70 transition-colors">
                        <td className="py-4 px-5">
                          <div className="font-semibold text-black">{lead.name}</div>
                          <div className="text-[11px] text-gray-500 font-mono">{lead.email}</div>
                          {lead.websiteOrHandle && (
                            <div className="text-[10px] text-black font-mono mt-0.5">{lead.websiteOrHandle}</div>
                          )}
                          {lead.message && (
                            <div className="text-[11px] text-gray-600 italic mt-1 line-clamp-2 max-w-xs">
                              "{lead.message}"
                            </div>
                          )}
                        </td>
                        <td className="py-4 px-5 font-medium text-black">
                          {lead.service}
                        </td>
                        <td className="py-4 px-5 font-mono text-black font-semibold">
                          {lead.budget || 'Not specified'}
                        </td>
                        <td className="py-4 px-5">
                          <span className="px-2.5 py-0.5 rounded-full bg-gray-100 border border-gray-200 text-[10px] font-mono uppercase text-gray-700">
                            {lead.source.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="py-4 px-5 text-gray-500 font-mono text-[11px]">
                          {new Date(lead.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-4 px-5">
                          <select
                            value={lead.status}
                            onChange={(e) => handleUpdateLeadStatus(lead.id, e.target.value as Lead['status'])}
                            className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-gray-100 border border-gray-200 text-black focus:outline-none focus:border-black cursor-pointer"
                          >
                            <option value="new">New</option>
                            <option value="contacted">Contacted</option>
                            <option value="in_review">In Review</option>
                            <option value="closed">Closed / Won</option>
                          </select>
                        </td>
                        <td className="py-4 px-5 text-right">
                          <a
                            href={`mailto:${lead.email}?subject=NYSAX Growth Strategy Follow-up for ${lead.name}`}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black hover:bg-gray-800 text-white text-xs font-mono uppercase tracking-wider transition-colors"
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
          <div className="rounded-[24px] bg-white border border-gray-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FBFBFB] text-gray-500 uppercase text-[10px] font-mono tracking-wider border-b border-gray-200">
                  <tr>
                    <th className="py-4 px-5 font-medium">User</th>
                    <th className="py-4 px-5 font-medium">Email</th>
                    <th className="py-4 px-5 font-medium">Role</th>
                    <th className="py-4 px-5 font-medium">Company</th>
                    <th className="py-4 px-5 font-medium">Service Focus</th>
                    <th className="py-4 px-5 font-medium">Registered</th>
                    <th className="py-4 px-5 font-medium text-right">Role Management</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-800">
                  {filteredUsers.map((u) => (
                    <tr key={u.id} className="hover:bg-gray-50/70 transition-colors">
                      <td className="py-4 px-5 font-semibold text-black">
                        {u.name}
                      </td>
                      <td className="py-4 px-5 text-gray-700 font-mono">
                        {u.email}
                      </td>
                      <td className="py-4 px-5">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase ${
                            u.role === 'admin'
                              ? 'bg-black text-white'
                              : 'bg-gray-100 text-gray-800 border border-gray-200'
                          }`}
                        >
                          {u.role}
                        </span>
                      </td>
                      <td className="py-4 px-5 text-gray-700">
                        {u.company || '—'}
                      </td>
                      <td className="py-4 px-5 text-black font-medium">
                        {u.serviceInterest || 'All Services'}
                      </td>
                      <td className="py-4 px-5 text-gray-500 font-mono text-[11px]">
                        {new Date(u.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-5 text-right">
                        <button
                          onClick={() => handleToggleUserRole(u)}
                          className="px-3.5 py-1.5 rounded-full bg-gray-100 hover:bg-black hover:text-white text-black text-xs font-mono uppercase tracking-wider border border-gray-200 transition-colors cursor-pointer"
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
                className="p-6 rounded-[24px] bg-white border border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2.5 py-0.5 rounded-full bg-gray-100 border border-gray-200 text-black text-[10px] font-mono uppercase">
                      {proj.serviceCategory}
                    </span>
                    <span className="text-xs text-gray-500 font-mono">Client: {proj.clientName} ({proj.clientEmail})</span>
                  </div>
                  <h4 className="text-base font-semibold text-black">{proj.title}</h4>
                  <p className="text-xs text-gray-500 font-mono mt-1">Timeline: {proj.startDate} to {proj.targetDate}</p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className="text-xs text-gray-500 font-mono uppercase">Status</span>
                    <p className="text-sm font-mono font-bold text-black capitalize">{proj.status.replace('_', ' ')} ({proj.progress}%)</p>
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
