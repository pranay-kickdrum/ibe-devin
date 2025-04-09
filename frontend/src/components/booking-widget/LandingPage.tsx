import React from 'react';
import BookingWidget from './BookingWidget';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-6">Kickdrum Internet Booking Engine</h1>
      <BookingWidget />
    </div>
  );
};

export default LandingPage;
