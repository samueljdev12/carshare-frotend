import { useSelector, useDispatch } from "react-redux";
import { selectCustomers, getAllCustomers } from "../../reducers/staffSlice";
import { useEffect } from "react";
import { selectIsAuthenticated } from "../../reducers/authSlice";

const Dashboard = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const role = localStorage.getItem("role")
  const dispatch = useDispatch();
  let customers = [];
  let data = useSelector(selectCustomers);
  if(isAuthenticated && role =="staff"){
    customers = data;
  }

  useEffect(() => {
    dispatch(getAllCustomers());
  }, [dispatch]);



    const Ban = customers.filter(user => user.ban == true)

    if (!isAuthenticated || role !== "staff") {
      return (
        <div className="alert alert-danger text-center mt-5 w-75 mx-auto " role="alert">
           You are not Authorized to access this page
        </div>
      );
    }
    
  return (
    <div className="container pt-5">
      <div className="container bg-light">
        <h3 className="text-center">Customers overview</h3>
        <div className="row my-4 text-center ">
          <div className="col-sm-12 col-lg-4 border p-3 bg-light text-dark border-dark rounded">
            <h4 className="text-center">Total number of cutomers</h4>
            <p>{customers.length}</p>
          </div>
          <div className="col-sm-12 col-lg-4 border p-3 bg-light text-dark border-dark rounded">
            <h4 className="text-center">Banned</h4>
            <p>{Ban.length}</p>
          </div>
          <div className="col-sm-12 col-lg-4 border p-3 bg-light text-dark border-dark rounded">
            <h4 className="text-center">Active</h4>
            <p>{customers.length}</p>
          </div>
        </div>
      </div>
      <div className="container bg-light">
        <h3>Bookings overview</h3>
        <div className="row my-4 text-center ">
          <div className="col-sm-12 col-lg-4 border p-3 bg-light text-dark border-dark rounded">
            <h4 className="text-center">Total number of Bookings</h4>
            <p>456</p>
          </div>
          <div className="col-sm-12 col-lg-4 border p-3 bg-light text-dark border-dark rounded">
            <h4 className="text-center">Ended</h4>
            <p>20</p>
          </div>
          <div className="col-sm-12 col-lg-4 border p-3 bg-light text-dark border-dark rounded">
            <h4 className="text-center">Active</h4>
            <p>200</p>
          </div>
        </div>
      </div>
      <div className="container bg-light">
        <h3> overview</h3>
        <div className="row my-4 text-center ">
          <div className="col-sm-12 col-lg-4 border p-3 bg-light text-dark border-dark rounded">
            <h4 className="text-center">Total Income</h4>
            <p>456</p>
          </div>
          <div className="col-sm-12 col-lg-4 border p-3 bg-light text-dark border-dark rounded">
            <h4 className="text-center">Banned</h4>
            <p>20</p>
          </div>
          <div className="col-sm-12 col-lg-4 border p-3 bg-light text-dark border-dark rounded">
            <h4 className="text-center">Active</h4>
            <p>200</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
