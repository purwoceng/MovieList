import React from "react";
import { Box, Typography, Card, CardContent, CardMedia } from "@mui/material";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
const FeaturedMovie = ({ movie }) => {
  const theme = useTheme();
  if (!movie) return null;

  return (
    <Box
      component={Link}
      to={`/movies/${movie.id}`}
      sx={{
        marginBottom: "20px",
        display: "flex",
        justifyContent: "center",
        height: "490px",
        textDecoration: "none",
      }}
    >
      <Card
        sx={{
          width: "100%",
          display: "flex",
          height: "490px",
          justifyContent: "flex-end",
          flexDirection: "column",
        }}
      >
        <CardMedia
          media="image"
          alt={movie.title}
          image={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
          onError={(e) => {
            e.target.src = `https://image.tmdb.org/t/o/original/${movie.backdrop_path}`;
          }}
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            height: "100%",
            width: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.575)",
            backgroundBlendMode: "darken",     
          }}
        ></CardMedia>
        <Box padding="20px">
          <CardContent
            sx={{
              color: "#fff",
              width: "40%",
              // [theme.breakpoints.down("sm")]
              [theme.breakpoints.down("sm")]: {
                width: "100%",
              },
            }}
          >
            <Typography
              variant="h5"
              gutterBottom
              style={{
                position: "relative",
                backgroundColor: "transparant",
              }}
            >
              {movie.title}
            </Typography>
            <Typography
              variant="body2"
              style={{
                position: "relative",
                backgroundColor: "transparant",
                textAlign: "justify",
              }}
            >
              {movie.overview}
            </Typography>
          </CardContent>
        </Box>
      </Card>
    </Box>
  );
};

export default FeaturedMovie;
