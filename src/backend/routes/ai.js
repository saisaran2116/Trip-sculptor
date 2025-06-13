import express from 'express';
import fetch from 'node-fetch';

const router = express.Router();
const GEMINI_API_KEY = "AIzaSyC0XtB49XjDUyi0u_CczTDMY8XIUiWz2-0";

router.post('/generate-itinerary', async (req, res) => {
  const { prompt } = req.body;
  
  if (!prompt) {
    return res.status(400).json({ 
      status: false, 
      message: 'Prompt is required' 
    });
  }

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;
    
    const payload = {
      contents: [{
        parts: [{
          text: `Create a detailed travel itinerary based on this request: "${prompt}". 
                 Be realistic with costs based on actual Indian market rates.
                 Consider these guidelines:
                 - Budget hotels in India: ₹1,000-3,000 per night
                 - Mid-range hotels: ₹3,000-7,000 per night
                 - Luxury hotels: ₹7,000+ per night
                 - Local meals: ₹200-500 per person
                 - Restaurant meals: ₹500-1,500 per person
                 - Activities: ₹500-2,000 per activity
                 - Transport: ₹1,000-3,000 per day
                 
                 If the requested trip is not feasible within the given budget, include "feasibility": false and "reason" in the response.
                 
                 Format the response as a JSON object with this structure:
                 {
                   "title": "Trip title",
                   "startDate": "2025-06-14",
                   "endDate": "2025-06-20",
                   "totalBudget": 15000,
                   "feasibility": true,
                   "reason": "Optional explanation if not feasible",
                   "days": [
                     {
                       "day": 1,
                       "location": "City name",
                       "activities": [
                         { 
                           "activity": "Activity 1", 
                           "cost": 500,
                           "note": "Optional note about availability/timing"
                         }
                       ],
                       "accommodation": "Hotel/Place name",
                       "accommodationCost": 2000,
                       "accommodationNote": "Optional note about hotel",
                       "meals": "Meal description",
                       "mealsCost": 800,
                       "transportCost": 1000,
                       "transportNote": "How to get around"
                     }
                   ]
                 }`
        }]
      }]
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`API Error: ${response.status} - ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    console.log('Gemini Response:', data);

    if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
      throw new Error('Invalid response format from Gemini API');
    }

    const text = data.candidates[0].content.parts[0].text;
    // Extract JSON from the response text
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No JSON found in response');
    }

    const planData = JSON.parse(jsonMatch[0]);
    if (!planData.title || !Array.isArray(planData.days)) {
      throw new Error('Invalid itinerary format in response');
    }

    return res.json({
      status: true,
      data: planData
    });

  } catch (error) {
    console.error('Error generating itinerary:', error);
    res.status(500).json({ 
      status: false, 
      message: error.message 
    });
  }
});

export default router;
