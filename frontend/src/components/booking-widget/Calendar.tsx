import React from 'react';
import { Button } from '@/components/ui/button';

interface CalendarProps {
  checkInDate: Date | null;
  checkOutDate: Date | null;
  onSelectCheckIn: (date: Date) => void;
  onSelectCheckOut: (date: Date | null) => void;
  onApplyDates: () => void;
}

export const Calendar: React.FC<CalendarProps> = ({
  checkInDate,
  checkOutDate,
  onSelectCheckIn,
  onSelectCheckOut,
  onApplyDates
}) => {
  const firstMonth = 4; // May (0-indexed)
  const secondMonth = 5; // June (0-indexed)
  const currentYear = 2025; // Year from the design
  
  const generateMonthData = (year: number, month: number) => {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    
    return days;
  };
  
  const firstMonthData = generateMonthData(currentYear, firstMonth);
  const secondMonthData = generateMonthData(currentYear, secondMonth);
  
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const dayNames = ['Su', 'M', 'T', 'W', 'Th', 'F', 'Sa'];
  
  const isDateInRange = (day: number, month: number, year: number) => {
    if (!checkInDate || !checkOutDate) return false;
    
    const date = new Date(year, month, day);
    return date >= checkInDate && date <= checkOutDate;
  };
  
  const isCheckInDate = (day: number, month: number, year: number) => {
    if (!checkInDate) return false;
    
    const date = new Date(year, month, day);
    return date.getDate() === checkInDate.getDate() &&
           date.getMonth() === checkInDate.getMonth() &&
           date.getFullYear() === checkInDate.getFullYear();
  };
  
  const isCheckOutDate = (day: number, month: number, year: number) => {
    if (!checkOutDate) return false;
    
    const date = new Date(year, month, day);
    return date.getDate() === checkOutDate.getDate() &&
           date.getMonth() === checkOutDate.getMonth() &&
           date.getFullYear() === checkOutDate.getFullYear();
  };
  
  const handleDateClick = (day: number, month: number, year: number) => {
    const selectedDate = new Date(year, month, day);
    
    if (!checkInDate || (checkInDate && checkOutDate)) {
      onSelectCheckIn(selectedDate);
      onSelectCheckOut(null);
    } else {
      if (selectedDate < checkInDate) {
        onSelectCheckIn(selectedDate);
        onSelectCheckOut(checkInDate);
      } else {
        onSelectCheckOut(selectedDate);
      }
    }
  };
  
  const getPriceForDate = (day: number, month: number) => {
    if (month === 4) { // May
      if (day === 1) return 122;
      if (day === 2) return 162;
      if (day === 3) return 199;
      if (day === 4) return 193;
      if (day === 5) return 197;
      return 122 + (day % 5) * 10; // Simple pattern for other days
    } else { // June
      if (day === 1) return 157;
      if (day === 2) return 163;
      if (day === 3) return 108;
      return 120 + (day % 5) * 10; // Simple pattern for other days
    }
  };
  
  const renderCalendarDay = (day: number | null, month: number, year: number) => {
    if (day === null) return <div className="h-10"></div>;
    
    const isInRange = isDateInRange(day, month, year);
    const isCheckIn = isCheckInDate(day, month, year);
    const isCheckOut = isCheckOutDate(day, month, year);
    
    const isHighlighted = month === 4 && day === 15;
    
    const price = getPriceForDate(day, month);
    
    let cellClass = "flex flex-col items-center justify-center h-10 text-center border border-transparent";
    
    if (isHighlighted || isCheckIn || isCheckOut) {
      cellClass = "flex flex-col items-center justify-center h-10 text-center bg-indigo-900 text-white";
    } else if (isInRange) {
      cellClass = "flex flex-col items-center justify-center h-10 text-center bg-indigo-100";
    }
    
    return (
      <div 
        className={cellClass}
        onClick={() => handleDateClick(day, month, year)}
      >
        <div className="text-xs font-medium">{day}</div>
        <div className="text-xs">${price}</div>
      </div>
    );
  };
  
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-6">
        {/* May Calendar */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <button className="text-gray-400 px-1">
              &lt;
            </button>
            <div className="text-sm font-medium">
              {monthNames[firstMonth]} {currentYear}
            </div>
            <button className="text-gray-400 px-1">
              &gt;
            </button>
          </div>
          
          <div className="grid grid-cols-7 gap-0">
            {dayNames.map((day, index) => (
              <div key={index} className="text-center text-xs py-1 text-gray-300">{day}</div>
            ))}
            
            {firstMonthData.map((day, index) => (
              <div key={`may-${index}`} className="p-0.5">
                {renderCalendarDay(day, firstMonth, currentYear)}
              </div>
            ))}
          </div>
        </div>
        
        {/* June Calendar */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <button className="text-gray-400 px-1">
              &lt;
            </button>
            <div className="text-sm font-medium">
              {monthNames[secondMonth]} {currentYear}
            </div>
            <button className="text-gray-400 px-1">
              &gt;
            </button>
          </div>
          
          <div className="grid grid-cols-7 gap-0">
            {dayNames.map((day, index) => (
              <div key={index} className="text-center text-xs py-1 text-gray-300">{day}</div>
            ))}
            
            {secondMonthData.map((day, index) => (
              <div key={`june-${index}`} className="p-0.5">
                {renderCalendarDay(day, secondMonth, currentYear)}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="text-xs text-gray-400 mt-2 text-center">
        Prices are displayed in USD
        <br />
        Nightly rate: 0-4 days
      </div>
      
      <div className="flex justify-end">
        <Button 
          className="bg-indigo-900 hover:bg-indigo-800 text-white uppercase text-sm px-6"
          onClick={onApplyDates}
        >
          APPLY DATES
        </Button>
      </div>
    </div>
  );
};
