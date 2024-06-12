import React, { useState } from "react";
import axios from "axios";
import LoginModal from "./LoginModal";
import { toast } from "react-toastify";

function MakeOffer({
  onClose,
  price,
  car_id,
  car_addedby_user_id,
  car_addedby_dealer_id,
}) {
  // const [errors, setErrors] = useState({});
  const [showUserModal, setShowUserModal] = useState(false);
  const [statePayload, setStatePayload] = useState({
    orginal_price: "",
    bid_price: "",
  });
  const handleInput = (event) => {
    const { name, value } = event.target;
    setStatePayload((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const submitmakeoffer = (payload) => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/offer/make-offer`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        toast.success("Bidding done successfully");
        
      })
      .catch(function (error) {
        toast.error("Bidding failed");
      });
      onClose();
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    // setErrors({});

    let payload = new FormData();
    payload.append("car_id", car_id);
    payload.append("orginal_price", price);
    payload.append("bid_price", statePayload?.bid_price);
    payload.append("car_addedby_user_id", car_addedby_user_id);
    payload.append("car_addedby_dealer_id", car_addedby_dealer_id);
    if (localStorage.getItem("authUser")) {
      let user_id = localStorage.getItem("user_id");
      payload.append("bidding_user_id", user_id);
      submitmakeoffer(payload);
    } else {
      setShowUserModal(true);
    }
  };
  const increments = [50000, 100000, 150000, 200000, 250000, 300000, 350000];
  return (
    <div className="defaultModal" id="makeOfferModal">
      <div className="modal-dialog">
        <div className="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">MAKE YOUR OFFER</h5>
            <button
              type="button"
              onClick={onClose}
              class="close border-none"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form action="">
            <div class="modal-body">
              <div class="offerHighlightsContainer">
                <div class="grid2">
                  <div>
                    <p>Highest price</p>
                    <h6 class="lastPrice bold">
                      {" "}
                      {(price / 100000).toFixed(2)} lakhs
                    </h6>
                  </div>
                  <div>
                    <p>Number of offers made</p>
                    <h6 class="totalOffer bold">5 offers</h6>
                  </div>
                </div>
              </div>

              <div class="form__group field ownership-Fields di-flex fullSpace grid4">
                {increments.map((increment, index) => (
                  <div class="checkboxbutton" key={index}>
                    <input
                      type="radio"
                      id={`offer${index + 1}`}
                      name="bid_price"
                      onChange={handleInput}
                      value={price + increment}
                    />
                    <label class="btn btn-default" for="bid_price">
                      {((price + increment) / 100000).toFixed(2)} lakhs
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="button" onClick={handleSubmit}>
                Make offer
              </button>
            </div>
          </form>
        </div>
      </div>
      <div>
        {" "}
        {showUserModal && (
          <LoginModal
            pathRoute={"/inspection-car"}
            onClose={() => setShowUserModal(false)}
          />
        )}
      </div>
    </div>
  );
}

export default MakeOffer;
