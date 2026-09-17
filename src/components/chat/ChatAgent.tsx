import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageCircle, 
  X, 
  Send, 
  Sparkles, 
  ChevronRight, 
  RotateCcw, 
  CheckCircle2, 
  Mail, 
  PhoneCall, 
  Search, 
  Layout, 
  Target, 
  Bot, 
  User, 
  HelpCircle,
  Minimize2,
  Maximize2
} from 'lucide-react';
import { InstagramIcon } from '../icons/InstagramIcon';
import { db } from '../../lib/storage';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  options?: { label: string; action: string; payload?: any }[];
  timestamp: string;
}

interface ChatAgentProps {
  onOpenBooking: () => void;
  onOpenAudit: () => void;
}

export const ChatAgent: React.FC<ChatAgentProps> = ({ onOpenBooking, onOpenAudit }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputVal, setInputVal] = useState('');
  const [unreadCount, setUnreadCount] = useState(1);
  const [isTyping, setIsTyping] = useState(false);
  const [leadCaptureStep, setLeadCaptureStep] = useState<string | null>(null);
  const [leadData, setLeadData] = useState({
    name: '',
    email: '',
    service: 'All Services',
    websiteOrHandle: '',
    budget: '',
    message: ''
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Initial welcome message
  useEffect(() => {
    const initialMsg: Message = {
      id: 'welcome_1',
      sender: 'bot',
      text: "👋 Welcome to NYSAX! I'm your automated Growth Advisor. How can I help you accelerate your business today?",
      options: [
        { label: '🎯 Explore Our 5 Core Services', action: 'services_menu' },
        { label: '💰 Pricing & Engagement Models', action: 'pricing_info' },
        { label: '📈 Recent Client Wins & ROI', action: 'results_info' },
        { label: '🚀 Social Media for Beginners', action: 'service_social_newbies' },
        { label: '📞 Book a Growth Strategy Call', action: 'start_lead_capture' },
        { label: '🎁 Claim Free 7-Point Audit', action: 'claim_audit' }
      ],
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages([initialMsg]);
  }, []);

  const addBotMessage = (text: string, options?: Message['options'], delay = 400) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: `bot_${Date.now()}`,
          sender: 'bot',
          text,
          options,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setIsTyping(false);
    }, delay);
  };

  const handleUserMessage = (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMsg: Message = {
      id: `user_${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');

    // If currently in a lead capture questionnaire flow
    if (leadCaptureStep) {
      handleLeadCaptureResponse(text);
      return;
    }

    // Rule-Based Keyword Matcher
    processRuleBasedInput(text.toLowerCase());
  };

  // Rule-Based Keyword Matching Engine
  const processRuleBasedInput = (input: string) => {
    if (input.includes('service') || input.includes('offer') || input.includes('what do you do')) {
      addBotMessage(
        "NYSAX specializes in 5 core growth pillars designed to generate maximum revenue:\n\n1. 🔍 SEO Optimization (Rank #1 on Google)\n2. 💻 High-Converting Website Design & Funnels\n3. 🎯 Sales Strategy & Revenue Architecture\n4. ✉️ Email Marketing & Automated Retention\n5. ✨ Newbies in Social Media Marketing (Zero-to-Hero)\n\nWhich service would you like details on?",
        [
          { label: '🔍 SEO Optimization', action: 'service_seo' },
          { label: '💻 Website Design', action: 'service_web' },
          { label: '🎯 Sales Strategy', action: 'service_sales' },
          { label: '✉️ Email Marketing', action: 'service_email' },
          { label: '✨ Social Media for Newbies', action: 'service_social_newbies' }
        ]
      );
      return;
    }

    if (input.includes('seo') || input.includes('google') || input.includes('ranking') || input.includes('traffic')) {
      addBotMessage(
        "🔍 **SEO Optimization with NYSAX**:\nWe don't do vanity keywords. We analyze your competitors, execute high-authority digital PR backlinks, and optimize technical Core Web Vitals to deliver high-intent organic buyer traffic.\n\nAverage client outcome: +280% organic traffic growth in 90 days.",
        [
          { label: '🎁 Get Free SEO Audit', action: 'claim_audit' },
          { label: '📞 Book Strategy Call', action: 'start_lead_capture' },
          { label: '🔙 Main Menu', action: 'main_menu' }
        ]
      );
      return;
    }

    if (input.includes('website') || input.includes('design') || input.includes('dev') || input.includes('redesign')) {
      addBotMessage(
        "💻 **Website Design & Funnels**:\nWe build custom, modern, ultra-fast websites engineered to convert cold visitors into high-ticket clients. Includes interactive elements, mobile-first responsiveness, and conversion rate optimization (CRO).\n\nAverage result: 3.4x conversion rate lift.",
        [
          { label: '🚀 Request Website Proposal', action: 'start_lead_capture' },
          { label: '🔙 Main Menu', action: 'main_menu' }
        ]
      );
      return;
    }

    if (input.includes('newbie') || input.includes('beginner') || input.includes('social media') || input.includes('instagram') || input.includes('tiktok') || input.includes('reels')) {
      addBotMessage(
        "✨ **Newbies in Social Media Marketing (Zero-to-Hero)**:\nAre you just starting out? We hold your hand from 0 followers:\n• Profile aesthetic makeover & bio branding\n• 30-day viral short-form script pack (hooks that work)\n• Algorithm timing & hashtag strategy\n• Follower-to-customer DM conversion funnels\n\nYou don't need any prior camera or editing experience!",
        [
          { label: '🚀 Join Beginner Incubator', action: 'start_lead_capture' },
          { label: '📸 Visit our Instagram @nysax.agency', action: 'open_instagram' },
          { label: '🔙 Main Menu', action: 'main_menu' }
        ]
      );
      return;
    }

    if (input.includes('email') || input.includes('klaviyo') || input.includes('newsletter') || input.includes('retention') || input.includes('cart')) {
      addBotMessage(
        "✉️ **Automated Email Marketing & Retention**:\nWe build up to 8 high-converting Klaviyo lifecycle flows (Welcome series, abandoned checkout, post-purchase cross-sell, VIP winbacks). We regularly take clients from 8% email revenue to 30-45%+ on autopilot.",
        [
          { label: '📈 Scale My Email Flows', action: 'start_lead_capture' },
          { label: '🔙 Main Menu', action: 'main_menu' }
        ]
      );
      return;
    }

    if (input.includes('sales') || input.includes('strategy') || input.includes('closing') || input.includes('pipeline') || input.includes('offer')) {
      addBotMessage(
        "🎯 **Sales Strategy & Revenue Architecture**:\nWe structure irresistible high-ticket offers, write battle-tested closing scripts, eliminate sales objections, and automate CRM lead scoring to double your closing percentage.",
        [
          { label: '📞 Book Strategy Call', action: 'start_lead_capture' },
          { label: '🔙 Main Menu', action: 'main_menu' }
        ]
      );
      return;
    }

    if (input.includes('price') || input.includes('cost') || input.includes('how much') || input.includes('pricing') || input.includes('fee')) {
      addBotMessage(
        "💰 **NYSAX Pricing & Engagements**:\nWe offer flexible growth models based on your stage:\n\n• **Growth Sprint (30 Days)**: Specialized single-channel setup (e.g. Website launch or Full Email lifecycle setup).\n• **Dominance Retainer (Monthly)**: Multi-channel acceleration with continuous SEO, social media, and funnel optimization.\n• **Newbies Social Incubator**: Structured package for founders starting from zero.\n\nAll pricing is customized to your ROI targets during our discovery call.",
        [
          { label: '📞 Book Custom Quote Call', action: 'start_lead_capture' },
          { label: '📊 Calculate ROI with our Simulator', action: 'scroll_roi' },
          { label: '🔙 Main Menu', action: 'main_menu' }
        ]
      );
      return;
    }

    if (input.includes('contact') || input.includes('email') || input.includes('call') || input.includes('phone') || input.includes('talk')) {
      addBotMessage(
        "📬 **You can reach the NYSAX team directly**:\n• Email: nysaxofficial@gmail.com\n• Instagram: @nysax.agency\n• Booking: Schedule a 30-minute growth call\n\nWould you like me to connect you right now?",
        [
          { label: '📞 Book Growth Call Now', action: 'start_lead_capture' },
          { label: '✉️ Send Direct Email', action: 'open_email' },
          { label: '📸 Visit @nysax.agency', action: 'open_instagram' }
        ]
      );
      return;
    }

    if (input.includes('contract') || input.includes('guarantee') || input.includes('refund') || input.includes('lock')) {
      addBotMessage(
        "🤝 **Our Partnership Terms**:\nWe do NOT lock clients into restrictive 12-month contracts. We operate on agile 90-day sprints and month-to-month retainers. If we don't deliver the agreed milestones, you are free to pause anytime.",
        [
          { label: '📞 Talk to a Strategist', action: 'start_lead_capture' },
          { label: '🔙 Main Menu', action: 'main_menu' }
        ]
      );
      return;
    }

    // Default Fallback
    addBotMessage(
      `I understand you're asking about "${input}". As an automated advisor, I can guide you through our core services or connect you with our executive team. How would you like to proceed?`,
      [
        { label: '📞 Speak with Human Strategist', action: 'start_lead_capture' },
        { label: '🎯 Explore Core Services', action: 'services_menu' },
        { label: '🎁 Free 7-Point Audit', action: 'claim_audit' },
        { label: '✉️ Email nysaxofficial@gmail.com', action: 'open_email' }
      ]
    );
  };

  // Action Dispatcher for Buttons
  const handleAction = (action: string, payload?: any) => {
    switch (action) {
      case 'main_menu':
        addBotMessage("Here is the main menu. What would you like to explore?", [
          { label: '🎯 Explore Our 5 Core Services', action: 'services_menu' },
          { label: '💰 Pricing & Retainers', action: 'pricing_info' },
          { label: '📈 Case Studies & Wins', action: 'results_info' },
          { label: '✨ Social Media for Newbies', action: 'service_social_newbies' },
          { label: '📞 Book Strategy Call', action: 'start_lead_capture' },
          { label: '🎁 Free Growth Audit', action: 'claim_audit' }
        ]);
        break;

      case 'services_menu':
        addBotMessage("Select any service below to view deliverables and expected timeline:", [
          { label: '🔍 SEO Optimization', action: 'service_seo' },
          { label: '💻 Website Design & CRO', action: 'service_web' },
          { label: '🎯 Sales Strategy', action: 'service_sales' },
          { label: '✉️ Email Marketing', action: 'service_email' },
          { label: '✨ Social Media for Newbies', action: 'service_social_newbies' }
        ]);
        break;

      case 'service_seo':
        addBotMessage(
          "🔍 **SEO Optimization Details**:\n• Comprehensive Core Web Vitals speed repair\n• Buyer-intent semantic keyword clustering\n• White-hat authoritative digital PR backlinks\n• Local and national Google Maps / organic dominance\n\nTarget outcome: +280% organic traffic in 90 days.",
          [
            { label: 'Claim Free SEO Audit', action: 'claim_audit' },
            { label: 'Book Strategy Call', action: 'start_lead_capture' },
            { label: '🔙 All Services', action: 'services_menu' }
          ]
        );
        break;

      case 'service_web':
        addBotMessage(
          "💻 **Website Design & Funnels**:\n• Custom modern visual design built for psychological conversion\n• Ultra-fast sub-second load times\n• A/B split-tested landing pages\n• Interactive calculators & lead capture systems\n\nAverage outcome: 3.4x conversion rate lift.",
          [
            { label: 'Get Started on New Site', action: 'start_lead_capture' },
            { label: '🔙 All Services', action: 'services_menu' }
          ]
        );
        break;

      case 'service_sales':
        addBotMessage(
          "🎯 **Sales Strategy & Revenue Architecture**:\n• High-ticket offer re-structuring & value stacking\n• Objection handling scripts for your closers\n• Automated CRM pipeline qualification\n\nAverage outcome: +62% closing rate improvement.",
          [
            { label: 'Fix My Sales Pipeline', action: 'start_lead_capture' },
            { label: '🔙 All Services', action: 'services_menu' }
          ]
        );
        break;

      case 'service_email':
        addBotMessage(
          "✉️ **Automated Email Marketing & Retention**:\n• Complete 8-part Klaviyo lifecycle architecture\n• Abandoned cart & browse abandonment recovery\n• VIP cross-sell and retention campaigns\n• Deliverability health & zero-spam configuration\n\nAverage outcome: 30-45% of total revenue on autopilot.",
          [
            { label: 'Set Up Email Flows', action: 'start_lead_capture' },
            { label: '🔙 All Services', action: 'services_menu' }
          ]
        );
        break;

      case 'service_social_newbies':
        addBotMessage(
          "✨ **Newbies in Social Media Marketing (Zero-to-Hero)**:\nSpecifically crafted for founders and beginners starting with 0 followers:\n• 30-day viral short-form script pack (hooks & templates)\n• Profile makeover (bio, aesthetic highlights)\n• Mobile recording guide (no fancy camera needed)\n• Algorithm timing & DM conversion flows\n\nAchieve 10k+ engaged followers without burning out!",
          [
            { label: 'Join Beginner Incubator', action: 'start_lead_capture' },
            { label: '📸 Check out @nysax.agency', action: 'open_instagram' },
            { label: '🔙 All Services', action: 'services_menu' }
          ]
        );
        break;

      case 'pricing_info':
        addBotMessage(
          "💰 **NYSAX Pricing & Retainers**:\n• Single Channel Sprint: from $1,500\n• Dedicated Channel Growth: $3,000 - $5,000/mo\n• Full-Spectrum Multi-Service Retainer: $6,000+/mo\n\nWe customize every scope to ensure a minimum projected 3x to 5x ROI on your investment.",
          [
            { label: '📞 Book Strategy Call', action: 'start_lead_capture' },
            { label: '📊 Open ROI Simulator', action: 'scroll_roi' },
            { label: '🔙 Main Menu', action: 'main_menu' }
          ]
        );
        break;

      case 'results_info':
        addBotMessage(
          "🏆 **Recent Client Highlights**:\n• eCommerce Brand: +214% revenue lift via email flows & site redesign ($142k/mo gain)\n• SaaS Startup: #1 Google rankings on 14 primary keywords + 11.8x ROI\n• Creator/Coach: 0 to 42,000 followers in 75 days via our Newbies program\n\nWould you like a custom proposal for your brand?",
          [
            { label: '🚀 Get Custom Proposal', action: 'start_lead_capture' },
            { label: '🔙 Main Menu', action: 'main_menu' }
          ]
        );
        break;

      case 'start_lead_capture':
        setLeadCaptureStep('name');
        addBotMessage("Awesome! Let's get your details so a senior growth strategist can prepare your custom gameplan. What is your **Full Name**?");
        break;

      case 'claim_audit':
        setIsOpen(false);
        onOpenAudit();
        break;

      case 'open_instagram':
        window.open('https://www.instagram.com/nysax.agency?stkn=MXdycDVzN3lqc2tqZA==', '_blank');
        break;

      case 'open_email':
        window.open('mailto:nysaxofficial@gmail.com?subject=NYSAX Growth Inquiry', '_blank');
        break;

      case 'scroll_roi':
        setIsOpen(false);
        const roiEl = document.getElementById('roi-calculator');
        roiEl?.scrollIntoView({ behavior: 'smooth' });
        break;

      default:
        break;
    }
  };

  // Interactive Lead Capture Questionnaire Step Handler
  const handleLeadCaptureResponse = (text: string) => {
    if (leadCaptureStep === 'name') {
      setLeadData((prev) => ({ ...prev, name: text }));
      setLeadCaptureStep('email');
      addBotMessage(`Nice to meet you, ${text}! What is the best **Email Address** for your growth brief?`);
    } else if (leadCaptureStep === 'email') {
      setLeadData((prev) => ({ ...prev, email: text }));
      setLeadCaptureStep('service');
      addBotMessage(
        "Got it. Which service are you primarily interested in?",
        [
          { label: 'SEO Optimization', action: 'select_service', payload: 'SEO Optimization' },
          { label: 'Website Design', action: 'select_service', payload: 'Website Design' },
          { label: 'Sales Strategy', action: 'select_service', payload: 'Sales Strategy' },
          { label: 'Email Marketing', action: 'select_service', payload: 'Email Marketing' },
          { label: 'Social Media for Newbies', action: 'select_service', payload: 'Newbies in Social Media Marketing' },
          { label: 'Full Multi-Service Retainer', action: 'select_service', payload: 'Multi-Service Retainer' }
        ]
      );
    } else if (leadCaptureStep === 'handle') {
      setLeadData((prev) => ({ ...prev, websiteOrHandle: text }));
      setLeadCaptureStep('budget');
      addBotMessage(
        "Great! What is your approximate monthly marketing budget?",
        [
          { label: '$1,500 - $3,000', action: 'select_budget', payload: '$1,500 - $3,000' },
          { label: '$3,000 - $6,000', action: 'select_budget', payload: '$3,000 - $6,000' },
          { label: '$6,000+', action: 'select_budget', payload: '$6,000+' }
        ]
      );
    } else if (leadCaptureStep === 'final_notes') {
      // Complete capture and save to DB
      const finalLead = {
        name: leadData.name,
        email: leadData.email,
        service: leadData.service,
        websiteOrHandle: leadData.websiteOrHandle,
        budget: leadData.budget,
        message: text,
        source: 'chat_agent' as const,
        status: 'new' as const
      };

      db.saveLead(finalLead);
      setLeadCaptureStep(null);

      addBotMessage(
        `🎉 Fantastic, ${leadData.name}! Your request has been logged in the NYSAX Admin CRM.\n\nOur team is reviewing your profile and will send your personalized strategy to **${leadData.email}** within 4 hours.`,
        [
          { label: '📅 Also Book 30-Min Call on Calendar', action: 'open_calendar_modal' },
          { label: '🔙 Back to Main Menu', action: 'main_menu' }
        ]
      );
    }
  };

  // Handle questionnaire buttons
  const handleServiceSelect = (serviceName: string) => {
    setLeadData((prev) => ({ ...prev, service: serviceName }));
    setLeadCaptureStep('handle');
    addBotMessage(`Selected: **${serviceName}**. What is your current **Website URL or Instagram handle**?`);
  };

  const handleBudgetSelect = (budgetTier: string) => {
    setLeadData((prev) => ({ ...prev, budget: budgetTier }));
    setLeadCaptureStep('final_notes');
    addBotMessage(`Budget set to **${budgetTier}**. Lastly, what is the biggest growth bottleneck or goal you want to solve right now?`);
  };

  const handleResetChat = () => {
    setLeadCaptureStep(null);
    setMessages([
      {
        id: `reset_${Date.now()}`,
        sender: 'bot',
        text: "Chat reset. How can NYSAX assist your business today?",
        options: [
          { label: '🎯 Explore Our 5 Core Services', action: 'services_menu' },
          { label: '💰 Pricing & Engagements', action: 'pricing_info' },
          { label: '📞 Book Strategy Call', action: 'start_lead_capture' }
        ],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <aside aria-label="NYSAX Rule-Based Growth Advisor" className="fixed bottom-5 right-5 z-50">
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => {
            setIsOpen(true);
            setUnreadCount(0);
          }}
          className="relative group p-4 rounded-full bg-gradient-to-tr from-purple-600 via-indigo-600 to-cyan-500 text-white shadow-2xl shadow-purple-600/40 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center"
          title="Chat with NYSAX Rule-Based Growth Advisor"
        >
          <Bot className="w-7 h-7 animate-pulse-slow" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-extrabold flex items-center justify-center border-2 border-[#06080F]">
              {unreadCount}
            </span>
          )}
          <span className="sr-only">Open Growth Advisor Chat</span>
        </button>
      )}

      {/* Chat Window Container */}
      {isOpen && (
        <div className="w-[92vw] sm:w-[390px] h-[580px] max-h-[85vh] rounded-3xl bg-[#0B0F1B]/95 border border-purple-500/30 backdrop-blur-2xl shadow-2xl shadow-black/80 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-purple-950/60 via-slate-900 to-cyan-950/60 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-purple-600/30 border border-purple-500/40 flex items-center justify-center text-purple-300">
                  <Bot className="w-6 h-6" />
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#0B0F1B]"></span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-display font-bold text-white leading-tight">
                    NYSAX Growth Advisor
                  </h3>
                  <span className="px-1.5 py-0.2 text-[9px] bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded uppercase font-bold">
                    AI Agent
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 flex items-center gap-1">
                  <span>Active Rule Engine</span> • <span className="text-emerald-400 font-medium">Online 24/7</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleResetChat}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors"
                title="Restart conversation"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors"
                title="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3.5 rounded-2xl leading-relaxed whitespace-pre-line ${
                    msg.sender === 'user'
                      ? 'bg-purple-600 text-white rounded-br-none shadow-md shadow-purple-600/20'
                      : 'bg-[#13192A] text-slate-200 border border-white/10 rounded-bl-none shadow-sm'
                  }`}
                >
                  {msg.text}
                </div>

                <span className="text-[10px] text-slate-400 mt-1 px-1">
                  {msg.timestamp}
                </span>

                {/* Interactive Option Chips if present */}
                {msg.options && msg.options.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2.5 max-w-[95%]">
                    {msg.options.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          if (opt.action === 'select_service') {
                            handleServiceSelect(opt.payload);
                          } else if (opt.action === 'select_budget') {
                            handleBudgetSelect(opt.payload);
                          } else if (opt.action === 'open_calendar_modal') {
                            setIsOpen(false);
                            onOpenBooking();
                          } else {
                            handleAction(opt.action, opt.payload);
                          }
                        }}
                        className="px-3 py-1.5 rounded-xl bg-purple-500/10 hover:bg-purple-600 border border-purple-500/30 hover:border-purple-600 text-purple-200 hover:text-white text-[11px] font-medium transition-all text-left flex items-center gap-1.5 shadow-sm active:scale-95"
                      >
                        <span>{opt.label}</span>
                        <ChevronRight className="w-3 h-3 text-purple-400" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1.5 p-3 rounded-2xl bg-[#13192A] border border-white/10 w-20 text-slate-400">
                <span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Agency Contact Shortcuts */}
          <div className="px-3 py-1.5 bg-[#090D17] border-t border-white/[0.06] flex items-center justify-between text-[10px] text-slate-400">
            <span className="flex items-center gap-1 text-slate-400">
              <Sparkles className="w-3 h-3 text-purple-400" /> NYSAX Agency Bot
            </span>
            <div className="flex items-center gap-2">
              <a
                href="https://www.instagram.com/nysax.agency?stkn=MXdycDVzN3lqc2tqZA=="
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-400 flex items-center gap-1"
              >
                <InstagramIcon className="w-3 h-3" /> @nysax.agency
              </a>
              <span>•</span>
              <a
                href="mailto:nysaxofficial@gmail.com"
                className="hover:text-purple-400 flex items-center gap-1"
              >
                <Mail className="w-3 h-3" /> Email
              </a>
            </div>
          </div>

          {/* Input Bar */}
          <div className="p-3 bg-[#0D1220] border-t border-white/10 flex items-center gap-2">
            <input
              type="text"
              placeholder={leadCaptureStep ? "Type your answer..." : "Ask about SEO, Pricing, Newbies, Web..."}
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleUserMessage(inputVal);
                }
              }}
              className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#090D17] border border-slate-800 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-purple-500"
            />
            <button
              onClick={() => handleUserMessage(inputVal)}
              disabled={!inputVal.trim()}
              className="p-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white disabled:opacity-30 hover:scale-105 active:scale-95 transition-all"
              title="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </aside>
  );
};
