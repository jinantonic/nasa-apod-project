const fetch = require('node-fetch');
const NASA_API_KEY = process.env.NASA_API_KEY;

// Fetch APOD data from NASA API, optional date param
exports.fetchAPOD = async (date) => {
  const url = `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}${date ? `&date=${date}` : ''}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch APOD data');
  }
  return response.json();
};
