import React from "react";
import { CssBaseline, Box } from "@mui/material";
import { Route, Routes } from "react-router";

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
  return (
    <Box sx={{ display: "flex", height: "100%" }}>
      <CssBaseline />
      <NavBar />
      <Box component={"main"} sx={{ flexGrow: 1, p: "2em" }}>
        <Box sx={{ height: "70px" }} />
        <Routes>
          <Route path="/" element={<Movies />} />
          <Route path="/movies/:id" element={<MovieInformation />} />
          <Route path="/actors/:id" element={<Actors />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/register" exact element={<Register />} />
          <Route path="/login" exact element={<Login />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default App;
