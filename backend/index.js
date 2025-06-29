require('dotenv').config();
const express = require('express');
const cors = require('cors');
const apodRouter = require('./routes/apod');

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());

// Mount APOD router at /api/apod
app.use('/api/apod', apodRouter);

// Simple error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
