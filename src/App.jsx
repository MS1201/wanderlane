import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import HeroSearch from './components/HeroSearch';
import PackagesView from './components/PackagesView';
import FlightsView from './components/FlightsView';
import StaysView from './components/StaysView';
import TripsView from './components/TripsView';
import WishlistView from './components/WishlistView';
import ProfileView from './components/ProfileView';
import PackageDetailModal from './components/PackageDetailModal';
import SeatSelectorModal from './components/SeatSelectorModal';
import BookingCheckoutModal from './components/BookingCheckoutModal';
import TicketModal from './components/TicketModal';
import AuthModal from './components/AuthModal';
import Toast from './components/Toast';
import Footer from './components/Footer';
import { ShieldCheck, Tag, Clock, Sparkles } from 'lucide-react';

function MainContent() {
  const { activeView, activeTab } = useApp();

  // Search parameters shared across search and views
  const [packageQuery, setPackageQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [flightParams, setFlightParams] = useState({
    from: 'Mumbai',
    to: 'Goa',
    date: '2026-11-20',
    pax: 1,
    cabin: 'Economy'
  });
  const [stayParams, setStayParams] = useState({
    city: 'Goa',
    checkIn: '2026-11-12',
    checkOut: '2026-11-15',
    guests: 2,
    rooms: 1
  });

  const handleSearchSubmit = (searchData) => {
    if (searchData.tab === 'packages') {
      setPackageQuery(searchData.pkg.q);
    } else if (searchData.tab === 'flights') {
      setFlightParams(searchData.fl);
    } else if (searchData.tab === 'stays') {
      setStayParams(searchData.st);
    }
  };

  return (
    <div className="min-h-screen flex flex-col transition-colors">
      <Navbar />

      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        {activeView === 'explore' && (
          <div>
            <HeroSearch
              onSearchSubmit={handleSearchSubmit}
              packageQuery={packageQuery}
              setPackageQuery={setPackageQuery}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />

            {/* Results Section */}
            <div id="results-section" className="scroll-mt-24 pt-10">
              {activeTab === 'packages' && (
                <PackagesView
                  searchQuery={packageQuery}
                  categoryFilter={selectedCategory}
                  setCategoryFilter={setSelectedCategory}
                />
              )}

              {activeTab === 'flights' && (
                <FlightsView flightParams={flightParams} />
              )}

              {activeTab === 'stays' && (
                <StaysView stayParams={stayParams} />
              )}
            </div>

            {/* Features Highlight */}
            <section className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400 flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-display font-extrabold text-base text-slate-900 dark:text-white">
                    100% Flexible Cancellation
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    Full refund up to 7 days before departure, half refund up to 48 hours prior. Zero cancellation penalty.
                  </p>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400 flex items-center justify-center flex-shrink-0">
                  <Tag className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-display font-extrabold text-base text-slate-900 dark:text-white">
                    Wanderlane Club Tiers
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    Silver, Gold and Platinum members unlock 2% to 7% automatic discounts on every single flight and package.
                  </p>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-teal-50 text-brand-600 dark:bg-teal-950/60 dark:text-teal-300 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-display font-extrabold text-base text-slate-900 dark:text-white">
                    Instant E-Ticket Generation
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    Receive your confirmed booking reference code and downloadable boarding ticket the moment your payment processes.
                  </p>
                </div>
              </div>
            </section>
          </div>
        )}

        {activeView === 'trips' && <TripsView />}
        {activeView === 'wishlist' && <WishlistView />}
        {activeView === 'profile' && <ProfileView />}
      </div>

      <Footer />

      {/* Global Modals */}
      <PackageDetailModal />
      <SeatSelectorModal />
      <BookingCheckoutModal />
      <TicketModal />
      <AuthModal />
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}

