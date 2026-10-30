import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { AIRLINES, AIRPORT } from '../data/travelData';
import {
  Plane,
  Clock,
  ArrowRight,
  Filter,
  CheckCircle2,
  Armchair,
  Sparkles,
  Luggage,
  Calendar
} from 'lucide-react';

export default function FlightsView({ flightParams }) {
  const { formatMoney, setSeatSelectorItem } = useApp();

  const fromCity = flightParams?.from || 'Mumbai';
  const toCity = flightParams?.to || 'Goa';
  const flightDate = flightParams?.date || '2026-11-15';
  const pax = flightParams?.pax || 1;
  const cabin = flightParams?.cabin || 'Economy';

  const [nonstopOnly, setNonstopOnly] = useState(false);
  const [selectedSort, setSelectedSort] = useState('price'); // 'price', 'fastest', 'early'

  // Generate realistic flight itineraries based on cities
  const flights = useMemo(() => {
    if (fromCity === toCity) return [];

    const key = [fromCity, toCity].sort().join('-');
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = (hash << 5) - hash + key.charCodeAt(i);
      hash |= 0;
    }
    const seed = Math.abs(hash);

    const baseFare = 2800 + (seed % 2600);
    const cabinMultiplier = { Economy: 1, Premium: 1.6, Business: 2.8 }[cabin] || 1;

    const list = [];
    const times = [
      { dep: '06:15', arr: '07:30', dur: '1h 15m', durMins: 75, stops: 0 },
      { dep: '08:45', arr: '10:05', dur: '1h 20m', durMins: 80, stops: 0 },
      { dep: '11:20', arr: '14:40', dur: '3h 20m', durMins: 200, stops: 1 },
      { dep: '14:10', arr: '15:25', dur: '1h 15m', durMins: 75, stops: 0 },
      { dep: '17:30', arr: '18:50', dur: '1h 20m', durMins: 80, stops: 0 },
      { dep: '19:40', arr: '23:15', dur: '3h 35m', durMins: 215, stops: 1 },
      { dep: '21:05', arr: '22:20', dur: '1h 15m', durMins: 75, stops: 0 }
    ];

    times.forEach((t, idx) => {
      const airline = AIRLINES[idx % AIRLINES.length];
      const flightNo = `${airline.code} ${300 + idx * 42}`;
      const priceVariation = 0.85 + ((idx * 17) % 35) / 100;
      const price = Math.round(baseFare * cabinMultiplier * priceVariation * (t.stops ? 0.88 : 1));

      list.push({
        id: `fl-${idx}`,
        airline,
        flightNo,
        from: fromCity,
        fromCode: AIRPORT[fromCity] || fromCity.slice(0, 3).toUpperCase(),
        to: toCity,
        toCode: AIRPORT[toCity] || toCity.slice(0, 3).toUpperCase(),
        dep: t.dep,
        arr: t.arr,
        dur: t.dur,
        durMins: t.durMins,
        stops: t.stops,
        price,
        cabin,
        date: flightDate,
        pax
      });
    });

    return list;
  }, [fromCity, toCity, flightDate, cabin, pax]);

  const filteredFlights = useMemo(() => {
    let result = [...flights];
    if (nonstopOnly) {
      result = result.filter(f => f.stops === 0);
    }
    if (selectedSort === 'price') {
      result.sort((a, b) => a.price - b.price);
    } else if (selectedSort === 'fastest') {
      result.sort((a, b) => a.durMins - b.durMins);
    } else if (selectedSort === 'early') {
      result.sort((a, b) => a.dep.localeCompare(b.dep));
    }
    return result;
  }, [flights, nonstopOnly, selectedSort]);

  if (fromCity === toCity) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-slate-200/80 dark:border-slate-800">
        <Plane className="w-12 h-12 text-rose-500 mx-auto mb-3" />
        <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
          Origin and destination cannot be identical
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          Please select two different cities in the search bar above to view flight schedules.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Flight header bar */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-display font-extrabold text-2xl text-slate-900 dark:text-white flex items-center gap-2">
              <span>{fromCity}</span>
              <ArrowRight className="w-5 h-5 text-brand-500" />
              <span>{toCity}</span>
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-brand-50 text-brand-600 dark:bg-brand-950/60 dark:text-brand-300">
              {cabin}
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-brand-500" />
              {new Date(flightDate + 'T00:00:00').toLocaleDateString('en-US', {
                weekday: 'short',
                day: 'numeric',
                month: 'short',
                year: 'numeric'
              })}
            </span>
            <span>•</span>
            <span>{pax} Traveller{pax > 1 ? 's' : ''}</span>
            <span>•</span>
            <span>{filteredFlights.length} Flights Available</span>
          </p>
        </div>

        {/* Filter controls */}
        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={() => setNonstopOnly(!nonstopOnly)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all border ${
              nonstopOnly
                ? 'bg-brand-500 text-white border-brand-500 shadow-sm'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-brand-500'
            }`}
          >
            Non-stop Only
          </button>

          <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-bold">
            <button
              onClick={() => setSelectedSort('price')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                selectedSort === 'price'
                  ? 'bg-white dark:bg-slate-700 text-brand-600 dark:text-brand-300 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Cheapest
            </button>
            <button
              onClick={() => setSelectedSort('fastest')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                selectedSort === 'fastest'
                  ? 'bg-white dark:bg-slate-700 text-brand-600 dark:text-brand-300 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Fastest
            </button>
            <button
              onClick={() => setSelectedSort('early')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                selectedSort === 'early'
                  ? 'bg-white dark:bg-slate-700 text-brand-600 dark:text-brand-300 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Earliest
            </button>
          </div>
        </div>
      </div>

      {/* Flight Cards List */}
      <div className="space-y-4">
        {filteredFlights.map((fl) => {
          const totalFare = fl.price * pax;
          return (
            <div
              key={fl.id}
              className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-lg hover:border-brand-500/40 transition-all duration-200 flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              {/* Airline Badge */}
              <div className="flex items-center gap-3.5 sm:w-44">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center font-extrabold text-white text-sm shadow-md"
                  style={{ backgroundColor: fl.airline.color }}
                >
                  {fl.airline.code}
                </div>
                <div>
                  <div className="font-display font-extrabold text-sm text-slate-900 dark:text-white">
                    {fl.airline.name}
                  </div>
                  <div className="font-mono text-[11px] text-slate-400 font-semibold">
                    {fl.flightNo}
                  </div>
                </div>
              </div>

              {/* Schedule and Route Visualization */}
              <div className="flex-1 flex items-center justify-between max-w-md mx-auto sm:mx-0 w-full">
                {/* Departure */}
                <div className="text-left">
                  <div className="font-display font-extrabold text-xl text-slate-900 dark:text-white">
                    {fl.dep}
                  </div>
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    {fl.fromCode}
                  </div>
                  <div className="text-[11px] text-slate-400 truncate max-w-[90px]">{fl.from}</div>
                </div>

                {/* Duration Line */}
                <div className="flex-1 px-4 text-center">
                  <div className="text-[11px] font-bold text-slate-400 flex items-center justify-center gap-1 mb-1">
                    <Clock className="w-3 h-3 text-brand-500" />
                    {fl.dur}
                  </div>
                  <div className="relative flex items-center justify-center">
                    <div className="w-full h-0.5 bg-slate-200 dark:bg-slate-700"></div>
                    <Plane className="w-4 h-4 text-brand-500 bg-white dark:bg-slate-900 px-0.5 absolute" />
                  </div>
                  <div className="mt-1">
                    {fl.stops === 0 ? (
                      <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
                        Non-stop
                      </span>
                    ) : (
                      <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400">
                        1 Stop (Via HYD)
                      </span>
                    )}
                  </div>
                </div>

                {/* Arrival */}
                <div className="text-right">
                  <div className="font-display font-extrabold text-xl text-slate-900 dark:text-white">
                    {fl.arr}
                  </div>
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    {fl.toCode}
                  </div>
                  <div className="text-[11px] text-slate-400 truncate max-w-[90px]">{fl.to}</div>
                </div>
              </div>

              {/* Price & Book Action */}
              <div className="flex sm:flex-col items-center sm:items-end justify-between border-t sm:border-t-0 pt-4 sm:pt-0 border-slate-100 dark:border-slate-800 gap-2">
                <div className="text-left sm:text-right">
                  <div className="font-display font-extrabold text-2xl text-slate-900 dark:text-white">
                    {formatMoney(totalFare)}
                  </div>
                  <div className="text-[11px] text-slate-400 font-medium">
                    {formatMoney(fl.price)} × {pax} {pax > 1 ? 'travellers' : 'traveller'}
                  </div>
                </div>

                <button
                  onClick={() => setSeatSelectorItem(fl)}
                  className="px-5 py-2.5 rounded-xl bg-sun hover:bg-sun-dark text-slate-950 font-extrabold text-xs shadow-md shadow-sun/20 flex items-center gap-1.5 transition-all hover:scale-105"
                >
                  <Armchair className="w-3.5 h-3.5" />
                  Choose Seats
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
