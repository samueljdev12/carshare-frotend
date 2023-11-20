import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserEmail } from '../../reducers/authSlice';

const ForgorPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [emailData, setEmailData] = useState('');
  const [emailError, setEmailError] = useState('');
  const [showPopup, setShowPopup] = useState(false);


  const onChange = (e) => {
    // console.log(e);

    setEmailData(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting Email...');

    const emailPattern = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

    if (emailData === "" || emailData === undefined) {
      console.log("Email Empty!");
      setEmailError("You must enter your email");
    } else if (!emailPattern.test(emailData)) {
      console.log("Invalid Email Format");
      setEmailError("Please enter a valid email address");
    }

    if(!emailError){
      // console.log('Accept the email - sending to the server');
      setEmailError('');
      const existEmail = {
        email: emailData
      };
      
      console.log(existEmail);

      dispatch(getUserEmail(existEmail)); 
      
      setShowPopup(true); 
  
      //navigate('./newpassword');
    }

  }

  return (
    <section className="container d-flex justify-content-center">
        <form className="my-5 w-50" onSubmit={e => onSubmit(e)}>
            <h2 className="mb-4 text-center">Reset Password</h2>
            <div className="form-floating mb-4">
                <input 
                    type="email" 
                    className={`form-control ${emailError ? 'is-invalid' : ''}`} 
                    name="email" 
                    id="email" 
                    value={emailData} 
                    placeholder="name@example.com" 
                    onChange={e => onChange(e)}
                />
                <label htmlFor="email" className="form-label">Email Address</label>
                {emailError && (
                    <div className="invalid-tooltip">{emailError}</div>
                )}
            </div>
            <div className="text-center">
                <button type="submit" className="btn btn-success btn-lg w-100">Submit</button>
                {showPopup && <p className="mt-2 text-success">Forgot password link sent</p>}
            </div>
        </form>
    </section>
)



}

export default ForgorPassword