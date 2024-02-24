import React from "react";
import { Box, Typography, Card, CardContent, CardMedia } from "@mui/material";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
const FeaturedMovie = ({ movie }) => {
  const theme = useTheme();
  if (!movie) return null;

  return (
    <Box component={Link} to={`/movies/${movie.id}`}>
      <Card className={theme.card} theme={{ root: theme.cardRoot }}>
        <CardMedia media="picture" alt={movie.title}
        image={`https://image.tmdb.or/t/o/original/${movie.backdrop_path}`}>

        </CardMedia>
      </Card>
    </Box>
  );
};

export default FeaturedMovie;
