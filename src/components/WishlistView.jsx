import React from 'react';
import { useApp } from '../context/AppContext';
import { PACKAGES, STAYS } from '../data/travelData';
import {
  Heart,
  Star,
  MapPin,
  Clock,
  ArrowRight,
  Sparkles,
  Building,
  Compass,
  Trash2
} from 'lucide-react';

export default function WishlistView() {
  const { wishlist, toggleWishlist, formatMoney, setSelectedPackage, setCheckoutItem, setActiveView } = useApp();

  // Separate saved packages and stays
  const savedPackages = PACKAGES.filter(p => wishlist.includes(`p:${p.id}`));
  const savedStays = STAYS.map((s, idx) => ({ ...s, originalIdx: idx })).filter(s =>
    wishlist.includes(`s:${s.originalIdx}`)
  );

  const totalSavedCount = savedPackages.length + savedStays.length;

  return (
    <div className="max-w-6xl mx-auto py-6 space-y-8">
      <div>
        <h2 className="font-display font-extrabold text-2xl text-slate-900 dark:text-white flex items-center gap-2">
          <Heart className="w-6 h-6 text-rose-500 fill-current" />
          Saved Wishlist
          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300">
            {totalSavedCount} items
          </span>
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Your shortlisted dream destinations and boutique luxury hideaways
        </p>
      </div>

      {totalSavedCount === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-rose-50 dark:bg-rose-950/40 text-rose-500 flex items-center justify-center mx-auto mb-4">
            <Heart className="w-8 h-8" />
          </div>
          <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
            Your wishlist is empty
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-6">
            Tap the heart icon on any package or hotel card while exploring to keep track of your favorites here.
          </p>
          <button
            onClick={() => setActiveView('explore')}
            className="px-5 py-2.5 rounded-xl bg-sun hover:bg-sun-dark text-slate-950 font-extrabold text-xs shadow-md shadow-sun/20 transition-all inline-flex items-center gap-1.5"
          >
            Start Exploring Now
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Saved Holiday Packages */}
          {savedPackages.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-4 font-display font-bold text-base text-slate-900 dark:text-white">
                <Compass className="w-4 h-4 text-brand-500" />
                Saved Packages ({savedPackages.length})
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedPackages.map((pkg) => (
                  <div
                    key={pkg.id}
                    className="group bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-lg transition-all flex flex-col"
                  >
                    <div className="relative aspect-[16/11] overflow-hidden bg-slate-100">
                      <img
                        src={pkg.image}
                        alt={pkg.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <button
                        onClick={() => toggleWishlist(`p:${pkg.id}`, pkg.name)}
                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-md hover:scale-110 transition-transform"
                        title="Remove from Wishlist"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                          <span>{pkg.loc}</span>
                          <span className="flex items-center gap-1 font-bold text-amber-500">
                            <Star className="w-3 h-3 fill-current" />
                            {pkg.rating}
                          </span>
                        </div>
                        <h4 className="font-display font-extrabold text-base text-slate-900 dark:text-white">
                          {pkg.name}
                        </h4>
                        <div className="mt-2 text-xs text-slate-500 flex items-center gap-2">
                          <Clock className="w-3.5 h-3.5 text-brand-500" />
                          {pkg.days} Days / {pkg.nights} Nights
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                        <div>
                          <div className="font-display font-extrabold text-lg text-slate-900 dark:text-white">
                            {formatMoney(pkg.price)}
                          </div>
                        </div>
                        <button
                          onClick={() => setSelectedPackage(pkg)}
                          className="px-4 py-2 rounded-xl bg-brand-500 text-white font-bold text-xs shadow-md shadow-brand-500/20 hover:bg-brand-600 transition-colors"
                        >
                          View Trip
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Saved Stays */}
          {savedStays.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-4 font-display font-bold text-base text-slate-900 dark:text-white">
                <Building className="w-4 h-4 text-brand-500" />
                Saved Stays & Resorts ({savedStays.length})
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedStays.map((stay) => (
                  <div
                    key={stay.n}
                    className="group bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-lg transition-all flex flex-col"
                  >
                    <div className="relative aspect-[16/11] overflow-hidden bg-slate-100">
                      <img
                        src={stay.image}
                        alt={stay.n}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <button
                        onClick={() => toggleWishlist(`s:${stay.originalIdx}`, stay.n)}
                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-md hover:scale-110 transition-transform"
                        title="Remove from Wishlist"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                          <span>{stay.city}, India</span>
                          <span className="flex items-center gap-1 font-bold text-amber-500">
                            <Star className="w-3 h-3 fill-current" />
                            {stay.rating}
                          </span>
                        </div>
                        <h4 className="font-display font-extrabold text-base text-slate-900 dark:text-white">
                          {stay.n}
                        </h4>
                        <div className="mt-1 text-xs text-slate-500">{stay.type}</div>
                      </div>

                      <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                        <div>
                          <div className="font-display font-extrabold text-lg text-slate-900 dark:text-white">
                            {formatMoney(stay.price)}
                            <span className="text-[10px] text-slate-400 font-sans font-normal ml-1">/ night</span>
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            setCheckoutItem({
                              kind: 'stay',
                              title: stay.n,
                              sub: `${stay.city} • ${stay.type}`,
                              date: '2026-11-12',
                              end: '2026-11-15',
                              qty: 2,
                              unitLabel: `${formatMoney(stay.price)}/night (3 nights)`,
                              base: stay.price * 3,
                              image: stay.image,
                              stay
                            });
                          }}
                          className="px-4 py-2 rounded-xl bg-sun text-slate-950 font-extrabold text-xs shadow-md shadow-sun/20 hover:bg-sun-dark transition-colors"
                        >
                          Book Stay
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

