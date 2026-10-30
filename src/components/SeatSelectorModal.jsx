import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Plane,
  Armchair,
  Check,
  ShieldCheck,
  Sparkles,
  Info
} from 'lucide-react';

export default function SeatSelectorModal() {
  const { seatSelectorItem, setSeatSelectorItem, setCheckoutItem, formatMoney } = useApp();

  if (!seatSelectorItem) return null;

  const fl = seatSelectorItem;
  const requiredSeatsCount = fl.pax || 1;

  // Track selected seat IDs
  const [selectedSeats, setSelectedSeats] = useState(['12A', '12B'].slice(0, requiredSeatsCount));

  // Occupied seats mock
  const occupiedSeats = ['1A', '1B', '4C', '5D', '7A', '8B', '8C', '10F', '11A', '14C', '14D'];

  const rows = [
    { row: 1, type: 'business', price: 1500, label: 'Business Flatbed' },
    { row: 2, type: 'business', price: 1500, label: 'Business Flatbed' },
    { row: 4, type: 'legroom', price: 500, label: 'Extra Legroom' },
    { row: 5, type: 'legroom', price: 500, label: 'Extra Legroom' },
    { row: 6, type: 'standard', price: 0, label: 'Standard Economy' },
    { row: 7, type: 'standard', price: 0, label: 'Standard Economy' },
    { row: 8, type: 'standard', price: 0, label: 'Standard Economy' },
    { row: 9, type: 'standard', price: 0, label: 'Standard Economy' },
    { row: 10, type: 'standard', price: 0, label: 'Standard Economy' },
    { row: 11, type: 'standard', price: 0, label: 'Standard Economy' },
    { row: 12, type: 'standard', price: 0, label: 'Standard Economy' }
  ];

  const toggleSeat = (seatId) => {
    if (occupiedSeats.includes(seatId)) return;

    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(prev => prev.filter(s => s !== seatId));
    } else {
      if (selectedSeats.length < requiredSeatsCount) {
        setSelectedSeats(prev => [...prev, seatId]);
      } else {
        // Replace the oldest selected seat
        setSelectedSeats(prev => [...prev.slice(1), seatId]);
      }
    }
  };

  const getSeatUpgradeCost = () => {
    let extra = 0;
    selectedSeats.forEach(s => {
      const rowNo = parseInt(s);
      if (rowNo <= 2) extra += 1500;
      else if (rowNo <= 5) extra += 500;
    });
    return extra;
  };

  const seatUpgradeCost = getSeatUpgradeCost();
  const baseFlightFare = fl.price * fl.pax;
  const totalCost = baseFlightFare + seatUpgradeCost;

  const handleProceed = () => {
    setSeatSelectorItem(null);
    setCheckoutItem({
      kind: 'flight',
      title: `${fl.from} to ${fl.to}`,
      sub: `${fl.airline.name} ${fl.flightNo} • ${fl.cabin} • Seats: ${selectedSeats.join(', ') || 'Auto-assigned'}`,
      date: fl.date,
      end: fl.date,
      qty: fl.pax,
      unitLabel: `${formatMoney(fl.price)} per passenger`,
      base: totalCost,
      seats: selectedSeats,
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
      fl
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/50">
          <div>
            <div className="flex items-center gap-2">
              <Armchair className="w-5 h-5 text-brand-500" />
              <h3 className="font-display font-extrabold text-lg text-slate-900 dark:text-white">
                Select Aircraft Seats
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {fl.airline.name} {fl.flightNo} • {fl.from} ({fl.fromCode}) → {fl.to} ({fl.toCode})
            </p>
          </div>

          <button
            onClick={() => setSeatSelectorItem(null)}
            className="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Legend */}
        <div className="px-6 py-3 bg-slate-100/70 dark:bg-slate-800/30 border-b border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between text-xs gap-3">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-md bg-sun border border-sun"></span>
              <span className="text-slate-700 dark:text-slate-300 font-semibold">Selected</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-md bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600"></span>
              <span className="text-slate-600 dark:text-slate-400">Available</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-md bg-slate-300 dark:bg-slate-700 cursor-not-allowed"></span>
              <span className="text-slate-400">Occupied</span>
            </div>
          </div>

          <div className="text-brand-600 dark:text-brand-400 font-bold">
            Select {requiredSeatsCount} seat{requiredSeatsCount > 1 ? 's' : ''} ({selectedSeats.length}/{requiredSeatsCount} chosen)
          </div>
        </div>

        {/* Airplane Cabin Scrollable Area */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col items-center">
          {/* Plane Cockpit Shape */}
          <div className="w-48 h-14 bg-gradient-to-t from-slate-200 to-slate-100 dark:from-slate-800 dark:to-slate-800/40 rounded-t-full flex items-center justify-center border-t-2 border-x-2 border-slate-300 dark:border-slate-700 mb-4 shadow-sm">
            <Plane className="w-5 h-5 text-slate-400" />
          </div>

          {/* Seat Grid */}
          <div className="w-full max-w-sm space-y-2 bg-slate-50 dark:bg-slate-950/60 p-4 rounded-3xl border border-slate-200 dark:border-slate-800">
            {rows.map(({ row, type, price }) => {
              const leftSeats = ['A', 'B', 'C'].map(col => `${row}${col}`);
              const rightSeats = ['D', 'E', 'F'].map(col => `${row}${col}`);

              return (
                <div key={row} className="flex items-center justify-between gap-2">
                  {/* Left Column (A, B, C) */}
                  <div className="flex gap-1.5">
                    {leftSeats.map(sId => {
                      const isOccupied = occupiedSeats.includes(sId);
                      const isSelected = selectedSeats.includes(sId);
                      return (
                        <button
                          key={sId}
                          type="button"
                          disabled={isOccupied}
                          onClick={() => toggleSeat(sId)}
                          className={`w-9 h-9 rounded-xl font-mono text-xs font-bold transition-all flex items-center justify-center ${
                            isSelected
                              ? 'bg-sun text-slate-950 ring-2 ring-sun/50 scale-105 shadow-md font-extrabold'
                              : isOccupied
                              ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed opacity-60'
                              : type === 'business'
                              ? 'bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-300 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100'
                              : type === 'legroom'
                              ? 'bg-teal-50 dark:bg-teal-950/60 border border-teal-300 text-teal-700 dark:text-teal-300 hover:bg-teal-100'
                              : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-brand-500'
                          }`}
                          title={isOccupied ? 'Occupied' : `${sId} - ${type} (${price > 0 ? '+' + formatMoney(price) : 'Free'})`}
                        >
                          {isSelected ? <Check className="w-4 h-4 stroke-[3]" /> : sId.slice(-1)}
                        </button>
                      );
                    })}
                  </div>

                  {/* Aisle Row Number */}
                  <div className="w-8 text-center text-[11px] font-mono font-bold text-slate-400">
                    {row}
                  </div>

                  {/* Right Column (D, E, F) */}
                  <div className="flex gap-1.5">
                    {rightSeats.map(sId => {
                      const isOccupied = occupiedSeats.includes(sId);
                      const isSelected = selectedSeats.includes(sId);
                      return (
                        <button
                          key={sId}
                          type="button"
                          disabled={isOccupied}
                          onClick={() => toggleSeat(sId)}
                          className={`w-9 h-9 rounded-xl font-mono text-xs font-bold transition-all flex items-center justify-center ${
                            isSelected
                              ? 'bg-sun text-slate-950 ring-2 ring-sun/50 scale-105 shadow-md font-extrabold'
                              : isOccupied
                              ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed opacity-60'
                              : type === 'business'
                              ? 'bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-300 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100'
                              : type === 'legroom'
                              ? 'bg-teal-50 dark:bg-teal-950/60 border border-teal-300 text-teal-700 dark:text-teal-300 hover:bg-teal-100'
                              : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-brand-500'
                          }`}
                          title={isOccupied ? 'Occupied' : `${sId} - ${type} (${price > 0 ? '+' + formatMoney(price) : 'Free'})`}
                        >
                          {isSelected ? <Check className="w-4 h-4 stroke-[3]" /> : sId.slice(-1)}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-5 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="text-xs text-slate-500 font-medium">
              Chosen: <span className="font-bold font-mono text-slate-900 dark:text-white">{selectedSeats.join(', ') || 'None'}</span>
              {seatUpgradeCost > 0 && (
                <span className="text-brand-600 dark:text-brand-400 ml-2 font-semibold">
                  (+{formatMoney(seatUpgradeCost)} seat upgrade)
                </span>
              )}
            </div>
            <div className="font-display font-extrabold text-2xl text-slate-900 dark:text-white">
              {formatMoney(totalCost)}
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => setSeatSelectorItem(null)}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleProceed}
              disabled={selectedSeats.length === 0}
              className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 disabled:opacity-50 text-white font-extrabold text-xs shadow-lg shadow-brand-500/25 transition-all hover:-translate-y-0.5"
            >
              Confirm & Book Flight
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

