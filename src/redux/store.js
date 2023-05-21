import {configureStore} from "@reduxjs/toolkit";

import {coursesReducer} from "./slices/posts";
import {authReducer} from "./slices/auth";

const store = configureStore({
  reducer: {
    courses: coursesReducer,
    auth: authReducer,
  },
});

export default store;
