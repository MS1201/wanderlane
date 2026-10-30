export const USERS = [
  {
    id: 1,
    name: 'User 1',
    email: 'user1@wanderlane.demo',
    pass: 'demo123',
    tier: 'Gold',
    home: 'Mumbai',
    color: '#0B7A83',
    phone: '+91 98200 11001',
    points: 12400
  }
];

export const TIERS = [
  { name: 'Explorer', min: 0, off: 0, color: 'text-slate-500 bg-slate-100 dark:bg-slate-800 dark:text-slate-300' },
  { name: 'Silver', min: 2500, off: 0.02, color: 'text-amber-700 bg-amber-100 dark:bg-amber-950/60 dark:text-amber-400' },
  { name: 'Gold', min: 10000, off: 0.05, color: 'text-yellow-800 bg-yellow-100 dark:bg-yellow-950/60 dark:text-yellow-400' },
  { name: 'Platinum', min: 25000, off: 0.07, color: 'text-purple-800 bg-purple-100 dark:bg-purple-950/60 dark:text-purple-300' }
];

export const CURRENCIES = {
  INR: { symbol: '₹', rate: 1, name: 'Indian Rupee' },
  USD: { symbol: '$', rate: 0.012, name: 'US Dollar' },
  EUR: { symbol: '€', rate: 0.011, name: 'Euro' },
  GBP: { symbol: '£', rate: 0.0095, name: 'British Pound' },
  AED: { symbol: 'AED ', rate: 0.044, name: 'UAE Dirham' }
};

export const CITIES = [
  'Mumbai',
  'Delhi',
  'Bengaluru',
  'Chennai',
  'Kolkata',
  'Goa',
  'Jaipur',
  'Hyderabad',
  'Kochi',
  'Udaipur'
];

export const AIRPORT = {
  Mumbai: 'BOM',
  Delhi: 'DEL',
  Bengaluru: 'BLR',
  Chennai: 'MAA',
  Kolkata: 'CCU',
  Goa: 'GOI',
  Jaipur: 'JAI',
  Hyderabad: 'HYD',
  Kochi: 'COK',
  Udaipur: 'UDR'
};

export const AIRLINES = [
  { name: 'SkyJet', code: 'SJ', color: '#2B4BD8', logoBg: 'bg-blue-600' },
  { name: 'Aero Nova', code: 'AN', color: '#C8102E', logoBg: 'bg-red-600' },
  { name: 'Cloudline', code: 'CL', color: '#5A2A7C', logoBg: 'bg-purple-700' },
  { name: 'Zephyr Air', code: 'ZA', color: '#E8731B', logoBg: 'bg-orange-600' },
  { name: 'BlueWing', code: 'BW', color: '#1E8E5A', logoBg: 'bg-emerald-600' }
];

export const PROMOS = {
  WANDER10: { pct: 0.10, label: '10% instant discount' },
  FIRST500: { flat: 500, label: '₹500 flat off' },
  EXPLORE20: { pct: 0.20, label: '20% Mega Explorer discount' },
  SUMMER2026: { flat: 1500, label: '₹1,500 off Summer Special' }
};

