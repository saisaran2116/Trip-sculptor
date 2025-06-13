import express from 'express';
import fetch from 'node-fetch';

const router = express.Router();

// GET all maps
router.get('/', async (req, res) => {
    try {
        res.json({ message: "Get all maps" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET single map
router.get('/:id', async (req, res) => {
    try {
        res.json({ message: `Get map ${req.params.id}` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/geocode', async (req, res) => {
    try {
        const { address } = req.query;
        
        if (!address) {
            return res.status(400).json({ 
                status: false, 
                message: "Address is required" 
            });
        }

        // Using RapidAPI's Google Maps API
        const response = await fetch(`https://google-maps-geocoding.p.rapidapi.com/geocode/json?address=${encodeURIComponent(address)}`, {
            headers: {
                'X-RapidAPI-Host': 'google-maps-geocoding.p.rapidapi.com',
                'X-RapidAPI-Key': process.env.RAPIDAPI_KEY
            }
        });

        if (!response.ok) {
            throw new Error(`Geocoding API failed: ${response.status}`);
        }

        const data = await response.json();
        
        if (data.status === 'OK' && data.results && data.results[0]) {
            const location = data.results[0].geometry.location;
            return res.json({
                status: true,
                lat: location.lat,
                lng: location.lng,
                formatted_address: data.results[0].formatted_address
            });
        } else {
            return res.status(404).json({
                status: false,
                message: "Location not found"
            });
        }
    } catch (error) {
        console.error('Geocoding error:', error);
        res.status(500).json({ 
            status: false, 
            message: error.message 
        });
    }
});

export default router;
