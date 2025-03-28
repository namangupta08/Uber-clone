const mapsService = require("../services/maps.services");
const { validationResult } = require("express-validator");

module.exports.getCoordinates = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { address } = req.query;

  try {
    const coordinates = await mapsService.getAddressCoordinate(address);
    res.status(200).json(coordinates);
  } catch (error) {
    res.status(404).json({ message: "Coordinates not found" });
  }
};

module.exports.getDistanceTime = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { origin, destination } = req.query;

    // Ensure origin and destination are coordinates (latitude,longitude)
    const distanceTime = await mapsService.getDistanceAndTime(
      origin,
      destination
    );
    res.status(200).json(distanceTime);
  } catch (err) {
    console.error("Error in getDistanceTime:", err.message); // Log the error for debugging
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

module.exports.getAutoCompleteSuggestions = async (req,res,next) => {
    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { input } = req.query;

        const suggestions = await mapsService.getAutoCompleteSuggestions(input);

        res.status(200).json(suggestions);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}