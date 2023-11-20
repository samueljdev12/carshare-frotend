import React from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectIsAuthenticated } from "../../../reducers/authSlice";

const Nav = (props) => {

  const navigate = useNavigate()
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <header>
      <nav className="p-5 main-bg-color">

        <ul className="nav justify-content-center">
          <li className="nav-item">
            <Link className="nav-link link-dark" to="/dashboard">
              Overview
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link link-dark" to="/customer">
              Customers
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link link-dark" to="/customer_details">
              Bookings
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link link-dark" to="/staff/add_car">
              Add Car
            </Link>
          </li>
        {isAuthenticated &&(
          <li className="nav-item">
          <button
            className="btn btn-danger btn-sm p-2 text-light "
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Logout
          </button>
        </li>
        )}
        </ul>

      
        {/*  modal */}

        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-body">Are you sure you want to logout?</div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  No
                </button>
                <button  type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleLogout}>
                  Yes
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  
  );
};

export default Nav;
