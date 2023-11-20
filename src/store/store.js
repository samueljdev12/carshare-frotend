import {configureStore} from "@reduxjs/toolkit";
//impor authslice
import authReducer from "../reducers/authSlice";
// import userReducer from "../reducers/userSlice";
import carReducer from "../reducers/carsSlice";
import bookingsReducer from "../reducers/bookingSlice";
import staffReducer from "../reducers/staffSlice";



// create a store
export const store = configureStore({
    reducer: {
        auth: authReducer,
        cars: carReducer,
        bookings: bookingsReducer,
        staff: staffReducer
 
    }
})