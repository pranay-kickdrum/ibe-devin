import React from 'react';
import { RoomFilters } from './RoomFilters';
import { RoomCard } from './RoomCard';
import { ProgressSteps } from './ProgressSteps';

export const RoomResultsPage: React.FC = () => {
  const roomData = [
    {
      id: 1,
      name: 'Long Beautiful Resort Name',
      rating: 3.5,
      reviews: 128,
      bedType: 'Queen or 2 doubles',
      price: 132,
      nearProperty: false,
      specialOffer: 'Special offer: 3rd night free, 2+ nights',
      image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80'
    },
    {
      id: 2,
      name: 'Long Beautiful Resort Name',
      rating: 3.5,
      reviews: 128,
      bedType: 'Queen or 2 doubles',
      price: 132,
      nearProperty: true,
      image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80'
    },
    {
      id: 3,
      name: 'Long Beautiful Resort Name',
      rating: 3.5,
      reviews: 128,
      bedType: 'Queen or 2 doubles',
      price: 132,
      nearProperty: true,
      image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <div className="bg-white p-2 flex justify-between items-center border-b">
        <div className="text-black text-sm">
          <span className="font-bold">Kickdrum</span> Internet Booking Engine
        </div>
        <div className="flex items-center gap-2 text-black text-sm">
          <span>En</span>
          <span>$ USD</span>
        </div>
      </div>

      {/* Hero Image */}
      <div className="h-[200px] bg-gray-500 bg-cover bg-center" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80")' }}></div>

      {/* Progress Steps */}
      <ProgressSteps currentStep={1} />

      {/* Search Criteria */}
      <div className="bg-gray-200 p-4 flex flex-wrap gap-2 justify-center">
        <div className="flex items-center">
          <label className="text-sm mr-2">Guests</label>
          <select className="border rounded p-1 text-sm w-36">
            <option>2 adults, 1 child</option>
          </select>
        </div>
        <div className="flex items-center">
          <label className="text-sm mr-2">Rooms</label>
          <select className="border rounded p-1 text-sm w-20">
            <option>1</option>
          </select>
        </div>
        <div className="flex items-center">
          <label className="text-sm mr-2">Beds</label>
          <select className="border rounded p-1 text-sm w-20">
            <option>1</option>
          </select>
        </div>
        <div className="flex items-center">
          <label className="text-sm mr-2">Check in between</label>
          <div className="border rounded p-1 text-sm w-36 flex justify-between items-center">
            <span>Any Date</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
        <div className="flex items-center">
          <label className="text-sm mr-2">Check out between</label>
          <div className="border rounded p-1 text-sm w-36 flex justify-between items-center">
            <span>Any Date</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
        <button className="bg-indigo-900 text-white px-4 py-1 rounded text-sm uppercase font-medium">
          Search Dates
        </button>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 p-4 gap-4">
        {/* Filters */}
        <div className="w-64">
          <RoomFilters />
        </div>

        {/* Results */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-4">
            <div className="text-sm text-gray-600">
              Showing 1-3 of 9 Results
            </div>
            <div className="flex items-center">
              <span className="text-sm mr-2">Price</span>
              <select className="border rounded p-1 text-sm">
                <option>Low to High</option>
                <option>High to Low</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {roomData.map(room => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-indigo-900 p-3 text-white text-xs text-center">
        <div className="font-medium">© Kickdrum Technology Group, LLC.</div>
        <div>All rights Reserved</div>
      </div>
    </div>
  );
};

export default RoomResultsPage;
