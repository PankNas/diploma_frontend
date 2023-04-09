import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios.js";

export const fetchCourses = createAsyncThunk(
  "courses/fetchCourses",
  async () => await axios.get("/courses")
);

export const fetchTags = createAsyncThunk(
  "courses/fetchTags",
  async () => await axios.get("/tags")
);

const initialState = {
  courses: {
    items: [],
    status: "loading",
  },
  tags: {
    items: [],
    status: "loading",
  },
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchCourses.pending]: (state) => {
      state.courses.items = [];
      state.courses.status = "loading";
    },
    [fetchCourses.fulfilled]: (state, action) => {
      state.courses.items = action.payload;
      state.courses.status = "loaded";
    },
    [fetchCourses.rejected]: (state) => {
      state.courses.items = [];
      state.courses.status = "error";
    },

    [fetchTags.pending]: (state) => {
      state.tags.items = [];
      state.tags.status = "loading";
    },
    [fetchTags.fulfilled]: (state, action) => {
      state.tags.items = action.payload;
      state.tags.status = "loaded";
    },
    [fetchTags.rejected]: (state) => {
      state.tags.items = [];
      state.tags.status = "error";
    },
  },
});

export const coursesReducer = coursesSlice.reducer;
