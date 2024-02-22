import React from "react";
import { Typography, Grid, Grow, Tooltip, Rating } from "@mui/material";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

const Movie = ({ movie, i }) => {
  const theme = useTheme();

  return (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
      <Grow in key={i} timeout={(i + 1) * 250}>
        <Link className={theme.links} to={`/movie/${movie.id}`}>
          {movie.poster_path && (
            <img
              alt={movie.title}
              className={theme.image}
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              style={{
                height: "250px",
                width: "250px",
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />
          )}
        </Link>
      </Grow>
      <Typography variant="h5"> {movie.title} </Typography>
      <Tooltip disableTouchListener title={`${movie.vote_average} / 10`}>
        <div>
          <Rating readOnly value={movie.vote_average / 2} precision={0.1} />
        </div>
      </Tooltip>
    </Grid>
  );
};

export default Movie;
