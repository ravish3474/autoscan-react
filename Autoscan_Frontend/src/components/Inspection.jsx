// NewPage.js

import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router

function Inspection() {
    return (
        <div>
            <section className="ActivePageHeader">
                <div className="container">
                    <div className="row">

                        <div className="d-flex align-items-center">
                            <Link to="/" className="active">Home</Link>
                            <span><ion-icon name="chevron-forward-outline"></ion-icon></span>
                            <a href="inspection.php">Inspection</a>
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
                        <div className="accordion" id="accordionSteps">
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingStep1">
                                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseStep1" aria-expanded="true" aria-controls="collapseStep1">
                                        <img src="images/vector/Location.png" alt="" className="btn-img " />
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
                                                    <label htmlFor="name" className="form__label">Select City</label>
                                                </div>
                                                <div className="form__group field  pincode">
                                                    <select className="form__field" name="name" id="SelPincode" required>
                                                        <option value="" disabled selected className="form__label">Select Pincode
                                                        </option>
                                                        <option value="248001">248001</option>
                                                        <option value="248001">248001</option>
                                                        <option value="248001">248001</option>
                                                    </select>
                                                    <label htmlFor="name" className="form__label">Select Pincode</label>
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
                                                    <label htmlFor="SelYear" className="form__label">Select Make</label>
                                                </div>
                                                <div className="form__group field">
                                                    <select className="form__field" name="name" id="BrandName" required>
                                                        <option value="" disabled selected className="form__label">Enter Brand Name
                                                        </option>
                                                        <option value="option1">Option1</option>
                                                        <option value="option2">option2</option>
                                                        <option value="option3">option3</option>
                                                    </select>
                                                    <label htmlFor="BrandName" className="form__label">Select Model</label>
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
                                                    <label htmlFor="ManufacturingYear" className="form__label">Manufacturing
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
                                                    <label htmlFor="RtoCity" className="form__label">Select
                                                        Transmission</label>
                                                </div>
                                                <div className="form__group field">
                                                    <input type="number" className="form__field" placeholder="Enter total KMs in odometer" name="KmRunning" id='KmRunning' required />
                                                    <label htmlFor="KmRunning" className="form__label">Enter total KMs in
                                                        odometer</label>
                                                </div>
                                                <div className="form__group field ownership-Fields di-flex fullSpace">
                                                    <label htmlFor="KmRunning" className="form__label bold">Ownership history</label>
                                                    <div className="checkboxbutton">
                                                        <input type="radio" id="Owner" name="Owner" />
                                                        <label className="btn btn-default" htmlFor="Owner">1st Owner</label>
                                                    </div>
                                                    <div className="checkboxbutton">
                                                        <input type="radio" id="Owner2" name="Owner" />
                                                        <label className="btn btn-default" htmlFor="Owner">2st Owner</label>
                                                    </div>
                                                    <div className="checkboxbutton">
                                                        <input type="radio" id="Owner3" name="Owner" />
                                                        <label className="btn btn-default" htmlFor="Owner">3st Owner</label>
                                                    </div>
                                                    <div className="checkboxbutton">
                                                        <input type="radio" id="Owner4" name="Owner" />
                                                        <label className="btn btn-default" htmlFor="Owner">4st Owner</label>
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
                                        <img src="images/vector/Picture.png" alt="" className="btn-img" />Schedule Inspection
                                    </button>
                                </h2>
                                <div id="collapseStep3" className="accordion-collapse collapse" aria-labelledby="headingStep3" data-bs-parent="#accordionSteps">
                                    <div className="accordion-body">
                                        <form id="step3" className="ScheduleInspection">
                                            <div className="grid gridUpper">
                                                <div className="relative">
                                                    <div className="card border-none ScheduleInspectionCard">
                                                        <h6 className="card-title"> AUTO SCAN APPROX VALUE</h6>
                                                        <p className="approxValue"><span className="valueFrom">14,55,556</span>- <span className="valueTo">15,89,400</span></p>
                                                    </div>
                                                </div>
                                                <div className="relative">
                                                    <div className="formHead">
                                                        <ion-icon name="location-outline"></ion-icon>
                                                        <h6 className="formInputTitle">Select Address</h6>
                                                        <h6 className="formInputTitle theme">PIN LOCATION</h6>
                                                    </div>

                                                    <div className="form__group field">
                                                        <input type="input" className="form__field" placeholder="SelectAddress" name="SelectAddress" id='SelectAddress' required />
                                                        <label htmlFor="SelectAddress" className="form__label">Select Address</label>
                                                    </div>
                                                    <div className="grid gridInner">
                                                        <div className="form__group field ">
                                                            <div>
                                                                <input type="input" className="form__field" placeholder="Enter Brand Name" name="FetchArea" id='FetchArea' required />
                                                                <label htmlFor="FetchArea" className="form__label">Area/Locality</label>
                                                            </div>
                                                        </div>
                                                        <div className="form__group field  ">
                                                            <div>
                                                                <input type="input" className="form__field" placeholder="Address2" name="Address2" id='Address2' required />
                                                                <label htmlFor="Address2" className="form__label">Line 2</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <br />
                                                    <div className="form__group field formHead relative">
                                                        <ion-icon name="calendar-outline" className="DateIcon"></ion-icon>
                                                        <h6 className="formInputTitle">Select Date</h6>
                                                        <input type="date" className="border-none" id="SelectMonth" name="SelectMonth" />
                                                        <label htmlFor="SelectMonth" className="form__label theme">OPEN CALENDER
                                                        </label>
                                                    </div>
                                                    <div className="form__group field defaultradio grid grid4  relative">
                                                        <div className="checkboxbutton">
                                                            <input type="radio" id="SelectDate" name="SelectDate" />
                                                            <label className="btn btn-default" htmlFor="SelectDate">14 <br />
                                                                March</label>
                                                        </div>
                                                        <div className="checkboxbutton">
                                                            <input type="radio" id="SelectDate2" name="SelectDate" />
                                                            <label className="btn btn-default" htmlFor="SelectDate">15 <br />
                                                                March</label>
                                                        </div>
                                                        <div className="checkboxbutton">
                                                            <input type="radio" id="SelectDate3" name="SelectDate" />
                                                            <label className="btn btn-default" htmlFor="SelectDate">16 <br />
                                                                March</label>
                                                        </div>
                                                        <div className="checkboxbutton">
                                                            <input type="radio" id="SelectDate4" name="SelectDate" />
                                                            <label className="btn btn-default" htmlFor="SelectDate">18 <br />
                                                                March</label>
                                                        </div>
                                                        <div className="checkboxbutton">
                                                            <input type="radio" id="SelectDate5" name="SelectDate" />
                                                            <label className="btn btn-default" htmlFor="SelectDate">19 <br />
                                                                March</label>
                                                        </div>
                                                    </div>
                                                    <br />
                                                    <div className="formHead">
                                                        <ion-icon name="alarm-outline" className="TimeIcon"></ion-icon>
                                                        <h6 className="formInputTitle">Select Time</h6>
                                                    </div>
                                                    <div className="form__group field defaultradio grid grid4">
                                                        <div className="checkboxbutton">
                                                            <input type="radio" id="SelectTime" name="SelectTime" />
                                                            <label className="btn btn-default" htmlFor="SelectDate">8:00 - <br /> 10:00
                                                                AM</label>
                                                        </div>
                                                        <div className="checkboxbutton">
                                                            <input type="radio" id="SelectTime2" name="SelectTime" />
                                                            <label className="btn btn-default" htmlFor="SelectDate">10:00 - <br /> 12:00
                                                                PM</label>
                                                        </div>
                                                        <div className="checkboxbutton">
                                                            <input type="radio" id="SelectTime3" name="SelectTime" />
                                                            <label className="btn btn-default" for="SelectDate">12:00 - <br /> 02:00
                                                                PM</label>
                                                        </div>
                                                        <div className="checkboxbutton">
                                                            <input type="radio" id="SelectTime4" name="SelectTime" />
                                                            <label className="btn btn-default" htmlFor="SelectDate">2:00 - <br /> 04:00
                                                                PM</label>
                                                        </div>
                                                        <div className="checkboxbutton">
                                                            <input type="radio" id="SelectTime5" name="SelectTime" />
                                                            <label className="btn btn-default" htmlFor="SelectDate">4:00 - <br /> 06:00
                                                                PM</label>
                                                        </div>
                                                    </div>
                                                    <div className="formFooter">
                                                        <ul className="p-0 m-0">
                                                            <li>

                                                                <label htmlFor="MessOnWhatsapp"><ion-icon name="logo-whatsapp"></ion-icon> &nbsp; Give updates on
                                                                    whatsapp
                                                                    9879070345</label>
                                                                <input type="checkbox" name="MessOnWhatsapp" id="MessOnWhatsapp" />
                                                            </li>
                                                        </ul>
                                                        <button type="button" className="btn   prev-step me-2"
                                                            data-bs-target="#collapseStep2">Previous</button>
                                                        <button type="button" className=" next-step btn submitBtn">Schedule</button>
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
            </section >
        </div >
    );
}

export default Inspection;
