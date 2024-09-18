import React, { useState, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import loginDefaultImage from "../../images/main/user-login.png";

function LoginModal({ onClose, pathRoute,onLogin }) {
  // onclick Send OTP
  const history = useHistory();
  const [showOTPSection, setShowOTPSection] = useState(false);
  const [showSendOTPButton, setShowSendOTPButton] = useState(true);
  const [showFormGroup, setShowFormGroup] = useState(true);
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [verified, setVerified] = useState(false);
  const [resendOTP, setResendOTP] = useState(false);
  const [otpError, setOtpError] = useState(''); 

  
  const handleSendOTP = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/customer/register`, {
        mobileNumber
      });
      console.log(response.data);
      setShowOTPSection(true);
      setShowSendOTPButton(false);
      setShowFormGroup(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleVerifyOTP = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/customer/verify-otp`, {
        mobileNumber,
        otp
      });
      if (response.status==200) {
        setVerified(true);
        localStorage.setItem("authUser", JSON.stringify(response.data));
        localStorage.setItem("auth_token", response.data.accessToken);
        localStorage.setItem("user_info", JSON.stringify(response.data.customer));
        localStorage.setItem("user_id", response.data.customer.id);
        localStorage.setItem("logintime", new Date());
        
        history.push(pathRoute);
        onLogin();
        onClose();
      } else {
        setOtpError(response.data.message); // set error message from API response
      }
      
    } catch (error) {
      console.error(error);
    }
  };

  const handleResendOTP = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/customer/resend-otp`, {
        mobileNumber
      });
      console.log(response.data);
      setResendOTP(true);
    } catch (error) {
      console.error(error);
    }
  };

  const modalRef = useRef();

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      onClose();
    }
  };

  return (
    <div className="defaultModal" id="userLoginModal" ref={modalRef} onClick={closeModal}>
      <div class="modal-dialog">
        <div class="modal-content">
          <button onClick={onClose} type="button" class="close border-none" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          <div class="modal-body">
            <figure className="text-center"><img src={loginDefaultImage} alt="" /></figure>
            <h5 class="modal-title">LOGIN USING USEDCARWALE</h5>
            <p class="s-para">for Better Experience, Order tracking & Regular updates</p>
            <form id="DealerLoginForm">
              {showFormGroup && (
                <div className="form__group field">
                  <input type="text" className="form__field" placeholder="dealerMobNumber" name="dealerMobNumber" id="dealerMobNumber" required value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} />
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
                  <div>
                    {otpError && (
                      <p className="error-message text-danger">Invalid OTP. Please try again.</p> 
                    )}
                    <div className="send-otp-section">
                      <input type="text" id="otpInput" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
                      <button type="button" id="verifyOtpButton" className="border-none" onClick={handleVerifyOTP}>
                        Verify OTP
                      </button>
                    </div>
                    
                  <button type="button" id="resendOtpButton" className="button small" onClick={handleResendOTP}>
                    Resend OTP
                    <small>(if not received)</small>
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

export default LoginModal;