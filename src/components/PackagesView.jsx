import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { PACKAGES } from '../data/travelData';
import {
  Star,
  Heart,
  Calendar,
  Clock,
  Sparkles,
  MapPin,
  SlidersHorizontal,
  ChevronRight,
  RotateCcw
} from 'lucide-react';

export default function PackagesView({ searchQuery, categoryFilter, setCategoryFilter }) {
  const { wishlist, toggleWishlist, formatMoney, setSelectedPackage, setCheckoutItem } = useApp();

  const [regionFilter, setRegionFilter] = useState('all'); // 'all', 'domestic', 'intl'
  const [maxPrice, setMaxPrice] = useState(100000);
  const [sortBy, setSortBy] = useState('pop'); // 'pop', 'low', 'high', 'rating'

  const filteredPackages = useMemo(() => {
    return PACKAGES.filter(pkg => {
      // Search query
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const match =
          pkg.name.toLowerCase().includes(q) ||
          pkg.loc.toLowerCase().includes(q) ||
          pkg.cat.toLowerCase().includes(q) ||
          pkg.tag.toLowerCase().includes(q);
        if (!match) return false;
      }

      // Category
      if (categoryFilter !== 'all' && pkg.cat !== categoryFilter) {
        return false;
      }

      // Region
      if (regionFilter === 'domestic' && pkg.intl) return false;
      if (regionFilter === 'intl' && !pkg.intl) return false;

      // Max price
      if (pkg.price > maxPrice) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'pop') return b.rev - a.rev;
      if (sortBy === 'low') return a.price - b.price;
      if (sortBy === 'high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });
  }, [searchQuery, categoryFilter, regionFilter, maxPrice, sortBy]);

  const resetFilters = () => {
    setCategoryFilter('all');
    setRegionFilter('all');
    setMaxPrice(100000);
    setSortBy('pop');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Filter Sidebar */}
      <aside className="lg:col-span-1">
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm sticky top-24 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2 font-display font-bold text-base text-slate-900 dark:text-white">
              <SlidersHorizontal className="w-4 h-4 text-brand-500" />
              Filter Packages
            </div>
            <button
              onClick={resetFilters}
              className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              Reset
            </button>
          </div>

          {/* Region */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
              Region
            </label>
            <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-bold">
              {[
                { id: 'all', label: 'All' },
                { id: 'domestic', label: 'India' },
                { id: 'intl', label: 'Global' }
              ].map(r => (
                <button
                  key={r.id}
                  onClick={() => setRegionFilter(r.id)}
                  className={`py-1.5 rounded-lg transition-all ${
                    regionFilter === r.id
                      ? 'bg-white dark:bg-slate-700 text-brand-600 dark:text-brand-300 shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Slider */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Max Budget / Person
              </label>
              <span className="text-xs font-mono font-bold text-brand-600 dark:text-brand-400">
                {formatMoney(maxPrice)}
              </span>
            </div>
            <input
              type="range"
              min="10000"
              max="100000"
              step="5000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(+e.target.value)}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-brand-500"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
              <span>{formatMoney(10000)}</span>
              <span>{formatMoney(100000)}</span>
            </div>
          </div>

          {/* Sort By */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            >
              <option value="pop">Most Popular (Reviews)</option>
              <option value="rating">Top Rated (Stars)</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
            </select>
          </div>
        </div>
      </aside>

      {/* Package Grid */}
      <main className="lg:col-span-3">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-display font-extrabold text-2xl text-slate-900 dark:text-white">
              Curated Escapes
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Showing {filteredPackages.length} of {PACKAGES.length} handpicked holiday itineraries
            </p>
          </div>
        </div>

        {filteredPackages.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-slate-200/80 dark:border-slate-800 shadow-sm">
            <div className="w-16 h-16 rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-amber-500 flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8" />
            </div>
            <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
              No matching packages found
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1.5 mb-6">
              Try adjusting your price ceiling or search term to discover more stunning locations.
            </p>
            <button
              onClick={resetFilters}
              className="px-5 py-2.5 rounded-xl bg-brand-500 text-white font-bold text-xs shadow-md shadow-brand-500/20 hover:bg-brand-600 transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredPackages.map((pkg) => {
              const isWishlisted = wishlist.includes(`p:${pkg.id}`);
              return (
                <div
                  key={pkg.id}
                  className="group bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-brand-500/30 transition-all duration-300 flex flex-col hover:-translate-y-1"
                >
                  {/* Photo Container */}
                  <div className="relative aspect-[16/11] overflow-hidden bg-slate-100 dark:bg-slate-800">
                    <img
                      src={pkg.image}
                      alt={pkg.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20"></div>

                    {/* Tag badge */}
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-slate-900/80 text-white backdrop-blur-md border border-white/20">
                      {pkg.tag}
                    </div>

                    {/* Wishlist toggle */}
                    <button
                      onClick={() => toggleWishlist(`p:${pkg.id}`, pkg.name)}
                      className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md transition-transform duration-200 hover:scale-110 shadow-md ${
                        isWishlisted
                          ? 'bg-rose-500 text-white'
                          : 'bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-200 hover:text-rose-500'
                      }`}
                      aria-label="Save to Wishlist"
                    >
                      <Heart
                        className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`}
                      />
                    </button>

                    {/* Bottom overlay info */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-semibold">
                      <div className="flex items-center gap-1.5 drop-shadow-sm">
                        <MapPin className="w-3.5 h-3.5 text-sun" />
                        <span className="truncate max-w-[150px]">{pkg.loc}</span>
                      </div>
                      <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-400/90 text-slate-950 font-bold backdrop-blur-sm">
                        <Star className="w-3 h-3 fill-current" />
                        {pkg.rating}
                      </div>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="font-display font-extrabold text-lg text-slate-900 dark:text-white line-clamp-1 group-hover:text-brand-500 transition-colors">
                      {pkg.name}
                    </h3>

                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                      {pkg.blurb}
                    </p>

                    <div className="mt-3 flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 font-medium">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-brand-500" />
                        {pkg.days} Days / {pkg.nights} Nights
                      </div>
                      <span>•</span>
                      <div>{pkg.rev.toLocaleString()} reviews</div>
                    </div>

                    {/* Highlights pills */}
                    <div className="mt-3.5 flex flex-wrap gap-1.5">
                      {pkg.hi.slice(0, 2).map((h, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded-lg text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 truncate max-w-[200px]"
                        >
                          ✓ {h}
                        </span>
                      ))}
                    </div>

                    {/* Price & Action Footer */}
                    <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                      <div>
                        <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                          Starting From
                        </div>
                        <div className="font-display font-extrabold text-xl text-slate-900 dark:text-white">
                          {formatMoney(pkg.price)}
                          <span className="text-[10px] font-normal text-slate-400 font-sans ml-1">/ person</span>
                        </div>
                      </div>

                      <button
                        onClick={() => setSelectedPackage(pkg)}
                        className="px-4 py-2 rounded-xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-300 hover:bg-brand-500 hover:text-white dark:hover:bg-brand-500 dark:hover:text-white font-bold text-xs transition-all shadow-sm flex items-center gap-1 group/btn"
                      >
                        Explore
                        <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
