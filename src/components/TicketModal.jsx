import React from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Printer,
  Download,
  Calendar,
  User,
  CreditCard,
  CheckCircle2,
  Plane,
  Building,
  Compass,
  QrCode
} from 'lucide-react';

export default function TicketModal() {
  const { ticketModalItem, setTicketModalItem, formatMoney } = useApp();

  if (!ticketModalItem) return null;

  const t = ticketModalItem;

  // Fake barcode SVG generator
  const renderBarcode = () => {
    const bars = [];
    let x = 0;
    for (let i = 0; i < 48; i++) {
      const w = ((i * 7 + 3) % 4) + 1;
      bars.push(
        <rect
          key={i}
          x={x}
          y="0"
          width={w}
          height="36"
          className="fill-slate-900 dark:fill-slate-100"
        />
      );
      x += w + ((i % 3) + 1);
    }
    return (
      <svg viewBox="0 0 220 36" className="w-52 h-9" aria-hidden="true">
        {bars}
      </svg>
    );
  };

  const handlePrint = () => {
    window.print();
  };

  const kindLabel = {
    package: 'Holiday Package Voucher',
    flight: 'Flight Boarding Pass',
    stay: 'Hotel Check-In Voucher'
  }[t.kind] || 'Booking Confirmation';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in print:p-0 print:bg-white">
      <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col print:border-none print:shadow-none">
        {/* Header Bar */}
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            <h3 className="font-display font-extrabold text-base text-slate-900 dark:text-white">
              Official Travel Voucher
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5 text-xs font-bold"
              title="Print E-Ticket"
            >
              <Printer className="w-4 h-4" />
              Print
            </button>
            <button
              onClick={() => setTicketModalItem(null)}
              className="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Boarding Pass Body */}
        <div className="p-6">
          <div className="rounded-3xl overflow-hidden border-2 border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-850">
            {/* Ticket Header */}
            <div className="bg-gradient-to-r from-brand-700 via-brand-600 to-teal-600 text-white p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-teal-200">
                  {kindLabel}
                </span>
                <h4 className="font-display font-extrabold text-2xl text-white mt-1">
                  {t.title}
                </h4>
                <p className="text-xs text-teal-100/90 mt-0.5">{t.sub}</p>
              </div>

              <div className="text-left sm:text-right bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/20 self-start sm:self-auto">
                <div className="text-[10px] font-bold uppercase tracking-wider text-teal-200">
                  Booking Reference
                </div>
                <div className="font-mono font-extrabold text-xl text-sun drop-shadow-sm tracking-wider">
                  {t.ref}
                </div>
              </div>
            </div>

            {/* Ticket Details Grid */}
            <div className="p-6 grid grid-cols-2 sm:grid-cols-3 gap-5 text-xs">
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">
                  {t.kind === 'stay' ? 'Check In Date' : 'Departure Date'}
                </span>
                <span className="font-bold text-slate-900 dark:text-white font-mono text-sm">
                  {t.date}
                </span>
              </div>

              {t.end && t.kind !== 'flight' && (
                <div>
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">
                    {t.kind === 'stay' ? 'Check Out Date' : 'Return Date'}
                  </span>
                  <span className="font-bold text-slate-900 dark:text-white font-mono text-sm">
                    {t.end}
                  </span>
                </div>
              )}

              <div>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">
                  Lead Passenger
                </span>
                <span className="font-bold text-slate-900 dark:text-white">
                  {t.trav && t.trav.length > 0 ? t.trav[0] : 'Lead Traveller'}
                </span>
              </div>

              <div>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">
                  Party Size
                </span>
                <span className="font-bold text-slate-900 dark:text-white">
                  {t.qty} {t.kind === 'stay' ? 'Guest' : 'Traveller'}{t.qty > 1 ? 's' : ''}
                </span>
              </div>

              {t.seats && t.seats.length > 0 && (
                <div>
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">
                    Seat Number(s)
                  </span>
                  <span className="font-mono font-bold text-brand-600 dark:text-brand-400 text-sm">
                    {t.seats.join(', ')}
                  </span>
                </div>
              )}

              <div>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">
                  Amount Paid
                </span>
                <span className="font-mono font-extrabold text-slate-900 dark:text-white text-sm">
                  {formatMoney(t.total)}
                </span>
              </div>

              <div>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">
                  Payment Method
                </span>
                <span className="font-bold text-slate-900 dark:text-white">
                  {t.pay || 'Credit Card'}
                </span>
              </div>

              <div>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">
                  Status
                </span>
                <span
                  className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-extrabold uppercase ${
                    t.status === 'confirmed'
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                      : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                  }`}
                >
                  {t.status}
                </span>
              </div>
            </div>

            {/* Barcode & Check-in instructions */}
            <div className="px-6 py-4 bg-slate-100 dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>{renderBarcode()}</div>
              <div className="text-[11px] text-slate-400 text-center sm:text-right font-medium">
                Show this barcode or reference ID at airport/hotel check-in desk
              </div>
            </div>
          </div>

          {/* Cancellation notice */}
          <div className="mt-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 text-xs text-slate-500">
            <div className="font-bold text-slate-700 dark:text-slate-300 mb-1">
              Cancellation & Refund Policy
            </div>
            {t.status === 'cancelled' ? (
              <p className="text-rose-500">
                This reservation is cancelled. A refund of {formatMoney(t.refundAmount || 0)} has been processed to your payment method (ETA 3-5 business days).
              </p>
            ) : (
              <p>
                Full 100% refund available up to 7 days before departure. 50% refund between 2 and 7 days. Changes can be made anytime from your Trips dashboard.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

