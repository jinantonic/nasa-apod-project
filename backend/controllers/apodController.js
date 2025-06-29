const nasaApiService = require('../services/nasaApiService');

// Handle GET /api/apod requests, fetch APOD data via service
exports.getAPOD = async (req, res, next) => {
  try {
    const data = await nasaApiService.fetchAPOD(req.query.date);
    res.json(data);
  } catch (error) {
    next(error);
  }
};
