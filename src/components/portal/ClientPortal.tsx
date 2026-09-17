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
    <div className="min-h-screen bg-[#FBFBFB] text-black pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Breadcrumb & User Welcome Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-[24px] bg-white border border-gray-200 shadow-xs">
          <div>
            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-2 text-xs uppercase font-mono tracking-wider text-gray-500 hover:text-black transition-colors mb-3 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Public Studio Home</span>
            </button>
            <h1 className="text-2xl sm:text-3xl font-normal text-black tracking-tight">
              Welcome to Your Portal, <span className="italic font-serif">{user?.name.split(' ')[0]}</span>
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1 font-mono">
              Account: <span className="text-black font-semibold">{user?.company || 'Personal Account'}</span> • Primary Goal: <span className="text-black font-semibold">{user?.serviceInterest || 'Growth Retainer'}</span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenBooking}
              className="px-5 py-2.5 rounded-full bg-black text-white text-xs uppercase tracking-wider font-medium hover:bg-gray-800 transition-all flex items-center gap-2 shadow-xs cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Schedule Call</span>
            </button>
            <button
              onClick={logout}
              className="p-2.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-black border border-gray-200 transition-colors cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex rounded-full bg-gray-200/70 p-1.5 max-w-md">
          <button
            onClick={() => setActiveTab('campaigns')}
            className={`flex-1 py-2 rounded-full text-xs font-medium transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'campaigns'
                ? 'bg-black text-white shadow-xs'
                : 'text-gray-600 hover:text-black'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            Active Campaigns ({projects.length})
          </button>
          <button
            onClick={() => setActiveTab('tickets')}
            className={`flex-1 py-2 rounded-full text-xs font-medium transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'tickets'
                ? 'bg-black text-white shadow-xs'
                : 'text-gray-600 hover:text-black'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            Direct Support ({tickets.length})
          </button>
          <button
            onClick={() => setActiveTab('assets')}
            className={`flex-1 py-2 rounded-full text-xs font-medium transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'assets'
                ? 'bg-black text-white shadow-xs'
                : 'text-gray-600 hover:text-black'
            }`}
          >
            <FolderDown className="w-3.5 h-3.5" />
            Deliverables
          </button>
        </div>

        {/* Tab 1: Campaigns */}
        {activeTab === 'campaigns' && (
          <div className="space-y-6">
            {projects.length === 0 ? (
              <div className="p-12 rounded-[24px] bg-white border border-gray-200 text-center space-y-4 shadow-xs">
                <Sparkles className="w-10 h-10 text-black mx-auto" />
                <h3 className="text-xl font-normal text-black">
                  No Active <span className="italic font-serif">Campaigns Yet</span>
                </h3>
                <p className="text-xs text-gray-500 max-w-md mx-auto">
                  Our agency team is configuring your growth onboarding roadmap. In the meantime, you can book your kickoff strategy call below.
                </p>
                <button
                  onClick={onOpenBooking}
                  className="px-6 py-3 rounded-full bg-black text-white text-xs uppercase tracking-wider font-medium hover:bg-gray-800 transition-all cursor-pointer"
                >
                  Schedule Kickoff Call
                </button>
              </div>
            ) : (
              projects.map((proj) => (
                <div
                  key={proj.id}
                  className="p-7 rounded-[24px] bg-white border border-gray-200 space-y-6 shadow-xs"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2.5 py-0.5 rounded-full bg-gray-100 border border-gray-200 text-black text-[10px] font-mono uppercase tracking-wider">
                          {proj.serviceCategory.replace('_', ' ')}
                        </span>
                        <span className="text-xs text-gray-500 font-mono">
                          Target Date: {proj.targetDate}
                        </span>
                      </div>
                      <h2 className="text-xl font-normal text-black">
                        {proj.title}
                      </h2>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <span className="text-[11px] text-gray-500 font-mono uppercase">Campaign Progress</span>
                        <p className="text-lg font-mono font-bold text-black">{proj.progress}%</p>
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-black rounded-full transition-all duration-500"
                      style={{ width: `${proj.progress}%` }}
                    />
                  </div>

                  {/* Deliverables Checklist */}
                  <div className="space-y-3 pt-2">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-gray-500">
                      Deliverable Milestones:
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {proj.deliverables.map((del) => (
                        <div
                          key={del.id}
                          className={`p-3.5 rounded-[16px] border flex items-center justify-between gap-3 transition-colors ${
                            del.completed
                              ? 'bg-gray-50 border-gray-300 text-black'
                              : 'bg-white border-gray-200 text-gray-400'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 text-xs">
                            <CheckCircle2
                              className={`w-4 h-4 shrink-0 ${
                                del.completed ? 'text-black' : 'text-gray-300'
                              }`}
                            />
                            <span className={del.completed ? 'text-black font-medium' : ''}>
                              {del.title}
                            </span>
                          </div>
                          {del.dueDate && (
                            <span className="text-[10px] text-gray-400 font-mono shrink-0">
                              Due: {del.dueDate}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recent Agency Activity Updates */}
                  {proj.updates && proj.updates.length > 0 && (
                    <div className="p-4 rounded-[16px] bg-gray-50 border border-gray-200 space-y-2">
                      <p className="text-[11px] font-mono text-gray-500 uppercase tracking-wider">
                        Latest Strategist Note:
                      </p>
                      {proj.updates.map((up) => (
                        <div key={up.id} className="text-xs text-gray-700">
                          <span className="text-black font-semibold">{up.author} ({up.date}): </span>
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
            <div className="lg:col-span-5 p-7 rounded-[24px] bg-white border border-gray-200 space-y-4 shadow-xs">
              <h3 className="text-xl font-normal text-black flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-black" />
                Submit Direct Ticket to <span className="italic font-serif">Strategists</span>
              </h3>
              <p className="text-xs text-gray-500">
                Have a campaign question, new asset to send, or feedback? Your NYSAX team receives instant notification.
              </p>

              {ticketSubmitted && (
                <div className="p-3 rounded-xl bg-gray-100 border border-gray-300 text-black text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-black" />
                  <span>Ticket logged! Our team will respond shortly.</span>
                </div>
              )}

              <form onSubmit={handleCreateTicket} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-gray-500 mb-1">
                    Subject / Topic
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Question on keyword targets or reel hooks"
                    value={ticketSubject}
                    onChange={(e) => setTicketSubject(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#FBFBFB] border border-gray-200 text-black text-xs focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-gray-500 mb-1">
                    Category
                  </label>
                  <select
                    value={ticketCategory}
                    onChange={(e) => setTicketCategory(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#FBFBFB] border border-gray-200 text-black text-xs focus:outline-none focus:border-black"
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
                  <label className="block text-xs font-mono uppercase tracking-wider text-gray-500 mb-1">
                    Message Details
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Type your message..."
                    value={ticketMessage}
                    onChange={(e) => setTicketMessage(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#FBFBFB] border border-gray-200 text-black text-xs focus:outline-none focus:border-black resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full bg-black hover:bg-gray-800 text-white font-medium text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Ticket to NYSAX Team</span>
                </button>
              </form>
            </div>

            {/* Ticket Feed */}
            <div className="lg:col-span-7 space-y-4">
              <h3 className="text-xl font-normal text-black">
                Ticket History & <span className="italic font-serif">Replies</span> ({tickets.length})
              </h3>
              {tickets.length === 0 ? (
                <div className="p-8 rounded-[24px] bg-white border border-gray-200 text-center text-xs text-gray-500 shadow-xs">
                  No tickets opened yet.
                </div>
              ) : (
                tickets.map((tick) => (
                  <div
                    key={tick.id}
                    className="p-6 rounded-[24px] bg-white border border-gray-200 space-y-4 shadow-xs"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-700 text-[10px] font-mono uppercase">
                          {tick.category}
                        </span>
                        <h4 className="text-sm font-semibold text-black mt-1">{tick.subject}</h4>
                      </div>
                      <span className="text-[10px] font-mono font-semibold text-black px-2.5 py-1 rounded-full bg-gray-100 border border-gray-200 uppercase">
                        {tick.status}
                      </span>
                    </div>

                    <div className="space-y-3 pt-2 border-t border-gray-100">
                      {tick.messages.map((m) => (
                        <div
                          key={m.id}
                          className={`p-3.5 rounded-[16px] text-xs ${
                            m.isAdmin
                              ? 'bg-black text-white ml-4'
                              : 'bg-gray-50 border border-gray-200 text-gray-800 mr-4'
                          }`}
                        >
                          <div className={`flex items-center justify-between text-[10px] mb-1 font-mono ${
                            m.isAdmin ? 'text-gray-300' : 'text-gray-500'
                          }`}>
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
          <div className="p-8 rounded-[24px] bg-white border border-gray-200 space-y-6 shadow-xs">
            <h3 className="text-xl font-normal text-black flex items-center gap-2">
              <FolderDown className="w-5 h-5 text-black" />
              Campaign Deliverables & <span className="italic font-serif">Document Vault</span>
            </h3>
            <p className="text-xs text-gray-500">
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
                  className="p-4 rounded-[16px] bg-[#FBFBFB] border border-gray-200 hover:border-black transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-center text-black">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-black group-hover:underline transition-colors truncate max-w-[160px]">
                        {file.name}
                      </p>
                      <p className="text-[10px] text-gray-500 font-mono">{file.type} • {file.size}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => alert(`Downloading ${file.name} from NYSAX Vault...`)}
                    className="p-2.5 rounded-full bg-white hover:bg-black hover:text-white text-gray-600 border border-gray-200 transition-colors cursor-pointer"
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
