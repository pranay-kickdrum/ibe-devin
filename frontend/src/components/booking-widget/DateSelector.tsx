import React from 'react';

interface DateSelectorProps {
  checkInDate: Date | null;
  checkOutDate: Date | null;
  onCheckInClick: () => void;
  onCheckOutClick: () => void;
}

export const DateSelector: React.FC<DateSelectorProps> = ({
  checkInDate,
  checkOutDate,
  onCheckInClick,
  onCheckOutClick
}) => {
  const formatDate = (date: Date | null) => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };
  
  return (
    <div className="flex items-center space-x-2">
      <div className="flex-1">
        <div 
          className="border border-gray-300 rounded bg-white p-2 flex items-center cursor-pointer text-gray-700"
          onClick={onCheckInClick}
        >
          <div className="flex-1">
            <div className="text-xs text-gray-500">Check in</div>
            <div className="text-sm">{formatDate(checkInDate) || 'Select date'}</div>
          </div>
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      </div>
      
      <div className="text-gray-400">→</div>
      
      <div className="flex-1">
        <div 
          className="border border-gray-300 rounded bg-white p-2 flex items-center cursor-pointer text-gray-700"
          onClick={onCheckOutClick}
        >
          <div className="flex-1">
            <div className="text-xs text-gray-500">Check out</div>
            <div className="text-sm">{formatDate(checkOutDate) || 'Select date'}</div>
          </div>
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      </div>
    </div>
  );
};
