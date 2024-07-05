import React, { useState, useEffect } from "react";
import Select from "react-select";

import { Container, Row, Col, Form } from "react-bootstrap";
import axios from "axios";
import ButtonLoader from "../../../component/Common/ButtonLoader";
import { Link, useHistory } from "react-router-dom";
import left_chevron from "../../../assets/images-new/left-chevron.svg";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import styles

const CreateInspection = (props) => {
  const history = useHistory();
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [varients, setVarients] = useState([]);
  const [statePayload, setStatePayload] = useState({
    model_id: "",
    brand_id: "",
    varient_id: "",
    kms_driven: "",
    ownership: "",
    manufacturing_year: "",
    car_location: "",
    registration_number: "",
    car_description: "",
    status: "",
  });

  const handleInput = (event) => {
    const { name, value } = event.target;

    setStatePayload((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleBrandSelection = (brandId) => {
    setStatePayload((prevState) => ({
      ...prevState,
      brand_id: brandId,
    }));
  };
  const handleModelSelection = (modelId) => {
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

  const createNewInspection = (payload) => {
    console.log("payload");
    console.log(payload);
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/inspection/create-inspection`,
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

        toast.success(res.data?.msg || "Inspection Created successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });

        //  history.push("/inspection-management");
      })
      .catch(function (error) {
        toast.error(
          error?.response?.data?.msg ||
            "Inspection already exists. Unable to create a new Inspection.",
          {
            position: toast.POSITION.TOP_RIGHT,
          }
        );
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors({});
    setIsLoading(true);
    let errorObj = {};

    // Catching and setting errors;
    let { car_description, status } = statePayload;

    if (!car_description) {
      errorObj["inspection_name"] = "Please choose a valid inspection_name!";
    }

    if (!status) {
      errorObj["status"] = "Please choose a valid status!";
    }

    // Setting the error object if any errors are present;
    if (Object.keys(errorObj)?.length > 0) {
      setErrors((prevState) => ({
        ...prevState,
        ...errorObj,
      }));
    }
    let payload = new FormData();
    payload.append("model_id", statePayload?.model_id);
    payload.append("brand_id", statePayload?.brand_id);
    payload.append("varient_id", statePayload?.varient_id);
    payload.append("kms_driven", statePayload?.kms_driven);
    payload.append("ownership", statePayload?.ownership);
    payload.append("manufacturing_year", statePayload?.manufacturing_year);
    payload.append("car_location", statePayload?.car_location);
    payload.append("registration_number", statePayload?.registration_number);
    payload.append("car_description", statePayload?.car_description);
    payload.append("status", statePayload?.status);

    createNewInspection(payload);
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
  useEffect(() => {
    fetchBrandData();
    fetchModelData();
    fetchVarientData();

    return () => {};
  }, []);

  return (
    <div className="dashboard-wrapper">
      <Container fluid>
        <Row>
          <Col lg={12} className="padding-remove mb-3">
            <div className="breadcums-list">
              <ul className="margin-remove m-0">
                <li className="margin-remove padding-remove">
                  <Link to="/create-inspection" className="active-btn">
                    Manage Inspection
                  </Link>
                </li>
              </ul>
            </div>
          </Col>
          <Col lg={12} className="">
            <div className="breadcums mt-3">
              <ul>
                <li>
                  <Link to="/inspection-management">
                    <span>
                      <img src={left_chevron} alt="chevron" />
                    </span>
                    Create Inspection
                  </Link>
                </li>
              </ul>
            </div>
          </Col>

          <Col lg={12}>
            <div className="filter-inspectiond-form inspectiond-shadow contact-form mt-3">
              <Row>
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
                      Inspection Location
                      <sup>
                        <sup>*</sup>
                      </sup>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder=" "
                      name="car_location"
                      value={statePayload.car_location}
                      onChange={handleInput}
                    />
                    {errors.car_location && (
                      <small className="text-danger">
                        {" "}
                        {errors.car_location}{" "}
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

                      <option value="1">Active</option>
                      <option value="0">Deactive</option>
                    </select>
                    {errors?.status && (
                      <small className="text-danger"> {errors?.status} </small>
                    )}
                  </Form.Group>
                </Col>
                <Col lg={12}>
                  <Form.Group
                    className="mb-3 d-flex flex-column"
                    controlId="formBasicSMS"
                  >
                    <Form.Label>
                      Inspection Description<sup>*</sup>
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
                  // loading={isLoading}
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
                    window.location.href = "/inspection-management";
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

export default CreateInspection;
