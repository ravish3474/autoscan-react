const MasterTable = require('../models/MasterTable');
const RoadTax = require('../models/RoadTax');
const CityPincode = require('../models/CityPincode');
const { Sequelize } = require("sequelize");
const Op = Sequelize.Op;

const fetchroadtax = async (req, res) => {
  const { brand_id, varient_id, model_id, city, manufacturing_year,kms_driven } = req.body;

  try {
    if (!brand_id || !varient_id || !model_id || !city || !manufacturing_year || !kms_driven) {
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
    let yearsDifference = currentYear - manufacturing_year;
    let adjustedPrice = exShowroomPrice + roadTaxAmount;
    console.log("roadtax",adjustedPrice);

    if (yearsDifference > 0 && yearsDifference <= 10) {
    let caldepreciation;
      // Calculate depreciation based on yearsDifference
      console.log("yearsDifference",yearsDifference);
    
      if (yearsDifference <= 0.5) {
          adjustedPrice *= 0.95; // 5% depreciation for the first 0.5 years
          caldepreciation=adjustedPrice*0.05;
          adjustedPrice=adjustedPrice-caldepreciation;
          yearsDifference -= 0.5;
          console.log("5%",adjustedPrice);
      }
let count=0;
      for (let i = 1; i <= Math.floor(yearsDifference); i++) {
         
          if (count<1) {
              caldepreciation=adjustedPrice*0.05;
              adjustedPrice=adjustedPrice-caldepreciation;
              console.log("first 5%",adjustedPrice);
          }
          caldepreciation=adjustedPrice*0.10;
          adjustedPrice=adjustedPrice-caldepreciation;
          console.log("first 10%",adjustedPrice);
         count++;
      }
  }
      console.log("deperciation year",adjustedPrice);
      let kmdeprecation;
      if (kms_driven < 50000) {
        adjustedPrice = adjustedPrice;
      } else if (kms_driven >= 50000 && kms_driven < 100000) {
        kmdeprecation=adjustedPrice*0.03;
        adjustedPrice=adjustedPrice-kmdeprecation;
        console.log("50000<100000");
      } else if (kms_driven >= 100000 && kms_driven < 150000) {
        kmdeprecation=adjustedPrice*0.05;
        adjustedPrice=adjustedPrice-kmdeprecation;
        console.log("100000<150000");
      } else if (kms_driven >= 150000 && kms_driven < 200000) {
        kmdeprecation=adjustedPrice*0.10;
        adjustedPrice=adjustedPrice-kmdeprecation;
        console.log("150000<200000");
      } else if (kms_driven >= 200000) {
        kmdeprecation=adjustedPrice*0.25;
        adjustedPrice=adjustedPrice-kmdeprecation;
        console.log("200000<500000");
      }
      console.log("deperciation kms",adjustedPrice);
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
