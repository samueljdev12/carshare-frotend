import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectBookings,
  cancelAsync,
  getAsync,
  selectError,
  selectIsLoading,
} from "../../reducers/bookingSlice";
import printReceipt from "../../utilities/printReceipt ";
import { selectIsAuthenticated } from "../../reducers/authSlice";



const MyAccount = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const role = localStorage.getItem("role");
  const dispatch = useDispatch();
  const error = useSelector(selectError);
  const isLoading = useSelector(selectIsLoading);
  const bookings = useSelector(selectBookings);
  const generatePdfReceipt = printReceipt;
  
  useEffect(() => {
    isAuthenticated
      dispatch(getAsync());
  }, [isAuthenticated, dispatch]);
  
  if (!isAuthenticated || role !== "customer") {
    return (
      
         <div className="alert alert-danger text-center mt-5 w-75 mx-auto " role="alert">
           You are not Authorized to access this page
           <Link to="/login"> Please Login here</Link>
        </div>
    
    );
  }
  
  const user = JSON.parse(localStorage.getItem("userData"));
  console.log(user)
  const customer = user.customer;


  const handleCancelBooking = async (booking) => {
    dispatch(cancelAsync(booking._id))
      .then((result) => {
        if (cancelAsync.fulfilled.match(result)) {
          // localStorage.removeItem("userBookings")
          // dispatch(getAsync())
          console.log("success")
        }
      })
      .catch((error) => {
        console.log(`an error occured ${error}`);
      });
  };


  return (
    <div>
      <div className="container">
        <div className="container">
          <div className="row">
            <div className="col-md-8 mx-auto">
              <div className="card bg-light mt-5">
                <div className="card-header bg-primary text-white">
                  <h5 className="card-title mb-0 text-md-center ">
                    Your Account Information
                  </h5>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6">
                      <h6 className="card-subtitle mb-2 text-secondary">
                        <span className="fw-bold">First Name:</span>{" "}
                        {customer.first_Name}
                      </h6>
                      <h6 className="card-subtitle mb-2 text-secondary">
                        <span className="fw-bold">Last Name:</span>{" "}
                        {customer.last_Name}
                      </h6>
                      <h6 className="card-subtitle mb-2 text-secondary">
                        <span className="fw-bold">Phone:</span>{" "}
                        {customer.mobile}
                      </h6>
                      <h6 className="card-subtitle mb-2 text-secondary">
                        <span className="fw-bold">Email:</span> {customer.email}
                      </h6>
                    </div>
                    <div className="col-md-6">
                      <h6 className="card-subtitle mb-2 text-secondary">
                        <span className="fw-bold">Street:</span>{" "}
                        {customer.Address.street}
                      </h6>
                      <h6 className="card-subtitle mb-2 text-secondary">
                        <span className="fw-bold">Suburb:</span>{" "}
                        {customer.Address.suburb}
                      </h6>
                      <h6 className="card-subtitle mb-2 text-secondary">
                        <span className="fw-bold">State:</span>{" "}
                        {customer.Address.state}
                      </h6>
                      <h6 className="card-subtitle mb-2 text-secondary">
                        <span className="fw-bold">Post Code:</span>{" "}
                        {customer.Address.postcode}
                      </h6>
                    </div>
                  </div>
                </div>
                <div className="card-footer text-center">
                  <Link className="btn btn-primary" to="/edit">
                    Update
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container my-3 w-75">
        {/* Sorting options UI */}
        {/* <div className="mb-3 w-50 m-auto ">
          <label htmlFor="sortOption" className="form-label">
            Sort cars:
          </label>
          <select
            id="sortOption"
            className="form-select"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="All">All</option>
            <option value="ThisWeek">This Week</option>
            <option value="ThisMonth">This Month</option>
          </select>
        </div> */}
        {error && (
          <div>
            <div className="alert alert-danger" role="alert">
              An error coccured while fetching data
            </div>
          </div>
        )}
        {isLoading && (
          <div className="alert alert-info" role="alert">
             Fetch data
          </div>
        )}
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <div key={booking._id} className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">Booking Information</h5>
                <div className="row">
                  <div className="col-md-6">
                    <p className="card-text">
                      <strong>Car Name:</strong> {booking.serviceOrItemBooked}
                    </p>
                    <p className="card-text">
                      <strong>Price:</strong> ${booking.price}
                    </p>
                  </div>
                  <div className="col-md-6">
                    <p className="card-text">
                      <strong>Booking Date:</strong> {booking.bookingDate}
                    </p>
                    <div className="btn-group" role="group">
                      {/* {new Date(booking.bookingDate) > Date.now() ? ( */}
                      <button
                        className="btn btn-danger"
                        onClick={() => handleCancelBooking(booking)}
                      >
                        Cancel
                      </button>
                      {/* ) : (
                        ""
                      )} */}

                      <button
                        className="btn btn-primary"
                        onClick={(booking) => generatePdfReceipt(booking)} // Pass the booking to generateIn
                      >
                        Print Receipt
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="py-5 mb-5 text-center">
            <p>You have no bookings.</p>
          </div>
        )}
      </div>
    </div>
  );
};

MyAccount.propTypes = {};

export default MyAccount;
