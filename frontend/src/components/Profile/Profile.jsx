import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { Typography, Box, Button } from "@mui/material";
import { ExitToApp } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [tokenExpired, setTokenExpired] = useState(false);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      const { name, email, exp } = decodedToken;
      setName(name);
      setEmail(email);

      const currentTime = Date.now() / 1000;
      if (exp < currentTime) {
        setTokenExpired(true);
      }
    }
  }, []);

  useEffect(() => {
    if (tokenExpired) {
      Logout();
    }
  }, [tokenExpired]);

  const Logout = () => {
    alert("Apakah anda yakin keluar");
    localStorage.clear();
    navigate("/login");
  };

  return (
    <Box>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h4" gutterBottom>
          My Profile
        </Typography>
        <Typography variant="h6" gutterBottom>
          Name: {name}
        </Typography>
        <Typography variant="h6" gutterBottom>
          Email: {email}
        </Typography>
        <Button color="inherit" onClick={Logout}>
          Logout <ExitToApp />
        </Button>
      </Box>
      {!favoriteMovies.length ? (
        <Typography
          variant="h6"
          gutterBottom
          style={{ marginTop: "20px", textAlign: "center" }}
        >
          Add Watchlist and wishlist Movie here!
        </Typography>
      ) : (
        <Box>Favorite Movies</Box>
      )}
    </Box>
  );
};

export default Profile;
