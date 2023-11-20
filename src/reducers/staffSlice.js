import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.withCredentials = true;
// const baseURL = "https://carshare-rdo7.onrender.com/api";
const baseURL = "localhost:3001/api";

// get all customers
export const getAllCustomers = createAsyncThunk("staff/customers", async() =>{
    try {
        const res = await axios.get("/api/customer");
        console.log(res.data.customer)
        return res.data.customer;
    } catch (err) {
        return err.message;
    }
})


// staff slice
const staffSlice = createSlice({
    name: "staff",
    initialState : {
    customers: [],
    bookings: null,
    isLoading: false,
    error: null

    },

    reducers: {},
    extraReducers : (builder) =>{
        builder
        .addCase(getAllCustomers.pending, (state) =>{
            state.isLoading = true
       })
        .addCase(getAllCustomers.fulfilled, (state, action) =>{
            state.isLoading = false
           state.customers = action.payload
       })
         .addCase(getAllCustomers.rejected, (state, action) =>{
            state.isLoading = false
             state.customers = {}
            state.error = action.error.message
        })
        
     }

})



export const selectIsLoadingStaff = (state) => state.staff.isLoading;
export const selectErrorStaff = (state) => state.staff.error;
export const selectCustomers = (state) => state.staff.customers




export default  staffSlice.reducer;