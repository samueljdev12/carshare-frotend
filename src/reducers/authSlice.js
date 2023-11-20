// authSlice.js
import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
// use axios
import axios from "axios";

axios.defaults.withCredentials = true;
// const baseURL = "https://carshare-rdo7.onrender.com/api";
const baseURL = "http://localhost:3001/api";


// define login async function
export const loginAsync = createAsyncThunk(
  "auth/login",
  async (credentials) => {
 
      const res = await axios.post(`${baseURL}/login`, credentials);
      const token = res.data.token;
      localStorage.setItem("authToken", token);
      localStorage.setItem("role", res.data.role)
      return res.data.role;
  
  }
);

// get user by id
export const getuser = createAsyncThunk("auth/user", async () => {
  try {
    const res = await axios.get(`${baseURL}/customer/me`);
    localStorage.setItem("userData", JSON.stringify(res.data));
    return res.data;
  } catch (err) {
    return err.message;
  }
});

// get user by email
export const getUserEmail = createAsyncThunk("user/userEmail", async(existEmail) => {

      const res = await axios.post('/api/reset', existEmail);
      // console.log(res.data);
      return res.data;
 
})

// update user
// define update async
export const updateAsync = createAsyncThunk(
  "user/update",
  async (credentials, id) => {

      const res = await axios.put(`${baseURL}/customer/${id}`, credentials);
      localStorage.setItem("userData", JSON.stringify(res.data));
      return true;
  }
);

export const updatePasswordAsync = createAsyncThunk("user/update/password", async ({ token, newPassword }) => {

    const res = await axios.put(`/api/customer/password`, { token, newPassword });
    return res.data;

});


//auth slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: !!localStorage.getItem("authToken"),
    role: localStorage.getItem("role") ? localStorage.getItem("role") : null,
    user: localStorage.getItem("userData")
      ? JSON.parse(localStorage.getItem("userData"))
      : null,
    isLoading: false,
    error: null,
  },
  //reducers
  reducers: {
    // loginSuccess: (state, action) => {
    //   state.isAuthenticated = true;
    //   state.user = action.payload;
    // },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null
      state.role = null
      localStorage.removeItem("authToken");
      localStorage.removeItem("userData")
      localStorage.removeItem("userBookings")
      localStorage.removeItem("role")
    },
  },

  extraReducers: (builder) => {
    builder
      // adding first case for pending
      .addCase(loginAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      // seconde case for sucess
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.isLoading = false;
        state.error = null;
        state.role = action.payload
      })

      // final case for rejectet promise
      .addCase(loginAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      .addCase(getuser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(getuser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.error = null;
      })

      .addCase(getuser.rejected, (state, action) => {
        state.isLoading = false;
        (state.user = null), (state.error = action.error.message);
      })
      // user email
      .addCase(getUserEmail.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserEmail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.error = null
      })
      .addCase(getUserEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(updatePasswordAsync.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updatePasswordAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.error = null;
      })
      .addCase(updatePasswordAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.error = action.error.message;
      })
  },
});

// Selectors for authentication state
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectUser = (state) => state.auth.user;
export const selectIsLoading = (state) => state.auth.isLoading;
export const selectError = (state) => state.auth.error;
export const selectRole = (state) => state.auth.role;

// export logout reducer
export const { logout } = authSlice.actions;

export default authSlice.reducer;
