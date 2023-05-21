import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
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

    try {
      const {user} = await signInWithEmailAndPassword(auth, email, password);

      return getUserData(user);
    } catch (_err) {}
  }
);

export const fetchSignUp = createAsyncThunk(
  "auth/fetchSignUp",
  async ({email, password, fullName}) => {
    const auth = getAuth();

    try {
      const {user} = await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(user, {
        displayName: fullName,
      });

      return getUserData(user);
    } catch (err) {}
  }
);

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
    }
  },
  extraReducers: {
    // sign up
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

    // login
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
  },
});

export const selectIsAuth = (state) => Boolean(state.auth.user);

export const authReducer = authSlice.reducer;
export const {logout} = authSlice.actions;
