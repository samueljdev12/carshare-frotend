import React from 'react'
import { AiOutlineFacebook, AiOutlineTwitter, AiOutlineInstagram,AiOutlineMail  } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { MdOutlineEmail, MdOutlinePhone } from "react-icons/md";


const Footer = (props) => {
  const date = new Date();
  const facebookPage = 'https://www.facebook.com/profile.php?id=61552048773152';
  const twitterPage = 'https://x.com/CarShareSupport?s=20';
  const instragramPage = 'https://www.instagram.com/carsharesupport/';

  return (
    <footer className='main-bg-color p-3'>
        <div className='row align-items-center'>
            <div className="col-md-4 align-self-center">
                <span className=''>
                    {String.fromCharCode(169)} {date.getFullYear()} {props.branding} | All Rights Reserved | <Link to="/privacypolicy" className='link-dark link-underline-opacity-50 link-underline-opacity-100-hover'>Privacy Policy</Link> | <Link to="/termsconditions" className='link-dark link-underline-opacity-50 link-underline-opacity-100-hover'>Terms and Conditions</Link>
                </span>
            </div>
            <div className="col-md-4 align-self-center text-center fw-semibold">
              <p className="mb-1">
                <MdOutlinePhone
                  className="h-auto me-1"
                  style={{ width: "7%" }}
                />
                {props.phone}
              </p>
              <p className="mb-1">
                <MdOutlineEmail className="h-auto me-1" style={{ width: "7%" }} />
                <Link to={`mailto:${props.email}`} className="link-dark link-underline link-underline-opacity-0 link-underline-opacity-75-hover">
                  {props.email}
                </Link>
              </p>
            </div>
            <div className="col-md-4 text-end p-3">
                <Link to={facebookPage} target='_blank'>
                    <AiOutlineFacebook className='text-dark h-auto' style={{width: "10%"}}/>
                </Link>
                <Link to={instragramPage} target='_blank'>
                    <AiOutlineInstagram className='text-dark h-auto' style={{width: "10%"}}/>
                </Link>
                <Link to={twitterPage} target='_blank'>
                    <AiOutlineTwitter className='text-dark h-auto' style={{width: "10%"}}/>
                </Link>
                <Link to={`mailto:${props.email}`}>
                    <AiOutlineMail className='text-dark h-auto' style={{width: "10%"}}/>
                </Link>
            </div>
        </div>
    </footer>
  )
}

export default Footer