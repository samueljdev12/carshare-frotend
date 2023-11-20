import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import SingleCar from "../cars/SingleCar";
import { selectCarById, getCarAsync } from "../../reducers/carsSlice";


const Booking = () => {
  // use dispact
   const dispatch = useDispatch();
   useEffect(() =>{
       dispatch(getCarAsync())
   }, [dispatch])
   const {id }= useParams();
 
  // booking selctors
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const selectedCar = useSelector(state => selectCarById(state, id));
  let { name, model, price, availabilty, imageUrl } = selectedCar;
  

 
  

  
  const date = new Date();
  const getCurrentDate = () => {
    let currentDay = String(date.getDate()).padStart(2, "0");
    let currentMonth = String(date.getMonth() + 1).padStart(2, "0");
    let currentYear = date.getFullYear();

    return `${currentYear}-${currentMonth}-${currentDay}`;
  };

  const addDaysToDate = (date, days) => {
    const result = new Date(date);
    result.setDate(date.getDate() + days);
    return result;
  };

  const getNext1Day = () => {
    const today = new Date();
    const next1Day = new Date(today);
    next1Day.setDate(today.getDate() + 1);
  
    const next1DayDay = String(next1Day.getDate()).padStart(2, "0");
    const next1DayMonth = String(next1Day.getMonth() + 1).padStart(2, "0");
    const next1DayYear = next1Day.getFullYear();
  
    return `${next1DayYear}-${next1DayMonth}-${next1DayDay}`;
  };

  // ca;culte hours
  function calculateHoursBetweenDates(date1, date2) {
    const startTimestamp = date1.getTime();
    const endTimestamp = date2.getTime();
  
    // Calculate the difference in milliseconds
    const timeDifference = endTimestamp - startTimestamp;
  
    // Convert milliseconds to hours
    const hoursDifference = timeDifference / (1000 * 60 * 60);
  
    return hoursDifference;
  }

  // fuva
  

  const [formData, setFormData] = useState({
    startDate: getCurrentDate(),
    endDate: getNext1Day(),
    payment: "Credit",
  });


 
  // Handle the change event when an option is selected
  const handleChange = e =>{
    setFormData({
      ...formData, [e.target.name]: e.target.value
    })
  }

   // destructure the state
   const { startDate, endDate, payment } = formData;
   console.log(`the start date is ${startDate}, the end date is ${endDate} and the payment method is ${payment}`)
     
  


  // dates   
  // const date1 = new Date(startDate)
  // const date2 = new Date(endDate)


  // const hours = calculateHoursBetweenDates(date1, date2)
   
  // const [totalPrice, setTotalPrice] = useState(hours * price)
  // console.log(totalPrice)
  // useEffect(() =>{
  //      if(startDate == endDate){
  //       setTotalPrice(100)
  //      }else{setTotalPrice(hours * price)}
       
  // }, [startDate, endDate])

  // const handleSubmit = (e) => {
  //   e.preventDefault();
    
  // };

  const getNextYear = () => {
    let nextYearDate = addDaysToDate(date, 180);
    let nextYearDay = String(nextYearDate.getDate()).padStart(2, "0");
    let nextYearMonth = String(nextYearDate.getMonth() + 1).padStart(2, "0");
    let nextYearYear = nextYearDate.getFullYear();

    return `${nextYearYear}-${nextYearMonth}-${nextYearDay}`;
  };


  return isAuthenticated ? (
    <div className="container">
      <div className="row">
        <div className="col-12 col-md-6 text-center mb-2 mt-3">
          <Link
            to="/booking"
            className="icon-link link-success link-underline link-underline-opacity-0 fs-5"
          >
            <BsArrowLeft />
            Back
          </Link>
        </div>
        <div className="col-12 text-center mb-3">
          <p className="mb-4 text-center fs-2">Booking Details</p>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-md-4 text-center mb-3">
          <SingleCar
            name={name}
            model={model}
            price={price}
            availabilty={availabilty}
            image={imageUrl}
          />
        </div>
        <div className="col-12 col-md-8 mt-md-5">
          <h5>Total Price: ${price}</h5>
          <div className="input-group mb-3">
            <span htmlFor="startDate" className="input-group-text">
              Start Date:
            </span>
            <input
              onChange={(e) => handleChange(e)}
              type="date"
              className="form-control"
              id="startDate"
              name="startDate"
              value={startDate}
              min={getCurrentDate()}
              max={getNextYear()}
            />
          </div>
          <div className="input-group mb-3">
            <span htmlFor="endDate" className="input-group-text">
              End Date:
            </span>
            <input
              type="date"
              className="form-control"
              id="endDate"
              name="endDate"
              value={endDate}
              min={getCurrentDate()}
              max={getNextYear()}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="input-group mb-3">
            <span htmlFor="payment" className="input-group-text">
              Payment Method:
            </span>
            <select
              value={payment}
              onChange={(e) => handleChange(e)}
              name="payment"
              id="payment"
              className="form-select"
            >
            <option hidden>-- Choose Your Payment Method --</option>
            <option value="cash">Cash</option> */
            <option value="Credit">Credit Card</option>
            </select>
          </div>
          <div className="text-center">
            <Link to={`/booking/confirm/${name}/${price}/${startDate}/${endDate}/${id}`}
              className="btn btn-success btn-lg w-50 mb-5 "
            >
              Book
            </Link>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="alert alert-danger text-center mt-5 w-75 mx-auto " role="alert">
           You are not Authorized to access this page
           <Link to="/login"> Please Login here</Link>
    </div>
  );
  
  
};

export default Booking;
