import React, { useState } from 'react';
import { Hotel, Star, Wifi, Car, Coffee, MapPin, Search } from 'lucide-react';

const HotelBooking: React.FC = () => {
  const [searchData, setSearchData] = useState({
    destination: '',
    checkIn: '',
    checkOut: '',
    guests: 2
  });

  const hotels = [
    {
      id: 1,
      name: 'Taj Palace Delhi',
      location: 'New Delhi',
      rating: 4.8,
      price: 8500,
      originalPrice: 12000,
      image: 'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=600',
      amenities: ['wifi', 'parking', 'restaurant', 'spa'],
      deal: '30% OFF - Limited Time',
      type: 'luxury'
    },
    {
      id: 2,
      name: 'OYO Hotel Manali Heights',
      location: 'Manali, Himachal Pradesh',
      rating: 4.2,
      price: 2500,
      originalPrice: 3500,
      image: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=600',
      amenities: ['wifi', 'parking', 'restaurant'],
      deal: 'Best Price Guarantee',
      type: 'mid'
    },
    {
      id: 3,
      name: 'Ganga Kinare Hotel',
      location: 'Rishikesh, Uttarakhand',
      rating: 4.6,
      price: 4200,
      originalPrice: 5500,
      image: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=600',
      amenities: ['wifi', 'yoga', 'riverside', 'vegetarian'],
      deal: 'Yoga Package Included',
      type: 'mid'
    },
    {
      id: 4,
      name: 'Beach Resort Goa',
      location: 'Calangute, Goa',
      rating: 4.4,
      price: 6800,
      originalPrice: 9000,
      image: 'https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?auto=compress&cs=tinysrgb&w=600',
      amenities: ['wifi', 'pool', 'beach', 'restaurant'],
      deal: 'Beachfront Special',
      type: 'premium'
    },
    {
      id: 5,
      name: 'Heritage Haveli Jaipur',
      location: 'Jaipur, Rajasthan',
      rating: 4.7,
      price: 5500,
      originalPrice: 7200,
      image: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=600',
      amenities: ['wifi', 'heritage', 'restaurant', 'cultural'],
      deal: 'Royal Experience Package',
      type: 'premium'
    },
    {
      id: 6,
      name: 'Backpacker Hostel Mumbai',
      location: 'Mumbai, Maharashtra',
      rating: 4.0,
      price: 1200,
      originalPrice: 1800,
      image: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=600',
      amenities: ['wifi', 'common', 'kitchen', 'lockers'],
      deal: 'Backpacker Special',
      type: 'budget'
    }
  ];

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

  return (
    <section className="min-h-screen py-16 bg-gradient-to-br from-blue-50 via-white to-teal-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-teal-600 text-white px-6 py-3 rounded-full mb-6">
            <Hotel className="h-5 w-5" />
            <span className="font-semibold">Hotel Booking</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Find Perfect Stays
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover amazing hotels with the best deals near your chosen destinations. 
            From luxury resorts to cozy stays.
          </p>
        </div>

        {/* Search Form */}
        <div className="max-w-5xl mx-auto mb-12">
          <div className="bg-white rounded-3xl shadow-2xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="lg:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <MapPin className="inline h-4 w-4 mr-1 text-blue-500" />
                  Destination
                </label>
                <input
                  type="text"
                  value={searchData.destination}
                  onChange={(e) => setSearchData({ ...searchData, destination: e.target.value })}
                  placeholder="Where are you going?"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Check-in</label>
                <input
                  type="date"
                  value={searchData.checkIn}
                  onChange={(e) => setSearchData({ ...searchData, checkIn: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Check-out</label>
                <input
                  type="date"
                  value={searchData.checkOut}
                  onChange={(e) => setSearchData({ ...searchData, checkOut: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Guests</label>
                <select
                  value={searchData.guests}
                  onChange={(e) => setSearchData({ ...searchData, guests: parseInt(e.target.value) })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value={1}>1 Guest</option>
                  <option value={2}>2 Guests</option>
                  <option value={3}>3 Guests</option>
                  <option value={4}>4+ Guests</option>
                </select>
              </div>
            </div>

            <button className="w-full mt-6 bg-gradient-to-r from-blue-500 to-teal-600 text-white py-3 px-8 rounded-xl font-semibold hover:from-blue-600 hover:to-teal-700 transition-all duration-300 flex items-center justify-center space-x-2">
              <Search className="h-5 w-5" />
              <span>Search Hotels</span>
            </button>
          </div>
        </div>

        {/* Hotels Grid */}
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
                  {hotel.amenities.slice(0, 4).map((amenity) => {
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
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">Need help finding the perfect hotel?</p>
          <button className="bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 rounded-full font-semibold transition-all duration-300">
            Contact Our Travel Experts
          </button>
        </div>
      </div>
    </section>
  );
};

export default HotelBooking;