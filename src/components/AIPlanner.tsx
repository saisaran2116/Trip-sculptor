import React, { useState, useRef } from 'react';
import { Brain, Calendar, MapPin, Clock, Users, Send, Sparkles, ChevronDown, ChevronUp, Hotel, Utensils, Share2, Download, AlertCircle } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface DayActivity {
  activity: string;
  cost: number;
  note?: string;
}

interface ItineraryDay {
  day: number;
  location: string;
  activities: DayActivity[];
  accommodation: string;
  accommodationCost: number;
  accommodationNote?: string;
  meals: string;
  mealsCost: number;
  transportCost: number;
  transportNote?: string;
}

interface ItineraryPlan {
  title: string;
  startDate: string;
  endDate: string;
  totalBudget: number;
  feasibility: boolean;
  reason?: string;
  days: ItineraryDay[];
}

const generateItinerary = async (prompt: string): Promise<ItineraryPlan> => {
  const response = await fetch('http://localhost:5000/api/ai/generate-itinerary', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ prompt })
  });

  if (!response.ok) {
    throw new Error('Failed to generate itinerary');
  }

  const result = await response.json();
  if (!result.status || !result.data) {
    throw new Error(result.message || 'Failed to generate itinerary');
  }

  return result.data;
};

const AIPlanner: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState<ItineraryPlan | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [expandedDays, setExpandedDays] = useState<number[]>([]);
  const itineraryRef = useRef<HTMLDivElement>(null);

  const toggleDay = (dayNumber: number) => {
    setExpandedDays(prev => 
      prev.includes(dayNumber) 
        ? prev.filter(d => d !== dayNumber)
        : [...prev, dayNumber]
    );
  };

  // Calculate total costs
  const calculateTotalCosts = (plan: ItineraryPlan) => {
    return plan.days.reduce((totals, day) => {
      const activitiesCost = day.activities.reduce((sum, act) => sum + act.cost, 0);
      return {
        activities: totals.activities + activitiesCost,
        accommodation: totals.accommodation + day.accommodationCost,
        meals: totals.meals + day.mealsCost,
        transport: totals.transport + (day.transportCost || 0),
        total: totals.total + activitiesCost + day.accommodationCost + day.mealsCost + (day.transportCost || 0)
      };
    }, { activities: 0, accommodation: 0, meals: 0, transport: 0, total: 0 });
  };

  const handleGeneratePlan = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setError(null);
    setGeneratedPlan(null);
    
    try {
      const plan = await generateItinerary(prompt);
      setGeneratedPlan(plan);
    } catch (err: any) {
      console.error('Error:', err);
      setError(err.message || 'Failed to generate itinerary');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleShare = async () => {
    if (!generatedPlan) return;
    
    try {
      const shareData = {
        title: generatedPlan.title,
        text: `Check out my trip itinerary: ${generatedPlan.title}\nFrom ${generatedPlan.startDate} to ${generatedPlan.endDate}`,
        url: window.location.href
      };
      
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback to copying to clipboard
        await navigator.clipboard.writeText(`${shareData.title}\n${shareData.text}`);
        alert('Itinerary details copied to clipboard!');
      }
    } catch (err) {
      console.error('Error sharing:', err);
      alert('Failed to share itinerary');
    }
  };

  const handleExportPDF = async () => {
    if (!itineraryRef.current || !generatedPlan) return;

    try {
      const canvas = await html2canvas(itineraryRef.current);
      const imgData = canvas.toDataURL('image/png');
      
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [canvas.width, canvas.height]
      });
      
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save(`${generatedPlan.title.replace(/\s+/g, '_')}_itinerary.pdf`);
    } catch (err) {
      console.error('Error generating PDF:', err);
      alert('Failed to generate PDF');
    }
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

              {/* Error Message */}
              {error && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isGenerating || !prompt.trim()}
                className={`w-full py-4 px-8 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center space-x-2 ${
                  isGenerating || !prompt.trim()
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700'
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

          {/* Generated Itinerary with Enhanced UI */}
          {generatedPlan && (
            <div ref={itineraryRef} className="bg-white rounded-3xl shadow-2xl">
              {/* Sticky Header */}
              <div className="sticky top-0 z-10 bg-white border-b border-gray-200 rounded-t-3xl">
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{generatedPlan.title}</h2>
                      <p className="text-gray-600">
                        {generatedPlan.startDate} to {generatedPlan.endDate}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={handleShare}
                        className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
                      >
                        <Share2 className="h-4 w-4 mr-2" />
                        Share
                      </button>
                      <button 
                        onClick={handleExportPDF}
                        className="inline-flex items-center px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Export PDF
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Feasibility Warning */}
              {generatedPlan.feasibility === false && (
                <div className="m-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-yellow-800">Budget Concerns</h3>
                      <p className="text-yellow-700 text-sm mt-1">{generatedPlan.reason}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Cost Summary */}
              {generatedPlan && (
                <div className="p-6 border-b border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="col-span-3">
                      <h3 className="text-lg font-semibold mb-3">Budget Distribution</h3>
                      <div className="space-y-2">
                        {Object.entries(calculateTotalCosts(generatedPlan)).map(([category, amount]) => (
                          category !== 'total' && (
                            <div key={category} className="space-y-1">
                              <div className="flex justify-between text-sm">
                                <span className="capitalize">{category}</span>
                                <span>₹{amount.toLocaleString()}</span>
                              </div>
                              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div 
                                  className={`h-full ${
                                    category === 'accommodation' ? 'bg-blue-500' :
                                    category === 'activities' ? 'bg-green-500' : 'bg-purple-500'
                                  }`}
                                  style={{
                                    width: `${(amount / generatedPlan.totalBudget) * 100}%`
                                  }}
                                />
                              </div>
                            </div>
                          )
                        ))}
                      </div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <div className="text-center">
                        <h4 className="text-sm font-medium text-gray-600">Total Cost</h4>
                        <p className="text-2xl font-bold text-gray-900">
                          ₹{calculateTotalCosts(generatedPlan).total.toLocaleString()}
                        </p>
                        <p className={`text-sm ${
                          calculateTotalCosts(generatedPlan).total <= generatedPlan.totalBudget
                            ? 'text-green-600'
                            : 'text-red-600'
                        }`}>
                          {calculateTotalCosts(generatedPlan).total <= generatedPlan.totalBudget
                            ? '✓ Under Budget'
                            : '× Over Budget'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Days Accordion */}
              <div className="divide-y divide-gray-200">
                {generatedPlan.days.map((day, index) => (
                  <div key={day.day} className="p-6">
                    <button
                      onClick={() => toggleDay(day.day)}
                      className="w-full flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">
                          {day.day}
                        </div>
                        <div className="text-left">
                          <h3 className="text-xl font-bold text-gray-900">{day.location}</h3>
                          <p className="text-gray-600">Day {day.day}</p>
                        </div>
                      </div>
                      {expandedDays.includes(day.day) ? (
                        <ChevronUp className="h-6 w-6 text-gray-400" />
                      ) : (
                        <ChevronDown className="h-6 w-6 text-gray-400" />
                      )}
                    </button>

                    {expandedDays.includes(day.day) && (
                      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <div className="flex items-center space-x-2 mb-3">
                            <MapPin className="h-5 w-5 text-blue-500" />
                            <h4 className="font-semibold text-gray-700">Activities</h4>
                          </div>
                          <ul className="space-y-2">
                            {day.activities.map((activity, idx) => (
                              <li key={idx} className="flex justify-between text-gray-600 text-sm">
                                <span>• {activity.activity}</span>
                                <span className="text-gray-500">₹{activity.cost}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <div className="flex items-center space-x-2 mb-3">
                            <Hotel className="h-5 w-5 text-green-500" />
                            <h4 className="font-semibold text-gray-700">Accommodation</h4>
                          </div>
                          <p className="text-gray-600 text-sm mb-2">{day.accommodation}</p>
                          <p className="text-sm text-gray-500">₹{day.accommodationCost}</p>
                        </div>
                        <div>
                          <div className="flex items-center space-x-2 mb-3">
                            <Utensils className="h-5 w-5 text-purple-500" />
                            <h4 className="font-semibold text-gray-700">Meals</h4>
                          </div>
                          <p className="text-gray-600 text-sm mb-2">{day.meals}</p>
                          <p className="text-sm text-gray-500">₹{day.mealsCost}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AIPlanner;