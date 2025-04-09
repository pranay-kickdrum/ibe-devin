import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from './Calendar';
import { PropertySearch } from './PropertySearch';
import { DateSelector } from './DateSelector';
import { GuestSelector } from './GuestSelector';

export const BookingWidget: React.FC = () => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState('');
  const [checkInDate, setCheckInDate] = useState<Date | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);
  const [guests, setGuests] = useState(1);
  const [rooms, setRooms] = useState(1);
  const [needAccessibleRoom, setNeedAccessibleRoom] = useState(false);
  
  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };
  
  const handleSearch = () => {
    console.log('Search with:', {
      property: selectedProperty,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      guests,
      rooms,
      needAccessibleRoom
    });
  };
  
  return (
    <div className="flex flex-col w-full max-w-md mx-auto bg-white rounded-md overflow-hidden shadow-lg">
      <div className="bg-zinc-800 p-3 flex justify-between items-center">
        <div className="text-white text-sm">
          <span className="font-bold">Kickdrum</span> Internet Booking Engine
        </div>
        <div className="flex items-center gap-2 text-white text-sm">
          <span>En</span>
          <span>$ USD</span>
        </div>
      </div>
      
      <div className="p-4 bg-zinc-700 text-white">
        {showCalendar ? (
          <div className="space-y-4">
            <Calendar 
              checkInDate={checkInDate}
              checkOutDate={checkOutDate}
              onSelectCheckIn={setCheckInDate}
              onSelectCheckOut={setCheckOutDate}
              onApplyDates={() => setShowCalendar(false)}
            />
          </div>
        ) : (
          <div className="space-y-4">
            <PropertySearch 
              selectedProperty={selectedProperty}
              onSelectProperty={setSelectedProperty}
            />
            
            <div className="text-sm font-medium mt-3">Select dates</div>
            
            <DateSelector
              checkInDate={checkInDate}
              checkOutDate={checkOutDate}
              onCheckInClick={toggleCalendar}
              onCheckOutClick={toggleCalendar}
            />
            
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <div className="text-sm font-medium mb-1">Guests</div>
                <GuestSelector
                  guests={guests}
                  rooms={rooms}
                  needAccessibleRoom={needAccessibleRoom}
                  onGuestsChange={setGuests}
                  onRoomsChange={setRooms}
                  onAccessibleRoomChange={setNeedAccessibleRoom}
                />
              </div>
              <div>
                <div className="text-sm font-medium mb-1">Rooms</div>
                <div className="border border-gray-300 rounded bg-white p-2 flex items-center">
                  <input 
                    type="number" 
                    className="w-full outline-none text-gray-700"
                    value={rooms}
                    min={1}
                    max={10}
                    onChange={(e) => setRooms(Math.max(1, Math.min(10, parseInt(e.target.value) || 1)))}
                  />
                </div>
              </div>
            </div>
            
            <div className="flex items-center mt-3">
              <input 
                type="checkbox"
                id="accessibleRoom"
                className="mr-2"
                checked={needAccessibleRoom}
                onChange={(e) => setNeedAccessibleRoom(e.target.checked)}
              />
              <label htmlFor="accessibleRoom" className="text-sm">I need an Accessible Room</label>
            </div>
            
            <div className="mt-4">
              <Button 
                className="w-full bg-indigo-900 hover:bg-indigo-800 text-white py-2"
                onClick={handleSearch}
              >
                SEARCH
              </Button>
            </div>
          </div>
        )}
      </div>
      
      {!showCalendar && (
        <div className="p-3 bg-white border-t border-gray-200">
          <div className="text-xs text-gray-500 text-center">
            Prices are displayed in USD
            <br />
            Nightly rate: 0-4 days
          </div>
        </div>
      )}
      
      <div className="bg-indigo-900 p-2 text-white text-xs text-center">
        <div>© Kickdrum Technology Group, LLC.</div>
        <div>All rights Reserved</div>
      </div>
    </div>
  );
};

export default BookingWidget;
