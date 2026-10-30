import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { TIERS, CITIES, USERS } from '../data/travelData';
import { downloadAllBookingsPDF } from '../utils/pdfGenerator';
import {
  User,
  Sparkles,
  Luggage,
  Heart,
  Coins,
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  CheckCircle2,
  LogOut,
  ChevronRight,
  Download
} from 'lucide-react';

export default function ProfileView() {
  const { user, setUser, getUserTier, trips, wishlist, formatMoney, signOut, signInUser, showToast } = useApp();

  if (!user) {
    return (
      <div className="max-w-md mx-auto py-16 text-center space-y-4">
        <User className="w-16 h-16 text-slate-300 mx-auto" />
        <h3 className="font-display font-bold text-xl">Sign in to access your membership</h3>
        <p className="text-xs text-slate-500">
          Save trips, unlock up to 7% loyalty discounts, and track your travel rewards.
        </p>
      </div>
    );
  }

  const tier = getUserTier();
  const currentTierIdx = TIERS.findIndex(t => t.name === tier.name);
  const nextTier = currentTierIdx < TIERS.length - 1 ? TIERS[currentTierIdx + 1] : null;

  // Calculate tier progress percentage
  let progressPct = 100;
  if (nextTier) {
    const range = nextTier.min - tier.min;
    const progress = user.points - tier.min;
    progressPct = Math.min(100, Math.max(0, Math.round((progress / range) * 100)));
  }

  // Edit details form
  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone);
  const [home, setHome] = useState(user.home || 'Mumbai');

  const totalSpent = trips
    .filter(t => t.status === 'confirmed')
    .reduce((acc, t) => acc + (t.total || 0), 0);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    if (name.trim().length < 2) {
      showToast('Name must be at least 2 characters', 'error');
      return;
    }
    const updated = { ...user, name, phone, home };
    setUser(updated);
    showToast('Profile information successfully updated!', 'success');
  };

  return (
    <div className="max-w-5xl mx-auto py-6 space-y-8">
      {/* Top Banner & Avatar */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="relative">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-tr from-brand-600 via-teal-600 to-teal-400 text-white font-display font-extrabold text-3xl sm:text-4xl flex items-center justify-center ring-4 ring-brand-500/20 shadow-lg">
              {user.name.replace(/[^A-Za-z0-9]/g, '').slice(0, 2).toUpperCase() || 'U1'}
            </div>
            <div className="absolute -bottom-2 -right-2 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-sun text-slate-950 shadow-md">
              {tier.name}
            </div>
          </div>

          <div>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white">
              {user.name}
            </h2>
            <div className="text-xs text-slate-400 font-mono mt-0.5">{user.email}</div>
            <div className="mt-2 flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 font-medium">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-brand-500" />
                {user.home || 'Mumbai'}, India
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-brand-500" />
                {user.phone}
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={signOut}
          className="px-4 py-2 rounded-xl border border-rose-200 dark:border-rose-900/60 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-xs font-bold transition-colors flex items-center gap-1.5 self-start md:self-auto"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>

      {/* Loyalty & Tier Status Card */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-7 bg-gradient-to-br from-slate-900 via-brand-900 to-teal-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 backdrop-blur-md text-teal-200 border border-white/20">
                Wanderlane Club Privileges
              </span>
              <span className="font-mono text-xs text-teal-300 font-bold">
                {user.points.toLocaleString()} PTS
              </span>
            </div>

            <h3 className="font-display font-extrabold text-3xl sm:text-4xl text-white">
              {tier.name} Status
            </h3>
            <p className="text-xs text-teal-100/90 mt-1 max-w-sm">
              {tier.off > 0
                ? `You enjoy an exclusive ${Math.round(tier.off * 100)}% automatic discount on all bookings across packages, flights and stays.`
                : 'Earn points with every flight, hotel and holiday booking to unlock up to 7% discounts.'}
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-white/15">
            <div className="flex justify-between text-xs text-teal-200 mb-2 font-semibold">
              <span>Tier Progression</span>
              <span>
                {nextTier ? `${(nextTier.min - user.points).toLocaleString()} pts to ${nextTier.name}` : 'Maximum Tier Achieved!'}
              </span>
            </div>
            <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-sun to-amber-300 rounded-full transition-all duration-500"
                style={{ width: `${progressPct}%` }}
              ></div>
            </div>
            <div className="mt-2 flex justify-between text-[11px] text-teal-300/80 font-mono">
              <span>{tier.name} ({tier.min.toLocaleString()} pts)</span>
              {nextTier && <span>{nextTier.name} ({nextTier.min.toLocaleString()} pts)</span>}
            </div>
          </div>
        </div>

        {/* Travel Stats Tiles */}
        <div className="md:col-span-5 grid grid-cols-2 gap-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
            <div className="w-10 h-10 rounded-2xl bg-brand-50 text-brand-600 dark:bg-brand-950/60 dark:text-brand-300 flex items-center justify-center font-bold mb-3">
              <Luggage className="w-5 h-5" />
            </div>
            <div>
              <div className="font-display font-extrabold text-3xl text-slate-900 dark:text-white">
                {trips.length}
              </div>
              <div className="text-xs text-slate-500 font-medium mt-0.5">Total Bookings</div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-300 flex items-center justify-center font-bold mb-3">
              <Coins className="w-5 h-5" />
            </div>
            <div>
              <div className="font-display font-extrabold text-2xl text-slate-900 dark:text-white truncate">
                {formatMoney(totalSpent)}
              </div>
              <div className="text-xs text-slate-500 font-medium mt-0.5">Total Spent</div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
            <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-300 flex items-center justify-center font-bold mb-3">
              <Heart className="w-5 h-5" />
            </div>
            <div>
              <div className="font-display font-extrabold text-3xl text-slate-900 dark:text-white">
                {wishlist.length}
              </div>
              <div className="text-xs text-slate-500 font-medium mt-0.5">Saved Places</div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-300 flex items-center justify-center font-bold mb-3">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-display font-extrabold text-xl text-slate-900 dark:text-white">
                Active
              </div>
              <div className="text-xs text-slate-500 font-medium mt-0.5">Account Status</div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Details & Switch Profile */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <form
          onSubmit={handleSaveProfile}
          className="md:col-span-7 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-5"
        >
          <h4 className="font-display font-extrabold text-lg text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">
            Personal Information
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                Full Legal Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                Mobile Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                Home City
              </label>
              <select
                value={home}
                onChange={(e) => setHome(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold"
              >
                {CITIES.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={user.email}
                disabled
                className="w-full px-3.5 py-2.5 bg-slate-100 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-400 cursor-not-allowed"
              />
            </div>
          </div>

          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-extrabold text-xs shadow-md shadow-brand-500/20 transition-all hover:-translate-y-0.5"
          >
            Save Profile Changes
          </button>
        </form>

        {/* Account Security & Support Card */}
        <div className="md:col-span-5 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <h4 className="font-display font-extrabold text-base text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            Account Security & Perks
          </h4>

          <div className="space-y-3 text-xs">
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
              <div>
                <div className="font-bold text-slate-900 dark:text-white">Club Membership Status</div>
                <div className="text-[11px] text-slate-400">Verified Gold Privilege Member</div>
              </div>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                Active
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
              <div>
                <div className="font-bold text-slate-900 dark:text-white">VIP Travel Concierge</div>
                <div className="text-[11px] text-slate-400">24/7 Priority Emergency Line</div>
              </div>
              <span className="text-brand-600 dark:text-brand-400 font-bold">
                Unlocked
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
              <div>
                <div className="font-bold text-slate-900 dark:text-white">Digital Travel Vault</div>
                <div className="text-[11px] text-slate-400">{trips.length} active e-tickets & vouchers</div>
              </div>
              <button
                onClick={() => {
                  if (trips.length === 0) {
                    showToast('No bookings found to export', 'info');
                    return;
                  }
                  downloadAllBookingsPDF(trips, user);
                  showToast('Bookings statement PDF downloaded!', 'success');
                }}
                className="px-3 py-1.5 rounded-xl bg-brand-50 hover:bg-brand-100 dark:bg-brand-950/60 dark:hover:bg-brand-900/60 text-brand-600 dark:text-brand-300 font-bold text-xs flex items-center gap-1.5 transition-colors border border-brand-200/60 dark:border-brand-800/60"
                title="Download all bookings as PDF"
              >
                <Download className="w-3.5 h-3.5" />
                Export PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

