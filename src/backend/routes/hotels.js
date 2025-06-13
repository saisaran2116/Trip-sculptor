import express from 'express';
import fetch from 'node-fetch';

const router = express.Router();

// GET /api/hotels/search?destination=CityName
router.get('/search', async (req, res) => {
  const { destination } = req.query;
  if (!destination) {
    return res.status(400).json({ status: false, message: 'Destination is required' });
  }

  try {
    // 1. Get city_id from Makcorps mapping API
    const mappingUrl = `https://api.makcorps.com/mapping?api_key=684be5770fd1a2094e8f45b3&name=${encodeURIComponent(destination)}`;
    const mappingRes = await fetch(mappingUrl);
    const mappingText = await mappingRes.text();
    let mappingData;
    try {
      mappingData = JSON.parse(mappingText);
    } catch (e) {
      console.error('Failed to parse mapping API response:', mappingText);
      throw new Error('Invalid mapping API response');
    }
    if (!mappingRes.ok) {
      console.error('Mapping API error:', mappingText);
      throw new Error('Failed to fetch city mapping');
    }
    if (!mappingData.data || !mappingData.data.city_id) {
      console.error('Mapping API missing city_id:', mappingData);
      return res.status(404).json({ status: false, message: 'City not found in mapping API' });
    }
    const cityId = mappingData.data.city_id;

    // 2. Get hotels by city_id from Makcorps hotel API
    const hotelsUrl = `https://api.makcorps.com/hotel/search?api_key=684be5770fd1a2094e8f45b3&city_id=${cityId}`;
    const hotelsRes = await fetch(hotelsUrl);
    const hotelsText = await hotelsRes.text();
    let hotelsData;
    try {
      hotelsData = JSON.parse(hotelsText);
    } catch (e) {
      console.error('Failed to parse hotels API response:', hotelsText);
      throw new Error('Invalid hotels API response');
    }
    if (!hotelsRes.ok) {
      console.error('Hotels API error:', hotelsText);
      throw new Error('Failed to fetch hotels from Makcorps');
    }
    if (!hotelsData.data || !Array.isArray(hotelsData.data.hotels)) {
      console.error('Hotels API missing hotels array:', hotelsData);
      return res.status(404).json({ status: false, message: 'No hotels found for this city' });
    }

    // 3. Transform hotels to match frontend expectations
    const hotels = hotelsData.data.hotels.map(hotel => ({
      id: hotel.hotel_id || hotel.id || hotel.name,
      name: hotel.name,
      image: hotel.image || hotel.thumbnail || 'https://via.placeholder.com/150',
      deal: hotel.deal || 'Available',
      rating: hotel.rating || hotel.stars || 0,
      location: hotel.address || hotel.city_name || destination,
      amenities: hotel.amenities || [],
      price: hotel.price || hotel.min_price || 0,
      originalPrice: hotel.original_price || hotel.price || 0
    }));

    return res.json({ status: true, results: hotels });
  } catch (error) {
    console.error('Makcorps API error:', error);
    return res.status(500).json({ status: false, message: error.message });
  }
});

export default router;
