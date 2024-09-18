import React, { useState, useEffect } from "react";
import Select from "react-select";

import { Container, Row, Col, Form } from "react-bootstrap";
import axios from "axios";
import ButtonLoader from "../../component/Common/ButtonLoader";
import { Link, useHistory, useParams } from "react-router-dom";
import left_chevron from "../../assets/images-new/left-chevron.svg";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import styles
const EditCar = (props) => {
  const history = useHistory();
  let { carId } = useParams();
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [varients, setVarients] = useState([]);
  const [pincodes, setPincodes] = useState([]);
  const [city, setCity] = useState([]);
  const [state, setState] = useState([]);
  const [frontView, setFrontView] = useState([]);
  const [frontRight, setFrontRight] = useState([]);
  const [frontLeft, setFrontLeft] = useState([]);
  const [leftView, setLeftView] = useState([]);
  const [rightView, setRightView] = useState([]);
  const [rearView, setRearView] = useState([]);
  const [rearLeftView, setRearLeftView] = useState([]);
  const [rearRightView, setRearRightView] = useState([]);
  const [odometer, setOdometer] = useState([]);
  const [engineView, setEngine] = useState([]);
  const [chessis, setChessis] = useState([]);
  const [interiorView, setInterior] = useState([]);

  const [statePayload, setStatePayload] = useState({
    model_id: "",
    brand_id: "",
    varient_id: "",
    kms_driven: "",
    ownership: "",
    pincode:"",
    current_location:"",
    manufacturing_year: "",
    registration_state: "",
    registration_number: "",
    price: "",
    car_description: "",
    front_view: frontView || "",
    front_left: frontLeft || "",
    front_right: frontRight || "",
    left_view: leftView || "",
    right_view: rightView || "",
    rear_view: rearView || "",
    rear_left: rearLeftView || "",
    rear_right: rearRightView || "",
    odometer: odometer || "",
    engine: engineView || "",
    chessis: chessis || "",
    interior: interiorView || "",
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
    } else if (fieldName === "front_left") {
      setFrontLeft(files);
    } else if (fieldName === "front_right") {
      setFrontRight(files);
    } else if (fieldName === "left_view") {
      setLeftView(files);
    } else if (fieldName === "right_view") {
      setRightView(files);
    } else if (fieldName === "rear_view") {
      setRearView(files);
    } else if (fieldName === "rear_left") {
      setRearLeftView(files);
    } else if (fieldName === "rear_right") {
      setRearRightView(files);
    } else if (fieldName === "odometer") {
      setOdometer(files);
    } else if (fieldName === "engine") {
      setEngine(files);
    } else if (fieldName === "chessis") {
      setChessis(files);
    } else if (fieldName === "interior") {
      setInterior(files);
    }

    setStatePayload((prevState) => ({
      ...prevState,
      [fieldName]: files,
    }));
  };

  const createNewCar = (payload) => {
    axios
      .patch(
        `${process.env.REACT_APP_API_URL}/car/update-Car/${carId}`,
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

        toast.success(res.data?.msg || "Car Updated successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });

        history.push("/car-management");
      })
      .catch(function (error) {
        toast.error(
          error?.response?.data?.msg ||
            "Car already exists. Unable to create a new Car.",
          {
            position: toast.POSITION.TOP_RIGHT,
          }
        );
      });
  };
  const fetchCarDetails = () => {
    // console.log('user',userId);
    axios
      .get(`${process.env.REACT_APP_API_URL}/car/fetch-Car/${carId}`)
      .then((response) => {
        const { success, car } = response.data;
        if (success) {
          setStatePayload(car);
        }
      })
      .catch((err) => console.log("Error:::", err));
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
    fetchCarDetails();
    fetchBrandData();
    fetchCityData();
    fetchstateData();
  }, []);
  
  useEffect(() => {
    if (statePayload.brand_id) {
      handleBrandSelection(statePayload.brand_id);
    }
  }, [statePayload.brand_id]);
  
  useEffect(() => {
    if (statePayload.model_id) {
      handleModelSelection(statePayload.model_id);
    }
  }, [statePayload.model_id]);

  useEffect(() => {
    if (statePayload.current_location) {
      handleCitySelection(statePayload.current_location);
    }
  }, [statePayload.brand_id]);
  

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

    if (!statePayload.registration_state) {
      errors.registration_state = "Registration State is required";
    }

    if (!statePayload.registration_number) {
      errors.registration_number = "Registration Number is required";
    }

    if (!statePayload.price) {
      errors.price = "Price is required";
    }

    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      let payload = new FormData();
      payload.append("model_id", statePayload?.model_id);
      payload.append("brand_id", statePayload?.brand_id);
      payload.append("varient_id", statePayload?.varient_id);
      payload.append("pincode", statePayload?.pincode);
      payload.append("current_location", statePayload?.current_location);
      payload.append("kms_driven", statePayload?.kms_driven);
      payload.append("ownership", statePayload?.ownership);
      payload.append("manufacturing_year", statePayload?.manufacturing_year);
      payload.append("registration_state", statePayload?.registration_state);
      payload.append("registration_number", statePayload?.registration_number);
      payload.append("price", statePayload?.price);
      payload.append("car_description", statePayload?.car_description);
      payload.append("status", statePayload?.status);

      if (frontView) {
        payload.append("front_view", frontView);
      }
      if (frontRight) {
        payload.append("front_right", frontRight);
      }
      if (frontLeft) {
        payload.append("front_left", frontLeft);
      }
      if (leftView) {
        payload.append("left_view", leftView);
      }
      if (rightView) {
        payload.append("right_view", rightView);
      }
      if (rearView) {
        payload.append("rear_view", rearView);
      }
      if (rearLeftView) {
        payload.append("rear_left", rearLeftView);
      }
      if (rearRightView) {
        payload.append("rear_right", rearRightView);
      }
      if (odometer) {
        payload.append("odometer", odometer);
      }
      if (engineView) {
        payload.append("engine", engineView);
      }
      if (chessis) {
        payload.append("chessis", chessis);
      }
      if (interiorView) {
        payload.append("interior", interiorView);
      }
      payload.append("car_addedby_user_id", 1);
      createNewCar(payload);
  
    }
  };

  return (
    <div className="dashboard-wrapper">
      <Container fluid>
        <Row>
          <Col lg={12} className="padding-remove mb-3">
            <div className="breadcums-list">
              <ul className="margin-remove m-0">
                <li className="margin-remove padding-remove">
                  <Link to="/create-car" className="active-btn">
                    Manage Car
                  </Link>
                </li>
              </ul>
            </div>
          </Col>
          <Col lg={12} className="">
            <div className="breadcums mt-3">
              <ul>
                <li>
                  <Link to="/car-management">
                    <span>
                      <img src={left_chevron} alt="chevron" />
                    </span>
                    Create Car
                  </Link>
                </li>
              </ul>
            </div>
          </Col>

          <Col lg={12}>
            <div className="filter-card-form card-shadow contact-form mt-3">
              <Row>
              <Col xl={4} lg={4} md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="float-label">
                      Select City<sup>*</sup>
                    </Form.Label>
                    <select
                      type="select"
                      name="current_location"
                      id="current_location"
                      className="col-md-6 mb-1 form-control form-select"
                      style={{ width: "100%" }}
                      onChange={(e) => handleCitySelection(e.target?.value)}
                      required
                    >
                      <option selected disabled>
                        Select City
                      </option>
                      {city &&
                        city.map((el) => {
                          return (
                            <option key={el?.value} value={el?.id} selected={el?.value == statePayload?.current_location}>
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
                  </Form.Group>
                </Col>
                <Col xl={4} lg={4} md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="float-label">
                      Pincode<sup>*</sup>
                    </Form.Label>
                    <select
                      type="select"
                      name="pincode"
                      className="col-md-6 mb-1 form-control form-select"
                      style={{ width: "100%" }}
                      onChange={(e) => handlePincodeSelection(e.target?.value)}
                      required
                    >
                      <option selected disabled>
                        Select Pincode
                      </option>
                      {pincodes &&
                        pincodes.map((el) => {
                          return (
                              <option key={el?.value} value={el?.id} selected={el?.value == statePayload?.pincode}>
                              {el?.label}
                            </option>
                          );
                        })}
                    </select>
                    {errors?.pincode && (
                      <small className="text-danger"> {errors?.pincode} </small>
                    )}
                  </Form.Group>
                </Col>
                <Col xl={4} lg={4} md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="float-label">
                      Brand<sup>*</sup>
                    </Form.Label>
                    <select
                      type="select"
                      name="brand_id"
                      className="col-md-6 mb-1 form-control form-select"
                      style={{ width: "100%" }}
                      onChange={(e) => handleBrandSelection(e.target?.value)}
                    >
                      <option selected disabled>
                        Select Brand
                      </option>
                      {brands &&
                        brands.map((el) => {
                          return (
                            <option key={el?.value} value={el?.id} selected={el?.id == statePayload?.brand_id}>
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
                  </Form.Group>
                </Col>
                <Col xl={4} lg={4} md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="float-label">
                      Model<sup>*</sup>
                    </Form.Label>
                    <select
                      type="select"
                      name="model_id"
                      className="col-md-6 mb-1 form-control form-select"
                      style={{ width: "100%" }}
                      onChange={(e) => handleModelSelection(e.target?.value)}
                    >
                      <option selected disabled>
                        Select Model
                      </option>
                      {models &&
                        models.map((el) => {
                          return (
                            <option key={el?.value} value={el?.id} selected={el?.id == statePayload?.model_id}>
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
                  </Form.Group>
                </Col>

                <Col xl={4} lg={4} md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="float-label">
                      Varient<sup>*</sup>
                    </Form.Label>
                    <select
                      type="select"
                      name="varient_id"
                      className="col-md-6 mb-1 form-control form-select"
                      style={{ width: "100%" }}
                      onChange={(e) => handleVarientSelection(e.target?.value)}
                    >
                      <option selected disabled>
                        Select Varient
                      </option>
                      {varients &&
                        varients.map((el) => {
                          return (
                            <option key={el?.value} value={el?.id} selected={el?.id == statePayload?.varient_id}>
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
                  </Form.Group>
                </Col>
                <Col xl={4} lg={4} md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="float-label">
                      Kms Driven
                      <sup>
                        <sup>*</sup>
                      </sup>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder=" "
                      name="kms_driven"
                      value={statePayload.kms_driven}
                      onChange={handleInput}
                    />
                    {errors.kms_driven && (
                      <small className="text-danger">
                        {" "}
                        {errors.kms_driven}{" "}
                      </small>
                    )}
                  </Form.Group>
                </Col>
                <Col xl={4} lg={4} md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="float-label">
                      Ownership<sup>*</sup>
                    </Form.Label>
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

                      <option value="First Owner" selected={"First Owner"== statePayload?.ownership}>First Owner</option>
                      <option value="Second Owner" selected={"Second Owner" == statePayload?.ownership}>Second Owner</option>
                      <option value="Third Owner" selected={"Third Owner" == statePayload?.ownership}>Third Owner</option>
                      <option value="Fourth Owner" selected={"Fourth Owner" == statePayload?.ownership}>Fourth Owner</option>
                      <option value="Unregistered" selected={"Unregistered" == statePayload?.ownership}>Unregistered</option>
                    </select>
                    {errors?.ownership && (
                      <small className="text-danger">
                        {" "}
                        {errors?.ownership}{" "}
                      </small>
                    )}
                  </Form.Group>
                </Col>
                <Col xl={4} lg={4} md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="float-label">
                      Manufacturing Year
                      <sup>
                        <sup>*</sup>
                      </sup>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder=" "
                      name="manufacturing_year"
                      value={statePayload.manufacturing_year}
                      onChange={handleInput}
                    />
                    {errors.manufacturing_year && (
                      <small className="text-danger">
                        {" "}
                        {errors.manufacturing_year}{" "}
                      </small>
                    )}
                  </Form.Group>
                </Col>
                <Col xl={4} lg={4} md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="float-label">
                      Registration State<sup>*</sup>
                    </Form.Label>
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
                            <option key={el?.value} value={el?.id} selected={el?.value == statePayload?.registration_state}>
                            {el?.label}
                          </option>
                          );
                        })}
                    </select>
                    {errors?.registration_state && (
                      <small className="text-danger">
                        {" "}
                        {errors?.registration_state}{" "}
                      </small>
                    )}
                  </Form.Group>
                </Col>
               
                <Col xl={4} lg={4} md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="float-label">
                      Registration Number
                      <sup>
                        <sup>*</sup>
                      </sup>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder=" "
                      name="registration_number"
                      value={statePayload.registration_number}
                      onChange={handleInput}
                    />
                    {errors.registration_number && (
                      <small className="text-danger">
                        {" "}
                        {errors.registration_number}{" "}
                      </small>
                    )}
                  </Form.Group>
                </Col>
              
                <Col xl={4} lg={4} md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="float-label">
                      Price
                      <sup>
                        <sup>*</sup>
                      </sup>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder=" "
                      name="price"
                      value={statePayload.price}
                      onChange={handleInput}
                    />
                    {errors.price && (
                      <small className="text-danger"> {errors.price} </small>
                    )}
                  </Form.Group>
                </Col>
                <Col xl={4} lg={4} md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="float-label">
                      Status<sup>*</sup>
                    </Form.Label>
                    <select
                      type="select"
                      name="status"
                      className="col-md-6 mb-1 form-control form-select"
                      style={{ width: "100%" }}
                      onChange={handleInput}
                    >
                      <option selected disabled>
                        Select Status
                      </option>

                      <option value="1" selected={"1" == statePayload?.status}>
                          Active
                        </option>
                        <option value="0" selected={"0" == statePayload?.status}>
                          Deactive
                        </option>
                    </select>
                    {errors?.status && (
                      <small className="text-danger"> {errors?.status} </small>
                    )}
                  </Form.Group>
                </Col>
                <Col xl={4} lg={4} md={6}>
                  <Form.Group className="mb-3 ">
                    <Form.Label className="float-label">
                      Front View Image.*
                    </Form.Label>
                    <Form.Control
                      type="file"
                      className="form-control"
                      id="image"
                      name="front_view"
                      accept=".jpeg, .png, .jpg, .gif"
                      errorMessage="The file is required."
                      onChange={(e) => handleImageFileChange(e, "front_view")}
                    />
                    {errors?.front_view && (
                      <small className="text-danger">
                        {" "}
                        {errors?.front_view}{" "}
                      </small>
                    )}
                  </Form.Group>

                  {statePayload.front_view && (
                    <>
                      <div>
                        <img
                          src={`https://usedcarautoscan.s3.ap-south-1.amazonaws.com/${statePayload.front_view}`}
                          alt="Selected Image"
                          style={{ maxWidth: "20%" }}
                        />
                      </div>
                    </>
                  )}
                </Col>
                <Col xl={4} lg={4} md={6}>
                  <Form.Group className="mb-3 ">
                    <Form.Label className="float-label">
                      Front Left View.*
                    </Form.Label>
                    <Form.Control
                      type="file"
                      className="form-control"
                      id="image"
                      name="front_left"
                      accept=".jpeg, .png, .jpg, .gif"
                      errorMessage="The file is required."
                      onChange={(e) => handleImageFileChange(e, "front_left")}
                    />
                    {errors?.front_left && (
                      <small className="text-danger">
                        {" "}
                        {errors?.front_left}{" "}
                      </small>
                    )}
                  </Form.Group>

                  {statePayload.front_left && (
                    <>
                      <div>
                        <img
                          src={`https://usedcarautoscan.s3.ap-south-1.amazonaws.com/${statePayload.front_left}`}
                          alt="Selected Front Left view"
                          style={{ maxWidth: "20%" }}
                        />
                      </div>
                    </>
                  )}
                </Col>
                <Col xl={4} lg={4} md={6}>
                  <Form.Group className="mb-3 ">
                    <Form.Label className="float-label">
                      Front Right View.*
                    </Form.Label>
                    <Form.Control
                      type="file"
                      className="form-control"
                      id="image"
                      name="front_right"
                      accept=".jpeg, .png, .jpg, .gif"
                      errorMessage="The file is required."
                      onChange={(e) => handleImageFileChange(e, "front_right")}
                    />
                    {errors?.front_right && (
                      <small className="text-danger">
                        {" "}
                        {errors?.front_right}{" "}
                      </small>
                    )}
                  </Form.Group>

                  {statePayload.front_right && (
                    <>
                      <div>
                        <img
                          src={`https://usedcarautoscan.s3.ap-south-1.amazonaws.com/${statePayload.front_right}`}
                          alt="Selected Image"
                          style={{ maxWidth: "20%" }}
                        />
                      </div>
                    </>
                  )}
                </Col>
                <Col xl={4} lg={4} md={6}>
                  <Form.Group className="mb-3 ">
                    <Form.Label className="float-label">
                      Right View.*
                    </Form.Label>
                    <Form.Control
                      type="file"
                      className="form-control"
                      id="image"
                      name="right_view"
                      accept=".jpeg, .png, .jpg, .gif"
                      errorMessage="The file is required."
                      onChange={(e) => handleImageFileChange(e, "right_view")}
                    />
                    {errors?.right_view && (
                      <small className="text-danger">
                        {" "}
                        {errors?.right_view}{" "}
                      </small>
                    )}
                  </Form.Group>

                  {statePayload.right_view && (
                    <>
                      <div>
                        <img
                          src={`https://usedcarautoscan.s3.ap-south-1.amazonaws.com/${statePayload.right_view}`}
                          alt="Selected Right View Image"
                          style={{ maxWidth: "20%" }}
                        />
                      </div>
                    </>
                  )}
                </Col>
                <Col xl={4} lg={4} md={6}>
                  <Form.Group className="mb-3 ">
                    <Form.Label className="float-label">
                      Left View.*
                    </Form.Label>
                    <Form.Control
                      type="file"
                      className="form-control"
                      id="image"
                      name="left_view"
                      accept=".jpeg, .png, .jpg, .gif"
                      errorMessage="The file is required."
                      onChange={(e) => handleImageFileChange(e, "left_view")}
                    />
                    {errors?.left_view && (
                      <small className="text-danger">
                        {" "}
                        {errors?.left_view}{" "}
                      </small>
                    )}
                  </Form.Group>

                  {statePayload.left_view && (
                    <>
                      <div>
                        <img
                          src={`https://usedcarautoscan.s3.ap-south-1.amazonaws.com/${statePayload.left_view}`}
                          alt="Selected Left View"
                          style={{ maxWidth: "20%" }}
                        />
                      </div>
                    </>
                  )}
                </Col>
                <Col xl={4} lg={4} md={6}>
                  <Form.Group className="mb-3 ">
                    <Form.Label className="float-label">
                      Rear View Image.*
                    </Form.Label>
                    <Form.Control
                      type="file"
                      className="form-control"
                      id="image"
                      name="rear_view"
                      accept=".jpeg, .png, .jpg, .gif"
                      errorMessage="The file is required."
                      onChange={(e) => handleImageFileChange(e, "rear_view")}
                    />
                    {errors?.rear_view && (
                      <small className="text-danger">
                        {" "}
                        {errors?.rear_view}{" "}
                      </small>
                    )}
                  </Form.Group>

                  {statePayload.rear_view && (
                    <>
                      <div>
                        <img
                          src={`https://usedcarautoscan.s3.ap-south-1.amazonaws.com/${statePayload.rear_view}`}
                          alt="Selected Image"
                          style={{ maxWidth: "20%" }}
                        />
                      </div>
                    </>
                  )}
                </Col>
                <Col xl={4} lg={4} md={6}>
                  <Form.Group className="mb-3 ">
                    <Form.Label className="float-label">
                      Rear Left View.*
                    </Form.Label>
                    <Form.Control
                      type="file"
                      className="form-control"
                      id="image"
                      name="rear_left"
                      accept=".jpeg, .png, .jpg, .gif"
                      errorMessage="The file is required."
                      onChange={(e) => handleImageFileChange(e, "rear_left")}
                    />
                    {errors?.rear_left && (
                      <small className="text-danger">
                        {" "}
                        {errors?.rear_left}{" "}
                      </small>
                    )}
                  </Form.Group>

                  {statePayload.rear_left && (
                    <>
                      <div>
                        <img
                          src={`https://usedcarautoscan.s3.ap-south-1.amazonaws.com/${statePayload.rear_left}`}
                          alt="Selected Rear Left Image"
                          style={{ maxWidth: "20%" }}
                        />
                      </div>
                    </>
                  )}
                </Col>
                <Col xl={4} lg={4} md={6}>
                  <Form.Group className="mb-3 ">
                    <Form.Label className="float-label">
                      Rear Right View.*
                    </Form.Label>
                    <Form.Control
                      type="file"
                      className="form-control"
                      id="image"
                      name="rear_right"
                      accept=".jpeg, .png, .jpg, .gif"
                      errorMessage="The file is required."
                      onChange={(e) => handleImageFileChange(e, "rear_right")}
                    />
                    {errors?.rear_right && (
                      <small className="text-danger">
                        {" "}
                        {errors?.rear_right}{" "}
                      </small>
                    )}
                  </Form.Group>

                  {statePayload.rear_right && (
                    <>
                      <div>
                        <img
                          src={`https://usedcarautoscan.s3.ap-south-1.amazonaws.com/${statePayload.rear_right}`}
                          alt="Selected Rear Right Image"
                          style={{ maxWidth: "20%" }}
                        />
                      </div>
                    </>
                  )}
                </Col>
                <Col xl={4} lg={4} md={6}>
                  <Form.Group className="mb-3 ">
                    <Form.Label className="float-label">
                      Odometer Image.*
                    </Form.Label>
                    <Form.Control
                      type="file"
                      className="form-control"
                      id="image"
                      name="odometer"
                      accept=".jpeg, .png, .jpg, .gif"
                      errorMessage="The file is required."
                      onChange={(e) => handleImageFileChange(e, "odometer")}
                    />
                    {errors?.odometer && (
                      <small className="text-danger">
                        {" "}
                        {errors?.odometer}{" "}
                      </small>
                    )}
                  </Form.Group>

                  {statePayload.odometer && (
                    <>
                      <div>
                        <img
                          src={`https://usedcarautoscan.s3.ap-south-1.amazonaws.com/${statePayload.odometer}`}
                          alt="Selected odometer Image"
                          style={{ maxWidth: "20%" }}
                        />
                      </div>
                    </>
                  )}
                </Col>
                <Col xl={4} lg={4} md={6}>
                  <Form.Group className="mb-3 ">
                    <Form.Label className="float-label">
                    Engine Image.*
                    </Form.Label>
                    <Form.Control
                      type="file"
                      className="form-control"
                      id="image"
                      name="engine"
                      accept=".jpeg, .png, .jpg, .gif"
                      errorMessage="The file is required."
                      onChange={(e) => handleImageFileChange(e, "engine")}
                    />
                    {errors?.engine && (
                      <small className="text-danger">
                        {" "}
                        {errors?.engine}{" "}
                      </small>
                    )}
                  </Form.Group>

                  {statePayload.engine && (
                    <>
                      <div>
                        <img
                          src={`https://usedcarautoscan.s3.ap-south-1.amazonaws.com/${statePayload.engine}`}
                          alt="Selected Engine Image"
                          style={{ maxWidth: "20%" }}
                        />
                      </div>
                    </>
                  )}
                </Col>
                <Col xl={4} lg={4} md={6}>
                  <Form.Group className="mb-3 ">
                    <Form.Label className="float-label">
                      Chessis Image.*
                    </Form.Label>
                    <Form.Control
                      type="file"
                      className="form-control"
                      id="image"
                      name="chessis"
                      accept=".jpeg, .png, .jpg, .gif"
                      errorMessage="The file is required."
                      onChange={(e) => handleImageFileChange(e, "chessis")}
                    />
                    {errors?.chessis && (
                      <small className="text-danger"> {errors?.chessis} </small>
                    )}
                  </Form.Group>

                  {statePayload.chessis && (
                    <>
                      <div>
                        <img
                          src={`https://usedcarautoscan.s3.ap-south-1.amazonaws.com/${statePayload.chessis}`}
                          alt="Select chessis Image"
                          style={{ maxWidth: "20%" }}
                        />
                      </div>
                    </>
                  )}
                </Col>
                <Col xl={4} lg={4} md={6}>
                  <Form.Group className="mb-3 ">
                    <Form.Label className="float-label">
                    Interior Image.*
                    </Form.Label>
                    <Form.Control
                      type="file"
                      className="form-control"
                      id="image"
                      name="interior"
                      accept=".jpeg, .png, .jpg, .gif"
                      errorMessage="The file is required."
                      onChange={(e) => handleImageFileChange(e, "interior")}
                    />
                    {errors?.interior && (
                      <small className="text-danger">
                        {" "}
                        {errors?.interior}{" "}
                      </small>
                    )}
                  </Form.Group>

                  {statePayload.interior && (
                    <>
                      <div>
                        <img
                          src={`https://usedcarautoscan.s3.ap-south-1.amazonaws.com/${statePayload.interior}`}
                          alt="Selected Interior Image"
                          style={{ maxWidth: "20%" }}
                        />
                      </div>
                    </>
                  )}
                </Col>
             
                <Col lg={12}>
                  <Form.Group
                    className="mb-3 d-flex flex-column"
                    controlId="formBasicSMS"
                  >
                    <Form.Label>
                      Car Description<sup>*</sup>
                    </Form.Label>
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
                          [{ header: "1" }, { header: "2" }, { font: [] }],
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
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="cta text-center d-flex justify-content-center mt-4">
                <ButtonLoader
                  title="Save Details"
                  variant="primary"
                  style={{ marginLeft: "5px" }}
                  type="submit"
                  loading={isLoading}
                  message={"Saving"}
                  onClick={handleSubmit}
                />
                <ButtonLoader
                  className="mx-2"
                  title="Cancel"
                  variant="secondary"
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = "/car-management";
                  }}
                  // loading={isLoading}
                  // message={"Saving"}
                />
              </Form.Group>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default EditCar;
