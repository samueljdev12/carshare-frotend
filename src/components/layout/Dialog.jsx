import React from "react";
import Alert from "./Alert";
import { Link } from "react-router-dom";

const Dialog = (props) => {
  return (
    <div>
  <div
    class="modal fade"
    id="exampleModal1"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header bg-primary text-white">
           {!props.isLoading && ( <h3 class="modal-title fs-5" id="exampleModalLabel">
            Confirm Booking
          </h3>)}
          <button
            type="button"
            class="btn-close btn-close-white"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <h5>Car: {props.serviceOrItemBooked}</h5>
          <h5>From: {props.bookingDate}</h5>
          <h5>To: {props.endDate}</h5>
          <h5>Total Amount: ${props.price}</h5>
          <h5>Payment Method: {props.paymentMethod}</h5>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Cancel
          </button>
          <Link type="button" class="btn btn-primary" data-bs-target="#exampleModal3">
            Confirm
          </Link>
        </div>
      </div>
    </div>
  </div>
</div>

  );
};

export default Dialog;
