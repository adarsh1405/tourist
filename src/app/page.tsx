'use client';

import { useState } from 'react';
import HomePage from '@/components/HomePage';
import BookingForm from '@/components/BookingForm';

export default function Home() {
  const [showBooking, setShowBooking] = useState(false);

  return (
    <main>
      {showBooking ? (
        <BookingForm onBackToHome={() => setShowBooking(false)} />
      ) : (
        <HomePage onStartBooking={() => setShowBooking(true)} />
      )}
    </main>
  );
}
