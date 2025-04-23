import React, { useState } from 'react';

export const RoomFilters: React.FC = () => {
  const [expandedSections, setExpandedSections] = useState({
    bedType: true,
    filter1: false,
    filter2: false,
    filter3: false
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="bg-white rounded shadow p-4">
      <h2 className="font-bold text-sm mb-4">Narrow your results</h2>
      
      {/* Filter 1 */}
      <div className="mb-3">
        <div 
          className="flex justify-between items-center cursor-pointer mb-2"
          onClick={() => toggleSection('filter1')}
        >
          <h3 className="text-sm font-medium">Filter name</h3>
          <svg 
            className={`w-4 h-4 transition-transform ${expandedSections.filter1 ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        {expandedSections.filter1 && (
          <div className="pl-2">
            {/* Filter content */}
          </div>
        )}
      </div>
      
      {/* Bed Type */}
      <div className="mb-3">
        <div 
          className="flex justify-between items-center cursor-pointer mb-2"
          onClick={() => toggleSection('bedType')}
        >
          <h3 className="text-sm font-medium">Bed type</h3>
          <svg 
            className={`w-4 h-4 transition-transform ${expandedSections.bedType ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        {expandedSections.bedType && (
          <div className="pl-2">
            <div className="flex items-center mb-2">
              <input 
                type="checkbox" 
                id="queenBeds" 
                className="mr-2"
              />
              <label htmlFor="queenBeds" className="text-sm">2 Queen beds</label>
            </div>
          </div>
        )}
      </div>
      
      {/* Filter 2 */}
      <div className="mb-3">
        <div 
          className="flex justify-between items-center cursor-pointer mb-2"
          onClick={() => toggleSection('filter2')}
        >
          <h3 className="text-sm font-medium">Filter name</h3>
          <svg 
            className={`w-4 h-4 transition-transform ${expandedSections.filter2 ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        {expandedSections.filter2 && (
          <div className="pl-2">
            {/* Filter content */}
          </div>
        )}
      </div>
      
      {/* Filter 3 */}
      <div className="mb-3">
        <div 
          className="flex justify-between items-center cursor-pointer mb-2"
          onClick={() => toggleSection('filter3')}
        >
          <h3 className="text-sm font-medium">Filter name</h3>
          <svg 
            className={`w-4 h-4 transition-transform ${expandedSections.filter3 ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        {expandedSections.filter3 && (
          <div className="pl-2">
            {/* Filter content */}
          </div>
        )}
      </div>
    </div>
  );
};
