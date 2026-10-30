import { jsPDF } from 'jspdf';

/**
 * Format currency for PDF text (avoiding special symbols that might fail in default Helvetica)
 */
function formatCurrencyPDF(amount) {
  return 'INR ' + Number(amount || 0).toLocaleString('en-IN');
}

/**
 * Generate and download a PDF voucher for a single booking
 */
export function downloadBookingPDF(trip, user = null) {
  if (!trip) return;

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 16;
  const contentWidth = pageWidth - (margin * 2);

  // 1. Top Brand Header Bar
  doc.setFillColor(15, 118, 110); // Brand teal (#0f766e)
  doc.rect(0, 0, pageWidth, 28, 'F');

  // Brand Name
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(255, 255, 255);
  doc.text('WANDERLANE', margin, 18);

  // Brand Subtitle
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(204, 251, 241); // teal-100
  doc.text('OFFICIAL E-TICKET & TRAVEL VOUCHER', margin, 24);

  // Ref Box on top right
  doc.setFillColor(17, 94, 89); // darker teal
  doc.roundedRect(pageWidth - margin - 52, 6, 52, 16, 2, 2, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(253, 230, 138); // sun/amber-200
  doc.text('BOOKING REFERENCE', pageWidth - margin - 50, 11);
  doc.setFontSize(11);
  doc.setTextColor(255, 255, 255);
  doc.text(trip.ref || 'WL-REF', pageWidth - margin - 50, 18);

  let currentY = 36;

  // 2. Status & Kind Banner
  const isConfirmed = trip.status === 'confirmed';
  const kindTitle = {
    flight: 'FLIGHT BOARDING PASS & ITINERARY',
    stay: 'HOTEL CHECK-IN & RESERVATION VOUCHER',
    package: 'HOLIDAY PACKAGE & TOUR VOUCHER'
  }[trip.kind] || 'TRAVEL BOOKING CONFIRMATION';

  // Banner background
  doc.setFillColor(248, 250, 252); // slate-50
  doc.setDrawColor(226, 232, 240); // slate-200
  doc.roundedRect(margin, currentY, contentWidth, 22, 2, 2, 'FD');

  // Kind badge
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(15, 118, 110);
  doc.text(kindTitle, margin + 5, currentY + 9);

  // Trip Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(15, 23, 42); // slate-900
  const cleanTitle = (trip.title || 'Trip Booking').replace(/[^\x00-\x7F]/g, '');
  doc.text(cleanTitle.slice(0, 50), margin + 5, currentY + 16);

  // Status Badge on the right
  if (isConfirmed) {
    doc.setFillColor(220, 252, 231); // emerald-100
    doc.setDrawColor(187, 247, 208);
    doc.roundedRect(pageWidth - margin - 35, currentY + 5, 30, 11, 2, 2, 'FD');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(22, 101, 52); // emerald-800
    doc.text('CONFIRMED', pageWidth - margin - 30, currentY + 12);
  } else {
    doc.setFillColor(254, 226, 226); // rose-100
    doc.setDrawColor(254, 202, 202);
    doc.roundedRect(pageWidth - margin - 35, currentY + 5, 30, 11, 2, 2, 'FD');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(153, 27, 27); // rose-800
    doc.text('CANCELLED', pageWidth - margin - 30, currentY + 12);
  }

  currentY += 28;

  // 3. Main Trip Information Card (Grid)
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(203, 213, 225); // slate-300
  doc.roundedRect(margin, currentY, contentWidth, 80, 2, 2, 'D');

  // Header of details box
  doc.setFillColor(241, 245, 249); // slate-100
  doc.rect(margin, currentY, contentWidth, 8, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(71, 85, 105);
  doc.text('RESERVATION & PASSENGER SPECIFICATIONS', margin + 4, currentY + 5.5);

  const row1Y = currentY + 18;
  const col1X = margin + 5;
  const col2X = margin + (contentWidth / 3) + 2;
  const col3X = margin + (contentWidth * 2 / 3) + 2;

  // Column 1: Dates
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text(trip.kind === 'stay' ? 'CHECK-IN DATE' : 'DEPARTURE DATE', col1X, row1Y);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text(trip.date || 'TBD', col1X, row1Y + 5);

  if (trip.end && trip.kind !== 'flight') {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(100, 116, 139);
    doc.text(trip.kind === 'stay' ? 'CHECK-OUT DATE' : 'RETURN DATE', col1X, row1Y + 14);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(15, 23, 42);
    doc.text(trip.end || 'TBD', col1X, row1Y + 19);
  } else if (trip.sub) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(100, 116, 139);
    doc.text('ROUTE / DETAILS', col1X, row1Y + 14);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(15, 23, 42);
    const cleanSub = trip.sub.replace(/[^\x00-\x7F]/g, '');
    doc.text(cleanSub.slice(0, 28), col1X, row1Y + 19);
  }

  // Column 2: Lead Passenger / Party Size
  const leadPassenger = (trip.trav && trip.trav.length > 0)
    ? trip.trav[0]
    : (user?.name || 'Lead Guest');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text('LEAD TRAVELER / GUEST', col2X, row1Y);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text(leadPassenger.slice(0, 24), col2X, row1Y + 5);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text('TOTAL PARTY SIZE', col2X, row1Y + 14);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  const partyUnit = trip.kind === 'stay' ? 'Guest' : 'Traveler';
  doc.text(`${trip.qty || 1} ${partyUnit}${(trip.qty || 1) > 1 ? 's' : ''}`, col2X, row1Y + 19);

  if (trip.seats && trip.seats.length > 0) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(100, 116, 139);
    doc.text('SEAT SELECTION', col2X, row1Y + 28);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(15, 118, 110);
    doc.text(trip.seats.join(', '), col2X, row1Y + 33);
  }

  // Column 3: Payment & Fare Breakdown
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text('TOTAL AMOUNT PAID', col3X, row1Y);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(15, 118, 110);
  doc.text(formatCurrencyPDF(trip.total), col3X, row1Y + 6);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text('PAYMENT CHANNEL', col3X, row1Y + 15);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(15, 23, 42);
  doc.text(trip.pay || 'Credit Card / UPI', col3X, row1Y + 20);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text('LOYALTY REWARD', col3X, row1Y + 28);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(217, 119, 6); // amber-600
  doc.text(`+${Math.floor((trip.total || 0) / 100)} Club Points`, col3X, row1Y + 33);

  // Additional passengers if any
  if (trip.trav && trip.trav.length > 1) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(100, 116, 139);
    doc.text('ACCOMPANYING TRAVELERS:', col1X, currentY + 52);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(71, 85, 105);
    doc.text(trip.trav.slice(1).join(', ').slice(0, 75), col1X, currentY + 58);
  }

  // Simulated Barcode area at bottom of card
  const barcodeY = currentY + 65;
  doc.setFillColor(15, 23, 42);
  // draw stylized barcode strips
  let barX = col1X;
  for (let i = 0; i < 46; i++) {
    const barW = ((i * 5 + 3) % 3) + 0.6;
    doc.rect(barX, barcodeY, barW, 9, 'F');
    barX += barW + ((i % 3) * 0.7 + 0.8);
  }

  doc.setFont('courier', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text(`*${trip.ref}*`, col1X, barcodeY + 13);

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text(
    'Digital verification barcode - Scan at airline counter or resort check-in desk',
    col2X - 5,
    barcodeY + 6
  );

  currentY += 88;

  // 4. Important Guidelines & Policies Box
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(margin, currentY, contentWidth, 42, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(15, 23, 42);
  doc.text('TRAVEL REQUIREMENTS & CANCELLATION TERMS', margin + 5, currentY + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(71, 85, 105);

  const bulletPoints = [
    '• Valid Government Photo ID (Aadhaar, Passport, or Voter Card) matching the ticket name is mandatory.',
    '• For domestic flights, report 2 hours prior to scheduled departure; for international flights, 3 hours.',
    '• Hotel check-in typically starts at 2:00 PM; present this voucher and lead passenger ID upon arrival.',
    '• Full 100% refund available up to 7 days before departure. 50% refund between 2 and 7 days.',
    '• Emergency assistance: 24/7 Wanderlane VIP Travel Desk at +91 1800-WANDER (toll-free).'
  ];

  let bulletY = currentY + 12;
  bulletPoints.forEach((bp) => {
    doc.text(bp, margin + 5, bulletY);
    bulletY += 5.5;
  });

  currentY += 48;

  // 5. Customer & Membership Verification Footer Box
  if (user) {
    doc.setFillColor(241, 245, 249);
    doc.roundedRect(margin, currentY, contentWidth, 14, 1.5, 1.5, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(71, 85, 105);
    doc.text(`ACCOUNT: ${user.name.toUpperCase()} (${user.email})`, margin + 4, currentY + 5.5);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.text(`HOME BASE: ${user.home || 'Mumbai'}  |  PHONE: ${user.phone || '+91 98765 43210'}`, margin + 4, currentY + 10.5);
  }

  // Bottom footer note
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(148, 163, 184); // slate-400
  const generationTimestamp = new Date().toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short'
  });
  doc.text(
    `Generated on ${generationTimestamp} via Wanderlane Travel Engine. Authenticity verified by cryptographically signed booking record.`,
    margin,
    286
  );

  // Download PDF
  const filename = `Wanderlane-Booking-${trip.ref || 'Ticket'}.pdf`;
  doc.save(filename);
}

/**
 * Generate and download a PDF summary report of all user bookings
 */
export function downloadAllBookingsPDF(trips = [], user = null) {
  if (!trips || trips.length === 0) return;

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 16;
  const contentWidth = pageWidth - (margin * 2);

  // 1. Header Banner
  doc.setFillColor(15, 118, 110);
  doc.rect(0, 0, pageWidth, 28, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(255, 255, 255);
  doc.text('WANDERLANE', margin, 18);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(204, 251, 241);
  doc.text('MY TRAVEL VAULT - COMPLETE BOOKINGS STATEMENT', margin, 24);

  // Statement summary pill on the right
  doc.setFillColor(17, 94, 89);
  doc.roundedRect(pageWidth - margin - 55, 6, 55, 16, 2, 2, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(253, 230, 138);
  doc.text('TOTAL RESERVATIONS', pageWidth - margin - 52, 11);
  doc.setFontSize(11);
  doc.setTextColor(255, 255, 255);
  doc.text(`${trips.length} Bookings`, pageWidth - margin - 52, 18);

  let currentY = 36;

  // 2. Member Summary Cards
  const totalSpend = trips
    .filter(t => t.status === 'confirmed')
    .reduce((acc, t) => acc + (t.total || 0), 0);

  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(margin, currentY, contentWidth, 20, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text('TRAVELER PROFILE', margin + 5, currentY + 6);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text(user?.name || 'Valued Traveler', margin + 5, currentY + 13);

  const col2 = margin + 65;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text('ACCOUNT EMAIL', col2, currentY + 6);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(15, 23, 42);
  doc.text(user?.email || 'traveler@wanderlane.com', col2, currentY + 13);

  const col3 = margin + 125;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text('TOTAL CONFIRMED SPEND', col3, currentY + 6);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(15, 118, 110);
  doc.text(formatCurrencyPDF(totalSpend), col3, currentY + 13);

  currentY += 28;

  // 3. Table Header
  doc.setFillColor(15, 23, 42);
  doc.rect(margin, currentY, contentWidth, 8, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(255, 255, 255);

  doc.text('REF CODE', margin + 3, currentY + 5.5);
  doc.text('SERVICE / DESTINATION', margin + 28, currentY + 5.5);
  doc.text('TYPE', margin + 98, currentY + 5.5);
  doc.text('DATE', margin + 118, currentY + 5.5);
  doc.text('STATUS', margin + 143, currentY + 5.5);
  doc.text('AMOUNT', margin + 163, currentY + 5.5);

  currentY += 8;

  // 4. Table Rows
  trips.forEach((trip, idx) => {
    // Check if new page is needed
    if (currentY > 260) {
      doc.addPage();
      currentY = 20;

      // Repeat Table Header
      doc.setFillColor(15, 23, 42);
      doc.rect(margin, currentY, contentWidth, 8, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.setTextColor(255, 255, 255);
      doc.text('REF CODE', margin + 3, currentY + 5.5);
      doc.text('SERVICE / DESTINATION', margin + 28, currentY + 5.5);
      doc.text('TYPE', margin + 98, currentY + 5.5);
      doc.text('DATE', margin + 118, currentY + 5.5);
      doc.text('STATUS', margin + 143, currentY + 5.5);
      doc.text('AMOUNT', margin + 163, currentY + 5.5);
      currentY += 8;
    }

    // Row zebra striping
    if (idx % 2 === 0) {
      doc.setFillColor(248, 250, 252);
      doc.rect(margin, currentY, contentWidth, 10, 'F');
    }

    doc.setDrawColor(241, 245, 249);
    doc.line(margin, currentY + 10, margin + contentWidth, currentY + 10);

    // Ref
    doc.setFont('courier', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(15, 118, 110);
    doc.text(trip.ref || '-', margin + 3, currentY + 6.5);

    // Title
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(15, 23, 42);
    const safeTitle = (trip.title || '').replace(/[^\x00-\x7F]/g, '');
    doc.text(safeTitle.slice(0, 35), margin + 28, currentY + 6.5);

    // Type
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(100, 116, 139);
    doc.text((trip.kind || '').toUpperCase(), margin + 98, currentY + 6.5);

    // Date
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(71, 85, 105);
    doc.text((trip.date || '').slice(0, 12), margin + 118, currentY + 6.5);

    // Status
    const isConf = trip.status === 'confirmed';
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    if (isConf) {
      doc.setTextColor(22, 101, 52);
      doc.text('CONFIRMED', margin + 143, currentY + 6.5);
    } else {
      doc.setTextColor(185, 28, 28);
      doc.text('CANCELLED', margin + 143, currentY + 6.5);
    }

    // Amount
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(15, 23, 42);
    doc.text(formatCurrencyPDF(trip.total), margin + 163, currentY + 6.5);

    currentY += 10;
  });

  // Footer note
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(148, 163, 184);
  const now = new Date().toLocaleString('en-IN');
  doc.text(`Official Wanderlane Vault Statement. Issued on ${now}. Contact support@wanderlane.travel for assistance.`, margin, 286);

  doc.save('Wanderlane-All-Bookings-Statement.pdf');
}

