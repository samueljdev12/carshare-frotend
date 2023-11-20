import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { MdOutlineEmail, MdOutlinePermIdentity, MdOutlineSubject, MdOutlineMessage, MdOutlinePhone } from "react-icons/md";
import { useSelector } from "react-redux";
import { selectUser } from "../reducers/authSlice";
import { Link } from "react-router-dom";

const Contact = (props) => {
  const user = useSelector(selectUser);
  const stateUserName = user ? `${user.customer.first_Name} ${user.customer.last_Name}` : '';
  const stateUserEmail = user ? user.customer.email : '';

  // console.log(user);
  // console.log(stateUserName);
  // console.log(stateUserEmail);
  const navigate = useNavigate();
  const [formData, setFormdata] = useState({
    userName:  stateUserName,
    userEmail: stateUserEmail,
    userSubject: "",
    userMessage: "",
    errors: {}
  });

  const [isLoading, setIsLoading] = useState(false);

  const { userName, userEmail, userSubject, userMessage, errors } = formData;

  const onChange = (e) => {
    setFormdata({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactSubmit = async(e) => {
    e.preventDefault();

    console.log("Contact Submit!");
    console.log("Sending an Email...");

    const newErrors = {};
    const emailPattern = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    const specialCharPattern = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\|]/;
    
    if (userName === "" || userName === undefined) {
      console.log("Username Empty!");
      newErrors.nameInput = "You must enter your name";
    } else if (specialCharPattern.test(userName)) {
      console.log("Username should not contains special character");
      newErrors.nameInput = "Name should not contains special character";
    }

    if (userEmail === "" || userEmail === undefined) {
      console.log("Email Empty!");
      newErrors.emailInput = "You must enter your email";
    } else if (!emailPattern.test(userEmail)) {
      console.log("Invalid Email Format");
      newErrors.emailInput = "Please enter a valid email address";
    }

    if (userSubject === "" || userSubject === undefined){
      console.log("Subject Empty");
      newErrors.subjectInput = "You must enter the subject";
    }

    if (userMessage === "" || userMessage === undefined){
      console.log("Message Empty");
      newErrors.messageInput = "You must enter the message";
    }

    if(Object.keys(newErrors).length === 0){
      setFormdata({
        ...formData,
        errors: {
          nameInput: '',
          emailInput: '',
          subjectInput: '',
          messageInput: ''
        }
      });

      const contacter = {
        userName,
        userEmail,
        userSubject,
        userMessage,
      };
  
      setIsLoading(true);
      
      const res = await axios.post("/api/contact", contacter);
      // console.log(res.status);
      if(res.status === 200){
        navigate("/contact/confirmation");
      } else {
        errors.serverError = "There is something wrong. Please try again later";
      }

    } else {
      setFormdata({
        ...formData,
        errors: {
          ...newErrors
        }
      });
    }

  };

  return (
    <div className="container py-5">
      {/* spinner */}
        {isLoading && (<div className="overlay text-white">
          <div className="d-flex justify-content-center me-1">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
          <h5>Submitting...</h5>
        </div>)}
      {/* spinner end */}
      <div className="text-center mb-5">
        <h2>Contact Us</h2>
      </div>
      <div className="row">
        <div className="col-md-6 order-md-2">
          {errors.serverError && (
            <div className="text-danger mb-3">{errors.serverError}</div>
          )}
          <form onSubmit={(e) => contactSubmit(e)}>
            <div className={`form-floating position-relative ${errors.nameInput ? 'mb-5' : 'mb-3'}`}>
              <input
                type="text"
                name="userName"
                id="userName"
                className={`form-control ${ errors.nameInput ? 'is-invalid' : ''}`}
                placeholder="Full name"
                onChange={(e) => onChange(e)}
                value={userName}
              />
              <label htmlFor="userName">
                <MdOutlinePermIdentity className="mb-1" /> Name
              </label>
              {errors.nameInput && (
                <div className="invalid-tooltip">{errors.nameInput}</div>
              )}
            </div>
            <div className={`form-floating position-relative ${errors.emailInput ? 'mb-5' : 'mb-3'}`}>
              <input
                type="email"
                name="userEmail"
                id="userEmail"
                className={`form-control ${ errors.emailInput ? 'is-invalid' : ''}`}
                placeholder="Email"
                onChange={(e) => onChange(e)}
                value={userEmail}
              />
              <label htmlFor="userEmail">
                <MdOutlineEmail className="mb-1" /> Email
              </label>
              {errors.emailInput && (
                <div className="invalid-tooltip">{errors.emailInput}</div>
              )}
            </div>
            <div className={`form-floating position-relative ${errors.subjectInput ? 'mb-5' : 'mb-3'}`}>
              <input
                type="text"
                name="userSubject"
                id="userSubject"
                className={`form-control ${ errors.subjectInput ? 'is-invalid' : ''}`}
                placeholder="Subject"
                onChange={(e) => onChange(e)}
                value={userSubject}
              />
              <label htmlFor="userSubject">
                <MdOutlineSubject className="mb-1" /> Subject
              </label>
              {errors.subjectInput && (
                <div className="invalid-tooltip">{errors.subjectInput}</div>
              )}
            </div>
            <div className={`form-floating position-relative ${errors.messageInput ? 'mb-5' : 'mb-3'}`}>
              <textarea
                name="userMessage"
                id="userMessage"
                className={`form-control ${ errors.messageInput ? 'is-invalid' : ''}`}
                style={{ height: "20rem" }}
                placeholder="Message"
                onChange={(e) => onChange(e)}
                value={userMessage}
              ></textarea>
              <label htmlFor="userMessage">
                <MdOutlineMessage className="mb-1" /> Message
              </label>
              {errors.messageInput && (
                <div className="invalid-tooltip">{errors.messageInput}</div>
              )}
            </div>
            <div className="form-floating mb-3 text-center">
              <button type="submit" className="btn btn-success btn-lg w-100">
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="col-md-6 order-md-1">
          <section>
            <h4 className="text-center mb-4">Contact Details</h4>
            <div>
              <p className="lh-base">
                For any inquiries, assistance, or support, please don't
                hesitate to get in touch with our dedicated team. We're here to
                help you make your carshare experience as convenient as
                possible.
              </p>
              <p className="fw-semibold">
                <MdOutlineEmail className="h-auto me-1" style={{ width: "7%" }} />
                <Link to={`mailto:${props.email}`} className="link-dark link-underline link-underline-opacity-0 link-underline-opacity-75-hover">
                  {props.email}
                </Link>
              </p>
              <p className="fw-semibold">
                <MdOutlinePhone
                  className="h-auto me-1"
                  style={{ width: "7%" }}
                />
                {props.phone}
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Contact;
