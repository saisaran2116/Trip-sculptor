import React, { useState } from 'react';
import { Brain, Calendar, MapPin, Clock, Users, Send, Sparkles } from 'lucide-react';

const AIPlanner: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState<any>(null);

  const handleGeneratePlan = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    
    // Simulate AI processing
    setTimeout(() => {
      setGeneratedPlan({
        title: "7-Day Spiritual Journey in North India",
        days: [
          {
            day: 1,
            location: "Delhi",
            activities: ["Arrive in Delhi", "Visit Red Fort", "Explore Chandni Chowk"],
            accommodation: "Hotel Tara Palace",
            meals: "Local street food tour"
          },
          {
            day: 2,
            location: "Rishikesh",
            activities: ["Morning yoga session", "Ganga Aarti", "Adventure sports"],
            accommodation: "Riverside ashram",
            meals: "Vegetarian ashram meals"
          },
          {
            day: 3,
            location: "Haridwar",
            activities: ["Temple visits", "Holy dip in Ganges", "Local markets"],
            accommodation: "Heritage hotel",
            meals: "Traditional North Indian cuisine"
          }
        ]
      });
      setIsGenerating(false);
    }, 3000);
  };

  return (
    <section className="min-h-screen py-16 bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-full mb-6">
            <Brain className="h-5 w-5" />
            <span className="font-semibold">AI-Powered Trip Planning</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Create Your Perfect Itinerary
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Describe your dream trip and let our AI create a personalized itinerary with destinations, 
            activities, and accommodations tailored to your preferences.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* AI Prompt Input */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8">
            <form onSubmit={handleGeneratePlan}>
              <div className="mb-6">
                <label className="block text-lg font-semibold text-gray-700 mb-4">
                  <Sparkles className="inline h-5 w-5 mr-2 text-purple-600" />
                  Describe Your Ideal Trip
                </label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="I want a 7-day spiritual journey in North India for 2 people. I'm interested in temples, yoga, and authentic local experiences. I prefer comfortable accommodations and vegetarian food..."
                  className="w-full h-32 px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-gradient-to-r from-purple-100 to-purple-50 rounded-xl">
                  <Users className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-700">Group Size</p>
                  <p className="text-xs text-gray-500">1-10 people</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-r from-blue-100 to-blue-50 rounded-xl">
                  <Calendar className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-700">Duration</p>
                  <p className="text-xs text-gray-500">2-30 days</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-r from-green-100 to-green-50 rounded-xl">
                  <MapPin className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-700">Destinations</p>
                  <p className="text-xs text-gray-500">All India</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-r from-orange-100 to-orange-50 rounded-xl">
                  <Clock className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-700">Planning</p>
                  <p className="text-xs text-gray-500">Under 1 minute</p>
                </div>
              </div>

              <button
                type="submit"
                disabled={isGenerating || !prompt.trim()}
                className={`w-full py-4 px-8 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center space-x-2 ${
                  isGenerating || !prompt.trim()
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 shadow-lg'
                }`}
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Generating Your Perfect Trip...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    <span>Generate AI Itinerary</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Generated Itinerary */}
          {generatedPlan && (
            <div className="bg-white rounded-3xl shadow-2xl p-8">
              <div className="text-center mb-8">
                <div className="inline-flex items-center space-x-2 bg-green-100 text-green-700 px-4 py-2 rounded-full mb-4">
                  <Sparkles className="h-4 w-4" />
                  <span className="font-medium">AI Generated</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  {generatedPlan.title}
                </h2>
              </div>

              <div className="space-y-6">
                {generatedPlan.days.map((day: any, index: number) => (
                  <div key={index} className="bg-gradient-to-r from-gray-50 to-white rounded-2xl p-6 border border-gray-100">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">
                        {day.day}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{day.location}</h3>
                        <p className="text-gray-600">Day {day.day}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-700 mb-2">Activities</h4>
                        <ul className="space-y-1">
                          {day.activities.map((activity: string, idx: number) => (
                            <li key={idx} className="text-gray-600 text-sm">• {activity}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-700 mb-2">Accommodation</h4>
                        <p className="text-gray-600 text-sm">{day.accommodation}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-700 mb-2">Meals</h4>
                        <p className="text-gray-600 text-sm">{day.meals}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <button className="flex-1 bg-gradient-to-r from-green-500 to-teal-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-green-600 hover:to-teal-700 transition-all duration-300">
                  Download PDF Itinerary
                </button>
                <button className="flex-1 border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300">
                  Modify Itinerary
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AIPlanner;