// components/modals/DealerLoginModal.js
import React from 'react';
import { useRef } from 'react';
import dealerLoginImage from '../../images/main/user-login.png';

function DealerLoginModal({ onClose }) {
    const modalRef = useRef();

    const closeModal = (e) => {
        if (modalRef.current === e.target) {
            onClose();
        }
    };

    return (
        <div className="defaultModal" id="dealerLoginModal" ref={modalRef} onClick={closeModal}>
            <div class="modal-dialog">
                <div class="modal-content">
                    <button onClick={onClose} type="button" class="close border-none" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <div class="modal-body">
                        <figure className="text-center"><img src={dealerLoginImage} alt="" /></figure>
                        <h5 class="modal-title">LOGIN USING AUTOSCAN <br /> CREDENCIALS</h5>
                        <p class="s-para">for Better Experience, Order tracking & Regular updates</p>
                        <form id="DealerLoginForm">
                            <div class="form__group field">
                                <input type="text" class="form__field" placeholder="dealerMobNumber" name="dealerMobNumber" id="dealerMobNumber" required />
                                <label for="dealerMobNumber" class="form__label">Enter mobile number</label>
                                <p id="validationMessage" class="s-para validationMessage"></p>
                            </div>
                            <div class="form-footer">
                                <button type="button" id="submitButton" class="button">
                                    Send OTP
                                </button>
                                <p class="s-para">By continuing I agree with the <a href="#" class="theme">Privacy Policy</a>,
                                    <a href="#" class="theme">Terms & Conditions</a>
                                </p>

                                <div class="send-otp-section" >

                                    <input type="text" id="otpInput" placeholder="Enter OTP" />
                                    <button type="button" id="verifyOtpButton" class="border-none">Verify OTP</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DealerLoginModal;
