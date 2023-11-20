import React from "react";
import { Link, useParams } from "react-router-dom";
import printReceipt from "../../utilities/printReceipt ";
import { createAsync, selectError, selectSucess, selectIsLoading } from "../../reducers/bookingSlice";
import { useSelector, useDispatch } from "react-redux";
import { Elements, useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { selectIsAuthenticated } from "../../reducers/authSlice";
const stripePromise = loadStripe("pk_test_51Np4NqCAEiKotqf0ciKAAmOMSPSfW2ZDr2JpY6MoJBRJi94IUEt8NLWiqZwgG4tZlg77NxoRbJ4hDSjytzTl7iXI00r8CrdAmm");

const ConfirmBooking = () => {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const role = localStorage.getItem("role");
    const { name, price, startDate, endDate, id } = useParams();
    const dispatch = useDispatch();
    const isLoading = useSelector(selectIsLoading);
    const error = useSelector(selectError);
    const success = useSelector(selectSucess);

  // For receipt
  const booking = {
    serviceOrItemBooked: name,
    price: price,
    bookingDate: startDate
  }

  const handleBookingCreation = async () => {
    try {
        const response = await fetch('/api/booking', {  
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
               
            },
            body: JSON.stringify({
                bookingDate: startDate,  
                serviceOrItemBooked: name, 
                vehicleId: id  
            }),
        });

        const data = await response.json();

        if (response.ok) {
            // Handle successful booking creation
            console.log("Booking was successful:", data);
            dispatch(createAsync.fulfilled(data)); // Dispatch success action with data
        } else {
            // Handle errors returned from the server
            console.error("Error while creating booking:", data.error);
        }
    } catch (error) {
        // Handle errors while making the fetch request
        console.error("Error while sending request:", error);
    }
};

  const StripePayment = () => {
    const stripe = useStripe();
    const elements = useElements();

  const handleStripePayment = async () => {
    // Create a Payment Intent on the backend and get the clientSecret
    const response = await fetch("/api/create-payment", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            amount: price * 100,  // Convert to cents
        }),
    });
    const data = await response.json();
    const clientSecret = data.clientSecret;

    if (clientSecret) {
    // Confirm the payment
    const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
            card: elements.getElement(CardElement),
        },
    });

    if (paymentResult.error) {
        console.error("Stripe payment failed:", paymentResult.error.message);
        alert(paymentResult.error.message)
    } else if (paymentResult.paymentIntent.status === 'succeeded') {
        handleBookingCreation();
    }

    } else {
        console.error("No client secret received from the server.");
    }
};

if (!isAuthenticated || role !== "customer") {
    return (
        <div className="alert alert-danger text-center mt-5 w-75 mx-auto " role="alert">
        You are not Authorized to access this page
        <Link to="/login"> Please Login here</Link>
     </div>
    );
  }

return (
    <div className="payment-container">
        {/* Stripe Card Element for collecting card details */}
        <div className="card-element-container">
            <CardElement className="card-element" />
        </div>
        
        <div className="buttons-container">
            <Link to="/" className="btn btn-secondary btn-block mx-2">
                Cancel
            </Link>
            <button
                className="btn btn-primary btn-block mx-2"
                onClick={handleStripePayment}
            >
                Pay and Confirm Booking
            </button>
        </div>
    </div>
);
}


return (
    <>
        {/* Loading spinner */}
        {isLoading && (
            <div className="overlay">
                <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
                <h5>Booking car in...</h5>
            </div>
        )}

        {/* Display error message */}
        {error && (
            <div className="p-5">
                <div className="alert alert-danger" role="alert">
                    An error occurred while booking. Try again: {error}
                </div>
            </div>
        )}

        {/* Display confirmation when booking is successful */}
        {success && (
            <div className="container text-center ">
                <div className="row border m-5 py-5 rounded">
                    <div className="col-md-12">
                        <div className="confirmation-card">
                            <h2 className="text-center mb-4">Your Booking</h2>
                            <p>
                                <strong>Service/Item Booked:</strong> <span id="serviceName">{name}</span>
                            </p>
                            <p>
                                <strong>Booking Date:</strong> <span id="bookingDate">{startDate}</span>
                            </p>
                            <p>
                                <strong>End Date:</strong> <span id="endDate">{endDate}</span>
                            </p>
                            <p>
                                <strong>Price:</strong> $<span id="price">{price}</span>
                            </p>
                            <p>Print your receipt below</p>
                            <Link className="btn btn-outline-primary mx-2" to="/">Home</Link>
                            <button className="btn btn-outline-success" onClick={() => printReceipt(booking)}>Print receipt</button>
                        </div>
                    </div>
                </div>
            </div>
        )}

        {/* Wrap StripePayment with Elements only when needed */}
        {!isLoading && !error && !success && (
            <Elements stripe={stripePromise}>
                <StripePayment />
            </Elements>
        )}
    </>
);


};

export default ConfirmBooking
