import React from 'react'

const TermsConditions = (props) => {
  return (
    <section className="container py-5">
      <h1 className="fw-bold mb-4 text-center">Terms and Conditions</h1>

        <p>By using our car booking services, you agree to the following terms and conditions:</p>

      <p className="fs-4 fw-semibold">Booking and Payment:</p>
        <ul className="lh-lg">
          <li>
            Bookings are subject to availability and confirmation by {props.branding}.
          </li>
          <li>
            Payment is required at the time of booking. We accept Cash and Credit Card.
          </li>
        </ul>
      <p className="fs-4 fw-semibold">Cancellation and Refunds:</p>
        <ul className="lh-lg">
          <li>
            Cancellations made 24 hours prior to the booking are eligible for a full refund.
          </li>
          <li>
            Cancellations made after the specified period are non-refundable.
          </li>
        </ul>
      <p className="fs-4 fw-semibold">Vehicle Usage:</p>
        <ul className="lh-lg">
          <li>
            The rented vehicle must be used responsibly and in accordance with local laws.
          </li>
          <li>
            The user is responsible for any fines or penalties incurred during the rental period.
          </li>
        </ul>
      <p className="fs-4 fw-semibold">Insurance and Liability:</p>
        <ul className="lh-lg">
          <li>
            Our vehicles are insured against damages, but users may be liable for a deductible amount in case of an accident.
          </li>
          <li>
            Users are encouraged to review the insurance coverage details before booking.
          </li>
        </ul>
      <p className="fs-4 fw-semibold">Modification of Bookings:</p>
        <ul className="lh-lg">
          <li>
            Changes to bookings can be made subject to availability and may incur additional charges.
          </li>
        </ul>
      <p className="fs-4 fw-semibold">Termination of Service:</p>
        <ul className="lh-lg">
          <li>
            We reserve the right to terminate or refuse service to anyone for any reason at our discretion.
          </li>
        </ul>
      <p className='fw-semibold'>By using our car booking services, you acknowledge and agree to these terms and conditions.</p>

    </section>
  )
}

export default TermsConditions