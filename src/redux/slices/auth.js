import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "../../axios.js";
import {useSelector} from "react-redux";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile
} from "firebase/auth";

const getUserData = (user) => ({
  id: user.uid,
  token: user.accessToken,
  fullName: user.displayName,
  email: user.email,
});

export const fetchAuth = createAsyncThunk(
  "auth/fetchAuth",
  async ({email, password}) => {
    const auth = getAuth();

    const {user} = await signInWithEmailAndPassword(auth, email, password);

    return getUserData(user);
  }
);

export const fetchSignUp = createAsyncThunk(
  "auth/fetchSignUp",
  async ({email, password, fullName}) => {
    const auth = getAuth();

    const {user} = await createUserWithEmailAndPassword(auth, email, password);

    await updateProfile(user, {
      displayName: fullName,
    });

    return getUserData(user);
  }
);

export const fetchAuthMe = createAsyncThunk(
  "auth/fetchAuthMe",
  async () => (await axios.get("/auth/me")).data
);

// export const fetchRegister = createAsyncThunk(
//   "auth/fetchRegister",
//   async (params) => await axios.post("/auth/register", params)
// );

const initialState = {
  user: null,
  status: "loading",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: {
    [fetchSignUp.pending]: (state) => {
      state.status = "loading";
      state.user = null;
    },
    [fetchSignUp.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.user = action.payload;
    },
    [fetchSignUp.rejected]: (state) => {
      state.status = "error";
      state.user = null;
    },

    [fetchAuth.pending]: (state) => {
      state.status = "loading";
      state.user = null;
    },
    [fetchAuth.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.user = action.payload;
    },
    [fetchAuth.rejected]: (state) => {
      state.status = "error";
      state.user = null;
    },

    // [fetchAuthMe.pending]: (state) => {
    //   state.status = "loading";
    //   state.data = null;
    // },
    // [fetchAuthMe.fulfilled]: (state, action) => {
    //   state.status = "loaded";
    //   state.data = action.payload;
    // },
    // [fetchAuthMe.rejected]: (state) => {
    //   state.status = "error";
    //   state.data = null;
    // },
    //
    // [fetchRegister.pending]: (state) => {
    //   state.status = "loading";
    //   state.data = null;
    // },
    // [fetchRegister.fulfilled]: (state, action) => {
    //   state.status = "loaded";
    //   state.data = action.payload;
    // },
    // [fetchRegister.rejected]: (state) => {
    //   state.status = "error";
    //   state.data = null;
    // },
  },
});

export const selectIsAuth = (state) => Boolean(state.auth.user);

export const authReducer = authSlice.reducer;
export const {logout} = authSlice.actions;
