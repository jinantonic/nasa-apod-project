require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const fetch = require('node-fetch'); // node-fetch 설치 필요: npm install node-fetch@2

// app.get('/', (req, res) => {
//   res.send('Hello NASA Backend!');
// });
app.use(cors());

app.get('/apod', async (req, res) => {
    try {
      const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}`);
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