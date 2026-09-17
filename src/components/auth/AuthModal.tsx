import React, { useState } from 'react';
import { 
  X, 
  User as UserIcon, 
  Lock, 
  Mail, 
  Building2, 
  Phone, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle,
  Sparkles,
  KeyRound
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register';
  initialRole?: UserRole;
  onSuccess: (role: UserRole) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'login',
  initialRole = 'client',
  onSuccess
}) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [role, setRole] = useState<UserRole>(initialRole);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [serviceInterest, setServiceInterest] = useState('SEO Optimization');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, register, quickDemoLogin } = useAuth();

  if (!isOpen) return null;

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    const res = await login(email, password);
    setLoading(false);

    if (res.success) {
      onSuccess(role);
      onClose();
    } else {
      setErrorMsg(res.message || 'Invalid email or password.');
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    const res = await register({
      name,
      email,
      password,
      role,
      company: company || undefined,
      phone: phone || undefined,
      serviceInterest,
    });
    setLoading(false);

    if (res.success) {
      onSuccess(role);
      onClose();
    } else {
      setErrorMsg(res.message || 'Registration failed.');
    }
  };

  const handleQuickLogin = (demoRole: UserRole) => {
    quickDemoLogin(demoRole);
    onSuccess(demoRole);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-none bg-white border border-black shadow-2xl p-6 sm:p-8 overflow-hidden max-h-[92vh] overflow-y-auto font-mono">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-none bg-neutral-100 hover:bg-neutral-200 text-black transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-none border border-black mx-auto mb-3 bg-black flex items-center justify-center p-0.5 shadow-sm">
            <img src="/nysax-logo.png" alt="Nysa Agency Logo" className="w-full h-full object-cover rounded-none" />
          </div>
          <p className="text-[10px] uppercase font-mono tracking-widest text-neutral-500">
            Nysa Agency // Authentication
          </p>
          <h3 className="text-2xl font-normal text-black uppercase tracking-tight mt-1">
            {mode === 'login' ? 'Access Portal' : 'Establish Account'}
          </h3>
          <p className="text-xs text-neutral-600 mt-1 font-sans">
            {mode === 'login'
              ? 'Access your Client Campaign Portal or Executive Admin Suite.'
              : 'Register credentials to track campaign deliverables and performance.'}
          </p>
        </div>

        {/* Quick Demo Login Bar */}
        {mode === 'login' && (
          <div className="mb-5 p-3.5 rounded-none bg-neutral-50 border border-neutral-300 space-y-2">
            <p className="text-[10px] font-mono uppercase tracking-widest text-neutral-600 flex items-center gap-1.5 font-medium">
              <KeyRound className="w-3.5 h-3.5 text-black" />
              Instant Sandbox Access:
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickLogin('client')}
                className="py-2 px-2 rounded-none bg-white hover:bg-black hover:text-white border border-neutral-300 text-black text-[11px] font-mono uppercase tracking-wider transition-colors flex items-center justify-center gap-1 cursor-pointer"
              >
                <UserIcon className="w-3.5 h-3.5" /> Client Portal
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('admin')}
                className="py-2 px-2 rounded-none bg-white hover:bg-black hover:text-white border border-neutral-300 text-black text-[11px] font-mono uppercase tracking-wider transition-colors flex items-center justify-center gap-1 cursor-pointer"
              >
                <ShieldCheck className="w-3.5 h-3.5" /> Admin Suite
              </button>
            </div>
          </div>
        )}

        {/* Mode Switcher Tabs */}
        <div className="flex rounded-none bg-neutral-100 p-1 mb-5 border border-neutral-300">
          <button
            type="button"
            onClick={() => {
              setMode('login');
              setErrorMsg('');
            }}
            className={`flex-1 py-2 rounded-none text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
              mode === 'login'
                ? 'bg-black text-white'
                : 'text-neutral-600 hover:text-black'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('register');
              setErrorMsg('');
            }}
            className={`flex-1 py-2 rounded-none text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
              mode === 'register'
                ? 'bg-black text-white'
                : 'text-neutral-600 hover:text-black'
            }`}
          >
            Create Account
          </button>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 rounded-none bg-neutral-100 border border-black text-black text-xs flex items-center gap-2 font-mono">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {mode === 'login' ? (
          /* Login Form */
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-[10px] font-mono uppercase tracking-widest text-neutral-700 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="client@organization.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-none bg-neutral-50 border border-neutral-300 text-xs text-black font-mono focus:outline-none focus:border-black"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-mono uppercase tracking-widest text-neutral-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-none bg-neutral-50 border border-neutral-300 text-xs text-black font-mono focus:outline-none focus:border-black"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-none bg-black text-white text-xs uppercase tracking-widest font-mono hover:bg-neutral-900 border border-black transition-colors cursor-pointer mt-2 disabled:opacity-50"
            >
              {loading ? 'Authenticating...' : 'Sign In to Portal'}
            </button>
          </form>
        ) : (
          /* Registration Form */
          <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
            <div>
              <label className="block text-[10px] font-mono uppercase tracking-widest text-neutral-700 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
                className="w-full px-3.5 py-2 rounded-none bg-neutral-50 border border-neutral-300 text-xs text-black font-mono focus:outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="block text-[10px] font-mono uppercase tracking-widest text-neutral-700 mb-1">
                Work Email *
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="client@organization.com"
                className="w-full px-3.5 py-2 rounded-none bg-neutral-50 border border-neutral-300 text-xs text-black font-mono focus:outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="block text-[10px] font-mono uppercase tracking-widest text-neutral-700 mb-1">
                Password *
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 6 characters"
                className="w-full px-3.5 py-2 rounded-none bg-neutral-50 border border-neutral-300 text-xs text-black font-mono focus:outline-none focus:border-black"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[10px] font-mono uppercase tracking-widest text-neutral-700 mb-1">
                  Company / Brand
                </label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Brand / Entity"
                  className="w-full px-3.5 py-2 rounded-none bg-neutral-50 border border-neutral-300 text-xs text-black font-mono focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase tracking-widest text-neutral-700 mb-1">
                  Account Type
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as UserRole)}
                  className="w-full px-3.5 py-2 rounded-none bg-neutral-50 border border-neutral-300 text-xs text-black font-mono focus:outline-none focus:border-black cursor-pointer"
                >
                  <option value="client">Client User</option>
                  <option value="admin">Administrator</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-mono uppercase tracking-widest text-neutral-700 mb-1">
                Service Discipline
              </label>
              <select
                value={serviceInterest}
                onChange={(e) => setServiceInterest(e.target.value)}
                className="w-full px-3.5 py-2 rounded-none bg-neutral-50 border border-neutral-300 text-xs text-black font-mono focus:outline-none focus:border-black cursor-pointer"
              >
                <option value="SEO Optimization">SEO Optimization</option>
                <option value="Website Design">Website Design</option>
                <option value="Sales Strategy">Sales Strategy</option>
                <option value="Email Marketing">Email Marketing</option>
                <option value="Newbies in Social Media Marketing">Newbies in Social Media</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-none bg-black text-white text-xs uppercase tracking-widest font-mono hover:bg-neutral-900 border border-black transition-colors cursor-pointer mt-2 disabled:opacity-50"
            >
              {loading ? 'Creating Account...' : 'Complete Registration'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
