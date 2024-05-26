// SellCar.js
import React from 'react';
import '../style/CarValuation.css'; // Import BuyCar.css
import { Link } from 'react-router-dom'; // Import Link from React Router

function CarValuation() {
    return (
        <div>
            <section className="ActivePageHeader">
                <div className="container">
                    <div className="row">

                        <div className="d-flex align-items-center">
                            <Link to="/" className="active">Home</Link>
                            <span><ion-icon name="chevron-forward-outline"></ion-icon></span>
                            <a href="sellCar.php">Used Cars</a>
                        </div>
                    </div>
                </div>
            </section> <section className="DefaultTopBanner">
                <div className="container">
                    <div className="row">
                    </div>
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
                                            <select className="form__field" name="name" id="SelYear" required>
                                                <option value="" disabled selected class="form__label">Select Make Year
                                                </option>
                                                <option value="option1">Option1</option>
                                                <option value="option2">option2</option>
                                                <option value="option3">option3</option>
                                            </select>
                                            <label htmlFor="SelYear" class="form__label">Make Year</label>
                                        </div>
                                        <div className="form__group field">
                                            <input type="input" class="form__field" placeholder="Enter Brand Name" name="BrandName" id='BrandName' required />
                                            <label htmlFor="BrandName" class="form__label">Enter Brand Name</label>
                                        </div>
                                        <div className="form__group field">
                                            <select className="form__field" name="name" id="SelYear2" required>
                                                <option value="" disabled selected class="form__label">Select Make Year
                                                </option>
                                                <option value="option1">Option1</option>
                                                <option value="option2">option2</option>
                                                <option value="option3">option3</option>
                                            </select>
                                            <label htmlFor="SelYear2" class="form__label">Make Year</label>
                                        </div>
                                        <div className="form__group field">
                                            <input type="input" class="form__field" placeholder="RTO City" name="RtoCity" id='RtoCity' required />
                                            <label htmlFor="RtoCity" class="form__label">RTO City</label>
                                        </div>
                                        <div className="form__group field">
                                            <input type="input" class="form__field" placeholder="Enter Car Variant" name="CarVariant" id='CarVariant' required />
                                            <label htmlFor="name" class="form__label">Enter Car Variant</label>
                                        </div>
                                        <div className="form__group field">
                                            <input type="number" class="form__field" placeholder="Enter total KMs in odometer" name="KmRunning" id='KmRunning' required />
                                            <label htmlFor="KmRunning" class="form__label">Enter total KMs in
                                                odometer</label>
                                        </div>
                                        <div className="form__group field ownership-Fields d-flex">
                                            <label htmlFor="KmRunning" class="form__label">Ownership History</label>
                                            <div className="checkboxbutton">
                                                <input type="radio" id="Owner" name="Owner" />
                                                <label className="btn btn-default" htmlFor="Owner">1st Owner</label>
                                            </div>
                                            <div className="checkboxbutton">
                                                <input type="radio" id="Owner" name="Owner" />
                                                <label className="btn btn-default" htmlFor="Owner">2st Owner</label>
                                            </div>
                                            <div className="checkboxbutton">
                                                <input type="radio" id="Owner" name="Owner" />
                                                <label className="btn btn-default" htmlFor="Owner">3st Owner</label>
                                            </div>
                                            <div className="checkboxbutton">
                                                <input type="radio" id="Owner" name="Owner" />
                                                <label className="btn btn-default" htmlFor="Owner">4st Owner</label>
                                            </div>

                                        </div>
                                        <div className="form__group field ">
                                            <a href="calculateFinalValue.php">
                                                <button type="button" class="btn theme-btn next-step">CHECK
                                                    PRICE</button>
                                            </a>
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
