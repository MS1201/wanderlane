import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { USERS, CITIES } from '../data/travelData';
import {
  X,
  Sparkles,
  ArrowRight,
  User,
  Mail,
  Lock,
  Phone,
  MapPin,
  CheckCircle2
} from 'lucide-react';

export default function AuthModal() {
  const { authModalOpen, setAuthModalOpen, signInUser, showToast } = useApp();

  if (!authModalOpen) return null;

  const [mode, setMode] = useState('signin'); // 'signin' or 'signup'
  const [error, setError] = useState('');

  // Sign In inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Sign Up inputs
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPhone, setSignupPhone] = useState('');
  const [signupHome, setSignupHome] = useState('Mumbai');
  const [signupPass, setSignupPass] = useState('');

  const handleSignIn = (e) => {
    e.preventDefault();
    setError('');

    const trimmedEmail = email.trim().toLowerCase();
    const found = USERS.find(u => u.email.toLowerCase() === trimmedEmail);

    if (!found) {
      setError('No account found with this email. Please click one of the demo users below.');
      return;
    }

    if (password !== 'demo123') {
      setError('Password incorrect. (Demo password is: demo123)');
      return;
    }

    signInUser(found);
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    setError('');

    if (signupName.trim().length < 2) {
      setError('Please enter your full legal name.');
      return;
    }
    if (!signupEmail.trim() || !signupEmail.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    if (signupPhone.replace(/\D/g, '').length < 10) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (signupPass.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    const newUser = {
      id: Date.now(),
      name: signupName.trim(),
      email: signupEmail.trim().toLowerCase(),
      pass: signupPass,
      tier: 'Explorer',
      home: signupHome,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      color: '#0B7A83',
      phone: signupPhone.trim(),
      points: 100
    };

    signInUser(newUser);
    showToast('Account created! Welcome to Wanderlane Club.', 'success');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="font-display font-extrabold text-xl text-slate-900 dark:text-white">
              {mode === 'signin' ? 'Sign In to Wanderlane' : 'Create Wanderlane Account'}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Unlock exclusive member perks & manage your trips
            </p>
          </div>

          <button
            onClick={() => setAuthModalOpen(false)}
            className="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="p-6 space-y-5">
          <div className="grid grid-cols-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl text-xs font-bold">
            <button
              onClick={() => {
                setMode('signin');
                setError('');
              }}
              className={`py-2 rounded-xl transition-all ${
                mode === 'signin'
                  ? 'bg-white dark:bg-slate-700 text-brand-600 dark:text-brand-300 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => {
                setMode('signup');
                setError('');
              }}
              className={`py-2 rounded-xl transition-all ${
                mode === 'signup'
                  ? 'bg-white dark:bg-slate-700 text-brand-600 dark:text-brand-300 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Create Account
            </button>
          </div>

          {error && (
            <div className="p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 text-rose-600 dark:text-rose-400 text-xs font-semibold">
              {error}
            </div>
          )}

          {/* Quick Demo Logins (Super convenient!) */}
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-sun" />
              Quick Demo Login (1-Click)
            </div>
            <div className="grid grid-cols-3 gap-2">
              {USERS.map(demo => (
                <button
                  key={demo.id}
                  type="button"
                  onClick={() => signInUser(demo)}
                  className="p-2.5 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-brand-500 hover:bg-brand-50/50 dark:hover:bg-brand-950/30 text-center transition-all group"
                >
                  <img
                    src={demo.avatar}
                    alt={demo.name}
                    className="w-8 h-8 rounded-full object-cover mx-auto mb-1 ring-2 ring-brand-500/20 group-hover:scale-110 transition-transform"
                  />
                  <div className="font-bold text-[11px] text-slate-800 dark:text-slate-200 truncate">
                    {demo.name.split(' ')[0]}
                  </div>
                  <div className="text-[10px] text-brand-600 dark:text-brand-400 font-extrabold uppercase">
                    {demo.tier}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="w-full border-t border-slate-200 dark:border-slate-800"></div>
            <span className="bg-white dark:bg-slate-900 px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider absolute">
              or email
            </span>
          </div>

          {/* SIGN IN FORM */}
          {mode === 'signin' && (
            <form onSubmit={handleSignIn} className="space-y-3.5">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="user1@wanderlane.demo"
                    className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="demo123"
                    className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-extrabold text-xs shadow-md shadow-brand-500/20 transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5 mt-2"
              >
                Sign In
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* SIGN UP FORM */}
          {mode === 'signup' && (
            <form onSubmit={handleSignUp} className="space-y-3">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">
                  Full Name
                </label>
                <input
                  type="text"
                  value={signupName}
                  onChange={(e) => setSignupName(e.target.value)}
                  placeholder="Aarav Sharma"
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">
                    Email
                  </label>
                  <input
                    type="email"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    placeholder="name@email.com"
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={signupPhone}
                    onChange={(e) => setSignupPhone(e.target.value)}
                    placeholder="+91 98200 11001"
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">
                    Home City
                  </label>
                  <select
                    value={signupHome}
                    onChange={(e) => setSignupHome(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold"
                  >
                    {CITIES.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">
                    Password
                  </label>
                  <input
                    type="password"
                    value={signupPass}
                    onChange={(e) => setSignupPass(e.target.value)}
                    placeholder="Min 6 characters"
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-sun hover:bg-sun-dark text-slate-950 font-extrabold text-xs shadow-md shadow-sun/20 transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5 mt-2"
              >
                Create Account & Join Club
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
