import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { CURRENCIES, USERS } from '../data/travelData';
import {
  Compass,
  Plane,
  Luggage,
  Heart,
  User,
  Sun,
  Moon,
  ChevronDown,
  LogOut,
  Sparkles,
  Menu,
  X,
  Coins
} from 'lucide-react';

export default function Navbar() {
  const {
    theme,
    toggleTheme,
    currency,
    setCurrency,
    user,
    signOut,
    signInUser,
    setAuthModalOpen,
    activeView,
    setActiveView,
    trips,
    wishlist,
    getUserTier
  } = useApp();

  const [userDropdown, setUserDropdown] = useState(false);
  const [currencyDropdown, setCurrencyDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  const activeTripsCount = trips.filter(t => t.status === 'confirmed').length;
  const tier = getUserTier();

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setUserDropdown(false);
        setCurrencyDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-900/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-8">
          <button
            onClick={() => {
              setActiveView('explore');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-3 group text-left focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-500 to-teal-400 flex items-center justify-center shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform duration-200">
              <svg viewBox="0 0 32 32" className="w-6 h-6">
                <path
                  d="M6 21c4-9 8-9 10-4s6 4 10-5"
                  fill="none"
                  stroke="#F2A33A"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                />
                <circle cx="23" cy="9" r="2.8" fill="#ffffff" />
              </svg>
            </div>
            <div>
              <div className="font-display font-extrabold text-xl tracking-tight text-slate-900 dark:text-white flex items-center gap-1">
                Wanderlane
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-sun"></span>
              </div>
              <p className="text-[11px] font-medium text-slate-400 -mt-1 hidden sm:block">Curated Journeys</p>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1.5">
            <button
              onClick={() => setActiveView('explore')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                activeView === 'explore'
                  ? 'bg-brand-50 text-brand-600 dark:bg-brand-900/40 dark:text-brand-300'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800'
              }`}
            >
              <Compass className="w-4 h-4" />
              Explore
            </button>

            <button
              onClick={() => setActiveView('trips')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                activeView === 'trips'
                  ? 'bg-brand-50 text-brand-600 dark:bg-brand-900/40 dark:text-brand-300'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800'
              }`}
            >
              <Luggage className="w-4 h-4" />
              My Trips
              {activeTripsCount > 0 && (
                <span className="ml-1 px-2 py-0.5 text-xs font-bold rounded-full bg-sun text-slate-900 shadow-sm">
                  {activeTripsCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveView('wishlist')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                activeView === 'wishlist'
                  ? 'bg-brand-50 text-brand-600 dark:bg-brand-900/40 dark:text-brand-300'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800'
              }`}
            >
              <Heart className="w-4 h-4" />
              Wishlist
              {wishlist.length > 0 && (
                <span className="ml-1 px-2 py-0.5 text-xs font-bold rounded-full bg-rose-500 text-white shadow-sm">
                  {wishlist.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveView('profile')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                activeView === 'profile'
                  ? 'bg-brand-50 text-brand-600 dark:bg-brand-900/40 dark:text-brand-300'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800'
              }`}
            >
              <User className="w-4 h-4" />
              Membership
            </button>
          </nav>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5 sm:gap-3" ref={dropdownRef}>
          {/* Currency Switcher */}
          <div className="relative">
            <button
              onClick={() => setCurrencyDropdown(!currencyDropdown)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 hover:border-brand-500 transition-colors shadow-sm"
              title="Change Currency"
            >
              <span className="text-brand-600 font-extrabold">{CURRENCIES[currency].symbol}</span>
              <span>{currency}</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-60" />
            </button>

            {currencyDropdown && (
              <div className="absolute right-0 mt-2 w-44 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl py-2 z-50 animate-fade-in">
                <div className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Select Currency
                </div>
                {Object.keys(CURRENCIES).map(cKey => (
                  <button
                    key={cKey}
                    onClick={() => {
                      setCurrency(cKey);
                      setCurrencyDropdown(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-left transition-colors ${
                      currency === cKey
                        ? 'bg-brand-50 text-brand-600 dark:bg-brand-950/60 dark:text-brand-300 font-bold'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span>{CURRENCIES[cKey].name}</span>
                    <span className="font-mono text-slate-400 font-bold">{CURRENCIES[cKey].symbol}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shadow-sm"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400 hover:rotate-45 transition-transform" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700 hover:-rotate-12 transition-transform" />
            )}
          </button>

          {/* User Account Button & Dropdown */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdown(!userDropdown)}
                className="flex items-center gap-2.5 pl-1.5 pr-2.5 py-1.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-brand-500/80 transition-all shadow-sm"
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-7 h-7 rounded-full object-cover ring-2 ring-brand-500/20"
                />
                <div className="hidden sm:block text-left text-xs">
                  <div className="font-bold text-slate-900 dark:text-white leading-tight">
                    {user.name}
                  </div>
                  <div className="text-[10px] text-brand-600 dark:text-brand-400 font-semibold flex items-center gap-0.5">
                    <Sparkles className="w-2.5 h-2.5 text-sun" />
                    {tier.name}
                  </div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {userDropdown && (
                <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-2 z-50 animate-fade-in">
                  <div className="px-3 py-2.5 border-b border-slate-100 dark:border-slate-800">
                    <div className="font-bold text-sm text-slate-900 dark:text-white">{user.name}</div>
                    <div className="text-xs text-slate-400 truncate">{user.email}</div>
                    <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300">
                      <Sparkles className="w-3 h-3 text-amber-500" />
                      {tier.name} Tier • {user.points.toLocaleString()} pts
                    </div>
                  </div>

                  <div className="py-1">
                    <button
                      onClick={() => {
                        setActiveView('profile');
                        setUserDropdown(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                      <User className="w-4 h-4 text-brand-500" />
                      My Profile & Rewards
                    </button>
                    <button
                      onClick={() => {
                        setActiveView('trips');
                        setUserDropdown(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                      <Luggage className="w-4 h-4 text-brand-500" />
                      My Bookings ({trips.length})
                    </button>
                  </div>

                  <div className="pt-1 border-t border-slate-100 dark:border-slate-800">
                    <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Switch Demo Profile
                    </div>
                    {USERS.map(demoUser => (
                      <button
                        key={demoUser.id}
                        onClick={() => {
                          signInUser(demoUser);
                          setUserDropdown(false);
                        }}
                        className={`w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                          demoUser.id === user.id
                            ? 'text-brand-600 font-bold bg-brand-50 dark:bg-brand-950/40'
                            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                      >
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: demoUser.color }} />
                        {demoUser.name} ({demoUser.tier})
                      </button>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                    <button
                      onClick={() => {
                        signOut();
                        setUserDropdown(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => setAuthModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs shadow-md shadow-brand-500/20 transition-all hover:-translate-y-0.5"
            >
              Sign In
            </button>
          )}

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300"
            aria-label="Open menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg px-4 pt-3 pb-5 space-y-2 animate-fade-in">
          <button
            onClick={() => {
              setActiveView('explore');
              setMobileMenuOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-bold text-sm ${
              activeView === 'explore'
                ? 'bg-brand-50 text-brand-600 dark:bg-brand-950/60 dark:text-brand-300'
                : 'text-slate-700 dark:text-slate-300'
            }`}
          >
            <Compass className="w-4 h-4 text-brand-500" />
            Explore Destinations
          </button>

          <button
            onClick={() => {
              setActiveView('trips');
              setMobileMenuOpen(false);
            }}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-bold text-sm ${
              activeView === 'trips'
                ? 'bg-brand-50 text-brand-600 dark:bg-brand-950/60 dark:text-brand-300'
                : 'text-slate-700 dark:text-slate-300'
            }`}
          >
            <div className="flex items-center gap-3">
              <Luggage className="w-4 h-4 text-brand-500" />
              My Trips
            </div>
            {activeTripsCount > 0 && (
              <span className="px-2 py-0.5 rounded-full text-xs bg-sun text-slate-900 font-bold">
                {activeTripsCount}
              </span>
            )}
          </button>

          <button
            onClick={() => {
              setActiveView('wishlist');
              setMobileMenuOpen(false);
            }}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-bold text-sm ${
              activeView === 'wishlist'
                ? 'bg-brand-50 text-brand-600 dark:bg-brand-950/60 dark:text-brand-300'
                : 'text-slate-700 dark:text-slate-300'
            }`}
          >
            <div className="flex items-center gap-3">
              <Heart className="w-4 h-4 text-rose-500" />
              Wishlist
            </div>
            {wishlist.length > 0 && (
              <span className="px-2 py-0.5 rounded-full text-xs bg-rose-500 text-white font-bold">
                {wishlist.length}
              </span>
            )}
          </button>

          <button
            onClick={() => {
              setActiveView('profile');
              setMobileMenuOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-bold text-sm ${
              activeView === 'profile'
                ? 'bg-brand-50 text-brand-600 dark:bg-brand-950/60 dark:text-brand-300'
                : 'text-slate-700 dark:text-slate-300'
            }`}
          >
            <User className="w-4 h-4 text-brand-500" />
            Membership & Loyalty
          </button>
        </div>
      )}
    </header>
  );
}

