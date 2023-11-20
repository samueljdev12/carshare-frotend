// this file contains everything related to the sign up module
// importing all required modules 
import { useState } from "react";
// Link and userNavigate for navigation from react dom
import { Link, useNavigate} from "react-router-dom";
// all need icons from react icons
import { updateAsync } from "../../reducers/authSlice";
import {
  MdOutlineEmail,
  MdHouse,
  MdPerson,
  MdPhone
} from "react-icons/md";
// needed for redux
// needed for redux
import { useDispatch, useSelector } from "react-redux";

// import userslice info
import { selectUser } from "../../reducers/authSlice";
import { selectIsAuthenticated } from "../../reducers/authSlice";



const Edit = () => {
  const navigate = useNavigate()
    //user data
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const role = localStorage.getItem("role");
    if (!isAuthenticated || role !== "customer") {
      return (
        <div className="alert alert-danger text-center mt-5 w-75 mx-auto " role="alert">
           You are not Authorized to access this page
           <Link to="/login"> Please Login here</Link>
        </div>
      );
    }
  
    let user = useSelector(selectUser);    
    user = user.customer

    // console.log(user);

    const dispatch = useDispatch();
  // initail form data with react hook
  const [formData, setFormData] = useState({
    fname: user.first_Name,
    lname: user.last_Name,
    email: user.email,
    mobile: user.mobile,
    street: user.Address.street,
    suburb: user.Address.suburb,
    state: user.Address.state,
    postcode: user.Address.postcode,
    errors: {},
  });

  // destructure form data
  const {
    fname,
    lname,
    email,
    mobile,
    street,
    suburb,
    state,
    postcode,
    errors,
  } = formData;

 // store the naviagtion property from react router in a variable
  
  const onChange = (e) => {
    // console.log(e);
    // e is the event object that was passed
    setFormData({
      //setFormData
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
 

  // on submit handler for thr form
  const onSubmit = async (e) => {
    e.preventDefault();
    
   
      
    
   // form validations
    const newErrors = {};
    const emailPattern = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    const specialCharPattern = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\|\s]/;
    const numberPattern = /\d+/g;

    // console.log('FirstName', specialCharPattern.test(fname));
    // console.log('LastName', specialCharPattern.test(lname));
     
    // form validations
    if (fname === "" || fname === undefined) {
      console.log("First Name Empty!");
      newErrors.fnameInput = "You must enter your First Name";
    } else if (specialCharPattern.test(fname)) {
      console.log("Invalid First Name");
      newErrors.fnameInput = "First Name should not have special character";
    }

    if (lname === "" || lname === undefined) {
      console.log("Last Name Empty!");
      newErrors.lnameInput = "You must enter your Last Name";
    } else if (specialCharPattern.test(lname)) {
      console.log("Invalid Last Name");
      newErrors.lnameInput = "Last Name should not have special character";
    }

    if (email === "" || email === undefined) {
      console.log("Email Empty!");
      newErrors.emailInput = "You must enter your email";
    } else if (!emailPattern.test(email)) {
      console.log("Invalid Email Format");
      newErrors.emailInput = "Please enter a valid email address";
    }

    if (mobile === "" || mobile === undefined) {
      console.log("Mobile Empty!");
      newErrors.mobileInput = "You must enter your mobile number";
    } else if (!numberPattern.test(mobile)) {
      console.log("Invalid Mobile Format");
      newErrors.mobileInput = "Please enter a valid mobile number";
    }

    if (street === "" || street === undefined) {
      console.log("street Empty!");
      newErrors.streetInput = "You must enter your street";
    }

    if (suburb === "" || suburb === undefined) {
      console.log("suburb Empty!");
      newErrors.suburbInput = "You must enter your suburb";
    }

    if (state === "" || state === undefined) {
      console.log("state Empty!");
      newErrors.stateInput = "You must enter your state";
    }

    if (postcode === "" || postcode === undefined) {
      console.log("postcode Empty!");
      newErrors.postcodeInput = "You must enter your postcode";
    }
    
    // checking for mpty form or missing columns
    if (Object.keys(newErrors).length === 0) {
      setFormData({
        ...formData,
        errors: {
          fnameInput: "",
          lnameInput: "",
          emailInput: "",
          mobileInput: "",
          streetInput: "",
          suburbInput: "",
          stateInput: "",
          postcodeInput: ""
        },
      });

      //create new user object
      const credentials = {
        _id: user._id,
        first_Name: fname,
        last_Name: lname,
        email: email,
        mobile: mobile,
        Address: {
          street,
          suburb,
          state,
          postcode,
        }
      };
      // register user and handle excptions
      try {
        dispatch(updateAsync(credentials))
      
        // handling errors
      } catch (error) {
        console.log("An error cocured");
        throw error
      }

      navigate('/my_account');
    } else {
      setFormData({
        ...formData,
        errors: {
          ...newErrors,
        },
      });
    }
  };

 
  return (
    <>
    {/* alert for successful registration */}
     <div className="modal" id="success">
    <div className="modal-content">
              <p>egistration succesfull, you will be redirected to the login page shortly</p>
              <p>if you are not authomatically redirected click on this link <Link to="/login">Login</Link></p>
        </div>

    {/* alert for unsuccessful registration */}
    </div>
    <div className="modal" id="alert">
    <div className="modal-content">
            <span id="close" className="close bg-success">&times;</span>
            <div class="alert alert-danger mt-5" role="alert">
              An Error ocurred tyr Again!!
           </div>
        </div>
    {/* main content (form) */}
    </div>
      <div className="container d-flex justify-content-center" id="form">
        <form onSubmit={(e) => onSubmit(e)} className="mt-5" id="form-self">
          <div className="text-center ">
            <p className="fs-2 ">update your information</p>
          </div>
          <div className="form-floating mb-3 mt-3 position-relative">
            <input
              type="text"
              className={`form-control ${
                errors.fnameInput ? "is-invalid" : "border-dark"
              }`}
              id="fname"
              placeholder="type your first name here"
              name="fname"
              value={fname}
              onChange={(e) => onChange(e)}
            ></input>
            <label htmlFor="fname" className="form-label opacity-75">
              <MdPerson className="mb-1" /> First Name
            </label>
            {errors.fnameInput && (
              <div className="invalid-tooltip">{errors.fnameInput}</div>
            )}
          </div>
          <div className="form-floating mb-3 position-relative">
            <input
              type="text"
              className={`form-control ${
                errors.lnameInput ? "is-invalid" : "border-dark"
              }`}
              id="lname"
              placeholder="type your last name here"
              name="lname"
              value={lname}
              onChange={(e) => onChange(e)}
            ></input>
            <label htmlFor="lname" className="form-label opacity-75">
              <MdPerson className="mb-1" /> Last name
            </label>
            {errors.lnameInput && (
              <div className="invalid-tooltip">{errors.lnameInput}</div>
            )}
          </div>
          <div className="form-floating mb-3 position-relative">
            <input
              type="email"
              className={`form-control ${
                errors.emailInput ? "is-invalid" : "border-dark"
              }`}
              id="email"
              placeholder="type your Email here"
              name="email"
              value={email}
              onChange={(e) => onChange(e)}
            ></input>
            <label htmlFor="email" className="form-label opacity-75">
              <MdOutlineEmail className="mb-1" /> Email
            </label>
            {errors.emailInput && (
              <div className="invalid-tooltip">{errors.emailInput}</div>
            )}
          </div>
          <div className="form-floating mb-3 position-relative">
            <input
              type="text"
              className={`form-control ${
                errors.mobileInput ? "is-invalid" : "border-dark"
              }`}
              id=""
              placeholder="type mobile here"
              name="mobile"
              value={mobile}
              onChange={(e) => onChange(e)}
              inputMode="numeric"
            ></input>
            <label htmlFor="phone" className="form-label opacity-75">
              <MdPhone className="mb-1" /> Mobile number
            </label>
            {errors.mobileInput && (
              <div className="invalid-tooltip">{errors.mobileInput}</div>
            )}
          </div>
          <div className="form-floating mb-3 position-relative">
            <input
              type="text"
              className={`form-control ${
                errors.streetInput ? "is-invalid" : "border-dark"
              }`}
              id="street"
              placeholder="type address here"
              name="street"
              value={street}
              onChange={(e) => onChange(e)}
            ></input>
            <label htmlFor="street" className="form-label opacity-75">
              <MdHouse className="mb-1" /> Street
            </label>
            {errors.streetInput && (
              <div className="invalid-tooltip">{errors.streetInput}</div>
            )}
          </div>
          <div className="form-floating mb-3 position-relative">
            <input
              type="text"
              className={`form-control ${
                errors.suburbInput ? "is-invalid" : "border-dark"
              }`}
              id="suburb"
              placeholder="type address here"
              name="suburb"
              value={suburb}
              onChange={(e) => onChange(e)}
            ></input>
            <label htmlFor="suburb" className="form-label opacity-75">
              <MdHouse className="mb-1" /> Surburb
            </label>
            {errors.suburbInput && (
              <div className="invalid-tooltip">{errors.suburbInput}</div>
            )}
          </div>
          <div className="form-floating mb-3 position-relative">
            <input
              type="text"
              className={`form-control ${
                errors.stateInput ? "is-invalid" : "border-dark"
              }`}
              id="state"
              placeholder="type address here"
              name="state"
              value={state}
              onChange={(e) => onChange(e)}
            ></input>
            <label htmlFor="state" className="form-label opacity-75">
              <MdHouse className="mb-1" /> State
            </label>
            {errors.stateInput && (
              <div className="invalid-tooltip">{errors.stateInput}</div>
            )}
          </div>
          <div className="form-floating mb-3 position-relative">
            <input
              type="text"
              className={`form-control ${
                errors.postcodeInput ? "is-invalid" : "border-dark"
              }`}
              id="postcode"
              placeholder="type address here"
              name="postcode"
              value={postcode}
              onChange={(e) => onChange(e)}
            ></input>
            <label htmlFor="postcode" className="form-label opacity-75">
              <MdHouse className="mb-1" /> Postcode
            </label>
            {errors.postcodeInput && (
              <div className="invalid-tooltip">{errors.postcodeInput}</div>
            )}
          </div>
          <div className="mb-3 text-center">
            <button type="submit" className="btn btn-success btn-lg w-50">
             Update
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Edit;
