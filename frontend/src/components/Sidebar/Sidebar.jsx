import React, { useEffect } from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Box,
  CircularProgress,
  ListSubheader,
  ListItemButton,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { selectGenreOrCategory } from "../../features/currentGenreOrCategory";
import { useGetGenresQuery } from "../../services/TMDB";
import genreIcons from "../../assets/genres";
import { auto } from "@popperjs/core";

const categories = [
  { label: "Popular", value: "popular" },
  { label: "Top Rated", value: "top_rated" },
  { label: "Upcoming", value: "upcoming" },
];


const redLogo =
  "https://fontmeme.com/permalink/240222/a38b5a781021948c273517b66664cf81.png";
const blueLogo =
  "https://fontmeme.com/permalink/240222/faea312e9c50e22410269ab0d1bdc488.png";

const Sidebar = ({ setMobileOpen }) => {
  const { genreOrCategoryName } = 
  const theme = useTheme();
  const { data, isFetching } = useGetGenresQuery();
  const dispatch = useDispatch();
  console.log(data);

  return (
    <>
      <Link
        to="/"
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "10% 0",
        }}
      >
        <img
          style={{ width: "70%" }}
          src={theme.palette.mode === "light" ? redLogo : blueLogo}
          alt="Filmpire logo"
        />
      </Link>
      <Divider />
      <List>
        <ListSubheader>Categories</ListSubheader>
        {categories.map(({ label, value }) => (
          <Link
            key={value}
            to="/"
            style={{
              color: theme.palette.text.primary,
              textDecoration: "none",
            }}
          >
            <ListItemButton
              onClick={() => dispatch(selectGenreOrCategory(value))}
            // button
            >
              <ListItemIcon>
                <img
                  src={genreIcons[label.toLowerCase()]}
                  // style={{
                  //   filter:
                  //     // theme.palette.mode === "dark" ? "dark" : "invert(1)",
                  //     "none",
                  // }}
                  height={30}
                />
              </ListItemIcon>
              <ListItemText primary={label} />
            </ListItemButton>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        <ListSubheader>Genres</ListSubheader>
        {isFetching ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        ) : (
          data.genres.map(({ name, id }) => (
            <Link
              key={name}
              style={{
                diaplay: "flex",
                justifyContent: "center",
                padding: "10% 0",
                textDecoration: "none",
                color: theme.palette.text.primary,
              }}
              to="/"
            >
              <ListItemButton
                onClick={() => dispatch(selectGenreOrCategory(id))}
              // button
              >
                <ListItemIcon>
                  <img
                    src={genreIcons[name.toLowerCase()]}
                    // style={{
                    //   filter:
                    //     theme.palette.mode === "dark" ? "dark" : "invert(1)",
                    //     // "none",
                    // }}
                    height={30}
                  />
                </ListItemIcon>
                <ListItemText primary={name} />
              </ListItemButton>
            </Link>
          ))
        )}
      </List>
    </>
  );
};

export default Sidebar;
