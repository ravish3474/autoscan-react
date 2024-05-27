// SellCar.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../style/inspection.css";

function Inspection() {
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [models, setModels] = useState([]);
  const [brands, setBrands] = useState([]);
  const [varients, setVarients] = useState([]);
  const [statePayload, setStatePayload] = useState({
    model_id: "",
    brand_id: "",
    varient_id: "",
    kms_driven: "",
    ownership: "",
    manufacturing_year: "",
    registration_year: "",
    registration_state: "",
    car_location: "",
    registration_number: "",
    insurance_validity: "",
    ex_showroom: "",
    price: "",
    car_description: "",
    status: "",
    inspection_address: "",
    inspection_area: "",
    inspection_landmark: "",
    inspection_date: "",
    inspection_time: "",
    whatsapp_update: "",
  });
  const handleBrandSelection = (brandId) => {
    setStatePayload((prevState) => ({
      ...prevState,
      brand_id: brandId,
    }));
  };
  const handleInput = (event) => {
    const { name, value } = event.target;

    setStatePayload((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleVarientSelection = (varientId) => {
    setStatePayload((prevState) => ({
      ...prevState,
      varient_id: varientId,
    }));
  };
  const handleModelSelection = (modelId) => {
    setStatePayload((prevState) => ({
      ...prevState,
      model_id: modelId,
    }));
  };
  const fetchVarientData = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/varient/fetch-varient`)
      .then((response) => {
        const { success, allVarients } = response.data;
        if (success) {
          const { allVarients } = response.data;
          let data = allVarients?.map((item) => ({
            id: item?.id,
            label: item?.varient_name,
            value: item?.varient_name,
          }));
          setVarients(data);
        }
      })
      .catch((err) => console.log("Error:::", err));
  };
  const fetchBrandData = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/brand/brand-list `)
      .then((response) => {
        const { success, allBrands } = response.data;
        if (success) {
          const { allBrands } = response.data;
          let data = allBrands?.map((item) => ({
            id: item?.id,
            label: item?.brand_name,
            value: item?.brand_name,
          }));
          setBrands(data);
        }
      })
      .catch((err) => console.log("Error:::", err));
  };
  const fetchModelData = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/model/fetch-model`)
      .then((response) => {
        const { success, allModels } = response.data;
        if (success) {
          const { allModels } = response.data;
          let data = allModels?.map((item) => ({
            id: item?.id,
            label: item?.model_name,
            value: item?.model_name,
          }));
          setModels(data);
        }
      })
      .catch((err) => console.log("Error:::", err));
  };
  useEffect(() => {
    fetchBrandData();
    fetchModelData();
    fetchVarientData();

    return () => {};
  }, []);

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
        setIsLoading(false);
        console.log(res);

        toast.success("Inspection Created successfully");
      })
      .catch(function (error) {
        toast.error(
          "Inspection already exists. Unable to create a new Inspection"
        );
      });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors({});
    setIsLoading(true);

    let payload = new FormData();
    payload.append("model_id", statePayload?.model_id);
    payload.append("brand_id", statePayload?.brand_id);
    payload.append("varient_id", statePayload?.varient_id);
    payload.append("kms_driven", statePayload?.kms_driven);
    payload.append("ownership", statePayload?.ownership);
    payload.append("manufacturing_year", statePayload?.manufacturing_year);
    payload.append("registration_year", statePayload?.registration_year);
    payload.append("registration_state", statePayload?.registration_state);
    payload.append("car_location", statePayload?.car_location);
    payload.append("registration_number", statePayload?.registration_number);
    payload.append("insurance_validity", statePayload?.insurance_validity);
    payload.append("ex_showroom", statePayload?.ex_showroom);
    payload.append("price", statePayload?.price);
    payload.append("car_description", statePayload?.car_description);
    payload.append("status", statePayload?.status);
    payload.append("inspection_address", statePayload?.inspection_address);
    payload.append("inspection_area", statePayload?.inspection_area);
    payload.append("inspection_landmark", statePayload?.inspection_landmark);
    payload.append("inspection_date", statePayload?.inspection_date);
    payload.append("inspection_time", statePayload?.inspection_time);
    payload.append("whatsapp_update", statePayload?.whatsapp_update);

    createInspection(payload);
  };
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
              <a href="inspection.php">Inspection</a>
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
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseStep1"
                    aria-expanded="true"
                    aria-controls="collapseStep1"
                  >
                    <img
                      src="images/vector/Location.png"
                      alt=""
                      className="btn-img "
                    />
                    Select your city
                  </button>
                  <p className="FormValues">
                    <span className="Location">Your City,</span>{" "}
                    <span className="Pincode">Your Pincode</span>
                  </p>
                </h2>
                <div
                  id="collapseStep1"
                  className="accordion-collapse collapse show"
                  aria-labelledby="headingStep1"
                  data-bs-parent="#accordionSteps"
                >
                  <div className="accordion-body">
                    <form id="step1">
                      <div className="grid">
                        <div className="form__group field">
                          <select
                            className="form__field"
                            name="name"
                            id="SelCity"
                            required
                          >
                            <option
                              value=""
                              disabled
                              selected
                              className="form__label"
                            >
                              Select City
                            </option>
                            <option value="dehradun">Dehradun</option>
                            <option value="Dehradun2">Dehradun2</option>
                            <option value="Dehradun3">Dehradun3</option>
                          </select>
                          <label htmlFor="name" className="form__label">
                            Select City
                          </label>
                        </div>
                        <div className="form__group field  pincode">
                          <select
                            className="form__field"
                            name="name"
                            id="SelPincode"
                            required
                          >
                            <option
                              value=""
                              disabled
                              selected
                              className="form__label"
                            >
                              Select Pincode
                            </option>
                            <option value="248001">248001</option>
                            <option value="248001">248001</option>
                            <option value="248001">248001</option>
                          </select>
                          <label htmlFor="name" className="form__label">
                            Select Pincode
                          </label>
                        </div>
                      </div>
                      <div className="formFooter">
                        <button
                          type="button"
                          className="btn next-step"
                          data-bs-target="#collapseStep2"
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
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseStep2"
                    aria-expanded="false"
                    aria-controls="collapseStep2"
                  >
                    <img
                      src="images/vector/Car.png"
                      alt=""
                      className="btn-img"
                    />{" "}
                    Car Details
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
                  className="accordion-collapse collapse"
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
                            Select Model
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
                          <input
                            className="form__field"
                            type="text"
                            placeholder="Manufacturing Year"
                            name="manufacturing_year"
                            id="manufacturing_year"
                            value={statePayload.manufacturing_year}
                            onChange={handleInput}
                          />
                          {errors.manufacturing_year && (
                            <small className="text-danger">
                              {" "}
                              {errors.manufacturing_year}{" "}
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
                            placeholder="Registration Year"
                            name="registration_year"
                            id="registration_year"
                            value={statePayload.registration_year}
                            onChange={handleInput}
                          />
                          {errors.registration_year && (
                            <small className="text-danger">
                              {" "}
                              {errors.registration_year}{" "}
                            </small>
                          )}
                          <label
                            for="registration_year"
                            className="form__label"
                          >
                            Registration Year
                          </label>
                        </div>
                        <div className="form__group field">
                          <input
                            className="form__field"
                            type="text"
                            placeholder="Registration State"
                            name="registration_state"
                            id="registration_state"
                            value={statePayload.registration_state}
                            onChange={handleInput}
                          />
                          {errors.registration_state && (
                            <small className="text-danger">
                              {" "}
                              {errors.registration_state}{" "}
                            </small>
                          )}
                          <label
                            for="registration_state"
                            className="form__label"
                          >
                            Registration State
                          </label>
                        </div>
                        <div className="form__group field">
                          <input
                            className="form__field"
                            type="text"
                            placeholder="Car Location"
                            name="car_location"
                            id="car_location"
                            value={statePayload.car_location}
                            onChange={handleInput}
                          />
                          {errors.car_location && (
                            <small className="text-danger">
                              {" "}
                              {errors.car_location}{" "}
                            </small>
                          )}
                          <label for="car_location" className="form__label">
                            Car Location
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
                        <div className="form__group field">
                          <input
                            className="form__field"
                            type="text"
                            placeholder="Insurance Validity"
                            name="insurance_validity"
                            id="insurance_validity"
                            value={statePayload.insurance_validity}
                            onChange={handleInput}
                          />
                          {errors.insurance_validity && (
                            <small className="text-danger">
                              {" "}
                              {errors.insurance_validity}{" "}
                            </small>
                          )}
                          <label
                            for="insurance_validity"
                            className="form__label"
                          >
                            Insurance Validity
                          </label>
                        </div>
                        <div className="form__group field">
                          <input
                            className="form__field"
                            type="text"
                            placeholder=" Ex Showroom Price"
                            name="ex_showroom"
                            id="ex_showroom"
                            value={statePayload.ex_showroom}
                            onChange={handleInput}
                          />
                          {errors.ex_showroom && (
                            <small className="text-danger">
                              {" "}
                              {errors.ex_showroom}{" "}
                            </small>
                          )}
                          <label for="ex_showroom" className="form__label">
                            Ex Showroom Price
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
                            Selling Price
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
                            data-bs-target="#collapseStep1"
                          >
                            Previous
                          </button>
                          <button
                            type="button"
                            className="btn  next-step"
                            data-bs-target="#collapseStep3"
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
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseStep3"
                    aria-expanded="false"
                    aria-controls="collapseStep3"
                  >
                    <img
                      src="images/vector/Picture.png"
                      alt=""
                      className="btn-img"
                    />
                    Schedule Inspection
                  </button>
                </h2>
                <div
                  id="collapseStep3"
                  className="accordion-collapse collapse"
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
                              AUTO SCAN APPROX VALUE
                            </h6>
                            <p className="approxValue">
                              <span className="valueFrom">14,55,556</span>-{" "}
                              <span className="valueTo">15,89,400</span>
                            </p>
                          </div>
                        </div>
                        <div className="relative">
                          <div className="formHead">
                            <ion-icon name="location-outline"></ion-icon>
                            <h6 className="formInputTitle">Select Address</h6>
                            <h6 className="formInputTitle theme">
                              PIN LOCATION
                            </h6>
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
                                  value={statePayload.inspection_address}
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
                                  value={statePayload.inspection_address}
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
                            <input
                              type="date"
                              className="border-none"
                              name="inspection_date"
                              id="inspection_date"
                              value={statePayload.inspection_date}
                              onChange={handleInput}
                            />
                            <label
                              htmlFor="inspection_date"
                              className="form__label theme"
                            >
                              OPEN CALENDER
                            </label>
                          </div>
                          <div className="form__group field defaultradio grid grid4  relative">
                            <div className="checkboxbutton">
                              <input
                                type="radio"
                                name="inspection_date"
                                id="inspection_date2"
                                value={statePayload.inspection_date}
                                onChange={handleInput}
                              />
                              <label
                                className="btn btn-default"
                                htmlFor="inspection_date2"
                              >
                                14 <br />
                                March
                              </label>
                            </div>
                            <div className="checkboxbutton">
                              <input
                                type="radio"
                                name="inspection_date"
                                id="inspection_date3"
                                value={statePayload.inspection_date}
                                onChange={handleInput}
                              />
                              <label
                                className="btn btn-default"
                                htmlFor="inspection_date3"
                              >
                                15 <br />
                                March
                              </label>
                            </div>
                            <div className="checkboxbutton">
                              <input
                                type="radio"
                                name="inspection_date"
                                id="inspection_date4"
                                value={statePayload.inspection_date}
                                onChange={handleInput}
                              />
                              <label
                                className="btn btn-default"
                                htmlFor="inspection_date4"
                              >
                                16 <br />
                                March
                              </label>
                            </div>
                            <div className="checkboxbutton">
                              <input
                                type="radio"
                                name="inspection_date"
                                id="inspection_date5"
                                value={statePayload.inspection_date}
                                onChange={handleInput}
                              />
                              <label
                                className="btn btn-default"
                                htmlFor="inspection_date5"
                              >
                                18 <br />
                                March
                              </label>
                            </div>
                            <div className="checkboxbutton">
                              <input
                                type="radio"
                                name="inspection_date"
                                id="inspection_date6"
                                value={statePayload.inspection_date}
                                onChange={handleInput}
                              />
                              <label
                                className="btn btn-default"
                                htmlFor="inspection_date6"
                              >
                                19 <br />
                                March
                              </label>
                            </div>
                          </div>
                          <br />
                          <div className="formHead">
                            <ion-icon
                              name="alarm-outline"
                              className="TimeIcon"
                            ></ion-icon>
                            <h6 className="formInputTitle">Select Time</h6>
                          </div>
                          <div className="form__group field defaultradio grid grid4">
                            <div className="checkboxbutton">
                              <input
                                type="radio"
                                id="inspection_time1"
                                name="inspection_time"
                                onChange={handleInput}
                              />
                              <label
                                className="btn btn-default"
                                htmlFor="inspection_time1"
                              >
                                8:00 - <br /> 10:00 AM
                              </label>
                            </div>
                            <div className="checkboxbutton">
                              <input
                                type="radio"
                                id="inspection_time2"
                                name="inspection_time"
                                onChange={handleInput}
                              />
                              <label
                                className="btn btn-default"
                                htmlFor="inspection_time2"
                              >
                                10:00 - <br /> 12:00 PM
                              </label>
                            </div>
                            <div className="checkboxbutton">
                              <input
                                type="radio"
                                id="inspection_time3"
                                name="inspection_time"
                                onChange={handleInput}
                              />
                              <label
                                className="btn btn-default"
                                for="inspection_time3"
                              >
                                12:00 - <br /> 02:00 PM
                              </label>
                            </div>
                            <div className="checkboxbutton">
                              <input
                                type="radio"
                                id="inspection_time4"
                                name="inspection_time"
                                onChange={handleInput}
                              />
                              <label
                                className="btn btn-default"
                                htmlFor="inspection_time4"
                              >
                                2:00 - <br /> 04:00 PM
                              </label>
                            </div>
                            <div className="checkboxbutton">
                              <input
                                type="radio"
                                id="inspection_time5"
                                name="inspection_time"
                                onChange={handleInput}
                              />
                              <label
                                className="btn btn-default"
                                htmlFor="inspection_time5"
                              >
                                4:00 - <br /> 06:00 PM
                              </label>
                            </div>
                          </div>
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
