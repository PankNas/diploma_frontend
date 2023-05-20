import React from "react";
import Container from "@mui/material/Container";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Header } from "./components/components";
import { Home, FullPost, SignUp, AddPost, Login } from "./pages";
import { fetchAuthMe, selectIsAuth } from "./redux/slices/auth";

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  React.useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          {/*<Route path="/" element={<Home />} />*/}
          {/*<Route path="/courses/:id" element={<FullPost />} />*/}
          {/*<Route path="/courses/:id/edit" element={<AddPost />} />*/}
          {/*<Route path="/add-course" element={<AddPost />} />*/}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignUp />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
