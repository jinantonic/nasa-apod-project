require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch'); // npm install node-fetch@2

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

app.get('/apod', async (req, res) => {
  const date = req.query.date || '';
  const url = `https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}${date ? `&date=${date}` : ''}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch APOD data' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});