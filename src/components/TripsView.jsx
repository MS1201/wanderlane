import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Luggage,
  Calendar,
  Users,
  Printer,
  XCircle,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Plane,
  Building,
  Compass
} from 'lucide-react';

export default function TripsView() {
  const { trips, formatMoney, cancelBooking, setTicketModalItem, setActiveView } = useApp();

  const [filter, setFilter] = useState('all'); // 'all', 'confirmed', 'cancelled'
  const [cancelModalRef, setCancelModalRef] = useState(null);

  const filteredTrips = trips.filter(t => {
    if (filter === 'all') return true;
    return t.status === filter;
  });

  const getTripIcon = (kind) => {
    if (kind === 'flight') return <Plane className="w-4 h-4 text-brand-500" />;
    if (kind === 'stay') return <Building className="w-4 h-4 text-brand-500" />;
    return <Compass className="w-4 h-4 text-brand-500" />;
  };

  const tripToCancel = trips.find(t => t.ref === cancelModalRef);

  return (
    <div className="max-w-5xl mx-auto py-6 space-y-6">
      {/* Header & Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display font-extrabold text-2xl text-slate-900 dark:text-white">
            My Travel Vault
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Access and manage all your confirmed flight tickets, hotel vouchers, and itineraries
          </p>
        </div>

        <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl text-xs font-bold">
          <button
            onClick={() => setFilter('all')}
            className={`px-3.5 py-1.5 rounded-xl transition-all ${
              filter === 'all'
                ? 'bg-white dark:bg-slate-700 text-brand-600 dark:text-brand-300 shadow-sm'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            All Bookings ({trips.length})
          </button>
          <button
            onClick={() => setFilter('confirmed')}
            className={`px-3.5 py-1.5 rounded-xl transition-all ${
              filter === 'confirmed'
                ? 'bg-white dark:bg-slate-700 text-brand-600 dark:text-brand-300 shadow-sm'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Confirmed ({trips.filter(t => t.status === 'confirmed').length})
          </button>
          <button
            onClick={() => setFilter('cancelled')}
            className={`px-3.5 py-1.5 rounded-xl transition-all ${
              filter === 'cancelled'
                ? 'bg-white dark:bg-slate-700 text-brand-600 dark:text-brand-300 shadow-sm'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Cancelled ({trips.filter(t => t.status === 'cancelled').length})
          </button>
        </div>
      </div>

      {/* Trips List */}
      {filteredTrips.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-brand-50 dark:bg-brand-950/60 text-brand-500 flex items-center justify-center mx-auto mb-4">
            <Luggage className="w-8 h-8" />
          </div>
          <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
            No bookings found
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-6">
            You don't have any reservations in this section yet. Explore our packages or search flights to get started!
          </p>
          <button
            onClick={() => setActiveView('explore')}
            className="px-5 py-2.5 rounded-xl bg-sun hover:bg-sun-dark text-slate-950 font-extrabold text-xs shadow-md shadow-sun/20 transition-all inline-flex items-center gap-1.5"
          >
            Explore Destinations
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredTrips.map((trip) => {
            const isConfirmed = trip.status === 'confirmed';
            return (
              <div
                key={trip.ref}
                className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                {/* Trip Thumbnail & Details */}
                <div className="flex items-start gap-4">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 flex-shrink-0">
                    <img
                      src={trip.image || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=400&q=80'}
                      alt={trip.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div>
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                          isConfirmed
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                            : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                        }`}
                      >
                        {trip.status}
                      </span>
                      <span className="font-mono text-xs font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-lg">
                        {trip.ref}
                      </span>
                      <span className="text-xs text-slate-400 capitalize flex items-center gap-1 font-medium">
                        {getTripIcon(trip.kind)}
                        {trip.kind}
                      </span>
                    </div>

                    <h4 className="font-display font-extrabold text-base sm:text-lg text-slate-900 dark:text-white">
                      {trip.title}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{trip.sub}</p>

                    <div className="mt-3 flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 font-medium">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-brand-500" />
                        {trip.date} {trip.end && trip.kind !== 'flight' ? `to ${trip.end}` : ''}
                      </div>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-brand-500" />
                        {trip.qty} {trip.kind === 'stay' ? 'guest' : 'traveller'}{trip.qty > 1 ? 's' : ''}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Amount & Actions */}
                <div className="flex sm:flex-col items-center sm:items-end justify-between border-t sm:border-t-0 pt-4 sm:pt-0 border-slate-100 dark:border-slate-800 gap-3">
                  <div className="text-left sm:text-right">
                    <div className="font-display font-extrabold text-2xl text-slate-900 dark:text-white">
                      {formatMoney(trip.total)}
                    </div>
                    <div className="text-[11px] text-slate-400">Paid via {trip.pay}</div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setTicketModalItem(trip)}
                      className="px-4 py-2 rounded-xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-300 hover:bg-brand-500 hover:text-white font-bold text-xs transition-colors flex items-center gap-1.5 shadow-sm"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      View Voucher
                    </button>

                    {isConfirmed && (
                      <button
                        onClick={() => setCancelModalRef(trip.ref)}
                        className="px-3 py-2 rounded-xl border border-rose-200 dark:border-rose-900/60 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-xs font-bold transition-colors"
                        title="Cancel reservation"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Cancellation Confirmation Dialog */}
      {cancelModalRef && tripToCancel && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 max-w-md w-full border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4 text-center">
            <div className="w-14 h-14 rounded-full bg-rose-50 dark:bg-rose-950 text-rose-500 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-7 h-7" />
            </div>

            <div>
              <h3 className="font-display font-extrabold text-lg text-slate-900 dark:text-white">
                Cancel Booking {tripToCancel.ref}?
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                Are you sure you want to cancel your reservation for{' '}
                <span className="font-bold text-slate-700 dark:text-slate-200">{tripToCancel.title}</span>?
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 text-xs text-slate-600 dark:text-slate-300 text-left space-y-1">
              <div className="flex justify-between">
                <span>Original Fare:</span>
                <span className="font-bold">{formatMoney(tripToCancel.total)}</span>
              </div>
              <div className="flex justify-between text-emerald-600 font-bold">
                <span>Eligible Refund:</span>
                <span>{formatMoney(tripToCancel.total)} (100% Policy)</span>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setCancelModalRef(null)}
                className="flex-1 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 font-bold text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                Keep Booking
              </button>
              <button
                onClick={() => {
                  cancelBooking(tripToCancel.ref);
                  setCancelModalRef(null);
                }}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs shadow-md shadow-rose-600/25 transition-all"
              >
                Yes, Cancel Trip
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

