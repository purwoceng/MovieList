import React from "react";
import { CssBaseline, Box } from "@mui/material";
import { Route, Routes, useLocation } from "react-router-dom";

import {
  NavBar,
  Movies,
  Actors,
  Profile,
  MovieInformation,
} from "./components";
import Register from "./components/users/register";
import Login from "./components/users/login";

const App = () => {
  const location = useLocation();

  const isNavbarVisible = !["/login", "/register"].includes(location.pathname);

  return (
    <Box sx={{ display: "flex", height: "100%" }}>
      <CssBaseline />
      {isNavbarVisible && <NavBar />}
      <Box component={"main"} sx={{ flexGrow: 1, p: "2em" }}>
        <Box sx={{ height: "70px" }} />
        <Routes>
          <Route path="/" element={<Movies />} />
          <Route path="/movies/:id" element={<MovieInformation />} />
          <Route path="/actors/:id" element={<Actors />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default App;
