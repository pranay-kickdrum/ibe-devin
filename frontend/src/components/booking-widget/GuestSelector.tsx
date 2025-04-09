import React, { useState } from 'react';

interface GuestSelectorProps {
  guests: number;
  rooms: number;
  needAccessibleRoom: boolean;
  onGuestsChange: (guests: number) => void;
  onRoomsChange: (rooms: number) => void;
  onAccessibleRoomChange: (needAccessible: boolean) => void;
}

export const GuestSelector: React.FC<GuestSelectorProps> = ({
  guests,
  rooms,
  needAccessibleRoom,
  onGuestsChange,
  onRoomsChange,
  onAccessibleRoomChange
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const handleIncrement = (setter: (value: number) => void, value: number, max: number = 10) => {
    if (value < max) {
      setter(value + 1);
    }
  };
  
  const handleDecrement = (setter: (value: number) => void, value: number, min: number = 1) => {
    if (value > min) {
      setter(value - 1);
    }
  };
  
  return (
    <div className="border border-gray-300 rounded bg-white text-gray-700">
      <div 
        className="p-2 flex items-center justify-between cursor-pointer"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <div className="text-sm">Guests</div>
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      
      {isDropdownOpen && (
        <div className="border-t border-gray-200 p-3 bg-white">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium">Adults</div>
                <div className="text-xs text-gray-500">Ages 18+</div>
              </div>
              <div className="flex items-center space-x-2">
                <button 
                  className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded-full"
                  onClick={() => handleDecrement(onGuestsChange, guests)}
                >
                  -
                </button>
                <span className="w-6 text-center">{guests}</span>
                <button 
                  className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded-full"
                  onClick={() => handleIncrement(onGuestsChange, guests)}
                >
                  +
                </button>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium">Teens</div>
                <div className="text-xs text-gray-500">Ages 13-17</div>
              </div>
              <div className="flex items-center space-x-2">
                <button 
                  className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded-full"
                  onClick={() => {}}
                >
                  -
                </button>
                <span className="w-6 text-center">1</span>
                <button 
                  className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded-full"
                  onClick={() => {}}
                >
                  +
                </button>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium">Kids</div>
                <div className="text-xs text-gray-500">Ages 0-12</div>
              </div>
              <div className="flex items-center space-x-2">
                <button 
                  className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded-full"
                  onClick={() => {}}
                >
                  -
                </button>
                <span className="w-6 text-center">0</span>
                <button 
                  className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded-full"
                  onClick={() => {}}
                >
                  +
                </button>
              </div>
            </div>
            
            <div className="flex items-center mt-2">
              <input 
                type="checkbox"
                id="accessibleRoom"
                className="mr-2"
                checked={needAccessibleRoom}
                onChange={(e) => onAccessibleRoomChange(e.target.checked)}
              />
              <label htmlFor="accessibleRoom" className="text-sm">I need an Accessible Room</label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
