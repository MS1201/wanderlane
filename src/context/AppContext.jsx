import React, { createContext, useContext, useState, useEffect } from 'react';
import { USERS, TIERS, CURRENCIES, PACKAGES, STAYS, PROMOS } from '../data/travelData';
import confetti from 'canvas-confetti';

const AppContext = createContext();

const STORAGE_PREFIX = 'wl_v2_';

function getStored(key, fallback) {
  try {
    const item = localStorage.getItem(STORAGE_PREFIX + key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    return fallback;
  }
}

function setStored(key, value) {
  try {
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
  } catch (e) {
    console.error('Storage error', e);
  }
}

export function AppProvider({ children }) {
  // Theme state
  const [theme, setTheme] = useState(() => {
    return getStored('theme', 'light');
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    setStored('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Currency
  const [currency, setCurrency] = useState(() => getStored('currency', 'INR'));
  useEffect(() => {
    setStored('currency', currency);
  }, [currency]);

  const formatMoney = (amountInINR) => {
    const curr = CURRENCIES[currency] || CURRENCIES.INR;
    const converted = amountInINR * curr.rate;
    
    // Formatting with decimals for foreign currencies, rounded for INR
    if (currency === 'INR') {
      return curr.symbol + Math.round(converted).toLocaleString('en-IN');
    }
    return curr.symbol + converted.toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 1
    });
  };

  // User & Auth
  const [user, setUser] = useState(() => {
    const sessionEmail = getStored('session_email', 'user1@wanderlane.demo');
    const allUsers = [...USERS, ...getStored('custom_users', [])];
    const found = allUsers.find(u => u.email === sessionEmail);
    return found || USERS[0];
  });

  const [authModalOpen, setAuthModalOpen] = useState(false);

  // Trips & Wishlist (scoped to current user)
  const [trips, setTrips] = useState(() => {
    const uId = user ? user.id : 1;
    const initialTrips = [
      {
        ref: 'WL-78401',
        kind: 'package',
        title: 'Kerala Emerald Waters & Tea Hills',
        sub: 'Alleppey & Munnar · 4 days',
        date: '2026-11-20',
        end: '2026-11-24',
        trav: ['User 1', 'Companion 1'],
        qty: 2,
        base: 39600,
        memberDiscount: 1980,
        promoDiscount: 0,
        tax: 1881,
        total: 39501,
        status: 'confirmed',
        created: '2026-10-15',
        image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=600&q=80',
        pay: 'Card ending 4242',
        seats: ['12A', '12B']
      },
      {
        ref: 'WL-62914',
        kind: 'flight',
        title: 'Mumbai to Goa',
        sub: 'SkyJet SJ 402 · 1h 15m · Economy',
        date: '2026-12-05',
        end: '2026-12-05',
        trav: ['User 1'],
        qty: 1,
        base: 3600,
        memberDiscount: 180,
        promoDiscount: 0,
        tax: 171,
        total: 3591,
        status: 'confirmed',
        created: '2026-10-18',
        image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=600&q=80',
        pay: 'UPI (user1@okaxis)',
        seats: ['14C']
      }
    ];
    return getStored(`trips_${uId}`, initialTrips);
  });

  const [wishlist, setWishlist] = useState(() => {
    const uId = user ? user.id : 1;
    return getStored(`wishlist_${uId}`, ['p:maldives', 'p:ladakh', 's:0']);
  });

  // Sync trips and wishlist whenever user changes
  useEffect(() => {
    if (user) {
      setStored('session_email', user.email);
      const userTrips = getStored(`trips_${user.id}`, null);
      if (userTrips) setTrips(userTrips);
      const userWish = getStored(`wishlist_${user.id}`, null);
      if (userWish) setWishlist(userWish);
    }
  }, [user]);

  // Save trips and wishlist to storage
  useEffect(() => {
    if (user) {
      setStored(`trips_${user.id}`, trips);
    }
  }, [trips, user]);

  useEffect(() => {
    if (user) {
      setStored(`wishlist_${user.id}`, wishlist);
    }
  }, [wishlist, user]);

  // Wishlist toggle
  const toggleWishlist = (id, itemName = 'Item') => {
    setWishlist(prev => {
      const exists = prev.includes(id);
      if (exists) {
        showToast(`Removed ${itemName} from wishlist`, 'info');
        return prev.filter(x => x !== id);
      } else {
        showToast(`Saved ${itemName} to wishlist!`, 'success');
        return [...prev, id];
      }
    });
  };

  // Toast notifications
  const [toasts, setToasts] = useState([]);
  const showToast = (message, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3200);
  };

  // Navigation
  const [activeView, setActiveView] = useState('explore'); // 'explore' | 'trips' | 'wishlist' | 'profile'
  const [activeTab, setActiveTab] = useState('packages'); // 'packages' | 'flights' | 'stays'

  // Modals
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [checkoutItem, setCheckoutItem] = useState(null); // items ready for checkout
  const [ticketModalItem, setTicketModalItem] = useState(null);
  const [seatSelectorItem, setSeatSelectorItem] = useState(null);

  // User loyalty calculations
  const getUserTier = () => {
    if (!user) return TIERS[0];
    let currentTier = TIERS[0];
    for (const t of TIERS) {
      if (user.points >= t.min) {
        currentTier = t;
      }
    }
    return currentTier;
  };

  // Booking completion
  const completeBooking = (bookingData) => {
    const ref = 'WL-' + Math.floor(10000 + Math.random() * 90000);
    const newTrip = {
      ...bookingData,
      ref,
      status: 'confirmed',
      created: new Date().toISOString().split('T')[0]
    };

    setTrips(prev => [newTrip, ...prev]);

    // Award loyalty points: 1 pt per ₹100 spent
    const pointsEarned = Math.floor(bookingData.total / 100);
    setUser(prev => {
      const updated = { ...prev, points: (prev.points || 0) + pointsEarned };
      setStored(`u_${prev.id}_points`, updated.points);
      return updated;
    });

    // Fire celebration confetti!
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {}

    showToast(`Booking Confirmed! Reference: ${ref}`, 'success');
    return newTrip;
  };

  // Trip Cancellation
  const cancelBooking = (ref) => {
    setTrips(prev =>
      prev.map(t => {
        if (t.ref === ref) {
          const tripDate = new Date(t.date);
          const now = new Date();
          const daysLeft = Math.round((tripDate - now) / (1000 * 60 * 60 * 24));
          let refundAmount = 0;
          if (daysLeft > 7) {
            refundAmount = t.total;
          } else if (daysLeft > 2) {
            refundAmount = Math.round(t.total * 0.5);
          }
          showToast(`Trip ${ref} cancelled. Refund of ${formatMoney(refundAmount)} initiated.`, 'info');
          return {
            ...t,
            status: 'cancelled',
            refundAmount
          };
        }
        return t;
      })
    );
  };

  // Sign out / Switch user
  const signOut = () => {
    setUser(null);
    setStored('session_email', '');
    showToast('Signed out of Wanderlane', 'info');
  };

  const signInUser = (u) => {
    setUser(u);
    setStored('session_email', u.email);
    setAuthModalOpen(false);
    showToast(`Welcome back, ${u.name}!`, 'success');
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        currency,
        setCurrency,
        formatMoney,
        user,
        setUser,
        signInUser,
        signOut,
        authModalOpen,
        setAuthModalOpen,
        trips,
        wishlist,
        toggleWishlist,
        toasts,
        showToast,
        activeView,
        setActiveView,
        activeTab,
        setActiveTab,
        selectedPackage,
        setSelectedPackage,
        checkoutItem,
        setCheckoutItem,
        ticketModalItem,
        setTicketModalItem,
        seatSelectorItem,
        setSeatSelectorItem,
        getUserTier,
        completeBooking,
        cancelBooking
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
}

