import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios.js";
import {useSelector} from "react-redux";

export const fetchAuth = createAsyncThunk("auth/fetchAuth",
  async (params) => await axios.post("/auth/login", params)
);

export const fetchAuthMe = createAsyncThunk(
  "auth/fetchAuthMe",
  async () => (await axios.get("/auth/me")).data
);

export const fetchRegister = createAsyncThunk(
  "auth/fetchRegister",
  async (params) => await axios.post("/auth/register", params)
);

const initialState = {
  email: null,
  token: null,
  id: null,

  data: null,
  status: "loading",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.id = action.payload.id;
    },

    logout: (state) => {
      state.email = '';
      state.token = '';
      state.id = '';
      // state.data = null;
    },
  },
  extraReducers: {
    [fetchAuth.pending]: (state) => {
      state.status = "loading";
      state.data = null;
    },
    [fetchAuth.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.data = action.payload;
    },
    [fetchAuth.rejected]: (state) => {
      state.status = "error";
      state.data = null;
    },

    [fetchAuthMe.pending]: (state) => {
      state.status = "loading";
      state.data = null;
    },
    [fetchAuthMe.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.data = action.payload;
    },
    [fetchAuthMe.rejected]: (state) => {
      state.status = "error";
      state.data = null;
    },

    [fetchRegister.pending]: (state) => {
      state.status = "loading";
      state.data = null;
    },
    [fetchRegister.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.data = action.payload;
    },
    [fetchRegister.rejected]: (state) => {
      state.status = "error";
      state.data = null;
    },
  },
});

export const selectIsAuth = (state) => Boolean(state.auth.data); // delete later
export const useAuth = () => {
  const {email, token, id} = useSelector(state => state.auth);

  return {
    isAuth: !!email,
    email,
    token,
    id,
  }
}

export const authReducer = authSlice.reducer;
export const { setUser, logout } = authSlice.actions;
