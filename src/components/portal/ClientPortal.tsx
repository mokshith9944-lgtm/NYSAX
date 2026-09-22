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
    <div className="min-h-screen bg-black/90 text-white pt-24 pb-16 border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Breadcrumb & User Welcome Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-none bg-neutral-950/80 border border-neutral-800">
          <div>
            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-2 text-[10px] uppercase font-mono tracking-widest text-neutral-400 hover:text-white transition-colors mb-3 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Public Studio Home</span>
            </button>
            <h1 className="text-2xl sm:text-3xl font-light text-white uppercase tracking-tight">
              Client Portal // <span className="font-serif italic text-neutral-400 lowercase">{user?.name.split(' ')[0]}</span>
            </h1>
            <p className="text-xs text-neutral-400 mt-1 font-mono">
              Account: <span className="text-white font-semibold">{user?.company || 'Organization Account'}</span> • Retainer: <span className="text-white font-semibold">{user?.serviceInterest || 'Growth Architecture'}</span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenBooking}
              className="px-5 py-2.5 rounded-none bg-olive-600 text-black text-xs font-mono uppercase font-bold tracking-widest hover:bg-olive-500 transition-all flex items-center gap-2 cursor-pointer border border-olive-500"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Schedule Consultation</span>
            </button>
            <button
              onClick={logout}
              className="p-2.5 rounded-none bg-obsidian-850 hover:bg-white/10 text-silver-400 hover:text-white border border-white/10 transition-colors cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex rounded-none bg-obsidian-900 border border-white/10 p-1 max-w-md">
          <button
            onClick={() => setActiveTab('campaigns')}
            className={`flex-1 py-2 rounded-none text-xs font-mono uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'campaigns'
                ? 'bg-olive-600 text-black font-bold'
                : 'text-silver-400 hover:text-white'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            Campaigns ({projects.length})
          </button>
          <button
            onClick={() => setActiveTab('tickets')}
            className={`flex-1 py-2 rounded-none text-xs font-mono uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'tickets'
                ? 'bg-olive-600 text-black font-bold'
                : 'text-silver-400 hover:text-white'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            Direct Desk ({tickets.length})
          </button>
          <button
            onClick={() => setActiveTab('assets')}
            className={`flex-1 py-2 rounded-none text-xs font-mono uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'assets'
                ? 'bg-olive-600 text-black font-bold'
                : 'text-silver-400 hover:text-white'
            }`}
          >
            <FolderDown className="w-3.5 h-3.5" />
            Vault
          </button>
        </div>

        {/* Tab 1: Campaigns */}
        {activeTab === 'campaigns' && (
          <div className="space-y-6">
            {projects.length === 0 ? (
              <div className="p-12 rounded-none bg-neutral-950/80 border border-neutral-800 text-center space-y-4">
                <Sparkles className="w-8 h-8 text-white mx-auto" />
                <h3 className="text-xl font-light uppercase text-white tracking-tight">
                  No Active <span className="font-serif italic text-neutral-400 lowercase">campaigns logged</span>
                </h3>
                <p className="text-xs text-neutral-400 max-w-md mx-auto font-light leading-relaxed">
                  Our engineering team is provisioning your growth onboarding roadmap. In the interim, schedule your strategic alignment call below.
                </p>
                <button
                  onClick={onOpenBooking}
                  className="px-6 py-3 rounded-none bg-white text-black text-xs font-mono uppercase tracking-widest hover:bg-neutral-200 transition-all cursor-pointer border border-white"
                >
                  Schedule Kickoff Consultation
                </button>
              </div>
            ) : (
              projects.map((proj) => (
                <div
                  key={proj.id}
                  className="p-7 rounded-none bg-neutral-950/80 border border-neutral-800 space-y-6"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 rounded-none bg-neutral-900 border border-neutral-800 text-white text-[10px] font-mono uppercase tracking-wider">
                          {proj.serviceCategory.replace('_', ' ')}
                        </span>
                        <span className="text-xs text-neutral-500 font-mono">
                          Target Date: {proj.targetDate}
                        </span>
                      </div>
                      <h2 className="text-xl font-normal uppercase tracking-tight text-white">
                        {proj.title}
                      </h2>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <span className="text-[10px] text-neutral-500 font-mono uppercase tracking-wider">Milestone Completion</span>
                        <p className="text-lg font-mono text-white">{proj.progress}%</p>
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-1 bg-neutral-800 rounded-none overflow-hidden">
                    <div
                      className="h-full bg-white rounded-none transition-all duration-500"
                      style={{ width: `${proj.progress}%` }}
                    />
                  </div>

                  {/* Deliverables Checklist */}
                  <div className="space-y-3 pt-2">
                    <h4 className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">
                      Deliverable Milestones:
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {proj.deliverables.map((del) => (
                        <div
                          key={del.id}
                          className={`p-3.5 rounded-none border flex items-center justify-between gap-3 transition-colors ${
                            del.completed
                              ? 'bg-neutral-900/80 border-neutral-700 text-white'
                              : 'bg-neutral-950 border-neutral-900 text-neutral-500'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 text-xs font-light">
                            <CheckCircle2
                              className={`w-3.5 h-3.5 shrink-0 ${
                                del.completed ? 'text-white' : 'text-neutral-700'
                              }`}
                            />
                            <span className={del.completed ? 'text-white font-normal' : ''}>
                              {del.title}
                            </span>
                          </div>
                          {del.dueDate && (
                            <span className="text-[10px] text-neutral-500 font-mono shrink-0">
                              Target: {del.dueDate}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recent Agency Activity Updates */}
                  {proj.updates && proj.updates.length > 0 && (
                    <div className="p-4 rounded-none bg-neutral-900/60 border border-neutral-800 space-y-2">
                      <p className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest">
                        Latest Strategist Dispatch:
                      </p>
                      {proj.updates.map((up) => (
                        <div key={up.id} className="text-xs text-neutral-300 font-light">
                          <span className="text-white font-mono font-semibold">{up.author} ({up.date}): </span>
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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 font-mono">
            {/* Create Ticket Form */}
            <div className="lg:col-span-5 p-7 rounded-none bg-neutral-950/80 border border-neutral-800 space-y-4">
              <h3 className="text-lg font-normal uppercase tracking-tight text-white flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-white" />
                Dispatch Direct Brief to <span className="font-serif italic lowercase text-neutral-400">principals</span>
              </h3>
              <p className="text-xs text-neutral-400 font-sans font-light">
                Send campaign inquiries, technical requirements, or copy revisions directly to executive strategists.
              </p>

              {ticketSubmitted && (
                <div className="p-3 rounded-none bg-neutral-900 border border-white text-white text-xs flex items-center gap-2 font-mono">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-white" />
                  <span>Brief received. Response queued within 24 hours.</span>
                </div>
              )}

              <form onSubmit={handleCreateTicket} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-1">
                    Subject / Focus
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. SEO keyword expansion or revision request"
                    value={ticketSubject}
                    onChange={(e) => setTicketSubject(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-none bg-neutral-900 border border-neutral-700 text-white text-xs font-mono focus:outline-none focus:border-white"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-1">
                    Category
                  </label>
                  <select
                    value={ticketCategory}
                    onChange={(e) => setTicketCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-none bg-neutral-900 border border-neutral-700 text-white text-xs font-mono focus:outline-none focus:border-white"
                  >
                    <option value="SEO Strategy">SEO Strategy</option>
                    <option value="Website Design">Website Design & Architecture</option>
                    <option value="Sales Scripts">Sales Systems & Pipeline</option>
                    <option value="Email Flows">Email Retention & Flows</option>
                    <option value="Social Media Newbies">Social Incubation</option>
                    <option value="Billing & Retainer">Accounts & Retainer</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-1">
                    Brief Details
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Provide contextual details..."
                    value={ticketMessage}
                    onChange={(e) => setTicketMessage(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-none bg-neutral-900 border border-neutral-700 text-white text-xs font-mono focus:outline-none focus:border-white resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-none bg-white hover:bg-neutral-200 text-black font-mono text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 cursor-pointer border border-white"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Transmit to Agency Desk</span>
                </button>
              </form>
            </div>

            {/* Ticket Feed */}
            <div className="lg:col-span-7 space-y-4">
              <h3 className="text-lg font-normal uppercase tracking-tight text-white">
                Brief Log & <span className="font-serif italic lowercase text-neutral-400">dispatches</span> ({tickets.length})
              </h3>
              {tickets.length === 0 ? (
                <div className="p-8 rounded-none bg-neutral-950/80 border border-neutral-800 text-center text-xs text-neutral-500 font-mono">
                  No active briefs on desk.
                </div>
              ) : (
                tickets.map((tick) => (
                  <div
                    key={tick.id}
                    className="p-6 rounded-none bg-neutral-950/80 border border-neutral-800 space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="px-2 py-0.5 rounded-none bg-neutral-900 border border-neutral-800 text-neutral-400 text-[10px] font-mono uppercase tracking-wider">
                          {tick.category}
                        </span>
                        <h4 className="text-sm font-normal uppercase tracking-wide text-white mt-1">{tick.subject}</h4>
                      </div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-white px-2 py-0.5 rounded-none border border-neutral-700 bg-neutral-900">
                        {tick.status}
                      </span>
                    </div>

                    <div className="space-y-3 pt-2 border-t border-neutral-900">
                      {tick.messages.map((m) => (
                        <div
                          key={m.id}
                          className={`p-3.5 rounded-none text-xs ${
                            m.isAdmin
                              ? 'bg-neutral-900 border border-neutral-700 text-white ml-4'
                              : 'bg-neutral-950 border border-neutral-900 text-neutral-300 mr-4'
                          }`}
                        >
                          <div className={`flex items-center justify-between text-[10px] mb-1 font-mono ${
                            m.isAdmin ? 'text-neutral-400' : 'text-neutral-500'
                          }`}>
                            <span>{m.sender} {m.isAdmin && '(Nysa Leadership)'}</span>
                            <span>{new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                          </div>
                          <p className="font-sans font-light">{m.text}</p>
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
          <div className="p-8 rounded-none bg-neutral-950/80 border border-neutral-800 space-y-6">
            <h3 className="text-xl font-light uppercase tracking-tight text-white flex items-center gap-2">
              <FolderDown className="w-5 h-5 text-white" />
              Deliverables & <span className="font-serif italic lowercase text-neutral-400">document vault</span>
            </h3>
            <p className="text-xs text-neutral-400 font-light">
              Direct access to brand blueprints, conversion wireframes, copywriting repositories, and technical audit files.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
              {[
                { name: 'Technical SEO Keyword Matrix.xlsx', size: '2.4 MB', date: 'Sept 2026', type: 'Spreadsheet' },
                { name: 'Nysa 30-Day Viral Hook Bible.pdf', size: '5.1 MB', date: 'Sept 2026', type: 'PDF Guide' },
                { name: 'Lifecycle Flow Architecture & Copy.docx', size: '1.8 MB', date: 'Sept 2026', type: 'Document' },
                { name: 'High-Converting Web Wireframes (Figma).fig', size: '14.2 MB', date: 'Aug 2026', type: 'Design' },
                { name: 'Executive Sales Objection Playbook.pdf', size: '3.6 MB', date: 'Aug 2026', type: 'PDF Guide' }
              ].map((file, fIdx) => (
                <div
                  key={fIdx}
                  className="p-4 rounded-none bg-neutral-900/60 border border-neutral-800 hover:border-neutral-600 transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-none bg-black border border-neutral-800 flex items-center justify-center text-white">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-normal text-white uppercase tracking-wide truncate max-w-[160px]">
                        {file.name}
                      </p>
                      <p className="text-[10px] text-neutral-500 font-mono">{file.type} • {file.size}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => alert(`Downloading ${file.name} from Nysa Vault...`)}
                    className="p-2.5 rounded-none bg-neutral-900 hover:bg-white hover:text-black text-neutral-300 border border-neutral-800 transition-colors cursor-pointer"
                    title="Download File"
                  >
                    <FolderDown className="w-3.5 h-3.5" />
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
