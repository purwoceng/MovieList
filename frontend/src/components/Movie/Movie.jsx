import React from "react";
import { Typography, Grid, Grow, Tooltip, Rating } from "@mui/material";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import styled from "@emotion/styled";

const Movie = ({ movie, i }) => {
  const theme = useTheme();

  const ImageListItemWithStyle = styled("div")({
    position: "relative",
    "&:hover": {
      cursor: "pointer",
      opacity: 0.8,
    },
  });

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
    
    <Grid
      item
      xs={12}
      sm={6}
      md={4}
      lg={3}
      xl={2}
      sx={{ padding: "10px", textAlign: "center", [theme.breakpoints.down("sm")]: { width: "200px" } }}
    >
      <Grow in key={i} timeout={(i + 1) * 250}>
        <ImageListItemWithStyle>
          <Link
            style={{
              textDecoration: "none",
              fontWeight: "bolder",
              [theme.breakpoints.up("xs")]: {
                display: "flex",
                flexDirection: "column",
              },
            }}
            to={`/movie/${movie.id}`}
          >
            {movie.poster_path && (
              <ImageWithStyle
                alt={movie.title}
                src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
              />
            )}
          </Link>
        </ImageListItemWithStyle>
      </Grow>
      <Typography
        sx={{
          color: theme.palette.text.primary,
          textOverflow: "ellipsis",
          overflow: "hidden",
          whiteSpace: "nowrap",
          mt: "10px",
          mb: "0px",
        }}
        variant="h5"
      >
        {movie.title}
      </Typography>
      <Tooltip disableTouchListener title={`${movie.vote_average} / 10`}>
        <div style={{ width: '100%' }}>
          <Rating readOnly value={movie.vote_average / 2} precision={0.1} />
        </div>
      </Tooltip>
    </Grid>
  );
};

export default Movie;
