import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { Typography, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { ExitToApp, Group } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { axiosApi } from "../../api/api";
import styled from "@emotion/styled";

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [tokenExpired, setTokenExpired] = useState(false);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [watchlistMovies, setWatchlistMovies] = useState([]);
  const [tmdbMovies, setTmdbMovies] = useState([]);
  const [displayedFavoriteMovies, setDisplayedFavoriteMovies] = useState([]);
  const [displayedWatchlistMovies, setDisplayedWatchlistMovies] = useState([]);
  const [showMoreFavoriteMovies, setShowMoreFavoriteMovies] = useState(false);
  const [showMoreWatchlistMovies, setShowMoreWatchlistMovies] = useState(false);
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
    watchlistMoviesHandler();
    fetchTmdbMovies();
  }, []);

  const watchlistMoviesHandler = async () => {
    try {
      const response = await axiosApi.get(`/watchlist`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setWatchlistMovies(response.data);
      setDisplayedWatchlistMovies(response.data.slice(0, 9));
    } catch (error) {
      console.error("Error fetching watchlist movies:", error);
    }
  };

  const favoriteMoviesHandler = async () => {
    try {
      const response = await axiosApi.get(`/wishlist`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setFavoriteMovies(response.data);
      setDisplayedFavoriteMovies(response.data.slice(0, 9));
    } catch (error) {
      console.error("Error fetching favorite movies:", error);
    }
  };

  const fetchTmdbMovies = async () => {
    try {
      let allMovies = [];
      for (let page = 1; page <= 5; page++) {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=e14104f5929fe7a58118c33246c8b05f&page=${page}`
        );
        allMovies = [...allMovies, ...response.data.results];
      }
      setTmdbMovies(allMovies);
    } catch (error) {
      console.error("Error fetching TMDb movies:", error);
    }
  };

  const Logout = () => {
    const confirmed = window.confirm("Are you sure you want to logout?");
    if (confirmed) {
      localStorage.clear();
      navigate("/login");
    }
  };

  const handleShowMoreFavoriteMovies = () => {
    setDisplayedFavoriteMovies(favoriteMovies);
    setShowMoreFavoriteMovies(true);
  };

  const handleShowLessFavoriteMovies = () => {
    setDisplayedFavoriteMovies(favoriteMovies.slice(0, 9));
    setShowMoreFavoriteMovies(false);
  };

  const handleShowMoreWatchlistMovies = () => {
    setDisplayedWatchlistMovies(watchlistMovies);
    setShowMoreWatchlistMovies(true);
  };

  const handleShowLessWatchlistMovies = () => {
    setDisplayedWatchlistMovies(watchlistMovies.slice(0, 9));
    setShowMoreWatchlistMovies(false);
  };

  const ImageWithStyle = styled("img")({
    borderRadius: "20px",
    height: "280px",
    marginBottom: "10px",
    transition: "transform 0.3s ease-in-out",
    "&:hover": {
      transform: "scale(1.05)",
    },
  });

  return (
    <Box>
      <Box display="flex" justifyContent="flex-end">
        <Button
          component={Link}
          to="/editprofile"
          justifyContent="flex-start"
          color="inherit"
          style={{
            marginRight: "20px",
            backgroundColor: "blue",
            color: "white",
          }}
        >
          Edit Profile <Group />
        </Button>
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
        {displayedFavoriteMovies.map((movie) => {
          const tmdbMovie = tmdbMovies.find(
            (tmdbMovie) => tmdbMovie.id === movie.movie_id
          );
          if (!tmdbMovie) return null;
          return (
            <Box key={tmdbMovie.id} m={1} width="200px">
              <Link to={`/movies/${tmdbMovie.id}`}>
                <ImageWithStyle
                  src={`https://image.tmdb.org/t/p/w300/${tmdbMovie.poster_path}`}
                  alt={tmdbMovie.title}
                />
                <Typography
                  variant="h6"
                  gutterBottom
                  style={{ textAlign: "center" }}
                >
                  {tmdbMovie.title}
                </Typography>
              </Link>
            </Box>
          );
        })}
        {!showMoreFavoriteMovies ? (
          <Button onClick={handleShowMoreFavoriteMovies}>Show More</Button>
        ) : (
          <Button onClick={handleShowLessFavoriteMovies}>Show Less</Button>
        )}
      </Box>
      <Typography variant="h4" gutterBottom>
        Watchlist Movies:
      </Typography>
      <Box
        display="flex"
        flexDirection="row"
        flexWrap="wrap"
        justifyContent="center"
      >
        {displayedWatchlistMovies.map((movie) => {
          const tmdbMovie = tmdbMovies.find(
            (tmdbMovie) => tmdbMovie.id === movie.movie_id
          );
          if (!tmdbMovie) return null;
          return (
            <Box key={tmdbMovie.id} m={1} width="200px">
              <Link to={`/movies/${tmdbMovie.id}`}>
                <ImageWithStyle
                  src={`https://image.tmdb.org/t/p/w300/${tmdbMovie.poster_path}`}
                  alt={tmdbMovie.title}
                />
                <Typography variant="h6" style={{ textAlign: "center" }}>
                  {tmdbMovie.title}
                </Typography>
              </Link>
            </Box>
          );
        })}
        {!showMoreWatchlistMovies ? (
          <Button onClick={handleShowMoreWatchlistMovies}>Show More</Button>
        ) : (
          <Button onClick={handleShowLessWatchlistMovies}>Show Less</Button>
        )}
      </Box>
    </Box>
  );
};

export default Profile;
