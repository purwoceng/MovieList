import React from "react";
import { Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Movie } from "..";

const MovieList = ({ movies,numberOfMovies }) => {
  // const classes = useStyles(); // Uncomment if you plan to use useStyles
  const theme = useTheme();
  return (
    <Grid container sx={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", overflow: "hidden", [theme.breakpoints.down("sm")]: { justifyContent: "center" } }}>
      {movies.results.slice(0,numberOfMovies).map((movie, i) => (
        <Movie key={i} movie={movie} i={i} />
      ))}
    </Grid>
  );
};

export default MovieList;
