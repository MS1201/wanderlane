import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CITIES, AIRPORT } from '../data/travelData';
import {
  Compass,
  Plane,
  Building,
  Calendar,
  Users,
  Search,
  ArrowRightLeft,
  Sparkles,
  MapPin,
  ShieldCheck,
  Tag,
  Clock
} from 'lucide-react';

export default function HeroSearch({ onSearchSubmit, packageQuery, setPackageQuery, selectedCategory, setSelectedCategory }) {
  const { activeTab, setActiveTab } = useApp();

  // Search form states
  // Packages
  const [pkgDate, setPkgDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 15);
    return d.toISOString().split('T')[0];
  });
  const [pkgPax, setPkgPax] = useState(2);

  // Flights
  const [flFrom, setFlFrom] = useState('Mumbai');
  const [flTo, setFlTo] = useState('Goa');
  const [flDate, setFlDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 10);
    return d.toISOString().split('T')[0];
  });
  const [flPax, setFlPax] = useState(1);
  const [flCabin, setFlCabin] = useState('Economy');

  // Stays
  const [stCity, setStCity] = useState('Goa');
  const [stIn, setStIn] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 12);
    return d.toISOString().split('T')[0];
  });
  const [stOut, setStOut] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 15);
    return d.toISOString().split('T')[0];
  });
  const [stGuests, setStGuests] = useState(2);
  const [stRooms, setStRooms] = useState(1);

  const today = new Date().toISOString().split('T')[0];

  const swapCities = () => {
    const temp = flFrom;
    setFlFrom(flTo);
    setFlTo(temp);
  };

  const handleSearch = (e) => {
    e?.preventDefault();
    if (onSearchSubmit) {
      onSearchSubmit({
        tab: activeTab,
        pkg: { q: packageQuery, date: pkgDate, pax: pkgPax },
        fl: { from: flFrom, to: flTo, date: flDate, pax: flPax, cabin: flCabin },
        st: { city: stCity, checkIn: stIn, checkOut: stOut, guests: stGuests, rooms: stRooms }
      });
    }
    // Smooth scroll down to results
    const resultsElement = document.getElementById('results-section');
    if (resultsElement) {
      resultsElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="relative pt-6 pb-12">
      {/* Background Banner */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-[#063b42] via-[#0b7a83] to-[#125862] text-white p-8 sm:p-12 lg:p-16 mb-[-64px]">
        {/* Subtle decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-sun/15 rounded-full blur-3xl pointer-events-none transform translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-300/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-xs font-bold tracking-wide uppercase text-teal-100 border border-white/20 mb-5">
            <Sparkles className="w-3.5 h-3.5 text-sun" />
            Curated Escapes & Member Perks
          </div>

          <h1 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.1] text-white">
            Plan it once. <br className="hidden sm:inline" />
            <span className="text-sun drop-shadow-sm italic font-normal">Pack and go.</span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-teal-50/90 max-w-xl font-normal leading-relaxed">
            Discover bespoke holiday packages, daily non-stop flights and handpicked villas. Every confirmed booking generates instant verifiable e-tickets.
          </p>

          <div className="mt-6 flex flex-wrap gap-5 text-xs text-teal-100/90 font-medium pb-8 sm:pb-4">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              100% Flexible Cancellation
            </div>
            <div className="flex items-center gap-1.5">
              <Tag className="w-4 h-4 text-sun" />
              Up to 7% Member Savings
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-teal-300" />
              Instant Boarding Pass
            </div>
          </div>
        </div>
      </div>

      {/* Floating Interactive Search Card */}
      <div className="relative z-20 max-w-5xl mx-auto px-3 sm:px-6">
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl shadow-slate-900/10 border border-slate-200/90 dark:border-slate-800 p-4 sm:p-6 transition-colors">
          {/* Tab Selector */}
          <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800/80 pb-4 mb-5 overflow-x-auto">
            <button
              onClick={() => setActiveTab('packages')}
              className={`flex items-center gap-2.5 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all whitespace-nowrap ${
                activeTab === 'packages'
                  ? 'bg-brand-500 text-white shadow-md shadow-brand-500/25'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Compass className="w-4 h-4" />
              Holiday Packages
            </button>

            <button
              onClick={() => setActiveTab('flights')}
              className={`flex items-center gap-2.5 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all whitespace-nowrap ${
                activeTab === 'flights'
                  ? 'bg-brand-500 text-white shadow-md shadow-brand-500/25'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Plane className="w-4 h-4" />
              Flights
            </button>

            <button
              onClick={() => setActiveTab('stays')}
              className={`flex items-center gap-2.5 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all whitespace-nowrap ${
                activeTab === 'stays'
                  ? 'bg-brand-500 text-white shadow-md shadow-brand-500/25'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Building className="w-4 h-4" />
              Boutique Stays
            </button>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSearch}>
            {activeTab === 'packages' && (
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5 items-end">
                <div className="sm:col-span-5">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                    Destination or Keyword
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={packageQuery}
                      onChange={(e) => setPackageQuery(e.target.value)}
                      placeholder="e.g. Goa, Ladakh, Maldives, Bali..."
                      className="w-full pl-10 pr-3 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                    Departure Date
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="date"
                      min={today}
                      value={pkgDate}
                      onChange={(e) => setPkgDate(e.target.value)}
                      className="w-full pl-10 pr-3 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                    Travellers
                  </label>
                  <div className="flex items-center justify-between px-3 py-2 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl">
                    <button
                      type="button"
                      onClick={() => setPkgPax(Math.max(1, pkgPax - 1))}
                      className="w-6 h-6 flex items-center justify-center rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold hover:bg-brand-500 hover:text-white transition-colors"
                    >
                      -
                    </button>
                    <span className="text-sm font-bold text-slate-900 dark:text-white">{pkgPax}</span>
                    <button
                      type="button"
                      onClick={() => setPkgPax(Math.min(9, pkgPax + 1))}
                      className="w-6 h-6 flex items-center justify-center rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold hover:bg-brand-500 hover:text-white transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 rounded-xl bg-sun hover:bg-sun-dark text-slate-950 font-extrabold text-sm shadow-lg shadow-sun/25 transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5"
                  >
                    <Search className="w-4 h-4" />
                    Find Trips
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'flights' && (
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
                <div className="sm:col-span-3">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                    From City
                  </label>
                  <select
                    value={flFrom}
                    onChange={(e) => setFlFrom(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-brand-500/30"
                  >
                    {CITIES.map(c => (
                      <option key={c} value={c}>{c} ({AIRPORT[c]})</option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-1 flex justify-center pb-2">
                  <button
                    type="button"
                    onClick={swapCities}
                    className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
                    title="Swap Origin and Destination"
                  >
                    <ArrowRightLeft className="w-4 h-4 text-brand-500" />
                  </button>
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                    To City
                  </label>
                  <select
                    value={flTo}
                    onChange={(e) => setFlTo(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-brand-500/30"
                  >
                    {CITIES.map(c => (
                      <option key={c} value={c}>{c} ({AIRPORT[c]})</option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                    Date
                  </label>
                  <input
                    type="date"
                    min={today}
                    value={flDate}
                    onChange={(e) => setFlDate(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-brand-500/30"
                  />
                </div>

                <div className="sm:col-span-1">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                    Cabin
                  </label>
                  <select
                    value={flCabin}
                    onChange={(e) => setFlCabin(e.target.value)}
                    className="w-full px-2 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold focus:outline-none"
                  >
                    <option value="Economy">Eco</option>
                    <option value="Premium">Prem</option>
                    <option value="Business">Biz</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 rounded-xl bg-sun hover:bg-sun-dark text-slate-950 font-extrabold text-sm shadow-lg shadow-sun/25 transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5"
                  >
                    <Plane className="w-4 h-4" />
                    Flights
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'stays' && (
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
                <div className="sm:col-span-3">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                    City Location
                  </label>
                  <select
                    value={stCity}
                    onChange={(e) => setStCity(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-brand-500/30"
                  >
                    {CITIES.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                    Check-In
                  </label>
                  <input
                    type="date"
                    min={today}
                    value={stIn}
                    onChange={(e) => setStIn(e.target.value)}
                    className="w-full px-2.5 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                    Check-Out
                  </label>
                  <input
                    type="date"
                    min={stIn}
                    value={stOut}
                    onChange={(e) => setStOut(e.target.value)}
                    className="w-full px-2.5 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-3 flex gap-2">
                  <div className="flex-1">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                      Guests
                    </label>
                    <select
                      value={stGuests}
                      onChange={(e) => setStGuests(+e.target.value)}
                      className="w-full px-2 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold focus:outline-none"
                    >
                      {[1,2,3,4,5,6].map(n => (
                        <option key={n} value={n}>{n} guest{n>1?'s':''}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex-1">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                      Rooms
                    </label>
                    <select
                      value={stRooms}
                      onChange={(e) => setStRooms(+e.target.value)}
                      className="w-full px-2 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold focus:outline-none"
                    >
                      {[1,2,3,4].map(n => (
                        <option key={n} value={n}>{n} room{n>1?'s':''}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 rounded-xl bg-sun hover:bg-sun-dark text-slate-950 font-extrabold text-sm shadow-lg shadow-sun/25 transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5"
                  >
                    <Building className="w-4 h-4" />
                    Stays
                  </button>
                </div>
              </div>
            )}
          </form>

          {/* Quick Style Chips for Packages */}
          {activeTab === 'packages' && (
            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 overflow-x-auto text-xs font-semibold">
              <span className="text-slate-400 font-medium whitespace-nowrap">Trip Style:</span>
              {[
                { id: 'all', label: 'All Places' },
                { id: 'beach', label: '🏖️ Beach & Islands' },
                { id: 'mountain', label: '🏔️ Snow & Peaks' },
                { id: 'heritage', label: '🏰 Royal Heritage' },
                { id: 'forest', label: '🌿 Nature & Wildlife' },
                { id: 'city', label: '🏙️ Skyline & City' }
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1 rounded-full whitespace-nowrap transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-brand-500 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
