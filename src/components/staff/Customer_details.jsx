import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectIsAuthenticated } from "../../reducers/authSlice";

const Customer_details = (props) => {
  const _id = useParams();
  const [data, setData] = useState([]);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const role = localStorage.getItem("role");

  useEffect(() => {
    const getUser = async () => {
      const res = await axios.get(`/api/customer/${_id}`);
      const customer = res.data;
      setData(customer);
    };

    getUser();
  }, []);

  if (!isAuthenticated || role !== "staff") {
    return (
      <div
        className="alert alert-danger text-center mt-5 w-75 mx-auto "
        role="alert"
      >
        You are not Authorized to access this page
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-body">
        <h3 className="card-title text-center">Customer details</h3>
        <div className="container border text-center ">
          <h4>Personal information</h4>
          <p className="card-text">First Name: John Doe</p>
          <p className="card-text">Last Name: John Doe</p>
          <p className="card-text">Email: JohnDoe@gmail.com</p>
          <p className="card-text">Phone: 388337</p>
          <p className="card-text">Address: 89 Maple Lane Chicago, IL 60601</p>
        </div>

        <div className="container border text-center ">
          <h4>Bookings</h4>
          <p className="card-text">Car: Honda</p>
          <p className="card-text">Model: Honda</p>
          <p className="card-text">Seats: 5</p>
          <p className="card-text">price: 600</p>
          <p className="card-text">Start Date: Honda</p>
          <p className="card-text">End Date: Honda</p>
          <p className="card-text">Returned: Yes</p>
        </div>
      </div>
    </div>
  );
};

export default Customer_details;
