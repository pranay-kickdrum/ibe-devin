import React, { useState, useEffect } from 'react';
import { RoomFilters } from './RoomFilters';
import { RoomCard } from './RoomCard';
import { ProgressSteps } from './ProgressSteps';

interface Room {
  id: number;
  name: string;
  rating: number;
  reviews: number;
  bedType: string;
  price: number;
  nearProperty: boolean;
  specialOffer?: string;
  image: string;
  amenities: string[];
}

interface FilterValues {
  priceMin: number;
  priceMax: number;
  bedTypes: string[];
  amenities: string[];
  guestRating: number | null;
}

export const RoomResultsPage: React.FC = () => {
  const allRoomData: Room[] = [
    {
      id: 1,
      name: 'Long Beautiful Resort Name',
      rating: 4.5,
      reviews: 128,
      bedType: '2 Queen beds',
      price: 132,
      nearProperty: false,
      specialOffer: 'Special offer: 3rd night free, 2+ nights',
      image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
      amenities: ['Free WiFi', 'Free Breakfast', 'Swimming Pool']
    },
    {
      id: 2,
      name: 'Long Beautiful Resort Name',
      rating: 3.5,
      reviews: 128,
      bedType: '1 King bed',
      price: 145,
      nearProperty: true,
      image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
      amenities: ['Free WiFi', 'Free Parking', 'Spa']
    },
    {
      id: 3,
      name: 'Long Beautiful Resort Name',
      rating: 3.0,
      reviews: 128,
      bedType: '2 Double beds',
      price: 120,
      nearProperty: true,
      image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      amenities: ['Free WiFi', 'Swimming Pool']
    },
    {
      id: 4,
      name: 'Long Beautiful Resort Name',
      rating: 4.0,
      reviews: 95,
      bedType: '2 Queen beds',
      price: 160,
      nearProperty: false,
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      amenities: ['Free WiFi', 'Free Breakfast', 'Free Parking', 'Spa']
    },
    {
      id: 5,
      name: 'Long Beautiful Resort Name',
      rating: 2.5,
      reviews: 72,
      bedType: '1 King bed',
      price: 110,
      nearProperty: false,
      image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      amenities: ['Free WiFi']
    },
    {
      id: 6,
      name: 'Long Beautiful Resort Name',
      rating: 5.0,
      reviews: 210,
      bedType: '2 Queen beds',
      price: 220,
      nearProperty: true,
      specialOffer: 'Special offer: Complimentary breakfast',
      image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      amenities: ['Free WiFi', 'Free Breakfast', 'Free Parking', 'Swimming Pool', 'Spa']
    },
    {
      id: 7,
      name: 'Long Beautiful Resort Name',
      rating: 3.5,
      reviews: 150,
      bedType: '2 Double beds',
      price: 135,
      nearProperty: false,
      image: 'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
      amenities: ['Free WiFi', 'Swimming Pool']
    },
    {
      id: 8,
      name: 'Long Beautiful Resort Name',
      rating: 4.0,
      reviews: 180,
      bedType: '1 King bed',
      price: 175,
      nearProperty: true,
      image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      amenities: ['Free WiFi', 'Free Breakfast', 'Free Parking']
    },
    {
      id: 9,
      name: 'Long Beautiful Resort Name',
      rating: 3.0,
      reviews: 90,
      bedType: '2 Queen beds',
      price: 125,
      nearProperty: false,
      image: 'https://images.unsplash.com/photo-1587985064135-0366536eab42?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      amenities: ['Free WiFi', 'Swimming Pool']
    }
  ];

  const [filteredRooms, setFilteredRooms] = useState<Room[]>(allRoomData.slice(0, 3));
  const [activeFilters, setActiveFilters] = useState<FilterValues>({
    priceMin: 0,
    priceMax: 300,
    bedTypes: [],
    amenities: [],
    guestRating: null
  });
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const roomsPerPage = 3;

  useEffect(() => {
    let result = [...allRoomData];
    
    result = result.filter(room => 
      room.price >= activeFilters.priceMin && 
      room.price <= activeFilters.priceMax
    );
    
    if (activeFilters.bedTypes.length > 0) {
      result = result.filter(room => 
        activeFilters.bedTypes.includes(room.bedType)
      );
    }
    
    if (activeFilters.amenities.length > 0) {
      result = result.filter(room => 
        activeFilters.amenities.every(amenity => 
          room.amenities.includes(amenity)
        )
      );
    }
    
    if (activeFilters.guestRating !== null) {
      result = result.filter(room => 
        room.rating >= (activeFilters.guestRating as number)
      );
    }
    
    result.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
    
    setFilteredRooms(result);
    setCurrentPage(1);
  }, [activeFilters, sortOrder]);

  const handleFilterChange = (filters: FilterValues) => {
    setActiveFilters(filters);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value as 'asc' | 'desc');
  };

  const indexOfLastRoom = currentPage * roomsPerPage;
  const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
  const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom);
  const totalPages = Math.ceil(filteredRooms.length / roomsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

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
          <RoomFilters onFilterChange={handleFilterChange} />
        </div>

        {/* Results */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-4">
            <div className="text-sm text-gray-600">
              Showing {indexOfFirstRoom + 1}-{Math.min(indexOfLastRoom, filteredRooms.length)} of {filteredRooms.length} Results
            </div>
            <div className="flex items-center">
              <span className="text-sm mr-2">Price</span>
              <select 
                className="border rounded p-1 text-sm"
                value={sortOrder}
                onChange={handleSortChange}
              >
                <option value="asc">Low to High</option>
                <option value="desc">High to Low</option>
              </select>
            </div>
          </div>

          {currentRooms.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {currentRooms.map(room => (
                <RoomCard key={room.id} room={room} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No rooms match your current filters.</p>
              <button 
                className="mt-4 bg-indigo-900 text-white px-4 py-2 rounded text-sm"
                onClick={() => {
                  const resetFilters = {
                    priceMin: 0,
                    priceMax: 300,
                    bedTypes: [],
                    amenities: [],
                    guestRating: null
                  };
                  setActiveFilters(resetFilters);
                }}
              >
                Reset Filters
              </button>
            </div>
          )}

          {/* Pagination */}
          {filteredRooms.length > roomsPerPage && (
            <div className="flex justify-center mt-6">
              <div className="flex space-x-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    className={`px-3 py-1 rounded ${
                      currentPage === page
                        ? 'bg-indigo-900 text-white'
                        : 'bg-gray-200 text-gray-700'
                    }`}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </button>
                ))}
              </div>
            </div>
          )}
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