export const PACKAGES = [
  {
    id: 'goa',
    name: 'Goa Sun & Coastline Serenity',
    loc: 'Goa, India',
    cat: 'beach',
    days: 4,
    nights: 3,
    price: 18500,
    rating: 4.8,
    rev: 2140,
    tag: 'Bestseller',
    intl: false,
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1000&q=80'
    ],
    blurb: 'Sun-drenched beaches in South Goa, vibrant shacks in the north, and a sunset dinner catamaran cruise along the Mandovi river.',
    hi: ['Palolem private beach resort', 'Dudhsagar waterfalls day trek', 'Sunset catamaran cruise with dining', 'Old Goa Portuguese heritage trail'],
    inc: ['4-Star beachfront resort', 'Daily gourmet breakfast & dinner', 'AC luxury airport cab transfers', 'Licensed local tour guide', 'Water sports gear entry'],
    exc: ['Personal alcoholic beverages', 'Optional scuba diving upgrade'],
    itinerary: [
      { day: 1, title: 'Arrival & North Goa Warm-up', desc: 'Private transfer from Dabolim or Mopa airport to your resort. Unwind by the infinity pool, followed by evening beach shack sunset views in Vagator.' },
      { day: 2, title: 'Dudhsagar Falls & Spice Plantation', desc: 'Morning 4x4 jeep safari through Mollem National Park to the cascading Dudhsagar waterfalls. Traditional Goan feast on a banana leaf at a fragrant spice plantation.' },
      { day: 3, title: 'South Goa Heritage & Sunset Cruise', desc: 'Explore UNESCO Basilica of Bom Jesus, vibrant Fontainhas Latin quarter, followed by a luxury sunset cruise with Goan live folk music.' },
      { day: 4, title: 'Souvenirs & Farewell', desc: 'Leisurely beachfront breakfast, artisan shopping at Anjuna flea market, and scheduled private transfer back to the airport.' }
    ]
  },
  {
    id: 'manali',
    name: 'Manali Alpine Snow Trail',
    loc: 'Himachal Pradesh, India',
    cat: 'mountain',
    days: 5,
    nights: 4,
    price: 21900,
    rating: 4.9,
    rev: 1620,
    tag: 'Snow Season',
    intl: false,
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80'
    ],
    blurb: 'Majestic Rohtang pass views, thrilling Solang Valley winter activities, and handcrafted cedar wood cottages along the rushing Beas River.',
    hi: ['Solang Valley skiing & paragliding', 'Atal Tunnel engineering marvel drive', 'Old Manali bohemian cafes', 'Private bonfire under star-lit peaks'],
    inc: ['Luxury cedar wood alpine cottage', 'Breakfast and hot gourmet dinner', 'Dedicated 4WD SUV with mountain chauffeur', 'Rohtang permits & ski equipment'],
    exc: ['Paragliding optional video capture', 'Personal winter clothing rentals'],
    itinerary: [
      { day: 1, title: 'Arrival in Kullu Valley', desc: 'Scenic pick-up and check-in to your cedar wood villa with heated floors and panoramic views of snow-draped pine forests.' },
      { day: 2, title: 'Solang Valley Adventure', desc: 'Head to Solang for skiing, tubing, and scenic ropeway gondola rides. Warm up with artisan Himalayan hot chocolate in Old Manali.' },
      { day: 3, title: 'Atal Tunnel & Sissu Lahaul', desc: 'Traverse the world’s longest highway tunnel above 10,000 ft into mystical Lahaul Valley. Marvel at frozen waterfalls in Sissu.' },
      { day: 4, title: 'Hadimba & Vashisht Hot Springs', desc: 'Morning visit to the 500-year-old Hadimba cedar forest temple, followed by a rejuvenating dip in natural sulphur hot springs.' },
      { day: 5, title: 'Himalayan Farewell', desc: 'Breakfast overlooking the river, stop by local shawl weavers, and seamless transfer to Kullu Bhuntar airport or Volvo terminal.' }
    ]
  },
  {
    id: 'kerala',
    name: 'Kerala Emerald Waters & Tea Hills',
    loc: 'Alleppey & Munnar, India',
    cat: 'forest',
    days: 4,
    nights: 3,
    price: 19800,
    rating: 4.8,
    rev: 2480,
    tag: 'Top Rated',
    intl: false,
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1000&q=80'
    ],
    blurb: 'Glide through palm-fringed canals on a private air-conditioned houseboat, trek emerald tea estates in Munnar, and relax with authentic Ayurveda.',
    hi: ['Overnight luxury private houseboat', 'Munnar rolling tea plantations', 'Live Kathakali dance theatre', 'Authentic 60-min Ayurvedic massage'],
    inc: ['Private 1-bedroom deluxe houseboat', 'All traditional meals onboard cooked by private chef', 'Dedicated AC Innova cab', 'Ayurvedic spa session voucher'],
    exc: ['Souvenir spice purchases', 'Customized ayurvedic treatments'],
    itinerary: [
      { day: 1, title: 'Cochin to Munnar Tea Country', desc: 'Pick up from Kochi airport. Drive past Cheeyappara waterfalls into misty Munnar tea hills. Check in to hillside resort.' },
      { day: 2, title: 'Tea Museum & Mattupetty Dam', desc: 'Trek the tea trails, taste freshly plucked silver needle teas, and take a speedboat ride on Mattupetty lake.' },
      { day: 3, title: 'Boarding the Alleppey Houseboat', desc: 'Arrive at Alleppey backwaters. Board your handcrafted teak houseboat with crew. Enjoy Karimeen fish curry while cruising.' },
      { day: 4, title: 'Canal Sunrise & Kochi Departure', desc: 'Watch village life awaken on the water over hot appam and stew. Check-out and transfer back to Kochi airport.' }
    ]
  },
  {
    id: 'jaipur',
    name: 'Jaipur Royal Palaces & Havelis',
    loc: 'Jaipur, Rajasthan, India',
    cat: 'heritage',
    days: 3,
    nights: 2,
    price: 14200,
    rating: 4.7,
    rev: 1890,
    tag: 'Heritage',
    intl: false,
    image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1000&q=80'
    ],
    blurb: 'Grand hill forts, geometric step wells, gemstone bazaars and an aristocratic stay at a restored 19th-century royal haveli.',
    hi: ['Amber Fort elephant corridor & Sheesh Mahal', 'Private sunset dinner at Nahargarh Fort', 'Hawa Mahal & City Palace Royal Quarters', 'Bapu Bazaar block-print artisan workshop'],
    inc: ['Heritage haveli boutique suite', 'Royal Rajasthani breakfast', 'Chauffeured sedan for 3 days', 'All monument fast-track entry tickets'],
    exc: ['Personal shopping & jewellery', 'Guide tipping'],
    itinerary: [
      { day: 1, title: 'Pink City Welcome & Hawa Mahal', desc: 'Check in to your heritage courtyard hotel. Stroll through the honeycomb windows of Hawa Mahal and Jantar Mantar observatory.' },
      { day: 2, title: 'Amber Fort & Panna Meena Stepwell', desc: 'Ascend the rugged ramparts of Amber Fort. Discover the mirror mosaic Sheesh Mahal and photography at the symmetrical stepwell.' },
      { day: 3, title: 'City Palace & Blue Pottery Souvenirs', desc: 'Visit the maharaja museum in City Palace, try your hands at traditional wooden block printing, and airport drop.' }
    ]
  },
  {
    id: 'udaipur',
    name: 'Udaipur Romantic Lake Romance',
    loc: 'Udaipur, Rajasthan, India',
    cat: 'heritage',
    days: 3,
    nights: 2,
    price: 16800,
    rating: 4.9,
    rev: 1310,
    tag: 'Romantic',
    intl: false,
    image: 'https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1585822765313-0592962fb462?auto=format&fit=crop&w=1000&q=80'
    ],
    blurb: 'Candlelit boat rides on Lake Pichola, panoramic views of the Aravalli hills, and a luxurious lake-facing palace hotel.',
    hi: ['Lake Pichola private sunset cruise', 'City Palace courtyards & crystal gallery', 'Sajjangarh Monsoon Palace sunset', 'Rooftop candlelit Mewari dinner'],
    inc: ['Lake-view heritage luxury room', 'Buffet breakfast & 1 candlelit dinner', 'Private AC cab transfers', 'Lake boat cruise tickets'],
    exc: ['Vintage car museum entry', 'Personal expenses'],
    itinerary: [
      { day: 1, title: 'Arrival by the Waters of Pichola', desc: 'Arrive at Udaipur airport/station and check into your lakefront palace hotel. Sunset boat cruise around Jag Mandir island.' },
      { day: 2, title: 'City Palace & Saheliyon Ki Bari', desc: 'Explore Rajasthan’s largest palace complex with decorated balconies, followed by the lush fountains of Queen’s Garden.' },
      { day: 3, title: 'Monsoon Palace & Artisan Walk', desc: 'Panoramic Aravalli summit view from Sajjangarh, shop miniature paintings in old town, and depart with cherished memories.' }
    ]
  },
  {
    id: 'ladakh',
    name: 'Ladakh High Passes & Pangong Stargazing',
    loc: 'Leh & Nubra, Ladakh, India',
    cat: 'mountain',
    days: 6,
    nights: 5,
    price: 32500,
    rating: 4.9,
    rev: 980,
    tag: 'Adventure',
    intl: false,
    image: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1000&q=80'
    ],
    blurb: 'Cross Khardung La at 17,982 ft, camp by the surreal cobalt blue Pangong Tso, and ride double-humped camels in Nubra Valley.',
    hi: ['Pangong Tso luxury glamping', 'Khardung La high-altitude pass', 'Nubra Valley sand dunes & Bactrian camels', 'Thiksey & Diskit Buddhist Monasteries'],
    inc: ['Heated deluxe camps & 4-star Leh hotel', 'All breakfasts & dinners', 'Heavy-duty 4x4 Scorpio / Innova with oxygen cylinder', 'Inner Line wildlife & military permits'],
    exc: ['Camel safari ride fees', 'Warm jacket gear hire'],
    itinerary: [
      { day: 1, title: 'Acclimatisation in Leh (11,500 ft)', desc: 'Arrival at Kushok Bakula Rimpochee Airport. Mandatory rest for altitude adjustment. Evening stroll to Shanti Stupa.' },
      { day: 2, title: 'Sham Valley & Magnetic Hill', desc: 'Scenic drive to Hall of Fame, Magnetic Hill defying gravity, and confluence of Indus and Zanskar rivers.' },
      { day: 3, title: 'Leh to Nubra via Khardung La', desc: 'Ascend the world-renowned Khardung La pass. Descend into Nubra Valley and ride camels in Hunder sand dunes.' },
      { day: 4, title: 'Nubra to Pangong via Shyok', desc: 'Dramatic river valley drive directly to Pangong Lake. Watch colors change from turquoise to dark sapphire under the Milky Way.' },
      { day: 5, title: 'Pangong to Leh via Chang La', desc: 'Morning photography by the crystal water. Return to Leh via Chang La pass with stops at Thiksey Monastery.' },
      { day: 6, title: 'Departure', desc: 'Transfer to Leh airport with mountain memories to last a lifetime.' }
    ]
  },
  {
    id: 'bali',
    name: 'Bali Tropical Villas & Temple Sunsets',
    loc: 'Ubud & Seminyak, Indonesia',
    cat: 'beach',
    days: 5,
    nights: 4,
    price: 46800,
    rating: 4.8,
    rev: 3020,
    tag: 'International',
    intl: true,
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1000&q=80'
    ],
    blurb: 'Floating breakfasts in Ubud private pool villas, sacred Monkey Forest walks, Uluwatu cliff sunset kecak dance, and Seminyak beach lounges.',
    hi: ['Tegallalang emerald rice terraces', 'Uluwatu sea cliff temple & fire dance', 'Nusa Penida Kelingking beach speedboat day trip', 'Private pool villa with floating breakfast'],
    inc: ['Private pool villa in Ubud & Seminyak', 'Daily floating breakfast & afternoon tea', 'Dedicated English-speaking private driver', 'Fast boat to Nusa Penida'],
    exc: ['Indonesian visa-on-arrival fee ($35)', 'Club entry drinks'],
    itinerary: [
      { day: 1, title: 'Arrive in Denpasar & Ubud Villa', desc: 'Flower garland reception at Ngurah Rai airport. Private transfer to your secluded Ubud rainforest villa.' },
      { day: 2, title: 'Rice Terraces & Jungle Swing', desc: 'Iconic Bali swing overlooking Tegallalang rice terraces, Tirta Empul holy spring water cleansing, and Ubud art market.' },
      { day: 3, title: 'Nusa Penida Island Expedition', desc: 'Speedboat to Nusa Penida to witness T-Rex cliff at Kelingking Beach, Broken Beach, and Angel’s Billabong.' },
      { day: 4, title: 'Seminyak Beach Life & Uluwatu Sunset', desc: 'Transfer to Seminyak beachfront, visit cliffside Uluwatu Temple, and experience the hypnotic Kecak Fire Dance.' },
      { day: 5, title: 'Cafe Hop & Bali Farewell', desc: 'Savor organic acai bowls in Canggu, pick up Balinese coffee and vanilla beans, and transfer to airport.' }
    ]
  },
  {
    id: 'dubai',
    name: 'Dubai Futuristic Glamour & Desert Safari',
    loc: 'Dubai, UAE',
    cat: 'city',
    days: 4,
    nights: 3,
    price: 52400,
    rating: 4.7,
    rev: 2750,
    tag: 'International',
    intl: true,
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1000&q=80'
    ],
    blurb: 'Sunset view from the top of Burj Khalifa, high-adrenaline desert dune bashing with barbecue dinner, and luxury shopping along the Marina.',
    hi: ['Burj Khalifa Level 124 & 125 observation deck', 'Red dunes 4x4 desert safari with BBQ & Tanoura show', 'Dubai Mall fountain show & Marina luxury yacht', 'Historic Al Fahidi & gold spice souks'],
    inc: ['4-Star Downtown / Marina hotel', 'Daily international breakfast', 'Private airport transfers in luxury sedan', 'Burj Khalifa prime hours fast-track tickets'],
    exc: ['Dubai tourism dirham fee', 'Personal shopping'],
    itinerary: [
      { day: 1, title: 'Welcome to Dubai & Marina Cruise', desc: 'Arrive at DXB airport, private transfer to hotel. Evening luxury glass-boat dinner cruise along glittering Dubai Marina.' },
      { day: 2, title: 'Burj Khalifa & Museum of the Future', desc: 'Marvel at futuristic architecture, visit the 124th floor of Burj Khalifa, and witness the Dancing Fountains.' },
      { day: 3, title: 'Red Dunes Safari & Arabian Camp', desc: 'Afternoon dune bashing in Land Cruiser, sandboarding, camel rides, and starlit Arabian barbecue banquet with live fire show.' },
      { day: 4, title: 'Old Dubai Heritage & Souk Shopping', desc: 'Abra water taxi across Dubai Creek, bargaining in Gold & Spice Souks, and final transfer to DXB terminal.' }
    ]
  },
  {
    id: 'singapore',
    name: 'Singapore Garden Metropolis & Sentosa',
    loc: 'Singapore',
    cat: 'city',
    days: 4,
    nights: 3,
    price: 58900,
    rating: 4.8,
    rev: 1980,
    tag: 'International',
    intl: true,
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1506351421178-63b52a2d15c8?auto=format&fit=crop&w=1000&q=80'
    ],
    blurb: 'Supertree Grove light show, Cloud Forest waterfalls, Michelin-starred hawker street food trails, and Sentosa Island beach escapes.',
    hi: ['Gardens by the Bay & Floral Fantasy', 'Universal Studios Singapore day pass', 'Night Safari tram expedition', 'Marina Bay Sands SkyPark observation deck'],
    inc: ['4-Star central hotel near Orchard / Bugis', 'Daily breakfast buffet', 'Unlimited Singapore Tourist MRT Card', 'Key attraction combo passes'],
    exc: ['Universal Studios express pass', 'Personal shopping'],
    itinerary: [
      { day: 1, title: 'Arrival & Gardens by the Bay Light Symphony', desc: 'Arrive at Changi Airport. Discover Jewel indoor vortex waterfall, check in, and witness the Supertree light and sound show.' },
      { day: 2, title: 'Sentosa Island & Universal Thrills', desc: 'Scenic cable car to Sentosa, exhilarating roller coasters at Universal Studios, and sunset cocktails at Siloso Beach.' },
      { day: 3, title: 'Chinatown, Little India & Night Safari', desc: 'Culinary trail across Maxwell Food Centre for Hainanese chicken rice, followed by the world’s first open-air Night Safari.' },
      { day: 4, title: 'SkyPark & Changi Departure', desc: 'Breathtaking 360 view from Marina Bay Sands SkyPark, duty-free shopping at Changi, and flight home.' }
    ]
  },
  {
    id: 'maldives',
    name: 'Maldives Overwater Sanctuary',
    loc: 'North Malé Atoll, Maldives',
    cat: 'beach',
    days: 4,
    nights: 3,
    price: 84500,
    rating: 5.0,
    rev: 1140,
    tag: 'Luxury Escapes',
    intl: true,
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=1000&q=80'
    ],
    blurb: 'Step directly from your private sun deck into crystal turquoise lagoons. Unwind with house-reef manta ray snorkelling and scenic seaplane rides.',
    hi: ['Private lagoon overwater villa with glass floor', 'Roundtrip scenic seaplane / speedboat transfer', 'House reef snorkelling with sea turtles', 'Private candlelit beach sandbank dinner'],
    inc: ['All-Inclusive premium food and beverage package', 'Complimentary non-motorized water sports & snorkel kit', 'Resort marine biologist guided reef safari', 'Sunset dolphin watching yacht cruise'],
    exc: ['Scuba diving certification', 'Spa treatments beyond package'],
    itinerary: [
      { day: 1, title: 'Touchdown in Paradise & Seaplane', desc: 'Arrive at Velana Airport. Board the scenic seaplane flying over atoll rings. Check in to your overwater villa.' },
      { day: 2, title: 'Coral Reef Snorkelling & Kayaking', desc: 'Complimentary snorkelling safari exploring live coral gardens. Paddleboard across crystal calm turquoise waters.' },
      { day: 3, title: 'Dolphin Cruise & Sandbank Dinner', desc: 'Sunset cruise spotting pods of spinner dolphins, followed by private candlelit dining on a secluded sandbank.' },
      { day: 4, title: 'Lagoon Sunrise & Homeward Bound', desc: 'Sunrise yoga on the deck, farewell tropical breakfast, and seaplane transfer back to Malé airport.' }
    ]
  },
  {
    id: 'andaman',
    name: 'Andaman Crystal Coral & Beach Bliss',
    loc: 'Havelock & Neil Island, India',
    cat: 'beach',
    days: 5,
    nights: 4,
    price: 29600,
    rating: 4.8,
    rev: 1260,
    tag: 'Island Life',
    intl: false,
    image: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80'
    ],
    blurb: 'Asia’s cleanest white-sand Radhanagar Beach, beginner scuba diving with sea turtles, and luxury catamaran cruises between islands.',
    hi: ['Radhanagar Beach No. 7 sunset', 'Scuba diving introductory dive with certified PADI master', 'Makruzz high-speed luxury catamaran cruise', 'Cellular Jail historic light & sound show'],
    inc: ['4-Star beachfront eco-resort in Havelock', 'Daily breakfast & dinner', 'Inter-island ferry tickets in premium air-conditioned cabin', 'Introductory scuba session with underwater photos'],
    exc: ['Additional water sports at Elephant Beach', 'Personal shopping'],
    itinerary: [
      { day: 1, title: 'Port Blair & Cellular Jail', desc: 'Arrival at Veer Savarkar airport. Check in, visit Corbyn’s Cove beach and witness the moving Cellular Jail light show.' },
      { day: 2, title: 'High-speed Cruise to Havelock', desc: 'Board the Makruzz cruise to Swaraj Dweep (Havelock). Afternoon at Radhanagar Beach, rated among Asia’s best.' },
      { day: 3, title: 'Scuba & Elephant Beach Coral Reefs', desc: 'Beginner scuba diving exploring vibrant corals and clownfish. Trek or boat to Elephant beach for sea walking.' },
      { day: 4, title: 'Neil Island Natural Rock Bridge', desc: 'Cruise to Neil Island (Shaheed Dweep). Visit natural rock formation bridge and Laxmanpur Beach sunset.' },
      { day: 5, title: 'Return to Port Blair & Fly Out', desc: 'Morning cruise back to Port Blair, airport transfer with pristine island memories.' }
    ]
  },
  {
    id: 'kyoto',
    name: 'Kyoto Ancient Shrines & Bamboo Groves',
    loc: 'Kyoto & Nara, Japan',
    cat: 'forest',
    days: 6,
    nights: 5,
    price: 96000,
    rating: 4.9,
    rev: 870,
    tag: 'International',
    intl: true,
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1000&q=80'
    ],
    blurb: '10,000 vermilion torii gates at Fushimi Inari, towering Arashiyama bamboo forests, historic tea ceremonies, and traditional ryokan hot spring stays.',
    hi: ['Fushimi Inari Shrine morning hike', 'Arashiyama towering bamboo path & Sagano scenic train', 'Authentic Kyoto Matcha tea ceremony in kimono', 'Day trip to sacred Nara deer park'],
    inc: ['Traditional luxury Ryokan with onsen bath + boutique Kyoto hotel', 'Daily Japanese gourmet breakfast & 1 Kaiseki dinner', '7-Day JR Rail Pass', 'English-speaking licensed heritage scholar'],
    exc: ['Japan visa processing fee', 'Kimono photography optional package'],
    itinerary: [
      { day: 1, title: 'Arrival at Kansai & Shinkansen to Kyoto', desc: 'Board the Haruka express to Kyoto. Check in to your central boutique hotel near Gion. Evening walk along lantern-lit Pontocho Alley.' },
      { day: 2, title: 'Fushimi Inari & Golden Pavilion', desc: 'Early morning climb through the torii gates of Fushimi Inari, followed by the gold-leaf reflection of Kinkaku-ji.' },
      { day: 3, title: 'Arashiyama Bamboo & Monkey Park', desc: 'Walk the majestic bamboo groves, cross the Togetsukyo bridge, and board the romantic Sagano scenic rail.' },
      { day: 4, title: 'Tea Ceremony & Gion Geisha District', desc: 'Participate in a centuries-old tea ceremony, stroll historic wooden machiya townhouses in Gion, and taste Kyoto street food in Nishiki Market.' },
      { day: 5, title: 'Nara Deer Park & Ryokan Onsen Retreat', desc: 'Feed the friendly bowing deer in Nara and visit the Great Bronze Buddha at Todai-ji. Evening relaxing in thermal onsen baths with a 9-course Kaiseki dinner.' },
      { day: 6, title: 'Farewell Japan', desc: 'Express train back to Osaka/Tokyo airport, filled with peace and culture.' }
    ]
  }
];

