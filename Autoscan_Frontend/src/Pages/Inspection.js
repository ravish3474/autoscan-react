// SellCar.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../style/inspection.css";
import moment from "moment";

import location from "../images/vector/Location.png";

import carDetails from "../images/vector/Car.png";

import carImages from "../images/vector/Picture.png";

function Inspection() {

  const history = useHistory();
  const [activeStep, setActiveStep] = useState(1);
  const [price, setPrice] = useState(0); // Initialize price with 0
  const handleNext = async () => {
    if (activeStep === 2) {
      const apiUrl = `${process.env.REACT_APP_API_URL}/calculate/fetch-roadtax`;
      const payload = {
        brand_id: statePayload.brand_id,
        varient_id: statePayload.varient_id,
        model_id: statePayload.model_id,
        manufacturing_year: statePayload.manufacturing_year,
        kms_driven: statePayload.kms_driven,
        city: statePayload.current_location, // Assuming current_location is the RTO city
      };
  
      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });
  
        const data = await response.json();
        const fetchedPrice = data.final_price;
        setPrice(fetchedPrice);
      } catch (error) {
        console.error(error);
      }
    }
  
    setActiveStep((prevStep) => Math.min(prevStep + 1, 3));
  };

  const handlePrev = () => {
    setActiveStep((prevStep) => Math.max(prevStep - 1, 1)); // Ensure activeStep does not go below 1
  };

  const handleHeaderClick = (step) => {
    setActiveStep(step); // Set activeStep directly when clicking on the accordion header
  };
  function formatPriceWithCommas(price) {
    const roundedPrice = Math.round(price);
    const priceString = roundedPrice.toString();
    if (roundedPrice > 999) {
      return `${priceString.slice(0, -5)},${priceString.slice(-5, -3)},${priceString.slice(-3)}`;
    } else {
      return `${priceString}`;
    }
  }
  
  // multiStep ends here
  const [errors, setErrors] = useState({});
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [varients, setVarients] = useState([]);
  const [pincodes, setPincodes] = useState([]);
  const [city, setCity] = useState([]);
  const [inspectionDates, setInspectionDates] = useState([]);
  const [statePayload, setStatePayload] = useState({
    model_id: "",
    brand_id: "",
    varient_id: "",
    kms_driven: "",
    current_location: "",
    pincode: "",
    ownership: "",
    manufacturing_year: "",
    registration_number: "",
    car_description: "",
    inspection_address: "",
    inspection_area: "",
    inspection_landmark: "",
    inspection_date: "",
    whatsapp_update: "",
  });
  const handleInputDate = (event) => {
    const selectedDate = event.target.value;
    setStatePayload({ ...statePayload, inspection_date: selectedDate });
    document.getElementById("inspection_date2").checked = true;
    const startDate = new Date(selectedDate);
    const dates = [];
    for (let i = 0; i < 1; i++) {
      const currentDate = new Date(
        startDate.getTime() + i * 24 * 60 * 60 * 1000
      );
      dates.push(
        `${currentDate.toLocaleString("default", {
          month: "long",
        })} ${currentDate.getDate()}, ${currentDate.getFullYear()}`
      );
    }
    setInspectionDates(dates);
  };
  const handleInput = (event) => {
    const { name, value } = event.target;

    setStatePayload((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const fetchBrandData = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/brand/brand-list `)
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
  const handleBrandSelection = async (brandId) => {
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
        }));
        setModels(modelOptions);
      }
    } catch (error) {
      console.error(error);
    }
    setStatePayload((prevState) => ({
      ...prevState,
      brand_id: brandId,
    }));
  };

  const handleModelSelection = async (modelId) => {
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
    }));
  };
  const handleVarientSelection = (varientId) => {
    setStatePayload((prevState) => ({
      ...prevState,
      varient_id: varientId,
    }));
  };

  const createInspection = (payload) => {
    console.log("payload");
    console.log(payload);
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/inspection/create-Inspection`,
        payload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {        
        toast.success("Inspection Created successfully");
        history.push("/InspectionThankYou");
      })
      .catch(function (error) {
        toast.error(
          "Unable to create Inspection"
        );
      });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors({});
    let errors = {};
    if (!statePayload.pincode) {
      errors.pincode = "Pincode is required";
    }
    if (!statePayload.current_location) {
      errors.current_location = "Current Location is required";
    }
    if (!statePayload.brand_id) {
      errors.brand_id = "Brand is required";
    }

    if (!statePayload.model_id) {
      errors.model_id = "Model is required";
    }

    if (!statePayload.varient_id) {
      errors.varient_id = "Varient is required";
    }
    if (!statePayload.kms_driven) {
      errors.kms_driven = "Kms Driven is required";
    }

    if (!statePayload.ownership) {
      errors.ownership = "Ownership is required";
    }

    if (!statePayload.manufacturing_year) {
      errors.manufacturing_year = "Manufacturing Year is required";
    }

    if (!statePayload.registration_number) {
      errors.registration_number = "Registration Number is required";
    }

    if (!statePayload.user_fullname) {
      errors.user_fullname = "User Full Name is required";
    }
    if (!statePayload.inspection_address) {
      errors.inspection_address = "Address is required";
    }

    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      let payload = new FormData();
      payload.append("model_id", statePayload?.model_id);
      payload.append("brand_id", statePayload?.brand_id);
      payload.append("varient_id", statePayload?.varient_id);
      payload.append("current_location", statePayload?.current_location);
      payload.append("pincode", statePayload?.pincode);
      payload.append("kms_driven", statePayload?.kms_driven);
      payload.append("ownership", statePayload?.ownership);
      payload.append("manufacturing_year", statePayload?.manufacturing_year);
      payload.append("registration_number", statePayload?.registration_number);
      payload.append("car_description", statePayload?.car_description);
      payload.append("inspection_address", statePayload?.inspection_address);
      payload.append("inspection_area", statePayload?.inspection_area);
      payload.append("inspection_landmark", statePayload?.inspection_landmark);
      payload.append("inspection_date", statePayload?.inspection_date);
      payload.append("whatsapp_update", statePayload?.whatsapp_update);
      payload.append("user_fullname", statePayload?.user_fullname);
      payload.append("email", statePayload?.email);
      payload.append("phone", statePayload?.phone);

      createInspection(payload);
    }
  };

  const handleCitySelection = async (current_location) => {
    setPincodes();
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/city/fetch-pincode-by-city/${current_location}`
      );
      const { success, allpincodes } = response.data;
      if (success) {
        const pincodeOptions = allpincodes.map((item) => ({
          id: item.pincode,
          label: item.pincode,
          value: item.pincode,
        }));
        setPincodes(pincodeOptions);
      }
    } catch (error) {
      console.error(error);
    }
    setStatePayload((prevState) => ({
      ...prevState,
      current_location: current_location,
    }));
  };
  const handlePincodeSelection = (pincode) => {
    setStatePayload((prevState) => ({
      ...prevState,
      pincode: pincode,
    }));
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

  useEffect(() => {
    fetchBrandData();
    fetchCityData();
    const today = new Date();
    const fiveDaysFromNow = new Date();
    fiveDaysFromNow.setDate(today.getDate());

    const options = { month: "long", day: "numeric" };
    const formattedDates = [];

    for (let i = 0; i < 5; i++) {
      formattedDates.push(
        new Date(
          fiveDaysFromNow.getTime() + i * 24 * 60 * 60 * 1000
        ).toLocaleDateString("en-US", options)
      );
    }

    setInspectionDates(formattedDates);
  }, []);

  return (
    <div>
      <section className="ActivePageHeader">
        <div className="container">
          <div className="row">
            <div className="d-flex align-items-center">
              <Link to="/" className="active">
                Home
              </Link>
              <span>
                <ion-icon name="chevron-forward-outline"></ion-icon>
              </span>
              <a href={"/inspection-car"}>Inspection</a>
            </div>
          </div>
        </div>
      </section>

      <section className="DefaultTopBanner">
        <div className="container">
          <div className="row"></div>
        </div>
      </section>
      <section className="MultiStepForm">
        <div className="container">
          <div className="row">
            <div className="accordion" id="accordionSteps">
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingStep1">
                  <button
                    className={`accordion-button ${
                      activeStep === 1 ? "" : "collapsed"
                    }`}
                    type="button"
                    onClick={() => handleHeaderClick(1)}
                    aria-expanded={activeStep === 1}
                    aria-controls="collapseStep1"
                  >
                    <img src={location} alt="" className="btn-img" />
                    Select your city
                  </button>
                  <p className="FormValues">
                    <span className="Location">Your City,</span>{" "}
                    <span className="Pincode">Your Pincode</span>
                  </p>
                </h2>
                <div
                  id="collapseStep1"
                  className={`accordion-collapse collapse ${
                    activeStep === 1 ? "show" : ""
                  }`}
                  aria-labelledby="headingStep1"
                  data-bs-parent="#accordionSteps"
                >
                  <div className="accordion-body">
                    <form id="step1">
                      <div className="grid">
                        <div className="form__group field">
                          <select
                            type="select"
                            name="current_location"
                            id="current_location"
                            className="col-md-6 mb-1 form-control form-select"
                            style={{ width: "100%" }}
                            onChange={(e) =>
                              handleCitySelection(e.target?.value)
                            }
                            required
                          >
                            <option selected disabled>
                              Select City
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
                          {errors?.current_location && (
                            <small className="text-danger">
                              {" "}
                              {errors?.current_location}{" "}
                            </small>
                          )}
                          <label
                            htmlFor="current_location"
                            className="form__label"
                          >
                            Select City
                          </label>
                        </div>
                        <div className="form__group field">
                          <select
                            type="select"
                            name="pincode"
                            className="col-md-6 mb-1 form-control form-select"
                            style={{ width: "100%" }}
                            onChange={(e) =>
                              handlePincodeSelection(e.target?.value)
                            }
                            required
                          >
                            <option selected disabled>
                              Select Pincode
                            </option>
                            {pincodes &&
                              pincodes.map((el) => {
                                return (
                                  <option key={el?.value} value={el?.id}>
                                    {el?.label}
                                  </option>
                                );
                              })}
                          </select>
                          {errors?.pincode && (
                            <small className="text-danger">
                              {" "}
                              {errors?.pincode}{" "}
                            </small>
                          )}
                          <label for="pincode" className="form__label">
                            Select Pincode
                          </label>
                        </div>
                      </div>
                      <div className="formFooter">
                        <button
                          type="button"
                          className="btn next-step"
                          onClick={handleNext}
                        >
                          Next
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              <div className="accordion-item" id="step2Accordion">
                <h2 className="accordion-header" id="headingStep2">
                  <button
                    className={`accordion-button ${
                      activeStep === 2 ? "" : "collapsed"
                    }`}
                    type="button"
                    onClick={() => handleHeaderClick(2)}
                    aria-expanded={activeStep === 2}
                    aria-controls="collapseStep2"
                  >
                    <img src={carDetails} alt="" className="btn-img" /> Car
                    Details
                  </button>
                  <p className="FormValues">
                    <span className="SelYear">Make Year |</span>{" "}
                    <span className="BrandName">Car Brand |</span>{" "}
                    <span className="Variant">Car Variant |</span>{" "}
                    <span className="ManufacturingYear">
                      Manufacturing Year |
                    </span>
                    <span className="RTOcity">RTO City |</span>{" "}
                    <span className="TotalDriven">KMs Driven |</span>
                    <span className="OwnershipHistory">Ownership history</span>
                  </p>
                </h2>
                <div
                  id="collapseStep2"
                  className={`accordion-collapse collapse ${
                    activeStep === 2 ? "show" : ""
                  }`}
                  aria-labelledby="headingStep2"
                  data-bs-parent="#accordionSteps"
                >
                  <div className="accordion-body">
                    <form id="step2">
                      <div className="grid">
                        <div className="form__group field">
                          <select
                            type="select"
                            name="brand_id"
                            className="col-md-6 mb-1 form-control form-select"
                            style={{ width: "100%" }}
                            onChange={(e) =>
                              handleBrandSelection(e.target?.value)
                            }
                            required
                          >
                            <option selected disabled>
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
                              {" "}
                              {errors?.brand_id}{" "}
                            </small>
                          )}
                          <label for="BrandName" className="form__label">
                            Select Brand
                          </label>
                        </div>
                        <div className="form__group field">
                          <select
                            type="select"
                            name="model_id"
                            id="model_id"
                            className="col-md-6 mb-1 form-control form-select"
                            style={{ width: "100%" }}
                            onChange={(e) =>
                              handleModelSelection(e.target?.value)
                            }
                            required
                          >
                            <option selected disabled>
                              Select Model
                            </option>
                            {models &&
                              models.map((el) => {
                                return (
                                  <option key={el?.value} value={el?.id}>
                                    {el?.label}
                                  </option>
                                );
                              })}
                          </select>
                          {errors?.model_id && (
                            <small className="text-danger">
                              {" "}
                              {errors?.model_id}{" "}
                            </small>
                          )}
                          <label for="model_id" className="form__label">
                            Select Model
                          </label>
                        </div>
                        <div className="form__group field">
                          <select
                            type="select"
                            name="varient_id"
                            id="varient_id"
                            className="col-md-6 mb-1 form-control form-select"
                            style={{ width: "100%" }}
                            onChange={(e) =>
                              handleVarientSelection(e.target?.value)
                            }
                            required
                          >
                            <option selected disabled>
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
                              {" "}
                              {errors?.varient_id}{" "}
                            </small>
                          )}
                          <label for="varient_id" className="form__label">
                            Select Varient
                          </label>
                        </div>
                        <div className="form__group field">
                          <input
                            className="form__field"
                            type="number"
                            min="0"
                            placeholder="Km Driven"
                            name="kms_driven"
                            id="kms_driven"
                            value={statePayload.kms_driven}
                            onChange={handleInput}
                          />
                          {errors?.kms_driven && (
                            <small className="text-danger">
                              {" "}
                              {errors?.kms_driven}{" "}
                            </small>
                          )}
                          <label for="kms_driven" className="form__label">
                            Km Driven
                          </label>
                        </div>
                        <div className="form__group field">
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
                          <label for="RtoCity" className="form__label">
                            Select Ownership
                          </label>
                        </div>
                        <div className="form__group field">
                          <select
                            type="select"
                            name="manufacturing_year"
                            id="manufacturing_year"
                            className="col-md-6 mb-1 form-control form-select"
                            style={{ width: "100%" }}
                            onChange={handleInput}
                            required
                          >
                            <option selected disabled>
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
                          <label
                            for="manufacturing_year"
                            className="form__label"
                          >
                            Manufacturing Year
                          </label>
                        </div>
                        <div className="form__group field">
                          <input
                            className="form__field"
                            type="text"
                            placeholder="Registration Number"
                            name="registration_number"
                            id="registration_number"
                            value={statePayload.registration_number}
                            onChange={handleInput}
                          />
                          {errors.registration_number && (
                            <small className="text-danger">
                              {" "}
                              {errors.registration_number}{" "}
                            </small>
                          )}
                          <label
                            for="registration_number"
                            className="form__label"
                          >
                            Registration Number
                          </label>
                        </div>
                        <div className="form__group field fullWidth">
                          <ReactQuill
                            value={statePayload.car_description}
                            name="car_description"
                            onChange={(value) =>
                              setStatePayload({
                                ...statePayload,
                                car_description: value,
                              })
                            }
                            modules={{
                              toolbar: [
                                [
                                  { header: "1" },
                                  { header: "2" },
                                  { font: [] },
                                ],
                                [{ size: [] }],
                                [
                                  "bold",
                                  "italic",
                                  "underline",
                                  "strike",
                                  "blockquote",
                                ],
                                [
                                  { list: "ordered" },
                                  { list: "bullet" },
                                  { indent: "-1" },
                                  { indent: "+1" },
                                ],
                                ["link", "image", "video"],
                                ["clean"],
                              ],
                            }}
                            formats={[
                              "header",
                              "font",
                              "size",
                              "bold",
                              "italic",
                              "underline",
                              "strike",
                              "blockquote",
                              "list",
                              "bullet",
                              "indent",
                              "link",
                              "image",
                              "video",
                            ]}
                          />
                          <label for="price" className="form__label">
                            Car Description
                          </label>
                        </div>
                        <div className="formFooter">
                          <button
                            type="button"
                            className="btn prev-step me-2"
                            onClick={handlePrev}
                          >
                            Previous
                          </button>
                          <button
                            type="button"
                            className="btn  next-step"
                            onClick={handleNext}
                          >
                            Next
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              <div className="accordion-item">
                <h2 className="accordion-header" id="headingStep3">
                  <button
                    className={`accordion-button ${
                      activeStep === 3 ? "" : "collapsed"
                    }`}
                    type="button"
                    onClick={() => handleHeaderClick(3)}
                    aria-expanded={activeStep === 3}
                    aria-controls="collapseStep3"
                  >
                    <img src={carImages} alt="" className="btn-img" />
                    Schedule Inspection
                  </button>
                </h2>
                <div
                  id="collapseStep3"
                  className={`accordion-collapse collapse ${
                    activeStep === 3 ? "show" : ""
                  }`}
                  aria-labelledby="headingStep3"
                  data-bs-parent="#accordionSteps"
                >
                  <div className="accordion-body">
                    <form id="step3" className="ScheduleInspection">
                      <div className="grid gridUpper">
                        <div className="relative">
                          <div className="card border-none ScheduleInspectionCard">
                            <h6 className="card-title">
                              {" "}
                              UsedCarwale APPROX VALUE
                            </h6>
                            <p className="approxValue">
                              <span className="valueFrom">₹{formatPriceWithCommas(price)}</span>
                            </p>
                          </div>
                        </div>
                        <div className="relative">
                          <div className="formHead">
                            <ion-icon name="person-outline"></ion-icon>
                            <h6 className="formInputTitle">User Details</h6>
                          </div>

                          <div className="form__group field">
                            <input
                              type="input"
                              className="form__field"
                              placeholder="Name"
                              name="user_fullname"
                              id="user_fullname"
                              value={statePayload.user_fullname}
                              onChange={handleInput}
                            />
                                 {errors?.user_fullname && (
                            <small className="text-danger">
                              {" "}
                              {errors?.user_fullname}{" "}
                            </small>
                          )}
                            <label
                              htmlFor="user_fullname"
                              className="form__label"
                            >
                              User Name
                            </label>
                          </div>
                          <div className="grid gridInner">
                            <div className="form__group field ">
                              <div>
                                <input
                                  type="input"
                                  className="form__field"
                                  placeholder="email"
                                  name="email"
                                  id="email"
                                  value={statePayload.email}
                                  onChange={handleInput}
                                />
                                <label htmlFor="email" className="form__label">
                                  User Email
                                </label>
                              </div>
                            </div>
                            <div className="form__group field  ">
                              <div>
                                <input
                                  type="input"
                                  className="form__field"
                                  placeholder="User Phone No*"
                                  name="phone"
                                  id="phone"
                                  value={statePayload.phone}
                                  onChange={handleInput}
                                />
                                <label htmlFor="phone" className="form__label">
                                  User Phone No
                                </label>
                              </div>
                            </div>
                          </div>
                          <br />
                          <div className="formHead">
                            <ion-icon name="location-outline"></ion-icon>
                            <h6 className="formInputTitle">Select Address</h6>
                          </div>

                          <div className="form__group field">
                            <input
                              type="input"
                              className="form__field"
                              placeholder="inspection_address"
                              name="inspection_address"
                              id="inspection_address"
                              value={statePayload.inspection_address}
                              onChange={handleInput}
                            />
                             {errors?.inspection_address && (
                            <small className="text-danger">
                              {" "}
                              {errors?.inspection_address}{" "}
                            </small>
                          )}
                            <label
                              htmlFor="inspection_address"
                              className="form__label"
                            >
                              Select Address
                            </label>
                          </div>
                          <div className="grid gridInner">
                            <div className="form__group field ">
                              <div>
                                <input
                                  type="input"
                                  className="form__field"
                                  placeholder="Enter Area/Locality"
                                  name="inspection_area"
                                  id="inspection_area"
                                  value={statePayload.inspection_area}
                                  onChange={handleInput}
                                />
                                <label
                                  htmlFor="inspection_area"
                                  className="form__label"
                                >
                                  Area/Locality
                                </label>
                              </div>
                            </div>
                            <div className="form__group field  ">
                              <div>
                                <input
                                  type="input"
                                  className="form__field"
                                  placeholder="Landmark"
                                  name="inspection_landmark"
                                  id="inspection_landmark"
                                  value={statePayload.inspection_landmark}
                                  onChange={handleInput}
                                />
                                <label
                                  htmlFor="inspection_landmark"
                                  className="form__label"
                                >
                                  Landmark
                                </label>
                              </div>
                            </div>
                          </div>
                          <br />
                          <div className="form__group field formHead relative sellDate">
                            <ion-icon
                              name="calendar-outline"
                              className="DateIcon"
                            ></ion-icon>
                            <h6 className="formInputTitle">Select Date</h6>
                            <label
                              htmlFor="inspection_date"
                              className="form__label theme"
                            >
                              OPEN CALENDER
                            </label>
                            <input
                              type="date"
                              className="border-none"
                              name="inspection_date"
                              id="inspection_date"
                              value={statePayload.inspection_date}
                              onChange={handleInputDate}
                            />
                          </div>
                          <div className="form__group field defaultradio grid grid4  relative">
                            {inspectionDates.map((date, index) => (
                              <div className="checkboxbutton" key={index}>
                                <input
                                  type="radio"
                                  name="inspection_date"
                                  id={`inspection_date${index + 2}`}
                                  value={moment(date, "MMMM D, YYYY").format(
                                    "YYYY-MM-DD"
                                  )}
                                  onChange={handleInput}
                                />
                                <label
                                  className="btn btn-default"
                                  htmlFor={`inspection_date${index + 2}`}
                                >
                                  {new Date(date).getDate()} <br />
                                  {new Date(date).toLocaleString("default", {
                                    month: "long",
                                  })}
                                </label>
                              </div>
                            ))}
                          </div>
                          <br />

                          <div className="formFooter">
                            <ul className="p-0 m-0">
                              <li>
                                <label htmlFor="whatsapp_update">
                                  <ion-icon name="logo-whatsapp"></ion-icon>{" "}
                                  &nbsp; Give updates on whatsapp 9879070345
                                </label>
                                <input
                                  type="checkbox"
                                  name="whatsapp_update"
                                  id="whatsapp_update"
                                  onChange={handleInput}
                                />
                              </li>
                            </ul>

                            <button
                              type="button"
                              className=" next-step btn submitBtn"
                              onClick={handleSubmit}
                            >
                              Schedule
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Inspection;
