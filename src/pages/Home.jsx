import {useEffect} from 'react'
//added react scroll to make explore button scroll to cars id
import { Link as ScrollLink } from "react-scroll";

// needed for redux
import { useDispatch, useSelector } from 'react-redux';



// get cars
import { getCarAsync } from "../reducers/carsSlice";
import { selectCars, selectError, selectIsLoading } from '../reducers/carsSlice';

// singl car
import SingleCar from '../components/cars/SingleCar';

import { Link } from 'react-router-dom'
import { getAsync } from '../reducers/bookingSlice';





const Home = () => {
    const dispatch = useDispatch()
    useEffect(() =>{
        dispatch(getCarAsync())
        dispatch(getAsync())
        
    }, [])

    
    // dispatch(getAsync())
   
  
    

    // dispatch(getuser())

    const allCars = useSelector(selectCars);
    const cars = allCars.slice(0, 6)
    console.log(cars)
    const isLoading = useSelector(selectIsLoading);
    const error = useSelector(selectError);
    

    
  return (
    <div>
        <section className='bg-image' style={{backgroundImage: `url("https://hips.hearstapps.com/hmg-prod/images/2023-chevrolet-corvette-z06-002-6459269952a63.jpg")`, backgroundRepeat: 'no-repeat', backgroundSize: "100% 100%"}}>
            <div className='mask d-flex align-items-center vh-100 text-white text-center' style={{background: "rgba(0, 0, 0, 0.8)"}}>
                <div className='container-fluid p-4'>
                    <h1 className='mb-3'>Welcome to CarShare</h1>
                    <p>Choose from our diverse fleet of vehicles, ranging from eco-friendly hybrids to spacious SUVs, ensuring you find the perfect car to match your needs and enhance your travel experience.</p>
                    <ScrollLink to="cars" smooth={true} duration={100} className='btn btn-warning '>
                        <span className='text-dark fw-semibold'>Explore Cars</span>
                    </ScrollLink>
                </div>
            </div>
        </section>
        <section className='main-bg-color proces-container text-light border'>
            <div className="container px-3 pt-3">
                <div className="text-center">
                    <h3 className='text-center m-4 text-uppercase'>why choose us</h3>
                    <p>CarShare offers a hassle-free solution for individuals to access vehicles on demand, promoting sustainable transportation, reducing car ownership costs, and fostering a sense of community through shared mobility experiences.</p>
                </div>
                <div className='row my-4 text-center'>
                    <div className="col-sm-12 col-lg-4 border p-3 bg-light text-dark border-dark rounded">
                        <h4 className='text-center'>Choose your location</h4>
                        <p>Explore our car-sharing services conveniently located in Sydney and Melbourne. Stay tuned for our upcoming expansions, bringing accessible and eco-friendly transportation to even more communities.</p>
                    </div>
                    <div className="col-sm-12 col-lg-4 border p-3 bg-light text-dark border-dark rounded">
                        <h4 className='text-center'>Pick up Date</h4>
                        <p>Choose your ideal pick-up date with CarShare, ensuring flexibility and convenience for your travel plans. Book with confidence, knowing your preferred vehicle will be ready when you need it.</p>
                    </div>
                    <div className="col-sm-12 col-lg-4 border p-3 bg-light text-dark border-dark rounded">
                        <h4 className='text-center'>Book a Car</h4>
                        <p>Book a car effortlessly with CarShare, where a seamless online experience allows you to reserve your vehicle of choice in just a few clicks. Enjoy the freedom to travel on your terms, with reliable and eco-friendly options at your fingertips.</p>
                    </div>
                </div>
            </div>
        </section>
        <section className='bg-light p-3' id='cars'>
            <div className="container text-center py-5">
                <h3 className='m-4'>Explore Our collection</h3>
                <p className='pb-5'>Embark on a journey of choice and comfort with CarShare's diverse fleet. From compact cars for urban adventures to spacious SUVs for family outings, our curated selection ensures there's a perfect ride for every occasion. Discover quality, convenience, and eco-friendly options as you explore the world of possibilities within our car-sharing community.</p>
                <div className="row gy-3 justify-content-center">
                        
                        {cars.map((car) => (
                            <SingleCar key={car._id} name={car.name} availability={car.availability} price={car.price} model={car.model} id={car._id} page={"both"} image={car.imageUrl}/>
                            
                        ))}
                       
                    <div className="col-12 mt-5">
                        <Link to="/booking" className='link-offset-2 link-underline-opacity-0 link-underline-opacity-50-hover link-dark fw-bold fs-5'>Show more cars</Link>
                    </div>
                </div>
            </div>
        </section>
        <section className='bg-dark text-light py-5'>
            <div className="container text-center p-3">
                <div className="">
                    <h3 className="text-uppercase">our service {String.fromCharCode(38)} community</h3>
                    <p>A community-driven service that connects individuals through sustainable transportation. Experience the convenience of car-sharing in Sydney and Melbourne, while joining a like-minded community dedicated to reducing environmental impact and enhancing the way we travel.</p>
                </div>
                <div className='row justify-content-center p-3'>
                    <div className="col-md-6 border p-3">
                        <h5 className="fw-bold">Customer Support and Assistance</h5>
                        <p>We're here for you! Our dedicated customer support team is available around the clock to address any questions or concerns. Your journey with CarShare is our priority, and we're committed to making it a smooth and enjoyable experience. Feel free to reach out to us at any time, and we'll be more than happy to assist you with your car-sharing needs.</p>
                    </div>
                    <div className="col-md-6 border p-3">
                        <h5 className="fw-bold">The Community</h5>
                        <p>A dynamic network of eco-conscious individuals, united by a shared commitment to sustainable transportation. Join us to share rides, reduce our carbon footprint, and build meaningful connections within our community.</p>
                    </div>
                </div>
            </div>
        </section>
    </div>


  )
}

export default Home