import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  getAllCustomers,
  selectCustomers,
  selectErrorStaff,
  selectIsLoadingStaff,
} from "../../reducers/staffSlice";
import { selectIsAuthenticated } from "../../reducers/authSlice";

const Customer = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const role = localStorage.getItem("role")
  const customers = useSelector(selectCustomers);
  const error = useSelector(selectErrorStaff);
  const isloading = useSelector(selectIsLoadingStaff);
  

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCustomers());
  }, [dispatch]);


  if (!isAuthenticated || role !== "staff") {
    return (
      <div className="alert alert-danger text-center mt-5 w-75 mx-auto " role="alert">
         You are not Authorized to access this page
      </div>
    );
  }

  return (
    <div className="container pt-5">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Mobile</th>
            <th>Email</th>
          </tr>
        </thead>

        { <tbody>
          {customers.map((customer) => (
            console.log(customer.first_Name),
            <tr key={customer._id}>
            <td>{customer.first_Name}</td>
            <td>{customer.last_Name}</td>
            <td>{customer.mobile}</td>
            <td>{customer.email}</td>
            <td>
              <Link to={`/customer_details/${customer._id}`} className="link-dark link-underline-opacity-50 link-underline-opacity-100-hover">View Details</Link>
            </td>
          </tr>
          
          ))}
        </tbody> }
      </table>
    </div>
  );
};

export default Customer;
