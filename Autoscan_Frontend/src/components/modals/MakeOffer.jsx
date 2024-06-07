import React from "react";

function MakeOffer({ onClose, price }) {
  //   const closeModal = (e) => {
  //     if (modalRef.current === e.target) {
  //       onClose();
  //     }
  //   };
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

            <form action="">
              <div class="form__group field ownership-Fields di-flex fullSpace grid4">
                {increments.map((increment, index) => (
                  <div class="checkboxbutton" key={index}>
                    <input type="radio" id={`offer${index + 1}`} name="Owner" />
                    <label class="btn btn-default" for="Owner">
                      {((price + increment) / 100000).toFixed(2)} lakhs
                    </label>
                  </div>
                ))}
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="button  ">
              Make offer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MakeOffer;
