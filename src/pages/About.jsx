import { useState, useEffect } from "react";
// import Axios from 'axios';
import axios from "axios";

const About = () => {

  // const getUsers = async()=>{
  //   const res = await axios.get("/customer");
  //   console.log(res.data)
  // }

  // getUsers()

  return (
    <>
     
      <div className="container-fluid text-center p-5 border-bottom border-black">
        <h1>ABOUT US</h1>

      </div>
      <div className="row bg-light about-container w-100">

        <div className="col-sm-12 text-center border">
          <h3 className="mb-5 py-4">Nurturing Sustainable Connections</h3>
        </div>
        <div className="col-lg-4 my-4">
          <img src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2Fyc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=900&q=60" className="img-fluid rounded" alt="..."/>
        </div>
        <div className="col-lg-8 mt-2">
          <p>CarShare is more than just a car-sharing service; it's a movement aimed at transforming the way we travel while fostering a sense of community and environmental responsibility. Founded with a vision to make sustainable transportation accessible to all, CarShare has rapidly grown into a trusted platform in Sydney and Melbourne.</p>
          <h2 className="text-center my-4">Our Mission</h2>
          <p>At CarShare, our mission is clear: to reduce the environmental impact of transportation by promoting shared mobility. We strive to create a future where fewer cars on the road lead to cleaner air, reduced traffic congestion, and a stronger sense of community.</p>
        </div>
          
      </div>
      <div className="bg-black container-fluid testimonials text-center">
        <div className="container text-white text-center">
          <h1 className="mb-3">Client Testimonials</h1>
          <p>Here's what our valued members have to say about their CarShare experiences:</p>
        </div>
        <div className="container mt-5">
          <div className="row flex-row gap-2">
            <div className="col-sm bg-light rounded p-3">
              <p className="fst-italic">“CarShare has truly transformed the way I commute. It's not just about the convenience; it's about being part of a community that values sustainability. I've met wonderful people and reduced my carbon footprint. It's a win-win!”</p>
              <p className="fw-semibold">— Sarah, CarShare Member since 2019</p>
            </div>
            <div className="col-sm bg-light rounded p-3">
              <p className="fst-italic">“CarShare is a game-changer for urban living. I've saved money, reduced stress, and made friends in my neighborhood. The support team is top-notch too-always ready to help. I recommend CarShare to everyone I know!”</p>
              <p className="fw-semibold">— David, Happy CarShare Member</p>
            </div>
            <div className="col-sm bg-light rounded p-3">
              <p className="fst-italic">“Joining CarShare was one of the best decisions I made. It's not just about the rides; it's the sense of belonging. The community events, the shared experiences-it's like having an extended family. I'm grateful for this wonderful community!”</p>
              <p className="fw-semibold">— Michael, Dedicated CarShare Member</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}



export default About
