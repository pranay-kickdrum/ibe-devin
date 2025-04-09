import React, { useState } from 'react';

interface PropertySearchProps {
  selectedProperty: string;
  onSelectProperty: (property: string) => void;
}

export const PropertySearch: React.FC<PropertySearchProps> = ({
  selectedProperty,
  onSelectProperty
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  
  const properties = [
    'Property 1',
    'Property 2',
    'Property 3',
    'Property Resort Name'
  ];
  
  const filteredProperties = properties.filter(property => 
    property.toLowerCase().includes(searchText.toLowerCase())
  );
  
  const handleSelectProperty = (property: string) => {
    onSelectProperty(property);
    setIsDropdownOpen(false);
  };
  
  return (
    <div className="relative">
      <div className="text-sm font-medium mb-1">Property name*</div>
      <div 
        className="relative border border-gray-300 rounded bg-white"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <input
          type="text"
          className="w-full p-2 text-gray-700 rounded outline-none"
          placeholder="Search all properties"
          value={selectedProperty || searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
            setIsDropdownOpen(true);
          }}
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      
      {isDropdownOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg">
          {filteredProperties.length > 0 ? (
            filteredProperties.map((property, index) => (
              <div 
                key={index}
                className="p-2 hover:bg-gray-100 cursor-pointer flex items-center"
                onClick={() => handleSelectProperty(property)}
              >
                <input 
                  type="checkbox" 
                  className="mr-2" 
                  checked={property === selectedProperty}
                  readOnly
                />
                {property}
              </div>
            ))
          ) : (
            <div className="p-2 text-gray-500">No properties found</div>
          )}
        </div>
      )}
    </div>
  );
};
