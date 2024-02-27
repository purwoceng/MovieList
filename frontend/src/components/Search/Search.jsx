import React, { useState, useEffect } from "react";
import { TextField, InputAdornment, Box } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";
import { useLocation } from "react-router-dom";
import { searchMovie } from "../../features/currentGenreOrCategory";

const Search = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const theme = useTheme();
  const location = useLocation();

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      dispatch(searchMovie(query));
    }
  };

  if (location.pathname !== "/") {
    return null;
  }
  
  return (
    <Box
      sx={{
        [theme.breakpoints.down("sm")]: {
          display: "flex",
          justifyContent: "center",
          width: "100%",
        },
      }}
    >
      <TextField
        onKeyPress={handleKeyPress}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        variant="standard"
        InputProps={{
          style: {
            color: theme.palette.mode === "light" && "black",
            filter: theme.palette.mode === "light" && "invert(1)",
            [theme.breakpoints.down("sm")]: {
              marginTop: "-10px",
              marginBottom: "10px",
            },
          },
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default Search;
