// components/Footer.js
import React from "react";
import facebook from "../images/vector/facebook.png"; // Import image for left side
import instagram from "../images/vector/instagram.png"; // Import image for left side
import linkdin from "../images/vector/linkdin.png"; // Import image for left side
import mail from "../images/vector/mail.png"; // Import image for left side
import submitMail from "../images/vector/submitMail.png"; // Import image for left side
import Frame from "../images/vector/Frame.png"; // Import image for left side
import logo from "../images/logo/usedcarwalelogo.png"; // Import logo

function Footer() {
  return (
    <section className="footer" id="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-6 leftSide">
            <div className="card bg-none border-none">
              <figure className="footerLogo">
                <img src={logo} alt="" />
              </figure>
              <p className="desc">
                Used Car Wale is the most trusted platform for purchasing and
                selling pre-owned vehicles. Choose online and schedule a
                inspection for valuation at your home or at a Used Car Wale
                center nearby. At Used Car Wale, we understand the significance
                of this principle and share the same philosophy of never
                underselling or overbuying. With Used Car Wale, you can trust
                that our valuation system is designed to provide transparent and
                objective assessments, helping you strike the right balance in
                your used car transactions.
              </p>
              <div className="socialLinks">
                <a href="#">
                  <img src={facebook} alt="" />
                </a>
                <a href="#">
                  <img src={instagram} alt="" />
                </a>
                <a href="#">
                  <img src={linkdin} alt="" />
                </a>
                <a href="#">
                  <img src={mail} alt="" />
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-6 rightSide">
            <div className="card bg-none border-none">
              <h4 className="form-title">Let us reach you on your email!</h4>
              <form id="">
                <div className="form__group field">
                  <input
                    type="input"
                    className="form__field"
                    placeholder="Enter you email"
                    name="subscribeMail"
                    id="subscribeMail"
                    required
                  />
                  <button type="submit" className="btn submitBtn">
                    <img src={submitMail} alt="" />
                  </button>
                  <label for="subscribeMail" className="form__label">
                    Enter you email
                  </label>
                </div>
              </form>
              <div className="quickLinks">
                <ul className="p-0">
                  <li>
                    <a href="#">About Us</a>
                  </li>
                  <li>
                    <a href="#">Register as a dealer</a>
                  </li>
                  <li>
                    <a href="#">Privacy policy and agreement</a>
                  </li>
                </ul>
                <figure>
                  <img src={Frame} alt="" />
                </figure>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Footer;
