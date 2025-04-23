import React, { useState } from 'react';

interface FilterSections {
  priceRange: boolean;
  bedType: boolean;
  amenities: boolean;
  guestRating: boolean;
}

interface FilterValues {
  priceMin: number;
  priceMax: number;
  bedTypes: string[];
  amenities: string[];
  guestRating: number | null;
}

interface RoomFiltersProps {
  onFilterChange: (filters: FilterValues) => void;
}

export const RoomFilters: React.FC<RoomFiltersProps> = ({ onFilterChange }) => {
  const [expandedSections, setExpandedSections] = useState<FilterSections>({
    priceRange: true,
    bedType: true,
    amenities: false,
    guestRating: false
  });

  const [filters, setFilters] = useState<FilterValues>({
    priceMin: 0,
    priceMax: 300,
    bedTypes: [],
    amenities: [],
    guestRating: null
  });

  const toggleSection = (section: keyof FilterSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handlePriceChange = (min: number, max: number) => {
    const newFilters = { ...filters, priceMin: min, priceMax: max };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleBedTypeChange = (bedType: string, checked: boolean) => {
    let newBedTypes = [...filters.bedTypes];
    
    if (checked) {
      newBedTypes.push(bedType);
    } else {
      newBedTypes = newBedTypes.filter(type => type !== bedType);
    }
    
    const newFilters = { ...filters, bedTypes: newBedTypes };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleAmenityChange = (amenity: string, checked: boolean) => {
    let newAmenities = [...filters.amenities];
    
    if (checked) {
      newAmenities.push(amenity);
    } else {
      newAmenities = newAmenities.filter(a => a !== amenity);
    }
    
    const newFilters = { ...filters, amenities: newAmenities };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleRatingChange = (rating: number | null) => {
    const newFilters = { ...filters, guestRating: rating };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const renderCheckbox = (id: string, label: string, checked: boolean, onChange: (checked: boolean) => void) => (
    <div className="flex items-center mb-2">
      <input 
        type="checkbox" 
        id={id} 
        className="mr-2"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <label htmlFor={id} className="text-sm">{label}</label>
    </div>
  );

  return (
    <div className="bg-white rounded shadow p-4">
      <h2 className="font-bold text-sm mb-4">Narrow your results</h2>
      
      {/* Price Range */}
      <div className="mb-3">
        <div 
          className="flex justify-between items-center cursor-pointer mb-2"
          onClick={() => toggleSection('priceRange')}
        >
          <h3 className="text-sm font-medium">Price Range</h3>
          <svg 
            className={`w-4 h-4 transition-transform ${expandedSections.priceRange ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        {expandedSections.priceRange && (
          <div className="pl-2">
            <div className="mb-2">
              <div className="flex justify-between mb-1">
                <span className="text-xs">${filters.priceMin}</span>
                <span className="text-xs">${filters.priceMax}</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="300" 
                value={filters.priceMax} 
                className="w-full"
                onChange={(e) => handlePriceChange(filters.priceMin, parseInt(e.target.value))}
              />
            </div>
            <div className="flex justify-between">
              <button 
                className="text-xs bg-gray-200 px-2 py-1 rounded"
                onClick={() => handlePriceChange(0, 100)}
              >
                $0-$100
              </button>
              <button 
                className="text-xs bg-gray-200 px-2 py-1 rounded"
                onClick={() => handlePriceChange(100, 200)}
              >
                $100-$200
              </button>
              <button 
                className="text-xs bg-gray-200 px-2 py-1 rounded"
                onClick={() => handlePriceChange(200, 300)}
              >
                $200+
              </button>
            </div>
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
            {renderCheckbox(
              "queenBeds", 
              "2 Queen beds", 
              filters.bedTypes.includes("2 Queen beds"),
              (checked) => handleBedTypeChange("2 Queen beds", checked)
            )}
            {renderCheckbox(
              "kingBed", 
              "1 King bed", 
              filters.bedTypes.includes("1 King bed"),
              (checked) => handleBedTypeChange("1 King bed", checked)
            )}
            {renderCheckbox(
              "doubleBeds", 
              "2 Double beds", 
              filters.bedTypes.includes("2 Double beds"),
              (checked) => handleBedTypeChange("2 Double beds", checked)
            )}
          </div>
        )}
      </div>
      
      {/* Amenities */}
      <div className="mb-3">
        <div 
          className="flex justify-between items-center cursor-pointer mb-2"
          onClick={() => toggleSection('amenities')}
        >
          <h3 className="text-sm font-medium">Amenities</h3>
          <svg 
            className={`w-4 h-4 transition-transform ${expandedSections.amenities ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        {expandedSections.amenities && (
          <div className="pl-2">
            {renderCheckbox(
              "wifi", 
              "Free WiFi", 
              filters.amenities.includes("Free WiFi"),
              (checked) => handleAmenityChange("Free WiFi", checked)
            )}
            {renderCheckbox(
              "breakfast", 
              "Free Breakfast", 
              filters.amenities.includes("Free Breakfast"),
              (checked) => handleAmenityChange("Free Breakfast", checked)
            )}
            {renderCheckbox(
              "parking", 
              "Free Parking", 
              filters.amenities.includes("Free Parking"),
              (checked) => handleAmenityChange("Free Parking", checked)
            )}
            {renderCheckbox(
              "pool", 
              "Swimming Pool", 
              filters.amenities.includes("Swimming Pool"),
              (checked) => handleAmenityChange("Swimming Pool", checked)
            )}
            {renderCheckbox(
              "spa", 
              "Spa", 
              filters.amenities.includes("Spa"),
              (checked) => handleAmenityChange("Spa", checked)
            )}
          </div>
        )}
      </div>
      
      {/* Guest Rating */}
      <div className="mb-3">
        <div 
          className="flex justify-between items-center cursor-pointer mb-2"
          onClick={() => toggleSection('guestRating')}
        >
          <h3 className="text-sm font-medium">Guest Rating</h3>
          <svg 
            className={`w-4 h-4 transition-transform ${expandedSections.guestRating ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        {expandedSections.guestRating && (
          <div className="pl-2">
            <div className="flex flex-col space-y-2">
              {[4, 3, 2, 1].map(rating => (
                <button 
                  key={rating}
                  className={`text-xs text-left py-1 px-2 rounded ${filters.guestRating === rating ? 'bg-indigo-100 text-indigo-800' : 'bg-gray-100'}`}
                  onClick={() => handleRatingChange(rating)}
                >
                  {rating}+ Stars
                </button>
              ))}
              <button 
                className={`text-xs text-left py-1 px-2 rounded ${filters.guestRating === null ? 'bg-indigo-100 text-indigo-800' : 'bg-gray-100'}`}
                onClick={() => handleRatingChange(null)}
              >
                Any Rating
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Clear Filters Button */}
      <button 
        className="w-full bg-gray-200 text-gray-800 text-sm py-2 rounded mt-2"
        onClick={() => {
          const resetFilters = {
            priceMin: 0,
            priceMax: 300,
            bedTypes: [],
            amenities: [],
            guestRating: null
          };
          setFilters(resetFilters);
          onFilterChange(resetFilters);
        }}
      >
        Clear All Filters
      </button>
    </div>
  );
};
