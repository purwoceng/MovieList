import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { Typography, Box, Button, Link } from "@mui/material";
import { ExitToApp } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { axiosApi } from "../../api/api";

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [tokenExpired, setTokenExpired] = useState(false);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [watchlistMovies, setWatchlistMovies] = useState([]);
  const [tmdbMovies, setTmdbMovies] = useState([]);
  const [apiMovies, setApiMovies] = useState([]);
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

  useEffect(() => {
    favoriteMoviesHandler();
    fetchTmdbMovies();
    fetchApiMovies();
  }, []);

  const favoriteMoviesHandler = async () => {
    try {
      const response = await axiosApi.get(`/wishlist`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setFavoriteMovies(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching favorite movies:", error);
    }
  };

  const fetchTmdbMovies = async () => {
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/movie/popular?api_key=e14104f5929fe7a58118c33246c8b05f"
      );
      setTmdbMovies(response.data.results);
    } catch (error) {
      console.error("Error fetching TMDb movies:", error);
    }
  };

  const fetchApiMovies = async () => {
    try {
      const response = await axiosApi.get("/wishlist", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (Array.isArray(response.data)) {
        setApiMovies(response.data);
      } else {
        console.error("Invalid data format received from API:", response.data);
      }
    } catch (error) {
      console.error("Error fetching API movies:", error);
    }
  };

  const Logout = () => {
    const confirmed = window.confirm("Are you sure you want to logout?");
    if (confirmed) {
      localStorage.clear();
      navigate("/login");
    }
  };

  console.log("API Movies:", apiMovies);
  console.log("TMDB Movies:", tmdbMovies);

  return (
    <Box>
      <Box display="flex" justifyContent="flex-end">
        <Button
          color="inherit"
          onClick={Logout}
          style={{ marginRight: "20px", backgroundColor: "red" }}
        >
          Logout <ExitToApp />
        </Button>
      </Box>
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
      </Box>
      <Typography variant="h4" gutterBottom>
        Favorite Movies:
      </Typography>
      <Box
        display="flex"
        flexDirection="row"
        flexWrap="wrap"
        justifyContent="center"
      >
        {apiMovies.map((movie) => {
          const tmdbMovie = tmdbMovies.find(
            (tmdbMovie) => tmdbMovie.id === movie.movie_id
          );
          if (!tmdbMovie) return null;
          return (
            <Box key={tmdbMovie.id} m={1} width="200px">
              <Link to={`/movies/${tmdbMovie.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w500/${tmdbMovie.poster_path}`}
                  alt={tmdbMovie.title}
                  style={{ width: "100%", height: "auto" }}
                />
                <Typography variant="h6">{tmdbMovie.title}</Typography>
              </Link>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default Profile;
