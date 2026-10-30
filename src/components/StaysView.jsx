import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { STAYS, CITIES } from '../data/travelData';
import {
  Building,
  Star,
  Heart,
  MapPin,
  Calendar,
  Users,
  Check,
  Sparkles,
  SlidersHorizontal,
  ChevronRight
} from 'lucide-react';

export default function StaysView({ stayParams }) {
  const { wishlist, toggleWishlist, formatMoney, setCheckoutItem } = useApp();

  const city = stayParams?.city || 'Goa';
  const checkIn = stayParams?.checkIn || '2026-11-12';
  const checkOut = stayParams?.checkOut || '2026-11-15';
  const guests = stayParams?.guests || 2;
  const rooms = stayParams?.rooms || 1;

  // Nights calculation
  const nights = useMemo(() => {
    const d1 = new Date(checkIn);
    const d2 = new Date(checkOut);
    const diff = Math.round((d2 - d1) / (1000 * 60 * 60 * 24));
    return Math.max(1, diff);
  }, [checkIn, checkOut]);

  const [typeFilter, setTypeFilter] = useState('all'); // 'all', 'Hotel', 'Resort', 'Boutique', 'Heritage', 'Luxury'
  const [selectedSort, setSelectedSort] = useState('pop'); // 'pop', 'low', 'high'

  const filteredStays = useMemo(() => {
    return STAYS.filter(s => {
      if (s.city !== city) return false;
      if (typeFilter !== 'all' && s.type !== typeFilter) return false;
      return true;
    }).sort((a, b) => {
      if (selectedSort === 'pop') return b.rating - a.rating;
      if (selectedSort === 'low') return a.price - b.price;
      if (selectedSort === 'high') return b.price - a.price;
      return 0;
    });
  }, [city, typeFilter, selectedSort]);

  const handleBookStay = (stay) => {
    const totalStayFare = stay.price * nights * rooms;
    setCheckoutItem({
      kind: 'stay',
      title: stay.n,
      sub: `${stay.city} • ${stay.type} • ${nights} night${nights > 1 ? 's' : ''} • ${rooms} room${rooms > 1 ? 's' : ''}`,
      date: checkIn,
      end: checkOut,
      qty: guests,
      unitLabel: `${formatMoney(stay.price)}/night × ${nights} nights × ${rooms} room${rooms > 1 ? 's' : ''}`,
      base: totalStayFare,
      image: stay.image,
      stay
    });
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-display font-extrabold text-2xl text-slate-900 dark:text-white">
              Boutique Stays & Resorts in {city}
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-sun/20 text-sun-dark dark:text-sun">
              {filteredStays.length} Options
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-brand-500" />
              {checkIn} to {checkOut} ({nights} night{nights > 1 ? 's' : ''})
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-brand-500" />
              {guests} Guest{guests > 1 ? 's' : ''}, {rooms} Room{rooms > 1 ? 's' : ''}
            </span>
          </p>
        </div>

        {/* Filter chips & sort */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-bold">
            {['all', 'Resort', 'Boutique', 'Heritage', 'Luxury', 'Hotel'].map(t => (
              <button
                key={t}
                onClick={() => setTypeFilter(t)}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  typeFilter === t
                    ? 'bg-white dark:bg-slate-700 text-brand-600 dark:text-brand-300 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                {t === 'all' ? 'All Stays' : t}
              </button>
            ))}
          </div>

          <select
            value={selectedSort}
            onChange={(e) => setSelectedSort(e.target.value)}
            className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold focus:outline-none"
          >
            <option value="pop">Top Rated</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Stays List */}
      {filteredStays.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-slate-200/80 dark:border-slate-800">
          <Building className="w-12 h-12 text-slate-400 mx-auto mb-3" />
          <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
            No {typeFilter !== 'all' ? typeFilter : ''} stays found in {city}
          </h3>
          <p className="text-xs text-slate-500 mt-1 mb-4">
            Try switching to 'All Stays' or choosing another travel destination.
          </p>
          <button
            onClick={() => setTypeFilter('all')}
            className="px-4 py-2 rounded-xl bg-brand-500 text-white font-bold text-xs"
          >
            Show All {city} Stays
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredStays.map((stay, idx) => {
            const isWishlisted = wishlist.includes(`s:${idx}`);
            const totalCost = stay.price * nights * rooms;

            return (
              <div
                key={stay.n}
                className="group bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-brand-500/30 transition-all duration-300 flex flex-col md:flex-row"
              >
                {/* Stay Photo */}
                <div className="relative md:w-80 aspect-[16/10] md:aspect-auto overflow-hidden bg-slate-100 dark:bg-slate-800 flex-shrink-0">
                  <img
                    src={stay.image}
                    alt={stay.n}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-slate-900/80 text-white backdrop-blur-md">
                    {stay.type}
                  </span>

                  <button
                    onClick={() => toggleWishlist(`s:${idx}`, stay.n)}
                    className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md transition-transform hover:scale-110 shadow-md ${
                      isWishlisted
                        ? 'bg-rose-500 text-white'
                        : 'bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-200 hover:text-rose-500'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                  </button>
                </div>

                {/* Stay Details */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
                        <MapPin className="w-3.5 h-3.5 text-brand-500" />
                        {stay.city}, India
                      </div>
                      <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 font-bold text-xs">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        {stay.rating}
                        <span className="text-[11px] font-normal text-slate-400">
                          ({stay.reviewsCount} reviews)
                        </span>
                      </div>
                    </div>

                    <h3 className="font-display font-extrabold text-xl text-slate-900 dark:text-white mt-1 group-hover:text-brand-500 transition-colors">
                      {stay.n}
                    </h3>

                    {/* Room options */}
                    <div className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                      Available Room Categories:{' '}
                      <span className="font-semibold text-slate-700 dark:text-slate-200">
                        {stay.roomTypes.join(', ')}
                      </span>
                    </div>

                    {/* Amenities pills */}
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {stay.am.map((amenity, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center gap-1"
                        >
                          <Check className="w-3 h-3 text-emerald-500 stroke-[3]" />
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Price & Booking action */}
                  <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-end justify-between">
                    <div>
                      <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        Nightly Rate
                      </div>
                      <div className="font-display font-extrabold text-2xl text-slate-900 dark:text-white">
                        {formatMoney(stay.price)}
                        <span className="text-xs font-normal text-slate-400 font-sans ml-1">/ night</span>
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        Total {formatMoney(totalCost)} for {nights} night{nights > 1 ? 's' : ''} ({rooms} room)
                      </div>
                    </div>

                    <button
                      onClick={() => handleBookStay(stay)}
                      className="px-5 py-2.5 rounded-xl bg-sun hover:bg-sun-dark text-slate-950 font-extrabold text-xs shadow-md shadow-sun/20 flex items-center gap-1.5 transition-all hover:-translate-y-0.5"
                    >
                      Book Stay
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

