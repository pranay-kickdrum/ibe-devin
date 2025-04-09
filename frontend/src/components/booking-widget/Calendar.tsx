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
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  
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
  
  const currentMonthData = generateMonthData(currentYear, currentMonth);
  const nextMonthData = generateMonthData(
    currentMonth === 11 ? currentYear + 1 : currentYear,
    currentMonth === 11 ? 0 : currentMonth + 1
  );
  
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
  
  const renderCalendarDay = (day: number | null, month: number, year: number) => {
    if (day === null) return <div className="h-12"></div>;
    
    const isInRange = isDateInRange(day, month, year);
    const isCheckIn = isCheckInDate(day, month, year);
    const isCheckOut = isCheckOutDate(day, month, year);
    
    const price = Math.floor(Math.random() * 100) + 100;
    
    let cellClass = "flex flex-col items-center justify-center h-12 text-center";
    
    if (isCheckIn) {
      cellClass += " bg-indigo-900 text-white";
    } else if (isCheckOut) {
      cellClass += " bg-indigo-900 text-white";
    } else if (isInRange) {
      cellClass += " bg-indigo-200";
    } else {
      cellClass += " hover:bg-gray-100";
    }
    
    return (
      <div 
        className={cellClass}
        onClick={() => handleDateClick(day, month, year)}
      >
        <div className="text-xs">{day}</div>
        <div className="text-xs">${price}</div>
      </div>
    );
  };
  
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {/* Current Month Calendar */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <button className="text-gray-400">
              &lt;
            </button>
            <div className="text-sm font-medium">
              {monthNames[currentMonth]} {currentYear}
            </div>
            <button className="text-gray-400">
              &gt;
            </button>
          </div>
          
          <div className="grid grid-cols-7 gap-1">
            {dayNames.map((day, index) => (
              <div key={index} className="text-center text-xs py-1">{day}</div>
            ))}
            
            {currentMonthData.map((day, index) => (
              <div key={`current-${index}`}>
                {renderCalendarDay(day, currentMonth, currentYear)}
              </div>
            ))}
          </div>
        </div>
        
        {/* Next Month Calendar */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <button className="text-gray-400">
              &lt;
            </button>
            <div className="text-sm font-medium">
              {monthNames[currentMonth === 11 ? 0 : currentMonth + 1]} {currentMonth === 11 ? currentYear + 1 : currentYear}
            </div>
            <button className="text-gray-400">
              &gt;
            </button>
          </div>
          
          <div className="grid grid-cols-7 gap-1">
            {dayNames.map((day, index) => (
              <div key={index} className="text-center text-xs py-1">{day}</div>
            ))}
            
            {nextMonthData.map((day, index) => (
              <div key={`next-${index}`}>
                {renderCalendarDay(
                  day, 
                  currentMonth === 11 ? 0 : currentMonth + 1, 
                  currentMonth === 11 ? currentYear + 1 : currentYear
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="text-xs text-gray-400 mt-2">
        Prices are displayed in USD
        <br />
        Nightly rate: 0-4 days
      </div>
      
      <div className="flex justify-end">
        <Button 
          className="bg-indigo-900 hover:bg-indigo-800 text-white"
          onClick={onApplyDates}
        >
          APPLY DATES
        </Button>
      </div>
    </div>
  );
};
