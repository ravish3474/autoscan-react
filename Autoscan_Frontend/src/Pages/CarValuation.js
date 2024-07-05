import React, { useState, useEffect } from "react";
import axios from "axios";
import "../style/CarValuation.css"; // Import BuyCar.css
import { Link, useHistory } from "react-router-dom";

function CarValuation() {
  const history = useHistory();
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
    const { name, value, type, checked } = event.target;
    const newValue = type === "radio" ? checked && value : value;

    setStatePayload((prevState) => ({
      ...prevState,
      [name]: newValue,
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
  const handleCitySelection = (rto_city) => {
    setStatePayload((prevState) => ({
      ...prevState,
      rto_city: rto_city,
    }));
  };
  useEffect(() => {
    fetchBrandData();
    fetchCityData();
    return () => {};
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors({});

    // Create a payload object from statePayload
    const payload = {
      model_id: statePayload?.model_id,
      brand_id: statePayload?.brand_id,
      varient_id: statePayload?.varient_id,
      rto_city: statePayload?.rto_city,
      kms_driven: statePayload?.kms_driven,
      ownership: statePayload?.ownership,
      manufacturing_year: statePayload?.manufacturing_year,
    };

    // Store the payload object as a JSON string in localStorage
    localStorage.setItem("payload", JSON.stringify(payload));

    // Redirect to the final value page
    history.push("/finalvalue");
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
              <a href={"/ExploreCar"}>Used Cars</a>
            </div>
          </div>
        </div>
      </section>{" "}
      <section className="DefaultTopBanner">
        <div className="container">
          <div className="row"></div>
        </div>
      </section>
      <section className="MultiStepForm">
        <div className="container">
          <div className="row">
            <div className="accordion_single_items" id="accordion_single_items">
              <div className="accordion-item">
                <form id="step2">
                  <div className="grid">
                    <div className="form__group field">
                      <select
                        type="select"
                        name="brand_id"
                        className="col-md-6 mb-1 form-control form-select"
                        style={{ width: "100%" }}
                        onChange={(e) => handleBrandSelection(e.target?.value)}
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
                      <label htmlFor="SelYear" class="form__label">
                        Brand
                      </label>
                    </div>
                    <div className="form__group field">
                      <select
                        type="select"
                        name="model_id"
                        className="col-md-6 mb-1 form-control form-select"
                        style={{ width: "100%" }}
                        onChange={(e) => handleModelSelection(e.target?.value)}
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
                      <label for="VarientName" className="form__label">
                        Select Varient
                      </label>
                    </div>
                    <div className="form__group field">
                      <select
                        type="select"
                        name="rto_city"
                        id="rto_city"
                        className="col-md-6 mb-1 form-control form-select"
                        style={{ width: "100%" }}
                        onChange={(e) => handleCitySelection(e.target?.value)}
                        required
                      >
                        <option selected disabled>
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
                      <label htmlFor="rto_city" className="form__label">
                        Select RTO City
                      </label>
                    </div>
                    <div className="form__group field">
                      <input
                        type="input"
                        class="form__field"
                        placeholder="Enter Manufacturing year"
                        name="manufacturing_year"
                        id="manufacturing_year"
                        value={statePayload.manufacturing_year}
                        onChange={handleInput}
                        required
                      />
                      <label htmlFor="manufacturing_year" class="form__label">
                        Manufacturing Year
                      </label>
                    </div>
                    <div className="form__group field">
                      <input
                        type="number"
                        class="form__field"
                        placeholder="Enter total KMs in odometer"
                        name="kms_driven"
                        id="kms_driven"
                        value={statePayload.kms_driven}
                        onChange={handleInput}
                        required
                      />
                      <label htmlFor="kms_driven" class="form__label">
                        Enter total KMs in odometer
                      </label>
                    </div>
                    <div className="form__group field ownership-Fields d-flex">
                      <label htmlFor="ownership" class="form__label">
                        Ownership History
                      </label>
                      <div className="checkboxbutton">
                        <input
                          type="radio"
                          id="ownership"
                          name="ownership"
                          value="1st Owner"
                          checked={statePayload.ownership === "1st Owner"}
                          onChange={handleInput}
                        />
                        <label className="btn btn-default" htmlFor="ownership">
                          1st Owner
                        </label>
                      </div>
                      <div className="checkboxbutton">
                        <input
                          type="radio"
                          id="ownership"
                          name="ownership"
                          value="2nd Owner"
                          checked={statePayload.ownership === "2nd Owner"}
                          onChange={handleInput}
                        />
                        <label className="btn btn-default" htmlFor="ownership">
                          2nd Owner
                        </label>
                      </div>
                      <div className="checkboxbutton">
                        <input
                          type="radio"
                          id="ownership"
                          name="ownership"
                          value="3rd Owner"
                          checked={statePayload.ownership === "3rd Owner"}
                          onChange={handleInput}
                        />
                        <label className="btn btn-default" htmlFor="ownership">
                          3rd Owner
                        </label>
                      </div>
                      <div className="checkboxbutton">
                        <input
                          type="radio"
                          id="ownership"
                          name="ownership"
                          value="4th Owner"
                          checked={statePayload.ownership === "4th Owner"}
                          onChange={handleInput}
                        />
                        <label className="btn btn-default" htmlFor="ownership">
                          4th Owner
                        </label>
                      </div>
                    </div>
                    <div className="form__group field ">
                      <button
                        to="finalValue"
                        className="btn theme-btn next-step"
                        onClick={handleSubmit}
                      >
                        CHECK PRICE
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default CarValuation;
