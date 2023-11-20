import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, updatePasswordAsync } from '../../reducers/authSlice';
import { useLocation } from 'react-router-dom';

const NewPassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // Extract token from URL
    const query = new URLSearchParams(useLocation().search);
    const token = query.get('token');
    // console.log(user);

    // if(!user) {
    //     return navigate('/reset');
    // }

    const [formData, setFormData] = useState({
        newPassword: '',
        confirmPassword: '',
        errors: {}
    });

    const { newPassword, confirmPassword, errors } = formData;

    const onChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    };

    const onSubmit = e => {
        e.preventDefault();
        console.log("Changing password...");
        const newErrors = {};

        if (newPassword === "" || newPassword === undefined) {
            console.log("Password Empty!");
            newErrors.passwordInput = "You must enter your password";
        } else if (newPassword.length < 10) {
            console.log("Password should be atleast 10 characters long");
            newErrors.passwordInput = "Please enter a valid password";
        }

        if (confirmPassword === "" || confirmPassword === undefined) {
            console.log("Re-Password Empty!");
            newErrors.rePasswordInput = "You must re-enter your password";
        } else if (newPassword !== confirmPassword) {
            console.log("Re-Password is not the same");
            newErrors.rePasswordInput = "Password is not the same";
        }

        // checking for empty form missing columns
        if(Object.keys(newErrors).length === 0){
            setFormData({
                ...formData,
                errors: {
                    passwordInput: "",
                    rePasswordInput: ""
                }
            });

            const passwordChange = {
                token, 
                newPassword
            }
    
            console.log(passwordChange);
            
            dispatch(updatePasswordAsync(passwordChange));
            navigate('/login');
        } else {
            setFormData({
                ...formData,
                errors: {
                    ...newErrors
                }
            });
        }
    };

  return (
    <section className="container d-flex justify-content-center">
        <form className="my-5 w-50" onSubmit={e => onSubmit(e)}>
            <h2 className="mb-4 text-center">Reset Password</h2>
            <div className="form-floating mb-4">
                <input type="password" className={`form-control ${errors.passwordInput ? 'is-invalid' : ''}`} name="newPassword" id="newPassword" value={newPassword} placeholder="123456789" onChange={e => onChange(e)}/>
                <label htmlFor="newPassword" className="form-label">New Password</label>
                {errors.passwordInput && (
                    <div className="invalid-tooltip">{errors.passwordInput}</div>
                )}
            </div>
            <div className="form-floating mb-4">
                <input type="password" className={`form-control ${errors.rePasswordInput ? 'is-invalid' : ''}`} name="confirmPassword" id="confirmPassword" value={confirmPassword} placeholder="123456789" onChange={e => onChange(e)}/>
                <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                {errors.rePasswordInput && (
                    <div className="invalid-tooltip">{errors.rePasswordInput}</div>
                )}
            </div>
            <div className="text-center">
                <button type="submit" className="btn btn-success btn-lg w-100">Reset Password</button>
            </div>
        </form>
    </section>
  )
}

export default NewPassword