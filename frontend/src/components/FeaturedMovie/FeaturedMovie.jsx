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
      style={{
        marginBottom: "20px",
        display: "flex",
        justifyContent: "center",
        height: "490px",
        textDecoration: "none",
      }}
    >
      <Card
        className={theme.card}
        theme={{ root: theme.cardRoot }}
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          flexDirection: "column",
          position: "relative",
        }}
      >
        <CardMedia
          className={theme.cardMedia}
          media="image"
          alt={movie.title}
          image={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
          onError={(e) => {
            e.target.src = `https://image.tmdb.org/t/o/original/${movie.backdrop_path}`;
          }}
          style={{
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
            className={theme.cardContent}
            theme={{ root: theme.cardContentRoot }}
            style={{
              color: "#fff",
              width: "40%",
              [theme.breakpoints.down("sm")]: {
                width: "100%",
              },
            }}
          >
            <Typography
              variant="h5"
              gutterBottom={movie.title}
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
              {movie.overview}{" "}
            </Typography>
          </CardContent>
        </Box>
      </Card>
    </Box>
  );
};

export default FeaturedMovie;
