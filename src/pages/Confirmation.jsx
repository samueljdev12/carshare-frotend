import { useEffect, useState } from 'react';
import { GiConfirmed } from 'react-icons/gi';
import { Link, useNavigate } from 'react-router-dom';

const Confirmation = (props) => {
    const navigate = useNavigate();
    const [remainingTime, setRemainingTime] = useState(46); // Initial time in seconds

    useEffect(() => {
        const intervalId = setInterval(() => {
            setRemainingTime(prevTime => {
              // Prevent remainingTime from going below 0
              if (prevTime <= 1) {
                navigate('/');
                clearInterval(intervalId); // Clear the interval when redirecting
                return 0;
              }
              return prevTime - 1;
            });
          }, 1000);

        // Clear the interval and timeout if the component is unmounted before they complete
        return () => {
            clearInterval(intervalId);
        };

    }, [navigate]); // useEffect will run only once after the initial render

  return (
    <div className='container py-5 fs-5'>
        <div className='mb-5 d-flex justify-content-center'>
            <GiConfirmed className='text-success w-25 h-auto'/>
        </div>
        <h1 className='text-center mb-5 fw-bold'>Thank you for getting in touch!</h1>
        
        <p>Your message has been successfully received. We appreciate your interest and will review your inquiry shortly. Please expect a response from us within the next <span className='fw-semibold'>48 hours</span>. If your matter is urgent, feel free to reach out to us directly at <span className='fw-semibold'>{props.phone}</span>.</p>
        
        <p>Once again, thank you for contacting us. We look forward to assisting you further!</p>
        
        <div className='text-center mt-5'>
            <Link to='/' className='btn btn-success btn-lg'>Go Back to Home page</Link>
        </div>
        <section className='text-center opacity-50 fw-semibold mt-3' style={{fontSize: "14px"}}>
            <p>You will be redirecting to home page in {remainingTime - 1} seconds... <br />or you can hit the button to go back to the home page</p>
        </section>
    </div>
  )
}

export default Confirmation