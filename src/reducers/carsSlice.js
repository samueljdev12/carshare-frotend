// authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// use axios
import axios from "axios";
// const baseURL = "https://carshare-rdo7.onrender.com/api";
const baseURL = "localhost:3001/api";

//get all cars
export const getCarAsync = createAsyncThunk("car/get", async()=>{

    const res = await axios.get(`/api/vehicles`);
    const vehicles = res.data.vehicles;
    console.log(vehicles)
    return vehicles
   
})

// create car
export const createCar = createAsyncThunk("cars/create", async(car) =>{
    try {
        
        const res = await axios.post(`/api/vehicleAdd`, car);
        return res.data;

    } catch (err) {
        return err
    }
})


// slice
const carSlice = createSlice({
    name: "cars",
    initialState: {
        cars: [],
        newCar: {},
        isLoading: false,
        error: null
    },

    // reduces
    reducers: {},
    extraReducers: (builder) =>{
        builder
        .addCase(getCarAsync.pending, (state) =>{
            state.isLoading = true;
            state.error = null;
        })

        .addCase(getCarAsync.fulfilled, (state, action) =>{
            state.isLoading = false;
            state.cars = action.payload;
            state.error = null
            
        })

        .addCase(getCarAsync.rejected, (state, action) =>{
            state.isLoading = false
            state.cars = []
            state.error = action.error.msaage
        })

        .addCase(createCar.pending, (state) =>{
            state.isLoading = true
            state.error = null
        })

        .addCase(createCar.fulfilled, (state, action) =>{
            state.isLoading = false
            state.error = null
            state.newCar = action.payload;
        })
        .addCase(createCar.rejected, (state, action) =>{
            state.isLoading = false
            state.error = action.error.message
            state.newCar = {}
        })
    }
})

export const selectCars = (state) => state.cars.cars;
export const selectIsLoading = (state) => state.cars.isLoading;
export const selectError = (state) => state.cars.error;
export const selectNewCar = (state) => state.cars.newCar;
// Selector to select a car by ID
export const selectCarById = (state, carId) => {
    // Assuming cars is an array of objects with 'id' property
    return state.cars.cars.find(car => car._id === carId) || {};
  };

export default carSlice.reducer