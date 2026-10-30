import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PROMOS } from '../data/travelData';
import confetti from 'canvas-confetti';
import {
  X,
  CreditCard,
  QrCode,
  Building,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ChevronLeft,
  Tag,
  Lock,
  Gift
} from 'lucide-react';

export default function BookingCheckoutModal() {
  const {
    checkoutItem,
    setCheckoutItem,
    user,
    getUserTier,
    formatMoney,
    completeBooking,
    setTicketModalItem
  } = useApp();

  if (!checkoutItem) return null;

  const item = checkoutItem;
  const userTier = getUserTier();
  const passengerCount = item.qty || 1;

  // Step 1: Travellers
  const [step, setStep] = useState(1); // 1 = Details, 2 = Payment, 3 = Confirmed
  const [leadName, setLeadName] = useState(user?.name || 'Aarav Sharma');
  const [email, setEmail] = useState(user?.email || 'user1@wanderlane.demo');
  const [phone, setPhone] = useState(user?.phone || '+91 98200 11001');
  const [otherTravellers, setOtherTravellers] = useState(() => {
    const arr = [];
    for (let i = 1; i < passengerCount; i++) {
      arr.push(`Traveller ${i + 1}`);
    }
    return arr;
  });
  const [hasInsurance, setHasInsurance] = useState(true);

  // Step 2: Payment
  const [payMethod, setPayMethod] = useState('card'); // 'card', 'upi', 'net'
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExp, setCardExp] = useState('12/28');
  const [cardCvv, setCardCvv] = useState('883');
  const [cardName, setCardName] = useState(leadName.toUpperCase());
  const [upiId, setUpiId] = useState('aarav@okaxis');
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');

  // Promo code
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [promoError, setPromoError] = useState('');

  // Processing state
  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmedTrip, setConfirmedTrip] = useState(null);
  const [formError, setFormError] = useState('');

  // Calculations
  const insuranceCost = hasInsurance ? passengerCount * 299 : 0;
  const baseCost = item.base;
  const memberDiscount = Math.round(baseCost * userTier.off);

  // Promo discount calculation
  let promoDiscount = 0;
  if (appliedPromo) {
    if (appliedPromo.pct) {
      promoDiscount = Math.round(baseCost * appliedPromo.pct);
    } else if (appliedPromo.flat) {
      promoDiscount = Math.min(baseCost, appliedPromo.flat);
    }
  }

  const taxable = baseCost - memberDiscount - promoDiscount + insuranceCost;
  const tax = Math.round(taxable * 0.05);
  const total = taxable + tax;

  const handleApplyPromo = () => {
    setPromoError('');
    const code = promoCode.trim().toUpperCase();
    if (!code) {
      setAppliedPromo(null);
      return;
    }
    if (PROMOS[code]) {
      setAppliedPromo(PROMOS[code]);
      try {
        confetti({ particleCount: 40, spread: 50, origin: { y: 0.7 } });
      } catch (e) {}
    } else {
      setAppliedPromo(null);
      setPromoError('Invalid promo code. Try WANDER10 or FIRST500.');
    }
  };

  const fillTestCard = () => {
    setCardNumber('4242 4242 4242 4242');
    setCardExp('12/29');
    setCardCvv('789');
    setCardName(leadName.toUpperCase() || 'AARAV SHARMA');
  };

  const handleNextStep = () => {
    setFormError('');
    if (!leadName.trim() || leadName.trim().length < 2) {
      setFormError('Please enter the lead traveller full name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setFormError('Please enter a valid email address.');
      return;
    }
    if (!phone.trim() || phone.replace(/\D/g, '').length < 10) {
      setFormError('Please enter a valid 10-digit mobile number.');
      return;
    }
    setStep(2);
  };

  const handlePayNow = () => {
    setFormError('');
    setIsProcessing(true);

    setTimeout(() => {
      const allTravellers = [leadName, ...otherTravellers];
      const tripResult = completeBooking({
        kind: item.kind,
        title: item.title,
        sub: item.sub,
        date: item.date,
        end: item.end,
        trav: allTravellers,
        qty: passengerCount,
        base: baseCost,
        memberDiscount,
        promoDiscount,
        tax,
        total,
        image: item.image,
        seats: item.seats || [],
        pay:
          payMethod === 'card'
            ? `Card ending ${cardNumber.replace(/\D/g, '').slice(-4) || '4242'}`
            : payMethod === 'upi'
            ? `UPI (${upiId})`
            : `${selectedBank} NetBanking`
      });

      setConfirmedTrip(tripResult);
      setIsProcessing(false);
      setStep(3);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col max-h-[92vh]">
        {/* Header with Stepper */}
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between">
          <div>
            <div className="text-[10px] font-extrabold uppercase tracking-widest text-brand-500">
              Checkout & Confirmation
            </div>
            <h3 className="font-display font-extrabold text-lg text-slate-900 dark:text-white">
              {item.title}
            </h3>
          </div>

          {step < 3 && (
            <button
              onClick={() => setCheckoutItem(null)}
              className="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Progress Bar */}
        <div className="px-6 py-2.5 bg-slate-100/50 dark:bg-slate-850 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2">
          <div className="flex-1 flex items-center gap-2">
            <span
              className={`w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center ${
                step >= 1 ? 'bg-brand-500 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-500'
              }`}
            >
              1
            </span>
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Traveller Details</span>
          </div>
          <div className="w-6 h-0.5 bg-slate-200 dark:bg-slate-700"></div>
          <div className="flex-1 flex items-center gap-2">
            <span
              className={`w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center ${
                step >= 2 ? 'bg-brand-500 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-500'
              }`}
            >
              2
            </span>
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Secure Payment</span>
          </div>
          <div className="w-6 h-0.5 bg-slate-200 dark:bg-slate-700"></div>
          <div className="flex-1 flex items-center gap-2">
            <span
              className={`w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center ${
                step >= 3 ? 'bg-emerald-500 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-500'
              }`}
            >
              3
            </span>
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Instant Voucher</span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {formError && (
            <div className="mb-4 p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 text-xs font-semibold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-500"></span>
              {formError}
            </div>
          )}

          {/* STEP 1: TRAVELLER DETAILS */}
          {step === 1 && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-span-7 space-y-4">
                <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white">
                  Lead Traveller (Passport / Govt ID)
                </h4>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Full Legal Name
                  </label>
                  <input
                    type="text"
                    value={leadName}
                    onChange={(e) => setLeadName(e.target.value)}
                    placeholder="e.g. Aarav Sharma"
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                      Email for E-Ticket
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
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
                      placeholder="+91 98200 11001"
                      className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold"
                    />
                  </div>
                </div>

                {/* Additional travellers if > 1 */}
                {otherTravellers.length > 0 && (
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-3">
                    <h5 className="font-display font-bold text-xs text-slate-700 dark:text-slate-300">
                      Accompanying Passengers
                    </h5>
                    {otherTravellers.map((trav, i) => (
                      <div key={i}>
                        <label className="block text-[10px] font-bold text-slate-400 mb-1">
                          Passenger {i + 2} Name
                        </label>
                        <input
                          type="text"
                          value={trav}
                          onChange={(e) => {
                            const updated = [...otherTravellers];
                            updated[i] = e.target.value;
                            setOtherTravellers(updated);
                          }}
                          className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold"
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* Travel Insurance Addon */}
                <div className="pt-2">
                  <div
                    onClick={() => setHasInsurance(!hasInsurance)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                      hasInsurance
                        ? 'bg-emerald-50/60 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800'
                        : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 flex items-center justify-center font-bold">
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-1.5">
                          Comprehensive Travel Shield
                          <span className="text-[10px] text-emerald-600 font-extrabold uppercase">
                            Recommended
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">
                          Emergency medical, lost baggage up to ₹50,000 & trip delay compensation
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="font-bold text-xs text-slate-900 dark:text-white">
                        {formatMoney(passengerCount * 299)}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {hasInsurance ? 'Covered ✓' : '+ Add'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Price Sidebar Summary */}
              <div className="md:col-span-5 bg-slate-50 dark:bg-slate-800/80 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 space-y-4 self-start">
                <div className="font-display font-extrabold text-sm text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-700 pb-2">
                  Booking Summary
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between text-slate-600 dark:text-slate-400">
                    <span>{item.unitLabel || 'Base Fare'}</span>
                    <span className="font-mono font-bold text-slate-900 dark:text-white">
                      {formatMoney(baseCost)}
                    </span>
                  </div>

                  {memberDiscount > 0 && (
                    <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-semibold">
                      <span>{userTier.name} Member Saving</span>
                      <span className="font-mono font-bold">− {formatMoney(memberDiscount)}</span>
                    </div>
                  )}

                  {hasInsurance && (
                    <div className="flex justify-between text-slate-600 dark:text-slate-400">
                      <span>Travel Shield Protection</span>
                      <span className="font-mono">{formatMoney(insuranceCost)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-slate-500">
                    <span>Taxes & Airport Surcharges (5%)</span>
                    <span className="font-mono">{formatMoney(tax)}</span>
                  </div>

                  <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex justify-between items-baseline font-bold">
                    <span className="text-slate-900 dark:text-white">Estimated Total</span>
                    <span className="font-display font-extrabold text-xl text-slate-900 dark:text-white">
                      {formatMoney(total)}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleNextStep}
                  className="w-full py-3 px-4 rounded-xl bg-sun hover:bg-sun-dark text-slate-950 font-extrabold text-xs shadow-md shadow-sun/20 transition-all flex items-center justify-center gap-1.5 hover:-translate-y-0.5"
                >
                  Proceed to Payment
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: PAYMENT METHOD */}
          {step === 2 && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-span-7 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white">
                    Choose Payment Gateway
                  </h4>
                  <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-bold">
                    <Lock className="w-3 h-3" />
                    256-bit Encrypted
                  </div>
                </div>

                {/* Tabs for Card, UPI, Netbanking */}
                <div className="grid grid-cols-3 gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl text-xs font-bold">
                  <button
                    onClick={() => setPayMethod('card')}
                    className={`py-2 rounded-xl flex items-center justify-center gap-1.5 transition-all ${
                      payMethod === 'card'
                        ? 'bg-white dark:bg-slate-700 text-brand-600 dark:text-brand-300 shadow-sm'
                        : 'text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <CreditCard className="w-3.5 h-3.5" />
                    Card
                  </button>
                  <button
                    onClick={() => setPayMethod('upi')}
                    className={`py-2 rounded-xl flex items-center justify-center gap-1.5 transition-all ${
                      payMethod === 'upi'
                        ? 'bg-white dark:bg-slate-700 text-brand-600 dark:text-brand-300 shadow-sm'
                        : 'text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <QrCode className="w-3.5 h-3.5" />
                    UPI / QR
                  </button>
                  <button
                    onClick={() => setPayMethod('net')}
                    className={`py-2 rounded-xl flex items-center justify-center gap-1.5 transition-all ${
                      payMethod === 'net'
                        ? 'bg-white dark:bg-slate-700 text-brand-600 dark:text-brand-300 shadow-sm'
                        : 'text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <Building className="w-3.5 h-3.5" />
                    NetBanking
                  </button>
                </div>

                {/* CARD FORM */}
                {payMethod === 'card' && (
                  <div className="space-y-4">
                    {/* Visual Card Preview */}
                    <div className="rounded-2xl p-5 bg-gradient-to-tr from-slate-900 via-brand-800 to-teal-700 text-white shadow-xl relative overflow-hidden">
                      <div className="flex justify-between items-start mb-6">
                        <div className="w-10 h-8 rounded-lg bg-yellow-400/80 flex items-center justify-center">
                          <span className="w-6 h-4 border border-yellow-800/40 rounded-sm"></span>
                        </div>
                        <span className="font-mono text-xs tracking-widest text-teal-200">WANDERLANE PASS</span>
                      </div>
                      <div className="font-mono text-base sm:text-lg tracking-widest mb-4">
                        {cardNumber}
                      </div>
                      <div className="flex justify-between text-xs text-teal-100 font-mono">
                        <div>
                          <div className="text-[9px] uppercase tracking-wider text-teal-300">Cardholder</div>
                          <div className="font-bold truncate max-w-[160px]">{cardName}</div>
                        </div>
                        <div>
                          <div className="text-[9px] uppercase tracking-wider text-teal-300">Expires</div>
                          <div className="font-bold">{cardExp}</div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                          Card Number
                        </label>
                        <input
                          type="text"
                          maxLength={19}
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          placeholder="4242 4242 4242 4242"
                          className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-mono font-bold"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                            Expiry (MM/YY)
                          </label>
                          <input
                            type="text"
                            maxLength={5}
                            value={cardExp}
                            onChange={(e) => setCardExp(e.target.value)}
                            placeholder="12/28"
                            className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-mono font-bold"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                            CVV
                          </label>
                          <input
                            type="password"
                            maxLength={4}
                            value={cardCvv}
                            onChange={(e) => setCardCvv(e.target.value)}
                            placeholder="•••"
                            className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-mono font-bold"
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <button
                          type="button"
                          onClick={fillTestCard}
                          className="text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-sun" />
                          Auto-fill Test Card Details
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* UPI FORM */}
                {payMethod === 'upi' && (
                  <div className="space-y-4 text-center py-2">
                    <div className="w-44 h-44 mx-auto p-3 bg-white rounded-2xl border-2 border-dashed border-brand-500/50 shadow-md flex flex-col items-center justify-center">
                      <QrCode className="w-32 h-32 text-slate-800" />
                      <span className="text-[10px] font-bold text-slate-400 mt-1">Scan with any UPI App</span>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1">Or enter UPI ID (VPA)</label>
                      <input
                        type="text"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="yourname@okhdfcbank"
                        className="w-full max-w-xs mx-auto px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-mono font-bold text-center"
                      />
                    </div>
                  </div>
                )}

                {/* NETBANKING FORM */}
                {payMethod === 'net' && (
                  <div className="space-y-3">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Select Primary Banking Partner
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {['HDFC Bank', 'ICICI Bank', 'State Bank of India', 'Axis Bank', 'Kotak Mahindra', 'Punjab National Bank'].map(b => (
                        <button
                          key={b}
                          type="button"
                          onClick={() => setSelectedBank(b)}
                          className={`p-3 rounded-xl border text-xs font-bold text-left transition-all ${
                            selectedBank === b
                              ? 'border-brand-500 bg-brand-50 text-brand-600 dark:bg-brand-950/40 dark:text-brand-300'
                              : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
                          }`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* PROMO CODE INPUT */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-brand-500" />
                    Apply Promo or Gift Voucher
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                      placeholder="e.g. WANDER10 or FIRST500"
                      className="flex-1 px-3.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-mono font-bold uppercase"
                    />
                    <button
                      type="button"
                      onClick={handleApplyPromo}
                      className="px-4 py-2 rounded-xl bg-slate-900 text-white dark:bg-slate-700 hover:bg-brand-500 font-bold text-xs transition-colors"
                    >
                      Apply
                    </button>
                  </div>

                  {appliedPromo && (
                    <div className="mt-2 text-xs font-bold text-emerald-600 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      Promo Applied: {appliedPromo.label}
                    </div>
                  )}
                  {promoError && (
                    <div className="mt-2 text-xs font-semibold text-rose-500">{promoError}</div>
                  )}
                </div>
              </div>

              {/* Step 2 Sidebar & Pay Action */}
              <div className="md:col-span-5 bg-slate-50 dark:bg-slate-800/80 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 space-y-4 self-start">
                <div className="font-display font-extrabold text-sm text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-700 pb-2">
                  Payment Summary
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between text-slate-600 dark:text-slate-400">
                    <span>Base Amount</span>
                    <span className="font-mono font-bold text-slate-900 dark:text-white">
                      {formatMoney(baseCost)}
                    </span>
                  </div>

                  {memberDiscount > 0 && (
                    <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-semibold">
                      <span>{userTier.name} Member Discount</span>
                      <span className="font-mono font-bold">− {formatMoney(memberDiscount)}</span>
                    </div>
                  )}

                  {promoDiscount > 0 && (
                    <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-semibold">
                      <span>Promo Code Discount</span>
                      <span className="font-mono font-bold">− {formatMoney(promoDiscount)}</span>
                    </div>
                  )}

                  {hasInsurance && (
                    <div className="flex justify-between text-slate-600 dark:text-slate-400">
                      <span>Travel Protection</span>
                      <span className="font-mono">{formatMoney(insuranceCost)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-slate-500">
                    <span>GST & Platform Taxes (5%)</span>
                    <span className="font-mono">{formatMoney(tax)}</span>
                  </div>

                  <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex justify-between items-baseline font-bold">
                    <span className="text-slate-900 dark:text-white">Amount Due</span>
                    <span className="font-display font-extrabold text-2xl text-slate-900 dark:text-white">
                      {formatMoney(total)}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <button
                    type="button"
                    disabled={isProcessing}
                    onClick={handlePayNow}
                    className="w-full py-3 px-4 rounded-xl bg-sun hover:bg-sun-dark disabled:opacity-50 text-slate-950 font-extrabold text-xs shadow-lg shadow-sun/25 transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5"
                  >
                    {isProcessing ? (
                      <span className="flex items-center gap-2">
                        <div className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
                        Securing Reservation...
                      </span>
                    ) : (
                      <span>Pay {formatMoney(total)} Securely</span>
                    )}
                  </button>

                  <button
                    type="button"
                    disabled={isProcessing}
                    onClick={() => setStep(1)}
                    className="w-full py-2 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center justify-center gap-1"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    Back to Traveller Information
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: BOOKING CONFIRMED */}
          {step === 3 && confirmedTrip && (
            <div className="text-center py-6 space-y-6">
              <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-xl ring-8 ring-emerald-50 dark:ring-emerald-900/30">
                <CheckCircle2 className="w-12 h-12" />
              </div>

              <div>
                <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white">
                  Booking Confirmed!
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-md mx-auto">
                  Your reservation reference is{' '}
                  <span className="font-mono font-extrabold text-brand-600 dark:text-brand-400">
                    {confirmedTrip.ref}
                  </span>
                  . A confirmation packet has been dispatched to{' '}
                  <span className="font-semibold">{email}</span>.
                </p>
                <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300">
                  <Sparkles className="w-3.5 h-3.5 text-sun" />
                  + {Math.floor(confirmedTrip.total / 100)} Wanderlane Loyalty Points Awarded!
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                <button
                  onClick={() => {
                    setCheckoutItem(null);
                    setTicketModalItem(confirmedTrip);
                  }}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-extrabold text-xs shadow-lg shadow-brand-500/25 transition-all"
                >
                  View Digital Boarding Ticket
                </button>
                <button
                  onClick={() => setCheckoutItem(null)}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl border border-slate-300 dark:border-slate-700 font-bold text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  Return to Wanderlane
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
