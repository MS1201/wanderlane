# ✈️ Wanderlane — Premium Travel Booking Platform

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/MS1201/wanderlane)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

A modern, responsive, and functional travel booking web application crafted with **React 18**, **Tailwind CSS**, and **Vite**. Features curated holiday packages, real-time domestic flights with an interactive airplane seat selector, boutique luxury stays, member loyalty discounts, multi-step checkout with simulated payments, and printable digital boarding passes / e-tickets.

---

## 🌟 Key Features

### 🏖️ Curated Holiday Itineraries
- **Destinations**: Goa, Manali, Kerala Backwaters, Jaipur Havelis, Udaipur Lake Palaces, Ladakh High Passes, Bali, Dubai, Singapore, Maldives, Andaman, and Kyoto.
- **Rich Photo Galleries**: High-resolution destination photography for every journey.
- **Day-by-Day Interactive Itinerary**: Detailed daily schedules with activity badges and descriptions.
- **Inclusions & Exclusions**: Clear breakdowns of complimentary meals, private 4WD transfers, licensed guides, and park entries.
- **Filter & Search**: Instant filter by style (Beach, Mountain, Heritage, Nature, City), region (Domestic vs. International), budget slider, and sorting.

### ✈️ Real-Time Flights & Interactive Seat Selection
- **Hub-to-Hub Flights**: Search flights across 10 major Indian hubs (Mumbai, Delhi, Bengaluru, Chennai, Kolkata, Goa, Jaipur, Hyderabad, Kochi, Udaipur).
- **Cabin Classes**: Economy, Premium Economy, and Business Class.
- **Interactive Aircraft Seat Map**: Choose your exact seat (Window, Aisle, Extra Legroom exit rows) on a 3x3 cabin configuration with live seat badges.

### 🏨 Handpicked Stays & Resorts
- **Luxury Options**: Palaces, beach villas, forest retreats, and boutique heritage havelis.
- **Live Calculations**: Total rates automatically computed from check-in/out dates, nights count, and room counts.
- **Amenities Filter**: Infinity pools, private beach access, Ayurveda spa, free gourmet breakfasts.

### 💳 3-Step Checkout & Payment Simulation
- **Step 1**: Passenger credentials (lead traveller + companions) and optional Travel Shield Insurance.
- **Step 2**: Payment gateway simulation:
  - **Credit / Debit Card** with live interactive card preview + "Fill Test Card" button.
  - **UPI / QR Code** generator to scan with any UPI app.
  - **Net Banking** with top Indian banks.
  - **Promo Codes**: `WANDER10` (10% off), `FIRST500` (₹500 off), `EXPLORE20` (20% off) with celebration confetti.
- **Step 3**: Instant booking confirmation with unique booking reference (e.g., `WL-78214`).

### 🎟️ Boarding Passes & E-Tickets
- Realistic printable/downloadable boarding voucher with tear-off barcode, QR code, passenger roster, seat assignments, and refund policy.
- Full cancellation & refund policy logic (100% refund > 7 days, 50% 2-7 days).

### 👑 Wanderlane Loyalty Club & Privileges
- Tier system: **Explorer** (0%), **Silver** (2% off), **Gold** (5% off), **Platinum** (7% off).
- Points accumulation (1 point per ₹100 spent) with visual progress bar towards next tier.
- 1-Click demo account switcher (User 1 - Gold, User 2 - Silver, User 3 - Explorer).

### 🌍 Multi-Currency & Dark Mode
- Live currency switcher: **INR (₹)**, **USD ($)**, **EUR (€)**, **GBP (£)**, **AED**.
- Seamless Dark & Light theme with glassmorphism header and Tailwind transitions.

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js (v18+ or v20+)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/MS1201/wanderlane.git
cd wanderlane

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173` in your browser.

### Production Build
```bash
npm run build
npm run preview
```

---

## 🌐 Deploy to Render

Deploying to [Render](https://render.com) is automated via the included `render.yaml` blueprint:

1. Push your code to GitHub.
2. Go to [Render Dashboard](https://dashboard.render.com/) → **New** → **Blueprint**.
3. Connect your `wanderlane` repository.
4. Render will automatically detect `render.yaml`, run `npm install && npm run build`, and publish `./dist` as a global Static Site!

Or click the badge above:
[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/MS1201/wanderlane)

---

## 📁 Project Architecture

```
wanderlane/
├── .github/
│   └── workflows/
│       └── deploy.yml          # Automated GitHub Pages CI/CD
├── public/                     # Static assets & favicons
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Glassmorphic header, currency & theme switch
│   │   ├── HeroSearch.jsx      # Tabbed search engine (Packages, Flights, Stays)
│   │   ├── PackagesView.jsx    # Package grid & filter sidebar
│   │   ├── FlightsView.jsx     # Flight listings, cabins & durations
│   │   ├── SeatSelectorModal.jsx # Aircraft cabin seat selector
│   │   ├── StaysView.jsx       # Hotels & boutique stays
│   │   ├── PackageDetailModal.jsx # Itinerary accordion & photo gallery
│   │   ├── BookingCheckoutModal.jsx # Multi-step checkout & payment
│   │   ├── TicketModal.jsx     # Printable boarding pass & e-ticket
│   │   ├── TripsView.jsx       # My Bookings vault & cancellation
│   │   ├── WishlistView.jsx    # Saved items & quick book
│   │   ├── ProfileView.jsx     # Membership perks & rewards progress
│   │   ├── AuthModal.jsx       # Sign In / Sign Up & Demo switcher
│   │   ├── Toast.jsx           # Toast notification system
│   │   └── Footer.jsx          # Guarantee, links & copyright
│   ├── context/
│   │   └── AppContext.jsx      # Global state, persistence & calculations
│   ├── data/
│   │   └── travelData.js       # Curated packages, stays, airlines & users
│   ├── App.jsx                 # Main application controller
│   ├── index.css               # Tailwind CSS & custom utilities
│   └── main.jsx                # React root mount
├── render.yaml                 # Render.com static site blueprint
├── tailwind.config.js          # Custom theme colors & typography
├── vite.config.js              # Vite configuration
└── package.json
```

---

## 📄 License
MIT License. Crafted for travellers and developers alike.

