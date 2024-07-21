import React, { useState, useEffect } from "react";
import Select from "react-select";

import { Container, Row, Col, Form } from "react-bootstrap";
import axios from "axios";
import ButtonLoader from "../../component/Common/ButtonLoader";
import { Link, useHistory, useParams } from "react-router-dom";
import left_chevron from "../../assets/images-new/left-chevron.svg";
import { toast } from "react-toastify";
const EditModel = props => {
  let { modelId } = useParams();
  const history = useHistory();
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [brands, setBrands] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [statePayload, setStatePayload] = useState({
    brand: "",
    model_name: "",
    car_img:"",
    model_year: "",
    status: "",
  });
  const handleImageFileChange = (e) => {
    console.log("image:", e);
    setImageFile(e.target.files[0]);
  };

  const handleInput = event => {
    const { name, value } = event.target;

    setStatePayload(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleBrandSelection = brandId => {
    setStatePayload(prevState => ({
      ...prevState,
      brand_id: brandId,
    }));
  };


  const fetchModelDetails = () => {
    // console.log('user',userId);
    axios
      .get(`${process.env.REACT_APP_API_URL}/model/fetch-Model/${modelId}`)
      .then(response => {
        const { success, model } = response.data;
        if (success) {
          setStatePayload(model);

        }
      })
      .catch(err => console.log("Error:::", err));
  };

  useEffect(() => {
    fetchModelDetails();

    return () => {};
  }, []);


  const editNewModel = payload => {
    console.log("payload");
    console.log(payload);
    axios
    .patch(
      `${process.env.REACT_APP_API_URL}/model/update-model/${modelId}`,
      payload,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    )
      .then(res => {
        setIsLoading(false);
        console.log(res);
       
          toast.success(res.data?.msg || "Model Editd successfully", {
            position: toast.POSITION.TOP_RIGHT,
          });

          history.push("/model-management");
        
      })
      .catch(function (error) {
        toast.error(
          error?.response?.data?.msg ||
            "Model already exists. Unable to edit a new Model.",
          {
            position: toast.POSITION.TOP_RIGHT,
          }
        );
      });
  };

  const handleSubmit = event => {
  
    event.preventDefault();
    setErrors({});
    setIsLoading(true);
    let errorObj = {};

  
    let {brand_id,model_name,model_year,status } = statePayload;
  

    if (!model_name) {
      errorObj["model_name"] = "Please choose a valid Model Name!";
    }
    if (!brand_id) {
      errorObj["brand_id"] = "Please choose a valid Brand!";
    }
    if (!model_year) {
      errorObj["model_year"] = "Please choose a valid Model Year!";
    }
    if (!status) {
      errorObj["status"] = "Please choose a valid status!";
    }

    // Setting the error object if any errors are present;
    if (Object.keys(errorObj)?.length > 0) {
      setErrors(prevState => ({
        ...prevState,
        ...errorObj,
      }));
    }
    let payload = new FormData();
    payload.append("brand_id", statePayload?.brand_id);
    payload.append("model_name", statePayload?.model_name);
    payload.append("model_year", statePayload?.model_year);
    payload.append("status", statePayload?.status);
    if (imageFile) {
      payload.append("car_img", imageFile);
    }
    // Calling the api and saving data;
    editNewModel(payload);
  };
  const fetchBrandData = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/brand/brand-list `)
      .then(response => {
        const { success, allBrands } = response.data;
        if (success) {
          const { allBrands } = response.data;
          let data = allBrands?.map(item => ({
            id: item?.id,
            label: item?.brand_name,
            value: item?.brand_name,
          }));
          setBrands(data);
        }
      })
      .catch(err => console.log("Error:::", err));
  };

  useEffect(() => {
    fetchBrandData();

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
                  <Link to="/edit-model" className="active-btn">
                    Manage Model
                  </Link>
                </li>
              </ul>
            </div>
          </Col>
          <Col lg={12} className="">
            <div className="breadcums mt-3">
              <ul>
                <li>
                  <Link to="/model-management">
                    <span>
                      <img src={left_chevron} alt="chevron" />
                    </span>
                    Edit Model
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
                            <option key={el?.value} value={el?.id}  selected={el?.id == statePayload?.brand_id}>
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
                      Model Name
                      <sup>
                        <sup>*</sup>
                      </sup>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder=" "
                      name="model_name"
                      value={statePayload.model_name}
                      onChange={handleInput}
                    />
                    {errors.model_name && (
                      <small className="text-danger">
                        {" "}
                        {errors.model_name}{" "}
                      </small>
                    )}
                  </Form.Group>
                </Col>
                <Col xl={4} lg={4} md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="float-label">
                      Model Year
                      <sup>
                        <sup>*</sup>
                      </sup>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder=" "
                      name="model_year"
                      value={statePayload.model_year}
                      onChange={handleInput}
                    />
                    {errors.model_year && (
                      <small className="text-danger">
                        {" "}
                        {errors.model_year}{" "}
                      </small>
                    )}
                  </Form.Group>
                </Col>
                <Col xl={4} lg={4} md={6}>
                  <Form.Group className="mb-3 ">
                    <Form.Label className="float-label">Car Image.*</Form.Label>
                    <Form.Control
                      type="file"
                      className="form-control"
                      id="image"
                      name="files"
                      accept=".jpeg, .png, .jpg, .gif"
                      errorMessage="The file is required."
                      onChange={handleImageFileChange}
                    />
                    {errors?.files && (
                      <small className="text-danger"> {errors?.files} </small>
                    )}
                  </Form.Group>

                  {statePayload.files && (
                    <>
                      <div>
                        <img
                          src={statePayload.files}
                          alt="Selected Image"
                          style={{ maxWidth: "20%" }}
                        />
                      </div>
                    </>
                  )}
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
                      <option value="1" selected={"1"== statePayload?.status}>Active</option>
                      <option value="0" selected={"0" == statePayload?.status}>Deactive</option>
                    </select>
                    {errors?.status && (
                      <small className="text-danger"> {errors?.status} </small>
                    )}
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
                    window.location.href = "/model-management";
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

export default EditModel;