export const STAYS = [
  {
    n: 'The Coral Reef Grand Luxury Resort',
    type: 'Resort',
    cat: 'beach',
    city: 'Goa',
    price: 7800,
    rating: 4.8,
    reviewsCount: 640,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
    am: ['Infinity Pool', 'Private Beach Access', 'Ayurveda Spa', 'Free Gourmet Breakfast', 'Sea View Balcony', 'High-speed Wi-Fi'],
    roomTypes: ['Deluxe Ocean View', 'Beachfront Cabana Villa', 'Presidential Suite']
  },
  {
    n: 'Sea Breeze Bohemian Boutique',
    type: 'Boutique',
    cat: 'beach',
    city: 'Goa',
    price: 4200,
    rating: 4.5,
    reviewsCount: 380,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    am: ['Tropical Cafe', 'Bicycle & Scooter Rental', 'Fast Wi-Fi', 'Yoga Deck', 'Cocktail Bar'],
    roomTypes: ['Garden Studio', 'Boho Balcony Suite']
  },
  {
    n: 'Haveli Gulab Mahal Heritage Palace',
    type: 'Heritage',
    cat: 'heritage',
    city: 'Jaipur',
    price: 6400,
    rating: 4.7,
    reviewsCount: 820,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
    am: ['Marble Courtyard Pool', 'Royal Breakfast', 'Spa & Jacuzzi', 'Folk Music Evenings', 'Palace Architecture'],
    roomTypes: ['Heritage Courtyard Suite', 'Maharaja Royal Chamber']
  },
  {
    n: 'Pink City Modern Residency',
    type: 'Hotel',
    cat: 'city',
    city: 'Jaipur',
    price: 3100,
    rating: 4.3,
    reviewsCount: 290,
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
    am: ['High-speed Wi-Fi', '24/7 Fitness Gym', 'Rooftop Multicuisine Restaurant', 'Business Lounge'],
    roomTypes: ['Executive Room', 'Deluxe Double']
  },
  {
    n: 'Lakeside Palace View & Suites',
    type: 'Heritage',
    cat: 'heritage',
    city: 'Udaipur',
    price: 9800,
    rating: 4.9,
    reviewsCount: 1140,
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80',
    am: ['Lake Pichola Panorama', 'Infinity Pool', 'Rooftop Mewar Bar', 'Private Boat Jetty', 'Butler Service'],
    roomTypes: ['Lake View Grand Room', 'Palace Sunset Suite']
  },
  {
    n: 'Harbour Crest Luxury Suites',
    type: 'Luxury',
    cat: 'city',
    city: 'Mumbai',
    price: 14500,
    rating: 4.8,
    reviewsCount: 950,
    image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80',
    am: ['Arabian Sea View', 'Rooftop Heated Pool', 'Luxury Spa', '24h Gym', 'Fine Dining by Masterchefs'],
    roomTypes: ['Harbour Club Room', 'Sea Facing Panoramic Suite']
  },
  {
    n: 'Juhu Beachfront Express',
    type: 'Hotel',
    cat: 'city',
    city: 'Mumbai',
    price: 3600,
    rating: 4.2,
    reviewsCount: 410,
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80',
    am: ['Free Breakfast', 'Wi-Fi', 'Airport Shuttle', 'Walking distance to Juhu Beach'],
    roomTypes: ['Standard King', 'Superior Twin']
  },
  {
    n: 'The Connaught Grand New Delhi',
    type: 'Luxury',
    cat: 'city',
    city: 'Delhi',
    price: 11200,
    rating: 4.7,
    reviewsCount: 1250,
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=80',
    am: ['Olympic-size Pool', 'Full Service Spa', 'Cigar Bar & Lounge', 'Metro Station Direct Access'],
    roomTypes: ['Grand Deluxe', 'Diplomatic Suite']
  },
  {
    n: 'Hauz Khas Bohemian Lofts',
    type: 'Boutique',
    cat: 'city',
    city: 'Delhi',
    price: 4800,
    rating: 4.6,
    reviewsCount: 320,
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
    am: ['Lake & Fort View Terrace', 'Artisanal Cafe', 'Wi-Fi', 'Smart TV with Netflix'],
    roomTypes: ['Loft Studio', 'Penthouse Terrace']
  },
  {
    n: 'Garden City Botanical Retreat',
    type: 'Resort',
    cat: 'forest',
    city: 'Bengaluru',
    price: 6900,
    rating: 4.6,
    reviewsCount: 540,
    image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=800&q=80',
    am: ['Botanical Garden', 'Lapis Pool', 'Farm-to-table Breakfast', 'Tennis Court', 'EV Charging Station'],
    roomTypes: ['Garden Chalet', 'Club Suite']
  },
  {
    n: 'Marina Bay Waterfront Hotel',
    type: 'Hotel',
    cat: 'city',
    city: 'Chennai',
    price: 4400,
    rating: 4.4,
    reviewsCount: 460,
    image: 'https://images.unsplash.com/photo-1568084680786-a84f91d1153c?auto=format&fit=crop&w=800&q=80',
    am: ['Bay of Bengal View', 'Rooftop Coastal Bar', 'Fitness Center', 'Fast Wi-Fi'],
    roomTypes: ['Bay View Deluxe', 'Ocean King']
  },
  {
    n: 'Fort Kochi Heritage Colonial Inn',
    type: 'Heritage',
    cat: 'heritage',
    city: 'Kochi',
    price: 5200,
    rating: 4.8,
    reviewsCount: 680,
    image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80',
    am: ['Colonial Archways', 'Spice Courtyard', 'Traditional Kerala Breakfast', 'Art Gallery'],
    roomTypes: ['Dutch Colonial Suite', 'Heritage Garden Room']
  },
  {
    n: 'Alleppey Backwater Bungalow & Spa',
    type: 'Resort',
    cat: 'forest',
    city: 'Kochi',
    price: 8600,
    rating: 4.9,
    reviewsCount: 790,
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
    am: ['Private Canal View', 'Lotus Pool', 'Ayurveda Panchakarma Center', 'Sunset Canoe Tours'],
    roomTypes: ['Waterfront Cottage', 'Royal Ayurveda Villa']
  },
  {
    n: 'Hyderabad Pearl City Suites',
    type: 'Hotel',
    cat: 'city',
    city: 'Hyderabad',
    price: 3900,
    rating: 4.3,
    reviewsCount: 390,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    am: ['Swimming Pool', 'Biryani Speciality Restaurant', 'Gym', 'Free Wi-Fi'],
    roomTypes: ['Deluxe Queen', 'Executive Business Suite']
  },
  {
    n: 'Howrah Grand Heritage Hotel',
    type: 'Heritage',
    cat: 'heritage',
    city: 'Kolkata',
    price: 3400,
    rating: 4.3,
    reviewsCount: 310,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
    am: ['Victorian Tea Room', 'Authentic Bengali Breakfast', 'Library', 'Wi-Fi'],
    roomTypes: ['Victorian Classic', 'Heritage Suite']
  }
];

