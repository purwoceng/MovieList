import { Typography, Box } from "@mui/material";
import { Movie } from "..";
import { useTheme } from "@emotion/react";

const ratedCards = () => {
  const theme = useTheme();
  return(
    <Box>
      <Typography variant="h5" gutterBottom>Favorite</Typography>
      <Box display="flex" flexWrap={"wrap"}></Box>
    </Box>
  )
};

export default ratedCards;
