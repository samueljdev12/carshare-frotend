import { MdOutlineEmail, MdLock } from "react-icons/md";
import { useState } from "react";

import { useNavigate, Link } from "react-router-dom";

// import all selectors
import {
  selectIsAuthenticated,
  selectIsLoading,
  selectError,
} from "../../reducers/authSlice";

// needed for redux
import { useDispatch, useSelector } from "react-redux";


// import login async
import { loginAsync } from "../../reducers/authSlice";
// get user
import { getuser } from "../../reducers/authSlice";


const Login = () => {
 
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const isAuthenticated = useSelector(selectIsAuthenticated)
  console.log(isAuthenticated)
  

  const [formData, setFormData] = useState({
    userEmail: "",
    pwd: "",
    errors: {},
  });

  // distruct form
  const { userEmail, pwd, errors } = formData;

  // use navigate for redirecting user
  const navigate = useNavigate();

  // use dispatch for redux actions
  const dispatch = useDispatch();

  if (isAuthenticated) {
   dispatch(getuser())
   navigate("/");
  }

  const onChange = (e) => {
    // console.log(e);

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("Logging in...");

    // Client-side validation
    // console.log("First: ", userEmail === '' || pwd === '');
    // console.log("Second: ", userEmail == undefined && pwd == undefined);
    const newErrors = {};
    const emailPattern = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

    if (userEmail === "" || userEmail === undefined) {
      console.log("Email Empty!");
      newErrors.emailInput = "You must enter your email";
    } else if (!emailPattern.test(userEmail)) {
      console.log("Invalid Email Format");
      newErrors.emailInput = "Please enter a valid email address";
    }

    if (pwd === "" || pwd === undefined) {
      console.log("Password Empty!");
      newErrors.passwordInput = "You must enter your password";
    } else if (pwd.length < 8) {
      console.log("Invalid Password Format");
      newErrors.passwordInput = "Please enter a valid password";
    }

    if (Object.keys(newErrors).length === 0) {
      // Login form valid
      setFormData({
        ...formData,
        errors: {
          emailInput: "",
          passwordInput: "",
        },
      });

      const credentials = {
        email: userEmail,
        password: pwd,
      };

    
        dispatch(loginAsync(credentials))
       
        //redirect user to home page
    } else {
      // Set error
      setFormData({
        ...formData,
        errors: {
          ...newErrors,
        },
      });
    }
  };


  return (
    <div className="container d-flex justify-content-center">
      {/* spinner */}
      {isLoading && (<div className="overlay text-white">
        <div className="d-flex justify-content-center me-1">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
        <h5>Loggin in...</h5>
      </div>)}
        {/* spinner end */}
      <form
        className="w-75 my-5"
        onSubmit={(e) => onSubmit(e)}
      >
        <div className="text-center">
          <p className="mb-3 fs-2">Sign in</p>
          <div className="text-center mb-4 fw-semibold">
            <span className="me-1">Don't have an account?</span>
            <Link
              to="/signup"
              className="link-success link-underline link-underline-opacity-0"
            >
              Signup now!
            </Link>
          </div>
        </div>
        {error && (<div>
           <h6 className="text-center text-danger ">Invalid Email or password {error}</h6>
        </div>)} 
        <div className={`form-floating position-relative ${errors.emailInput ? 'mb-5' : 'mb-4'}`}>
          <input
            type="text"
            id="userEmail"
            name="userEmail"
            className={`form-control ${
              errors.emailInput ? "is-invalid" : "border-dark"
            }`}
            placeholder="name@example.com"
            value={userEmail}
            onChange={(e) => onChange(e)}
          />
          <label htmlFor="userEmail" className="opacity-75">
            <MdOutlineEmail className="mb-1" /> Email
          </label>
          {errors.emailInput && (
            <div className="invalid-tooltip">{errors.emailInput}</div>
          )}
        </div>
        <div className={`form-floating position-relative ${errors.passwordInput ? 'mb-5' : 'mb-4'}`}>
          <input
            type="password"
            id="pwd"
            name="pwd"
            className={`form-control ${
              errors.passwordInput ? "is-invalid" : "border-dark"
            }`}
            placeholder="12345678"
            value={pwd}
            onChange={(e) => onChange(e)}
          />
          <label htmlFor="pwd" className="opacity-75">
            <MdLock className="mb-1" /> Password
          </label>
          {errors.passwordInput && (
            <div className="invalid-tooltip">{errors.passwordInput}</div>
          )}
        </div>
        <div className="form-check mb-3">
          <input
            type="checkbox"
            id="rememberBox"
            value=""
            className="form-check-input me-2 d-inline-block border-dark"
          />
          <label htmlFor="rememberBox" className="form-check-label">
            Remember me
          </label>
        </div>
        <div className="form-floating mb-3 fw-semibold">
          <span className="me-2">Forgot Your Password?</span>
          <Link to="/reset" className="link-success link-underline link-underline-opacity-75-hover link-underline-opacity-0">Reset here!</Link>
        </div>
        <div className="form-floating mb-3 text-center">
          <button type="submit" className="btn btn-success btn-lg w-50">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
