import React from "react";
import { Typography, Grid, Grow, Tooltip, Rating } from "@mui/material";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/system";

const Movie = ({ movie, i }) => {
  const theme = useTheme();

  return (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2} sx={{ pading: "10px", textAlign: "center" }}>
      <Grow in key={i} timeout={(i + 1) * 250}>
        <Link style={{ textDecoration: 'none', fontWeight: "bolder", [theme.breakpoints.up('xs')]: { display: "flex", flexDirection: "column" },  }} to={`/movie/${movie.id}`}>
          {movie.poster_path && (
            <Box
              component="img"
              alt={movie.title}
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              sx={{
                borderRadius: "20px",
                height: "300px",
                marginBottom: "10px",
                '&:hover': { transform: "scal(1.05)" },
              }}
            />
          )}
        </Link>
      </Grow>
      <Typography sx={{ color: theme.palette.text.primary, textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap", width: "100%", mt: "10px", mb: "0px", }} variant="h5"> {movie.title} </Typography>
      <Tooltip disableTouchListener title={`${movie.vote_average} / 10`}>
        <div>
          <Rating   readOnly value={movie.vote_average / 2} precision={0.1} />
        </div>
      </Tooltip>
    </Grid>
  );
};

export default Movie;
