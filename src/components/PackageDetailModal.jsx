import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Star,
  Heart,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  XCircle,
  Users,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  Share2
} from 'lucide-react';

export default function PackageDetailModal() {
  const {
    selectedPackage,
    setSelectedPackage,
    wishlist,
    toggleWishlist,
    formatMoney,
    getUserTier,
    setCheckoutItem,
    showToast
  } = useApp();

  if (!selectedPackage) return null;

  const pkg = selectedPackage;
  const isWishlisted = wishlist.includes(`p:${pkg.id}`);
  const userTier = getUserTier();

  // Booking config within modal
  const [pax, setPax] = useState(2);
  const [departureDate, setDepartureDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 25);
    return d.toISOString().split('T')[0];
  });
  const [activeTab, setActiveTab] = useState('itinerary'); // 'itinerary', 'inclusions', 'reviews'
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);

  const photos = pkg.gallery && pkg.gallery.length > 0 ? pkg.gallery : [pkg.image];

  // Pricing calculations
  const baseCost = pkg.price * pax;
  const memberDiscount = Math.round(baseCost * userTier.off);
  const taxable = baseCost - memberDiscount;
  const tax = Math.round(taxable * 0.05);
  const total = taxable + tax;

  const handleBookNow = () => {
    const end = new Date(departureDate);
    end.setDate(end.getDate() + pkg.days);

    setSelectedPackage(null);
    setCheckoutItem({
      kind: 'package',
      title: pkg.name,
      sub: `${pkg.loc} • ${pkg.days} Days / ${pkg.nights} Nights`,
      date: departureDate,
      end: end.toISOString().split('T')[0],
      qty: pax,
      unitLabel: `${formatMoney(pkg.price)} per person`,
      base: baseCost,
      image: pkg.image,
      pkg
    });
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Trip link copied to clipboard!', 'success');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-4xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col max-h-[92vh]">
        {/* Modal Top Bar */}
        <div className="relative aspect-[21/9] sm:aspect-[21/8] bg-slate-100 dark:bg-slate-800 overflow-hidden flex-shrink-0">
          <img
            src={photos[activePhotoIdx]}
            alt={pkg.name}
            className="w-full h-full object-cover transition-all duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30"></div>

          {/* Close & Share buttons */}
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <button
              onClick={handleShare}
              className="w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md text-white flex items-center justify-center transition-colors"
              title="Share Trip"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setSelectedPackage(null)}
              className="w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md text-white flex items-center justify-center transition-colors"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Gallery Thumbnails */}
          {photos.length > 1 && (
            <div className="absolute bottom-4 right-4 flex gap-2">
              {photos.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => setActivePhotoIdx(idx)}
                  className={`w-12 h-8 rounded-lg overflow-hidden border-2 transition-transform ${
                    activePhotoIdx === idx
                      ? 'border-sun scale-110 shadow-lg'
                      : 'border-white/50 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={p} alt="thumb" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Destination Header Title */}
          <div className="absolute bottom-4 left-4 sm:left-6 text-white max-w-lg">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold uppercase bg-sun text-slate-950">
                {pkg.tag}
              </span>
              <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold">
                <Star className="w-3.5 h-3.5 text-amber-300 fill-current" />
                {pkg.rating} ({pkg.rev.toLocaleString()} reviews)
              </div>
            </div>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight drop-shadow-md">
              {pkg.name}
            </h2>
            <p className="text-xs sm:text-sm text-teal-100/90 flex items-center gap-1.5 mt-1 font-medium">
              <MapPin className="w-3.5 h-3.5 text-sun" />
              {pkg.loc} • {pkg.days} Days / {pkg.nights} Nights
            </p>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Info Columns */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <h4 className="font-display font-bold text-base text-slate-900 dark:text-white mb-2">
                About this Journey
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                {pkg.blurb}
              </p>
            </div>

            {/* Highlights */}
            <div>
              <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white mb-3">
                Signature Experiences
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {pkg.hi.map((h, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2.5"
                  >
                    <div className="w-6 h-6 rounded-lg bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300 flex items-center justify-center flex-shrink-0">
                      ✓
                    </div>
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Tabs */}
            <div>
              <div className="flex border-b border-slate-200 dark:border-slate-800 gap-6 text-xs font-bold">
                <button
                  onClick={() => setActiveTab('itinerary')}
                  className={`pb-3 transition-colors relative ${
                    activeTab === 'itinerary'
                      ? 'text-brand-500 border-b-2 border-brand-500 font-extrabold'
                      : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  Day-by-Day Itinerary
                </button>
                <button
                  onClick={() => setActiveTab('inclusions')}
                  className={`pb-3 transition-colors relative ${
                    activeTab === 'inclusions'
                      ? 'text-brand-500 border-b-2 border-brand-500 font-extrabold'
                      : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  Inclusions & Perks
                </button>
              </div>

              {/* Tab 1: Itinerary */}
              {activeTab === 'itinerary' && (
                <div className="mt-5 space-y-4">
                  {pkg.itinerary?.map((step) => (
                    <div key={step.day} className="flex gap-4">
                      <div className="w-10 h-10 rounded-2xl bg-brand-50 text-brand-600 dark:bg-brand-950/70 dark:text-brand-300 font-extrabold text-xs flex flex-col items-center justify-center flex-shrink-0 shadow-sm border border-brand-100 dark:border-brand-900">
                        <span className="text-[9px] uppercase tracking-wider font-sans">Day</span>
                        <span className="text-sm font-display -mt-1">{step.day}</span>
                      </div>
                      <div className="flex-1 pb-4 border-b border-slate-100 dark:border-slate-800">
                        <div className="font-display font-extrabold text-sm text-slate-900 dark:text-white">
                          {step.title}
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Tab 2: Inclusions */}
              {activeTab === 'inclusions' && (
                <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-2 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" />
                      What's Included
                    </div>
                    <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                      {pkg.inc.map((item, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-rose-500 mb-2 flex items-center gap-1.5">
                      <XCircle className="w-4 h-4" />
                      Not Included
                    </div>
                    <ul className="space-y-2 text-xs text-slate-500 dark:text-slate-400">
                      {pkg.exc.map((item, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sticky Booking Box Column */}
          <div className="lg:col-span-5">
            <div className="bg-slate-50 dark:bg-slate-800/80 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-5 sticky top-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-700">
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Pricing from
                  </div>
                  <div className="font-display font-extrabold text-2xl text-slate-900 dark:text-white">
                    {formatMoney(pkg.price)}
                    <span className="text-xs font-normal text-slate-400 font-sans ml-1">/ person</span>
                  </div>
                </div>

                <button
                  onClick={() => toggleWishlist(`p:${pkg.id}`, pkg.name)}
                  className={`p-2.5 rounded-xl border transition-colors ${
                    isWishlisted
                      ? 'bg-rose-50 border-rose-200 text-rose-500 dark:bg-rose-950/40 dark:border-rose-900'
                      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:text-rose-500'
                  }`}
                  title="Wishlist"
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Date & Guests selection */}
              <div className="space-y-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Select Departure
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="date"
                      value={departureDate}
                      onChange={(e) => setDepartureDate(e.target.value)}
                      className="w-full pl-10 pr-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Travellers
                  </label>
                  <div className="flex items-center justify-between px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      {pax} Traveller{pax > 1 ? 's' : ''}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setPax(Math.max(1, pax - 1))}
                        className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-extrabold flex items-center justify-center hover:bg-brand-500 hover:text-white transition-colors"
                      >
                        -
                      </button>
                      <span className="w-6 text-center font-bold text-sm text-slate-900 dark:text-white">
                        {pax}
                      </span>
                      <button
                        type="button"
                        onClick={() => setPax(Math.min(9, pax + 1))}
                        className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-extrabold flex items-center justify-center hover:bg-brand-500 hover:text-white transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Price Calculation breakdown */}
              <div className="space-y-2 pt-3 border-t border-slate-200 dark:border-slate-700 text-xs">
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Base Fare ({formatMoney(pkg.price)} × {pax})</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white">
                    {formatMoney(baseCost)}
                  </span>
                </div>

                {memberDiscount > 0 && (
                  <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-semibold">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-sun" />
                      {userTier.name} Member Discount ({Math.round(userTier.off * 100)}%)
                    </span>
                    <span className="font-mono font-bold">− {formatMoney(memberDiscount)}</span>
                  </div>
                )}

                <div className="flex justify-between text-slate-500">
                  <span>Taxes & Tourism Fees (5%)</span>
                  <span className="font-mono">{formatMoney(tax)}</span>
                </div>

                <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex justify-between items-baseline">
                  <span className="font-bold text-slate-900 dark:text-white text-sm">Total Fare</span>
                  <span className="font-display font-extrabold text-xl text-slate-900 dark:text-white">
                    {formatMoney(total)}
                  </span>
                </div>
              </div>

              {/* Action buttons */}
              <button
                onClick={handleBookNow}
                className="w-full py-3 px-4 rounded-xl bg-sun hover:bg-sun-dark text-slate-950 font-extrabold text-sm shadow-lg shadow-sun/25 transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5"
              >
                Book This Journey
                <ChevronRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                Free cancellation up to 7 days before departure
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

