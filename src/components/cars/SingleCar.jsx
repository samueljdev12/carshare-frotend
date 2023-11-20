import React from "react";
import { Link } from 'react-router-dom'
const SingleCar = (props) => {
  return (
    <div className={props.page == "both"? "card col-md-3 mx-2 px-0" : "card"}>
      <img
        src={props.image}
        alt="Card 1"
        className="card-img-top"
      />
      <div className="card-body">
        <h5 className="card-title">{props.name}</h5>
        <p>model: {props.model} </p>
        <p>${props.price}/ hour </p>
        <p>Status: {props.availability == true ? "Available" : "Not Available"}</p>

       {props.page === 'both' &&( <Link to={props.availability ? `/booking/book/${props.id}` : "#"} className={`btn btn-success ${props.availability ? "" : "disabled"}`} aria-disabled={!props.availability}>
          <span className="text-light fw-semibold">{props.availability ? "Book now": "Booked"}</span>
        </Link>)}
      </div>
    </div>
  );
};

export default SingleCar;
