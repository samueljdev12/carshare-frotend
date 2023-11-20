// authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// use axios
import axios from "axios";
axios.defaults.withCredentials = true;
// const baseURL = "https://carshare-rdo7.onrender.com/api";
const baseURL = "localhost:3001/api";


// create bookingns
export const createAsync = createAsyncThunk("bookings/create", async(credentials) =>{
    try {
        const res = await axios.post(`${baseURL}/booking`, credentials);
        return res.data
    } catch (err) {
        throw err.message
    }
})

// get bookinsgs
export const getAsync = createAsyncThunk("bookings/get", async() =>{
    try {
        const res = await axios.get(`api/bookings`);
         localStorage.setItem("userBookings", res.data.bookings)
        return res.data.bookings
    } catch (err) {
        return  err.message
    }
})

// cancel booking
export const cancelAsync = createAsyncThunk("booking/cancel", async(id) =>{
    try {

        const res = await axios.put(`${baseURL}/booking/${id}/cancel`);
        return id;
        
    } catch (err) {
        return err.message
    }
})

const bookingSlice = createSlice({
    name: "booking",
    initialState: {
        bookings: [],
        isLoading: false,
        success: false,
        error: null
    },

    reducers: {},
    extraReducers: (builder) =>{
        builder
        .addCase(createAsync.pending, (state) =>{
            state.isLoading = true
            state.success = false
            state.error = null
        })

        .addCase(createAsync.fulfilled, (state, action) =>{
            state.isLoading = false
            state.success = true
            state.bookings = [...state.bookings, action.payload]
            state.error = null
            
        })

        .addCase(createAsync.rejected, (state, action) =>{
            state.isLoading = false
            state.success = false
            state.error = action.error.message
        })

        .addCase(getAsync.pending, (state, action) =>{
            state.isLoading = true
            state.success = false
            state.error = null
        })

        .addCase(getAsync.fulfilled, (state, action) =>{
            state.isLoading = false
            state.success = true
            state.bookings = action.payload
        })

        .addCase(getAsync.rejected, (state) =>{
            state.isLoading = false
            state.success = false
        })

        .addCase(cancelAsync.pending, (state) =>{
            state.isLoading = true
            state.error = null
        })

        .addCase(cancelAsync.fulfilled, (state, action) =>{
            const itemId = action.payload
            state.isLoading = false
            state.error = false
            const updateBooks = state.bookings.filter((booking) => booking.id !== itemId)
            state.bookings = updateBooks
        })

        .addCase(cancelAsync.rejected, (state, action) =>{
            state.isLoading = false
            state.error = action.error.message
        })
    }
})

export const selectBookings = (state) => state.bookings.bookings;
export const selectError = (state) => state.bookings.error;
export const selectIsLoading = (state) => state.bookings.isLoading;
export const selectSucess = (state) => state.bookings.success;
export const setSuccess = (state) => {
    state.bookings.success = false;
  };
// select booking by id
// Define a selector to get a booking by ID
// export const selectBookingById = (bookingId) =>
//   createSelector(selectBookings, (bookings) =>
//     bookings.find((booking) => booking.id === bookingId)
//   );



export default bookingSlice.reducer