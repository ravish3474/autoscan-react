// SellCar.js
import React from 'react';
import '../style/SellCar.css'; // Import BuyCar.css
import { Link } from 'react-router-dom'; // Import Link from React Router

function SellCar() {
    return (
        <div>
            <section className="ActivePageHeader">
                <div className="container">
                    <div className="row">

                        <div className="d-flex align-items-center">
                            <Link to="/" className="active">Home</Link>
                            <span><ion-icon name="chevron-forward-outline"></ion-icon></span>
                            <Link to="/sell-car"
                            >Sell Cars</Link>
                        </div>
                    </div>
                </div>
            </section>
            <section className="DefaultTopBanner">
                <div className="container">
                    <div className="row">
                    </div>
                </div>
            </section>
            <section className="MultiStepForm">
                <div className="container">
                    <div className="row">
                        <h3 className="text-center mb-4 white">SELL YOUR CAR FOR THE BEST PRICES!</h3>

                        <div className="accordion" id="accordionSteps">

                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingStep1">
                                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseStep1" aria-expanded="true" aria-controls="collapseStep1">
                                        <img src="images/vector/Location.png" alt="" className="btn-img" />
                                        Select your city
                                    </button>
                                    <p className="FormValues"><span className="Location">Your City,</span> <span className="Pincode">Your
                                        Pincode</span></p>
                                </h2>
                                <div id="collapseStep1" className="accordion-collapse collapse show" aria-labelledby="headingStep1" data-bs-parent="#accordionSteps">
                                    <div className="accordion-body">
                                        <form id="step1">
                                            <div className="grid">
                                                <div className="form__group field">
                                                    <select className="form__field" name="name" id="SelCity" required>
                                                        <option value="" disabled selected className="form__label">Select City
                                                        </option>
                                                        <option value="dehradun">Dehradun</option>
                                                        <option value="Dehradun2">Dehradun2</option>
                                                        <option value="Dehradun3">Dehradun3</option>
                                                    </select>
                                                    <label for="name" className="form__label">Select City</label>
                                                </div>
                                                <div className="form__group field  pincode">
                                                    <select className="form__field" name="name" id="SelPincode" required>
                                                        <option value="" disabled selected className="form__label">Select Pincode
                                                        </option>
                                                        <option value="248001">248001</option>
                                                        <option value="248001">248001</option>
                                                        <option value="248001">248001</option>
                                                    </select>
                                                    <label for="name" className="form__label">Select Pincode</label>
                                                </div>
                                            </div>
                                            <div className="formFooter">
                                                <button type="button" className="btn next-step" data-bs-target="#collapseStep2">Next</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>


                            <div className="accordion-item" id="step2Accordion">
                                <h2 className="accordion-header" id="headingStep2">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseStep2" aria-expanded="false" aria-controls="collapseStep2">
                                        <img src="images/vector/Car.png" alt="" className="btn-img" /> Car Details
                                    </button>
                                    <p className="FormValues"><span className="SelYear">Make Year |</span> <span className="BrandName">Car
                                        Brand
                                        |</span> <span className="Variant">Car Variant |</span> <span className="ManufacturingYear">Manufacturing
                                            Year |</span>
                                        <span className="RTOcity">RTO City |</span> <span className="TotalDriven">KMs Driven |</span>
                                        <span className="OwnershipHistory">Ownership history</span>
                                    </p>
                                </h2>
                                <div id="collapseStep2" className="accordion-collapse collapse" aria-labelledby="headingStep2" data-bs-parent="#accordionSteps">
                                    <div className="accordion-body">
                                        <form id="step2">
                                            <div className="grid">
                                                <div className="form__group field">
                                                    <select className="form__field" name="name" id="SelYear" required>
                                                        <option value="" disabled selected className="form__label">Select Make Year
                                                        </option>
                                                        <option value="option1">Option1</option>
                                                        <option value="option2">option2</option>
                                                        <option value="option3">option3</option>
                                                    </select>
                                                    <label for="SelYear" className="form__label">Select Make</label>
                                                </div>
                                                <div className="form__group field">
                                                    <select className="form__field" name="name" id="BrandName" required>
                                                        <option value="" disabled selected className="form__label">Enter Brand Name
                                                        </option>
                                                        <option value="option1">Option1</option>
                                                        <option value="option2">option2</option>
                                                        <option value="option3">option3</option>
                                                    </select>
                                                    <label for="BrandName" className="form__label">Select Model</label>
                                                </div>
                                                <div className="form__group field">
                                                    <select className="form__field" name="name" id="CarVariant" required>
                                                        <option value="" disabled selected className="form__label">Select Car
                                                            Variant
                                                        </option>
                                                        <option value="option1">Option1</option>
                                                        <option value="option2">option2</option>
                                                        <option value="option3">option3</option>
                                                    </select>
                                                    <label for="CarVariant" className="form__label">Select Variant</label>
                                                </div>
                                                <div className="form__group field">
                                                    <input type="input" className="form__field" placeholder="Enter Car Varient" name="ManufacturingYear" id='ManufacturingYear' required />
                                                    <label for="ManufacturingYear" className="form__label">Manufacturing
                                                        Year</label>
                                                </div>
                                                <div className="form__group field">
                                                    <select className="form__field" name="name" id="RtoCity" required>
                                                        <option value="" disabled selected className="form__label">RTO City
                                                        </option>
                                                        <option value="option1">Option1</option>
                                                        <option value="option2">option2</option>
                                                        <option value="option3">option3</option>
                                                    </select>
                                                    <label for="RtoCity" className="form__label">Select
                                                        Transmission</label>
                                                </div>
                                                <div className="form__group field">
                                                    <input type="number" className="form__field" placeholder="Enter total KMs in odometer" name="KmRunning" id='KmRunning' required />
                                                    <label for="KmRunning" className="form__label">Enter total KMs in
                                                        odometer</label>
                                                </div>
                                                <div className="form__group field ownership-Fields di-flex fullSpace">
                                                    <label for="KmRunning" className="form__label bold">Ownership history</label>
                                                    <div className="checkboxbutton">
                                                        <input type="radio" id="Owner1" name="Owner" />
                                                        <label className="btn btn-default" for="Owner">1st Owner</label>
                                                    </div>
                                                    <div className="checkboxbutton">
                                                        <input type="radio" id="Owner2" name="Owner" />
                                                        <label className="btn btn-default" for="Owner">2st Owner</label>
                                                    </div>
                                                    <div className="checkboxbutton">
                                                        <input type="radio" id="Owner3" name="Owner" />
                                                        <label className="btn btn-default" for="Owner">3st Owner</label>
                                                    </div>
                                                    <div className="checkboxbutton">
                                                        <input type="radio" id="Owne4" name="Owner" />
                                                        <label className="btn btn-default" for="Owner">4st Owner</label>
                                                    </div>
                                                </div>
                                                <div className="formFooter">
                                                    <button type="button" className="btn prev-step me-2" data-bs-target="#collapseStep1">Previous</button>
                                                    <button type="button" className="btn  next-step" data-bs-target="#collapseStep3">Next</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>


                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingStep3">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseStep3" aria-expanded="false" aria-controls="collapseStep3">
                                        <img src="images/vector/Picture.png" alt="" className="btn-img" /> Car Images
                                    </button>
                                    <p className="FormValues"><span className="frontView">Front View |</span> <span className="frontRightView">Front Right Corner
                                        |</span> <span className="LeftView">Left View |</span> <span className="Rearview">Rear View
                                            |</span>
                                        <span className="Odometer">Odometer |</span> <span className="Others">Others</span>
                                    </p>
                                </h2>
                                <div id="collapseStep3" className="accordion-collapse collapse" aria-labelledby="headingStep3" data-bs-parent="#accordionSteps">
                                    <div className="accordion-body">
                                        <form id="step3" className="carsImageUpload">
                                            <div className="grid">
                                                <div className="relative">
                                                    <label for="frontView1" className="">Front View</label>
                                                    <input type="file" id="frontView1" accept="image/*" onchange="previewImages(event)" multiple />
                                                    <div className="preview" id="frontView1"><img src="images/cars/frontView.png" alt="" />
                                                    </div>
                                                </div>
                                                <div className="relative">
                                                    <label for="frontRightView" className="">Front Right Corner</label>
                                                    <input type="file" id="frontRightView" accept="image/*" onchange="previewImages(event)" multiple />
                                                    <div className="preview" id="frontRightView"><img src="images/cars/FrontRightCorner.png" alt="" />
                                                    </div>
                                                </div>
                                                <div className="relative">
                                                    <label for="LeftView" className="">Left View</label>
                                                    <input type="file" id="LeftView" accept="image/*" onchange="previewImages(event)" multiple />
                                                    <div className="preview" id="LeftView"><img src="images/cars/LeftView.png" alt="" />
                                                    </div>
                                                </div>
                                                <div className="relative">
                                                    <label for="Rearview" className="">Rear view</label>
                                                    <input type="file" id="Rearview" accept="image/*" onchange="previewImages(event)" multiple />
                                                    <div className="preview" id="Rearview"><img src="images/cars/Rearview.png" alt="" />
                                                    </div>
                                                </div>
                                                <div className="relative">
                                                    <label for="Odometer" className="">Odometer</label>
                                                    <input type="file" id="Odometer" accept="image/*" onchange="previewImages(event)" multiple />
                                                    <div className="preview" id="Odometer"><img src="images/cars/frontView.png" alt="" />
                                                    </div>
                                                </div>
                                                <div className="relative">
                                                    <label for="Others" className="">Others/chassis</label>
                                                    <input type="file" id="Others" accept="image/*" onchange="previewImages(event)" multiple />
                                                    <div className="preview" id="Others"><img src="images/cars/frontView.png" alt="" />
                                                    </div>
                                                </div>

                                            </div>
                                            <div className="formFooter">
                                                <button type="button" className="btn prev-step me-2" data-bs-target="#collapseStep2">Previous</button>
                                                <button type="button" className="btn submitBtn" data-bs-toggle="modal" data-bs-target="#SuccesfullPostAdd">Post Add</button>
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

export default SellCar;
