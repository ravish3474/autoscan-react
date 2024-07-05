import React from 'react';
import "../style/requestCallBack.css"; // Import BuyCar.css

function RequestCallBack() {
    return (
        <>
            <section class="upperBanner DefaultTopBanner">
                <div class="container">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="card bg-none border-none">
                                <h5 class="card-title">
                                    GET THE BEST FOR YOU CAR <br />
                                    INSPECTED ACCURATELY
                                </h5>
                                <a target="_blank" href="https://web.whatsapp.com/" class="theme-btn">REQUEST CALL</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section class="whyChooseUS">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-8 col-md-7 left-side">
                            <div class="upper-side">
                                <h2 class="card-title">
                                    Why choose us?
                                </h2>
                                <div class="cards">
                                    <div class="inner-box">
                                        <div class="icon">
                                            <ion-icon name="person-add-outline"></ion-icon>
                                        </div>
                                        <div>
                                            <h6 class="highlight-title">
                                                160+
                                            </h6>
                                            <p>Monthly Users</p>
                                        </div>
                                    </div>
                                    <div class="inner-box">
                                        <div class="icon">
                                            <ion-icon name="person-add-outline"></ion-icon>
                                        </div>
                                        <div>
                                            <h6 class="highlight-title">
                                                350000
                                            </h6>
                                            <p>Dealers</p>
                                        </div>
                                    </div>
                                    <div class="inner-box">
                                        <div class="icon">
                                            <ion-icon name="person-add-outline"></ion-icon>
                                        </div>
                                        <div>
                                            <h6 class="highlight-title">
                                                233
                                            </h6>
                                            <p>Live Listing</p>
                                        </div>
                                    </div>
                                    <div class="inner-box">
                                        <div class="icon">
                                            <ion-icon name="person-add-outline"></ion-icon>
                                        </div>
                                        <div>
                                            <h6 class="highlight-title">
                                                4hrs
                                            </h6>
                                            <p>Get report in 4 hrs</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div class="lower-side">
                                <h2 class="card-title">
                                    What do we look at
                                </h2>
                                <p>Our comprehensive inspection of the car covers the following items. You can view the sample
                                    report for more details.</p>
                                <ul class="p-0">
                                    <div>
                                        <li class="d-flex"><ion-icon name="checkmark-outline"></ion-icon> Accessories
                                        </li>
                                        <li class="d-flex"><ion-icon name="checkmark-outline"></ion-icon> Exterior</li>
                                        <li class="d-flex"><ion-icon name="checkmark-outline"></ion-icon> Transmission
                                        </li>
                                    </div>
                                    <div>
                                        <li class="d-flex"><ion-icon name="checkmark-outline"></ion-icon> Suspension</li>
                                        <li class="d-flex"><ion-icon name="checkmark-outline"></ion-icon> Interior</li>
                                        <li class="d-flex"><ion-icon name="checkmark-outline"></ion-icon> Electrical</li>
                                    </div>
                                </ul>
                                <a href="#">VIEW SAMPLE REPORT &nbsp; <ion-icon name="arrow-forward-outline"></ion-icon></a>
                            </div>
                        </div>
                        <div class="col-lg-4 col-md-5 right-side RequestCallDiv">
                            <div class="card bg-none border-none">
                                <h2 class="card-title">
                                    Request call
                                </h2>

                                <form action="">
                                    <div class="form__group field">
                                        <input type="input" class="form__field" placeholder="Name" name="name" id='name' required />
                                        <label for="name" class="form__label">Name</label>
                                    </div>
                                    <div class="form__group field">
                                        <input type="input" class="form__field" placeholder="Number" name="Number" id='Number' required />
                                        <label for="name" class="form__label">Number</label>
                                    </div>
                                    <div class="form__group field form-btns ">
                                        <button class="RequestBtn btn" type="submit" data-action="RequestBtn">REQUEST
                                            CALL</button>
                                        <div class="login__or">Or</div>
                                        <button class="WhatsapBtn btn" type="submit" data-action="WhatsapBtn">CONNECT THROUGH
                                            WHATSAP</button>

                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default RequestCallBack