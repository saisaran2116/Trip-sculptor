import React, { useState } from 'react';
import { MapPin, Star, Calendar, Heart, Filter } from 'lucide-react';

const FeaturedDestinations: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const destinations = [
    {
      id: 1,
      name: 'Varanasi',
      state: 'Uttar Pradesh',
      type: 'devotional',
      bestMonth: 'October - March',
      rating: 4.8,
      image: 'https://images.pexels.com/photos/1007426/pexels-photo-1007426.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'One of the world\'s oldest cities, perfect for spiritual seekers.'
    },
    {
      id: 2,
      name: 'Manali',
      state: 'Himachal Pradesh',
      type: 'chill',
      bestMonth: 'April - June',
      rating: 4.7,
      image: 'https://images.pexels.com/photos/1586298/pexels-photo-1586298.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Scenic hill station with snow-capped mountains and adventure sports.'
    },
    {
      id: 3,
      name: 'Goa',
      state: 'Goa',
      type: 'chill',
      bestMonth: 'November - February',
      rating: 4.6,
      image: 'https://images.pexels.com/photos/962464/pexels-photo-962464.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Tropical paradise with pristine beaches and vibrant nightlife.'
    },
    {
      id: 4,
      name: 'Rishikesh',
      state: 'Uttarakhand',
      type: 'devotional',
      bestMonth: 'September - April',
      rating: 4.9,
      image: 'https://images.pexels.com/photos/3601093/pexels-photo-3601093.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Yoga capital of the world, situated on the banks of holy Ganges.'
    },
    {
      id: 5,
      name: 'Jaipur',
      state: 'Rajasthan',
      type: 'cultural',
      bestMonth: 'October - March',
      rating: 4.5,
      image: 'https://images.pexels.com/photos/1603650/pexels-photo-1603650.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Pink City with magnificent palaces and rich Rajasthani culture.'
    },
    {
      id: 6,
      name: 'Munnar',
      state: 'Kerala',
      type: 'chill',
      bestMonth: 'September - March',
      rating: 4.8,
      image: 'https://images.pexels.com/photos/3586966/pexels-photo-3586966.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Tea gardens, misty mountains, and serene backwaters.'
    }
  ];

  const filters = [
    { id: 'all', name: 'All Destinations', icon: MapPin },
    { id: 'devotional', name: 'Devotional', icon: Heart },
    { id: 'chill', name: 'Leisure', icon: Filter },
    { id: 'cultural', name: 'Cultural', icon: Star }
  ];

  const filteredDestinations = selectedFilter === 'all' 
    ? destinations 
    : destinations.filter(dest => dest.type === selectedFilter);

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured Destinations
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover India's most captivating destinations, from spiritual havens to scenic getaways.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filters.map((filter) => {
            const IconComponent = filter.icon;
            return (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedFilter === filter.id
                    ? 'bg-gradient-to-r from-orange-500 to-teal-600 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:text-orange-600 hover:bg-orange-50 shadow-md border border-gray-200'
                }`}
              >
                <IconComponent className="h-4 w-4" />
                <span>{filter.name}</span>
              </button>
            );
          })}
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDestinations.map((destination) => (
            <div
              key={destination.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer transform hover:scale-105"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-semibold text-gray-800">{destination.rating}</span>
                </div>
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    destination.type === 'devotional' 
                      ? 'bg-orange-100 text-orange-700'
                      : destination.type === 'chill'
                      ? 'bg-teal-100 text-teal-700'
                      : 'bg-blue-100 text-blue-700'
                  }`}>
                    {destination.type === 'devotional' ? '🙏 Devotional' : 
                     destination.type === 'chill' ? '🏖️ Leisure' : '🏛️ Cultural'}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-gray-900">{destination.name}</h3>
                  <span className="text-sm text-gray-500">{destination.state}</span>
                </div>
                
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  {destination.description}
                </p>

                <div className="flex items-center justify-between text-sm mb-4">
                  <div className="flex items-center space-x-1 text-gray-500">
                    <Calendar className="h-4 w-4" />
                    <span>{destination.bestMonth}</span>
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-orange-500 to-teal-600 text-white py-2 px-4 rounded-xl font-medium hover:from-orange-600 hover:to-teal-700 transition-all duration-300">
                  Explore Destination
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-white text-orange-600 border-2 border-orange-600 hover:bg-orange-600 hover:text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105">
            View All 200+ Destinations
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedDestinations;