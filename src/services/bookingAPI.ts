// src/services/bookingAPI.ts

const BASE_URL = "http://localhost:5000/api/hotels";

// Function to search hotels by destination
export const searchHotels = async (destination: string) => {
  try {
    const response = await fetch(
      `${BASE_URL}/search?destination=${encodeURIComponent(destination)}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error searching hotels:', error);
    throw error;
  }
};
