import React, { useState, useEffect } from "react";
import "../style/FinalCarValuation.css";
import MainCarValuation from "../images/cars/carValuation.png";
import carValuationRight from "../images/cars/carValuationRight.png";
import Vector1 from "../images/vector/Vector6.svg";
import Vector2 from "../images/vector/Vector5.svg";
import Vector3 from "../images/vector/Vector4.svg";
import Vector4 from "../images/vector/Vector7.svg";
import { Link } from "react-router-dom";
import axios from "axios";
function formatPriceWithCommas(price) {
  const roundedPrice = Math.round(price);
  const priceString = roundedPrice.toString();
  if (roundedPrice > 999) {
    return `${priceString.slice(0, -5)},${priceString.slice(-5, -3)},${priceString.slice(-3)}`;
  } else {
    return `${priceString}`;
  }
}


function CalculateFinalValue() {
  const [selectedCategory, setSelectedCategory] = useState("Good");
  const [payload, setPayload] = useState(null);
  const [price, setPrice] = useState(0); // Initialize price with 0
  const [originalPrice, setOriginalPrice] = useState(0);
  const [errors, setErrors] = useState({});
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [city, setCity] = useState([]);
  const [varients, setVarients] = useState([]);
  const [statePayload, setStatePayload] = useState({
    model_id: "",
    brand_id: "",
    varient_id: "",
    rto_city: "",
    kms_driven: "",
    ownership: "",
    manufacturing_year: "",
  });

  const handleInput = (event) => {
    const { name, value } = event.target;

    setStatePayload((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const fetchRoadTax = async () => {
    try {
      const storedPayload = localStorage.getItem("payload");
      if (!storedPayload) {
        console.error("Payload not found in localStorage");
        return;
      }
      
      const parsedPayload = JSON.parse(storedPayload);
      const { brand_id, varient_id, model_id, manufacturing_year, kms_driven } = parsedPayload;

      const response = await fetch(`${process.env.REACT_APP_API_URL}/calculate/fetch-roadtax`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          brand_id,
          varient_id,
          model_id,
          manufacturing_year,
          kms_driven,
          city: parsedPayload.rto_city // Assuming state is also stored in payload
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch road tax');
      }
      const data = await response.json();
      const fetchedPrice = data.final_price;
      setOriginalPrice(fetchedPrice); // Set original fetched price
      setPrice(fetchedPrice); // Initialize price state with final_price from API response

    } catch (error) {
      console.error("Error fetching road tax:", error);
    }
  };

  const fetchCityData = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/city/fetch-city`)
      .then((response) => {
        const { success } = response.data;
        if (success) {
          const { allcities } = response.data;
          let data = allcities?.map((item) => ({
            id: item?.id,
            label: item?.city,
            value: item?.city,
          }));
          setCity(data);
        }
      })
      .catch((err) => console.log("Error:::", err));
  };

  const fetchBrandData = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/brand/brand-list`)
      .then((response) => {
        const { success } = response.data;
        if (success) {
          const { allBrands } = response.data;
          let data = allBrands?.map((item) => ({
            id: item?.id,
            label: item?.brand_name,
            value: item?.id,
          }));
          setBrands(data);
        }
      })
      .catch((err) => console.log("Error:::", err));
  };

  const handleBrandSelection = async (brandId, brandName) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/model/fetch-model-by-brand/${brandId}`
      );
      const { success, allmodels } = response.data;
      if (success) {
        const modelOptions = allmodels.map((item) => ({
          id: item.id,
          label: item.model_name,
          value: item.id,
          car_img:item.car_img
        }));
        setModels(modelOptions);
      } else {
        // Handle error case if needed
        console.error("Failed to fetch models:", response.data.error);
      }
    } catch (error) {
      console.error("Error fetching models:", error);
      // Handle error case if needed
    }
  
    setStatePayload((prevState) => ({
      ...prevState,
      brand_id: brandId,
      brand_name: brandName,
    }));
  };
  

  const handleModelSelection = async (modelId,modelName,car_img) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/varient/fetch-varient-by-model/${modelId}`
      );
      const { success, allVarients } = response.data;
      if (success) {
        const varientOptions = allVarients.map((item) => ({
          id: item.id,
          label: item.varient_name,
          value: item.id,
        }));
        setVarients(varientOptions);
      }
    } catch (error) {
      console.error(error);
    }
    setStatePayload((prevState) => ({
      ...prevState,
      model_id: modelId,
      model_name: modelName,
      car_img:car_img
    }));
  };

  const handleVarientSelection = (varientId,varientName) => {
    setStatePayload((prevState) => ({
      ...prevState,
      varient_id: varientId,
      varient_name: varientName,
    }));
  };

  const handleCitySelection = (rto_city) => {
    setStatePayload((prevState) => ({
      ...prevState,
      rto_city: rto_city,
    }));
  };
  const validateFields = () => {
    const newErrors = {};
    if (!statePayload.brand_id) newErrors.brand_id = "Brand is required";
    if (!statePayload.model_id) newErrors.model_id = "Model is required";
    if (!statePayload.varient_id) newErrors.varient_id = "Varient is required";
    if (!statePayload.rto_city) newErrors.rto_city = "RTO city is required";
    if (!statePayload.manufacturing_year)
      newErrors.manufacturing_year = "Manufacturing year is required";
    if (!statePayload.kms_driven)
      newErrors.kms_driven = "Kilometers driven is required";
    if (!statePayload.ownership)
      newErrors.ownership = "Ownership history is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  

  
  useEffect(() => {

    const storedPayload = localStorage.getItem("payload");
    if (storedPayload) {
      setPayload(JSON.parse(storedPayload));
    }
  
    fetchRoadTax();
    fetchBrandData();
    fetchCityData();
  }, []); 

  const handleSubmit = (event) => {
   
    event.preventDefault();
    setErrors({});
    if (!validateFields()) {
      console.log("Validation failed"); 
      return;
    }
    const payload = {
      model_id: statePayload?.model_id,
      brand_id: statePayload?.brand_id,
      varient_id: statePayload?.varient_id,
      brand_name: statePayload?.brand_name,
      model_name: statePayload?.model_name,
      varient_name: statePayload?.varient_name,
      rto_city: statePayload?.rto_city,
      car_img: statePayload?.car_img,
      kms_driven: statePayload?.kms_driven,
      ownership: statePayload?.ownership,
      manufacturing_year: statePayload?.manufacturing_year,
    };
  
    localStorage.setItem("payload", JSON.stringify(payload));
    const storedPayload = localStorage.getItem("payload");
    if (storedPayload) {
      setPayload(JSON.parse(storedPayload));
    }
    fetchRoadTax(); 
  };


  const handleCategoryClick = (category) => {
    setSelectedCategory(category);

    // Adjust price based on category selection
    switch (category) {
      case "Excellent":
        setPrice(originalPrice * 1.04); // Increase price by 4%
        break;
      case "Good":
        setPrice(originalPrice); // Set price back to original fetched price
        break;
      case "Fair":
        setPrice(originalPrice * 0.96); // Decrease price by 4%
        break;
      case "Bad":
        alert("Aaah! Usedcarwale does not evaluate bad condition vehicles.");
        break;
      default:
        break;
    }
  };
  
  return (
    <>
      <div className="container-fluid ActivePageHeader">
        <div className="d-flex align-items-center">
          <a href="/" className="active">
            Home
          </a>
          <span>
            <ion-icon name="chevron-forward-outline"></ion-icon>
          </span>
          <a href="finalValue">Car Valuation</a>
        </div>
      </div>
      <section className="main">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-2 col-md-3 filter-form-div">
              <div className="card border-none">
                <h6>Evaluate Again</h6>
                <div className="form-wrapper">
                  <form>
                    <div className="form-sub-division">
                      <label>{`Select RTO City`}</label>
                      <select
                        type="select"
                        name="rto_city"
                        id="rto_city"
                        className="form-select"
                        style={{ width: "100%" }}
                        onChange={(e) => handleCitySelection(e.target?.value)}
                        required
                      >
                        <option selected disabled defaultValue>
                          Select RTO City
                        </option>
                        {city &&
                          city.map((el) => {
                            return (
                              <option key={el?.value} value={el?.value}>
                                {el?.label}
                              </option>
                            );
                          })}
                      </select>
                      {errors?.rto_city && (
                        <small className="text-danger">
                          {errors?.rto_city}
                        </small>
                      )}
                    </div>
                    <div className="form-sub-division">
                      <label>{`Select Brand`}</label>
                      <select
                        type="select"
                        name="brand_id"
                        className="form-select"
                        style={{ width: "100%" }}
                        onChange={(e) =>
                          handleBrandSelection(
                            e.target?.value,
                            e.target.selectedOptions[0].text
                          )
                        }
                        required
                      >
                        <option selected disabled defaultValue>
                          Select Brand
                        </option>
                        {brands &&
                          brands.map((el) => {
                            return (
                              <option key={el?.value} value={el?.id}>
                                {el?.label}
                              </option>
                            );
                          })}
                      </select>
                      {errors?.brand_id && (
                        <small className="text-danger">
                          {errors?.brand_id}
                        </small>
                      )}
                    </div>
                    <div className="form-sub-division">
                      <label>{`Select Model`}</label>
                      <select
                        type="select"
                        name="model_id"
                        className="form-select"
                        style={{ width: "100%" }}
                        onChange={(e) => {
                          const selectedOption = e.target.selectedOptions[0];
                          const id = selectedOption.value;
                          const label = selectedOption.text;
                          const car_img = selectedOption.getAttribute('data-img');
                          handleModelSelection(id, label, car_img);
                        }}
                        required
                      >
                        <option selected disabled defaultValue>
                          Select Model
                        </option>
                        {models &&
                          models.map((el) => {
                            return (
                              <option key={el?.value} value={el?.id}  data-img={el?.car_img}>
                                {el?.label}
                              </option>
                            );
                          })}
                      </select>
                      {errors?.model_id && (
                        <small className="text-danger">
                          {errors?.model_id}
                        </small>
                      )}
                    </div>
                    <div className="form-sub-division">
                      <label>{`Select Varient`}</label>
                      <select
                        type="select"
                        name="varient_id"
                        className="form-select"
                        style={{ width: "100%" }}
                        onChange={(e) =>
                          handleVarientSelection(
                            e.target?.value,
                            e.target.selectedOptions[0].text
                          )
                        }
                        required
                      >
                        <option selected disabled defaultValue>
                          Select Varient
                        </option>
                        {varients &&
                          varients.map((el) => {
                            return (
                              <option key={el?.value} value={el?.id}>
                                {el?.label}
                              </option>
                            );
                          })}
                      </select>
                      {errors?.varient_id && (
                        <small className="text-danger">
                          {errors?.varient_id}
                        </small>
                      )}
                    </div>
                    <div className="form-sub-division">
                      <label>{`Select Manufacturing Year`}</label>
                      <select
                        type="select"
                        name="manufacturing_year"
                        id="manufacturing_year"
                        className="col-md-6 mb-1 form-control form-select"
                        style={{ width: "100%" }}
                        onChange={handleInput}
                      >
                        <option selected disabled defaultValue>
                          Select Manufacturing Year
                        </option>
                        {Array.from(Array(15), (_, i) => i + 2010).map(
                          (year) => (
                            <option key={year} value={year}>
                              {year}
                            </option>
                          )
                        )}
                      </select>
                      {errors.manufacturing_year && (
                        <small className="text-danger">
                          {errors.manufacturing_year}
                        </small>
                      )}
                    </div>

                    <div className="form-sub-division">
                      <label>{`Select Ownership`}</label>
                      <input
                        type="number"
                        className="form-select"
                        placeholder="Enter total KMs in odometer"
                        name="kms_driven"
                        id="kms_driven"
                        value={statePayload.kms_driven}
                        onChange={handleInput}
                        required
                      />
                      {errors?.kms_driven && (
                        <small className="text-danger">
                          {errors?.kms_driven}
                        </small>
                      )}
                    </div>

                    <div className="form-sub-division">
                      <label>{`Select Ownership`}</label>
                      <select
                        type="select"
                        name="ownership"
                        className="col-md-6 mb-1 form-control form-select"
                        style={{ width: "100%" }}
                        onChange={handleInput}
                      >
                        <option selected disabled>
                          Select Ownership
                        </option>

                        <option value="First Owner">First Owner</option>
                        <option value="Second Owner">Second Owner</option>
                        <option value="Third Owner">Third Owner</option>
                        <option value="Fourth Owner">Fourth Owner</option>
                        <option value="Unregistered">Unregistered</option>
                      </select>
                      {errors?.ownership && (
                        <small className="text-danger">
                          {" "}
                          {errors?.ownership}{" "}
                        </small>
                      )}
                    </div>
                    <div className="form-sub-division">
                      <button
                        to="finalValue"
                        className="btn theme-btn next-step"
                        onClick={handleSubmit}
                      >
                        CHECK PRICE
                      </button>
                    </div>
                  </form>
                  <label htmlFor="site-search">Search a Car</label>
                  <input
                    type="search"
                    id="site-search"
                    placeholder="Search a Car"
                  />
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-md-5 booking-details-div">
              <div className="card main-card">
                <figure className="text-center">
                  <img
                    src={
                      payload && payload.car_img
                        ? `https://usedcarautoscan.s3.ap-south-1.amazonaws.com/${payload.car_img}`
                        : MainCarValuation
                    }
                    alt="Main Car Valuation"
                  />
                </figure>
                <div className="row details">
                  <div className="left-side">
                    <div className="box">
                      {payload && (
                        <h6 className="car-type-name">
                          {payload.brand_name} {payload.model_name}{" "}
                          {payload.variant}
                        </h6>
                      )}
                      <div className="price-vary-from d-inline-flex align-items-center">
                        {/* <p className="price-from m-2">₹1,37,40,307</p>
                        <span className="d-inline-flex align-items-center">
                          <ion-icon name="remove-outline"></ion-icon>
                        </span> */}
                        <p className="price-to m-2">
                          ₹{formatPriceWithCommas(price)}
                        </p>
                      </div>
                      <div className="booking-category mt-2">
                        {["Bad", "Fair", "Good", "Excellent"].map(
                          (category, index) => (
                            <span
                              key={index}
                              className={
                                selectedCategory === category ? "active" : ""
                              }
                              onClick={() => handleCategoryClick(category)}
                            >
                              {category}
                            </span>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="right-side">
                    {payload && (
                      <div className="card border-none">
                        <p>Year: {payload.manufacturing_year}</p>
                        <p>Location: {payload.rto_city}</p>
                        <p>KM Driven: {payload.kms_driven}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-md-4 booking-side">
              <div className="card bg-none border-none pt-2">
                <h3>Want An Accurate Valuation of your Vehicle?</h3>
                <div className="row car-highlights">
                  <div className="col-md-2 left-side car-info Default">
                    {[
                      { text: "Convenient Scheduling", img: Vector1 },
                      { text: "Expert Evaluation Team", img: Vector2 },
                    ].map((item, index) => (
                      <div key={index}>
                        <p>{item.text}</p>
                        <figure>
                          <img src={item.img} alt={item.text} />
                        </figure>
                      </div>
                    ))}
                  </div>
                  <div className="col-md-12 middle-side d-inline-flex align-items-center">
                    <figure className="text-center yellow-car-img">
                      <img src={carValuationRight} alt="Car Valuation Right" />
                    </figure>
                    <button>
                      <Link to="requestCallBack">BOOK AN INSPECTION</Link>
                    </button>
                  </div>
                  <div className="col-md-2 right-side car-info2 Default">
                    {[
                      { text: "Comprehensive Inspection", img: Vector3 },
                      { text: "Detailed Report", img: Vector4 },
                    ].map((item, index) => (
                      <div key={index}>
                        <p>{item.text}</p>
                        <figure>
                          <img src={item.img} alt={item.text} />
                        </figure>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default CalculateFinalValue;
