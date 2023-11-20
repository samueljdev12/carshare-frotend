import React from 'react'

const EmailVerification = (props) => {
  return (
    <section className="container py-5">
      
      <p className="text-center">Thank you for verifying your email address.</p>
      
      <p className="text-center">Your email <span className="fw-semibold">{props.email}</span> has been successfully verified.</p>
    </section>
  )
}

export default EmailVerification
