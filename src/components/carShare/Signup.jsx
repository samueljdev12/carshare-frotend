// this file contains everything related to the sign up module

// importing all required modules 
import { useState } from "react";
// Link and userNavigate for navigation from react dom
import { Link, useNavigate} from "react-router-dom";
// all need icons from react icons
import {
  MdOutlineEmail,
  MdLock,
  MdHouse,
  MdPerson,
  MdPhone,
  MdInfoOutline,
} from "react-icons/md";

// actions
import { useDispatch } from "react-redux";
import { loginAsync } from "../../reducers/authSlice";
import { selectIsAuthenticated, getuser } from "../../reducers/authSlice";
import { getAsync } from "../../reducers/bookingSlice";

// axios needed for communiaction with backend
import axios from "axios";


const Signup = () => {
  
  // use disptach
  const dispatch = useDispatch();
  // initail form data with react hook
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    mobile: "",
    street: "",
    suburb: "",
    state: "",
    postcode: "",
    password: "",
    r_password: "",
    agreement: false,
    errors: {},
  });

  const [isLoading, setIsLoading] = useState(false);

  let error = false;

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
    password,
    r_password,
    agreement,
    errors,
  } = formData;

 // store the naviagtion property from react router in a variable
  const navigate = useNavigate()
  const onChange = (e) => {
    // console.log(e);
    // e is the event object that was passed
    setFormData({
      //setFormData
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
 
  // checkbox handler
  const onChangeCheckbox = (e) => {
    console.log(e);
    setFormData({
      ...formData,
      [e.target.name]: e.target.checked,
    });
  };
 
  // on submit handler for thr form
  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("Signing up...");
    console.log(formData);
   
      
    
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

    if (password === "" || password === undefined) {
      console.log("Password Empty!");
      newErrors.passwordInput = "You must enter your password";
    } else if (password.length < 8) {
      console.log("Invalid Password Format");
      newErrors.passwordInput = "Please enter a valid password";
    }

    if (r_password === "" || r_password === undefined) {
      console.log("Re-Password Empty!");
      newErrors.rePasswordInput = "You must re-enter your password";
    } else if (password !== r_password) {
      console.log("Re-Password is not the same");
      newErrors.rePasswordInput = "Password is not the same";
    }

    if (agreement === false || agreement === undefined) {
      console.log("Agreement is not checked");
      newErrors.agreementCheckBox = "Please accept the agreement";
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
          postcodeInput: "",
          passwordInput: "",
          rePasswordInput: "",
          agreementCheckBox: false,
        },
      });

      //create new user object
      const newUser = {
        first_Name: fname,
        last_Name: lname,
        email: email,
        mobile: mobile,
        Address: {
          street,
          suburb,
          state,
          postcode,
        },
        password,
      };

      setIsLoading(true);
      // register user and handle excptions
      // try {
        const res = await axios.post("/api/customer", newUser);
        if(res.status === 200){
           const credentials = {
            email,
            password
           }
           
           dispatch(loginAsync(credentials))
           dispatch(getuser());
            dispatch(getAsync())
           navigate("/my_account")

        }else{
           error = true;
        }
        // document.getElementById("success").style.display="block"
        //  setTimeout(()=>{
        //     navigate("/login")
        // }, 2000)
      
        // handling errors
      // } catch (error) {
      // document.getElementsByClassName("modal")[1].style.display="block"
      // const closeButton = document.getElementById("close")
      // closeButton.addEventListener("click", ()=>{
      //    document.getElementsByClassName("modal")[1].style.display="none"
      // })
      //   console.log("An error cocured");
      // }
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
      <div className="container d-flex justify-content-center" id="form">
        {/* spinner */}
          {isLoading && (<div className="overlay text-white">
            <div className="d-flex justify-content-center me-1">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
            <h5>Signing up...</h5>
          </div>)}
        {/* spinner end */}
        <form onSubmit={(e) => onSubmit(e)} className="my-5" id="form-self">
          <div className="text-center fw-semibold">
            <p className="fs-2 fw-medium">Sign up for an account</p>
            <span className="me-1">Already have an account?</span>
            <Link
              to="/login"
              className="link-success link-underline link-underline-opacity-0"
            >
              Login Here!
            </Link>
          </div>
          {error &&(<div className="m-3">
           <h6 className="text-center text-danger ">An error occured while signing you up, try again{error}</h6>
        </div>)}
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
          <div className="form-floating mb-3 position-relative">
            <input
              type="password"
              className={`form-control ${
                errors.passwordInput ? "is-invalid" : "border-dark"
              }`}
              id="password"
              placeholder="type address here"
              name="password"
              value={password}
              onChange={(e) => onChange(e)}
            ></input>
            <label htmlFor="password" className="form-label opacity-75">
              <MdLock className="mb-1" /> Password
            </label>
            {errors.passwordInput && (
              <div className="invalid-tooltip">{errors.passwordInput}</div>
            )}
          </div>
          <div className="form-floating mb-3 position-relative">
            <input
              type="password"
              className={`form-control ${
                errors.rePasswordInput ? "is-invalid" : "border-dark"
              }`}
              id="r_password"
              placeholder="type address here"
              name="r_password"
              value={r_password}
              onChange={(e) => onChange(e)}
            ></input>
            <label htmlFor="r-password" className="form-label opacity-75">
              <MdLock className="mb-1" /> Confirm Password
            </label>
            {errors.rePasswordInput && (
              <div className="invalid-tooltip">{errors.rePasswordInput}</div>
            )}
          </div>
          <div className="mb-3 position-relative">
            <input
              type="checkbox"
              className={`form-check-input me-2 d-inline-block ${
                errors.agreementCheckBox ? "is-invalid" : "border-dark"
              }`}
              id="checkBox"
              name="agreement"
              onChange={(e) => onChangeCheckbox(e)}
              checked={agreement}
              value={false}
            ></input>
            <label htmlFor="checkBox" className="form-check-label text-center">
              <MdInfoOutline className="mb-1" /> I agree to carShare privacy,
              terms and condtions
            </label>
            {errors.agreementCheckBox && (
              <div className="invalid-tooltip">{errors.agreementCheckBox}</div>
            )}
          </div>
          <div className="mb-4 fw-semibold">
            <span className="me-1">Already have an account?</span>
            <Link
              to="/login"
              className="link-success link-underline link-underline-opacity-0"
            >
              Login Here!
            </Link>
          </div>
          <div className="mb-3 text-center">
            <button type="submit" className="btn btn-success btn-lg w-50">
              Sign up
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Signup;
