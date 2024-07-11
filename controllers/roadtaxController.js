const MasterTable = require('../models/MasterTable');
const RoadTax = require('../models/RoadTax');
const CityPincode = require('../models/CityPincode');
const { Sequelize } = require("sequelize");
const Op = Sequelize.Op;

const fetchroadtax = async (req, res) => {
  const { brand_id, varient_id, model_id, city, manufacturing_year } = req.body;

  try {
    if (!brand_id || !varient_id || !model_id || !city || !manufacturing_year) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    const carDetails = await MasterTable.findOne({
      where: {
        brand_id,
        varient_id,
        model_id
      }
    });

    if (!carDetails) {
      return res.status(404).json({ error: 'Car details not found' });
    }

    const fetchstate = await CityPincode.findOne({
      where: {
        city
      }
    });

    if (!fetchstate) {
      return res.status(404).json({ error: 'State details not found for the city' });
    }

    const state = fetchstate.state;

    // Get ex_showroom_price from fetched car details and parse the comma-separated format
    const exShowroomPrice = parseFloat(carDetails.exshowroom_prices.replace(/,/g, ''));

    // Fetch road tax details from RoadTax based on state and price range
    const roadTaxDetails = await RoadTax.findOne({
      where: {
        State: state,
        Price_lower_limit: {
          [Op.lte]: exShowroomPrice
        },
        Price_upper_limit: {
          [Op.gte]: exShowroomPrice
        }
      }
    });

    if (!roadTaxDetails) {
      return res.status(404).json({ error: 'Road tax details not found' });
    }

    const fuelType = carDetails.fuel_type;

    let road_tax = 0; // Initialize road_tax variable

    // Determine road tax based on fuel type
    if (fuelType === 'Diesel') {
      road_tax = parseFloat(roadTaxDetails.Road_Tax_Diesel);
    } else if (fuelType === 'Petrol') {
      road_tax = parseFloat(roadTaxDetails.Road_Tax_Petrol);
    } else {
      // Default to Diesel tax if fuel type is neither Diesel nor Petrol
      road_tax = parseFloat(roadTaxDetails.Road_Tax_Diesel);
    }

    // Calculate road tax amount
    const roadTaxAmount = (road_tax / 100) * exShowroomPrice;

    const currentYear = new Date().getFullYear();
    const yearsDifference = currentYear - manufacturing_year;
    let adjustedPrice = exShowroomPrice + roadTaxAmount;

    if (yearsDifference > 0 && yearsDifference <= 10) {
        // Apply depreciation based on yearsDifference
        switch (true) {
          case (yearsDifference <= 0.5):
            adjustedPrice *= 0.95; // 5% depreciation
            break;
          case (yearsDifference <= 1):
            adjustedPrice *= 0.85; // 15% depreciation
            break;
          case (yearsDifference <= 2):
            adjustedPrice *= 0.7695; // 23.05% depreciation
            break;
          case (yearsDifference <= 3):
            adjustedPrice *= 0.69255; // 30.745% depreciation
            break;
          case (yearsDifference <= 4):
            adjustedPrice *= 0.623295; // 37.6705% depreciation
            break;
          case (yearsDifference <= 5):
            adjustedPrice *= 0.5609655; // 43.90345% depreciation
            break;
          case (yearsDifference <= 6):
            adjustedPrice *= 0.50486895; // 49.513105% depreciation
            break;
          case (yearsDifference <= 7):
            adjustedPrice *= 0.454382055; // 54.561795% depreciation
            break;
          case (yearsDifference <= 8):
            adjustedPrice *= 0.4089438495; // 59.1651655% depreciation
            break;
          case (yearsDifference <= 9):
            adjustedPrice *= 0.3680494646; // 63.3565359% depreciation
            break;
          case (yearsDifference <= 10):
            adjustedPrice *= 0.3312445181; // 67.23051619% depreciation
            break;
          default:
            break;
        }
      }

    // Prepare response
    res.json({
      success: true,
      ex_showroom_price: exShowroomPrice,
      road_tax_percentage: road_tax,
      road_tax_amount: roadTaxAmount,
      final_price: adjustedPrice
    });

  } catch (error) {
    console.error('Error fetching road tax:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  fetchroadtax
};
