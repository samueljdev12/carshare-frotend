import React from 'react'

const PrivacyPolicy = (props) => {
  return (
    <section className='container py-5'>
      <h1 className='fw-bold mb-4 text-center'>Privacy Policy</h1>

      <p>
        This Privacy Policy describes how {props.branding} collects, uses, and discloses personal information provided by users of our car booking services. By using our website and services, you agree to the terms of this policy.
      </p>

      <p className='fs-4 fw-semibold'>Information We Collect:</p>
        <ul className='lh-lg'>
          <li>
            <span className='fw-semibold'>Personal Information:</span> We collect personal information such as name, contact details, and payment information for the purpose of providing car booking services.
          </li>
          <li>  
            <span className='fw-semibold'>Usage Information:</span> We collect information about your use of our website and services, including IP addresses, browser details, and pages accessed.
          </li>
        </ul>
      <p className='fs-4 fw-semibold'>How We Use Your Information:</p>
        <ul className="lh-lg">
          <li>We use personal information to process bookings, communicate with users, and provide customer support.</li>

          <li>We use usage information for analytics, improving our services, and ensuring the security of our website.</li>
        </ul>

      <p className='fs-4 fw-semibold'>Information Sharing:</p>
        <ul className="lh-lg">
          <li>We do not sell or rent your personal information to third parties.</li>

          <li>We may share personal information with our partners, service providers, or law enforcement authorities if required by law.</li>
        </ul>
      <p className='fs-4 fw-semibold'>Data Security:</p>
        <ul className='lh-lg'>
          <li>
            We employ industry-standard security measures to protect your data from unauthorized access, alteration, disclosure, or destruction.
          </li>
        </ul>
      <p className='fs-4 fw-semibold'>Your Choices:</p>
        <ul className='lh-lg'>
          <li>
            You can access, correct, or delete your personal information by contacting us.
          </li>
          <li>
            You can opt out of promotional communications by following the instructions in the emails we send.
          </li>
        </ul>
      <p className="fs-4 fw-semibold">Changes to This Policy:</p>
      <p className='fw-semibold'>
        This Privacy Policy is subject to change without notice. Please review this policy periodically for updates.
      </p>
    </section>
  )
}

export default PrivacyPolicy