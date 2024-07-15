import React, { useState, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import loginDefaultImage from "../../images/main/user-login.png";

function LoginModal({ onClose, pathRoute }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userError, setUserError] = useState("");
  const [passError, setPassError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState([]);
  const [buttonLoading, setButtonLoading] = useState(false);
  const history = useHistory();
  const modalRef = useRef();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      onClose();
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    setUserError("");
    setPassError("");

    if (!username.trim()) {
      setUserError("Please enter a valid username");
      return;
    }

    if (!password.trim()) {
      setPassError("Please enter a valid password");
      return;
    }

    // Form submission logic here
    let formData = {
      username: username.trim(),
      password: password.trim(),
    };

    let config = {
      method: "post",
      url: `${process.env.REACT_APP_API_URL}/customer/login`,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(formData),
    };

    setButtonLoading(true);

    try {
      const res = await axios(config);

      if (res.status === 200 && res.data.status === "success") {
        setButtonLoading(false);
        localStorage.setItem("authUser", JSON.stringify(res.data));
        localStorage.setItem("auth_token", res.data.accessToken);
        localStorage.setItem("user_info", JSON.stringify(res.data.customer));
        localStorage.setItem("user_id", res.data.customer.id);
        localStorage.setItem("logintime", new Date());
        setIsLoggedIn(true);
        history.push(pathRoute);
        onClose();
      } else if (res.status === 200 && res.data.status === "fail") {
        setErrors([res.data?.msg]);
      }
    } catch (error) {
      console.log("form validation error", error);
      if (error.response && error.response.data) {
        setErrors([error.response.data?.msg]);
      } else {
        setErrors(["An error occurred. Please try again."]);
      }
    }

    console.log("Form Data Submitted:", formData);
  };

  return (
    <div
      className="defaultModal"
      id="userLoginModal"
      ref={modalRef}
      onClick={closeModal}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <button
            onClick={onClose}
            type="button"
            className="close border-none"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
          <div className="modal-body">
            <figure className="text-center">
              <img src={loginDefaultImage} alt="Login" />
            </figure>
            <h5 className="modal-title">LOGIN USING AUTOSCAN CREDENTIALS</h5>
            <form id="loginForm" onSubmit={onSubmit}>
              <div className="form__group field">
                <input
                  type="text"
                  className="form__field"
                  placeholder="username"
                  name="username"
                  id="username"
                  required
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setUserError("");
                  }}
                />
                <label htmlFor="username" className="form__label">
                  Email ID
                </label>
                {userError && (
                  <p className="error-message validationMessage">{userError}</p>
                )}
              </div>
              <div className="form__group field">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form__field"
                  placeholder="password"
                  name="password"
                  id="password"
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPassError("");
                  }}
                />
                <a
                  href="#"
                  className="s-anchor togglePassword"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? "Hide Password" : "Show Password"}
                </a>
                <label htmlFor="password" className="form__label">
                  Enter Password
                </label>
                {passError && <p className="text-danger">{passError}</p>}
              </div>
              <div className="form-footer">
                <button
                  type="submit"
                  id="LoginSubmitButton"
                  className="button"
                  disabled={buttonLoading}
                >
                  {buttonLoading ? "Signing In..." : "SIGN IN"}
                </button>
                <Link
                  to="/profile"
                  className="text-center loginFromAnother"
                  onClick={onClose}
                  type="button"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <div className="theme">LOGIN AS USER</div>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;
