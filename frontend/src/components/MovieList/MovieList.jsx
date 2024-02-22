import React from "react";
import { Grid } from "@mui/material";
// Importing useStyles from "./styles" commented out for now
// import useStyles from "./styles";
import { useTheme } from "@mui/material/styles";
import { Movie } from "..";

const MovieList = ({ movies }) => {
  // const classes = useStyles(); // Uncomment if you plan to use useStyles
  const theme = useTheme();
  console.log("movie list");
  return (
    <Grid xs={12} container spacing={2}>
      {movies.results.map((movie, i) => (
        <Movie key={i} movie={movie} i={i} />
      ))}
    </Grid>
  );
};

export default MovieList;
