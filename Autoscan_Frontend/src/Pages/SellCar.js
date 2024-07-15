// SellCar.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import styles
import location from "../images/vector/Location.png";
import carDetails from "../images/vector/Car.png";
import carImages from "../images/vector/Picture.png";

import "../style/SellCar.css"; // Import BuyCar.css
import frontViewimg from "../images/cars/frontView.png";
import FrontRightCorner from "../images/cars/FrontRightCorner.png";
import LeftView from "../images/cars/LeftView.png";
import Rearview from "../images/cars/Rearview.png";
import LoginModal from "../components/modals/LoginModal";
function SellCar() {
  // MultiStep start here

  const history = useHistory();
  const [activeStep, setActiveStep] = useState(1);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const updateLoginState = (state) => {
    setIsLoggedIn(state);
  };

  const handleNext = () => {
    setActiveStep((prevStep) => Math.min(prevStep + 1, 3)); // Ensure activeStep does not exceed the total number of steps
  };

  const handlePrev = () => {
    setActiveStep((prevStep) => Math.max(prevStep - 1, 1)); // Ensure activeStep does not go below 1
  };

  const handleHeaderClick = (step) => {
    setActiveStep(step); // Set activeStep directly when clicking on the accordion header
  };

  // multiStep ends here
  const [errors, setErrors] = useState({});
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [varients, setVarients] = useState([]);
  const [pincodes, setPincodes] = useState([]);
  const [city, setCity] = useState([]);
  const [state, setState] = useState([]);
  const [frontView, setFrontView] = useState([]);
  const [frontRight, setFrontRight] = useState([]);
  const [leftView, setLeftView] = useState([]);
  const [rearView, setRearView] = useState([]);
  const [odometer, setOdometer] = useState([]);
  const [chessis, setChessis] = useState([]);
  const [showUserModal, setShowUserModal] = useState(false);
  const [statePayload, setStatePayload] = useState({
    model_id: "",
    brand_id: "",
    varient_id: "",
    pincode: "",
    kms_driven: "",
    ownership: "",
    manufacturing_year: "",
    registration_state: "",
    car_location: "",
    registration_number: "",
    ex_showroom: "",
    price: "",
    car_description: "",
    front_view: frontView || "",
    front_right: frontRight || "",
    left_view: leftView || "",
    rear_view: rearView || "",
    odometer: odometer || "",
    chessis: chessis || "",
    status: "",
  });
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

  const handleImageFileChange = (e, fieldName) => {
    const files = e.target.files[0];

    if (fieldName === "front_view") {
      setFrontView(files);
    } else if (fieldName === "front_right") {
      setFrontRight(files);
    } else if (fieldName === "left_view") {
      setLeftView(files);
    } else if (fieldName === "rear_view") {
      setRearView(files);
    } else if (fieldName === "odometer") {
      setOdometer(files);
    } else if (fieldName === "chessis") {
      setChessis(files);
    }

    setStatePayload((prevState) => ({
      ...prevState,
      [fieldName]: files,
    }));
  };

  const createNewCar = (payload) => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/car/create-car`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        toast.success("Car Created successfully");
        history.push("/Thankyou");
      })
      .catch(function (error) {
        toast.error("Car already exists. Unable to create a new Car");
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors({});

    let payload = new FormData();
    payload.append("model_id", statePayload?.model_id);
    payload.append("brand_id", statePayload?.brand_id);
    payload.append("varient_id", statePayload?.varient_id);
    payload.append("pincode", statePayload?.pincode);
    payload.append("kms_driven", statePayload?.kms_driven);
    payload.append("ownership", statePayload?.ownership);
    payload.append("manufacturing_year", statePayload?.manufacturing_year);
    payload.append("registration_state", statePayload?.registration_state);
    payload.append("car_location", statePayload?.car_location);
    payload.append("registration_number", statePayload?.registration_number);
    payload.append("ex_showroom", statePayload?.ex_showroom);
    payload.append("price", statePayload?.price);
    payload.append("car_description", statePayload?.car_description);
    payload.append("status", statePayload?.status);

    if (frontView) {
      payload.append("front_view", frontView);
    }
    if (frontRight) {
      payload.append("front_right", frontRight);
    }
    if (leftView) {
      payload.append("left_view", leftView);
    }
    if (rearView) {
      payload.append("rear_view", rearView);
    }
    if (odometer) {
      payload.append("odometer", odometer);
    }
    if (chessis) {
      payload.append("chessis", chessis);
    }

    if (localStorage.getItem("authUser")) {
      let user_id = localStorage.getItem("user_id");
      payload.append("car_addedby_user_id", user_id);
      createNewCar(payload);
    } else {
      setShowUserModal(true);
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
  const fetchstateData = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/city/fetch-state`)
      .then((response) => {
        const { success } = response.data;
        if (success) {
          const { allstates } = response.data;
          let data = allstates?.map((item) => ({
            id: item?.id,
            label: item?.state,
            value: item?.state,
          }));
          setState(data);
        }
      })
      .catch((err) => console.log("Error:::", err));
  };
  useEffect(() => {
    fetchBrandData();
    fetchCityData();
    fetchstateData();
    return () => {};
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
              <Link to="/sell-car">Sell Cars</Link>
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
            <h3 className="text-center mb-4 white">
              SELL YOUR CAR FOR THE BEST PRICES!
            </h3>

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
                        <div className="formFooter">
                          <button
                            type="button"
                            className="btn next-step"
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
                          <label for="BrandName" className="form__label">
                            Select Brand
                          </label>
                        </div>
                        <div className="form__group field">
                          <select
                            type="select"
                            name="model_id"
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
                          <label for="BrandName" className="form__label">
                            Select Model
                          </label>
                        </div>
                        <div className="form__group field">
                          <select
                            type="select"
                            name="varient_id"
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
                          <label for="BrandName" className="form__label">
                            Select Varient
                          </label>
                        </div>
                        <div className="form__group field">
                          <input
                            className="form__field"
                            type="text"
                            placeholder="Km Driven"
                            name="kms_driven"
                            id="kms_driven"
                            value={statePayload.kms_driven}
                            onChange={handleInput}
                          />
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
                          <select
                            type="select"
                            name="registration_state"
                            id="registration_state"
                            className="col-md-6 mb-1 form-control form-select"
                            style={{ width: "100%" }}
                            onChange={handleInput}
                            required
                          >
                            <option selected disabled>
                              Select Registration State
                            </option>
                            {state &&
                              state.map((el) => {
                                return (
                                  <option key={el?.value} value={el?.value}>
                                    {el?.label}
                                  </option>
                                );
                              })}
                          </select>
                          <label
                            htmlFor="registration_state"
                            className="form__label"
                          >
                            Registration State
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
                        <div className="form__group field ">
                          <input
                            className="form__field"
                            type="text"
                            placeholder="Selling Price"
                            name="price"
                            id="price"
                            value={statePayload.price}
                            onChange={handleInput}
                          />
                          {errors.price && (
                            <small className="text-danger">
                              {" "}
                              {errors.price}{" "}
                            </small>
                          )}
                          <label for="price" className="form__label">
                            Expected Selling Price
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
                    <img src={carImages} alt="" className="btn-img" /> Car
                    Images
                  </button>
                  <p className="FormValues">
                    <span className="frontView">Front View |</span>{" "}
                    <span className="frontRightView">Front Right Corner |</span>{" "}
                    <span className="LeftView">Left View |</span>{" "}
                    <span className="Rearview">Rear View |</span>
                    <span className="Odometer">Odometer |</span>{" "}
                    <span className="Others">Others</span>
                  </p>
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
                    <form id="step3" className="carsImageUpload">
                      <div className="grid">
                        <div className="relative">
                          <label for="frontView1" className="">
                            Front View
                          </label>
                          <input
                            type="file"
                            id="frontView1"
                            accept="image/*"
                            onChange={(e) =>
                              handleImageFileChange(e, "front_view")
                            }
                          />

                          <div className="preview" id="frontView1">
                            <img src={frontViewimg} alt="" />
                          </div>
                          {errors?.front_view && (
                            <small className="text-danger">
                              {" "}
                              {errors?.front_view}{" "}
                            </small>
                          )}
                        </div>
                        <div className="relative">
                          <label for="frontRightView" className="">
                            Front Right Corner
                          </label>
                          <input
                            type="file"
                            id="frontRightView"
                            accept="image/*"
                            onChange={(e) =>
                              handleImageFileChange(e, "front_right")
                            }
                          />
                          <div className="preview" id="frontRightView">
                            <img src={FrontRightCorner} alt="" />
                          </div>
                        </div>
                        <div className="relative">
                          <label for="LeftView" className="">
                            Left View
                          </label>
                          <input
                            type="file"
                            id="LeftView"
                            accept="image/*"
                            onChange={(e) =>
                              handleImageFileChange(e, "left_view")
                            }
                          />
                          <div className="preview" id="LeftView">
                            <img src={LeftView} alt="" />
                          </div>
                        </div>
                        <div className="relative">
                          <label for="Rearview" className="">
                            Rear view
                          </label>
                          <input
                            type="file"
                            id="Rearview"
                            accept="image/*"
                            onChange={(e) =>
                              handleImageFileChange(e, "rear_view")
                            }
                          />
                          <div className="preview" id="Rearview">
                            <img src={Rearview} alt="" />
                          </div>
                        </div>
                        <div className="relative">
                          <label for="Odometer" className="">
                            Odometer
                          </label>
                          <input
                            type="file"
                            id="Odometer"
                            accept="image/*"
                            onChange={(e) =>
                              handleImageFileChange(e, "odometer")
                            }
                          />
                          <div className="preview" id="Odometer">
                            <img src={frontViewimg} alt="" />
                          </div>
                        </div>
                        <div className="relative">
                          <label for="Others" className="">
                            Others/chassis
                          </label>
                          <input
                            type="file"
                            id="Others"
                            accept="image/*"
                            onChange={(e) =>
                              handleImageFileChange(e, "chessis")
                            }
                          />
                          <div className="preview" id="Others">
                            <img src={frontViewimg} alt="" />
                          </div>
                        </div>
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
                          className="btn submitBtn"
                          onClick={handleSubmit}
                        >
                          Post Add
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          {" "}
          {showUserModal && (
            <LoginModal
              pathRoute={"/sell-car"}
              onClose={() => setShowUserModal(false)}
              onLogin={() => updateLoginState(true)}
            />
          )}
        </div>
      </section>
    </div>
  );
}

export default SellCar;
