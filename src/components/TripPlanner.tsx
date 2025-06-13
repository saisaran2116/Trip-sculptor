import React, { useState } from 'react';
import { Search, Calendar, MapPin, Heart, Mountain } from 'lucide-react';

const TripPlanner: React.FC = () => {
  const [formData, setFormData] = useState({
    month: '',
    tripType: '',
    duration: ''
  });

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle trip planning logic
    console.log('Trip planning data:', formData);
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Plan Your Perfect Indian Adventure
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Tell us your preferences and we'll suggest the best destinations and experiences tailored just for you.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Month Selection */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  <Calendar className="inline h-4 w-4 mr-2 text-orange-500" />
                  Travel Month
                </label>
                <select
                  value={formData.month}
                  onChange={(e) => setFormData({ ...formData, month: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="">Select Month</option>
                  {months.map((month) => (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
              </div>

              {/* Trip Type */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  <Heart className="inline h-4 w-4 mr-2 text-orange-500" />
                  Trip Type
                </label>
                <select
                  value={formData.tripType}
                  onChange={(e) => setFormData({ ...formData, tripType: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="">Select Type</option>
                  <option value="devotional">🙏 Devotional</option>
                  <option value="chill">🏖️ Leisure & Chill</option>
                  <option value="adventure">🏔️ Adventure</option>
                  <option value="cultural">🏛️ Cultural</option>
                </select>
              </div>

              {/* Duration */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  <MapPin className="inline h-4 w-4 mr-2 text-orange-500" />
                  Duration
                </label>
                <select
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="">Select Duration</option>
                  <option value="weekend">Weekend (2-3 days)</option>
                  <option value="short">Short Trip (4-6 days)</option>
                  <option value="week">Week Long (7-10 days)</option>
                  <option value="extended">Extended (10+ days)</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-8 bg-gradient-to-r from-orange-500 to-teal-600 text-white py-4 px-8 rounded-xl font-semibold text-lg hover:from-orange-600 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2"
            >
              <Search className="h-5 w-5" />
              <span>Find Perfect Destinations</span>
            </button>
          </form>

          {/* Quick Suggestions */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-orange-100 to-orange-50 rounded-2xl p-6 border border-orange-200 hover:shadow-lg transition-all duration-300 cursor-pointer">
              <Mountain className="h-8 w-8 text-orange-600 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Hill Stations</h3>
              <p className="text-gray-600 text-sm">Perfect for summer months. Cool weather, scenic views, and peaceful retreats.</p>
            </div>
            <div className="bg-gradient-to-br from-teal-100 to-teal-50 rounded-2xl p-6 border border-teal-200 hover:shadow-lg transition-all duration-300 cursor-pointer">
              <Heart className="h-8 w-8 text-teal-600 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Spiritual Journey</h3>
              <p className="text-gray-600 text-sm">Sacred temples, holy rivers, and pilgrimage circuits across India.</p>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl p-6 border border-blue-200 hover:shadow-lg transition-all duration-300 cursor-pointer">
              <MapPin className="h-8 w-8 text-blue-600 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Beach Destinations</h3>
              <p className="text-gray-600 text-sm">Coastal getaways with pristine beaches and water activities.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TripPlanner;