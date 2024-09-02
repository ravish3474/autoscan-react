// components/modals/DealerLoginModal.js
import React from 'react';
import { useRef, useState } from 'react';
import dealerLoginImage from '../../images/main/user-login.png';

function DealerLoginModal({ onClose }) {
    // onclick Send OTP
    const [showOTPSection, setShowOTPSection] = useState(false);
    const [showSendOTPButton, setShowSendOTPButton] = useState(true);
    const [showFormGroup, setShowFormGroup] = useState(true);

    const handleSendOTP = () => {
        setShowOTPSection(true);
        setShowSendOTPButton(false);
        setShowFormGroup(false);
    };
    const handleVerifyOTP = () => {
    };
    // onclick Send OTP
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
                        <h5 class="modal-title">LOGIN USING USEDCARWALE <br /> CREDENCIALS</h5>
                        <p class="s-para">for Better Experience, Order tracking & Regular updates</p>
                        <form id="DealerLoginForm">
                            {showFormGroup && (
                                <div className="form__group field">
                                    <input type="text" className="form__field" placeholder="dealerMobNumber" name="dealerMobNumber" id="dealerMobNumber" required />
                                    <label htmlFor="dealerMobNumber" className="form__label">Enter mobile number</label>
                                    <p id="validationMessage" className="s-para validationMessage"></p>
                                </div>
                            )}
                            <div className="form-footer">
                                {showSendOTPButton && (
                                    <button type="button" id="submitButton" className="button" onClick={handleSendOTP}>
                                        Send OTP
                                    </button>
                                )}
                                <p className="s-para">
                                    By continuing I agree with the <a href="#" className="theme">Privacy Policy</a>,{' '}
                                    <a href="#" className="theme">Terms & Conditions</a>
                                </p>

                                {/* Conditionally render the OTP section based on state */}
                                {showOTPSection && (
                                    <div className="send-otp-section">
                                        <input type="text" id="otpInput" placeholder="Enter OTP" />
                                        <button type="button" id="verifyOtpButton" className="border-none" onClick={handleVerifyOTP}>
                                            Verify OTP
                                        </button>
                                    </div>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DealerLoginModal;
