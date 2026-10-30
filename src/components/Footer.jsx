import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Sparkles, Heart, Globe, Award, Plane } from 'lucide-react';

export default function Footer() {
  const { setActiveView, setActiveTab, currency } = useApp();

  return (
    <footer className="mt-20 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-500 to-teal-400 flex items-center justify-center shadow-md">
                <svg viewBox="0 0 32 32" className="w-5 h-5">
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
              <span className="font-display font-extrabold text-xl text-slate-900 dark:text-white">
                Wanderlane
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
              Next-generation travel booking platform. Handcrafted holiday packages, live air tickets, and verified luxury resorts with instant digital boarding passes.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400 font-bold">
              <ShieldCheck className="w-4 h-4" />
              Verified & Secure Booking Engine
            </div>
          </div>

          {/* Quick links: Explore */}
          <div>
            <h5 className="font-display font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Explore Journeys
            </h5>
            <ul className="space-y-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
              <li>
                <button
                  onClick={() => {
                    setActiveView('explore');
                    setActiveTab('packages');
                    window.scrollTo({ top: 400, behavior: 'smooth' });
                  }}
                  className="hover:text-brand-500 transition-colors"
                >
                  Goa Beach Retreats
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveView('explore');
                    setActiveTab('packages');
                    window.scrollTo({ top: 400, behavior: 'smooth' });
                  }}
                  className="hover:text-brand-500 transition-colors"
                >
                  Manali Himalayan Snow Trails
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveView('explore');
                    setActiveTab('packages');
                    window.scrollTo({ top: 400, behavior: 'smooth' });
                  }}
                  className="hover:text-brand-500 transition-colors"
                >
                  Ladakh Khardung La Expeditions
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveView('explore');
                    setActiveTab('packages');
                    window.scrollTo({ top: 400, behavior: 'smooth' });
                  }}
                  className="hover:text-brand-500 transition-colors"
                >
                  Maldives Overwater Sanctuaries
                </button>
              </li>
            </ul>
          </div>

          {/* Air Travel & Stays */}
          <div>
            <h5 className="font-display font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Air & Accommodation
            </h5>
            <ul className="space-y-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
              <li>
                <button
                  onClick={() => {
                    setActiveView('explore');
                    setActiveTab('flights');
                    window.scrollTo({ top: 400, behavior: 'smooth' });
                  }}
                  className="hover:text-brand-500 transition-colors"
                >
                  Non-Stop Domestic Flights
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveView('explore');
                    setActiveTab('flights');
                    window.scrollTo({ top: 400, behavior: 'smooth' });
                  }}
                  className="hover:text-brand-500 transition-colors"
                >
                  Airbus & Boeing Seat Selector
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveView('explore');
                    setActiveTab('stays');
                    window.scrollTo({ top: 400, behavior: 'smooth' });
                  }}
                  className="hover:text-brand-500 transition-colors"
                >
                  Palace Havelis & Boutique Villas
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveView('profile');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-brand-500 transition-colors"
                >
                  Wanderlane Club Loyalty Discounts
                </button>
              </li>
            </ul>
          </div>

          {/* Trust & Guarantee */}
          <div className="space-y-3">
            <h5 className="font-display font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Wanderlane Guarantee
            </h5>
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 space-y-2 text-xs">
              <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
                <Award className="w-4 h-4 text-sun" />
                Price Match Assurance
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Found a lower published fare for the same holiday or flight? We'll match it and credit 1,000 reward points.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <div>
            © 2026 Wanderlane Travel Technologies Ltd. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>Fares shown in {currency}</span>
            <span>•</span>
            <span>256-Bit SSL Protection</span>
            <span>•</span>
            <span className="flex items-center gap-1 text-slate-600 dark:text-slate-300">
              Crafted with <Heart className="w-3 h-3 text-rose-500 fill-current" /> for Travellers
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

