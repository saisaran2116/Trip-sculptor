import React, { useState } from 'react';
import { Hotel, Star, Wifi, Car, Coffee, MapPin, Search } from 'lucide-react';

interface HotelData {
  id: string;
  name: string;
  image: string;
  deal: string;
  rating: number;
  location: string;
  amenities: string[];
  price: number;
  originalPrice: number;
}

const HotelBooking: React.FC = () => {
  const [destination, setDestination] = useState('');
  const [loading, setLoading] = useState(false);
  const [hotels, setHotels] = useState<HotelData[]>([]);
  const [error, setError] = useState<string | null>(null);

  const amenityIcons = {
    wifi: Wifi,
    parking: Car,
    restaurant: Coffee,
    spa: Star,
    pool: Hotel,
    beach: MapPin,
    yoga: Star,
    riverside: MapPin,
    vegetarian: Coffee,
    heritage: Star,
    cultural: Star,
    common: Hotel,
    kitchen: Coffee,
    lockers: Hotel
  };

  const handleSearch = async () => {
    if (!destination.trim()) {
      setError('Please enter a destination');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      console.log('Starting hotel search for:', destination);
      
      const response = await fetch(`http://localhost:5000/api/hotels/search?destination=${encodeURIComponent(destination)}`);
      if (!response.ok) {
        throw new Error('Failed to fetch hotels');
      }

      const data = await response.json();
      console.log('Hotels data:', data);
      
      if (data.status && Array.isArray(data.results)) {
        setHotels(data.results);
      } else {
        setHotels([]);
        setError(data.message || 'No hotels found');
      }
    } catch (error) {
      console.error('Error searching hotels:', error);
      setError('Failed to search hotels. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen py-16 bg-gradient-to-br from-blue-50 via-white to-teal-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-teal-600 text-white px-6 py-3 rounded-full mb-6">
            <Hotel className="h-5 w-5" />
            <span className="font-semibold">Hotel Booking</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Find Perfect Stays
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover amazing hotels in your chosen destination. 
            From luxury resorts to cozy stays.
          </p>
        </div>

        {/* Search Form */}
        <div className="max-w-5xl mx-auto mb-12">
          <div className="bg-white rounded-3xl shadow-2xl p-8">
            <div className="flex items-center gap-4">
              <div className="flex-grow">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <MapPin className="inline h-4 w-4 mr-1 text-blue-500" />
                  Destination
                </label>
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="Where would you like to stay?"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button 
                onClick={handleSearch}
                className="mt-6 bg-gradient-to-r from-blue-500 to-teal-600 text-white py-3 px-8 rounded-xl font-semibold hover:from-blue-600 hover:to-teal-700 transition-all duration-300 flex items-center space-x-2"
              >
                <Search className="h-5 w-5" />
                <span>Search Hotels</span>
              </button>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="max-w-5xl mx-auto mb-4">
            <div className="bg-red-100 text-red-700 rounded-lg py-3 px-4 text-sm font-semibold flex items-center justify-between">
              <p className="m-0">{error}</p>
              <button 
                onClick={() => setError(null)} 
                className="text-red-700 hover:text-red-900"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Searching for hotels...</p>
          </div>
        )}

        {/* Hotels Grid */}
        {!loading && hotels.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hotels.map((hotel) => (
              <div
                key={hotel.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {hotel.deal}
                  </div>
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-semibold text-gray-800">{hotel.rating}</span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{hotel.name}</h3>
                  <p className="text-gray-600 text-sm mb-4 flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {hotel.location}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {hotel.amenities.map((amenity) => {
                      const IconComponent = amenityIcons[amenity as keyof typeof amenityIcons];
                      return (
                        <div key={amenity} className="flex items-center space-x-1 bg-gray-100 px-2 py-1 rounded-full text-xs">
                          <IconComponent className="h-3 w-3 text-gray-600" />
                          <span className="text-gray-600 capitalize">{amenity}</span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-2xl font-bold text-gray-900">₹{hotel.price.toLocaleString()}</span>
                      <span className="text-sm text-gray-500 line-through ml-2">₹{hotel.originalPrice.toLocaleString()}</span>
                      <p className="text-xs text-gray-500">per night</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-green-600">
                        Save ₹{(hotel.originalPrice - hotel.price).toLocaleString()}
                      </div>
                    </div>
                  </div>

                  <button className="w-full bg-gradient-to-r from-blue-500 to-teal-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-blue-600 hover:to-teal-700 transition-all duration-300">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No Results State */}
        {!loading && hotels.length === 0 && destination && (
          <div className="text-center py-8">
            <p className="text-gray-600">No hotels found for "{destination}". Try a different destination.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default HotelBooking;