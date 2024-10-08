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

  useEffect(() => {
    fetchBrandData();
    fetchCityData();
    return () => {};
  }, []);

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

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors({});

    if (!validateFields()) return;

    const payload = {
      model_id: statePayload?.model_id,
      brand_id: statePayload?.brand_id,
      varient_id: statePayload?.varient_id,
      brand_name: statePayload?.brand_name,
      model_name: statePayload?.model_name,
      car_img: statePayload?.car_img,
      varient_name: statePayload?.varient_name,
      rto_city: statePayload?.rto_city,
      kms_driven: statePayload?.kms_driven,
      ownership: statePayload?.ownership,
      manufacturing_year: statePayload?.manufacturing_year,
    };

    localStorage.setItem("payload", JSON.stringify(payload));
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
      </section>
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
                        onChange={(e) => handleBrandSelection(e.target?.value,e.target.selectedOptions[0].text)}
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
                          {errors?.brand_id}
                        </small>
                      )}
                      <label htmlFor="SelYear" className="form__label">
                        Brand
                      </label>
                    </div>
                    <div className="form__group field">
                      <select
                        type="select"
                        name="model_id"
                        className="col-md-6 mb-1 form-control form-select"
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
                        <option selected disabled>
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
                      <label htmlFor="BrandName" className="form__label">
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
                          handleVarientSelection(e.target?.value,e.target.selectedOptions[0].text)
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
                          {errors?.varient_id}
                        </small>
                      )}
                      <label htmlFor="VarientName" className="form__label">
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
                      {errors?.rto_city && (
                        <small className="text-danger">
                          {errors?.rto_city}
                        </small>
                      )}
                      <label htmlFor="rto_city" className="form__label">
                        Select RTO City
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
                        type="number"
                        className="form__field"
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
                      <label htmlFor="kms_driven" className="form__label">
                        Enter total KMs in odometer
                      </label>
                    </div>
                    <div className="form__group field ownership-Fields d-flex">
                      <label htmlFor="ownership" className="form__label">
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
                    <div className="form__group field">
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
