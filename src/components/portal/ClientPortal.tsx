import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Send, 
  MessageSquare, 
  AlertCircle, 
  Calendar, 
  Sparkles, 
  ArrowLeft,
  LogOut,
  FolderDown,
  TrendingUp
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../lib/storage';
import { Project, SupportTicket } from '../../types';

interface ClientPortalProps {
  onBackToHome: () => void;
  onOpenBooking: () => void;
}

export const ClientPortal: React.FC<ClientPortalProps> = ({ onBackToHome, onOpenBooking }) => {
  const { user, logout } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [activeTab, setActiveTab] = useState<'campaigns' | 'tickets' | 'assets'>('campaigns');

  // New ticket state
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketCategory, setTicketCategory] = useState('Campaign Strategy');
  const [ticketMessage, setTicketMessage] = useState('');
  const [ticketSubmitted, setTicketSubmitted] = useState(false);

  useEffect(() => {
    if (!user) return;
    const clientProjects = db.getProjectsByClient(user.id);
    const clientTickets = db.getTicketsByClient(user.id);

    setProjects(clientProjects);
    setTickets(clientTickets);

    const handleStorageUpdate = () => {
      setProjects(db.getProjectsByClient(user.id));
      setTickets(db.getTicketsByClient(user.id));
    };

    window.addEventListener('nysax_storage_update', handleStorageUpdate);
    return () => window.removeEventListener('nysax_storage_update', handleStorageUpdate);
  }, [user]);

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !ticketSubject.trim() || !ticketMessage.trim()) return;

    const newTicket: SupportTicket = {
      id: `tick_${Date.now()}`,
      clientId: user.id,
      clientName: user.name,
      subject: ticketSubject,
      category: ticketCategory,
      priority: 'medium',
      status: 'open',
      createdAt: new Date().toISOString(),
      messages: [
        {
          id: `msg_${Date.now()}`,
          sender: user.name,
          text: ticketMessage,
          createdAt: new Date().toISOString(),
          isAdmin: false
        }
      ]
    };

    db.saveTicket(newTicket);
    setTicketSubject('');
    setTicketMessage('');
    setTicketSubmitted(true);
    setTimeout(() => setTicketSubmitted(false), 4000);
  };

  return (
    <div className="min-h-screen bg-[#06080F] text-slate-100 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Breadcrumb & User Welcome Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-[#0C111E] border border-white/10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-40 bg-purple-600/10 blur-[90px] pointer-events-none" />

          <div>
            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-2 text-xs font-semibold text-purple-400 hover:text-purple-300 transition-colors mb-3"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Public Agency Website</span>
            </button>
            <h1 className="text-2xl sm:text-3xl font-display font-black text-white">
              Welcome to Your Portal, {user?.name.split(' ')[0]}!
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Account: <span className="text-purple-300 font-medium">{user?.company || 'Personal Account'}</span> • Primary Goal: <span className="text-cyan-300 font-medium">{user?.serviceInterest || 'Growth Retainer'}</span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenBooking}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white text-xs font-bold shadow-lg shadow-purple-600/30 transition-all flex items-center gap-2"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Schedule Sync Call</span>
            </button>
            <button
              onClick={logout}
              className="p-2.5 rounded-xl bg-white/[0.05] hover:bg-rose-500/20 text-slate-400 hover:text-rose-300 border border-white/10 transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex rounded-2xl bg-slate-900/80 border border-white/10 p-1.5 max-w-md">
          <button
            onClick={() => setActiveTab('campaigns')}
            className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'campaigns'
                ? 'bg-purple-600 text-white shadow-lg'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            Active Campaigns ({projects.length})
          </button>
          <button
            onClick={() => setActiveTab('tickets')}
            className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'tickets'
                ? 'bg-purple-600 text-white shadow-lg'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            Direct Support ({tickets.length})
          </button>
          <button
            onClick={() => setActiveTab('assets')}
            className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'assets'
                ? 'bg-purple-600 text-white shadow-lg'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <FolderDown className="w-3.5 h-3.5" />
            Deliverables & Assets
          </button>
        </div>

        {/* Tab 1: Campaigns */}
        {activeTab === 'campaigns' && (
          <div className="space-y-6">
            {projects.length === 0 ? (
              <div className="p-12 rounded-3xl bg-[#0D1220] border border-white/10 text-center space-y-4">
                <Sparkles className="w-10 h-10 text-purple-400 mx-auto" />
                <h3 className="text-lg font-display font-bold text-white">
                  No Active Campaigns Yet
                </h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  Our agency team is configuring your growth onboarding roadmap. In the meantime, you can book your kickoff strategy call below.
                </p>
                <button
                  onClick={onOpenBooking}
                  className="px-5 py-2.5 rounded-xl bg-purple-600 text-white text-xs font-semibold"
                >
                  Schedule Kickoff Call
                </button>
              </div>
            ) : (
              projects.map((proj) => (
                <div
                  key={proj.id}
                  className="p-7 rounded-3xl bg-[#0D1220] border border-white/10 space-y-6 shadow-xl"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2.5 py-0.5 rounded-md bg-purple-500/10 border border-purple-500/30 text-purple-300 text-[10px] font-bold uppercase tracking-wider">
                          {proj.serviceCategory.replace('_', ' ')}
                        </span>
                        <span className="text-xs text-slate-400">
                          Target Date: {proj.targetDate}
                        </span>
                      </div>
                      <h2 className="text-xl font-display font-bold text-white">
                        {proj.title}
                      </h2>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <span className="text-[11px] text-slate-400">Campaign Progress</span>
                        <p className="text-lg font-mono font-bold text-emerald-400">{proj.progress}%</p>
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden p-0.5">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full transition-all duration-500"
                      style={{ width: `${proj.progress}%` }}
                    />
                  </div>

                  {/* Deliverables Checklist */}
                  <div className="space-y-3 pt-2">
                    <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                      Deliverable Milestones:
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {proj.deliverables.map((del) => (
                        <div
                          key={del.id}
                          className={`p-3.5 rounded-2xl border flex items-center justify-between gap-3 transition-colors ${
                            del.completed
                              ? 'bg-emerald-500/[0.04] border-emerald-500/20 text-slate-200'
                              : 'bg-white/[0.02] border-white/[0.06] text-slate-400'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 text-xs">
                            <CheckCircle2
                              className={`w-4 h-4 shrink-0 ${
                                del.completed ? 'text-emerald-400' : 'text-slate-600'
                              }`}
                            />
                            <span className={del.completed ? 'text-white font-medium' : ''}>
                              {del.title}
                            </span>
                          </div>
                          {del.dueDate && (
                            <span className="text-[10px] text-slate-500 shrink-0">
                              Due: {del.dueDate}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recent Agency Activity Updates */}
                  {proj.updates && proj.updates.length > 0 && (
                    <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-2">
                      <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                        Latest Strategist Note:
                      </p>
                      {proj.updates.map((up) => (
                        <div key={up.id} className="text-xs text-slate-300">
                          <span className="text-purple-400 font-semibold">{up.author} ({up.date}): </span>
                          <span>{up.text}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {/* Tab 2: Support Tickets */}
        {activeTab === 'tickets' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Create Ticket Form */}
            <div className="lg:col-span-5 p-7 rounded-3xl bg-[#0D1220] border border-white/10 space-y-4">
              <h3 className="text-lg font-display font-bold text-white flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-purple-400" />
                Submit Direct Ticket to Strategists
              </h3>
              <p className="text-xs text-slate-400">
                Have a campaign question, new asset to send, or feedback? Your NYSAX team receives instant notification.
              </p>

              {ticketSubmitted && (
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Ticket logged! Our team will respond shortly.</span>
                </div>
              )}

              <form onSubmit={handleCreateTicket} className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Subject / Topic
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Question on keyword targets or reel hooks"
                    value={ticketSubject}
                    onChange={(e) => setTicketSubject(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Category
                  </label>
                  <select
                    value={ticketCategory}
                    onChange={(e) => setTicketCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-purple-500"
                  >
                    <option value="SEO Strategy">SEO Strategy</option>
                    <option value="Website Design">Website Design & Changes</option>
                    <option value="Sales Scripts">Sales Strategy & Scripts</option>
                    <option value="Email Flows">Email Flows & Klaviyo</option>
                    <option value="Social Media Newbies">Social Media Beginner Support</option>
                    <option value="Billing & Retainer">Billing & Retainer</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Message Details
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Type your message..."
                    value={ticketMessage}
                    onChange={(e) => setTicketMessage(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-purple-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Ticket to NYSAX Team</span>
                </button>
              </form>
            </div>

            {/* Ticket Feed */}
            <div className="lg:col-span-7 space-y-4">
              <h3 className="text-lg font-display font-bold text-white">
                Ticket History & Replies ({tickets.length})
              </h3>
              {tickets.length === 0 ? (
                <div className="p-8 rounded-3xl bg-[#0D1220] border border-white/10 text-center text-xs text-slate-400">
                  No tickets opened yet.
                </div>
              ) : (
                tickets.map((tick) => (
                  <div
                    key={tick.id}
                    className="p-6 rounded-3xl bg-[#0D1220] border border-white/10 space-y-4 shadow-md"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="px-2 py-0.5 rounded bg-purple-500/15 text-purple-300 text-[10px] font-bold uppercase">
                          {tick.category}
                        </span>
                        <h4 className="text-sm font-bold text-white mt-1">{tick.subject}</h4>
                      </div>
                      <span className="text-[10px] font-semibold text-emerald-400 px-2 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 uppercase">
                        {tick.status}
                      </span>
                    </div>

                    <div className="space-y-3 pt-2 border-t border-white/[0.06]">
                      {tick.messages.map((m) => (
                        <div
                          key={m.id}
                          className={`p-3 rounded-2xl text-xs ${
                            m.isAdmin
                              ? 'bg-purple-900/20 border border-purple-500/30 text-purple-100 ml-4'
                              : 'bg-white/[0.03] text-slate-300 mr-4'
                          }`}
                        >
                          <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1 font-semibold">
                            <span>{m.sender} {m.isAdmin && '(NYSAX Team)'}</span>
                            <span>{new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                          </div>
                          <p>{m.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Tab 3: Deliverables & Shared Assets */}
        {activeTab === 'assets' && (
          <div className="p-8 rounded-3xl bg-[#0D1220] border border-white/10 space-y-6">
            <h3 className="text-lg font-display font-bold text-white flex items-center gap-2">
              <FolderDown className="w-5 h-5 text-cyan-400" />
              Campaign Deliverables & Document Vault
            </h3>
            <p className="text-xs text-slate-400">
              Access your brand strategy blueprints, copywriting packs, Figma mockups, and monthly SEO audit spreadsheets.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
              {[
                { name: 'Technical SEO Keyword Matrix.xlsx', size: '2.4 MB', date: 'Sept 2026', type: 'Spreadsheet' },
                { name: 'NYSAX 30-Day Viral Reel Hook Bible.pdf', size: '5.1 MB', date: 'Sept 2026', type: 'PDF Guide' },
                { name: 'Klaviyo Email Architecture & Copy.docx', size: '1.8 MB', date: 'Sept 2026', type: 'Document' },
                { name: 'High-Converting Web Wireframes (Figma).fig', size: '14.2 MB', date: 'Aug 2026', type: 'Design' },
                { name: 'Sales Objection Closing Playbook.pdf', size: '3.6 MB', date: 'Aug 2026', type: 'PDF Guide' }
              ].map((file, fIdx) => (
                <div
                  key={fIdx}
                  className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-purple-500/40 transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-white group-hover:text-purple-300 transition-colors truncate max-w-[160px]">
                        {file.name}
                      </p>
                      <p className="text-[10px] text-slate-500">{file.type} • {file.size}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => alert(`Downloading ${file.name} from NYSAX Vault...`)}
                    className="p-2 rounded-xl bg-white/[0.05] hover:bg-purple-600 hover:text-white text-slate-400 transition-colors"
                    title="Download File"
                  >
                    <FolderDown className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
