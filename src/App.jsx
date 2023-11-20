import './App.css'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Signup from './components/carShare/Signup'
import Login from './components/carShare/Login'
import About from './pages/About'
import Home from './pages/Home'
import Scroll from './components/layout/Scroll';
import Booking from './components/booking/Booking';
import SingleBooking from './components/booking/SingleBooking';
import Dashboard from './components/staff/Dashboard';
import Customer from './components/staff/Customer';
import Nav from './components/staff/layout/Nav';
import Customer_details from './components/staff/Customer_details';
import MyAccount from './components/carShare/MyAccount';
import Edit from './components/carShare/Edit';
import AddCar from './components/cars/AddCar';
import Contact from './pages/Contact';
import Confirmation from './pages/Confirmation';
import ConfirmBooking from './components/booking/ConfirmBooking'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsConditions from './pages/TermsConditions'
import ForgorPassword from './components/forgotPassword/ForgorPassword'
import NewPassword from './components/forgotPassword/NewPassword'
import EmailVerification from './components/carShare/EmailVerification';
import NotFound from './pages/NotFound'

import { selectRole } from './reducers/authSlice';
import { useSelector } from 'react-redux'



function App() {


const role = useSelector(selectRole);
console.log(`The role is ${role}`)
 
  // const userRole = useSelector(selectRole)
  const phoneNumber = "0414 508 437";
  const email = "carshare381@gmail.com";
  const company = "CarShare";
  return (
<>
  <Router>
    {role === "staff"? <Nav /> : <Header/>  }
    <main>
      <Scroll />
        <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/signup' element={<Signup />}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/reset' element={<ForgorPassword />}></Route>
            <Route path='/reset/newpassword' element={<NewPassword />}></Route>
            <Route path='/about' element={<About />}></Route>
            <Route path='/contact' element={<Contact phone={phoneNumber} email={email}/>}></Route>
            <Route path='/contact/confirmation' element={<Confirmation phone={phoneNumber}/>}></Route>
            <Route path='/booking' element={<Booking />}></Route>
            <Route path='/booking/book/:id' element={<SingleBooking />}></Route>
            <Route path='/dashboard' element={<Dashboard />}></Route>
            <Route path='/customer' element={<Customer />}></Route>
            <Route path='/customer_details/:id' element={<Customer_details />}></Route>
            <Route path='/my_account' element={<MyAccount />}></Route>
            <Route path='/edit' element={<Edit />}></Route>
            <Route path='/staff/add_car' element={<AddCar />}></Route>
            <Route path='/booking/confirm/:name/:price/:startDate/:endDate/:id' element={<ConfirmBooking />}></Route>
            <Route path='/privacypolicy' element={<PrivacyPolicy branding={company}/>}></Route>
            <Route path='/termsconditions' element={<TermsConditions branding={company}/>}></Route>
            <Route path='/email-verification-success' element={<EmailVerification />}></Route>
            <Route path='/reset/newpassword' element={<NewPassword />}></Route>
            <Route path='*' element={<NotFound/>}></Route>
        </Routes>
    </main>
    <Footer branding={company} phone={phoneNumber} email={email}/>
   </Router>
   </>
    
  )
 
}

export default App
