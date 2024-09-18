import React, { useState } from "react";
import userProfileImg from "../../images/main/userProfileImg.png";

function ProfileSetting() {
  // Initialize state variables for name, phone, and email
  const [name, setName] = useState(
    JSON.parse(localStorage.getItem("user_info"))?.name || ""
  );
  const [email, setEmail] = useState(
    JSON.parse(localStorage.getItem("user_info"))?.email || ""
  );
  const phone = JSON.parse(localStorage.getItem("user_info"))?.phone;

  // Handle the name change
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  // Handle the email change
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // Save changes by calling the API
  const saveChanges = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/customer/update-customer`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            mobileNumber: phone,
            name: name,
            email: email,
          }),
        }
      );

      if (response.ok) {
        const result = await response.json();
        const customer = {
          name: name,
          email: email,
          phone: phone,
        };
        localStorage.setItem("user_info", JSON.stringify(customer));
        alert(result.message);
      } else {
        const result = await response.json();
        alert(result.message);
      }
    } catch (error) {
      console.error("Error saving changes:", error);
      alert("Error saving changes");
    }
  };

  return (
    <div>
      <div className="head">
        <figure className="UserImg">
          <img src={userProfileImg} alt="" />
          <span>
            {name
              ? `${name.split(" ")[0].charAt(0)}${
                  name.split(" ")[1]?.charAt(0) || ""
                }`
              : ""}
          </span>
        </figure>
      </div>
      <div className="BiddingDetails">
        <div className="row">
          <form
            id="loginForm"
            onSubmit={(e) => {
              e.preventDefault();
              saveChanges();
            }}
          >
            <div className="form__group field">
              <input
                type="text"
                className="form__field"
                placeholder="Full Name"
                value={name}
                name="name"
                id="name"
                onChange={handleNameChange} // Handle name input changes
              />
            </div>

            <div className="form__group field">
              <input
                type="tel"
                className="form__field readonly"
                placeholder="+91 999 999 9999"
                value={phone}
                name="mobileNumber"
                id="mobileNumber"
                required
                readOnly
              />
            </div>
            <div className="form__group field">
              <input
                type="email"
                className="form__field"
                placeholder="email"
                name="email"
                id="email"
                value={email}
                onChange={handleEmailChange} // Handle email input changes
                required
              />
              <label htmlFor="email" className="form__label">
                Email ID
              </label>
              <p
                id="emailError"
                className="error-message validationMessage"
              ></p>
            </div>
            <div className="form-footer">
              <button type="submit" id="LoginSubmitButton" className="button">
                SAVE CHANGES
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProfileSetting;
